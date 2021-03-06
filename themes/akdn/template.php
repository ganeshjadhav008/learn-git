<?php
/**
 * @file
 * This file is empty by default because the base theme chain (Alpha & Omega) provides
 * all the basic functionality. However, in case you wish to customize the output that Drupal
 * generates through Alpha & Omega this file is a good place to do so.
 *
 * Alpha comes with a neat solution for keeping this file as clean as possible while the code
 * for your subtheme grows. Please read the README.txt in the /preprocess and /process subfolders
 * for more information on this topic.
 */

/**
 * Implements hook_preprocess_page().
 */

//function akdn_preprocess_html(&$vars) {
// // $vars['classes_array'][] = 'new-class';
//  print'<pre>';print_r(node_load(arg(1))); print'</pre>';
//
//}

function akdn_preprocess_page(&$vars) {

$path = drupal_get_path_alias('node/'.arg(1));

if (!empty($vars['node']) && $vars['node']->type == 'page' || $vars['node']->type == 'custom_content' || $path = 'architecture') {
     $vars['title_prefix'] = array('#markup' => '<div class="element-invisible">');
     $vars['title_suffix'] = array('#markup' => '</div>');
}
  drupal_add_js('sites/all/libraries/jquery.replacetext/jquery.replacetext.js');

  //dpm($variables);
  //drupal_add_js(path_to_theme() . '/js/script.js');
  if (arg(0) == "geographies") {
    drupal_add_js(path_to_theme() . '/js/map.js');
  }
  //drupal_add_js(path_to_theme() . '/js/jquery.touchSwipe.min.js');
  // dpm($variables['node']);

  //New page tpl for AKDN internal News page nodes
  if(!empty($vars['node']) && $vars['node']->type == 'akdn_internal_news_page'){
    $vars['theme_hook_suggestions'][] = 'page__akdn_internal_news_page';
  }

}

/**
 * Implements hook_preprocess_html().
 */
function akdn_alpha_preprocess_html(&$variables) {
  // Add conditional stylesheets for IE
  drupal_add_css(drupal_get_path('theme', 'akdn') . '/css/ie-8.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 8', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(drupal_get_path('theme', 'akdn') . '/css/ie-7.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 7', '!IE' => FALSE), 'preprocess' => FALSE));
  drupal_add_css(drupal_get_path('theme', 'akdn') . '/css/ie-6.css', array('group' => CSS_THEME, 'browsers' => array('IE' => 'IE 6', '!IE' => FALSE), 'preprocess' => FALSE));

  if ($node = menu_get_object()) {
    $video = field_get_items('node', $node, 'field_speech_video');
    if (isset($video[0]['uri']) && !empty($video[0]['uri'])) {
      $variables['attributes_array']['class'][] = 'video-present';
    }
  }
  $variables['attributes_array']['class'][] = 'akdn_main_body';
}



function akdn_preprocess_search_result(&$variables) {
  if (isset($variables['result']['fields']['ss_node_search_info'])){
    $variables['info'] = $variables['result']['fields']['ss_node_search_info'];
  }
}


/**
 * Override Solr recommended items block
 */
function akdn_apachesolr_search_mlt_recommendation_block($vars) {
  $docs = $vars['docs'];
  $links = array();
  foreach ($docs as $result) {
    $result_node = node_load($result->entity_id);
    // Suitable for single-site mode. Label is already safe.
    $links[] = l($result->label, $result->path, array('html' => TRUE));
    if ($result_node) {
      if (in_array($result_node->type, array("project", "article", "event", "gallery", "person", "podcast", "publication", "speech"))) {
        if ($result_node->type != "gallery") {
          $image_type = "field_".$result_node->type."_image";
        } else {
          $image_type = "field_gallery_images";
        }

        $image = field_get_items('node', $result_node, $image_type);
        if ($image[0]) {
          $output = field_view_value('node', $result_node, $image_type, $image[0], array(
            'type' => 'image',
            'settings' => array(
              'image_style' => 'small_thumbnail',
              'image_link' => 'content',
            ),
          ));
          $thumbs[] = '<div class="mlt-row mlt-project"><div class="mlt-row-img">' . render($output) . '</div>' . $result_node->type.": " . l($result->label, $result->path, array('html' => TRUE)) . '</div>';
        } else {
          $thumbs[] = '<div class="mlt-row">' . $result_node->type.": " . l($result->label, $result->path, array('html' => TRUE)) . '</div>';
        }
      } else {
        $thumbs[] = '<div class="mlt-row">' . $result_node->type.": " . l($result->label, $result->path, array('html' => TRUE)) . '</div>';
      }
    }
    //drupal_set_message('<pre>'.print_r($image,true).'</pre>');
  }
  /*$links = array(
    '#theme' => 'item_list',
    '#items' => $links,
  );*/
  return theme('item_list', array('items' => $thumbs, 'attributes' => array('class' => 'related-content')));
  //return render($links);
}

