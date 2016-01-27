<?php
/**
 * Print Elements slide wise
 * 
 * @param boolean $edit identify that you are in edit mode or not
 * 
 * @param array $slider slider information
 * 
 * @param array $slide slide information
*/
if(!function_exists('airsliderPrintElements'))
{
    function airsliderPrintElements($edit, $slider, $slide) {
    
    //Get slider option
    $slider_option = maybe_unserialize( $slider->slider_option );
    
    //Get all Slides settings by params and elements by layers
    $params = $elements = array();
    $slide_index = 0;
    if($slide){
        $params = maybe_unserialize( $slide->params );
        $slide_index = ($slide->position + 1);
        $elements = maybe_unserialize($slide->layers);
    }
    $aios_ele_time_output = '';
?>
	<div class="air-elements">
		<div
		class="air-slide-editing-area"
		<?php 
                if($edit && $slide): ?>
			<?php
			if(isset($params['background_type_image']) && $params['background_type_image'] != 'none') {
				echo 'data-background-image-src="' . $params['background_type_image'] . '"';
			}
			?>
			style="
			width: <?php echo isset($slider_option->startWidth) ? $slider_option->startWidth : '1170'; ?>px;
			height: <?php echo isset($slider_option->startHeight) ? $slider_option->startHeight:'500'; ?>px;
			background-image: url('<?php echo isset($params['background_type_image']) ? $params['background_type_image']:''; ?>');
			background-color: <?php echo (isset($params['background_type_color']) && isset($params['background_opacity']) && $params['background_type_color'] == 'transparent') ? 'rgb(255, 255, 255)' : airsliderHex2Rgba($params['background_type_color'],trim($params['background_opacity'])); ?>;
                        background-position: <?php if(isset($params['background_propriety_position_x']) && isset($params['background_propriety_position_y'])) { 
                                echo ($params['background_propriety_position_x'] ." ". $params['background_propriety_position_y']);                             
                            } else { 
                                echo '0 0'; } ?>;			
			background-repeat: <?php echo isset($params['background_repeat']) ? $params['background_repeat'] : 'no-repeat'; ?>;
			background-size: <?php echo isset($params['background_propriety_size']) ? $params['background_propriety_size'] : 'auto' ; ?>;
			<?php echo isset($params['custom_css']) ? stripslashes($params['custom_css']) : ''; ?>
			"
		<?php endif; ?>
		>
			<?php
    			if($edit && $elements != NULL) {
                            $ele_cnt = 0;
				foreach($elements as $ele_key=>$element) {
					if(isset($element->link) && $element->link != '') {
                                            $target = (isset($element->link_new_tab) && $element->link_new_tab == 1) ? 'target="_blank"' : '';
						
						$link_output = '<a' . "\n" .
						'class="air-element air-' . ( isset($element->type) ? $element->type : 'text' ) . '-element"' . "\n" .
						'href="' . (isset($element->link) ? stripslashes($element->link) : '')  . '"' . "\n" .
						$target . "\n" .
						'style="' .
						'z-index: ' . (isset($element->z_index) ? ($element->z_index . ';') : '1') . "\n" .
						'top: ' . (isset($element->data_top) ? ($element->data_top . 'px;') : '0') . "\n" .
						'left: ' . (isset($element->data_left) ? ($element->data_left . 'px;') : '0') . "\n" .
						'">' .  "\n";
						
						echo $link_output;
					}
					if(isset($element->type) && $element->type != '') {
                                            switch($element->type) {
                                                case 'text':
                                                    $aios_ele_time_output .= '<tr class="air-ele-list">'.
                                                        '<td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td>'.
                                                        '<td class="air-ele-title"><span class="dashicons dashicons-editor-textcolor"></span><span>'. (isset($element->inner_html) ? stripslashes($element->inner_html) : '').'</span></td>'.
                                                        '<td><input type="text" value="'. (isset($element->data_delay) ? trim($element->data_delay) : '0') .'" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td>'.
                                                        '<td><input type="text" value="'. (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') .'" class="air-easein-ele air-txt-easein" onkeypress="return isNumberKey(event);" /></td>'.
                                                        '<td><input type="text" value="'. (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') .'" class="air-easeout-ele air-txt-easeout" onkeypress="return isNumberKey(event);" /></td>'.
                                                        '<td><input type="number" min="0" value="'. (isset($element->z_index) ? trim($element->z_index) : '1') .'" class="air-z-index-ele air-txt-z-index" onkeypress="return isNumberKey(event);" /></td>'.
                                                        '</tr>';
                                                        ?>
                                                        <div
                                                        style="
                                                        <?php
                                                        if( isset($element->link) && $element->link == '') {
                                                            if(isset($element->z_index)) { 
                                                                echo 'z-index: ' . $element->z_index . ';';
                                                            }
                                                            if(isset($element->data_left)) { 
                                                                echo 'left: ' . $element->data_left . 'px;';
                                                            }
                                                            if(isset($element->data_top)) { 
                                                                echo 'top: ' . $element->data_top . 'px;';
                                                            }
                                                        }
                                                        if(isset($element->custom_css)) { 
                                                            echo stripslashes($element->custom_css);
                                                        }
                                                        ?>
                                                        "
                                                        <?php
                                                        if(isset($element->link) && $element->link == '') {
                                                            echo 'class="air-element air-text-element"';
                                                        }
                                                        ?>
                                                        >
                                                        <?php 
                                                        echo isset($element->inner_html) ? stripslashes($element->inner_html) : ''; ?>
                                                        </div>
                                                        <?php
                                                break;
                                                    case 'video':
                                                        $aios_ele_time_output .= '<tr class="air-ele-list">'.
                                                            '<td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td>'.
                                                            '<td class="air-ele-title"><span class="dashicons dashicons-format-video"></span><span>';
                                                        $video_title = 'Video Element';
                                                        $video_icon = 'youtube_icon';
                                                        $video_preview_img_src = AIR_PLUGIN_URL.'/images/video_sample.jpg';
                                                        if(isset($element->video_type) && $element->video_type=='H')
                                                        {
                                                            $video_title = 'Html5 Video';
                                                            $video_icon = 'html5_icon';
                                                            if(isset($element->video_html5_poster_url) && trim($element->video_html5_poster_url)!=''){
                                                                $video_preview_img_src = trim($element->video_html5_poster_url);
                                                            }
                                                            else
                                                            {
                                                                $video_preview_img_src = AIR_PLUGIN_URL.'/images/html5-video.png';
                                                            }
                                                        }
                                                        else 
                                                        {
                                                            if(isset($element->video_type) && $element->video_type=='Y')
                                                            {
                                                                $video_icon = 'youtube_icon';
                                                            }
                                                            else if(isset($element->video_type) && $element->video_type=='V')
                                                            {
                                                                $video_icon = 'vimeo_icon';
                                                            }
                                                            if(isset($element->video_preview_img_src) && trim($element->video_preview_img_src)!=''){
                                                                $video_preview_img_src = trim($element->video_preview_img_src);
                                                            }
                                                            if(isset($element->video_preview_img_alt) && trim($element->video_preview_img_alt)!='')
                                                            {
                                                                $video_title = trim($element->video_preview_img_alt);
                                                            }
                                                        }

                                                        $aios_ele_time_output .= $video_title;
                                                        $aios_ele_time_output .= '</span></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_delay) ? trim($element->data_delay) : '0') .'" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300').'" class="air-easein-ele air-txt-easein" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300').'" class="air-easeout-ele air-txt-easeout" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="number" min="0" value="'. (isset($element->z_index) ? trim($element->z_index) : '1') .'" class="air-z-index-ele air-txt-z-index" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '</tr>'
                                                            ?>
                                                            <div id="video_block_<?php echo $ele_key; ?>" 
                                                                <?php
                                                                if(isset($element->link) && $element->link == '') {
                                                                    echo 'class="air-element air-video-element air-iframe-element"';
                                                                }
                                                                ?>
                                                                style="<?php
                                                            if(isset($element->link) && $element->link == '') {
                                                                if(isset($element->z_index)) {
                                                                    echo 'z-index: ' . $element->z_index . ';';
                                                                }
                                                                if(isset($element->data_left)) { 
                                                                    echo 'left: ' . $element->data_left . 'px;';
                                                                }
                                                                if(isset($element->data_top)) {
                                                                    echo 'top: ' . $element->data_top . 'px;';
                                                                }
                                                            }
                                                            if(isset($element->custom_css)) { 
                                                                echo stripslashes($element->custom_css);
                                                            }
                                                            ?>">
                                                                <label class="video_block_title"><?php echo $video_title; ?></label>
                                                                                                                                
                                                                <img src="<?php echo $video_preview_img_src; ?>" width="<?php echo isset($element->video_width) ? $element->video_width : '320px'; ?>" height="<?php echo isset($element->video_height) ? $element->video_height : '240px'; ?>"/>  
                                                                <div class="video_block_icon <?php echo $video_icon; ?>"></div>
                                                            </div>
                                                            <?php
                                                    break;
                                                    case 'image':
                                                        $ele_cnt++;
                                                        $aios_ele_time_output .= '<tr class="air-ele-list air-ele-image-list">'.
                                                            '<td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td>'.
                                                            '<td class="air-ele-title"><span class="dashicons dashicons-format-image"></span><span>Image Element '. $ele_cnt .'</span></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_delay) ? trim($element->data_delay) : '0') .'" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_easeIn) ? trim($element->data_easeIn) : '300') .'" class="air-easein-ele air-txt-easein" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="text" value="'. (isset($element->data_easeOut) ? trim($element->data_easeOut) : '300') .'" class="air-easeout-ele air-txt-easeout" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '<td><input type="number" min="0" value="'. (isset($element->z_index) ? trim($element->z_index) : '1') .'" class="air-z-index-ele air-txt-z-index" onkeypress="return isNumberKey(event);" /></td>'.
                                                            '</tr>';
                                                            ?>
                                                            <img
                                                                width="<?php echo isset($element->image_width) ? $element->image_width : '0'; ?>"
                                                                height="<?php echo isset($element->image_height) ? $element->image_height : '0'; ?>"
                                                            src="<?php echo isset($element->image_src) ? $element->image_src : ''; ?>"
                                                            alt="<?php echo isset($element->image_alt) ? $element->image_alt : ''; ?>"
                                                            style="
                                                            <?php
                                                            if(isset($element->link) && $element->link == '') {
                                                                if(isset($element->z_index)) { 
                                                                    echo 'z-index: ' . $element->z_index . ';';
                                                                }
                                                                if(isset($element->data_left)) { 
                                                                    echo 'left: ' . $element->data_left . 'px;';
                                                                }
                                                                if(isset($element->data_top)) {
                                                                    echo 'top: ' . $element->data_top . 'px;';
                                                                }
                                                            }
                                                            if(isset($element->custom_css)) { 
                                                                echo stripslashes($element->custom_css);
                                                            }
                                                            ?>
                                                            "
                                                            <?php
                                                            if(isset($element->link) && $element->link == '') {
                                                                    echo 'class="air-element air-image-element"';
                                                            }
                                                            ?>
                                                            />
                                                            <?php
                                                    break;
                                            }
                                        }
					if(isset($element->link) && $element->link != '') {
						echo '</a>' . "\n";
					}
                                        
				}
			}
			?>
		</div>
		
		<div class="air-elements-actions">
                        <div class="air-left">		
				<a class="air-add-text-element air-button air-is-warning"><?php _e('Add Text', AIRSLIDER_TEXTDOMAIN); ?></a>
				<a class="air-add-image-element air-button air-is-warning"><?php _e('Add Image', AIRSLIDER_TEXTDOMAIN); ?></a>
				<a class="air-add-video-element air-button air-is-warning"><?php _e('Add Video', AIRSLIDER_TEXTDOMAIN); ?></a>
			</div>
                        <div class="air-right">
                            <span title="Element Timing" class="air-ele-time-btn air-button air-is-secondary"><span class="dashicons dashicons-backup"></span></span>
                            <a title="Live Preview" class="air-live-preview air-button air-is-success"><span class="dashicons dashicons-search"></span></a>
                            <a title="Delete Element" class="air-delete-element air-button air-is-danger air-is-disabled"><span class="dashicons dashicons-dismiss"></span></a>
                            <a title="Duplicate Element" class="air-duplicate-element air-button air-is-primary air-is-disabled"><span class="dashicons dashicons-images-alt"></span></a>
                            <a title="Delete All Element" class="air-delete-all-element air-button air-is-danger <?php echo ($slide && $slide->layers!='')?'':'air-is-disabled'; ?>"><span class="dashicons dashicons-trash"></span></a>
			</div>
			<div style="clear: both;"></div>
		</div>
		<div class="air-ele-time" style="display: none;">
                    <span class="air-close-block">X</span>
                    <h4 class="ad-s-setting-head"><?php _e('All Elements Timing', AIRSLIDER_TEXTDOMAIN); ?></h4>
                    <table  cellspacing="0">
                            <thead class="air-ele-list-tilte">
                                <tr>
                                    <th title="Show/Hide Element"><center><span class="dashicons dashicons-visibility"></span></center></th>
                                    <th><center><?php _e('Element List', AIRSLIDER_TEXTDOMAIN); ?></center></th>
                                    <th><center><?php _e('Delay Time', AIRSLIDER_TEXTDOMAIN); ?> <small>(<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>)</small></center></th>
                                    <th><center><?php _e('Ease In', AIRSLIDER_TEXTDOMAIN); ?> <small>(<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>)</small></center></th>
                                    <th><center><?php _e('Ease Out', AIRSLIDER_TEXTDOMAIN); ?> <small>(<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>)</small></center></th>
                                    <th><center><?php _e('Z-index', AIRSLIDER_TEXTDOMAIN); ?></center></th>
                                    </tr>   
                            </thead>
                            <tbody>
                                <?php 
                                if($aios_ele_time_output!='')
                                {
                                    echo $aios_ele_time_output;
                                }
                                else
                                {
                                    ?>
                                <tr class="air-no-record">
                                    <td colspan="6" align="center"><?php _e('No element found.', AIRSLIDER_TEXTDOMAIN); ?></td>
                                </tr>
                                    <?php
                                }
                                ?>
                            </tbody>
                        </table>
                </div>
                <div class="air-elements-list">
			<?php
			if($edit && $elements != NULL) {
				foreach($elements as $ele_key=>$element) {
                                    if(isset($element->type)) {
					switch($element->type) {
						case 'text':
							echo '<div class="air-element-settings air-text-element-settings" style="display: none;">';
							airsliderPrintTextElement($element);
							echo '</div>';
							break;
						case 'image':
							echo '<div class="air-element-settings air-image-element-settings" style="display: none;">';
							airsliderPrintImageElement($element,$ele_key);
							echo '</div>';
							break;
                                                case 'video':
							echo '<div class="air-element-settings air-video-element-settings" style="display: none;">';
							airsliderPrintVideoElement($element,$slide_index,$ele_key);
							echo '</div>';
							break;    
					}
                                    }
				}
			}
			echo '<div class="air-void-element-settings air-void-text-element-settings air-element-settings air-text-element-settings">';
			airsliderPrintTextElement(false);
			echo '</div>';
			echo '<div class="air-void-element-settings air-void-image-element-settings air-element-settings air-image-element-settings">';
			airsliderPrintImageElement(false);
			echo '</div>';
                        echo '<div class="air-void-element-settings air-void-video-element-settings air-element-settings air-video-element-settings">';
			airsliderPrintVideoElement(false);
			echo '</div>';
			?>
		</div>

	</div>
<?php
}
}
/**
 * Print Text Element
 *  
 * @param array $element text element information
*/
if(!function_exists('airsliderPrintTextElement'))
{
    function airsliderPrintTextElement($element) {
	$void = !$element ? true : false;
	
        //Default Transition
	$animations = array(
		'slideDown' => array(__('Slide Down', AIRSLIDER_TEXTDOMAIN), false),
		'slideUp' => array(__('Slide Up', AIRSLIDER_TEXTDOMAIN), false),
		'slideLeft' => array(__('Slide Left', AIRSLIDER_TEXTDOMAIN), false),
		'slideRight' => array(__('Slide Right', AIRSLIDER_TEXTDOMAIN), false),
		'fade' => array(__('Fade', AIRSLIDER_TEXTDOMAIN), true),
		'fadeDown' => array(__('Fade Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeUp' => array(__('Fade Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeLeft' => array(__('Fade Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeRight' => array(__('Fade Right', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallDown' => array(__('Fade Small Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallUp' => array(__('Fade Small Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallLeft' => array(__('Fade Small Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallRight' => array(__('Fade Small Right', AIRSLIDER_TEXTDOMAIN), false),
	);
	
	?>
        <div class="air-element-pro-tab air-tabs">
            <ul class="air-element-pro-tab-ul">
                <li class="">
                    <a class="air-button air-is-navy air-is-active" href="javascript:void(0);" data-href=".air-ele-txt-general-parameter"><?php _e('General Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-txt-animation-parameter"><?php _e('Animation Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-txt-advanced-parameter"><?php _e('Advanced Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
            </ul>
            <div class="air-element-type-block air-ele-txt-general-parameter" style="display: block;">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
                        <tr>
                            <td class="air-name"><?php _e('Text', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <textarea class="air-element-inner-html"><?php echo ($void)? __('Text element', AIRSLIDER_TEXTDOMAIN) : (isset($element->inner_html) ? stripslashes($element->inner_html) : '') ?></textarea>
                            </td>
                            <td class="air-description">
                                <?php _e('Write the text or the HTML.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Left', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-left" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_left) ? $element->data_left : '0') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Left distance in px from the start width.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Top', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-top" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_top) ? $element->data_top : '0') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Top distance in px from the start height.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Z - index', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-z-index" type="number" min="0" value="<?php echo ($void) ? '1' : (isset($element->z_index) ? $element->z_index : '1'); ?>" onkeypress="return isNumberKey(event);" />
                            </td>
                            <td class="air-description">
                                <?php _e('An element with an high z-index will cover an element with a lower z-index if they overlap.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-txt-animation-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
                        <tr>
                            <td class="air-name"><?php _e('Delay', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-delay" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_delay) ? $element->data_delay : '0') ; ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element wait before the entrance. Default:0ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Time', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-time" type="text" value="<?php echo ($void) ? 'all' : (isset($element->data_time) ? $element->data_time : 'all'); ?>" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element be displayed during the slide execution. Write "all" to set the entire time. Default:all', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('In Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-in">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_in) && $element->data_in == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                            </td>
                            <td class="air-description">
                                    <?php _e('The in animation of the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Out Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-out">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_out) && $element->data_out == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                                <br />
                                <label><input class="air-element-data-ignoreEaseOut" type="checkbox" <?php echo (!$void && isset($element->data_ignoreEaseOut) && $element->data_ignoreEaseOut) ? 'checked="checked"' : '' ?> /><?php _e('Disable synchronization with slide out animation', AIRSLIDER_TEXTDOMAIN) ?></label>
                            </td>
                            <td class="air-description">
                                    <?php _e('The out animation of the element.<br /><br />Disable synchronization with slide out animation: if not checked, the slide out animation won\'t start until all the elements that have this option unchecked are animated out.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease In', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeIn" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeIn) ? $element->data_easeIn : '300'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the in animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease Out', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeOut" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeOut) ? $element->data_easeOut : '300'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the out animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-txt-advanced-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
                        <tr>
                            <td class="air-name"><?php _e('Attribute ID', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-id" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_id) ? $element->attr_id : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add ID attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Classes', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-class" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_class) ? $element->attr_class : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Class attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Title', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-title" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_title) ? $element->attr_title : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Title attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Rel', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-rel" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_rel) ? $element->attr_rel : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Rel attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link" type="text" value="<?php echo ($void) ? '' : (isset($element->link) ? stripslashes($element->link) : ''); ?>" />
                                <br />
                                <label><input class="air-element-link-new-tab" type="checkbox" <?php echo (!$void && isset($element->link_new_tab) && $element->link_new_tab) ? 'checked="checked"' : '';  ?> /><?php _e('Open link in a new tab', AIRSLIDER_TEXTDOMAIN) ?></label>
                            </td>
                            <td class="air-description">
                                <?php _e('Open the link (e.g.: http://www.google.com) on click. Leave it empty if you don\'t want it.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link ID', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-id" type="text" value="<?php echo ($void) ? '' : (isset($element->link_id) ? $element->link_id :''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add ID attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Classes', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-class" type="text" value="<?php echo ($void) ? '' : (isset($element->link_class) ? $element->link_class : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Class attribute to element\'s link .', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Title', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-title" type="text" value="<?php echo ($void) ? '' : (isset($element->link_title) ? $element->link_title : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Title attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Rel', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-rel" type="text" value="<?php echo ($void) ? '' : (isset($element->link_rel) ? $element->link_rel : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Rel attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Custom CSS', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <textarea class="air-element-custom-css"><?php echo ($void) ? '' : (isset($element->custom_css) ? stripslashes($element->custom_css) : ''); ?></textarea>
                            </td>
                            <td class="air-description">
                                <?php _e('Style the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

	<?php
}
}

/**
 * Print Image Element
 *  
 * @param array $element image element information
 * 
 * @param integer $ele_no element number
*/
if(!function_exists('airsliderPrintImageElement'))
{
    function airsliderPrintImageElement($element, $ele_no = null) {
	$void = !$element ? true : false;
	
        //Default Transition
	$animations = array(
		'slideDown' => array(__('Slide Down', AIRSLIDER_TEXTDOMAIN), false),
		'slideUp' => array(__('Slide Up', AIRSLIDER_TEXTDOMAIN), false),
		'slideLeft' => array(__('Slide Left', AIRSLIDER_TEXTDOMAIN), false),
		'slideRight' => array(__('Slide Right', AIRSLIDER_TEXTDOMAIN), false),
		'fade' => array(__('Fade', AIRSLIDER_TEXTDOMAIN), true),
		'fadeDown' => array(__('Fade Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeUp' => array(__('Fade Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeLeft' => array(__('Fade Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeRight' => array(__('Fade Right', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallDown' => array(__('Fade Small Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallUp' => array(__('Fade Small Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallLeft' => array(__('Fade Small Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallRight' => array(__('Fade Small Right', AIRSLIDER_TEXTDOMAIN), false),
	);
	
	?>
        <div class="air-element-pro-tab air-tabs">
            <ul class="air-element-pro-tab-ul ui-tabs-nav">
                <li class="">
                    <a  class="air-button air-is-navy air-is-active" href="javascript:void(0);" data-href=".air-ele-img-general-parameter"><?php _e('General Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-img-animation-parameter"><?php _e('Animation Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-img-advanced-parameter"><?php _e('Advanced Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
            </ul>
            <div class="air-element-type-block air-ele-img-general-parameter" style="display: block;">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
			<tr>
				<td class="air-name"><?php _e('Modify Image', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input data-width="<?php echo ($void) ? '' : (isset($element->image_width) ? $element->image_width : ''); ?>" data-height="<?php echo ($void) ? '' : (isset($element->image_height) ? $element->image_height : ''); ?>" data-src="<?php echo ($void) ? '' : (isset($element->image_src) ? $element->image_src : ''); ?>" class="air-image-element-upload-button air-button air-is-default" type="button" value="<?php _e('Open Gallery', AIRSLIDER_TEXTDOMAIN) ?>" />
				</td>
				<td class="air-description">
					<?php _e('Change the image source or the alt text.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <tr>
				<td class="air-name"><?php _e('Image Alt', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-image-alt" type="text" value="<?php echo ($void) ? '' : (isset($element->image_alt) ? trim($element->image_alt) : ''); ?>" />
				</td>
				<td class="air-description">
					<?php _e('Add image alt text.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <tr>
                                <td class="air-name air-label-for" data-label-for=".air-element-image-scale"><?php _e('Scale Proportional', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-image-scale" type="checkbox" value="Y" <?php echo (!$void && isset($element->image_scale) && $element->image_scale == 'Y') ? 'checked="checked"' : ''; ?> />
				</td>
				<td class="air-description">
					<?php _e('An element with Scale Proportional will scalling width and height with respect to slider width and height.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr>
                            <td class="air-name"><?php _e('Left', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-left" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_left) ? $element->data_left : '0'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Left distance in px from the start width.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Top', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-top" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_top) ? $element->data_top : '0'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Top distance in px from the start height.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Z - index', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-z-index" type="number" min="0" value="<?php echo ($void) ? '1' : (isset($element->z_index) ? $element->z_index : '1'); ?>" onkeypress="return isNumberKey(event);" />
                            </td>
                            <td class="air-description">
                                <?php _e('An element with an high z-index will cover an element with a lower z-index if they overlap.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
			
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-img-animation-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
			<tr>
                            <td class="air-name"><?php _e('Delay', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-delay" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_delay) ? $element->data_delay : '0'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element wait before the entrance. Default:0ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Time', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-time" type="text" value="<?php echo ($void) ? 'all' : (isset($element->data_time) ? $element->data_time : 'all'); ?>" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element be displayed during the slide execution. Write "all" to set the entire time. Default:all', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('In Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-in">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_in) && $element->data_in == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                            </td>
                            <td class="air-description">
                                    <?php _e('The in animation of the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Out Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-out">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_out) && $element->data_out == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                                <br />
                                <label><input class="air-element-data-ignoreEaseOut" type="checkbox" <?php echo (!$void) ? 'checked="checked"' : '' ?> /><?php _e('Disable synchronization with slide out animation', AIRSLIDER_TEXTDOMAIN) ?></label>
                            </td>
                            <td class="air-description">
                                    <?php _e('The out animation of the element.<br /><br />Disable synchronization with slide out animation: if not checked, the slide out animation won\'t start until all the elements that have this option unchecked are animated out.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease In', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeIn" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeIn) ? $element->data_easeIn : '300'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the in animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease Out', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeOut" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeOut) ? $element->data_easeOut : '300') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the out animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-img-advanced-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
                        <tr>
                            <td class="air-name"><?php _e('Attribute ID', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-id" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_id) ? $element->attr_id : '') ; ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add ID attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Classes', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-class" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_class) ? $element->attr_class : '') ; ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Class attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Title', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-title" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_title) ? $element->attr_title : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Title attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Rel', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-rel" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_rel) ? $element->attr_rel : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Rel attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link" type="text" value="<?php echo ($void) ? '' : (isset($element->link) ? stripslashes($element->link) : ''); ?>" />
                                <br />
                                <label><input class="air-element-link-new-tab" type="checkbox" <?php echo (!$void && isset($element->link_new_tab) && $element->link_new_tab) ? 'checked="checked"' : '';  ?> /><?php _e('Open link in a new tab', AIRSLIDER_TEXTDOMAIN) ?></label>
                            </td>
                            <td class="air-description">
                                <?php _e('Open the link (e.g.: http://www.google.com) on click. Leave it empty if you don\'t want it.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link ID', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-id" type="text" value="<?php echo ($void) ? '' : (isset($element->link_id) ? $element->link_id : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add ID attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Classes', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-class" type="text" value="<?php echo ($void) ? '' : (isset($element->link_class) ? $element->link_class : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Class attribute to element\'s link .', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Title', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-title" type="text" value="<?php echo ($void) ? '' : (isset($element->link_title) ? $element->link_title : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Title attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Link Rel', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-link-rel" type="text" value="<?php echo ($void) ? '' : (isset($element->link_rel) ? $element->link_rel : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Rel attribute to element\'s link.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Custom CSS', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <textarea class="air-element-custom-css"><?php echo ($void) ? '' : (isset($element->custom_css) ? stripslashes($element->custom_css) : ''); ?></textarea>
                            </td>
                            <td class="air-description">
                                <?php _e('Style the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	<?php
}
}

/**
 * Print Video Element
 *  
 * @param array $element video element information
 * 
 * @param integer $ele_no element number
*/
if(!function_exists('airsliderPrintVideoElement'))
{
    function airsliderPrintVideoElement($element, $slide_index = 0, $ele_no = null) {
	$void = !$element ? true : false;
	$animations = array(
		'slideDown' => array(__('Slide Down', AIRSLIDER_TEXTDOMAIN), false),
		'slideUp' => array(__('Slide Up', AIRSLIDER_TEXTDOMAIN), false),
		'slideLeft' => array(__('Slide Left', AIRSLIDER_TEXTDOMAIN), false),
		'slideRight' => array(__('Slide Right', AIRSLIDER_TEXTDOMAIN), false),
		'fade' => array(__('Fade', AIRSLIDER_TEXTDOMAIN), true),
		'fadeDown' => array(__('Fade Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeUp' => array(__('Fade Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeLeft' => array(__('Fade Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeRight' => array(__('Fade Right', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallDown' => array(__('Fade Small Down', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallUp' => array(__('Fade Small Up', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallLeft' => array(__('Fade Small Left', AIRSLIDER_TEXTDOMAIN), false),
		'fadeSmallRight' => array(__('Fade Small Right', AIRSLIDER_TEXTDOMAIN), false),
	);
	
	?>
        <div class="air-element-pro-tab air-tabs">
            <ul class="air-element-pro-tab-ul ui-tabs-nav">
                <li class="">
                    <a  class="air-button air-is-navy air-is-active" href="javascript:void(0);" data-href=".air-ele-video-general-parameter"><?php _e('General Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-video-animation-parameter"><?php _e('Animation Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
                <li class="">
                    <a  class="air-button air-is-navy" href="javascript:void(0);" data-href=".air-ele-video-advanced-parameter"><?php _e('Advanced Parameter', AIRSLIDER_TEXTDOMAIN); ?></a>
                </li>
            </ul>
            <div class="air-element-type-block air-ele-video-general-parameter" style="display: block;">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
			<tr>
				<td class="air-name"><?php _e('Choose Video Type ', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <label><input name="<?php echo (!$void) ? 'air-video-type-'.$slide_index.'-'.($ele_no+1) : 'air-video-type' ?>" class="air-element-video-type" type="radio" value="Y" <?php echo ($void || (!$void && isset($element->video_type) && $element->video_type == 'Y')) ? 'checked="checked"' : ''  ?> /><?php _e('Youtube', AIRSLIDER_TEXTDOMAIN); ?></label>
                                    <label><input name="<?php echo (!$void) ? 'air-video-type-'.$slide_index.'-'.($ele_no+1) : 'air-video-type' ?>" class="air-element-video-type" type="radio" value="V" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? 'checked="checked"' : ''  ?> /><?php _e('Vimeo', AIRSLIDER_TEXTDOMAIN); ?></label>
                                    <label><input name="<?php echo (!$void) ? 'air-video-type-'.$slide_index.'-'.($ele_no+1) : 'air-video-type' ?>" class="air-element-video-type" type="radio" value="H" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'H') ? 'checked="checked"' : ''  ?> /><?php _e('Html5', AIRSLIDER_TEXTDOMAIN); ?></label>
				</td>
				<td class="air-description">
					<?php _e('Choose video type ', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <?php
                        $youtube_style = $vimeo_style = $html5_style = '';
                        if((!$void && isset($element->video_type) && $element->video_type=='Y') || $void)
                        {
                            $youtube_style = 'style="display:table-row;"';
                        }
                        else if(!$void && isset($element->video_type) && $element->video_type=='V')
                        {
                            $vimeo_style = 'style="display:table-row;"';
                        }
                        else if(!$void && isset($element->video_type) && $element->video_type=='H')
                        {
                            $html5_style = 'style="display:table-row;"';
                        }
                        ?>
                        <!-- Youtube block start -->
                        <tr class="air-youtube-search air-video-search" <?php echo $youtube_style; ?>>
				<td class="air-name"><?php _e('Enter Youtube ID or URL ', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-youtube-video-link" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='Y') ? (isset($element->video_link) ? trim($element->video_link) : '') : ''  ?>" />
                                    <a href="javascript:void(0);" class="air-button air-is-primary air-search-youtube-video"><?php _e('Search', AIRSLIDER_TEXTDOMAIN); ?></a>
				</td>
				<td class="air-description">
					<?php _e('example: E5ln4uR4TwQ ', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <tr class="air-video-block air-youtube-option" <?php echo (!$void) ? $youtube_style : ''; ?>>
                                <td class="air-name air-label-for" data-label-for=".air-element-video-full-width"><?php _e('Full Width', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $yt_full_width = $video_wh = '';
                                    
                                    if(!$void && isset($element->video_type) && $element->video_type == 'Y' && isset($element->video_full_width) && $element->video_full_width == 'Y')
                                    {
                                        $yt_full_width = 'checked="checked"';
                                        $video_wh = 'style="display:none;"';
                                    }
                                    ?>
                                    
                                    <input class="air-element-video-full-width" type="checkbox" value="Y" <?php echo $yt_full_width; ?> />
                                    
                                    <!-- video width -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Width', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-width" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y') ? (isset($element->video_width) ? $element->video_width : '320') : '320' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
                                    
                                    <!-- video height -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Height', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-height" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y') ? (isset($element->video_height) ? $element->video_height : '240') : '240' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
				</td>
				<td class="air-description">
					<?php _e('Checked full width checkbox for get full width video which will neglate width and height which you have enter. If full width is not checked then video will take width and height from textbox.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <tr class="air-video-block air-youtube-option" <?php echo (!$void) ? $youtube_style : ''; ?>>
                            <td class="air-name"><?php _e('Video Settings', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $yt_autoplay = $yt_autoplay_first = $yt_force_rewind = '';
                                    $yt_autoplay_block = 'style="display: none;"';
                                    
                                    if(!$void && isset($element->video_type) && $element->video_type == 'Y' && isset($element->video_autoplay) && $element->video_autoplay == 'Y')
                                    {
                                        $yt_autoplay = 'checked="checked"';
                                        
                                        if(isset($element->video_autoplay_firsttime) && $element->video_autoplay_firsttime=='Y'){
                                            $yt_autoplay_first = 'checked="checked"';
                                        }
                                                
                                        if(isset($element->video_force_rewind) && $element->video_force_rewind=='Y'){
                                            $yt_force_rewind = 'checked="checked"';
                                        }
                                        $yt_autoplay_block = 'style="display:blcok;"';
                                    }
                                    ?>
                                    <table>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-autoplay" type="checkbox" value="Y" <?php echo $yt_autoplay; ?> /><?php _e('Autoplay', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-firsttime-block" <?php echo $yt_autoplay_block; ?>><input class="air-element-video-autoplay-firsttime" type="checkbox" value="Y" <?php echo $yt_autoplay_first; ?> /><?php _e('Only First Time', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-rewind-block" <?php echo $yt_autoplay_block; ?>><input class="air-element-video-force-rewind" type="checkbox" value="Y" <?php echo $yt_force_rewind; ?> /><?php _e('Force Rewind', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-next-slide-on-video-end" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y' && isset($element->next_slide_on_video_end) && $element->next_slide_on_video_end == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Next Slide On End', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-loop" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y' && isset($element->video_loop) && $element->video_loop == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Loop Video', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-mute" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y' && isset($element->video_mute) && $element->video_mute == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Mute', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                    </table>
				</td>
				<td class="air-description">
					<?php _e('Video embeded setings.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="air-video-block air-youtube-option" <?php echo (!$void) ? $youtube_style : ''; ?>>
				<td class="air-name"><?php _e('Set Preview image', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-preview-image-element-upload-button air-button air-is-primary" data-src="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y') ? (isset($element->video_preview_img_src) ? $element->video_preview_img_src : '') : '' ?>" data-alt="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y') ? (isset($element->video_preview_img_alt) ? $element->video_preview_img_alt : '') : '' ?>" data-is-preview="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'Y') ? (isset($element->video_is_preview_set) ? $element->video_is_preview_set : '') : '' ?>" type="button" value="<?php _e('Set Preview', AIRSLIDER_TEXTDOMAIN) ?>" />&nbsp;&nbsp;
                                    <input class="air-remove-preview-image-element-upload-button air-button air-is-danger" type="button" value="<?php _e('Remove Preview', AIRSLIDER_TEXTDOMAIN) ?>" />
				</td>
				<td class="air-description">
					<?php _e('Set the preivew image for video and remove preview image on select remove preview button.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <!-- Youtube block end -->
                        
                        <!-- Vimeo block start -->
			<tr class="air-vimeo-search air-video-search" <?php echo $vimeo_style; ?>>
				<td class="air-name"><?php _e('Enter Vimeo ID or URL ', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-vimeo-video-link" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='V') ? (isset($element->video_link) ? $element->video_link : '') : '' ?>" />
                                    <a href="javascript:void(0);" class="air-button air-is-primary air-search-vimeo-video"><?php _e('Search', AIRSLIDER_TEXTDOMAIN); ?></a>
				</td>
				<td class="air-description">
					<?php _e('example: 6370469 ', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        
                        <tr class="air-video-block air-vimeo-option" <?php echo $vimeo_style; ?>>
                                <td class="air-name air-label-for" data-label-for=".air-element-video-full-width"><?php _e('Full Width', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $vm_full_width = $video_wh = '';
                                    
                                    if(!$void && isset($element->video_type) && $element->video_type == 'V' && isset($element->video_full_width) && $element->video_full_width == 'Y')
                                    {
                                        $vm_full_width = 'checked="checked"';
                                        $video_wh = 'style="display:none;"';
                                    }
                                    ?>
                                    
                                    <input class="air-element-video-full-width" type="checkbox" value="Y" <?php echo $vm_full_width; ?> />
                                    
                                    <!-- video width -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Width', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-width" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? (isset($element->video_width) ? $element->video_width : '320') : '320' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
                                    
                                    <!-- video height -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Height', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-height" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? (isset($element->video_height) ? $element->video_height : '240') : '240' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
				</td>
				<td class="air-description">
					<?php _e('Checked full width checkbox for get full width video which will neglate width and height which you have enter. If full width is not checked then video will take width and height from textbox.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="air-video-block air-vimeo-option" <?php echo $vimeo_style; ?>>
                            <td class="air-name"><?php _e('Video Settings', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $vm_autoplay = $vm_autoplay_first = $vm_force_rewind = '';
                                    $vm_autoplay_block = 'style="display: none;"';
                                    
                                    if(!$void && isset($element->video_type) && $element->video_type == 'V' && isset($element->video_autoplay) && $element->video_autoplay == 'Y')
                                    {
                                        $vm_autoplay = 'checked="checked"';
                                        
                                        if(isset($element->video_autoplay_firsttime) && $element->video_autoplay_firsttime=='Y'){
                                            $vm_autoplay_first = 'checked="checked"';
                                        }
                                                
                                        if(isset($element->video_force_rewind) && $element->video_force_rewind=='Y'){
                                            $vm_force_rewind = 'checked="checked"';
                                        }
                                        $vm_autoplay_block = 'style="display:blcok;"';
                                    }
                                    ?>
                                    <table>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-autoplay" type="checkbox" value="Y" <?php echo $vm_autoplay; ?> /><?php _e('Autoplay', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-firsttime-block" <?php echo $vm_autoplay_block; ?>><input class="air-element-video-autoplay-firsttime" type="checkbox" value="Y" <?php echo $vm_autoplay_first; ?> /><?php _e('Only First Time', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-rewind-block" <?php echo $vm_autoplay_block; ?>><input class="air-element-video-force-rewind" type="checkbox" value="Y" <?php echo $vm_force_rewind; ?> /><?php _e('Force Rewind', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-next-slide-on-video-end" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'V' && isset($element->next_slide_on_video_end) && $element->next_slide_on_video_end == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Next Slide On End', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-loop" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'V' && isset($element->video_loop) && $element->video_loop == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Loop Video', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-mute" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'V' && isset($element->video_mute) && $element->video_mute == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Mute', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                    </table>
				</td>
				<td class="air-description">
					<?php _e('Video embeded setings.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="air-video-block air-vimeo-option" <?php echo $vimeo_style; ?>>
				<td class="air-name"><?php _e('Set Preview image', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-preview-image-element-upload-button air-button air-is-primary" data-src="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? (isset($element->video_preview_img_src) ? $element->video_preview_img_src : '') : '' ?>" data-alt="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? (isset($element->video_preview_img_alt) ? $element->video_preview_img_alt : '') : '' ?>" data-is-preview="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'V') ? (isset($element->video_is_preview_set) ? $element->video_is_preview_set : '') : '' ?>" type="button" value="<?php _e('Set Preview', AIRSLIDER_TEXTDOMAIN) ?>" />&nbsp;&nbsp;
                                    <input class="air-remove-preview-image-element-upload-button air-button air-is-danger" type="button" value="<?php _e('Remove Preview', AIRSLIDER_TEXTDOMAIN) ?>" />
				</td>
				<td class="air-description">
					<?php _e('Set the preivew image for video and remove preview image on select remove preview button.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <!-- Vimeo block end -->
                        
                        <!-- Html5 block start -->
                        <tr class="html5_search air-video-search" <?php echo $html5_style; ?>>
				<td class="air-name"><?php _e('Enter Poster Image Url', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-html5-poster-url" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='H') ? (isset($element->video_html5_poster_url) ? $element->video_html5_poster_url : '') : '' ?>" />
				</td>
				<td class="air-description">
					<?php _e('Example: http://video-js.zencoder.com/oceans-clip.png', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="html5_search air-video-search" <?php echo $html5_style; ?>>
				<td class="air-name air-no-border"><?php _e('Enter MP4 Url', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content air-no-border">
                                    <input class="air-element-html5-mp4-video-link" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='H') ? (isset($element->video_html5_mp4_video_link) ? $element->video_html5_mp4_video_link : '') : '' ?>" />
				</td>
				<td class="air-description air-no-border">
					<?php _e('Example: http://video-js.zencoder.com/oceans-clip.mp4', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="html5_search air-video-search" <?php echo $html5_style; ?>>
				<td class="air-name air-no-border"><?php _e('Enter WEBM Url', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content air-no-border">
                                    <input class="air-element-html5-webm-video-link" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='H') ? (isset($element->video_html5_webm_video_link) ? $element->video_html5_webm_video_link : '') : '' ?>" />
				</td>
				<td class="air-description air-no-border">
					<?php _e('Example: http://video-js.zencoder.com/oceans-clip.webm', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
			<tr class="html5_search air-video-search" <?php echo $html5_style; ?>>
				<td class="air-name"><?php _e('Enter OGV Url', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <input class="air-element-html5-ogv-video-link" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type=='H') ? (isset($element->video_html5_ogv_video_link) ? $element->video_html5_ogv_video_link : '') : '' ?>" />
                                    <br/>
                                    <a href="javascript:void(0);" class="air-button air-is-primary search_html5_video mt5"><?php _e('Search', AIRSLIDER_TEXTDOMAIN); ?></a>
				</td>
				<td class="air-description">
					<?php _e('Example: http://video-js.zencoder.com/oceans-clip.ogv', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        
                            <tr class="air-video-block air-html5-option" <?php echo $html5_style; ?>>
                                <td class="air-name air-label-for" data-label-for=".air-element-video-full-width"><?php _e('Full Width', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $h5_full_width = $video_wh = '';
                                    
                                    if(!$void && isset($element->video_type) && $element->video_type == 'H' && isset($element->video_full_width) && $element->video_full_width == 'Y')
                                    {
                                        $h5_full_width = 'checked="checked"';
                                        $video_wh = 'style="display:none;"';
                                    }
                                    ?>
                                    
                                    <input class="air-element-video-full-width" type="checkbox" value="Y" <?php echo $h5_full_width; ?> />
                                    
                                    <!-- video width -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Width', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-width" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'H') ? (isset($element->video_width) ? $element->video_width : '320') : '320' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
                                    
                                    <!-- video height -->
                                    <label <?php echo $video_wh; ?> class="air-video-wh"><?php _e('Height', AIRSLIDER_TEXTDOMAIN); ?> &nbsp;&nbsp;<input class="air-element-video-height" type="text" value="<?php echo (!$void && isset($element->video_type) && $element->video_type == 'H') ? (isset($element->video_height) ? $element->video_height : '240') : '240' ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?></label>
				</td>
				<td class="air-description">
					<?php _e('Checked full width checkbox for get full width video which will neglate width and height which you have enter. If full width is not checked then video will take width and height from textbox.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <tr class="air-video-block air-html5-option" <?php echo $html5_style; ?>>
                            <td class="air-name"><?php _e('Video Settings', AIRSLIDER_TEXTDOMAIN); ?></td>
				<td class="air-content">
                                    <?php
                                    $h5_autoplay = $h5_autoplay_first = $h5_force_rewind = '';
                                    $h5_autoplay_block = 'style="display: none;"';
                                    
                                    if(!$void && isset($element->video_type) &&  $element->video_type == 'H' && isset($element->video_autoplay) && $element->video_autoplay == 'Y')
                                    {
                                        $h5_autoplay = 'checked="checked"';
                                        
                                        if(isset($element->video_autoplay_firsttime) && $element->video_autoplay_firsttime=='Y'){
                                            $h5_autoplay_first = 'checked="checked"';
                                        }
                                                
                                        if(isset($element->video_force_rewind) && $element->video_force_rewind=='Y'){
                                            $h5_force_rewind = 'checked="checked"';
                                        }
                                        $h5_autoplay_block = 'style="display:blcok;"';
                                    }
                                    ?>
                                    <table>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-autoplay" type="checkbox" value="Y" <?php echo $h5_autoplay; ?> /><?php _e('Autoplay', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-firsttime-block" <?php echo $h5_autoplay_block; ?>><input class="air-element-video-autoplay-firsttime" type="checkbox" value="Y" <?php echo $h5_autoplay_first; ?> /><?php _e('Only First Time', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label class="air-autoplay-rewind-block" <?php echo $h5_autoplay_block; ?>><input class="air-element-video-force-rewind" type="checkbox" value="Y" <?php echo $h5_force_rewind; ?> /><?php _e('Force Rewind', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                        <tr>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-next-slide-on-video-end" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'H' && isset($element->next_slide_on_video_end) && $element->next_slide_on_video_end == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Next Slide On End', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-loop" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'H' && isset($element->video_loop) && $element->video_loop == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Loop Video', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                            <td class="air-no-border air-pr0 air-pl0"><label><input class="air-element-video-mute" type="checkbox" value="Y" <?php echo (!$void && isset($element->video_type) && $element->video_type == 'H' && isset($element->video_mute) && $element->video_mute == 'Y') ? 'checked="checked"' : '' ?> /><?php _e('Mute', AIRSLIDER_TEXTDOMAIN); ?></label></td>
                                        </tr>
                                    </table>
				</td>
				<td class="air-description">
					<?php _e('Video embeded setings.', AIRSLIDER_TEXTDOMAIN); ?>
				</td>
			</tr>
                        <!-- Html5 block end -->
                        
                        <tr>
                            <td class="air-name"><?php _e('Left', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-left" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_left) ? $element->data_left : '0') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Left distance in px from the start width.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Top', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-top" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_top) ? $element->data_top : '0') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('px', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('Top distance in px from the start height.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Z - index', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-z-index" type="number" min="0" value="<?php echo ($void) ? '1' : (isset($element->z_index) ? $element->z_index : '1'); ?>" onkeypress="return isNumberKey(event);" />
                            </td>
                            <td class="air-description">
                                <?php _e('An element with an high z-index will cover an element with a lower z-index if they overlap.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-video-animation-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
			<tr>
                            <td class="air-name"><?php _e('Delay', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-delay" type="text" value="<?php echo ($void) ? '0' : (isset($element->data_delay) ? $element->data_delay : '0'); ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element wait before the entrance. Default:0ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Time', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-time" type="text" value="<?php echo ($void) ? 'all' : (isset($element->data_time) ? $element->data_time : 'all') ?>" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the element be displayed during the slide execution. Write "all" to set the entire time. Default:all', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('In Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-in">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_in) && $element->data_in == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                            </td>
                            <td class="air-description">
                                    <?php _e('The in animation of the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Out Animation', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <select class="air-element-data-out">
                                    <?php
                                    foreach($animations as $key => $value) {
                                            echo '<option value="' . $key . '"';
                                            if(($void && $value[1]) || (!$void && isset($element->data_out) && $element->data_out == $key)) {
                                                    echo ' selected';
                                            }
                                            echo '>' . $value[0] . '</option>';
                                    }
                                    ?>
                                </select>
                                <br />
                                <label><input class="air-element-data-ignoreEaseOut" type="checkbox" <?php echo (!$void) ? 'checked="checked"' : '' ?> /><?php _e('Disable synchronization with slide out animation', AIRSLIDER_TEXTDOMAIN) ?></label>
                            </td>
                            <td class="air-description">
                                    <?php _e('The out animation of the element.<br /><br />Disable synchronization with slide out animation: if not checked, the slide out animation won\'t start until all the elements that have this option unchecked are animated out.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease In', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeIn" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeIn) ? $element->data_easeIn : '300') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the in animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Ease Out', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-data-easeOut" type="text" value="<?php echo ($void) ? '300' : (isset($element->data_easeOut) ? $element->data_easeOut : '300') ?>" onkeypress="return isNumberKey(event);" />&nbsp;<?php _e('ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                            <td class="air-description">
                                <?php _e('How long will the out animation take. Default:300ms', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="air-element-type-block air-ele-video-advanced-parameter">
                <table class="air-element-settings-list air-text-element-settings-list air-table">
                    <tbody>
                        <tr>
                            <td class="air-name"><?php _e('Attribute ID', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-id" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_id) ? $element->attr_id : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add ID attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Classes', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-class" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_class) ? $element->attr_class : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Class attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Title', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-title" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_title) ? $element->attr_title : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Title attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Attribute Rel', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <input class="air-element-attr-rel" type="text" value="<?php echo ($void) ? '' : (isset($element->attr_rel) ? $element->attr_rel : ''); ?>" />
                            </td>
                            <td class="air-description">
                                <?php _e('Add Rel attribute to element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                        <tr>
                            <td class="air-name"><?php _e('Custom CSS', AIRSLIDER_TEXTDOMAIN); ?></td>
                            <td class="air-content">
                                <textarea class="air-element-custom-css"><?php echo ($void) ? '' : (isset($element->custom_css) ? stripslashes($element->custom_css) : '')?></textarea>
                            </td>
                            <td class="air-description">
                                <?php _e('Style the element.', AIRSLIDER_TEXTDOMAIN); ?>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
	<?php
}
}
?>