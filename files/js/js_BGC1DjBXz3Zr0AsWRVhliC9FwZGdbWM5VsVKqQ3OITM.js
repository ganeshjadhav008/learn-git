/*global jQuery */
/*!	
* Lettering.JS 0.6.1
*
* Copyright 2010, Dave Rupert http://daverupert.com
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
*
* Thanks to Paul Irish - http://paulirish.com - for the feedback.
*
* Date: Mon Sep 20 17:14:00 2010 -0600
*/
(function($){
	function injector(t, splitter, klass, after) {
		var a = t.text().split(splitter), inject = '';
		if (a.length) {
			$(a).each(function(i, item) {
				inject += '<span class="'+klass+(i+1)+'">'+item+'</span>'+after;
			});	
			t.empty().append(inject);
		}
	}
	
	var methods = {
		init : function() {

			return this.each(function() {
				injector($(this), '', 'char', '');
			});

		},

		words : function() {

			return this.each(function() {
				injector($(this), ' ', 'word', ' ');
			});

		},
		
		lines : function() {

			return this.each(function() {
				var r = "eefec303079ad17405c889e092e105b0";
				// Because it's hard to split a <br/> tag consistently across browsers,
				// (*ahem* IE *ahem*), we replaces all <br/> instances with an md5 hash 
				// (of the word "split").  If you're trying to use this plugin on that 
				// md5 hash string, it will fail because you're being ridiculous.
				injector($(this).children("br").replaceWith(r).end(), r, 'line', '');
			});

		}
	};

	$.fn.lettering = function( method ) {
		// Method calling logic
		if ( method && methods[method] ) {
			return methods[ method ].apply( this, [].slice.call( arguments, 1 ));
		} else if ( method === 'letters' || ! method ) {
			return methods.init.apply( this, [].slice.call( arguments, 0 ) ); // always pass an array
		}
		$.error( 'Method ' +  method + ' does not exist on jQuery.lettering' );
		return this;
	};

})(jQuery);;
/*
 * jQuery replaceText - v1.1 - 11/21/2009
 * http://benalman.com/projects/jquery-replacetext-plugin/
 * 
 * Copyright (c) 2009 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function($){$.fn.replaceText=function(b,a,c){return this.each(function(){var f=this.firstChild,g,e,d=[];if(f){do{if(f.nodeType===3){g=f.nodeValue;e=g.replace(b,a);if(e!==g){if(!c&&/</.test(e)){$(f).before(e);d.push(f)}else{f.nodeValue=e}}}}while(f=f.nextSibling)}d.length&&$(d).remove()})}})(jQuery);;
(function ($) {

  Drupal.behaviors.akdnTheme = {
    attach: function(context) {
      $('h1, h2, h3, h4, a', context).each(function(){
        var inside = $(this).html();
        $(this).html(inside.replace(/Aga Khan/g, 'Aga&nbsp;Khan'));
      })
      // var s = document.getElementById('section-content');
      //s.innerHTML = s.innerHTML.replace(/Aga Khan/g, 'Aga&nbsp;Khan');

      // Search for occurences of Aga Khan.
      $("body *", context).replaceText(/(aga) (khan)/gi, "$1 $2");

      // Move main image to 2nd paragraph on basic pages.
      if ($('body.node-type-page .field-name-image-colorbox-link', context).length > 0) {
        if ($('.field-name-body p', context).length > 1) {
          var main_image = $('body.node-type-page .field-name-image-colorbox-link', context);
          $('.field-name-body p:eq(1)', context).prepend(main_image);
        }
      }

      // Function for the mobile menu.
      //$('#block-menu-block-6').hide();
      $('.mobile-menu-link', context).click(function(event) {
        event.preventDefault();
        var block = $('#block-menu-block-6');
        if (block.hasClass('open')) {
          block.removeClass('open');
          $('ul li.tmp', block).remove();
        }
        else {
          $('ul', block).prepend('<li class="tmp"><a href="/">Home</a></li>');
          block.addClass('open');
        }
      });


      // Search form default text.
      $('#block-search-form .form-item-search-block-form input', context).each(function () {
        var input = $(this);
        var placeholder = "Search AKDN";
        if (!input.val()) {
          input.val(placeholder);
        }
        input.focus(function() {
          if (input.val() == placeholder) {
            input.val('');
          }
        });
        input.blur(function() {
          if (input.val() == '') {
            input.val(placeholder);
          }
        });
      });

      // Don't search for default search text.
      $('#search-block-form', context).submit(function() {
        var search_text = $(this).find('.form-text').val();
        if (search_text == 'Search AKDN') {
          $(this).find('.form-text').val('');
        }
      });

      // Add class to last item in press centre view.
      $('.view-press-center.view-display-id-block_2 .views-limit-grouping-group', context).eq(-1).addClass('last');
      //$(".view-id-projects .slide img").reflect({height:0.4, opacity:0.3});

      // Add touch capability to the project slider
      if ($('.view-id-projects .carousel li', context).length) {

        $('.view-id-projects .carousel li', context).swipe({
          swipeRight: function(event, direction, distance, duration, fingerCount) {
            $('div.jcarousel-prev', context).trigger('click');
          },
          swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $('div.jcarousel-next', context).trigger('click');
          }
        });
      }

      if ($('.node-type-podcast #block-ds-extras-media').length) {
        $('.node-type-podcast .field-name-image-colorbox-link').addClass('podcast-has-video');
      }

      if ($('.media-image-wrapper .media-image-right').length) {
        $('.media-image-wrapper .media-image-right').parent('.media-image-wrapper').addClass('media-image-wrapper-right');
      }

      // Make sure e-mail links have domains attached to them.
      $('a[href^="mailto:"]', context).each(function() {
        var email = $(this).html();
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(email)) {
          $(this).replaceWith(email);
        }
      });

      /*if ($('.view-agencies.view-display-id-block_2 .views-table').length) {
        var last_row = $('.view-agencies.view-display-id-block_2 .views-table tbody tr:last');
        var odd_even_class = 'odd';
        if (last_row.hasClass('odd')) {
          odd_even_class = 'even';
        }
        last_row.removeClass('views-row-last');
        last_row.after('<tr class="'+odd_even_class+' views-row-last"><td class="views-field views-field-view-node views-align-left"><a href="/architecture">AKAA</a></td><td class="views-field views-field-title-field views-align-left"><a href="/architecture">Aga&nbsp;Khan Academies Architecture</a></td></tr>');
      }*/
      $(".site-name").lettering('words').children('span').lettering();


      //$("#views-exposed-form-akaa-projects-page input[name='body_value']").attr('placeholder','Enter Keyword');
        //toggle search box
        /*$('#akdn-search-forms .search_toggle').click(function(){
            $('#akdn-search-forms .form-item-search').toggle();
        });
        $('#akdn-search-forms .form-item-search').hide();*/

        // remove link frm footer titles
        $('.pane-geography-footer-menu h2.pane-title a').each(function(){
          $(this).removeAttr('href');
        });

        // geographies accordion functionality
        $('.location-links h2', context).once('footer-location-links').click(function(){
          if ($(this).children('.nolink').hasClass('active')) {
            $(this).children('.nolink').removeClass('active');
          }
          else {
            $('.location-links h2').children('.nolink').removeClass('active');
            $(this).children('.nolink').addClass('active');
          }
          $(this).next().slideToggle('fast');
          $('.location-links h2').next().not($(this).next()).slideUp('fast');
          $('.location-links h2').not($(this)).children('.nolink').removeClass('active');
        });

        $('.country_activity_link a', context).each(function() {
         var $this = $(this);
         var $rows = $this.closest('.country_activity_wrapper').find('.view-id-hub_pages .views-row');
         if ($rows.length) {
           $this.addClass('activity-icon-down');
         }
         else {
           $this.addClass('activity-icon-staright');
         }
        });

        $('.views-field-field-short-title-et .hub_pages-title', context).each(function() {
         var $this = $(this);
         var $rows = $this.closest('.views-field-field-short-title-et').next().find('.view-id-hub_pages .views-row');
         if ($rows.length) {
           $this.addClass('activity-icon-down');
           $this.find('a').removeAttr("href");
         }
         else {
           $this.addClass('activity-icon-staright');
         }
        });

        $('.views-field-field-hub-page-image-et', context).each(function() {
         var $this = $(this);
         var $rows = $this.next().next().find('.view-id-hub_pages .views-row');
         var $hreflink = $this.next().find('.hub_pages-title a').attr('href');
         if ($rows.length) {
           $this.addClass('activity-icon-down');
           $this.find('a:last').removeAttr("href");
         }
         else {
           $this.addClass('activity-icon-staright');
           $this.find('a:last').attr('href',$hreflink);
         }
        });

        // Areas of activity accordian
        $('.views-field-nothing-2 .country_activity_link', context).click(function(event){
          if ($(this).find('a').hasClass('activity-icon-down')) {
           $(this).toggleClass('active').prev().find('.view-content').slideToggle();
           event.preventDefault();
          }
        });
        // Areas of activity accordian
        $('.views-field-field-short-title-et .hub_pages-title', context).click(function(event){
          if ($(this).hasClass('activity-icon-down')) {
            $(this).closest('.views-field-field-short-title-et').next().find('.view-content').slideToggle();
            $(this).closest('.views-field-field-short-title-et').next().find('.country_activity_link').toggleClass('active');
           event.preventDefault();
          }
        });
         // Areas of activity accordian
        $('.views-field-field-hub-page-image-et', context).click(function(event){
          if ($(this).hasClass('activity-icon-down')) {
            $(this).next().next().find('.view-content').slideToggle();
            $(this).next().next().find('.country_activity_link').toggleClass('active');
           event.preventDefault();
          }
        });

        $('.views-field-nothing-2 .country_activity_title .view-content', context).hide();

        // add menu toggle button to html structure
        var menubtn  = "<li>"
                  + "<div class='menu-btn'>"
                  + "<span class='glyphicon glyphicon-menu-hamburger'></span>"
                  + "</div>"
                  + "</li>"
        if (!$('.akdn_main_body .top-navbar li .print_toggle', context).parents('ul').children().find('.menu-btn').length > 0) {
          $('.akdn_main_body .top-navbar li .print_toggle', context).parents('ul').append(menubtn);
        }
        function menubar() {

          // dropdown add span if on smaller screens
          if ($(window).width() < 992) {
            if (!$(".main-navbar", context).children().find('.menu:first').find(' > li > .nolink').children().hasClass("subnav")) {
              $(".main-navbar").children().find('.menu:first').find(' > li > .nolink').append('<span class="subnav"></span>')
            }
          } else {
            $(".main-navbar", context).children().find('.menu:first').find(' > li > .nolink').find(".subnav").remove();
          }

          // dropdown main hide show
          if ($(window).width() < 992) {
              $(".main-navbar", context).children().find('.menu').children('li').each(function () {
                  $(this, context).once('menu-sm').click(function (e) {
                      if ($(this).hasClass('active')) {
                          $(this).removeClass('active');
                          $(this).children('.menu').stop().slideUp().css('height', 'auto');
                          e.stopPropagation();
                      } else {
                          $(this).siblings().removeClass('active');
                          $(this).siblings().children('.menu').stop().slideUp().css('height', 'auto');
                          $(this).addClass('active');
                          $(this).children('.menu').stop().slideDown().css('height', 'auto');
                          e.stopPropagation();
                      }
                  });
              });
          }
        }

        // dropdown menu hide on resize
        $(window).resize(function(){
          if ($(window, context).width() > 992 && $(".main-navbar", context).children().find('.menu:first').children('li').children('.menu').length > 0) {
            $(".main-navbar", context).children().find('.menu:first').children('li').each(function () {
                $(this, context).children('.menu').hide();
                $(this, context).hover(function(){
                  $(this).children('.menu').show();
                },function(){
                  $(this, context).children('.menu').hide();
                });
            });
          } else {
            $(".main-navbar", context).children().find('.menu:first').children('li').each(function () {
              $(this).unbind('mouseenter').unbind('mouseleave');
            });
          }
        });

        // main navbar click event to show dropdown
          $(".menu-btn", context).click(function(e){
              // e.preventDefault();
              $(this, context).parents().find('.main-navbar').stop().slideToggle( 'fast', function(){
                  $(this).css('overflow','').css('height', 'auto');
               });
            // return false;
        });

        // remove text from carousel bullets
        $('.flex-control-nav').find('a').text('');

        //equalizer start
        $(window).load(function(){
          $('.akaa-akmi-body .grid-social-block').each(function() {
            $(this).addClass( "pane-facebook-feeds");
          });
          $('.pane-facebook-feeds', context).wrapAll( "<div class='social-block equalize' />");
          $('.pane-facebook-feeds').each(function() {
            $(this).addClass( "eq-col");
          });
        });
       //make social box equal height
        function equailzer() {
          $('.equalize', context).each(function(){
            $('.eq-col', context).height('auto');
              var highestBox = 0;
              $(this, context).find('.eq-col').each(function(){
                  if($(this).height() > highestBox){
                      highestBox = $(this).height();
                  }
              })
              $(this).find('.eq-col').height(highestBox);
          });
        }
        //equalizer end
        function carousel_equailzer() {
          var ww = $(window).width();
          if (ww < 768) {
            $('.whatsnew-right, .geography-page .hub-about-short-title').height('auto');
          } else if (768 < ww < 1199){
          var highestBox = $('.carousel-left .banner-slideshow-views > .view-content, .pane-featured-slideshow').height();
          $('.whatsnew-right, .geography-page .hub-about-short-title').height(highestBox);
          } else if ( ww > 1199){
          $('.whatsnew-right, .geography-page .hub-about-short-title').height(460);
          }
          else {
            $('.whatsnew-right, .geography-page .hub-about-short-title').height(460);
          }
        }
        function facts_equailzer() {
            var ww = $(window).width();
            $('.akdn-facts-block-row').height('auto');
            var maxHeight = -1;
            $('.akdn-facts-block-row', context).each(function() {
              $(this).height('auto');
             maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
            });
            $('.akdn-facts-block-row', context).each(function() {
              $(this).height('auto');
             $(this).height(maxHeight);
            });
            if (ww < 767) {
            $('.akdn-facts-block-row', context).each(function() {
              $(this).height('auto');
            });
          }
         }

        function listing_equailzer() {
          var ww = $(window).width();
          var maxHeight = -1;
          $('.publication-list-container .views-row, .page-search .view-solr-site-search .views-row, .what-we-do-inner-wrapper, .whatwedo-project-row, .akaa-press-centre-inner-wrapper', context).each(function() {
            $(this).height('auto');
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
          });
          $('.publication-list-container .views-row, .page-search .view-solr-site-search .views-row, .what-we-do-inner-wrapper, .whatwedo-project-row, .akaa-press-centre-inner-wrapper', context).each(function() {
            $(this).height('auto');
            $(this).height(maxHeight);
          });
          if (ww < 480) {
            $('.publication-list-container .views-row, .page-search .view-solr-site-search .views-row, .what-we-do-inner-wrapper, .whatwedo-project-row, .akaa-press-centre-inner-wrapper', context).each(function() {
              $(this).height('auto');
            });
          }
         }

        function aboutus_equailzer() {
          var ww = $(window).width();
          $('.akdn-basic-page-about-us [class*="panel-panel grid-"]').height('auto');
          $('.press-release-detail [class*="panel-panel grid-"]').height('auto');
          $('.section-content [class*="panel-panel grid-"]').height('auto');
            var maxHeight = -1;
          $('.akdn-basic-page-about-us [class*="panel-panel grid-"], .press-release-detail [class*="panel-panel grid-"], .section-content [class*="panel-panel grid-"]', context).each(function() {
            $(this).height('auto');
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
          });
          $('.akdn-basic-page-about-us [class*="panel-panel grid-"], .press-release-detail [class*="panel-panel grid-"], .section-content [class*="panel-panel grid-"]', context).each(function() {
            $(this).height('auto');
            $(this).height(maxHeight);
          });
          if (ww < 767) {
            $('.akdn-basic-page-about-us [class*="panel-panel grid-"], .press-release-detail [class*="panel-panel grid-"], .section-content [class*="panel-panel grid-"]', context).each(function() {
              $(this).height('auto');
            });
          }
        }

        function country_activity_title() {
          $('.country-activity-tile .hub-pages-row > .views-field-field-short-title-et').height('auto');
          var ww = $(window).width();
          var maxHeight = -1;
          $('.country-activity-tile .hub-pages-row > .views-field-field-short-title-et', context).each(function() {
            $(this).height('auto');
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
          });
          $('.country-activity-tile .hub-pages-row > .views-field-field-short-title-et', context).each(function() {
            $(this).height('auto');
            $(this).height(maxHeight);
          });
        }

        //icon valign
        function country_activity_icon_fix() {
          $('.country-activity-tile .hub-pages-row > .views-field-field-short-title-et', context).each(function() {
            var $this = $(this);
            var $height = $this.height() - 26;
            var $final_height = $height/2;
            $('.country_activity_link [class*="activity-icon-"]').css('bottom', + $final_height+'px');
          });
        }

        function country_activity() {
          $('.country-activity-tile .hub-pages-row').height('auto');
          var ww = $(window).width();
          var maxHeight = -1;
          $('.country-activity-tile .hub-pages-row', context).each(function() {
            $(this).height('auto');
            maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
          });
          $('.country-activity-tile .hub-pages-row', context).each(function() {
            $(this).height('auto');
            $(this).height(maxHeight);
          });
          if (ww < 767) {
            $('.country-activity-tile .hub-pages-row', context).each(function() {
              $(this).height('auto');
            });
          }
        }
        function menu_noborder() {
          var ww = $(window).width();
          if (ww > 992) {
            $('.main-navbar .no-border-bottom').parent('li').css('border-bottom-width', '0');
          } else {
            $('.main-navbar .no-border-bottom').parent('li').css('border-bottom-width', '1px');
          }
        }
        $(window).load(function(){
           equailzer();
           carousel_equailzer();
           facts_equailzer();
           listing_equailzer();
           aboutus_equailzer();
           country_activity_title();
           country_activity_icon_fix()
           country_activity();
           menubar() ;
          setTimeout(function() {
            carousel_equailzer();
            aboutus_equailzer();
          }, 3000);
           $('.pane-geography-footer-menu a').removeClass('active');
           var selectr = $('.pane-featured-slideshow').siblings('.pane-node-field-short-title');
           var selectr2 = $('.basic-page-slideshow').siblings('.pane-node-title-field');
           $(selectr).addClass('no_border');
           $(selectr2).addClass('no_border');
           menu_noborder();
        });
        $(window).resize(function(){
            equailzer();
            carousel_equailzer();
            facts_equailzer();
            listing_equailzer();
            aboutus_equailzer();
            country_activity_title();
            country_activity_icon_fix()
            country_activity();
            menubar() ;
            menu_noborder();
        });

        $(window).click(function(){
          var ww = $(window).width();
          //used to equalise on click actions
          if (ww > 767) {
            aboutus_equailzer();
          }
        });
        // breaking news check for image presence
        if($('.breaking-news-image .image img').length > 0){
          $('.breaking-news-main-wrapper').removeClass('no_img');
        } else {
          $('.breaking-news-main-wrapper').addClass('no_img');
        }

        // extend footer wrapper
        $(".akdn_main_body .footer-container", context).prepend("<div class='footer-left' />").append("<div class='footer-right' />");

        // extend footer container
        var ww = $(window).width();
        var footer_w = $('.footer-container').width();
        var set_w = ww - footer_w;
        var final_w = set_w / 2;
        var side_w = final_w;
        $('.akdn_main_body .footer-container .footer-left').width(final_w).css("left",-side_w+"px");
        $('.akdn_main_body .footer-container .footer-right').width(final_w).css("right",-side_w+"px");

        // extend footer container on resize
        $(window).resize(function() {
          var ww = $(window).width();
          var footer_w = $('.footer-container').width();
          var set_w = ww - footer_w;
          var final_w = set_w / 2;
          var side_w = final_w;
          $('.akdn_main_body .footer-container .footer-left').width(final_w).css("left",-side_w+"px");
          $('.akdn_main_body .footer-container .footer-right').width(final_w).css("right",-side_w+"px");
        });

        //add div to quicklinks/social wrapper
        $('#block-panels-mini-footer-menus .pane-menu-quick-links, #block-panels-mini-footer-menus .social-share-footer', context).wrapAll('<div class="quicklinks_social_block"></div>');

        //filter show/hide
        $('.page-press-centre .akdn-filter-wrapper, .page-search .akdn-filter-wrapper, .page-speech-quotes .akdn-filter-wrapper, .page-architecture-press-centre .akdn-filter-wrapper, .page-akmi-press-centre .akdn-filter-wrapper, .page-ecards. .akdn-filter-wrapper', context).wrapAll('<div class="akdn-filter-js-wrapper"></div>');
        $('.akdn-filter-js-wrapper', context).hide();
        $('.akdn-filter-show-hide h2').removeClass('active');
        $('.akdn-filter-show-hide', context).click(function(){
            $('.akdn-filter-js-wrapper', context).toggle();
            $('.akdn-filter-show-hide h2').toggleClass('active');
        });

        //Project Finder
        $('.akaa-projectfinder-wrapper .pane-title', context).once('project_finder').click(function(){
            $(this).siblings('.pane-content').find('.views-exposed-form').toggle();
            $(this).toggleClass('active');
        });
          //Project Finder
        $('.akaa-projectfinder-wrapper .block-title', context).once('project_finder').click(function(){
            $(this).siblings('.content').find('.views-exposed-form').toggle();
            $(this).toggleClass('active');
        });

        // add placeholders for filter inputs
        // $('.form-type-date-popup.form-item-date-filter-from input.form-text').attr('placeholder','From');
        // $('.form-type-date-popup.form-item-date-filter-to input.form-text').attr('placeholder','To');

        // search bar functionality
        if (!$('#edit-search').val() == 'search' || !$('#edit-search').val() == '') {
          $('#edit-search').css('border','1px solid #ccc');
        }
        else {
          $('#edit-search').css('border','1px solid transparent');
        }
        $( "#edit-search" ).blur(function() {
          if (!$('#edit-search').val() == 'search' || !$('#edit-search').val() == '') {
              $('#edit-search').css('border','1px solid #ccc');
            }
            else {
              $('#edit-search').css('border','1px solid transparent');
            }
        });
        //removing last comman from link
        $('.akdn-basic-page .field-type-link-field .field-item, .press-release-detail .field-type-link-field .field-item', context).each(function(){
            var txt = $(this).html().trim().slice(0,-1);
            $(this).html(txt);
        });
        // where we work two tile fix
        var ww = $(window).width();
        var hub_pg_row = $('.geography-page .pane-hub-pages .hub-pages-row');
        if(hub_pg_row.length == 2 && ww > 480) {
          hub_pg_row.addClass('block_half');
        } else if(hub_pg_row.length == 2 && ww < 480) {
          hub_pg_row.addClass('block_full');
        } else {
        }
        $(window).resize(function(){
          var ww = $(window).width();
          if(hub_pg_row.length == 2 && ww > 480) {
            hub_pg_row.addClass('block_half');
            hub_pg_row.removeClass('block_full');
          } else if(hub_pg_row.length == 2 && ww < 480) {
            hub_pg_row.addClass('block_full');
            hub_pg_row.removeClass('block_half');
          }
        });

    /* Accordion for AATD */
    var click_link = $('.read-more-link').parents('.grid-about-us-block_description-hhak');
    $(click_link).next('.default-should-be-hide').removeClass('shown').addClass('hidden');
    $(click_link).find('.related').removeClass('shown').addClass('hidden');
    $('.read-more-link', context).click(function(e) {
      e.preventDefault();
      if(!$(this).parents('.grid-about-us-block_description-hhak').next('.default-should-be-hide').hasClass('shown')) {
        $(click_link).next('.default-should-be-hide').removeClass('shown').addClass('hidden');
        $(click_link).find('.related').removeClass('shown').addClass('hidden');
        $(this).parents('.grid-about-us-block_description-hhak').next('.default-should-be-hide').removeClass('hidden').addClass('shown');
        $(this).parents('.grid-about-us-block_description-hhak').find('.related').removeClass('hidden').addClass('shown');
        aboutus_equailzer();
      } else {
        $(click_link).next('.default-should-be-hide').removeClass('shown').addClass('hidden');
        $(click_link).find('.related').removeClass('shown').addClass('hidden');
        aboutus_equailzer();
      }
    });
    /* *** */
    $(".all-activities-btn").click(function(){
        $(".all-activities-sidebar").toggle();
        $(this).toggleClass("bounce");
    });

    if(!$('.hub-page-rural-development').find('.field-content a').length > 0) {
      $('.hub-page-rural-development').addClass('hide');
    }
    /**/

    // Accordion Functionality for Speech-Quotes Page _/\_ DO NOT ALTER
    $('.more-quotes').once('quotes_accordion').click(function() {
      var showtxt = "Show more quotations";
      var lesstxt = "Show less";
      if ($(this).hasClass('active')) {
        $(this).removeClass('active').text(showtxt);
      }
      else {
        $('.more-quotes').removeClass('active').text(showtxt);
        $(this).addClass('active').text(lesstxt);
      }
      $('.quote-finder-wrap .hide-speech-quotes.show').addClass('hide').removeClass('show');
      var cls = $(this).closest('.speech-quote-wrapper').find('.hide-speech-quotes')
      if ($(this).hasClass('active')) {
        $(cls).removeClass('hide').addClass('show');
      }
    });

    // Remove empty speech quotes from DOM
    jQuery('.speech-quote-wrapper').each(function(){
      var quoteDiv = jQuery(this).find('.show-speech-quotes');
      if (!jQuery(quoteDiv).length){
        jQuery(this).closest('.views-limit-grouping-group').remove();
      }
    });

    if($('.gallery-thumbs li').length < 4) {
      $('.gallery-thumbs li').css('margin-bottom','5px');
      $('.gallery-thumbs').css('padding', '0');
    }

    if($('.pane-featured-slideshow .slides li').length > 5) {
      $('.flex-control-nav').hide();
    }
    if($('.akaa-cycle-slideshow .slides li').length > 5) {
      $('.flex-control-nav').hide();
    }

  function plcholdr(){
    var placeholder = $('.akaa-projectfinder-wrapper .views-widget-filter-field_cycle_year_tid select');
      if(placeholder.val() == "All") {
       placeholder.addClass("plcholdr");
      }
      else {
       placeholder.removeClass("plcholdr")
      }
  }
  $(window).load(function() {
    plcholdr();
  });
  $('.akaa-projectfinder-wrapper .views-widget-filter-field_cycle_year_tid select', context).change(function () {
      if($(this).val() == "All") {
       $(this).addClass("plcholdr");
      }
      else {
       $(this).removeClass("plcholdr")
      }
  });

  //jQuery('.akaa-projectfinder-wrapper .views-reset-button').insertBefore('.akaa-projectfinder-wrapper .views-submit-button');

  $('.akaa-award-cycle-block .attachment .view-award-cycle .view-content, .akaa-award-cycle-block .attachment .info-akmi-block .view-content', context).hide();
  $('.akaa-award-cycle-block .attachment .view-award-cycle .view-content .views-row .field-content:empty, .akaa-award-cycle-block .attachment .info-akmi-block .view-content .views-row .field-content:empty', context).closest('.views-row').remove();

  // AKAA CYCLE CHECK ROW LENGTH
  $('.akaa-award-cycle-block', context).each(function() {
   var $this = $(this).children().find('.attachment .view-award-cycle');
   var $rows = $this.find('.view-content .views-row');
   if ($rows.length) {
     $this.find('.akaa-cycle-title').addClass('activity-icon-down').children('a').removeAttr("href");
     $this.find('.akaa-icon-title a').addClass('activity-icon-down').removeAttr("href");
     $(this).find('.akaa_cycle_image').addClass('activity-icon-down').children('a').removeAttr("href");
   }
   else {
     var a_href = $this.find('.akaa-cycle-title a').attr('href');
     $this.find('.akaa-cycle-title').addClass('activity-icon-staright');
     $this.find('.akaa-icon-title a').addClass('activity-icon-staright').attr('href',a_href);
     $(this).find('.akaa_cycle_image').addClass('activity-icon-staright').children('a').attr('href',a_href);
   }
  });

  // AKMI CHECK ROW LENGTH
  $('.akaa-award-cycle-block', context).each(function() {
   var $this = $(this).children().find('.attachment .info-akmi-block');
   var $rows = $this.find('.view-content .views-row');
   if ($rows.length) {
     $this.find('.akaa-cycle-title').addClass('activity-icon-down').children('a').removeAttr("href");
     $this.find('.akaa-icon-title a').addClass('activity-icon-down').removeAttr("href");
     $(this).find('.akaa_cycle_image').addClass('activity-icon-down').children('a').removeAttr("href");
   }
   else {
     var a_href = $this.find('.akaa-cycle-title a').attr('href');
     $this.find('.akaa-cycle-title').addClass('activity-icon-staright');
     $this.find('.akaa-icon-title a').addClass('activity-icon-staright').attr('href',a_href);
     $(this).find('.akaa_cycle_image').addClass('activity-icon-staright').children('a').attr('href',a_href);
   }
  });
  // AKAA CYCLE DROPDOWN
  $('.akaa-award-cycle-block .akaa-icon-title', context).once('akaa_cycle_icon').click(function(event){
    if ($(this).find('a').hasClass('activity-icon-down')) {
      $(this).toggleClass('active').closest('.view-footer').siblings('.view-content').slideToggle();
      event.preventDefault();
    }
  });
  // AKAA CYCLE DROPDOWN
  $('.akaa-award-cycle-block .akaa-cycle-title', context).once('akaa_cycle_title').click(function(event){
    if ($(this).hasClass('activity-icon-down')) {
      $(this).closest('.view-header').next('.view-content').slideToggle();
      $(this).closest('.view-header').siblings('.view-footer').find('.akaa-icon-title').toggleClass('active');
      event.preventDefault();
    }
  });
  // AKAA CYCLE DROPDOWN
  $('.akaa-award-cycle-block .akaa_cycle_image', context).once('akaa_cycle_image_processed').click(function(event){
    var $this = $(this).closest('.view-content').siblings('.attachment');
    if ($(this).hasClass('activity-icon-down')) {
      $this.find('.view-content').slideToggle();
      $this.find('.view-header').siblings('.view-footer').find('.akaa-icon-title').toggleClass('active');
      event.preventDefault();
    }
  });
  // akaa all award cycle btn
  $(".akaa-all-award-cycle-btn",context).once('akaa_all_cycle').click(function(){
      $(".akaa-all-award-cycle-wrapper").toggle();
      $(this).toggleClass("bounce");
  });