function akdn_addthis_button($variables) {
  $build_mode = $variables['build_mode'];
  $https = isset($_SERVER['HTTPS']) && $_SERVER['HTTPS'] == 'on';
  if (variable_get('addthis_dropdown_disabled', '0')) {
    return ( sprintf('
      <a class="custom-addthis-button" href="http://www.addthis.com/bookmark.php"
        onclick="addthis_url   = location.href; addthis_title = document.title; return addthis_click(this);">Share</a>
      ',
      $https ? addslashes(variable_get('addthis_image_secure', 'https://secure.addthis.com/button1-share.gif')) : addslashes(variable_get('addthis_image', 'http://s9.addthis.com/button1-share.gif')),
      addslashes(variable_get('addthis_image_width', '125')),
      addslashes(variable_get('addthis_image_height', '16')),
      addslashes(variable_get('addthis_image_attributes', 'alt=""'))
    ));
  }
  else {
    return ( sprintf('
      <a class="custom-addthis-button" href="http://www.addthis.com/bookmark.php"
        onmouseover="return addthis_open(this, \'\', \'%s\', \'%s\')"
        onmouseout="addthis_close()"
        onclick="return addthis_sendto()">Share</a>
      ',
      ($build_mode == 'teaser') ? url('node/'. $node->nid, array('absolute' => 1) ) : '[URL]',
      ($build_mode == 'teaser') ? addslashes($node->title) : '[TITLE]',
      $https == 'on' ? addslashes(check_plain(variable_get('addthis_image_secure', 'https://secure.addthis.com/button1-share.gif'))) : addslashes(check_plain(variable_get('addthis_image', 'http://s9.addthis.com/button1-share.gif'))),
      addslashes(variable_get('addthis_image_width', '125')),
      addslashes(variable_get('addthis_image_height', '16')),
      filter_xss(variable_get('addthis_image_attributes', 'alt=""')),
      $https == 'on' ? 'https://secure.addthis.com' : 'http://s7.addthis.com'
    ));
  }
}

function akdn_apachesolr_mlt_recommendation_block($vars) {
  // Realtead Artefacts block. Replace link with thumbnails
  drupal_set_message('<pre>'.$vars['delta'].'</pre>');
  return;
  if ($vars['delta'] == 'mlt-001'){
    $docs = $vars['docs'];
    $thumbs = array();
    $links = array();
    foreach ($docs as $result) {
      // $node = array();
      $node = node_load($result->entity_id);
      if ($node) {
        $image = field_get_items('node', $node, 'field_artefact_images');
        if ($image[0]) {
          $output = field_view_value('node', $node, 'field_artefact_images', $image[0], array(
            'type' => 'image',
            'settings' => array(
              'image_style' => 'thumbnail',
              'image_link' => 'content',
            ),
          ));
          $thumbs[] = render($output);
        }
        else {
          $links[] = l($result->label, $result->path, array('html' => TRUE));
        }
      }
    }
    return theme('item_list', array('items' => $thumbs, 'attributes' => array('class' => 'related-artefacts'))) . '<br class="float-clear" />'. theme('item_list', array('items' => $links));

  }
}

function akdn_preprocess_pager(&$variables) {
  $variables['quantity'] = 8;
}

function akdn_preprocess_pager_previous(&$variables) {
  if (!is_numeric($variables['text'])) {
    $variables['text'] = t('‹ prev');
  }
}

