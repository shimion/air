<div id="air-slides">
	<div class="air-slide-tabs air-tabs air-tabs-border">
		<ul class="air-sortable air-slide-tab">
			<?php
			if($edit) {
				$j = 0;
				$slides_num = count($slides);
				foreach($slides as $slide) {
                                    $params = maybe_unserialize( $slide->params );
					if($j == $slides_num - 1) {
						echo '<li class="ui-state-default active">';
                                                echo '<a class="air-button air-is-navy air-is-active">';
					}
					else {
						echo '<li class="ui-state-default">';
                                                echo '<a class="air-button air-is-navy">';
					}
					echo  __('Slide', AIRSLIDER_TEXTDOMAIN) . ' <span class="air-slide-index">' . (intval(trim($slide->position)) + 1) . '</span>';
					echo '<span class="dashicons dashicons-dismiss air-close"></span></a>';
					echo '</li>';
					
					$j++;
				}
			}
			?>
			<li class="ui-state-default ui-state-disabled"><a class="air-add-new air-button air-is-inverse"><?php _e('Add New Slide', AIRSLIDER_TEXTDOMAIN); ?></a></li>
		</ul>
		
		<div class="air-slides-list">
			<?php
				if($edit) {
					foreach($slides as $slide) {
						echo '<div class="air-slide">';
						airsliderPrintSlide($slider, $slide, $edit);
						echo '</div>';
					}
				}
			?>
		</div>		
		<div class="air-void-slide"><?php airsliderPrintSlide($slider, false, $edit); ?></div>
		
		<div style="clear: both"></div>
	</div>
</div>

