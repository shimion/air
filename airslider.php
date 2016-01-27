<?php
/**
 * Plugin Name: Air Slider
 * Plugin URI: http://www.simthemes.com/
 * Description: WordPress Slider with layer animation
 * Author: SimThemes
 * Author URI: http://SimThemes.com/
 * Copyright: SimThemes
 * Version: 1.0.0
 * Requires at least: 3.8.0
 * Tested up to: 4.3.1
 * License: GPLv2 or later
 */

/*************/
/** GLOBALS **/
/*************/ 

define("AIRSLIDER_TEXTDOMAIN","airslider");
define('AIR_PLUGIN_DIR', plugin_dir_path(__FILE__));
define('AIR_PLUGIN_URL', plugins_url() . '/airslider');

/**
 * Convert hexdec color string to rgb(a) string
 * 
 * @param string $color color in hex or rgb format
 * 
 * @param boolean/integer $opacity value of opacity
*/
if(!function_exists('airsliderHex2Rgba'))
{ 
    function airsliderHex2Rgba($color, $opacity = false) {

    $default = 'rgb(0,0,0)';

    //Return default if no color provided
    if(empty($color))
              return $default;

    //Sanitize $color if "#" is provided
            if ($color[0] == '#' ) {
             $color = substr( $color, 1 );
            }

            //Check if color has 6 or 3 characters and get values
            if (strlen($color) == 6) {
                    $hex = array( $color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5] );
            } elseif ( strlen( $color ) == 3 ) {
                    $hex = array( $color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2] );
            } else {
                    return $default;
            }

            //Convert hexadec to rgb
            $rgb =  array_map('hexdec', $hex);

            //Check if opacity is set(rgba or rgb)
            if($opacity){
    //                         if(abs($opacity) > 1)
    //                         $opacity = 1.0;
             if(abs($opacity) > 100)
             $opacity = 100;
             $output = 'rgba('.implode(",",$rgb).','.($opacity/100).')';
            } else {
             $output = 'rgb('.implode(",",$rgb).')';
            }

            //Return rgb(a) color string
            return $output;
    }
}
require_once AIR_PLUGIN_DIR . 'includes/tables.php';
require_once AIR_PLUGIN_DIR . 'includes/shortcode.php';

// Create (or remove) 3 tables: the sliders settings, the slides settings and the elements proprieties. We will also store the current version of the plugin					
register_activation_hook(__FILE__, array('AirsliderTables', 'airsliderSetTables'));
register_uninstall_hook(__FILE__, array('AirsliderTables', 'airsliderDropTables'));

/**
 * plugin text domain
*/
add_action('plugins_loaded', 'airsliderPluginTextDomain');
function airsliderPluginTextDomain()
{
    $locale = apply_filters('plugin_locale', get_locale(), AIRSLIDER_TEXTDOMAIN);
    load_textdomain(AIRSLIDER_TEXTDOMAIN, WP_LANG_DIR . '/airslider-' . $locale . '.mo');
    load_plugin_textdomain(AIRSLIDER_TEXTDOMAIN, false, dirname(plugin_basename(__FILE__)) . '/languages');
}

/**
 * admin enqueue script
*/
if(is_admin()) {
    require_once AIR_PLUGIN_DIR . 'includes/admin.php';
    add_action('admin_enqueue_scripts', 'airsliderAdminJS');
}
if(!function_exists('airsliderAdminJS'))
{
    function airsliderAdminJS()
    {
        ?>
        <script type="text/javascript">
            var airslider_is_wordpress_admin = true;
        </script>
        <?php
    }
}

/**
 * both side enqueue script and style
*/
add_action('wp_enqueue_scripts', 'enqueues');
add_action('admin_enqueue_scripts', 'enqueues');