//added custom link publicatin image
        $('.node-type-publication .publications_file_url', context).hide();
        var pdf_url = jQuery('.node-type-publication .publications_file_url .field-item', context).html();
        $('.node-type-publication .publications_image_path .field-item a', context).attr('href', '');
        $('.node-type-publication .publications_image_path .field-item a', context).attr('href', pdf_url);
        $('.node-type-publication .publications_image_path .field-item a', context).attr('target', '_blank');

//mCustomScrollbar
    $(window).load(function(){
      $(".akdn-filter-js-wrapper .akdn-filter-wrapper .item-list").mCustomScrollbar({
        axis:"y",
        theme:"3d-dark"
      });
    });
    //wrapper for akdn-590 caption
    $('.media', context).each(function() {
      $(this).find('[class*="field-name-field-image-"]').wrapAll( "<div class='field-show-hide-block' />");
    });

    function akaa_award_cycle_title() {
      $('.akaa-award-cycle-block .attachment').height('auto');
      var ww = $(window).width();
      var maxHeight = -1;
      $('.akaa-award-cycle-block .attachment', context).each(function() {
        $(this).height('auto');
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
      });
      $('.akaa-award-cycle-block .attachment', context).each(function() {
        $(this).height('auto');
        $(this).height(maxHeight);
      });
    }

    //listing page vertical line equaliser
    function vertical_line_eq(){
      var ww = jQuery(window).width();
      var maxHeight = -1;
      jQuery('.in-media-container .in-media-block', context).each(function() {
          jQuery(this).height('auto');
          maxHeight = maxHeight > jQuery(this).height() ? maxHeight : jQuery(this).height();
      });
      jQuery('.in-media-container .in-media-block', context).each(function() {
          jQuery(this).height('auto');
          jQuery(this).height(maxHeight);
      });
    }

    //geography page grid equaliser
    function geo_grid_eq(){
      var ww = $(window).width();
      $('.geography-grid-equalise', context).height('auto');
        var maxHeight = -1;
      $('.geography-grid-equalise', context).each(function() {
        $(this).height('auto');
        maxHeight = maxHeight > $(this).height() ? maxHeight : $(this).height();
      });
      $('.geography-grid-equalise', context).each(function() {
        $(this).height('auto');
        $(this).height(maxHeight);
      });
      if (ww < 767) {
        $('.geography-grid-equalise', context).each(function() {
          $(this).height('auto');
        });
      }
    }

    //remove extra div from wrapper from akaa cylce wrapper
    $(window).load(function(){
      $('.akaa-award-cycle-wrapper > p', context).remove();
      $('.akaa-award-cycle-wrapper .panel-separator', context).remove();

      //length of artists
      jQuery('.related-artist').each(function() {
        var $this = jQuery(this);
        var heading_len = $this.find('.related-heading');
        var list_len = $this.find('ul');
        if(!heading_len.length > 0 && !list_len.length > 0) {
          $this.addClass('hidden_artist');
        }
      });
      akaa_award_cycle_title();
      //listing page vertical line equaliser
      vertical_line_eq();
      geo_grid_eq();
      //if whatwedo right does not exist
      if(!$('.geography-see-also .see-also-brochure, .geography-see-also .see-also-custom').length > 0) {
        $('.geography-see-also').addClass('hide');
        $('.geography-grid-equalise').removeClass('whatwedo-left').height('auto');
      }
      //Add more link to events
      var event_link = "akmi/events/2016";
      $('.akmi-homepage .akaa-award-cycle-wrapper .pane-akmi-events-views.akaa-award-cycle-block .attachment .view-content').append('<div class="views-row"><a href="' + event_link + '">More</a></div>');

    });
    $(window).resize(function(){
      vertical_line_eq();
      geo_grid_eq();
    });

  // akmi all award cycle btn
  $(".akmi-all-performance-programme-btn",context).once('akmi_all_perf_prog').click(function(){
      $(this).find('.view-content').toggle();
      $(this).toggleClass("bounce");
  });

  // basic-page-custom-block-right check for content
  if($('.basic-page-custom-block-right .view-header').length > 0){
    $('.basic-page-custom-block-right').removeClass('no_tp_br');
  } else {
    $('.basic-page-custom-block-right').addClass('no_tp_br');
  }
  //Script to Change submit button visibility on Contact Us webform
  $(document).ready(function(){
    if ($("#webform-client-form-4310").length > 0){
      $("#edit-submitted-wrapper-subject").bind("change", function() {
          if ($("#edit-submitted-wrapper-subject").val()==1 || $("#edit-submitted-wrapper-subject").val()==10 || $("#edit-submitted-wrapper-subject").val()==12 || $("#edit-submitted-wrapper-subject").val()==16 || $("#edit-submitted-wrapper-subject").val()==20 ) {
             $("#edit-submit").hide();
          } else {
             $("#edit-submit").show();
          }
      });
    }
  });