function akdn_pager($variables) {
  $tags = $variables['tags'];
  $element = $variables['element'];
  $parameters = $variables['parameters'];
  $quantity = $variables['quantity'];
  global $pager_page_array, $pager_total;

  // Calculate various markers within this pager piece:
  // Middle is used to "center" pages around the current page.
  $pager_middle = ceil($quantity / 2);
  // current is the page we are currently paged to
  $pager_current = $pager_page_array[$element] + 1;
  // first is the first page listed by this pager piece (re quantity)
  $pager_first = $pager_current - $pager_middle + 1;
  // last is the last page listed by this pager piece (re quantity)
  $pager_last = $pager_current + $quantity - $pager_middle;
  // max is the maximum page number
  $pager_max = $pager_total[$element];
  // End of marker calculations.

  // Prepare for generation loop.
  $i = $pager_first;
  if ($pager_last > $pager_max) {
    // Adjust "center" if at end of query.
    $i = $i + ($pager_max - $pager_last);
    $pager_last = $pager_max;
  }
  if ($i <= 0) {
    // Adjust "center" if at start of query.
    $pager_last = $pager_last + (1 - $i);
    $i = 1;
  }
  // End of generation loop preparation.

  $li_first = theme('pager_first', array('text' => (isset($tags[0]) ? $tags[0] : t('« first')), 'element' => $element, 'parameters' => $parameters));
  $li_previous = theme('pager_previous', array('text' => (isset($tags[1]) ? $tags[1] : t('‹ previous')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_next = theme('pager_next', array('text' => (isset($tags[3]) ? $tags[3] : t('next ›')), 'element' => $element, 'interval' => 1, 'parameters' => $parameters));
  $li_last = theme('pager_last', array('text' => (isset($tags[4]) ? $tags[4] : t('last »')), 'element' => $element, 'parameters' => $parameters));

  $li_ellipsis = "";
  if ($_GET['page'] != $pager_max  - 1) {
   $li_ellipsis = theme('pager_link', array('text' => $pager_max, 'page_new' => pager_load_array($pager_total[$element] - 1, $element, $pager_page_array), 'element' => $element, 'parameters' => $parameters));
  }

  if ($pager_total[$element] > 1) {
    if ($li_first) {
      $items[] = array(
        'class' => array('pager-first'),
        'data' => $li_first,
      );
    }
    if ($li_previous) {
      $items[] = array(
        'class' => array('pager-previous'),
        'data' => $li_previous,
      );
    }

    // When there is more than one page, create the pager list.
    if ($i != $pager_max) {
      if ($i > 1) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…',
        );
      }
      // Now generate the actual pager piece.
      for (; $i <= $pager_last && $i <= $pager_max; $i++) {
        if ($i < $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_previous', array('text' => $i, 'element' => $element, 'interval' => ($pager_current - $i), 'parameters' => $parameters)),
          );
        }
        if ($i == $pager_current) {
          $items[] = array(
            'class' => array('pager-current'),
            'data' => $i,
          );
        }
        if ($i > $pager_current) {
          $items[] = array(
            'class' => array('pager-item'),
            'data' => theme('pager_next', array('text' => $i, 'element' => $element, 'interval' => ($i - $pager_current), 'parameters' => $parameters)),
          );
        }
      }
      if ($i < $pager_max) {
        $items[] = array(
          'class' => array('pager-ellipsis'),
          'data' => '…' . $li_ellipsis,
        );
      }
    }
    // End generation.
    if ($li_next) {
      $items[] = array(
        'class' => array('pager-next'),
        'data' => $li_next,
      );
    }
    if ($li_last) {
      $items[] = array(
        'class' => array('pager-last'),
        'data' => $li_last,
      );
    }
    return '<h2 class="element-invisible">' . t('Pages') . '</h2>' . theme('item_list', array(
      'items' => $items,
      'attributes' => array('class' => array('pager')),
    ));
  }
}

function akdn_js_alter(&$javascript) {
  // Swap out jQuery to use an updated version of the library.
  $javascript['sites/all/modules/contrib/eu-cookie-compliance/js/eu_cookie_compliance.js']['scope'] = 'header';
  $javascript['sites/all/modules/contrib/eu-cookie-compliance/js/eu_cookie_compliance.js']['weight'] = 100;
}

/**
 * template_preprocess_views_view_table.
 */
