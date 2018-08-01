(function ($) {

/**
 * Toggle the visibility of a fieldset using smooth animations.
 */
Drupal.toggleFieldset = function (fieldset) {
  var $fieldset = $(fieldset);
  if ($fieldset.is('.collapsed')) {
    var $content = $('> .fieldset-wrapper', fieldset).hide();
    $fieldset
      .removeClass('collapsed')
      .trigger({ type: 'collapsed', value: false })
      .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Hide'));
    $content.slideDown({
      duration: 'fast',
      easing: 'linear',
      complete: function () {
        Drupal.collapseScrollIntoView(fieldset);
        fieldset.animating = false;
      },
      step: function () {
        // Scroll the fieldset into view.
        Drupal.collapseScrollIntoView(fieldset);
      }
    });
  }
  else {
    $fieldset.trigger({ type: 'collapsed', value: true });
    $('> .fieldset-wrapper', fieldset).slideUp('fast', function () {
      $fieldset
        .addClass('collapsed')
        .find('> legend span.fieldset-legend-prefix').html(Drupal.t('Show'));
      fieldset.animating = false;
    });
  }
};

/**
 * Scroll a given fieldset into view as much as possible.
 */
Drupal.collapseScrollIntoView = function (node) {
  var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
  var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
  var posY = $(node).offset().top;
  var fudge = 55;
  if (posY + node.offsetHeight + fudge > h + offset) {
    if (node.offsetHeight > h) {
      window.scrollTo(0, posY);
    }
    else {
      window.scrollTo(0, posY + node.offsetHeight - h + fudge);
    }
  }
};

Drupal.behaviors.collapse = {
  attach: function (context, settings) {
    $('fieldset.collapsible', context).once('collapse', function () {
      var $fieldset = $(this);
      // Expand fieldset if there are errors inside, or if it contains an
      // element that is targeted by the URI fragment identifier.
      var anchor = location.hash && location.hash != '#' ? ', ' + location.hash : '';
      if ($fieldset.find('.error' + anchor).length) {
        $fieldset.removeClass('collapsed');
      }

      var summary = $('<span class="summary"></span>');
      $fieldset.
        bind('summaryUpdated', function () {
          var text = $.trim($fieldset.drupalGetSummary());
          summary.html(text ? ' (' + text + ')' : '');
        })
        .trigger('summaryUpdated');

      // Turn the legend into a clickable link, but retain span.fieldset-legend
      // for CSS positioning.
      var $legend = $('> legend .fieldset-legend', this);

      $('<span class="fieldset-legend-prefix element-invisible"></span>')
        .append($fieldset.hasClass('collapsed') ? Drupal.t('Show') : Drupal.t('Hide'))
        .prependTo($legend)
        .after(' ');

      // .wrapInner() does not retain bound events.
      var $link = $('<a class="fieldset-title" href="#"></a>')
        .prepend($legend.contents())
        .appendTo($legend)
        .click(function () {
          var fieldset = $fieldset.get(0);
          // Don't animate multiple times.
          if (!fieldset.animating) {
            fieldset.animating = true;
            Drupal.toggleFieldset(fieldset);
          }
          return false;
        });

      $legend.append(summary);
    });
  }
};

})(jQuery);
;
(function ($) {

Drupal.behaviors.textarea = {
  attach: function (context, settings) {
    $('.form-textarea-wrapper.resizable', context).once('textarea', function () {
      var staticOffset = null;
      var textarea = $(this).addClass('resizable-textarea').find('textarea');
      var grippie = $('<div class="grippie"></div>').mousedown(startDrag);

      grippie.insertAfter(textarea);

      function startDrag(e) {
        staticOffset = textarea.height() - e.pageY;
        textarea.css('opacity', 0.25);
        $(document).mousemove(performDrag).mouseup(endDrag);
        return false;
      }

      function performDrag(e) {
        textarea.height(Math.max(32, staticOffset + e.pageY) + 'px');
        return false;
      }

      function endDrag(e) {
        $(document).unbind('mousemove', performDrag).unbind('mouseup', endDrag);
        textarea.css('opacity', 1);
      }
    });
  }
};

})(jQuery);
;
/**
 * @file
 * Provides dependent visibility for form items in CTools' ajax forms.
 *
 * To your $form item definition add:
 * - '#process' => array('ctools_process_dependency'),
 * - '#dependency' => array('id-of-form-item' => array(list, of, values, that,
 *   make, this, item, show),
 *
 * Special considerations:
 * - Radios are harder. Because Drupal doesn't give radio groups individual IDs,
 *   use 'radio:name-of-radio'.
 *
 * - Checkboxes don't have their own id, so you need to add one in a div
 *   around the checkboxes via #prefix and #suffix. You actually need to add TWO
 *   divs because it's the parent that gets hidden. Also be sure to retain the
 *   'expand_checkboxes' in the #process array, because the CTools process will
 *   override it.
 */