$(window).load(function(){
  if ($("#webform-client-form-4310").length > 0){
    if ($("#edit-submitted-wrapper-subject").val()==1) {
       $("#edit-submit").hide();
    }
  }
});

  // Script to remove fb like comment box
  $('.fb-like iframe').once('fb_hidecomnt').addClass('fb_hidecomm');
  $(window).load(function() {
    if($('body').hasClass('front') || $('body').hasClass('akaa-body') || $('body').hasClass('akmi-homepage')){
      FB.Event.subscribe('edge.create',
          function(response) {
              //alert('You liked the URL: ' + response);
              $('.fb-like').find('iframe').removeClass('fb_hidecomm');
              setTimeout(function() {
                $('.fb-like').find('iframe').addClass('fb_hidecomm');
              }, 300);
          }
      );
    }
  });

   // Remove hidden Social Block from DOM/HTML - Required while printing
 $(window).load(function() {
   $('.social-block .pane-facebook-feeds').each(function(){
     if($(this).is( ":hidden" )){
       $(this).remove();
     }
   });
 });

  // To remove extra 10px margin from font-size
  $("[style='font-size: x-small;']").css("margin", "0px");

  // fix line for block title
  $(window).load(function() {
    $('.sub-navbar p').addClass('indexfix');
  });

  //Remove border from custom header block
  if($('.basic-page-custom-block-right .pane-content > .view .field-content').is(':empty')){
    $('.basic-page-custom-block-right').addClass('rem_brdr');
  }

  }
}

})(jQuery);
;
jQuery(document).ready(function() { // FUNCTION CALLED WHEN DOCMENT READY
    
   toggle_menubar(); 
   insert_akmifilterblock(); 
});


jQuery(window).resize(function(){ // FUNCTION CALLED WHEN DEVICE ORIENTANTAION CHANGE OR CHNAGE IN THE WIDTH OF THE BROSWER
    
     insert_akmifilterblock(); // Function to insert before akmi filter to the content on akmi search pages on mobile
     
});

function toggle_menubar(){  // Function to toggle menu block on mobile devices
//     jQuery('.menu-title .arrow').click(function() {
//        jQuery('.toggle-block .view-content').slideToggle();
//        jQuery(this).toggleClass('up-arrow');
//    });
    
//      jQuery('.menu-title .arrow').each(function() {
//           jQuery(this).click(function() {
//        jQuery(this).find('').slideToggle();
//        jQuery(this).toggleClass('up-arrow');
//    });
//      });

jQuery('.menu-title .arrow').each(function() {
        jQuery(this).click(function(){          
             jQuery(this).toggleClass('up-arrow');
            if(jQuery(this).hasClass('up-arrow')){
                jQuery(this).closest('.toggle-block').find('.view-content').slideUp();
            }
           else{
               jQuery(this).closest('.toggle-block').find('.view-content').slideDown();
           }
        });
});
    
    jQuery('.menu-link-toggle').click(function(){
        jQuery('.mobile-menu').slideToggle();
    });
    
}