function akdn_preprocess_views_view_table(&$vars) {
  $view = $vars['view'];
  $rows = $vars['rows'];
  if ($view->name == 'akmi_events_views' && $view->current_display == 'page') {
    foreach ($rows as $id => $row) {
      $start_date = $view->result[$id]->field_data_field_akmi_event_date_field_akmi_event_date_value;
      $start_date = date("Y-m-d",strtotime($start_date));
      $start_date = strtotime($start_date);
      $event_class = get_the_classes($start_date);
      $vars['row_classes'][$id][] = $event_class;
    }
  }
}

/**
 * On rows clases are added based on date.
 * This Function is used in akdn_preprocess_views_view_table.
 */
function get_the_classes($start_date) {
  $today = date("Y-m-d");
  $today = strtotime($today);
  if ($start_date >= $today) {
    return 'upcoming_events';
  }
  else {
    return 'gone_events';
  }
}

/**
 * On Pop up lightbox showing image default caption and copyright with adddition of |
 */
function akdn_colorbox_imagefield($variables) {
  $caption = '';
  $explode = array_filter(explode('^', $variables['title']));
  if (!empty($explode)) {
    if (!empty($explode[0]) && !empty($explode[1])) {
      $caption = $explode[0] . ' | ' . $explode[1];
    }
    elseif (!empty($explode[0]) && empty($explode[1])) {
      $caption = $explode[0];
    }
    elseif (empty($explode[0]) && !empty($explode[1])) {
      $caption = $explode[1];
    }
    else {
        $caption = '';
    }
  }
  $class = array('colorbox');
  if ($variables['image']['style_name'] == 'hide') {
    $image = '';
    $class[] = 'js-hide';
  }
  elseif (!empty($variables['image']['style_name'])) {
    $image = theme('image_style', $variables['image']);
  }
  else {
    $image = theme('image', $variables['image']);
  }
  $options = drupal_parse_url($variables['path']);
  $options += array(
     'html' => TRUE,
     'attributes' => array(
      'title' =>  $caption ,
      'class' => $class,
      'rel' => $variables['gid'],
    ),
    'language' => array('language' => NULL),
  );
  return l($image, $options['path'], $options);
}


/**
 * Override the home page custom block with string
 * Implements hook_block_view_alter
 */
function akdn_block_view_alter(&$data, $block) {
  if ($block->delta == "126") {
    global $base_url;
    global $language;
    if ($language->language == "en") {
      $home_page_url = $base_url . "/";
    } else {
      $home_page_url = $base_url . "/" . $language->language;
    }
    $data['content'] = str_replace("@home_page_url", $home_page_url, $data['content']);
  }
}


/**
 * Translate the Download text of publication inner page for panel
 */
function akdn_preprocess_panels_pane(&$vars) {
  if (isset($vars['pane']->pid) && $vars['pane']->pid == "new-eccf47b0-a9df-431b-9227-efe39de24e7e") {
    if(isset($vars['content']['#field_name'])) {
      if ($vars['content']['#field_name'] == "field_publication_file") {
        $vars['display']->content['new-eccf47b0-a9df-431b-9227-efe39de24e7e']->configuration['formatter_settings']['text'] = t('Download');
      }
    }
  }
  // Translate the Related links of publication inner page for panel
  if (isset($vars['pane']->pid) && $vars['pane']->pid == "new-d6bbff22-6c30-438c-a158-398ae8be33b5") {
    if (isset($vars['content']['#field_name'])) {
      if ($vars['content']['#field_name'] == "field_project_links") {
        $vars['title'] = t('Related links');
      }
    }
  }
  if (isset($vars['pane']->pid) && $vars['pane']->pid == "new-9444d95a-d521-4901-905f-6828936eaf67") {
    if (isset($vars['content']['#field_name'])) {
      if ($vars['content']['#field_name'] == "field_event_links") {
        $vars['title'] = t('Related links');
      }
    }
  }
  if (isset($vars['content']['#field_name'])) {
    if ($vars['content']['#field_name'] == "field_event_related") {
      $vars['title'] = t('Related Information');
    }
  }
  if (isset($vars['content']['#field_name'])) {
    if ($vars['content']['#field_name'] == "field_article_link") {
      $vars['title'] = t($vars['title']);
    }
  }
}