(function ($) {
  Drupal.CTools = Drupal.CTools || {};
  Drupal.CTools.dependent = {};

  Drupal.CTools.dependent.bindings = {};
  Drupal.CTools.dependent.activeBindings = {};
  Drupal.CTools.dependent.activeTriggers = [];

  Drupal.CTools.dependent.inArray = function(array, search_term) {
    var i = array.length;
    while (i--) {
      if (array[i] == search_term) {
         return true;
      }
    }
    return false;
  }


  Drupal.CTools.dependent.autoAttach = function() {
    // Clear active bindings and triggers.
    for (i in Drupal.CTools.dependent.activeTriggers) {
      $(Drupal.CTools.dependent.activeTriggers[i]).unbind('change.ctools-dependent');
    }
    Drupal.CTools.dependent.activeTriggers = [];
    Drupal.CTools.dependent.activeBindings = {};
    Drupal.CTools.dependent.bindings = {};

    if (!Drupal.settings.CTools) {
      return;
    }

    // Iterate through all relationships
    for (id in Drupal.settings.CTools.dependent) {
      // Test to make sure the id even exists; this helps clean up multiple
      // AJAX calls with multiple forms.

      // Drupal.CTools.dependent.activeBindings[id] is a boolean,
      // whether the binding is active or not.  Defaults to no.
      Drupal.CTools.dependent.activeBindings[id] = 0;
      // Iterate through all possible values
      for(bind_id in Drupal.settings.CTools.dependent[id].values) {
        // This creates a backward relationship.  The bind_id is the ID
        // of the element which needs to change in order for the id to hide or become shown.
        // The id is the ID of the item which will be conditionally hidden or shown.
        // Here we're setting the bindings for the bind
        // id to be an empty array if it doesn't already have bindings to it
        if (!Drupal.CTools.dependent.bindings[bind_id]) {
          Drupal.CTools.dependent.bindings[bind_id] = [];
        }
        // Add this ID
        Drupal.CTools.dependent.bindings[bind_id].push(id);
        // Big long if statement.
        // Drupal.settings.CTools.dependent[id].values[bind_id] holds the possible values

        if (bind_id.substring(0, 6) == 'radio:') {
          var trigger_id = "input[name='" + bind_id.substring(6) + "']";
        }
        else {
          var trigger_id = '#' + bind_id;
        }

        Drupal.CTools.dependent.activeTriggers.push(trigger_id);

        if ($(trigger_id).attr('type') == 'checkbox') {
          $(trigger_id).siblings('label').addClass('hidden-options');
        }

        var getValue = function(item, trigger) {
          if ($(trigger).size() == 0) {
            return null;
          }

          if (item.substring(0, 6) == 'radio:') {
            var val = $(trigger + ':checked').val();
          }
          else {
            switch ($(trigger).attr('type')) {
              case 'checkbox':
                // **This check determines if using a jQuery version 1.7 or newer which requires the use of the prop function instead of the attr function when not called on an attribute
                if ($().prop) {
                  var val = $(trigger).prop('checked') ? true : false;
                }
                else {
                  var val = $(trigger).attr('checked') ? true : false;
                }

                if (val) {
                  $(trigger).siblings('label').removeClass('hidden-options').addClass('expanded-options');
                }
                else {
                  $(trigger).siblings('label').removeClass('expanded-options').addClass('hidden-options');
                }

                break;
              default:
                var val = $(trigger).val();
            }
          }
          return val;
        }

        var setChangeTrigger = function(trigger_id, bind_id) {
          // Triggered when change() is clicked.
          var changeTrigger = function() {
            var val = getValue(bind_id, trigger_id);

            if (val == null) {
              return;
            }

            for (i in Drupal.CTools.dependent.bindings[bind_id]) {
              var id = Drupal.CTools.dependent.bindings[bind_id][i];
              // Fix numerous errors
              if (typeof id != 'string') {
                continue;
              }

              // This bit had to be rewritten a bit because two properties on the
              // same set caused the counter to go up and up and up.
              if (!Drupal.CTools.dependent.activeBindings[id]) {
                Drupal.CTools.dependent.activeBindings[id] = {};
              }

              if (val != null && Drupal.CTools.dependent.inArray(Drupal.settings.CTools.dependent[id].values[bind_id], val)) {
                Drupal.CTools.dependent.activeBindings[id][bind_id] = 'bind';
              }
              else {
                delete Drupal.CTools.dependent.activeBindings[id][bind_id];
              }

              var len = 0;
              for (i in Drupal.CTools.dependent.activeBindings[id]) {
                len++;
              }

              var $original = $('#' + id);
              if ($original.is('fieldset') || $original.is('textarea')) {
                continue;
              }

              var object = $original.parent();

              if (Drupal.settings.CTools.dependent[id].type == 'disable') {
                if (Drupal.settings.CTools.dependent[id].num <= len) {
                  // Show if the element if criteria is matched
                  // **This check determines if using a jQuery version 1.7 or newer which requires the use of the prop function instead of the attr function when not called on an attribute
                  if (typeof $().prop == 'function') {
                    object.prop('disabled', false);
                    object.addClass('dependent-options');
                    object.children().prop('disabled', false);
                  }
                  else {
                    object.attr('disabled', false);
                    object.addClass('dependent-options');
                    object.children().attr('disabled', false);
                  }
                }
                else {
                  // Otherwise hide. Use css rather than hide() because hide()
                  // does not work if the item is already hidden, for example,
                  // in a collapsed fieldset.
                  // **This check determines if using a jQuery version 1.7 or newer which requires the use of the prop function instead of the attr function when not called on an attribute
                  if (typeof $().prop == 'function') {
                    object.prop('disabled', true);
                    object.children().prop('disabled', true);
                  }
                  else {
                    object.attr('disabled', true);
                    object.children().attr('disabled', true);
                  }
                }
              }
              else {
                if (Drupal.settings.CTools.dependent[id].num <= len) {
                  // Show if the element if criteria is matched
                  object.show(0);
                  object.addClass('dependent-options');
                }
                else {
                  // Otherwise hide. Use css rather than hide() because hide()
                  // does not work if the item is already hidden, for example,
                  // in a collapsed fieldset.
                  object.css('display', 'none');
                }
              }
            }
          }

          $(trigger_id).bind('change.ctools-dependent', function() {
            // Trigger the internal change function
            // the attr('id') is used because closures are more confusing
            changeTrigger(trigger_id, bind_id);
          });
          // Trigger initial reaction
          changeTrigger(trigger_id, bind_id);
        }
        setChangeTrigger(trigger_id, bind_id);
      }
    }
  }

  Drupal.behaviors.CToolsDependent = {
    attach: function (context) {
      Drupal.CTools.dependent.autoAttach();

      // Really large sets of fields are too slow with the above method, so this
      // is a sort of hacked one that's faster but much less flexible.
      $("select.ctools-master-dependent")
        .once('ctools-dependent')
        .bind('change.ctools-dependent', function() {
          var val = $(this).val();
          if (val == 'all') {
            $('.ctools-dependent-all').show(0);
          }
          else {
            $('.ctools-dependent-all').hide(0);
            $('.ctools-dependent-' + val).show(0);
          }
        })
        .trigger('change.ctools-dependent');
    }
  }
})(jQuery);
;
/**
 * @file
 * Some basic behaviors and utility functions for Views.
 */
