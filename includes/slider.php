<div id="air-slider-settings">
    <?php
        //Get slider setting option
        $slider_option = array();
        if(isset($slider)){
            $slider_option = maybe_unserialize( $slider->slider_option );
        }
        
	// Contains the key, the display name and a boolean: true if is the default option
	$slider_select_options = array(
		'layout' => array(
			'full-width' => array(__('Full Width', AIRSLIDER_TEXTDOMAIN), false),
			'fixed' => array(__('Fixed', AIRSLIDER_TEXTDOMAIN), true),
		),
		'boolean' => array(
			1 => array(__('Yes', AIRSLIDER_TEXTDOMAIN), true),
			0 => array(__('No', AIRSLIDER_TEXTDOMAIN), false),
		),
                'shadow' => array(
                        'shadow1','shadow2','shadow3',
                ),
		'controls' => array(
                        'control1','control2','control3',
                        'control4','control5','control6',
                        'control7','control8','control9',
                        'control10','control11','control12',
                        'control13','control14','control15',
                        'control16','control17','control18',
                        'control19','control20','control21',
                        'control22','control23','control24',
                        'control25','control26','control27',
                        'control28','control29','control30'
                ),
		'navigation' => array(
                        'navigation1','navigation2','navigation3',
                        'navigation4','navigation5','navigation6',
                        'navigation7','navigation8','navigation9',
                        'navigation10','navigation11','navigation12',
                        'navigation13','navigation14','navigation15',
                        'navigation16','navigation17','navigation18',
                        'navigation19','navigation20','navigation21'
                ),
		'navPosition' => array(
                        'tc' => array(__('Top Center', AIRSLIDER_TEXTDOMAIN), false),
			'tl' => array(__('Top Left', AIRSLIDER_TEXTDOMAIN), true),
			'tr' => array(__('Top Right', AIRSLIDER_TEXTDOMAIN), true),
			'bc' => array(__('Bottom Center', AIRSLIDER_TEXTDOMAIN), true),
			'bl' => array(__('Bottom Left', AIRSLIDER_TEXTDOMAIN), true),
			'br' => array(__('Bottom Right', AIRSLIDER_TEXTDOMAIN), true),
                ),
		'timerBarPosition' => array(
                        'top_pos' => array(__('Top', AIRSLIDER_TEXTDOMAIN), false),
			'bottom_pos' => array(__('Bottom', AIRSLIDER_TEXTDOMAIN), true),
                ),
                'loader' => array(
                        'loader1','loader2','loader3', 'loader4',
                        'loader5','loader6','loader7', 'loader8',
                        'loader9','loader10','loader11', 'loader12',
                        'loader13','loader14','loader15', 'loader16',
                        'loader17','loader18',
                ),
	);
	?>
    <div class="ad-s-setting-content">
        <div class="air-slider-settings-list">
            <table class="air-slider-setting-table">
                <tbody>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab air-is-active" data-slider-tab="#air-slider-info">
                                <h4 class="ad-s-setting-head"><?php _e('Slider Info', AIRSLIDER_TEXTDOMAIN); ?></h4>
                                <div class="air-slider-settings-wrapper">
                                    <!-- Slider information Start -->
                                    <table class="air-table air-slider-setting-block" id="air-slider-info" style="display: table;">
                                        <tbody>
                                            <tr>
                                                <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-info" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                            </tr>
                                            <tr>
                                                <td class="air-name"><?php _e('Slider Name', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                <td class="air-content">
                                                    <input type="text" id="air-slider-name" placeholder="<?php _e('Slider Name', AIRSLIDER_TEXTDOMAIN); ?>" value="<?php echo ($edit) ? $slider->name : ''; ?>" />
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="air-name"><?php _e('Alias', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                <td class="air-content"><span id="air-slider-alias"><?php echo ($edit) ? $slider->alias : ''; ?></span></td>
                                            </tr>
                                            <tr>
                                                <td class="air-name"><?php _e('Shortcode', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                <td class="air-content" id="air-slider-shortcode"><?php echo ($edit) ? '[airslider alias="' . $slider->alias . '"]' : ''; ?></td>
                                            </tr>
                                            <tr>
                                                <td class="air-name"><?php _e('PHP Function', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                <td class="air-content" id="air-slider-php-function"><?php echo ($edit) ? 'if(function_exists("airslider")) airslider("' . $slider->alias . '");' : ''; ?></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <!-- Slider information End -->
                        
                                </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-general">
                                <h4 class="ad-s-setting-head"><?php _e('Layout', AIRSLIDER_TEXTDOMAIN); ?></h4>
                                <div class="air-slider-settings-wrapper">
                                <div class="air-slider-settings-wrapper">
                                    <!-- Slider information Start -->
										<table class="air-table air-slider-setting-block" id="air-slider-general">
                                            <tbody>
                                                <tr>
                                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-general" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Layout', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <select id="air-slider-layout">
                                                            <?php
                                                            foreach ($slider_select_options['layout'] as $key => $value) {
                                                                echo '<option value="' . $key . '"';
                                                                if ((!$edit && $value[1]) || ($edit && isset($slider_option->layout) && $slider_option->layout == $key)) {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $value[0] . '</option>';
                                                            }
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('Modify the layout type of the slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Responsive', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <select id="air-slider-responsive">
                                                            <?php
                                                            foreach ($slider_select_options['boolean'] as $key => $value) {
                                                                echo '<option value="' . $key . '"';
                                                                if ((!$edit && $value[1]) || ($edit && isset($slider_option->responsive) && $slider_option->responsive == $key)) {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $value[0] . '</option>';
                                                            }
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('The slider will be adapted to the screen size.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Width', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <input id="air-slider-startWidth" type="text" value="<?php echo ($edit && isset($slider_option->startWidth) ? $slider_option->startWidth : '1170') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('The content initial width of the slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Height', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <input id="air-slider-startHeight" type="text" value="<?php echo ($edit && isset($slider_option->startHeight) ? $slider_option->startHeight : '500') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('The content initial height of the slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Automatic Slide', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <select id="air-slider-automaticSlide">
                                                            <?php
                                                            foreach ($slider_select_options['boolean'] as $key => $value) {
                                                                echo '<option value="' . $key . '"';
                                                                if ((!$edit && $value[1]) || ($edit && isset($slider_option->automaticSlide) && $slider_option->automaticSlide == $key)) {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $value[0] . '</option>';
                                                            }
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('The slides loop is automatic.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Background Color', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content"> 
                                                        <label><input type="radio" value="0" name="air-slider-background-type-color" <?php echo (!$edit || ($edit && isset($slider_option->background_type_color) && $slider_option->background_type_color == 'transparent')) ? 'checked="checked"' : '' ?>  /><?php _e('Transparent', AIRSLIDER_TEXTDOMAIN); ?></label>&nbsp;
                                                        <input type="radio" value="1" name="air-slider-background-type-color" <?php echo ($edit && isset($slider_option->background_type_color) && $slider_option->background_type_color != '' && $slider_option->background_type_color != 'transparent') ? 'checked="checked"' : '' ?>  /><input class="air-slider-background-type-color-picker-input air-button air-is-default" type="text" value="<?php echo ($edit && isset($slider_option->background_type_color) && $slider_option->background_type_color != '' && $slider_option->background_type_color != 'transparent') ? $slider_option->background_type_color : 'rgb(255,255,255)' ?>" />
                                                        <input type="text" class="air-slider-background-opacity air-background-opacity" value="<?php echo ($edit && isset($slider_option->background_type_color) && $slider_option->background_type_color != '' && $slider_option->background_type_color != 'transparent') ? $slider_option->background_opacity : '100' ?>" />%
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('The background of slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr class="air-shadow-block">
                                                    <td class="air-name"><?php _e('Shadow', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content air-default-option-td">
                                                        <label><input type="radio" value="0" name="air-slide-shadow" <?php echo (!$edit || (isset($slider_option->showShadowBar) && $slider_option->showShadowBar == '0')) ? 'checked="checked"' : ''; ?> /><?php _e('None', AIRSLIDER_TEXTDOMAIN); ?></label>&nbsp;
                                                        <label><input type="radio" value="1" name="air-slide-shadow" <?php echo ($edit && isset($slider_option->showShadowBar) && $slider_option->showShadowBar == '1') ? 'checked="checked"' : ''; ?> /><input class="air-slider-default_shadow air-button air-is-default" type="button" value="<?php _e('Select Default Shadow', AIRSLIDER_TEXTDOMAIN); ?>" data-shadow-class="<?php echo ($edit && isset($slider_option->showShadowBar) && $slider_option->showShadowBar == '1') ? $slider_option->shadowClass : 'shadow1'; ?>" /></label>
                                                        <?php
                                                        $shadow_path = plugins_url() . '/airslider/images/shadow/';
                                                        ?>
                                                        <div class="air-default-option-wrapper air-shadow-list-wrapper">
                                                            <table cellspacing="0" class="air-default-option-list air-shadow-list">
                                                                <?php
                                                                $total_shadow = count($slider_select_options['shadow']);
                                                                if ($total_shadow > 0) {
                                                                    foreach ($slider_select_options['shadow'] as $shadow_val) {
                                                                        echo '<tr>';
                                                                        echo '<td class="';
                                                                        if ((!$edit && strtolower($shadow_val) == 'shadow1') || ($edit && isset($slider_option->shadowClass) && $slider_option->shadowClass == strtolower($shadow_val)) || ($edit && isset($slider_option->shadowClass) && trim($slider_option->shadowClass) == '' && strtolower($shadow_val) == 'shadow1')) {
                                                                            echo ' active';
                                                                        }
                                                                        echo '"><img data-shadow-class="' . strtolower($shadow_val) . '" src="' . $shadow_path . strtolower($shadow_val) . '.png" /></td>';
                                                                        echo '</tr>';
                                                                    }
                                                                }
                                                                ?>
                                                            </table>
                                                        </div>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('Choose to display shadow.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class="air-name"><?php _e('Pause on Hover', AIRSLIDER_TEXTDOMAIN); ?></td>
                                                    <td class="air-content">
                                                        <select id="air-slider-pauseOnHover">
                                                            <?php
                                                            foreach ($slider_select_options['boolean'] as $key => $value) {
                                                                echo '<option value="' . $key . '"';
                                                                if ((!$edit && $value[1]) || ($edit && isset($slider_option->pauseOnHover) && $slider_option->pauseOnHover == $key)) {
                                                                    echo ' selected';
                                                                }
                                                                echo '>' . $value[0] . '</option>';
                                                            }
                                                            ?>
                                                        </select>
                                                    </td>
                                                    <td class="air-description">
                                                        <?php _e('Pause the current slide when hovered.', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </td>
                                                </tr>
                                            </tbody>
                                    </table>

                                    <!-- Slider information End -->
                        
                                </div>
                                </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-loader">
                         <h4 class="ad-s-setting-head"><?php _e('Loader', AIRSLIDER_TEXTDOMAIN); ?></h4>
                            <div class="air-slider-settings-wrapper">
                            <!-- Slider Loader info Start -->
                            <table class="air-table air-slider-setting-block" id="air-slider-loader">
                                <tbody>
                                    <tr>
                                        <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-loader" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                    </tr>
                                    <tr class="air-loader-block">
                                        <td class="air-name"><?php _e('Upload Loader Image', AIRSLIDER_TEXTDOMAIN); ?></td>
                                        <td class="air-content air-default-option-td">
                                            <label><input type="radio" value="0" name="air-slide-loader-image" <?php echo (!$edit || (isset($slider_option->loader_type) && $slider_option->loader_type == 'default')) ? 'checked="checked"' : '' ?> /><input class="air-slider-default_loader air-button air-is-default" type="button" value="<?php _e('Select Default Loader', AIRSLIDER_TEXTDOMAIN); ?>" data-loader-class="<?php echo ($edit && isset($slider_option->loaderClass) && $slider_option->loaderClass != '') ? $slider_option->loaderClass : 'loader1' ?>" /></label>&nbsp;
                                            <?php
                                            $loader_path = plugins_url() . '/airslider/images/loaders/';
                                            if ($edit && isset($slider_option->loader_type) && $slider_option->loader_type != '' && $slider_option->loader_type != 'default') {
                                                ?>
                                                <label><input type="radio" value="1" name="air-slide-loader-image" /><input class="air-slider-loader-type-image-upload-button air-button air-is-default" type="button" value="<?php _e('Upload New Loader', AIRSLIDER_TEXTDOMAIN); ?>" data-src="<?php echo $slider_option->loader_image ?>" data-width="<?php echo $slider_option->loader_image_width ?>" data-height="<?php echo $slider_option->loader_image_height ?>" /></label>
                                                <?php
                                            } else {
                                                ?>
                                                <label><input type="radio" value="1" name="air-slide-loader-image" /><input class="air-slider-loader-type-image-upload-button air-button air-is-default" type="button" value="<?php _e('Upload New Loader', AIRSLIDER_TEXTDOMAIN); ?>" /></label>    
                                                <?php
                                            }
                                            ?>
                                            <div class="air-default-option-wrapper air-loader-list-wrapper">
                                                <table cellspacing="0" class="air-default-option-list air-loader-list">
                                            <?php
                                            $loader_cnt = 0;
                                            $total_loaders = count($slider_select_options['loader']);
                                            if ($total_loaders > 0) {
                                                foreach ($slider_select_options['loader'] as $loader_val) {
                                                    if (($loader_cnt == 0 || $loader_cnt % 2 == 0) && $loader_cnt != 1) {
                                                        if ($loader_cnt != 0) {
                                                            echo '</tr>';
                                                        }
                                                        echo '<tr>';
                                                    }
                                                    $loader_cnt++;
                                                    echo '<td class="';
                                                    if ((!$edit && strtolower($loader_val) == 'loader1') || ($edit && isset($slider_option->loaderClass) && $slider_option->loaderClass == strtolower($loader_val))) {
                                                        echo ' active';
                                                    }
                                                    if ($total_loaders == $loader_cnt && $loader_cnt % 2 != 0) {
                                                        echo ' border-right';
                                                    }
                                                    echo '"><img data-loader-class="' . strtolower($loader_val) . '" src="' . $loader_path . strtolower($loader_val) . '.gif" /></td>';
                
                                                    if ($total_loaders == $loader_cnt) {
                                                        echo '</tr>';
                                                    }
                                                }
                                            }
                                            ?>
                                                </table>
                                            </div>
                                        </td>
                                        <td class="air-description">
                <?php _e('The loader of the slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <!-- Slider Loader info End -->
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-controls">
						
						<h4 class="ad-s-setting-head"><?php _e('Controls', AIRSLIDER_TEXTDOMAIN); ?></h4>
                        <div class="air-slider-settings-wrapper">
                        <!-- Slider Controls info Start -->
                        <table class="air-table air-slider-setting-block" id="air-slider-controls"> 
                            <tbody>
                                <tr>
                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-controls" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('Show Controls', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-showControls">
            <?php
            foreach ($slider_select_options['boolean'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $value[1]) || ($edit && isset($slider_option->showControls) && $slider_option->showControls == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Show the previous and next arrows.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr class="air-controls-block" <?php echo (!$edit || ($edit && isset($slider_option->showControls) && $slider_option->showControls == '1')) ? 'style="display:table-row;"' : 'style="display:none;"' ?>>
                                    <td class="air-name"><?php _e('Select Controls', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content air-default-option-td">
                                        <input class="air-slider-default-controls air-button air-is-default" type="button" value="<?php _e('Select Default Controls', AIRSLIDER_TEXTDOMAIN); ?>" data-control-class="<?php echo (!$edit) ? 'control1' : trim($slider_option->controlsClass); ?>" />
            <?php
            $controls_path = plugins_url() . '/airslider/images/controls/';
            ?>
                                        <div class="air-default-option-wrapper air-control-list-wrapper">
                                            <table cellspacing="0" class="air-default-option-list air-control-list">
                                        <?php
                                        $controls_cnt = 0;
                                        $total_controls = count($slider_select_options['controls']);
                                        if ($total_controls > 0) {
                                            foreach ($slider_select_options['controls'] as $control_val) {
            
                                                if (($controls_cnt == 0 || $controls_cnt % 3 == 0) && $controls_cnt != 1) {
                                                    if ($controls_cnt != 0) {
                                                        echo '</tr>';
                                                    }
                                                    echo '<tr>';
                                                }
                                                $controls_cnt++;
                                                echo '<td class="';
                                                if ((!$edit && strtolower($control_val) == 'control1') || ($edit && isset($slider_option->controlsClass) && $slider_option->controlsClass == strtolower($control_val))) {
                                                    echo ' active';
                                                }
                                                if ($total_controls == $controls_cnt && $controls_cnt % 3 != 0) {
                                                    echo ' border-right';
                                                }
                                                echo '"><img data-control-class="' . strtolower($control_val) . '" src="' . $controls_path . strtolower($control_val) . '.png" /></td>';
            
                                                if ($total_controls == $controls_cnt) {
                                                    echo '</tr>';
                                                }
                                            }
                                        }
                                        ?>
                                            </table>
                                        </div>
                                    </td>
                                    <td class="air-description">
            <?php _e('Select Previous and Next control to display on slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('Enable Swipe and Drag', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-enableSwipe">
            <?php
            foreach ($slider_select_options['boolean'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $value[1]) || ($edit && isset($slider_option->enableSwipe) && $slider_option->enableSwipe == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Enable swipe left, swipe right, drag left, drag right commands.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Slider Controls info End -->
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-navigation">
						<h4 class="ad-s-setting-head"><?php _e('Navigation', AIRSLIDER_TEXTDOMAIN); ?></h4>
                        <div class="air-slider-settings-wrapper">
                        <!-- Slider Navigation info Start -->
                        <table class="air-table air-slider-setting-block" id="air-slider-navigation">
                            <tbody>
                                <tr>
                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-navigation" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('Show Navigation', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-showNavigation">
            <?php
            foreach ($slider_select_options['boolean'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $value[1]) || ($edit && isset($slider_option->showNavigation) && $slider_option->showNavigation == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Show the links buttons to change slide.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr class="air-navigation-block" <?php echo (!$edit || ($edit && isset($slider_option->showNavigation) && $slider_option->showNavigation == '1')) ? 'style="display:table-row;"' : 'style="display:none;"' ?>>
                                    <td class="air-name"><?php _e('Select Navigation', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content air-default-option-td">
                                        <input class="air-slider-default-navigation air-button air-is-default" type="button" value="<?php _e('Select Default Navigation', AIRSLIDER_TEXTDOMAIN); ?>" data-navigation-class="<?php echo (!$edit) ? 'navigation1' : trim($slider_option->navigationClass) ?>" />
            <?php
            $navigation_path = plugins_url() . '/airslider/images/navigation/';
            ?>
                                        <div class="air-default-option-wrapper air-navigation-list-wrapper">
                                            <table cellspacing="0" class="air-default-option-list air-navigation-list">
                                        <?php
                                        $navigation_cnt = 0;
                                        $total_navigation = count($slider_select_options['navigation']);
                                        if ($total_navigation > 0) {
                                            foreach ($slider_select_options['navigation'] as $navigation_val) {
            
                                                if (($navigation_cnt == 0 || $navigation_cnt % 5 == 0) && $navigation_cnt != 1) {
                                                    if ($navigation_cnt != 0) {
                                                        echo '</tr>';
                                                    }
                                                    echo '<tr>';
                                                }
                                                $navigation_cnt++;
                                                echo '<td class="';
                                                if ((!$edit && strtolower($navigation_val) == 'navigation1') || ($edit && isset($slider_option->navigationClass) && $slider_option->navigationClass == strtolower($navigation_val))) {
                                                    echo ' active';
                                                }
                                                if ($total_navigation == $navigation_cnt && $navigation_cnt % 5 != 0) {
                                                    echo ' border-right';
                                                }
                                                echo '"><img data-navigation-class="' . strtolower($navigation_val) . '" src="' . $navigation_path . strtolower($navigation_val) . '.png" /></td>';
            
                                                if ($total_navigation == $navigation_cnt) {
                                                    echo '</tr>';
                                                }
                                            }
                                        }
                                        ?>
                                            </table>
                                        </div>
                                    </td>
                                    <td class="air-description">
            <?php _e('Select navigation to display on slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr class="air-navigation-block" <?php echo (!$edit || ($edit && isset($slider_option->showNavigation) && $slider_option->showNavigation == '1')) ? 'style="display:table-row;"' : 'style="display:none;"' ?>>
                                    <td class="air-name"><?php _e('Navigation Position', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-navigationPosition">
            <?php
            foreach ($slider_select_options['navPosition'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $key == 'bc') || ($edit && isset($slider_option->navigationPosition) && $slider_option->navigationPosition == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Show navigation position on slider.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Slider Navigation info End -->
                        </div>
                        
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-timer-bar">
						
						<h4 class="ad-s-setting-head"><?php _e('Timer Bar', AIRSLIDER_TEXTDOMAIN); ?></h4>
                        <!-- Slider Timer bar info Start -->
                        <div class="air-slider-settings-wrapper">
                        <table class="air-table air-slider-setting-block" id="air-slider-timer-bar">
                            <tbody>
                                <tr>
                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-timer-bar" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('Show Timer Bar', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-showTimerBar">
            <?php
            foreach ($slider_select_options['boolean'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $value[1]) || ($edit && isset($slider_option->showTimerBar) && $slider_option->showTimerBar == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Draw the timer bar during the slide execution.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr class="air-progress-bar-block" <?php echo (!$edit || ($edit && isset($slider_option->showTimerBar) && $slider_option->showTimerBar == '1')) ? 'style="display:table-row;"' : 'style="display:none;"' ?>>
                                    <td class="air-name"><?php _e('Timer Bar Position', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <select id="air-slider-timerBarPosition">
            <?php
            foreach ($slider_select_options['timerBarPosition'] as $key => $value) {
                echo '<option value="' . $key . '"';
                if ((!$edit && $key == 'top_pos') || ($edit && isset($slider_option->timerBarPosition) && $slider_option->timerBarPosition == $key)) {
                    echo ' selected';
                }
                echo '>' . $value[0] . '</option>';
            }
            ?>
                                        </select>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set the timer bar position.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Slider Timer bar info End -->
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-youtube_api_key">
						<h4 class="ad-s-setting-head"><?php _e('Youtube API Key', AIRSLIDER_TEXTDOMAIN); ?></h4>
                        <div class="air-slider-settings-wrapper">
                        <!-- Slider Youtube API Key info Start -->
                        <table class="air-table air-slider-setting-block" id="air-slider-youtube_api_key">
                            <tbody>
                                <tr>
                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-youtube_api_key" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('API Key', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <input type="text" class="air-youtube-api-key" value="<?php echo ($edit && isset($slider_option->youtube_api_key)) ? $slider_option->youtube_api_key : '';  ?>" />
                                    </td>
                                    <td class="air-description">
                                    <?php _e('Enter Youtube api key for get Youtube video information.<br>', AIRSLIDER_TEXTDOMAIN); ?>
                                        <a href="http://www.codeflavors.com/documentation/basic-tutorials/how-to-set-youtube-api-access/" target="_blank"><?php _e('Click here ', AIRSLIDER_TEXTDOMAIN); ?></a>
                                        <?php _e('to view how to create API key.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Slider Youtube API Key info End -->
                        </div>
                        </td>
                    </tr>
                    <tr>
                        <td class="air-button air-is-navy air-slider-setting-tab" data-slider-tab="#air-slider-callbacks">
						<h4 class="ad-s-setting-head"><?php _e('Callbacks', AIRSLIDER_TEXTDOMAIN); ?></h4>
                        <div class="air-slider-settings-wrapper">
                        <!-- Slider Callbacks info Start -->
                        <table class="air-table air-slider-setting-block" id="air-slider-callbacks">
                            <tbody>
                                <tr>
                                    <td class="air-no-border" colspan="3"><a class="air-button air-is-primary air-reset-slider-settings" data-reset-block="air-slider-callbacks" href="javascript:void(0);"><?php _e('Reset Settings', AIRSLIDER_TEXTDOMAIN); ?></a></td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('beforeStart', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <textarea cols="10" rows="10" class="air-slider-callback-beforeStart"><?php echo ($edit && isset($slider_option->beforeStart) && trim($slider_option->beforeStart)!='')?stripslashes(trim($slider_option->beforeStart)):''; ?></textarea>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set callback for beforeStart : function() {}.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('beforeSetResponsive', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <textarea cols="10" rows="10" class="air-slider-callback-beforeSetResponsive"><?php echo ($edit && isset($slider_option->beforeSetResponsive) && trim($slider_option->beforeSetResponsive)!='')?stripslashes(trim($slider_option->beforeSetResponsive)):''; ?></textarea>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set callback for beforeSetResponsive : function() {}.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('beforeSlideStart', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <textarea cols="10" rows="10" class="air-slider-callback-beforeSlideStart"><?php echo ($edit && isset($slider_option->beforeSlideStart) && trim($slider_option->beforeSlideStart)!='')?stripslashes(trim($slider_option->beforeSlideStart)):''; ?></textarea>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set callback for beforeSlideStart : function() {}.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('beforePause', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <textarea cols="10" rows="10" class="air-slider-callback-beforePause"><?php echo ($edit && isset($slider_option->beforePause) && trim($slider_option->beforePause)!='')?stripslashes(trim($slider_option->beforePause)):''; ?></textarea>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set callback for beforePause : function() {}.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="air-name"><?php _e('beforeResume', AIRSLIDER_TEXTDOMAIN); ?></td>
                                    <td class="air-content">
                                        <textarea cols="10" rows="10" class="air-slider-callback-beforeResume"><?php echo ($edit && isset($slider_option->beforeResume) && trim($slider_option->beforeResume)!='')?stripslashes(trim($slider_option->beforeResume)):''; ?></textarea>
                                    </td>
                                    <td class="air-description">
            <?php _e('Set callback for beforeResume : function() {}.', AIRSLIDER_TEXTDOMAIN); ?>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <!-- Slider Callbacks info End -->
                        </div>
                        </td>
                    </tr>
                </tbody>    
            </table>
        </div>
        <br clear="all" />
    </div>
    <input class="air-button air-is-success air-save-settings" data-id="<?php echo $id; ?>" type="button" value="<?php _e('Save Settings', AIRSLIDER_TEXTDOMAIN); ?>" />
    <br clear="all" />
</div>