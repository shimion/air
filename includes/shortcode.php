<?php

/**
 * Display slider
 * 
 * @param string $alias slider alias
 */
if (!function_exists('airSlider')) {

    function airSlider($alias) {
        AirsliderShortcode::airsliderOutput($alias, true);
    }

}

/**
 * return slider html
 * 
 * @param string $alias slider alias
 * 
 * @return string slider html
 */
if (!function_exists('airsliderGet')) {

    function airsliderGet($alias) {
        AirsliderShortcode::airsliderOutput($alias, false);
    }

}

class AirsliderShortcode {

    /**
     * check shortcode
     */
    public static function airsliderExtShortcode($atts) {
        $a = shortcode_atts(array(
            'alias' => false,
                ), $atts);

        if (!$a['alias']) {
            return __('You have to insert a valid alias in the shortcode', AIRSLIDER_TEXTDOMAIN);
        } else {
            return AirsliderShortcode::airsliderOutput($a['alias'], false);
        }
    }

    /**
     * Generate shortcode
     */
    public static function airsliderAddShortcode() {
        add_shortcode(AIRSLIDER_TEXTDOMAIN, array(__CLASS__, 'airsliderExtShortcode'));
    }

    /**
     * Generate slider
     * 
     * @param string $alias slider alias
     * 
     * @param boolean $echo identify the we have to return the output or display the output
     * 
     * @return string if $echo is false then whole slider content will return
     */
    public static function airsliderOutput($alias, $echo) {
        global $wpdb;
        //Get the slider information
        $slider = $wpdb->get_row('SELECT * FROM ' . $wpdb->prefix . 'air_sliders WHERE alias = \'' . $alias . '\'');

        //Display error message if slider is not found
        if (!$slider) {
            if ($echo) {
                _e('The slider hasn not been found', AIRSLIDER_TEXTDOMAIN);
                return;
            } else {
                return __('The slider has not been found', AIRSLIDER_TEXTDOMAIN);
            }
        }

        $slider_id = $slider->id;
        $slider_option = maybe_unserialize($slider->slider_option);

        $output = '';

        //Set some settings for slider 
        $output .= '<div style="display: none;" class="airslider-slider airslider-slider-' . (isset($slider_option->layout) ? $slider_option->layout : '') . ' airslider-slider-' . $alias . '" id="airslider-' . $slider_id . '">' . "\n";
        $output .= '<input type="hidden" name="sliderBgColor" id="sliderBgColor" value="' . (isset($slider_option->background_type_color) ? trim($slider_option->background_type_color) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="sliderBgColorOpacity" id="sliderBgColorOpacity" value="' . (isset($slider_option->background_opacity) ? trim($slider_option->background_opacity) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="loaderType" id="loaderType" value="' . (isset($slider_option->loader_type) ? trim($slider_option->loader_type) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="loaderClass" id="loaderClass" value="' . (isset($slider_option->loaderClass) ? trim($slider_option->loaderClass) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="loaderImg" id="loaderImg" value="' . (isset($slider_option->loader_image) ? trim($slider_option->loader_image) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="loaderWidth" id="loaderWidth" value="' . (isset($slider_option->loader_image_width) ? trim($slider_option->loader_image_width) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="loaderHeight" id="loaderHeight" value="' . (isset($slider_option->loader_image_height) ? trim($slider_option->loader_image_height) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="controlClass" id="controlClass" value="' . (isset($slider_option->controlsClass) ? trim($slider_option->controlsClass) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="navigationClass" id="navigationClass" value="' . (isset($slider_option->navigationClass) ? trim($slider_option->navigationClass) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="navigationPosition" id="navigationPosition" value="' . (isset($slider_option->navigationPosition) ? trim($slider_option->navigationPosition) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="timerBarPosition" id="timerBarPosition" value="' . (isset($slider_option->timerBarPosition) ? trim($slider_option->timerBarPosition) : '') . '" />' . "\n";
        $output .= '<input type="hidden" name="shadowClass" id="shadowClass" value="' . (isset($slider_option->shadowClass) ? trim($slider_option->shadowClass) : '') . '" />' . "\n";
//		$output .= '<input type="hidden" name="customCSS" id="customCSS" value="'. stripslashes(trim($slider_option->customCSS)) .'" />' . "\n";
        $output .= '<ul>' . "\n";

        //Get slide information
        $slides = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'air_slides WHERE slider_parent = ' . $slider_id . ' ORDER BY position');

        foreach ($slides as $slide) {

            //Get slide setting and set the property
            $params = maybe_unserialize($slide->params);
            $background_type_image = (!isset($params['background_type_image']) || (isset($params['background_type_image']) && ($params['background_type_image'] == 'undefined' || $params['background_type_image'] == 'none'))) ? 'none;' : 'url(\'' . $params['background_type_image'] . '\');';
            $background_color = (!isset($params['background_type_color']) || (isset($params['background_type_color']) && $params['background_type_color'] == 'transparent')) ? 'transparent' : airsliderHex2Rgba($params['background_type_color'], trim($params['background_opacity']));
            $output .= '<li' . "\n" .
                    'style="' . "\n" .
                    'background-color: ' . $background_color . ';' . "\n" .
                    'background-image: ' . $background_type_image . ';' . "\n" .
                    'background-position: ' . (isset($params['background_propriety_position_x']) ? $params['background_propriety_position_x'] : '0') . ' ' . (isset($params['background_propriety_position_y']) ? $params['background_propriety_position_y'] : '0') . ';' . "\n" .
                    'background-repeat: ' . (isset($params['background_repeat']) ? $params['background_repeat'] : 'no-repeat') . ';' . "\n" .
                    'background-size: ' . (isset($params['background_propriety_size']) ? $params['background_propriety_size'] : '0') . ';' . "\n" .
                    (isset($params['custom_css']) ? stripslashes($params['custom_css']) : '') . "\n" .
                    '"' . "\n" .
                    'data-in="' . (isset($params['data_in']) ? $params['data_in'] : '') . '"' . "\n" .
                    'data-ease-in="' . (isset($params['data_easeIn']) ? $params['data_easeIn'] : '') . '"' . "\n" .
                    'data-out="' . (isset($params['data_out']) ? $params['data_out'] : '') . '"' . "\n" .
                    'data-ease-out="' . (isset($params['data_easeOut']) ? $params['data_easeOut'] : '') . '"' . "\n" .
                    'data-time="' . (isset($params['data_time']) ? $params['data_time'] : '') . '"' . "\n" .
                    '>' . "\n";

            $slide_parent = $slide->position;

            //Get Elements of particular slide
            if ($slide->layers != '') {
                $elements = maybe_unserialize($slide->layers);
                if(count($elements) > 0){
                    foreach ($elements as $element) {
                    if (isset($element->link) && trim($element->link) != '') {
                        $target = (isset($element->link_new_tab) && trim($element->link_new_tab) == 1) ? 'target="_blank"' : '';

                        //Set link
                        $output .= '<a' . "\n" .
                                'id="' . (isset($element->link_id) ? trim($element->link_id) : '') . '" ' . "\n" .
                                'class="' . (isset($element->link_class) ? trim($element->link_class) : '') . '" ' . "\n" .
                                'title="' . (isset($element->link_title) ? trim($element->link_title) : '') . '" ' . "\n" .
                                'rel="' . (isset($element->link_rel) ? trim($element->link_rel) : '') . '" ' . "\n" .
                                'data-delay="' . (isset($element->data_delay) ? trim($element->data_delay) : '0') . '"' . "\n" .
                                'data-ease-in="' . (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') . '"' . "\n" .
                                'data-ease-out="' . (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') . '"' . "\n" .
                                'data-in="' . (isset($element->data_in) ? trim($element->data_in) : 'fade') . '"' . "\n" .
                                'data-out="' . (isset($element->data_out) ? trim($element->data_out) : 'fade') . '"' . "\n" .
                                'data-ignore-ease-out="' . (isset($element->data_ignoreEaseOut) ? trim($element->data_ignoreEaseOut) : '') . '"' . "\n" .
                                'data-top="' . (isset($element->data_top) ? trim($element->data_top) : '0') . '"' . "\n" .
                                'data-left="' . (isset($element->data_left) ? trim($element->data_left) : '0') . '"' . "\n" .
                                'data-time="' . (isset($element->data_time) ? trim($element->data_time) : 'all') . '"' . "\n" .
                                'href="' . (isset($element->link) ? stripslashes(trim($element->link)) : '') . '"' . "\n" .
                                $target . "\n" .
                                'style="' .
                                'z-index: ' . (isset($element->z_index) ? trim($element->z_index) : '1') . ';' . "\n" .
                                '">' . "\n";
                    }

                    //Based on type slide element will display
                    if (isset($element->type)) {
                        switch (trim($element->type)) {
                            case 'text':
                                $output .= '<div' . "\n" .
                                        'id="' . (isset($element->attr_id) ? trim($element->attr_id) : '') . '" ' . "\n" .
                                        'class="' . (isset($element->attr_class) ? trim($element->attr_class) : '') . '" ' . "\n" .
                                        'title="' . (isset($element->attr_title) ? trim($element->attr_title) : '') . '" ' . "\n" .
                                        'rel="' . (isset($element->attr_rel) ? trim($element->attr_rel) : '') . '" ' . "\n" .
                                        'style="';
                                if (isset($element->link) && trim($element->link) == '') {
                                    $output .= 'z-index: ' . (isset($element->z_index) ? trim($element->z_index) : '1') . ';' . "\n";
                                }
                                if (isset($element->custom_css)) {
                                    $output .= stripslashes(trim($element->custom_css)) . "\n";
                                }
                                $output .= '"' . "\n";
                                if (isset($element->link) && trim($element->link) == '') {
                                    $output .= 'data-delay="' . (isset($element->data_delay) ? trim($element->data_delay) : '0') . '"' . "\n" .
                                            'data-ease-in="' . (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') . '"' . "\n" .
                                            'data-ease-out="' . (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') . '"' . "\n" .
                                            'data-in="' . (isset($element->data_in) ? trim($element->data_in) : 'fade') . '"' . "\n" .
                                            'data-out="' . (isset($element->data_out) ? trim($element->data_out) : 'fade') . '"' . "\n" .
                                            'data-ignore-ease-out="' . (isset($element->data_ignoreEaseOut) ? trim($element->data_ignoreEaseOut) : '') . '"' . "\n" .
                                            'data-top="' . (isset($element->data_top) ? trim($element->data_top) : '0') . '"' . "\n" .
                                            'data-left="' . (isset($element->data_left) ? trim($element->data_left) : '0') . '"' . "\n" .
                                            'data-time="' . (isset($element->data_time) ? trim($element->data_time) : 'all') . '"' . "\n";
                                }
                                $output .= '>' . "\n" . (isset($element->inner_html) ? stripslashes(trim($element->inner_html)) : '') . "\n" .
                                        '</div>' . "\n";
                                break;

                            case 'image':
                                $output .= '<img' . "\n" .
                                        'id="' . (isset($element->attr_id) ? trim($element->attr_id) : '') . '" ' . "\n" .
                                        'class="' . (isset($element->attr_class) ? trim($element->attr_class) : '') . '" ' . "\n" .
                                        'title="' . (isset($element->attr_title) ? trim($element->attr_title) : '') . '" ' . "\n" .
                                        'rel="' . (isset($element->attr_rel) ? trim($element->attr_rel) : '') . '" ' . "\n" .
                                        'data-scale="';
                                if (isset($element->image_scale) && trim($element->image_scale) == 'Y') {
                                    $output .= 'true';
                                } else {
                                    $output .= 'false';
                                }
                                $output .= '"' . "\n" .
                                        'src="' . (isset($element->image_src) ? trim($element->image_src) : '') . '"' . "\n" .
                                        'alt="' . (isset($element->image_alt) ? trim($element->image_alt) : '') . '"' . "\n" .
                                        'style="' . "\n";
                                if (isset($element->link) && trim($element->link) == '') {
                                    $output .= 'z-index: ' . (isset($element->z_index) ? trim($element->z_index) : '1') . ';' . "\n";
                                }
                                if (isset($element->custom_css)) {
                                    $output .= stripslashes(trim($element->custom_css)) . "\n";
                                }
                                $output .= '"' . "\n";
                                if (isset($element->link) && trim($element->link) == '') {
                                    $output .= 'data-delay="' . (isset($element->data_delay) ? trim($element->data_delay) : '0') . '"' . "\n" .
                                            'data-ease-in="' . (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') . '"' . "\n" .
                                            'data-ease-out="' . (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') . '"' . "\n" .
                                            'data-in="' . (isset($element->data_in) ? trim($element->data_in) : 'fade') . '"' . "\n" .
                                            'data-out="' . (isset($element->data_out) ? trim($element->data_out) : 'fade') . '"' . "\n" .
                                            'data-ignore-ease-out="' . (isset($element->data_ignoreEaseOut) ? trim($element->data_ignoreEaseOut) : '') . '"' . "\n" .
                                            'data-top="' . (isset($element->data_top) ? trim($element->data_top) : '0') . '"' . "\n" .
                                            'data-left="' . (isset($element->data_left) ? trim($element->data_left) : '0') . '"' . "\n" .
                                            'data-time="' . (isset($element->data_time) ? trim($element->data_time) : 'all') . '"' . "\n";
                                }
                                $output .= '/>' . "\n";
                                break;

                            case 'video':
                                $video_preview_img = '';
                                $output .= '<div class="air-iframe-wrapper ' . (isset($element->attr_class) ? trim($element->attr_class) : '') . '" ' . "\n" .
                                        'id="' . (isset($element->attr_id) ? trim($element->attr_id) : '') . '" ' . "\n" .
                                        'title="' . (isset($element->attr_title) ? trim($element->attr_title) : '') . '" ' . "\n" .
                                        'rel="' . (isset($element->attr_rel) ? trim($element->attr_rel) : '') . '" ';
                                $output .= 'data-video-type="' . (isset($element->video_type) ? trim($element->video_type) : 'Y') . '" ';
                                $output .= 'data-video-autoplay="';
                                if (isset($element->video_autoplay) && trim($element->video_autoplay) != '' && trim($element->video_autoplay) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-video-autoplay-firsttime="';
                                if (isset($element->video_autoplay_firsttime) && trim($element->video_autoplay_firsttime) != '' && trim($element->video_autoplay_firsttime) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-next-slide-on-video-end="';
                                if (isset($element->next_slide_on_video_end) && trim($element->next_slide_on_video_end) != '' && trim($element->next_slide_on_video_end) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-video-loop="';
                                if (isset($element->video_loop) && trim($element->video_loop) != '' && trim($element->video_loop) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-video-force-rewind="';
                                if (isset($element->video_force_rewind) && trim($element->video_force_rewind) != '' && trim($element->video_force_rewind) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-video-mute="';
                                if (isset($element->video_mute) && trim($element->video_mute) != '' && trim($element->video_mute) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';
                                $output .= '" data-video-id="';
                                if (isset($element->video_id) && trim($element->video_id) != '')
                                    $output .= trim($element->video_id);
                                else
                                    $output .= '';
                                $output .= '" data-video-full-width="';
                                if (isset($element->video_full_width) && trim($element->video_full_width) != '' && trim($element->video_full_width) != 'N')
                                    $output .= 'true';
                                else
                                    $output .= 'false';

                                $output .= '" data-is-preview="' . (isset($element->video_is_preview_set) ? trim($element->video_is_preview_set) : '') . '"';
                                if (isset($element->video_type) && trim($element->video_type) == 'H') {
                                    $output .= ' data-preview-img="' . (isset($element->video_html5_poster_url) ? trim($element->video_html5_poster_url) : '') . '"';
                                    $video_preview_img = (isset($element->video_html5_poster_url) ? $element->video_html5_poster_url : '');
                                    $output .= ' data-preview-title="Html5 Video"';
                                } else {
                                    $output .= ' data-preview-img="' . (isset($element->video_preview_img_src) ? trim($element->video_preview_img_src) : '') . '"';
                                    $video_preview_img = (isset($element->video_preview_img_src) ? $element->video_preview_img_src : '');
                                    $output .= ' data-preview-title="' . (isset($element->video_preview_img_alt) ? trim($element->video_preview_img_alt) : '') . '"';
                                }
                                $output .=' style="';
                                if (isset($element->link) && trim($element->link) == '') {
                                    $output .= 'z-index: ' . (isset($element->z_index) ? trim($element->z_index) : '1') . ';' . "\n";
                                }
                                if(isset($element->custom_css)) {
                                    $output .= stripslashes(trim($element->custom_css)) . "\n";
                                }
                                $output .= '"' . "\n";
                                if (trim($element->link) == '') {
                                    $output .= 'data-delay="' . (isset($element->data_delay) ? trim($element->data_delay) : '0') . '"' . "\n" .
                                            'data-ease-in="' . (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') . '"' . "\n" .
                                            'data-ease-out="' . (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') . '"' . "\n" .
                                            'data-in="' . (isset($element->data_in) ? trim($element->data_in) : 'fade') . '"' . "\n" .
                                            'data-out="' . (isset($element->data_out) ? trim($element->data_out) : 'fade') . '"' . "\n" .
                                            'data-ignore-ease-out="' . (isset($element->data_ignoreEaseOut) ? trim($element->data_ignoreEaseOut) : '') . '"' . "\n" .
                                            'data-top="' . (isset($element->data_top) ? trim($element->data_top) : '0') . '"' . "\n" .
                                            'data-left="' . (isset($element->data_left) ? trim($element->data_left) : '0') . '"' . "\n" .
                                            'data-time="' . (isset($element->data_time) ? trim($element->data_time) : 'all') . '"' . "\n";
                                }
                                $output .= '>';
                                $fullscreen = '';
                                if (isset($element->video_full_width) && trim($element->video_full_width) == 'Y') {
                                    $fullscreen = 'fullscreenvideo';
                                }
                                if (isset($element->video_type) && trim($element->video_type) == 'Y') {
                                    $output .= '<iframe src="https://www.youtube.com/embed/' . (isset($element->video_link) ? trim($element->video_link) : '') . '?hd=1&amp;wmode=opaque&amp;controls=1&amp;showinfo=0;rel=0;" '
                                            . ' class="air-youtube-iframe ' . $fullscreen . '" width="' . (isset($element->video_width) ? trim($element->video_width) : '320') . '" height="' . (isset($element->video_height) ? trim($element->video_height) : '240') . '" frameborder="0" '
                                            . 'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                                } else if (isset($element->video_type) && trim($element->video_type) == 'V') {
                                    $output .= '<iframe src="https://player.vimeo.com/video/' . (isset($element->video_link) ? trim($element->video_link) : '') . '?title=0&byline=0&portrait=0" '
                                            . 'class="air-vimeo-iframe ' . $fullscreen . '" width="' . (isset($element->video_width) ? trim($element->video_width) : '320') . '" height="' . (isset($element->video_height) ? trim($element->video_height) : '240') . '" frameborder="0" '
                                            . 'webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>';
                                } else if (isset($element->video_type) && trim($element->video_type) == 'H') {
                                    $videoloop = (isset($element->video_loop) && trim($element->video_loop) == 'Y') ? ' loop' : '';

                                    $output .= '<video class="air-html5-video video-js vjs-default-skin ' . $fullscreen . '" ' . $videoloop . ' width="' . (isset($element->video_width) ? trim($element->video_width) : '320') . '" height="' . (isset($element->video_height) ? trim($element->video_height) : '240') . '" controls';

                                    if (isset($element->video_html5_poster_url) && trim($element->video_html5_poster_url) != '') {
                                        $output .= ' poster="' . trim($element->video_html5_poster_url) . '"';
                                    }
                                    $output .= ' preload="none" data-setup="{}"> ';

                                    if (isset($element->video_html5_mp4_video_link) && trim($element->video_html5_mp4_video_link) != '') {
                                        $output .= '<source src="' . trim($element->video_html5_mp4_video_link) . '" type="video/mp4" /> ';
                                    }

                                    if (isset($element->video_html5_webm_video_link) && trim($element->video_html5_webm_video_link) != '') {
                                        $output .= '<source src="' . trim($element->video_html5_webm_video_link) . '" type="video/webm" /> ';
                                    }

                                    if (isset($element->video_html5_ogv_video_link) && trim($element->video_html5_ogv_video_link) != '') {
                                        $output .= '<source src="' . trim($element->video_html5_ogv_video_link) . '" type="video/ogg" /> ';
                                    }

                                    $output .= ' <p class="vjs-no-js">To view this video please enable JavaScript, and consider upgrading to a web browser that <a href="http://videojs.com/html5-video-support/" target="_blank">supports HTML5 video</a></p>';
                                    $output .= '</video>';
                                }
                                //if preview image is set
                                if (isset($element->video_is_preview_set) && trim($element->video_is_preview_set) == 'true' && isset($element->video_type) && trim($element->video_type) != 'H') {
                                    $output .= '<div class="air-video-preivew-img" style="background-image:url(\'' . trim($video_preview_img) . '\');background-size: cover;background-position: center center;cursor: pointer;height: 100%;width:100%;left:0;top:0;position:absolute;"></div>';
                                }
                                $output .= '</div>';
                                break;
                        }
                    }
                    if ((isset($element->link)) && (trim($element->link) != '')) {
                        $output .= '</a>' . "\n";
                    }
                }
                }
            }
            $output .= '</li>' . "\n";
        }
        $output .= '</ul>' . "\n";
        $output .= '</div>' . "\n";

        $output .= '<script type="text/javascript">' . "\n";
        $output .= '(function($) {' . "\n";
        $output .= '$(document).ready(function() {' . "\n";
        $output .= '$("#airslider-' . $slider_id . '").airSlider({' . "\n";
        $output .= 'layout: \'' . (isset($slider_option->layout) ? $slider_option->layout : 'fixed') . '\',' . "\n";
        $output .= 'responsive: ' . (isset($slider_option->responsive) ? $slider_option->responsive : 'true') . ',' . "\n";
        $output .= 'startWidth: ' . (isset($slider_option->startWidth) ? $slider_option->startWidth : '1170') . ',' . "\n";
        $output .= 'startHeight: ' . (isset($slider_option->startHeight) ? $slider_option->startHeight : '500') . ',' . "\n";
        $output .= 'automaticSlide: ' . (isset($slider_option->automaticSlide) ? $slider_option->automaticSlide : 'true') . ',' . "\n";
        $output .= 'showControls: ' . (isset($slider_option->showControls) ? $slider_option->showControls : 'false') . ',' . "\n";
        $output .= 'showNavigation: ' . (isset($slider_option->showNavigation) ? $slider_option->showNavigation : 'false') . ',' . "\n";
        $output .= 'enableSwipe: ' . (isset($slider_option->enableSwipe) ? $slider_option->enableSwipe : 'true') . ',' . "\n";
        $output .= 'showTimerBar: ' . (isset($slider_option->showTimerBar) ? $slider_option->showTimerBar : 'true') . ',' . "\n";
        $output .= 'showShadowBar: ' . (isset($slider_option->showShadowBar) ? $slider_option->showShadowBar : 'false') . ',' . "\n";
        $output .= 'pauseOnHover: ' . (isset($slider_option->pauseOnHover) ? $slider_option->pauseOnHover : 'true') . ',' . "\n";
        $output .= 'beforeStart			: function() {' . (isset($slider_option->beforeStart) ? stripslashes($slider_option->beforeStart) : '') . '},
			    beforeSetResponsive		: function() {' . (isset($slider_option->beforeSetResponsive) ? stripslashes($slider_option->beforeSetResponsive) : '') . '},
			    beforeSlideStart		: function() {' . (isset($slider_option->beforeSlideStart) ? stripslashes($slider_option->beforeSlideStart) : '') . '},
			    beforePause			: function() {' . (isset($slider_option->beforePause) ? stripslashes($slider_option->beforePause) : '') . '},
			    beforeResume		: function() {' . (isset($slider_option->beforeResume) ? stripslashes($slider_option->beforeResume) : '') . '},' . "\n";
        $output .= '});' . "\n";
        $output .= '});' . "\n";
        $output .= '})(jQuery);' . "\n";
        $output .= '</script>' . "\n";

        if ($echo) {
            echo $output;
        } else {
            return $output;
        }
    }
}