(function ($) {

Drupal.Views = {};

/**
 * jQuery UI tabs, Views integration component
 */
Drupal.behaviors.viewsTabs = {
  attach: function (context) {
    if ($.viewsUi && $.viewsUi.tabs) {
      $('#views-tabset').once('views-processed').viewsTabs({
        selectedClass: 'active'
      });
    }

    $('a.views-remove-link').once('views-processed').click(function(event) {
      var id = $(this).attr('id').replace('views-remove-link-', '');
      $('#views-row-' + id).hide();
      $('#views-removed-' + id).attr('checked', true);
      event.preventDefault();
   });
  /**
    * Here is to handle display deletion
    * (checking in the hidden checkbox and hiding out the row)
    */
  $('a.display-remove-link')
    .addClass('display-processed')
    .click(function() {
      var id = $(this).attr('id').replace('display-remove-link-', '');
      $('#display-row-' + id).hide();
      $('#display-removed-' + id).attr('checked', true);
      return false;
  });
  }
};

/**
 * Helper function to parse a querystring.
 */
Drupal.Views.parseQueryString = function (query) {
  var args = {};
  var pos = query.indexOf('?');
  if (pos != -1) {
    query = query.substring(pos + 1);
  }
  var pairs = query.split('&');
  for(var i in pairs) {
    if (typeof(pairs[i]) == 'string') {
      var pair = pairs[i].split('=');
      // Ignore the 'q' path argument, if present.
      if (pair[0] != 'q' && pair[1]) {
        args[decodeURIComponent(pair[0].replace(/\+/g, ' '))] = decodeURIComponent(pair[1].replace(/\+/g, ' '));
      }
    }
  }
  return args;
};

/**
 * Helper function to return a view's arguments based on a path.
 */
Drupal.Views.parseViewArgs = function (href, viewPath) {

  // Provide language prefix.
  if (Drupal.settings.pathPrefix) {
    var viewPath = Drupal.settings.pathPrefix + viewPath;
  }
  var returnObj = {};
  var path = Drupal.Views.getPath(href);
  // Ensure we have a correct path.
  if (viewPath && path.substring(0, viewPath.length + 1) == viewPath + '/') {
    var args = decodeURIComponent(path.substring(viewPath.length + 1, path.length));
    returnObj.view_args = args;
    returnObj.view_path = path;
  }
  return returnObj;
};

/**
 * Strip off the protocol plus domain from an href.
 */
Drupal.Views.pathPortion = function (href) {
  // Remove e.g. http://example.com if present.
  var protocol = window.location.protocol;
  if (href.substring(0, protocol.length) == protocol) {
    // 2 is the length of the '//' that normally follows the protocol
    href = href.substring(href.indexOf('/', protocol.length + 2));
  }
  return href;
};

/**
 * Return the Drupal path portion of an href.
 */
Drupal.Views.getPath = function (href) {
  href = Drupal.Views.pathPortion(href);
  href = href.substring(Drupal.settings.basePath.length, href.length);
  // 3 is the length of the '?q=' added to the url without clean urls.
  if (href.substring(0, 3) == '?q=') {
    href = href.substring(3, href.length);
  }
  var chars = ['#', '?', '&'];
  for (var i in chars) {
    if (href.indexOf(chars[i]) > -1) {
      href = href.substr(0, href.indexOf(chars[i]));
    }
  }
  return href;
};

})(jQuery);
;
/**
 * @file
 * Handles AJAX submission and response in Views UI.
 */