if(!function_exists('enqueues'))
{
    function enqueues()
    {
        wp_enqueue_script('jquery');
        wp_enqueue_script('jquery-ui-core');
        wp_enqueue_style('slidercss', AIR_PLUGIN_URL . '/css/airslider.css');
        wp_enqueue_style('Html5css', AIR_PLUGIN_URL . '/videojs/video-js.min.css');
        wp_enqueue_script('froogaloop2js', AIR_PLUGIN_URL. '/js/froogaloop2.min.js');
        wp_enqueue_script('Youtubejs', 'https://www.youtube.com/iframe_api'); 
        wp_enqueue_script('Html5js', AIR_PLUGIN_URL. '/videojs/video.js');
        wp_localize_script('Html5js', 'airsliderSliderHtml5JS', array('AirPluginUrl' => plugins_url().'/airslider'));
        wp_enqueue_script('sliderjs', AIR_PLUGIN_URL . '/js/airslider.js');
    }
}

AirsliderShortcode::airsliderAddShortcode();

//admin enqueue script
if(is_admin()) {
    AirsliderAdmin::setEnqueues();
    AirsliderAdmin::airsliderShowSettings();

    // Ajax functions
    require_once AIR_PLUGIN_DIR . 'includes/ajax.php';	
        
    /**
    * Append the 'Add Slider' button to selected admin pages
    */
    add_filter( 'media_buttons_context', 'insert_airslider_button' );
    function insert_airslider_button( $context ) {

        global $pagenow;

        if ( in_array( $pagenow, array( 'post.php', 'page.php', 'post-new.php', 'post-edit.php' ) ) ) {
            $context .= '<a href="#TB_inline?&inlineId=choose-air-slider" class="thickbox button" title="' .
                __( "Select slideshow to insert into post", AIRSLIDER_TEXTDOMAIN ) .
                '"><span class="wp-media-buttons-icon" style="background: url(' . AIR_PLUGIN_URL .
                '/images/air.png); background-repeat: no-repeat; background-position: left bottom;"></span> ' .
                __( "Add Air Slider", AIRSLIDER_TEXTDOMAIN ) . '</a>';
        }

        return $context;

    }

    /**
     * Append the 'Choose Air Slider' thickbox content to the bottom of selected admin pages
     */
    add_action( 'admin_footer','admin_footer_air', 11 );
    function admin_footer_air() {

        global $pagenow;

        // Only run in post/page creation and edit screens
        if ( in_array( $pagenow, array( 'post.php', 'page.php', 'post-new.php', 'post-edit.php' ) ) ) {
            global $wpdb;
            //Get the slider information            
            $sliders = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'air_sliders');
            ?>

            <script type="text/javascript">
                jQuery(document).ready(function() {                    
                  jQuery('#insertAirSlider').on('click', function() {                      
                    var id = jQuery('#airslider-select option:selected').val();
                    window.send_to_editor('[airslider alias="' + id + '"]');
                    tb_remove();
                  });
                });
            </script>

            <div id="choose-air-slider" style="display: none;">
                <div class="wrap">
                    <?php
                        if ( count( $sliders ) ) {
                            echo "<h3 style='margin-bottom: 20px;'>" . __( "Insert Air Slider", AIRSLIDER_TEXTDOMAIN ) . "</h3>";
                            echo "<select id='airslider-select'>";
                            echo "<option disabled=disabled>" . __( "Choose slideshow", AIRSLIDER_TEXTDOMAIN ) . "</option>";
                            foreach ( $sliders as $slider ) {
                                echo "<option value='{$slider->alias}'>{$slider->name}</option>";
                            }
                            echo "</select>";
                            echo "<button class='button primary' id='insertAirSlider'>" . __( "Insert slideshow", AIRSLIDER_TEXTDOMAIN ) . "</button>";
                        } else {
                            _e( "No sliders found", AIRSLIDER_TEXTDOMAIN );
                        }
                    ?>
                </div>
            </div>
            <?php
        }
    }
}
require_once AIR_PLUGIN_DIR . 'includes/air_widget.php';
function Airsliderwidget_register() {
    register_widget('Airslider_Widget');
}
add_action( 'widgets_init', 'Airsliderwidget_register' );
?>