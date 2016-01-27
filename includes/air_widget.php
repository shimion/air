<?php
/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

class Airslider_Widget extends WP_Widget {

    function __construct() {
        $widget_ops = array('classname' => 'widget_airslider', 'description' => __('Add slider to your sidebar.', AIRSLIDER_TEXTDOMAIN));
        parent::__construct('air-slider-widget', __('Air Slider Widget', AIRSLIDER_TEXTDOMAIN), $widget_ops);
        $this->alt_option_name = 'widget_airslider';

        add_action('save_post', array($this, 'flush_widget_cache1'));
        add_action('deleted_post', array($this, 'flush_widget_cache1'));
        add_action('switch_theme', array($this, 'flush_widget_cache1'));
    }

    function widget($args, $instance) {
        $cache = array();
        if (!$this->is_preview()) {
            $cache = wp_cache_get('widget_airslider', 'widget');
        }

        if (!is_array($cache)) {
            $cache = array();
        }

        if (!isset($args['widget_id'])) {
            $args['widget_id'] = $this->id;
        }

        if (isset($cache[$args['widget_id']])) {
            echo $cache[$args['widget_id']];
            return;
        }

        ob_start();
        extract($args);
        $title = (!empty($instance['title']) ) ? $instance['title'] : __('Air Slider', AIRSLIDER_TEXTDOMAIN);
        /** This filter is documented in wp-includes/default-widgets.php */
        $title = apply_filters('widget_title', $title, $instance, $this->id_base);
        $slider_alias = (!empty($instance['slider_alias']) ) ? $instance['slider_alias'] : '';        
        echo $before_widget; 
        if ($title) echo $before_title . $title . $after_title;
        if($slider_alias){
            echo do_shortcode('[airslider alias="'.$slider_alias.'"]');
        }
        echo $after_widget;
        
        if (!$this->is_preview()) {
            $cache[$args['widget_id']] = ob_get_flush();
            wp_cache_set('widget_airslider', $cache, 'widget');
        } else {
            ob_end_flush();
        }
    }

    function update($new_instance, $old_instance) {
        $instance = $old_instance;
        $instance['title'] = strip_tags($new_instance['title']);        
        $instance['slider_alias'] = strip_tags($new_instance['slider_alias']);        
        $this->flush_widget_cache1();

        $alloptions = wp_cache_get('alloptions', 'options');
        if (isset($alloptions['widget_airslider']))
            delete_option('widget_airslider');

        return $instance;
    }

    function flush_widget_cache1() {
        wp_cache_delete('widget_airslider', 'widget');
    }

    function form($instance) {
        global $wpdb;
        //Get the slider information
        $sliders = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'air_sliders');
        $title = isset($instance['title']) ? esc_attr($instance['title']) : '';
        $slider_alias = isset($instance['slider_alias']) ? esc_attr($instance['slider_alias']) : '';        
        ?>
        <p><label for="<?php echo $this->get_field_id('title'); ?>"><?php _e('Title:', AIRSLIDER_TEXTDOMAIN); ?></label>
            <input class="widefat" id="<?php echo $this->get_field_id('title'); ?>" name="<?php echo $this->get_field_name('title'); ?>" type="text" value="<?php echo $title; ?>" /></p>
        <p>            
            <?php            
            if ($sliders) {
                ?>
                <label for="<?php echo $this->get_field_id('slider_alias'); ?>"><?php _e('Select Slider:', AIRSLIDER_TEXTDOMAIN); ?></label>
                <select class="widefat" id="<?php echo $this->get_field_id('slider_alias'); ?>" name="<?php echo $this->get_field_name('slider_alias'); ?>">                    
                    <option value="0" <?php if ($slider_alias == '0' ) echo 'selected = selected'; ?>><?php _e('select air slider',AIRSLIDER_TEXTDOMAIN); ?></option>
                    <?php
                    foreach ($sliders as $slider) {
                        ?>
                        <option value="<?php echo $slider->alias; ?>" <?php if ($slider->alias == $slider_alias ) echo 'selected = selected'; ?>><?php echo $slider->name; ?></option>
                <?php } ?>
                </select>
            <?php
                }else {
                    _e('No sliders found.',AIRSLIDER_TEXTDOMAIN);
                }
            ?>
        </p>

        <?php
    }
}