(function ($) {

  Drupal.ajax.prototype.commands.viewsSetForm = function (ajax, response, status) {
    var ajax_title = Drupal.settings.views.ajax.title;
    var ajax_body = Drupal.settings.views.ajax.id;
    var ajax_popup = Drupal.settings.views.ajax.popup;
    $(ajax_title).html(response.title);
    $(ajax_body).html(response.output);
    $(ajax_popup).dialog('open');
    Drupal.attachBehaviors($(ajax_popup), ajax.settings);
    if (response.url) {
      // Identify the button that was clicked so that .ajaxSubmit() can use it.
      // We need to do this for both .click() and .mousedown() since JavaScript
      // code might trigger either behavior.
      var $submit_buttons = $('input[type=submit], button', ajax_body);
      $submit_buttons.click(function(event) {
        this.form.clk = this;
      });
      $submit_buttons.mousedown(function(event) {
        this.form.clk = this;
      });

      $('form', ajax_body).once('views-ajax-submit-processed').each(function() {
        var element_settings = { 'url': response.url, 'event': 'submit', 'progress': { 'type': 'throbber' } };
        var $form = $(this);
        var id = $form.attr('id');
        Drupal.ajax[id] = new Drupal.ajax(id, this, element_settings);
        Drupal.ajax[id].form = $form;
      });
    }
    Drupal.viewsUi.resizeModal();
  };

  Drupal.ajax.prototype.commands.viewsDismissForm = function (ajax, response, status) {
    Drupal.ajax.prototype.commands.viewsSetForm({}, {'title': '', 'output': Drupal.settings.views.ajax.defaultForm});
    $(Drupal.settings.views.ajax.popup).dialog('close');
  }

  Drupal.ajax.prototype.commands.viewsHilite = function (ajax, response, status) {
    $('.hilited').removeClass('hilited');
    $(response.selector).addClass('hilited');
  };

  Drupal.ajax.prototype.commands.viewsAddTab = function (ajax, response, status) {
    var id = '#views-tab-' + response.id;
    $('#views-tabset').viewsAddTab(id, response.title, 0);
    $(id).html(response.body).addClass('views-tab');

    // Update the preview widget to preview the new tab.
    var display_id = id.replace('#views-tab-', '');
    $("#preview-display-id").append('<option selected="selected" value="' + display_id + '">' + response.title + '</option>');

    Drupal.attachBehaviors(id);
    var instance = $.viewsUi.tabs.instances[$('#views-tabset').get(0).UI_TABS_UUID];
    $('#views-tabset').viewsClickTab(instance.$tabs.length);
  };

  Drupal.ajax.prototype.commands.viewsShowButtons = function (ajax, response, status) {
    $('div.views-edit-view div.form-actions').removeClass('js-hide');
    if (response.changed) {
      $('div.views-edit-view div.view-changed.messages').removeClass('js-hide');
    }
  };

  Drupal.ajax.prototype.commands.viewsTriggerPreview = function (ajax, response, status) {
    if ($('input#edit-displays-live-preview').is(':checked')) {
      $('#preview-submit').trigger('click');
    }
  };

  Drupal.ajax.prototype.commands.viewsReplaceTitle = function (ajax, response, status) {
    // In case we're in the overlay, get a reference to the underlying window.
    var doc = parent.document;
    // For the <title> element, make a best-effort attempt to replace the page
    // title and leave the site name alone. If the theme doesn't use the site
    // name in the <title> element, this will fail.
    var oldTitle = doc.title;
    // Escape the site name, in case it has special characters in it, so we can
    // use it in our regex.
    var escapedSiteName = response.siteName.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
    var re = new RegExp('.+ (.) ' + escapedSiteName);
    doc.title = oldTitle.replace(re, response.title + ' $1 ' + response.siteName);

    $('h1.page-title').text(response.title);
    $('h1#overlay-title').text(response.title);
  };

  /**
   * Get rid of irritating tabledrag messages
   */
  Drupal.theme.tableDragChangedWarning = function () {
    return [];
  }

  /**
   * Trigger preview when the "live preview" checkbox is checked.
   */
  Drupal.behaviors.livePreview = {
    attach: function (context) {
      $('input#edit-displays-live-preview', context).once('views-ajax-processed').click(function() {
        if ($(this).is(':checked')) {
          $('#preview-submit').click();
        }
      });
    }
  }

  /**
   * Sync preview display.
   */
  Drupal.behaviors.syncPreviewDisplay = {
    attach: function (context) {
      $("#views-tabset a").once('views-ajax-processed').click(function() {
        var href = $(this).attr('href');
        // Cut of #views-tabset.
        var display_id = href.substr(11);
        // Set the form element.
        $("#views-live-preview #preview-display-id").val(display_id);
      }).addClass('views-ajax-processed');
    }
  }

  Drupal.behaviors.viewsAjax = {
    collapseReplaced: false,
    attach: function (context, settings) {
      if (!settings.views) {
        return;
      }
      // Create a jQuery UI dialog, but leave it closed.
      var dialog_area = $(settings.views.ajax.popup, context);
      dialog_area.dialog({
        'autoOpen': false,
        'dialogClass': 'views-ui-dialog',
        'modal': true,
        'position': 'center',
        'resizable': false,
        'width': 750
      });

      var base_element_settings = {
        'event': 'click',
        'progress': { 'type': 'throbber' }
      };
      // Bind AJAX behaviors to all items showing the class.
      $('a.views-ajax-link', context).once('views-ajax-processed').each(function () {
        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        if ($(this).attr('href')) {
          element_settings.url = $(this).attr('href');
        }
        var base = $(this).attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      $('div#views-live-preview a')
        .once('views-ajax-processed').each(function () {
        // We don't bind to links without a URL.
        if (!$(this).attr('href')) {
          return true;
        }

        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        element_settings.url = $(this).attr('href');
        if (Drupal.Views.getPath(element_settings.url).substring(0, 21) != 'admin/structure/views') {
          return true;
        }

        element_settings.wrapper = 'views-live-preview';
        element_settings.method = 'html';
        var base = $(this).attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      // Within a live preview, make exposed widget form buttons re-trigger the
      // Preview button.
      // @todo Revisit this after fixing Views UI to display a Preview outside
      //   of the main Edit form.
      $('div#views-live-preview input[type=submit]')
        .once('views-ajax-processed').each(function(event) {
        $(this).click(function () {
          this.form.clk = this;
          return true;
        });
        var element_settings = base_element_settings;
        // Set the URL to go to the anchor.
        element_settings.url = $(this.form).attr('action');
        if (Drupal.Views.getPath(element_settings.url).substring(0, 21) != 'admin/structure/views') {
          return true;
        }

        element_settings.wrapper = 'views-live-preview';
        element_settings.method = 'html';
        element_settings.event = 'click';

        var base = $(this).attr('id');
        Drupal.ajax[base] = new Drupal.ajax(base, this, element_settings);
      });

      if (!this.collapseReplaced && Drupal.collapseScrollIntoView) {
        this.collapseReplaced = true;
        Drupal.collapseScrollIntoView = function (node) {
          for (var $parent = $(node); $parent.get(0) != document && $parent.size() != 0; $parent = $parent.parent()) {
            if ($parent.css('overflow') == 'scroll' || $parent.css('overflow') == 'auto') {
              if (Drupal.viewsUi.resizeModal) {
                // If the modal is already at the max height, don't bother with
                // this since the only reason to do it is to grow the modal.
                if ($('.views-ui-dialog').height() < parseInt($(window).height() * .8)) {
                  Drupal.viewsUi.resizeModal('', true);
                }
              }
              return;
            }
          }

          var h = document.documentElement.clientHeight || document.body.clientHeight || 0;
          var offset = document.documentElement.scrollTop || document.body.scrollTop || 0;
          var posY = $(node).offset().top;
          var fudge = 55;
          if (posY + node.offsetHeight + fudge > h + offset) {
            if (node.offsetHeight > h) {
              window.scrollTo(0, posY);
            }
            else {
              window.scrollTo(0, posY + node.offsetHeight - h + fudge);
            }
          }
        };
      }
    }
  };

})(jQuery);
;
/**
 * @file
 * Implement a simple, clickable dropbutton menu.
 *
 * See dropbutton.theme.inc for primary documentation.
 *
 * The javascript relies on four classes:
 * - The dropbutton must be fully contained in a div with the class
 *   ctools-dropbutton. It must also contain the class ctools-no-js
 *   which will be immediately removed by the javascript; this allows for
 *   graceful degradation.
 * - The trigger that opens the dropbutton must be an a tag wit hthe class
 *   ctools-dropbutton-link. The href should just be '#' as this will never
 *   be allowed to complete.
 * - The part of the dropbutton that will appear when the link is clicked must
 *   be a div with class ctools-dropbutton-container.
 * - Finally, ctools-dropbutton-hover will be placed on any link that is being
 *   hovered over, so that the browser can restyle the links.
 *
 * This tool isn't meant to replace click-tips or anything, it is specifically
 * meant to work well presenting menus.
 */

(function ($) {
  Drupal.behaviors.CToolsDropbutton = {
    attach: function() {
      // Process buttons. All dropbuttons are buttons.
      $('.ctools-button')
        .once('ctools-button')
        .removeClass('ctools-no-js');

      // Process dropbuttons. Not all buttons are dropbuttons.
      $('.ctools-dropbutton').once('ctools-dropbutton', function() {
        var $dropbutton = $(this);
        var $button = $('.ctools-content', $dropbutton);
        var $secondaryActions = $('li', $button).not(':first');
        var $twisty = $(".ctools-link", $dropbutton);
        var open = false;
        var hovering = false;
        var timerID = 0;

        var toggle = function(close) {
          // if it's open or we're told to close it, close it.
          if (open || close) {
            // If we're just toggling it, close it immediately.
            if (!close) {
              open = false;
              $secondaryActions.slideUp(100);
              $dropbutton.removeClass('open');
            }
            else {
              // If we were told to close it, wait half a second to make
              // sure that's what the user wanted.
              // Clear any previous timer we were using.
              if (timerID) {
                clearTimeout(timerID);
              }
              timerID = setTimeout(function() {
                if (!hovering) {
                  open = false;
                  $secondaryActions.slideUp(100);
                  $dropbutton.removeClass('open');
                }}, 500);
            }
          }
          else {
            // open it.
            open = true;
            $secondaryActions.animate({height: "show", opacity: "show"}, 100);
            $dropbutton.addClass('open');
          }
        }
        // Hide the secondary actions initially.
        $secondaryActions.hide();

        $twisty.click(function() {
            toggle();
            return false;
          });

        $dropbutton.hover(
          function() {
            hovering = true;
          }, // hover in
          function() { // hover out
            hovering = false;
            toggle(true);
            return false;
          }
        );
      });
    }
  }
})(jQuery);
;