function insert_akmifilterblock(){  // Function to insert before akmi filter to the content on akmi search pages on mobile
    var width = jQuery(window).width();
    if(width <= 740){
         jQuery('.akmi-search-result-sidebar-first').insertBefore('.akmi-search-result-content-area');
        
    }else{
        jQuery('.akmi-search-result-sidebar-first').insertAfter('.akmi-search-result-content-area');
    }
    
};
/*
* touchSwipe - jQuery Plugin
* https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
* http://labs.skinkers.com/touchSwipe/
* http://plugins.jquery.com/project/touchSwipe
*
* Copyright (c) 2010 Matt Bryson (www.skinkers.com)
* Dual licensed under the MIT or GPL Version 2 licenses.
*
* $version: 1.3.3
*/(function(g){function P(c){if(c&&void 0===c.allowPageScroll&&(void 0!==c.swipe||void 0!==c.swipeStatus))c.allowPageScroll=G;c||(c={});c=g.extend({},g.fn.swipe.defaults,c);return this.each(function(){var b=g(this),f=b.data(w);f||(f=new W(this,c),b.data(w,f))})}function W(c,b){var f,p,r,s;function H(a){var a=a.originalEvent,c,Q=n?a.touches[0]:a;d=R;n?h=a.touches.length:a.preventDefault();i=0;j=null;k=0;!n||h===b.fingers||b.fingers===x?(r=f=Q.pageX,s=p=Q.pageY,y=(new Date).getTime(),b.swipeStatus&&(c= l(a,d))):t(a);if(!1===c)return d=m,l(a,d),c;e.bind(I,J);e.bind(K,L)}function J(a){a=a.originalEvent;if(!(d===q||d===m)){var c,e=n?a.touches[0]:a;f=e.pageX;p=e.pageY;u=(new Date).getTime();j=S();n&&(h=a.touches.length);d=z;var e=a,g=j;if(b.allowPageScroll===G)e.preventDefault();else{var o=b.allowPageScroll===T;switch(g){case v:(b.swipeLeft&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case A:(b.swipeRight&&o||!o&&b.allowPageScroll!=M)&&e.preventDefault();break;case B:(b.swipeUp&&o||!o&&b.allowPageScroll!= N)&&e.preventDefault();break;case C:(b.swipeDown&&o||!o&&b.allowPageScroll!=N)&&e.preventDefault()}}h===b.fingers||b.fingers===x||!n?(i=U(),k=u-y,b.swipeStatus&&(c=l(a,d,j,i,k)),b.triggerOnTouchEnd||(e=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1),!0===D()?(d=q,c=l(a,d)):e&&(d=m,l(a,d)))):(d=m,l(a,d));!1===c&&(d=m,l(a,d))}}function L(a){a=a.originalEvent;a.preventDefault();u=(new Date).getTime();i=U();j=S();k=u-y;if(b.triggerOnTouchEnd||!1===b.triggerOnTouchEnd&&d===z)if(d=q,(h===b.fingers||b.fingers=== x||!n)&&0!==f){var c=!(b.maxTimeThreshold?!(k>=b.maxTimeThreshold):1);if((!0===D()||null===D())&&!c)l(a,d);else if(c||!1===D())d=m,l(a,d)}else d=m,l(a,d);else d===z&&(d=m,l(a,d));e.unbind(I,J,!1);e.unbind(K,L,!1)}function t(){y=u=p=f=s=r=h=0}function l(a,c){var d=void 0;b.swipeStatus&&(d=b.swipeStatus.call(e,a,c,j||null,i||0,k||0,h));if(c===m&&b.click&&(1===h||!n)&&(isNaN(i)||0===i))d=b.click.call(e,a,a.target);if(c==q)switch(b.swipe&&(d=b.swipe.call(e,a,j,i,k,h)),j){case v:b.swipeLeft&&(d=b.swipeLeft.call(e, a,j,i,k,h));break;case A:b.swipeRight&&(d=b.swipeRight.call(e,a,j,i,k,h));break;case B:b.swipeUp&&(d=b.swipeUp.call(e,a,j,i,k,h));break;case C:b.swipeDown&&(d=b.swipeDown.call(e,a,j,i,k,h))}(c===m||c===q)&&t(a);return d}function D(){return null!==b.threshold?i>=b.threshold:null}function U(){return Math.round(Math.sqrt(Math.pow(f-r,2)+Math.pow(p-s,2)))}function S(){var a;a=Math.atan2(p-s,r-f);a=Math.round(180*a/Math.PI);0>a&&(a=360-Math.abs(a));return 45>=a&&0<=a?v:360>=a&&315<=a?v:135<=a&&225>=a? A:45<a&&135>a?C:B}function V(){e.unbind(E,H);e.unbind(F,t);e.unbind(I,J);e.unbind(K,L)}var O=n||!b.fallbackToMouseEvents,E=O?"touchstart":"mousedown",I=O?"touchmove":"mousemove",K=O?"touchend":"mouseup",F="touchcancel",i=0,j=null,k=0,e=g(c),d="start",h=0,y=p=f=s=r=0,u=0;try{e.bind(E,H),e.bind(F,t)}catch(P){g.error("events not supported "+E+","+F+" on jQuery.swipe")}this.enable=function(){e.bind(E,H);e.bind(F,t);return e};this.disable=function(){V();return e};this.destroy=function(){V();e.data(w,null); return e}}var v="left",A="right",B="up",C="down",G="none",T="auto",M="horizontal",N="vertical",x="all",R="start",z="move",q="end",m="cancel",n="ontouchstart"in window,w="TouchSwipe";g.fn.swipe=function(c){var b=g(this),f=b.data(w);if(f&&"string"===typeof c){if(f[c])return f[c].apply(this,Array.prototype.slice.call(arguments,1));g.error("Method "+c+" does not exist on jQuery.swipe")}else if(!f&&("object"===typeof c||!c))return P.apply(this,arguments);return b};g.fn.swipe.defaults={fingers:1,threshold:75, maxTimeThreshold:null,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,click:null,triggerOnTouchEnd:!0,allowPageScroll:"auto",fallbackToMouseEvents:!0};g.fn.swipe.phases={PHASE_START:R,PHASE_MOVE:z,PHASE_END:q,PHASE_CANCEL:m};g.fn.swipe.directions={LEFT:v,RIGHT:A,UP:B,DOWN:C};g.fn.swipe.pageScroll={NONE:G,HORIZONTAL:M,VERTICAL:N,AUTO:T};g.fn.swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:x}})(jQuery);;
/**
 * detect IE
 * returns version of IE or false, if browser is not Internet Explorer
 */
function detectIE() {
  var ua = window.navigator.userAgent;
  var msie = ua.indexOf('MSIE ');
  if (msie > 0) {
    // IE 10 or older => return version number
    return parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
  }
  var trident = ua.indexOf('Trident/');
  if (trident > 0) {
    // IE 11 => return version number
    var rv = ua.indexOf('rv:');
    return parseInt(ua.substring(rv + 3, ua.indexOf('.', rv)), 10);
  }
  var edge = ua.indexOf('Edge/');
  if (edge > 0) {
    // IE 12 => return version number
    return parseInt(ua.substring(edge + 5, ua.indexOf('.', edge)), 10);
  }
  // other browser
  return false;
}