<?php
/**
 * Prints a slide. If the ID is not false, prints the values from MYSQL database, else prints a slide with default values.
 * 
 * @param array $slider Contains the slider information
 * 
 * @param array $slide Contains the slide information
 * 
 * @param boolean $edit variable because the elements.php file has to see it
*/
function airsliderPrintSlide($slider, $slide, $edit) {
if($edit)
    $void = !$slide ? true : false;	
    $params = array();
    $slide_id = 0;
    if($slide){
        $params = maybe_unserialize( $slide->params );
        $slide_id = $slide->id;
    }

    //Default transition
    $animations = array(
            'fade' => array(__('Fade', AIRSLIDER_TEXTDOMAIN), true),
            'fadeLeft' => array(__('Fade Left', AIRSLIDER_TEXTDOMAIN), false),
            'fadeRight' => array(__('Fade Right', AIRSLIDER_TEXTDOMAIN), false),
            'slideLeft' => array(__('Slide Left', AIRSLIDER_TEXTDOMAIN), false),
            'slideRight' => array(__('Slide Right', AIRSLIDER_TEXTDOMAIN), false),
            'slideUp' => array(__('Slide Up', AIRSLIDER_TEXTDOMAIN), false),
            'slideDown' => array(__('Slide Down', AIRSLIDER_TEXTDOMAIN), false),
    );
    ?>
    <?php
    /*
     * Slide block start
     */
    ?>
    <h4 class="ad-s-setting-head"><?php _e('Slide General Options', AIRSLIDER_TEXTDOMAIN); ?><a class="air-right air-button air-is-primary air-duplicate-slide"><span class="dashicons dashicons-images-alt mr5"></span><?php _e('Duplicate Slide', AIRSLIDER_TEXTDOMAIN); ?></a></h4>
    <div class="ad-s-setting-content">
        <table class="air-slide-settings-list air-table">

            <tbody>
                    <?php
                    if($void): ?>
                    <tr>
                            <td class="air-name"><?php _e('Background Image', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                    <label><input type="radio" value="0" name="air-slide-background-type-image" checked /> <?php _e('None', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                    <label><input type="radio" value="1" name="air-slide-background-type-image" /> <input class="air-slide-background-type-image-upload-button air-button air-is-default" type="button" value="<?php _e('Select Image', AIRSLIDER_TEXTDOMAIN); ?>" /></label>
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Color', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                    <label><input type="radio" value="0" name="air-slide-background-type-color" checked /> <?php _e('Transparent', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                    <input type="radio" value="1" name="air-slide-background-type-color" /> <input class="air-slide-background-type-color-picker-input air-button air-is-default" type="text" value="rgb(255,255,255)" />
                                    <input type="text" class="air-slide-background-opacity air-background-opacity" value="100" />%
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Position-x', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="0" class="air-slide-background-propriety-position-x" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Position-y', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="0" class="air-slide-background-propriety-position-y" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Repeat', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                    <label><input type="radio" value="1" name="air-slide-background-repeat" checked /> <?php _e('Repeat', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                    <label><input type="radio" value="0" name="air-slide-background-repeat" /> <?php _e('No Repeat', AIRSLIDER_TEXTDOMAIN); ?></label>
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Size', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="auto" class="air-slide-background-propriety-size" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <?php else: ?>
                    <tr>
                            <td class="air-name"><?php _e('Background Image', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                        <?php if(!isset($params['background_type_image']) || ((isset($params['background_type_image']) && ($params['background_type_image'] == 'none' || $params['background_type_image'] == 'undefined')))){ ?>
                                            <label><input type="radio" value="0" name="air-slide-background-type-image" checked /> <?php _e('None', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <label><input type="radio" value="1" name="air-slide-background-type-image" /> <input class="air-slide-background-type-image-upload-button air-button air-is-default" type="button" value="<?php _e('Select Image', AIRSLIDER_TEXTDOMAIN); ?>" /></label>
                                        <?php } else if(isset($params['background_type_image'])){ ?>
                                            <label><input type="radio" value="0" name="air-slide-background-type-image" /> <?php _e('None', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <label><input type="radio" value="1" name="air-slide-background-type-image" checked /> <input class="air-slide-background-type-image-upload-button air-button air-is-default" type="button" value="<?php _e('Select Image', AIRSLIDER_TEXTDOMAIN); ?>" /></label>
                                        <?php } ?>
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Color', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                        <?php if(!isset($params['background_type_color']) || (isset($params['background_type_color']) && $params['background_type_color'] == 'transparent')): ?>
                                            <label><input type="radio" value="0" name="air-slide-background-type-color" checked /> <?php _e('Transparent', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <input type="radio" value="1" name="air-slide-background-type-color" /> <input class="air-slide-background-type-color-picker-input air-button air-is-default" type="text" value="rgb(255, 255, 255)" />
                                            <input type="text" class="air-slide-background-opacity air-background-opacity" value="100" />%
                                        <?php else: ?>
                                            <label><input type="radio" value="0" name="air-slide-background-type-color" /> <?php _e('Transparent', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <input type="radio" value="1" name="air-slide-background-type-color" checked /> <input class="air-slide-background-type-color-picker-input air-button air-is-default" type="text" value="<?php echo isset($params['background_type_color'])?$params['background_type_color']:'rgb(255, 255, 255)'; ?>" />
                                            <input type="text" class="air-slide-background-opacity air-background-opacity" value="<?php echo isset($params['background_opacity'])?$params['background_opacity']:'100'; ?>" />%
                                        <?php endif; ?>	
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Position-x', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="<?php echo (isset($params['background_propriety_position_x']))?$params['background_propriety_position_x']:'0'; ?>" class="air-slide-background-propriety-position-x" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Position-y', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="<?php echo (isset($params['background_propriety_position_y']))?$params['background_propriety_position_y']:'0'; ?>" class="air-slide-background-propriety-position-y" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Repeat', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <form>
                                        <?php if(!isset($params['background_repeat']) || (isset($params['background_repeat']) && $params['background_repeat'] == 'repeat')): ?>
                                            <label><input type="radio" value="1" name="air-slide-background-repeat" checked /> <?php _e('Repeat', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <label><input type="radio" value="0" name="air-slide-background-repeat" /> <?php _e('No Repeat', AIRSLIDER_TEXTDOMAIN); ?></label>
                                        <?php else: ?>
                                            <label><input type="radio" value="1" name="air-slide-background-repeat" /> <?php _e('Repeat', AIRSLIDER_TEXTDOMAIN); ?></label> &nbsp;
                                            <label><input type="radio" value="0" name="air-slide-background-repeat" checked /> <?php _e('No Repeat', AIRSLIDER_TEXTDOMAIN); ?></label>
                                        <?php endif; ?>
                                </form>
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Background Size', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input type="text" value="<?php echo isset($params['background_repeat'])?$params['background_propriety_size']:'auto'; ?>" class="air-slide-background-propriety-size" />
                            </td>
                            <td class="air-description">
                                <?php _e('The background of the slide and its properties.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <?php endif; ?>
                    <tr>
                            <td class="air-name"><?php _e('In Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <select class="air-slide-data-in">
                                            <?php
                                            foreach($animations as $key => $value) {
                                                    echo '<option value="' . $key . '"';
                                                    if(($void && $value[1]) || (!$void && isset($params['data_in']) && $params['data_in'] == $key)) {
                                                            echo ' selected';
                                                    }
                                                    echo '>' . $value[0] . '</option>';
                                            }
                                            ?>
                                    </select>
                            </td>
                            <td class="air-description">
                                    <?php _e('The in animation of the slide.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Out Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <select class="air-slide-data-out">
                                            <?php
                                            foreach($animations as $key => $value) {
                                                    echo '<option value="' . $key . '"';
                                                    if(($void && $value[1]) || (!$void && isset($params['data_out']) && $params['data_out'] == $key)) {
                                                            echo ' selected';
                                                    }
                                                    echo '>' . $value[0] . '</option>';
                                            }
                                            ?>
                                    </select>
                            </td>
                            <td class="air-description">
                                    <?php _e('The out animation of the slide.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Time', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <?php
                                    if($void) echo '<input class="air-slide-data-time" type="text" value="3000" onkeypress="return isNumberKey(event);" />';
                                    else echo '<input class="air-slide-data-time" type="text" value="' . (isset($params['data_time'])?$params['data_time']:'3000') .'" onkeypress="return isNumberKey(event);" />';
                                    ?>
                                    <?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                    <?php _e('The time that the slide will remain on the screen. Default:3000ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Ease In', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <?php
                                    if($void) echo '<input class="air-slide-data-easeIn" type="text" value="300" onkeypress="return isNumberKey(event);" />';
                                    else echo '<input class="air-slide-data-easeIn" type="text" value="' . (isset($params['data_easeIn'])?$params['data_easeIn']:'300') .'" onkeypress="return isNumberKey(event);" />';
                                    ?>
                                    <?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                    <?php _e('The time that the slide will take to get in. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Ease Out', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <?php
                                    if($void) echo '<input class="air-slide-data-easeOut" type="text" value="300" onkeypress="return isNumberKey(event);" />';
                                    else echo '<input class="air-slide-data-easeOut" type="text" value="' . (isset($params['data_easeOut'])?$params['data_easeOut']:'300') .'" onkeypress="return isNumberKey(event);" />';
                                    ?>
                                    <?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                    <?php _e('The time that the slide will take to get out. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
                    <tr>
                            <td class="air-name"><?php _e('Custom CSS', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                    <?php
                                    if($void) echo '<textarea class="air-slide-custom-css"></textarea>';
                                    else echo '<textarea class="air-slide-custom-css">' . (isset($params['custom_css'])?stripslashes($params['custom_css']):'') . '</textarea>';
                                    ?>
                            </td>
                            <td class="air-description">
                                    <?php _e('Apply CSS to the slide.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                    </tr>
            </tbody>
    </table>
    </div>
    <?php
    /*
     * Slide block end
     */

    // If the slide is not void, select her elements
    if(!$void) {
            global $wpdb;
            $elements = maybe_unserialize( $slide->layers );
    }
    else {
            $elements = NULL;
    }
    airsliderPrintElements($edit, $slider, $slide);
    ?>
    <input class="air-button air-is-success air-save-slide" data-slide-id="<?php echo $slide_id ?>" type="button" value="<?php _e('Save Slide', AIRSLIDER_TEXTDOMAIN); ?>" />
    <?php
}

?>