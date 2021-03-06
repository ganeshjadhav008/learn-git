<?php
/**
 * @file
 * Common Unused Modules functionality.
 */

/**
 * Returns an array with all available modules.
 *
 * Object module
 *  ->uri
 *  ->filename
 *  ->name
 *  ->module_path
 *  ->project_path
 *  ->project_namespace
 *  ->project_has_enabled_modules
 *  ->module_is_enabled
 */
function _unused_modules_get_modules_by_project() {
  $enabled_modules = _unused_modules_get_enabled_modules();
  $available_modules = _unused_modules_get_available_modules();

  // Projects are organized by path.
  // Foreach path check if there are $enabled_modules.
  // If so, project_has_enabled_modules = TRUE.
  foreach ($available_modules as &$available_module) {
    if (isset($available_module)) {
      foreach ($enabled_modules as $enabled_module) {
        if (isset($enabled_module)) {
          // Test if there is an enabled module with the same path.
          if ($enabled_module->project_path == $available_module->project_path) {
            $available_module->project_has_enabled_modules = TRUE;
          }

          // Test if module is enabled.
          if ($enabled_module->name == $available_module->name) {
            $available_module->module_is_enabled = TRUE;
          }
        }
      }

      // If none was found, this project does not have enabled modules.
      if (!isset($available_module->project_has_enabled_modules)) {
        $available_module->project_has_enabled_modules = FALSE;
      }
      // Set disabled toggle.
      if (!isset($available_module->module_is_enabled)) {
        $available_module->module_is_enabled = FALSE;
      }
    }
  }

  // Sort by project.
  uasort($available_modules, '_unused_modules_sort_by_project');

  return $available_modules;
}

/**
 * Returns an array of available modules.
 */
function _unused_modules_get_available_modules() {
  $available_modules = &drupal_static(__FUNCTION__);

  if (!isset($available_modules)) {
    // Get all modules available.
    $available_modules = drupal_system_listing("/\.module$/", "modules", 'name', 0);
    // Sort for readability.
    ksort($available_modules);
    // Add module info.
    _unused_modules_add_module_info($available_modules);
    // Remove core modules.
    _unused_modules_remove_core_modules($available_modules);
    // Add information from .info file.
    _unused_modules_add_info_file_information($available_modules);
    // Add project info.
    _unused_modules_add_project_path($available_modules);
  }

  return $available_modules;
}

/**
 * Returns an array of enabled modules.
 */
function _unused_modules_get_enabled_modules() {
  // Get all modules available.
  $available_modules = _unused_modules_get_available_modules();
  // Get all enabled modules.
  $enabled_modules = module_list();

  // Return only enabled.
  $return = array();
  foreach ($enabled_modules as $enabled_module) {
    // Some enabled_modules are actually not available. This is the case for
    // installation profiles like 'minimal'.
    if (isset($available_modules[$enabled_module])) {
      $return[$enabled_module] = $available_modules[$enabled_module];
    }
  }

  return $return;
}

/**
 * Add module info.
 */
function _unused_modules_add_module_info(&$modules) {
  foreach ($modules as &$module) {
    // Set module_path.
    $module->module_path = str_replace("/" . $module->filename, "", $module->uri);
  }
}

/**
 * Add project path.
 *
 * Group modules by 'project' and extract their lowest common basepath.
 */
function _unused_modules_add_project_path(&$modules) {

  // Group modules by project.
  $modules_grouped_by_project = array();
  foreach ($modules as $module) {
    $modules_grouped_by_project[$module->project][$module->name] = $module;
  }

  // Add project_path to module.
  foreach ($modules_grouped_by_project as $project) {

    // Determine common basepath by looking for needle "/<project>/" in uri.
    // As a fallback use the shortest path method.
    foreach ($project as $module) {
      if (isset($module->error) && $module->error !== TRUE) {
        $needle = "/" . $module->project . "/";
        $before_needle = TRUE;
        $project_path = strstr($module->uri, $needle, $before_needle) . "/" . $module->project;

        $module->project_path = $project_path;
      }
    }

    // Fallback: determine common basepath by picking the shortest path of all
    // project modules.
    if (!isset($module->project_path)) {
      $project_paths = array();
      foreach ($project as $module) {
        $project_paths[] = $module->module_path;
      }

      // Get length of each module path in a project.
      $lengths = array_map('strlen', $project_paths);
      // Sort by value (lowest number first).
      asort($lengths);
      // Get lowest key.
      reset($lengths);
      $key = key($lengths);
      // Shortest path.
      $shortest_path = $project_paths[$key];

      // Add the project_path to each module.
      foreach ($project as $module) {
        $module->project_path = $shortest_path;
      }
    }

    unset($project_paths);
  }
}

/**
 * Remove core modules.
 */
function _unused_modules_remove_core_modules(&$modules) {
  // Removes core modules from the array.
  foreach ($modules as $key => $module) {
    if (substr($module->uri, 0, 7) == 'modules') {
      unset($modules[$key]);
    }
  }
}

/**
 * Sort helper.
 */
function _unused_modules_sort_by_project($a, $b) {
  // Sort by module name if from same project.
  if ($a->project == $b->project) {
    return strnatcmp($a->name, $b->name);
  }

  // Otherwise sort by project name.
  return strnatcmp($a->project, $b->project);
}

/**
 * Add module information from <module>.info file.
 *
 * @param array &$modules
 *   Array with module objects.
 *
 *   Adds properties to $module objects inside $modules:
 *   - project.
 *   - error (default FALSE).
 */
function _unused_modules_add_info_file_information(&$modules = array()) {

  // The Drupal packaging script adds project information to the .info file.
  foreach ($modules as $module) {
    try {
      // Error will be set to TRUE if .info cannot be parsed/found.
      $module->error = FALSE;

      // Get .info filename by replacing .module with .info.
      $module->info_file = substr_replace($module->uri, ".info", -7);

      if (!file_exists($module->info_file)) {
        $error_message = "No .info file found for module '" . $module->name . "'";
        throw new Exception($error_message);
      }
      $info_file = file($module->info_file, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);

      // Traverse all lines in .info and look for the line that starts
      // with "project". When found, add the project name to the module object.
      foreach ($info_file as $line) {
        if (substr($line, 0, 7) === "project") {
          // Remove "project = " prefix.
          $module->project = str_replace("project = ", "", $line);
          // Remove surrounding quotes.
          $module->project = str_replace('"', '', $module->project);
        }
      }

      // Throw error if no project information is found.
      // This should only be the case for sandbox modules.
      if (!isset($module->project)) {
        $error_message = "No project information found for module '" . $module->name . "'";
        throw new Exception($error_message);
      }
    }
    catch (Exception $e) {
      $module->project = "_NO_PROJECT_INFORMATION_";
      $module->error = TRUE;

      // Don't write warnings during site_audit execution.
      $show_warnings = TRUE;
      if (function_exists('drush_get_command')) {
        $command = drush_get_command();
        if ($command['command'] == 'audit_extensions') {
          $show_warnings = FALSE;
        }
      }
      if ($show_warnings) {
        drupal_set_message($e->getMessage(), 'warning');
      }
    }
  }
}