// detect IE
var IEversion = detectIE();
if (IEversion !== false) {
	jQuery('#edit-search').css({'text-align':'right','color':'#b2b2b2'});
	jQuery('#edit-search').keyup(function(){
		if(jQuery(this).val()==''){ 
			jQuery(this).css({'text-align':'right','color':'#b2b2b2'});
		} else { 
			jQuery(this).css({'text-align':'left','color':'#555555'});
		}
	});
} else {
};
/* == jquery mousewheel plugin == Version: 3.1.13, License: MIT License (MIT) */
!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});!function(a){"function"==typeof define&&define.amd?define(["jquery"],a):"object"==typeof exports?module.exports=a:a(jQuery)}(function(a){function b(b){var g=b||window.event,h=i.call(arguments,1),j=0,l=0,m=0,n=0,o=0,p=0;if(b=a.event.fix(g),b.type="mousewheel","detail"in g&&(m=-1*g.detail),"wheelDelta"in g&&(m=g.wheelDelta),"wheelDeltaY"in g&&(m=g.wheelDeltaY),"wheelDeltaX"in g&&(l=-1*g.wheelDeltaX),"axis"in g&&g.axis===g.HORIZONTAL_AXIS&&(l=-1*m,m=0),j=0===m?l:m,"deltaY"in g&&(m=-1*g.deltaY,j=m),"deltaX"in g&&(l=g.deltaX,0===m&&(j=-1*l)),0!==m||0!==l){if(1===g.deltaMode){var q=a.data(this,"mousewheel-line-height");j*=q,m*=q,l*=q}else if(2===g.deltaMode){var r=a.data(this,"mousewheel-page-height");j*=r,m*=r,l*=r}if(n=Math.max(Math.abs(m),Math.abs(l)),(!f||f>n)&&(f=n,d(g,n)&&(f/=40)),d(g,n)&&(j/=40,l/=40,m/=40),j=Math[j>=1?"floor":"ceil"](j/f),l=Math[l>=1?"floor":"ceil"](l/f),m=Math[m>=1?"floor":"ceil"](m/f),k.settings.normalizeOffset&&this.getBoundingClientRect){var s=this.getBoundingClientRect();o=b.clientX-s.left,p=b.clientY-s.top}return b.deltaX=l,b.deltaY=m,b.deltaFactor=f,b.offsetX=o,b.offsetY=p,b.deltaMode=0,h.unshift(b,j,l,m),e&&clearTimeout(e),e=setTimeout(c,200),(a.event.dispatch||a.event.handle).apply(this,h)}}function c(){f=null}function d(a,b){return k.settings.adjustOldDeltas&&"mousewheel"===a.type&&b%120===0}var e,f,g=["wheel","mousewheel","DOMMouseScroll","MozMousePixelScroll"],h="onwheel"in document||document.documentMode>=9?["wheel"]:["mousewheel","DomMouseScroll","MozMousePixelScroll"],i=Array.prototype.slice;if(a.event.fixHooks)for(var j=g.length;j;)a.event.fixHooks[g[--j]]=a.event.mouseHooks;var k=a.event.special.mousewheel={version:"3.1.12",setup:function(){if(this.addEventListener)for(var c=h.length;c;)this.addEventListener(h[--c],b,!1);else this.onmousewheel=b;a.data(this,"mousewheel-line-height",k.getLineHeight(this)),a.data(this,"mousewheel-page-height",k.getPageHeight(this))},teardown:function(){if(this.removeEventListener)for(var c=h.length;c;)this.removeEventListener(h[--c],b,!1);else this.onmousewheel=null;a.removeData(this,"mousewheel-line-height"),a.removeData(this,"mousewheel-page-height")},getLineHeight:function(b){var c=a(b),d=c["offsetParent"in a.fn?"offsetParent":"parent"]();return d.length||(d=a("body")),parseInt(d.css("fontSize"),10)||parseInt(c.css("fontSize"),10)||16},getPageHeight:function(b){return a(b).height()},settings:{adjustOldDeltas:!0,normalizeOffset:!0}};a.fn.extend({mousewheel:function(a){return a?this.bind("mousewheel",a):this.trigger("mousewheel")},unmousewheel:function(a){return this.unbind("mousewheel",a)}})});
/* == malihu jquery custom scrollbar plugin == Version: 3.1.3, License: MIT License (MIT) */
!function(e){"undefined"!=typeof module&&module.exports?module.exports=e:e(jQuery,window,document)}(function(e){!function(t){var o="function"==typeof define&&define.amd,a="undefined"!=typeof module&&module.exports,n="https:"==document.location.protocol?"https:":"http:",i="cdnjs.cloudflare.com/ajax/libs/jquery-mousewheel/3.1.13/jquery.mousewheel.min.js";o||(a?require("jquery-mousewheel")(e):e.event.special.mousewheel||e("head").append(decodeURI("%3Cscript src="+n+"//"+i+"%3E%3C/script%3E"))),t()}(function(){var t,o="mCustomScrollbar",a="mCS",n=".mCustomScrollbar",i={setTop:0,setLeft:0,axis:"y",scrollbarPosition:"inside",scrollInertia:950,autoDraggerLength:!0,alwaysShowScrollbar:0,snapOffset:0,mouseWheel:{enable:!0,scrollAmount:"auto",axis:"y",deltaFactor:"auto",disableOver:["select","option","keygen","datalist","textarea"]},scrollButtons:{scrollType:"stepless",scrollAmount:"auto"},keyboard:{enable:!0,scrollType:"stepless",scrollAmount:"auto"},contentTouchScroll:25,documentTouchScroll:!0,advanced:{autoScrollOnFocus:"input,textarea,select,button,datalist,keygen,a[tabindex],area,object,[contenteditable='true']",updateOnContentResize:!0,updateOnImageLoad:"auto",autoUpdateTimeout:60},theme:"light",callbacks:{onTotalScrollOffset:0,onTotalScrollBackOffset:0,alwaysTriggerOffsets:!0}},r=0,l={},s=window.attachEvent&&!window.addEventListener?1:0,c=!1,d=["mCSB_dragger_onDrag","mCSB_scrollTools_onDrag","mCS_img_loaded","mCS_disabled","mCS_destroyed","mCS_no_scrollbar","mCS-autoHide","mCS-dir-rtl","mCS_no_scrollbar_y","mCS_no_scrollbar_x","mCS_y_hidden","mCS_x_hidden","mCSB_draggerContainer","mCSB_buttonUp","mCSB_buttonDown","mCSB_buttonLeft","mCSB_buttonRight"],u={init:function(t){var t=e.extend(!0,{},i,t),o=f.call(this);if(t.live){var s=t.liveSelector||this.selector||n,c=e(s);if("off"===t.live)return void m(s);l[s]=setTimeout(function(){c.mCustomScrollbar(t),"once"===t.live&&c.length&&m(s)},500)}else m(s);return t.setWidth=t.set_width?t.set_width:t.setWidth,t.setHeight=t.set_height?t.set_height:t.setHeight,t.axis=t.horizontalScroll?"x":p(t.axis),t.scrollInertia=t.scrollInertia>0&&t.scrollInertia<17?17:t.scrollInertia,"object"!=typeof t.mouseWheel&&1==t.mouseWheel&&(t.mouseWheel={enable:!0,scrollAmount:"auto",axis:"y",preventDefault:!1,deltaFactor:"auto",normalizeDelta:!1,invert:!1}),t.mouseWheel.scrollAmount=t.mouseWheelPixels?t.mouseWheelPixels:t.mouseWheel.scrollAmount,t.mouseWheel.normalizeDelta=t.advanced.normalizeMouseWheelDelta?t.advanced.normalizeMouseWheelDelta:t.mouseWheel.normalizeDelta,t.scrollButtons.scrollType=g(t.scrollButtons.scrollType),h(t),e(o).each(function(){var o=e(this);if(!o.data(a)){o.data(a,{idx:++r,opt:t,scrollRatio:{y:null,x:null},overflowed:null,contentReset:{y:null,x:null},bindEvents:!1,tweenRunning:!1,sequential:{},langDir:o.css("direction"),cbOffsets:null,trigger:null,poll:{size:{o:0,n:0},img:{o:0,n:0},change:{o:0,n:0}}});var n=o.data(a),i=n.opt,l=o.data("mcs-axis"),s=o.data("mcs-scrollbar-position"),c=o.data("mcs-theme");l&&(i.axis=l),s&&(i.scrollbarPosition=s),c&&(i.theme=c,h(i)),v.call(this),n&&i.callbacks.onCreate&&"function"==typeof i.callbacks.onCreate&&i.callbacks.onCreate.call(this),e("#mCSB_"+n.idx+"_container img:not(."+d[2]+")").addClass(d[2]),u.update.call(null,o)}})},update:function(t,o){var n=t||f.call(this);return e(n).each(function(){var t=e(this);if(t.data(a)){var n=t.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container"),l=e("#mCSB_"+n.idx),s=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];if(!r.length)return;n.tweenRunning&&N(t),o&&n&&i.callbacks.onBeforeUpdate&&"function"==typeof i.callbacks.onBeforeUpdate&&i.callbacks.onBeforeUpdate.call(this),t.hasClass(d[3])&&t.removeClass(d[3]),t.hasClass(d[4])&&t.removeClass(d[4]),l.css("max-height","none"),l.height()!==t.height()&&l.css("max-height",t.height()),_.call(this),"y"===i.axis||i.advanced.autoExpandHorizontalScroll||r.css("width",x(r)),n.overflowed=y.call(this),M.call(this),i.autoDraggerLength&&S.call(this),b.call(this),T.call(this);var c=[Math.abs(r[0].offsetTop),Math.abs(r[0].offsetLeft)];"x"!==i.axis&&(n.overflowed[0]?s[0].height()>s[0].parent().height()?B.call(this):(V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}),n.contentReset.y=null):(B.call(this),"y"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[1]&&V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}))),"y"!==i.axis&&(n.overflowed[1]?s[1].width()>s[1].parent().width()?B.call(this):(V(t,c[1].toString(),{dir:"x",dur:0,overwrite:"none"}),n.contentReset.x=null):(B.call(this),"x"===i.axis?k.call(this):"yx"===i.axis&&n.overflowed[0]&&V(t,c[0].toString(),{dir:"y",dur:0,overwrite:"none"}))),o&&n&&(2===o&&i.callbacks.onImageLoad&&"function"==typeof i.callbacks.onImageLoad?i.callbacks.onImageLoad.call(this):3===o&&i.callbacks.onSelectorChange&&"function"==typeof i.callbacks.onSelectorChange?i.callbacks.onSelectorChange.call(this):i.callbacks.onUpdate&&"function"==typeof i.callbacks.onUpdate&&i.callbacks.onUpdate.call(this)),X.call(this)}})},scrollTo:function(t,o){if("undefined"!=typeof t&&null!=t){var n=f.call(this);return e(n).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l={trigger:"external",scrollInertia:r.scrollInertia,scrollEasing:"mcsEaseInOut",moveDragger:!1,timeout:60,callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},s=e.extend(!0,{},l,o),c=q.call(this,t),d=s.scrollInertia>0&&s.scrollInertia<17?17:s.scrollInertia;c[0]=Y.call(this,c[0],"y"),c[1]=Y.call(this,c[1],"x"),s.moveDragger&&(c[0]*=i.scrollRatio.y,c[1]*=i.scrollRatio.x),s.dur=oe()?0:d,setTimeout(function(){null!==c[0]&&"undefined"!=typeof c[0]&&"x"!==r.axis&&i.overflowed[0]&&(s.dir="y",s.overwrite="all",V(n,c[0].toString(),s)),null!==c[1]&&"undefined"!=typeof c[1]&&"y"!==r.axis&&i.overflowed[1]&&(s.dir="x",s.overwrite="none",V(n,c[1].toString(),s))},s.timeout)}})}},stop:function(){var t=f.call(this);return e(t).each(function(){var t=e(this);t.data(a)&&N(t)})},disable:function(t){var o=f.call(this);return e(o).each(function(){var o=e(this);if(o.data(a)){{o.data(a)}X.call(this,"remove"),k.call(this),t&&B.call(this),M.call(this,!0),o.addClass(d[3])}})},destroy:function(){var t=f.call(this);return e(t).each(function(){var n=e(this);if(n.data(a)){var i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx),s=e("#mCSB_"+i.idx+"_container"),c=e(".mCSB_"+i.idx+"_scrollbar");r.live&&m(r.liveSelector||e(t).selector),X.call(this,"remove"),k.call(this),B.call(this),n.removeData(a),K(this,"mcs"),c.remove(),s.find("img."+d[2]).removeClass(d[2]),l.replaceWith(s.contents()),n.removeClass(o+" _"+a+"_"+i.idx+" "+d[6]+" "+d[7]+" "+d[5]+" "+d[3]).addClass(d[4])}})}},f=function(){return"object"!=typeof e(this)||e(this).length<1?n:this},h=function(t){var o=["rounded","rounded-dark","rounded-dots","rounded-dots-dark"],a=["rounded-dots","rounded-dots-dark","3d","3d-dark","3d-thick","3d-thick-dark","inset","inset-dark","inset-2","inset-2-dark","inset-3","inset-3-dark"],n=["minimal","minimal-dark"],i=["minimal","minimal-dark"],r=["minimal","minimal-dark"];t.autoDraggerLength=e.inArray(t.theme,o)>-1?!1:t.autoDraggerLength,t.autoExpandScrollbar=e.inArray(t.theme,a)>-1?!1:t.autoExpandScrollbar,t.scrollButtons.enable=e.inArray(t.theme,n)>-1?!1:t.scrollButtons.enable,t.autoHideScrollbar=e.inArray(t.theme,i)>-1?!0:t.autoHideScrollbar,t.scrollbarPosition=e.inArray(t.theme,r)>-1?"outside":t.scrollbarPosition},m=function(e){l[e]&&(clearTimeout(l[e]),K(l,e))},p=function(e){return"yx"===e||"xy"===e||"auto"===e?"yx":"x"===e||"horizontal"===e?"x":"y"},g=function(e){return"stepped"===e||"pixels"===e||"step"===e||"click"===e?"stepped":"stepless"},v=function(){var t=e(this),n=t.data(a),i=n.opt,r=i.autoExpandScrollbar?" "+d[1]+"_expand":"",l=["<div id='mCSB_"+n.idx+"_scrollbar_vertical' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_vertical"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_vertical' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>","<div id='mCSB_"+n.idx+"_scrollbar_horizontal' class='mCSB_scrollTools mCSB_"+n.idx+"_scrollbar mCS-"+i.theme+" mCSB_scrollTools_horizontal"+r+"'><div class='"+d[12]+"'><div id='mCSB_"+n.idx+"_dragger_horizontal' class='mCSB_dragger' style='position:absolute;' oncontextmenu='return false;'><div class='mCSB_dragger_bar' /></div><div class='mCSB_draggerRail' /></div></div>"],s="yx"===i.axis?"mCSB_vertical_horizontal":"x"===i.axis?"mCSB_horizontal":"mCSB_vertical",c="yx"===i.axis?l[0]+l[1]:"x"===i.axis?l[1]:l[0],u="yx"===i.axis?"<div id='mCSB_"+n.idx+"_container_wrapper' class='mCSB_container_wrapper' />":"",f=i.autoHideScrollbar?" "+d[6]:"",h="x"!==i.axis&&"rtl"===n.langDir?" "+d[7]:"";i.setWidth&&t.css("width",i.setWidth),i.setHeight&&t.css("height",i.setHeight),i.setLeft="y"!==i.axis&&"rtl"===n.langDir?"989999px":i.setLeft,t.addClass(o+" _"+a+"_"+n.idx+f+h).wrapInner("<div id='mCSB_"+n.idx+"' class='mCustomScrollBox mCS-"+i.theme+" "+s+"'><div id='mCSB_"+n.idx+"_container' class='mCSB_container' style='position:relative; top:"+i.setTop+"; left:"+i.setLeft+";' dir="+n.langDir+" /></div>");var m=e("#mCSB_"+n.idx),p=e("#mCSB_"+n.idx+"_container");"y"===i.axis||i.advanced.autoExpandHorizontalScroll||p.css("width",x(p)),"outside"===i.scrollbarPosition?("static"===t.css("position")&&t.css("position","relative"),t.css("overflow","visible"),m.addClass("mCSB_outside").after(c)):(m.addClass("mCSB_inside").append(c),p.wrap(u)),w.call(this);var g=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")];g[0].css("min-height",g[0].height()),g[1].css("min-width",g[1].width())},x=function(t){var o=[t[0].scrollWidth,Math.max.apply(Math,t.children().map(function(){return e(this).outerWidth(!0)}).get())],a=t.parent().width();return o[0]>a?o[0]:o[1]>a?o[1]:"100%"},_=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx+"_container");if(n.advanced.autoExpandHorizontalScroll&&"y"!==n.axis){i.css({width:"auto","min-width":0,"overflow-x":"scroll"});var r=Math.ceil(i[0].scrollWidth);3===n.advanced.autoExpandHorizontalScroll||2!==n.advanced.autoExpandHorizontalScroll&&r>i.parent().width()?i.css({width:r,"min-width":"100%","overflow-x":"inherit"}):i.css({"overflow-x":"inherit",position:"absolute"}).wrap("<div class='mCSB_h_wrapper' style='position:relative; left:0; width:999999px;' />").css({width:Math.ceil(i[0].getBoundingClientRect().right+.4)-Math.floor(i[0].getBoundingClientRect().left),"min-width":"100%",position:"relative"}).unwrap()}},w=function(){var t=e(this),o=t.data(a),n=o.opt,i=e(".mCSB_"+o.idx+"_scrollbar:first"),r=ee(n.scrollButtons.tabindex)?"tabindex='"+n.scrollButtons.tabindex+"'":"",l=["<a href='#' class='"+d[13]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[14]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[15]+"' oncontextmenu='return false;' "+r+" />","<a href='#' class='"+d[16]+"' oncontextmenu='return false;' "+r+" />"],s=["x"===n.axis?l[2]:l[0],"x"===n.axis?l[3]:l[1],l[2],l[3]];n.scrollButtons.enable&&i.prepend(s[0]).append(s[1]).next(".mCSB_scrollTools").prepend(s[2]).append(s[3])},S=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[n.height()/i.outerHeight(!1),n.width()/i.outerWidth(!1)],c=[parseInt(r[0].css("min-height")),Math.round(l[0]*r[0].parent().height()),parseInt(r[1].css("min-width")),Math.round(l[1]*r[1].parent().width())],d=s&&c[1]<c[0]?c[0]:c[1],u=s&&c[3]<c[2]?c[2]:c[3];r[0].css({height:d,"max-height":r[0].parent().height()-10}).find(".mCSB_dragger_bar").css({"line-height":c[0]+"px"}),r[1].css({width:u,"max-width":r[1].parent().width()-10})},b=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")],l=[i.outerHeight(!1)-n.height(),i.outerWidth(!1)-n.width()],s=[l[0]/(r[0].parent().height()-r[0].height()),l[1]/(r[1].parent().width()-r[1].width())];o.scrollRatio={y:s[0],x:s[1]}},C=function(e,t,o){var a=o?d[0]+"_expanded":"",n=e.closest(".mCSB_scrollTools");"active"===t?(e.toggleClass(d[0]+" "+a),n.toggleClass(d[1]),e[0]._draggable=e[0]._draggable?0:1):e[0]._draggable||("hide"===t?(e.removeClass(d[0]),n.removeClass(d[1])):(e.addClass(d[0]),n.addClass(d[1])))},y=function(){var t=e(this),o=t.data(a),n=e("#mCSB_"+o.idx),i=e("#mCSB_"+o.idx+"_container"),r=null==o.overflowed?i.height():i.outerHeight(!1),l=null==o.overflowed?i.width():i.outerWidth(!1),s=i[0].scrollHeight,c=i[0].scrollWidth;return s>r&&(r=s),c>l&&(l=c),[r>n.height(),l>n.width()]},B=function(){var t=e(this),o=t.data(a),n=o.opt,i=e("#mCSB_"+o.idx),r=e("#mCSB_"+o.idx+"_container"),l=[e("#mCSB_"+o.idx+"_dragger_vertical"),e("#mCSB_"+o.idx+"_dragger_horizontal")];if(N(t),("x"!==n.axis&&!o.overflowed[0]||"y"===n.axis&&o.overflowed[0])&&(l[0].add(r).css("top",0),V(t,"_resetY")),"y"!==n.axis&&!o.overflowed[1]||"x"===n.axis&&o.overflowed[1]){var s=dx=0;"rtl"===o.langDir&&(s=i.width()-r.outerWidth(!1),dx=Math.abs(s/o.scrollRatio.x)),r.css("left",s),l[1].css("left",dx),V(t,"_resetX")}},T=function(){function t(){r=setTimeout(function(){e.event.special.mousewheel?(clearTimeout(r),R.call(o[0])):t()},100)}var o=e(this),n=o.data(a),i=n.opt;if(!n.bindEvents){if(I.call(this),i.contentTouchScroll&&D.call(this),E.call(this),i.mouseWheel.enable){var r;t()}L.call(this),P.call(this),i.advanced.autoScrollOnFocus&&z.call(this),i.scrollButtons.enable&&H.call(this),i.keyboard.enable&&U.call(this),n.bindEvents=!0}},k=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=".mCSB_"+o.idx+"_scrollbar",l=e("#mCSB_"+o.idx+",#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,"+r+" ."+d[12]+",#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal,"+r+">a"),s=e("#mCSB_"+o.idx+"_container");n.advanced.releaseDraggableSelectors&&l.add(e(n.advanced.releaseDraggableSelectors)),n.advanced.extraDraggableSelectors&&l.add(e(n.advanced.extraDraggableSelectors)),o.bindEvents&&(e(document).add(e(!W()||top.document)).unbind("."+i),l.each(function(){e(this).unbind("."+i)}),clearTimeout(t[0]._focusTimeout),K(t[0],"_focusTimeout"),clearTimeout(o.sequential.step),K(o.sequential,"step"),clearTimeout(s[0].onCompleteTimeout),K(s[0],"onCompleteTimeout"),o.bindEvents=!1)},M=function(t){var o=e(this),n=o.data(a),i=n.opt,r=e("#mCSB_"+n.idx+"_container_wrapper"),l=r.length?r:e("#mCSB_"+n.idx+"_container"),s=[e("#mCSB_"+n.idx+"_scrollbar_vertical"),e("#mCSB_"+n.idx+"_scrollbar_horizontal")],c=[s[0].find(".mCSB_dragger"),s[1].find(".mCSB_dragger")];"x"!==i.axis&&(n.overflowed[0]&&!t?(s[0].add(c[0]).add(s[0].children("a")).css("display","block"),l.removeClass(d[8]+" "+d[10])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[0].css("display","none"),l.removeClass(d[10])):(s[0].css("display","none"),l.addClass(d[10])),l.addClass(d[8]))),"y"!==i.axis&&(n.overflowed[1]&&!t?(s[1].add(c[1]).add(s[1].children("a")).css("display","block"),l.removeClass(d[9]+" "+d[11])):(i.alwaysShowScrollbar?(2!==i.alwaysShowScrollbar&&c[1].css("display","none"),l.removeClass(d[11])):(s[1].css("display","none"),l.addClass(d[11])),l.addClass(d[9]))),n.overflowed[0]||n.overflowed[1]?o.removeClass(d[5]):o.addClass(d[5])},O=function(t){var o=t.type,a=t.target.ownerDocument!==document?[e(frameElement).offset().top,e(frameElement).offset().left]:null,n=W()&&t.target.ownerDocument!==top.document?[e(t.view.frameElement).offset().top,e(t.view.frameElement).offset().left]:[0,0];switch(o){case"pointerdown":case"MSPointerDown":case"pointermove":case"MSPointerMove":case"pointerup":case"MSPointerUp":return a?[t.originalEvent.pageY-a[0]+n[0],t.originalEvent.pageX-a[1]+n[1],!1]:[t.originalEvent.pageY,t.originalEvent.pageX,!1];case"touchstart":case"touchmove":case"touchend":var i=t.originalEvent.touches[0]||t.originalEvent.changedTouches[0],r=t.originalEvent.touches.length||t.originalEvent.changedTouches.length;return t.target.ownerDocument!==document?[i.screenY,i.screenX,r>1]:[i.pageY,i.pageX,r>1];default:return a?[t.pageY-a[0]+n[0],t.pageX-a[1]+n[1],!1]:[t.pageY,t.pageX,!1]}},I=function(){function t(e){var t=m.find("iframe");if(t.length){var o=e?"auto":"none";t.css("pointer-events",o)}}function o(e,t,o,a){if(m[0].idleTimer=u.scrollInertia<233?250:0,n.attr("id")===h[1])var i="x",r=(n[0].offsetLeft-t+a)*d.scrollRatio.x;else var i="y",r=(n[0].offsetTop-e+o)*d.scrollRatio.y;V(l,r.toString(),{dir:i,drag:!0})}var n,i,r,l=e(this),d=l.data(a),u=d.opt,f=a+"_"+d.idx,h=["mCSB_"+d.idx+"_dragger_vertical","mCSB_"+d.idx+"_dragger_horizontal"],m=e("#mCSB_"+d.idx+"_container"),p=e("#"+h[0]+",#"+h[1]),g=u.advanced.releaseDraggableSelectors?p.add(e(u.advanced.releaseDraggableSelectors)):p,v=u.advanced.extraDraggableSelectors?e(!W()||top.document).add(e(u.advanced.extraDraggableSelectors)):e(!W()||top.document);p.bind("mousedown."+f+" touchstart."+f+" pointerdown."+f+" MSPointerDown."+f,function(o){if(o.stopImmediatePropagation(),o.preventDefault(),Z(o)){c=!0,s&&(document.onselectstart=function(){return!1}),t(!1),N(l),n=e(this);var a=n.offset(),d=O(o)[0]-a.top,f=O(o)[1]-a.left,h=n.height()+a.top,m=n.width()+a.left;h>d&&d>0&&m>f&&f>0&&(i=d,r=f),C(n,"active",u.autoExpandScrollbar)}}).bind("touchmove."+f,function(e){e.stopImmediatePropagation(),e.preventDefault();var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;o(i,r,a,l)}),e(document).add(v).bind("mousemove."+f+" pointermove."+f+" MSPointerMove."+f,function(e){if(n){var t=n.offset(),a=O(e)[0]-t.top,l=O(e)[1]-t.left;if(i===a&&r===l)return;o(i,r,a,l)}}).add(g).bind("mouseup."+f+" touchend."+f+" pointerup."+f+" MSPointerUp."+f,function(e){n&&(C(n,"active",u.autoExpandScrollbar),n=null),c=!1,s&&(document.onselectstart=null),t(!0)})},D=function(){function o(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,b=0,C=0,d=1,y.removeClass("mCS_touch_action");var o=I.offset();u=O(e)[0]-o.top,f=O(e)[1]-o.left,z=[O(e)[0],O(e)[1]]}function n(e){if($(e)&&!c&&!O(e)[2]&&(T.documentTouchScroll||e.preventDefault(),e.stopImmediatePropagation(),(!C||b)&&d)){g=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left,n="mcsLinearOut";if(E.push(o),R.push(a),z[2]=Math.abs(O(e)[0]-z[0]),z[3]=Math.abs(O(e)[1]-z[1]),B.overflowed[0])var i=D[0].parent().height()-D[0].height(),r=u-o>0&&o-u>-(i*B.scrollRatio.y)&&(2*z[3]<z[2]||"yx"===T.axis);if(B.overflowed[1])var l=D[1].parent().width()-D[1].width(),h=f-a>0&&a-f>-(l*B.scrollRatio.x)&&(2*z[2]<z[3]||"yx"===T.axis);r||h?(U||e.preventDefault(),b=1):(C=1,y.addClass("mCS_touch_action")),U&&e.preventDefault(),w="yx"===T.axis?[u-o,f-a]:"x"===T.axis?[null,f-a]:[u-o,null],I[0].idleTimer=250,B.overflowed[0]&&s(w[0],A,n,"y","all",!0),B.overflowed[1]&&s(w[1],A,n,"x",L,!0)}}function i(e){if(!$(e)||c||O(e)[2])return void(t=0);t=1,e.stopImmediatePropagation(),N(y),p=G();var o=M.offset();h=O(e)[0]-o.top,m=O(e)[1]-o.left,E=[],R=[]}function r(e){if($(e)&&!c&&!O(e)[2]){d=0,e.stopImmediatePropagation(),b=0,C=0,v=G();var t=M.offset(),o=O(e)[0]-t.top,a=O(e)[1]-t.left;if(!(v-g>30)){_=1e3/(v-p);var n="mcsEaseOut",i=2.5>_,r=i?[E[E.length-2],R[R.length-2]]:[0,0];x=i?[o-r[0],a-r[1]]:[o-h,a-m];var u=[Math.abs(x[0]),Math.abs(x[1])];_=i?[Math.abs(x[0]/4),Math.abs(x[1]/4)]:[_,_];var f=[Math.abs(I[0].offsetTop)-x[0]*l(u[0]/_[0],_[0]),Math.abs(I[0].offsetLeft)-x[1]*l(u[1]/_[1],_[1])];w="yx"===T.axis?[f[0],f[1]]:"x"===T.axis?[null,f[1]]:[f[0],null],S=[4*u[0]+T.scrollInertia,4*u[1]+T.scrollInertia];var y=parseInt(T.contentTouchScroll)||0;w[0]=u[0]>y?w[0]:0,w[1]=u[1]>y?w[1]:0,B.overflowed[0]&&s(w[0],S[0],n,"y",L,!1),B.overflowed[1]&&s(w[1],S[1],n,"x",L,!1)}}}function l(e,t){var o=[1.5*t,2*t,t/1.5,t/2];return e>90?t>4?o[0]:o[3]:e>60?t>3?o[3]:o[2]:e>30?t>8?o[1]:t>6?o[0]:t>4?t:o[2]:t>8?t:o[3]}function s(e,t,o,a,n,i){e&&V(y,e.toString(),{dur:t,scrollEasing:o,dir:a,overwrite:n,drag:i})}var d,u,f,h,m,p,g,v,x,_,w,S,b,C,y=e(this),B=y.data(a),T=B.opt,k=a+"_"+B.idx,M=e("#mCSB_"+B.idx),I=e("#mCSB_"+B.idx+"_container"),D=[e("#mCSB_"+B.idx+"_dragger_vertical"),e("#mCSB_"+B.idx+"_dragger_horizontal")],E=[],R=[],A=0,L="yx"===T.axis?"none":"all",z=[],P=I.find("iframe"),H=["touchstart."+k+" pointerdown."+k+" MSPointerDown."+k,"touchmove."+k+" pointermove."+k+" MSPointerMove."+k,"touchend."+k+" pointerup."+k+" MSPointerUp."+k],U=void 0!==document.body.style.touchAction;I.bind(H[0],function(e){o(e)}).bind(H[1],function(e){n(e)}),M.bind(H[0],function(e){i(e)}).bind(H[2],function(e){r(e)}),P.length&&P.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(H[0],function(e){o(e),i(e)}).bind(H[1],function(e){n(e)}).bind(H[2],function(e){r(e)})})})},E=function(){function o(){return window.getSelection?window.getSelection().toString():document.selection&&"Control"!=document.selection.type?document.selection.createRange().text:0}function n(e,t,o){d.type=o&&i?"stepped":"stepless",d.scrollAmount=10,F(r,e,t,"mcsLinearOut",o?60:null)}var i,r=e(this),l=r.data(a),s=l.opt,d=l.sequential,u=a+"_"+l.idx,f=e("#mCSB_"+l.idx+"_container"),h=f.parent();f.bind("mousedown."+u,function(e){t||i||(i=1,c=!0)}).add(document).bind("mousemove."+u,function(e){if(!t&&i&&o()){var a=f.offset(),r=O(e)[0]-a.top+f[0].offsetTop,c=O(e)[1]-a.left+f[0].offsetLeft;r>0&&r<h.height()&&c>0&&c<h.width()?d.step&&n("off",null,"stepped"):("x"!==s.axis&&l.overflowed[0]&&(0>r?n("on",38):r>h.height()&&n("on",40)),"y"!==s.axis&&l.overflowed[1]&&(0>c?n("on",37):c>h.width()&&n("on",39)))}}).bind("mouseup."+u+" dragend."+u,function(e){t||(i&&(i=0,n("off",null)),c=!1)})},R=function(){function t(t,a){if(N(o),!A(o,t.target)){var r="auto"!==i.mouseWheel.deltaFactor?parseInt(i.mouseWheel.deltaFactor):s&&t.deltaFactor<100?100:t.deltaFactor||100,d=i.scrollInertia;if("x"===i.axis||"x"===i.mouseWheel.axis)var u="x",f=[Math.round(r*n.scrollRatio.x),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.width()?.9*l.width():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetLeft),p=c[1][0].offsetLeft,g=c[1].parent().width()-c[1].width(),v=t.deltaX||t.deltaY||a;else var u="y",f=[Math.round(r*n.scrollRatio.y),parseInt(i.mouseWheel.scrollAmount)],h="auto"!==i.mouseWheel.scrollAmount?f[1]:f[0]>=l.height()?.9*l.height():f[0],m=Math.abs(e("#mCSB_"+n.idx+"_container")[0].offsetTop),p=c[0][0].offsetTop,g=c[0].parent().height()-c[0].height(),v=t.deltaY||a;"y"===u&&!n.overflowed[0]||"x"===u&&!n.overflowed[1]||((i.mouseWheel.invert||t.webkitDirectionInvertedFromDevice)&&(v=-v),i.mouseWheel.normalizeDelta&&(v=0>v?-1:1),(v>0&&0!==p||0>v&&p!==g||i.mouseWheel.preventDefault)&&(t.stopImmediatePropagation(),t.preventDefault()),t.deltaFactor<2&&!i.mouseWheel.normalizeDelta&&(h=t.deltaFactor,d=17),V(o,(m-v*h).toString(),{dir:u,dur:d}))}}if(e(this).data(a)){var o=e(this),n=o.data(a),i=n.opt,r=a+"_"+n.idx,l=e("#mCSB_"+n.idx),c=[e("#mCSB_"+n.idx+"_dragger_vertical"),e("#mCSB_"+n.idx+"_dragger_horizontal")],d=e("#mCSB_"+n.idx+"_container").find("iframe");d.length&&d.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind("mousewheel."+r,function(e,o){t(e,o)})})}),l.bind("mousewheel."+r,function(e,o){t(e,o)})}},W=function(e){var t=null;if(e){try{var o=e.contentDocument||e.contentWindow.document;t=o.body.innerHTML}catch(a){}return null!==t}try{var o=top.document;t=o.body.innerHTML}catch(a){}return null!==t},A=function(t,o){var n=o.nodeName.toLowerCase(),i=t.data(a).opt.mouseWheel.disableOver,r=["select","textarea"];return e.inArray(n,i)>-1&&!(e.inArray(n,r)>-1&&!e(o).is(":focus"))},L=function(){var t,o=e(this),n=o.data(a),i=a+"_"+n.idx,r=e("#mCSB_"+n.idx+"_container"),l=r.parent(),s=e(".mCSB_"+n.idx+"_scrollbar ."+d[12]);s.bind("mousedown."+i+" touchstart."+i+" pointerdown."+i+" MSPointerDown."+i,function(o){c=!0,e(o.target).hasClass("mCSB_dragger")||(t=1)}).bind("touchend."+i+" pointerup."+i+" MSPointerUp."+i,function(e){c=!1}).bind("click."+i,function(a){if(t&&(t=0,e(a.target).hasClass(d[12])||e(a.target).hasClass("mCSB_draggerRail"))){N(o);var i=e(this),s=i.find(".mCSB_dragger");if(i.parent(".mCSB_scrollTools_horizontal").length>0){if(!n.overflowed[1])return;var c="x",u=a.pageX>s.offset().left?-1:1,f=Math.abs(r[0].offsetLeft)-.9*u*l.width()}else{if(!n.overflowed[0])return;var c="y",u=a.pageY>s.offset().top?-1:1,f=Math.abs(r[0].offsetTop)-.9*u*l.height()}V(o,f.toString(),{dir:c,scrollEasing:"mcsEaseInOut"})}})},z=function(){var t=e(this),o=t.data(a),n=o.opt,i=a+"_"+o.idx,r=e("#mCSB_"+o.idx+"_container"),l=r.parent();r.bind("focusin."+i,function(o){var a=e(document.activeElement),i=r.find(".mCustomScrollBox").length,s=0;a.is(n.advanced.autoScrollOnFocus)&&(N(t),clearTimeout(t[0]._focusTimeout),t[0]._focusTimer=i?(s+17)*i:0,t[0]._focusTimeout=setTimeout(function(){var e=[te(a)[0],te(a)[1]],o=[r[0].offsetTop,r[0].offsetLeft],i=[o[0]+e[0]>=0&&o[0]+e[0]<l.height()-a.outerHeight(!1),o[1]+e[1]>=0&&o[0]+e[1]<l.width()-a.outerWidth(!1)],c="yx"!==n.axis||i[0]||i[1]?"all":"none";"x"===n.axis||i[0]||V(t,e[0].toString(),{dir:"y",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s}),"y"===n.axis||i[1]||V(t,e[1].toString(),{dir:"x",scrollEasing:"mcsEaseInOut",overwrite:c,dur:s})},t[0]._focusTimer))})},P=function(){var t=e(this),o=t.data(a),n=a+"_"+o.idx,i=e("#mCSB_"+o.idx+"_container").parent();i.bind("scroll."+n,function(t){(0!==i.scrollTop()||0!==i.scrollLeft())&&e(".mCSB_"+o.idx+"_scrollbar").css("visibility","hidden")})},H=function(){var t=e(this),o=t.data(a),n=o.opt,i=o.sequential,r=a+"_"+o.idx,l=".mCSB_"+o.idx+"_scrollbar",s=e(l+">a");s.bind("mousedown."+r+" touchstart."+r+" pointerdown."+r+" MSPointerDown."+r+" mouseup."+r+" touchend."+r+" pointerup."+r+" MSPointerUp."+r+" mouseout."+r+" pointerout."+r+" MSPointerOut."+r+" click."+r,function(a){function r(e,o){i.scrollAmount=n.scrollButtons.scrollAmount,F(t,e,o)}if(a.preventDefault(),Z(a)){var l=e(this).attr("class");switch(i.type=n.scrollButtons.scrollType,a.type){case"mousedown":case"touchstart":case"pointerdown":case"MSPointerDown":if("stepped"===i.type)return;c=!0,o.tweenRunning=!1,r("on",l);break;case"mouseup":case"touchend":case"pointerup":case"MSPointerUp":case"mouseout":case"pointerout":case"MSPointerOut":if("stepped"===i.type)return;c=!1,i.dir&&r("off",l);break;case"click":if("stepped"!==i.type||o.tweenRunning)return;r("on",l)}}})},U=function(){function t(t){function a(e,t){r.type=i.keyboard.scrollType,r.scrollAmount=i.keyboard.scrollAmount,"stepped"===r.type&&n.tweenRunning||F(o,e,t)}switch(t.type){case"blur":n.tweenRunning&&r.dir&&a("off",null);break;case"keydown":case"keyup":var l=t.keyCode?t.keyCode:t.which,s="on";if("x"!==i.axis&&(38===l||40===l)||"y"!==i.axis&&(37===l||39===l)){if((38===l||40===l)&&!n.overflowed[0]||(37===l||39===l)&&!n.overflowed[1])return;"keyup"===t.type&&(s="off"),e(document.activeElement).is(u)||(t.preventDefault(),t.stopImmediatePropagation(),a(s,l))}else if(33===l||34===l){if((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type){N(o);var f=34===l?-1:1;if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=Math.abs(c[0].offsetLeft)-.9*f*d.width();else var h="y",m=Math.abs(c[0].offsetTop)-.9*f*d.height();V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}else if((35===l||36===l)&&!e(document.activeElement).is(u)&&((n.overflowed[0]||n.overflowed[1])&&(t.preventDefault(),t.stopImmediatePropagation()),"keyup"===t.type)){if("x"===i.axis||"yx"===i.axis&&n.overflowed[1]&&!n.overflowed[0])var h="x",m=35===l?Math.abs(d.width()-c.outerWidth(!1)):0;else var h="y",m=35===l?Math.abs(d.height()-c.outerHeight(!1)):0;V(o,m.toString(),{dir:h,scrollEasing:"mcsEaseInOut"})}}}var o=e(this),n=o.data(a),i=n.opt,r=n.sequential,l=a+"_"+n.idx,s=e("#mCSB_"+n.idx),c=e("#mCSB_"+n.idx+"_container"),d=c.parent(),u="input,textarea,select,datalist,keygen,[contenteditable='true']",f=c.find("iframe"),h=["blur."+l+" keydown."+l+" keyup."+l];f.length&&f.each(function(){e(this).load(function(){W(this)&&e(this.contentDocument||this.contentWindow.document).bind(h[0],function(e){t(e)})})}),s.attr("tabindex","0").bind(h[0],function(e){t(e)})},F=function(t,o,n,i,r){function l(e){u.snapAmount&&(f.scrollAmount=u.snapAmount instanceof Array?"x"===f.dir[0]?u.snapAmount[1]:u.snapAmount[0]:u.snapAmount);var o="stepped"!==f.type,a=r?r:e?o?p/1.5:g:1e3/60,n=e?o?7.5:40:2.5,s=[Math.abs(h[0].offsetTop),Math.abs(h[0].offsetLeft)],d=[c.scrollRatio.y>10?10:c.scrollRatio.y,c.scrollRatio.x>10?10:c.scrollRatio.x],m="x"===f.dir[0]?s[1]+f.dir[1]*d[1]*n:s[0]+f.dir[1]*d[0]*n,v="x"===f.dir[0]?s[1]+f.dir[1]*parseInt(f.scrollAmount):s[0]+f.dir[1]*parseInt(f.scrollAmount),x="auto"!==f.scrollAmount?v:m,_=i?i:e?o?"mcsLinearOut":"mcsEaseInOut":"mcsLinear",w=e?!0:!1;return e&&17>a&&(x="x"===f.dir[0]?s[1]:s[0]),V(t,x.toString(),{dir:f.dir[0],scrollEasing:_,dur:a,onComplete:w}),e?void(f.dir=!1):(clearTimeout(f.step),void(f.step=setTimeout(function(){l()},a)))}function s(){clearTimeout(f.step),K(f,"step"),N(t)}var c=t.data(a),u=c.opt,f=c.sequential,h=e("#mCSB_"+c.idx+"_container"),m="stepped"===f.type?!0:!1,p=u.scrollInertia<26?26:u.scrollInertia,g=u.scrollInertia<1?17:u.scrollInertia;switch(o){case"on":if(f.dir=[n===d[16]||n===d[15]||39===n||37===n?"x":"y",n===d[13]||n===d[15]||38===n||37===n?-1:1],N(t),ee(n)&&"stepped"===f.type)return;l(m);break;case"off":s(),(m||c.tweenRunning&&f.dir)&&l(!0)}},q=function(t){var o=e(this).data(a).opt,n=[];return"function"==typeof t&&(t=t()),t instanceof Array?n=t.length>1?[t[0],t[1]]:"x"===o.axis?[null,t[0]]:[t[0],null]:(n[0]=t.y?t.y:t.x||"x"===o.axis?null:t,n[1]=t.x?t.x:t.y||"y"===o.axis?null:t),"function"==typeof n[0]&&(n[0]=n[0]()),"function"==typeof n[1]&&(n[1]=n[1]()),n},Y=function(t,o){if(null!=t&&"undefined"!=typeof t){var n=e(this),i=n.data(a),r=i.opt,l=e("#mCSB_"+i.idx+"_container"),s=l.parent(),c=typeof t;o||(o="x"===r.axis?"x":"y");var d="x"===o?l.outerWidth(!1):l.outerHeight(!1),f="x"===o?l[0].offsetLeft:l[0].offsetTop,h="x"===o?"left":"top";switch(c){case"function":return t();case"object":var m=t.jquery?t:e(t);if(!m.length)return;return"x"===o?te(m)[1]:te(m)[0];case"string":case"number":if(ee(t))return Math.abs(t);if(-1!==t.indexOf("%"))return Math.abs(d*parseInt(t)/100);if(-1!==t.indexOf("-="))return Math.abs(f-parseInt(t.split("-=")[1]));if(-1!==t.indexOf("+=")){var p=f+parseInt(t.split("+=")[1]);return p>=0?0:Math.abs(p)}if(-1!==t.indexOf("px")&&ee(t.split("px")[0]))return Math.abs(t.split("px")[0]);if("top"===t||"left"===t)return 0;if("bottom"===t)return Math.abs(s.height()-l.outerHeight(!1));if("right"===t)return Math.abs(s.width()-l.outerWidth(!1));if("first"===t||"last"===t){var m=l.find(":"+t);return"x"===o?te(m)[1]:te(m)[0]}return e(t).length?"x"===o?te(e(t))[1]:te(e(t))[0]:(l.css(h,t),void u.update.call(null,n[0]))}}},X=function(t){function o(){return clearTimeout(f[0].autoUpdate),0===l.parents("html").length?void(l=null):void(f[0].autoUpdate=setTimeout(function(){return c.advanced.updateOnSelectorChange&&(s.poll.change.n=i(),s.poll.change.n!==s.poll.change.o)?(s.poll.change.o=s.poll.change.n,void r(3)):c.advanced.updateOnContentResize&&(s.poll.size.n=l[0].scrollHeight+l[0].scrollWidth+f[0].offsetHeight+l[0].offsetHeight+l[0].offsetWidth,s.poll.size.n!==s.poll.size.o)?(s.poll.size.o=s.poll.size.n,void r(1)):!c.advanced.updateOnImageLoad||"auto"===c.advanced.updateOnImageLoad&&"y"===c.axis||(s.poll.img.n=f.find("img").length,s.poll.img.n===s.poll.img.o)?void((c.advanced.updateOnSelectorChange||c.advanced.updateOnContentResize||c.advanced.updateOnImageLoad)&&o()):(s.poll.img.o=s.poll.img.n,void f.find("img").each(function(){n(this)}))},c.advanced.autoUpdateTimeout))}function n(t){function o(e,t){return function(){return t.apply(e,arguments)}}function a(){this.onload=null,e(t).addClass(d[2]),r(2)}if(e(t).hasClass(d[2]))return void r();var n=new Image;n.onload=o(n,a),n.src=t.src}function i(){c.advanced.updateOnSelectorChange===!0&&(c.advanced.updateOnSelectorChange="*");var e=0,t=f.find(c.advanced.updateOnSelectorChange);

return c.advanced.updateOnSelectorChange&&t.length>0&&t.each(function(){e+=this.offsetHeight+this.offsetWidth}),e}function r(e){clearTimeout(f[0].autoUpdate),u.update.call(null,l[0],e)}var l=e(this),s=l.data(a),c=s.opt,f=e("#mCSB_"+s.idx+"_container");return t?(clearTimeout(f[0].autoUpdate),void K(f[0],"autoUpdate")):void o()},j=function(e,t,o){return Math.round(e/t)*t-o},N=function(t){var o=t.data(a),n=e("#mCSB_"+o.idx+"_container,#mCSB_"+o.idx+"_container_wrapper,#mCSB_"+o.idx+"_dragger_vertical,#mCSB_"+o.idx+"_dragger_horizontal");n.each(function(){J.call(this)})},V=function(t,o,n){function i(e){return s&&c.callbacks[e]&&"function"==typeof c.callbacks[e]}function r(){return[c.callbacks.alwaysTriggerOffsets||w>=S[0]+y,c.callbacks.alwaysTriggerOffsets||-B>=w]}function l(){var e=[h[0].offsetTop,h[0].offsetLeft],o=[x[0].offsetTop,x[0].offsetLeft],a=[h.outerHeight(!1),h.outerWidth(!1)],i=[f.height(),f.width()];t[0].mcs={content:h,top:e[0],left:e[1],draggerTop:o[0],draggerLeft:o[1],topPct:Math.round(100*Math.abs(e[0])/(Math.abs(a[0])-i[0])),leftPct:Math.round(100*Math.abs(e[1])/(Math.abs(a[1])-i[1])),direction:n.dir}}var s=t.data(a),c=s.opt,d={trigger:"internal",dir:"y",scrollEasing:"mcsEaseOut",drag:!1,dur:c.scrollInertia,overwrite:"all",callbacks:!0,onStart:!0,onUpdate:!0,onComplete:!0},n=e.extend(d,n),u=[n.dur,n.drag?0:n.dur],f=e("#mCSB_"+s.idx),h=e("#mCSB_"+s.idx+"_container"),m=h.parent(),p=c.callbacks.onTotalScrollOffset?q.call(t,c.callbacks.onTotalScrollOffset):[0,0],g=c.callbacks.onTotalScrollBackOffset?q.call(t,c.callbacks.onTotalScrollBackOffset):[0,0];if(s.trigger=n.trigger,(0!==m.scrollTop()||0!==m.scrollLeft())&&(e(".mCSB_"+s.idx+"_scrollbar").css("visibility","visible"),m.scrollTop(0).scrollLeft(0)),"_resetY"!==o||s.contentReset.y||(i("onOverflowYNone")&&c.callbacks.onOverflowYNone.call(t[0]),s.contentReset.y=1),"_resetX"!==o||s.contentReset.x||(i("onOverflowXNone")&&c.callbacks.onOverflowXNone.call(t[0]),s.contentReset.x=1),"_resetY"!==o&&"_resetX"!==o){if(!s.contentReset.y&&t[0].mcs||!s.overflowed[0]||(i("onOverflowY")&&c.callbacks.onOverflowY.call(t[0]),s.contentReset.x=null),!s.contentReset.x&&t[0].mcs||!s.overflowed[1]||(i("onOverflowX")&&c.callbacks.onOverflowX.call(t[0]),s.contentReset.x=null),c.snapAmount){var v=c.snapAmount instanceof Array?"x"===n.dir?c.snapAmount[1]:c.snapAmount[0]:c.snapAmount;o=j(o,v,c.snapOffset)}switch(n.dir){case"x":var x=e("#mCSB_"+s.idx+"_dragger_horizontal"),_="left",w=h[0].offsetLeft,S=[f.width()-h.outerWidth(!1),x.parent().width()-x.width()],b=[o,0===o?0:o/s.scrollRatio.x],y=p[1],B=g[1],T=y>0?y/s.scrollRatio.x:0,k=B>0?B/s.scrollRatio.x:0;break;case"y":var x=e("#mCSB_"+s.idx+"_dragger_vertical"),_="top",w=h[0].offsetTop,S=[f.height()-h.outerHeight(!1),x.parent().height()-x.height()],b=[o,0===o?0:o/s.scrollRatio.y],y=p[0],B=g[0],T=y>0?y/s.scrollRatio.y:0,k=B>0?B/s.scrollRatio.y:0}b[1]<0||0===b[0]&&0===b[1]?b=[0,0]:b[1]>=S[1]?b=[S[0],S[1]]:b[0]=-b[0],t[0].mcs||(l(),i("onInit")&&c.callbacks.onInit.call(t[0])),clearTimeout(h[0].onCompleteTimeout),Q(x[0],_,Math.round(b[1]),u[1],n.scrollEasing),(s.tweenRunning||!(0===w&&b[0]>=0||w===S[0]&&b[0]<=S[0]))&&Q(h[0],_,Math.round(b[0]),u[0],n.scrollEasing,n.overwrite,{onStart:function(){n.callbacks&&n.onStart&&!s.tweenRunning&&(i("onScrollStart")&&(l(),c.callbacks.onScrollStart.call(t[0])),s.tweenRunning=!0,C(x),s.cbOffsets=r())},onUpdate:function(){n.callbacks&&n.onUpdate&&i("whileScrolling")&&(l(),c.callbacks.whileScrolling.call(t[0]))},onComplete:function(){if(n.callbacks&&n.onComplete){"yx"===c.axis&&clearTimeout(h[0].onCompleteTimeout);var e=h[0].idleTimer||0;h[0].onCompleteTimeout=setTimeout(function(){i("onScroll")&&(l(),c.callbacks.onScroll.call(t[0])),i("onTotalScroll")&&b[1]>=S[1]-T&&s.cbOffsets[0]&&(l(),c.callbacks.onTotalScroll.call(t[0])),i("onTotalScrollBack")&&b[1]<=k&&s.cbOffsets[1]&&(l(),c.callbacks.onTotalScrollBack.call(t[0])),s.tweenRunning=!1,h[0].idleTimer=0,C(x,"hide")},e)}}})}},Q=function(e,t,o,a,n,i,r){function l(){S.stop||(x||m.call(),x=G()-v,s(),x>=S.time&&(S.time=x>S.time?x+f-(x-S.time):x+f-1,S.time<x+1&&(S.time=x+1)),S.time<a?S.id=h(l):g.call())}function s(){a>0?(S.currVal=u(S.time,_,b,a,n),w[t]=Math.round(S.currVal)+"px"):w[t]=o+"px",p.call()}function c(){f=1e3/60,S.time=x+f,h=window.requestAnimationFrame?window.requestAnimationFrame:function(e){return s(),setTimeout(e,.01)},S.id=h(l)}function d(){null!=S.id&&(window.requestAnimationFrame?window.cancelAnimationFrame(S.id):clearTimeout(S.id),S.id=null)}function u(e,t,o,a,n){switch(n){case"linear":case"mcsLinear":return o*e/a+t;case"mcsLinearOut":return e/=a,e--,o*Math.sqrt(1-e*e)+t;case"easeInOutSmooth":return e/=a/2,1>e?o/2*e*e+t:(e--,-o/2*(e*(e-2)-1)+t);case"easeInOutStrong":return e/=a/2,1>e?o/2*Math.pow(2,10*(e-1))+t:(e--,o/2*(-Math.pow(2,-10*e)+2)+t);case"easeInOut":case"mcsEaseInOut":return e/=a/2,1>e?o/2*e*e*e+t:(e-=2,o/2*(e*e*e+2)+t);case"easeOutSmooth":return e/=a,e--,-o*(e*e*e*e-1)+t;case"easeOutStrong":return o*(-Math.pow(2,-10*e/a)+1)+t;case"easeOut":case"mcsEaseOut":default:var i=(e/=a)*e,r=i*e;return t+o*(.499999999999997*r*i+-2.5*i*i+5.5*r+-6.5*i+4*e)}}e._mTween||(e._mTween={top:{},left:{}});var f,h,r=r||{},m=r.onStart||function(){},p=r.onUpdate||function(){},g=r.onComplete||function(){},v=G(),x=0,_=e.offsetTop,w=e.style,S=e._mTween[t];"left"===t&&(_=e.offsetLeft);var b=o-_;S.stop=0,"none"!==i&&d(),c()},G=function(){return window.performance&&window.performance.now?window.performance.now():window.performance&&window.performance.webkitNow?window.performance.webkitNow():Date.now?Date.now():(new Date).getTime()},J=function(){var e=this;e._mTween||(e._mTween={top:{},left:{}});for(var t=["top","left"],o=0;o<t.length;o++){var a=t[o];e._mTween[a].id&&(window.requestAnimationFrame?window.cancelAnimationFrame(e._mTween[a].id):clearTimeout(e._mTween[a].id),e._mTween[a].id=null,e._mTween[a].stop=1)}},K=function(e,t){try{delete e[t]}catch(o){e[t]=null}},Z=function(e){return!(e.which&&1!==e.which)},$=function(e){var t=e.originalEvent.pointerType;return!(t&&"touch"!==t&&2!==t)},ee=function(e){return!isNaN(parseFloat(e))&&isFinite(e)},te=function(e){var t=e.parents(".mCSB_container");return[e.offset().top-t.offset().top,e.offset().left-t.offset().left]},oe=function(){function e(){var e=["webkit","moz","ms","o"];if("hidden"in document)return"hidden";for(var t=0;t<e.length;t++)if(e[t]+"Hidden"in document)return e[t]+"Hidden";return null}var t=e();return t?document[t]:!1};e.fn[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o]=function(t){return u[t]?u[t].apply(this,Array.prototype.slice.call(arguments,1)):"object"!=typeof t&&t?void e.error("Method "+t+" does not exist"):u.init.apply(this,arguments)},e[o].defaults=i,window[o]=!0,e(window).load(function(){e(n)[o](),e.extend(e.expr[":"],{mcsInView:e.expr[":"].mcsInView||function(t){var o,a,n=e(t),i=n.parents(".mCSB_container");if(i.length)return o=i.parent(),a=[i[0].offsetTop,i[0].offsetLeft],a[0]+te(n)[0]>=0&&a[0]+te(n)[0]<o.height()-n.outerHeight(!1)&&a[1]+te(n)[1]>=0&&a[1]+te(n)[1]<o.width()-n.outerWidth(!1)},mcsOverflow:e.expr[":"].mcsOverflow||function(t){var o=e(t).data(a);if(o)return o.overflowed[0]||o.overflowed[1]}})})})});;
