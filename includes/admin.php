<?php
// Include export file when export function call
if(isset($_REQUEST['export']) &&  $_REQUEST['export'] == 1)
{
    require_once(AIR_PLUGIN_DIR.'includes/export.php');
}
// Include import file when import function call
if(isset($_POST['sbtImport']))
{
    require_once(AIR_PLUGIN_DIR.'includes/import/import.php');
}

class AirsliderAdmin {
	
	/**
         * Creates the menu and the admin panel
        */
	public static function airsliderShowSettings() {
		add_action('admin_menu', 'AirsliderAdmin::airsliderPluginMenus');
	}
	
        /**
         * Add menu in left panel of admin panel
        */
	public static function airsliderPluginMenus() {
		add_menu_page('Air Slider', 'Air Slider', 'manage_options', AIRSLIDER_TEXTDOMAIN, 'AirsliderAdmin::airsliderDisplayPage', AIR_PLUGIN_URL.'/images/air.png');
	}
	
        /**
         * Display correct page 
        */
	public static function airsliderDisplayPage() {
		if(!isset($_GET['view'])) {
			$index = 'home';
		}
		else {
			$index = $_GET['view'];
		}
		
		global $wpdb;
		
		// Check what the user is doing: is it adding or modifying a slider? 
		if(isset($_GET['view']) && $_GET['view'] == 'add') {
			$edit = false;
			$id = NULL;
		}
		else {
			$edit = true;
			$id = isset($_GET['id']) ? $_GET['id'] : NULL;
			if(isset($id))
                        {
                            $slider = $wpdb->get_row('SELECT name FROM ' . $wpdb->prefix . 'air_sliders WHERE id = ' . $id);
                        
                            //if id is not found
                            if(!$slider){
                            ?>   
                                <script>
                                    window.location.href = '?page=airslider';
                                </script>
                            <?php    
                            }
                        }    
		}
		
		?>
		<div class="wrap air-admin">	
		
			<noscript class="air-no-js">
				<div class="air-message air-message-error" style="display: block;"><?php _e('JavaScript must be enabled to view this page correctly.', AIRSLIDER_TEXTDOMAIN); ?></div>
			</noscript>
			
			<?php if(! $edit): ?>
				<div class="air-message air-message-warning"><?php _e('When you\'ll click "Save Settings", you\'ll be able to add slides and elements.', AIRSLIDER_TEXTDOMAIN); ?></div>
			<?php endif; ?>
			
			<h1 class="air-logo" title="Air Animation Slider">
				<a href="?page=airslider" title="<?php _e('Air Slider', AIRSLIDER_TEXTDOMAIN); ?>">
                                    <img src="<?php echo AIR_PLUGIN_URL.'/images/logo.png' ?>" alt="<?php _e('Air Slider', AIRSLIDER_TEXTDOMAIN); ?>" />
				</a>
			</h1>
                        
                        <!-- Display slider name and Back to list button -->        
                        <?php if($edit && $index!='' && $index!='home'): ?>
                            <div class="air-left air-slider-title-wrapper">
                                <h2 class="air-slider-title"><?php _e('Editing Slider: ', AIRSLIDER_TEXTDOMAIN); ?><?php echo $slider->name; ?></h2>
                                <a href="?page=airslider" class="air-ele-time-btn air-button air-is-primary air-slider-back-list">
                                    <span class="dashicons dashicons-menu"></span>
                                    <?php _e('Back to List', AIRSLIDER_TEXTDOMAIN); ?>
                                </a>
                            </div>
			<?php
                        endif;
			
                        //Choose the page for display based on call
			switch($index) {
				case 'home':
					self::airsliderDisplayHome();
				break;
                            
				case 'add':
				case 'edit':
					self::airsliderDisplaySlider();
				break;
			}
			
			?>
		<div class="clear"></div>
		</div>
		<?php
	}
	
        /**
         * Display home page with slider list
        */
	public static function airsliderDisplayHome() {		
		?>
		<div class="air-home">
			<?php require_once AIR_PLUGIN_DIR . 'includes/home.php'; ?>
		</div>
		<?php
	}
	/**
         * Displays the slider page in wich you can add or modify sliders, slides and elements
        */
	public static function airsliderDisplaySlider() {
		global $wpdb;
                
		// Check what the user is doing: is it adding or modifying a slider? 
		if($_GET['view'] == 'add') {
			$edit = false;
			$id = NULL;	//This variable will be used in other files. It contains the ID of the SLIDER that the user is editing
		}
		else {
			$edit = true;
			$id = isset($_GET['id']) ? $_GET['id'] : NULL;
			$slider = $wpdb->get_row('SELECT * FROM ' . $wpdb->prefix . 'air_sliders WHERE id = ' . $id);
			$slides = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'air_slides WHERE slider_parent = ' . $id . ' ORDER BY position');
			// The elements variable are updated in the foreachh() loop directly in the "slides.php" file
		}
		?>
		
		<div class="air-slider <?php echo $edit ? 'air-edit-slider' : 'air-add-slider' ?>">
                    	<div class="air-tabs air-tabs-fade air-tabs-switch-interface">
				<?php if($edit): ?>
                            <ul class="air-slider-tabs">
					
						<li>
                                                    <a class="air-button air-is-green air-is-active" href="#air-slider-settings">
                                                        <span class="dashicons dashicons-admin-generic"></span>
                                                        <?php _e('Settings', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </a>
						</li>
						<li>
                                                    <a class="air-button air-is-green" href="#air-slides">
                                                        <span class="dashicons dashicons-edit"></span>
                                                        <?php _e('Edit Slides', AIRSLIDER_TEXTDOMAIN); ?>
                                                    </a>
						</li>
					</ul>
					
				<?php endif; ?>
				
				<?php require_once AIR_PLUGIN_DIR . 'includes/slider.php'; ?>
				<?php
				if($edit) {
					require_once AIR_PLUGIN_DIR . 'includes/elements.php';
					require_once AIR_PLUGIN_DIR . 'includes/slides.php';
				}
				?>
			</div>
		</div>
		
		<?php
	}
	
	
        /**
         * Include CSS and JavaScript
        */
	public static function enqueues() {
            global $wpdb;
            
            if(isset($_GET['page']) && $_GET['page'] == 'airslider')
            {
            	wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_script('jquery-ui-tabs');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_style('wp-color-picker');
		wp_enqueue_media();
		
                wp_register_script('airslider-admin-bootstrap', AIR_PLUGIN_URL . '/js/bootstrap.min.js');		
                wp_register_script('airslider-admin-bootstrap-growl', AIR_PLUGIN_URL . '/js/jquery.bootstrap-growl.min.js');		
                wp_register_script('airslider-admin', AIR_PLUGIN_URL . '/js/admin.js', array('wp-color-picker','jquery-ui-tabs','jquery-ui-sortable','jquery-ui-draggable'));		
//		
		
		self::localization();
		
		wp_enqueue_style('airslider-admin-bootstrap', AIR_PLUGIN_URL . '/css/bootstrap.min.css');
		wp_enqueue_style('airslider-admin', AIR_PLUGIN_URL . '/css/admin.css', array());
		wp_enqueue_script('airslider-admin-bootstrap');
		wp_enqueue_script('airslider-admin-bootstrap-growl');
                wp_enqueue_script('airslider-admin');
            }
	}
	
        /**
         * add action for enqueue scripts
        */
	public static function setEnqueues() {
		add_action('admin_enqueue_scripts', 'AirsliderAdmin::enqueues');
	}
	
        /**
         * Set localization which will be used in js file
        */
	public static function localization() {
		// Here the translations for the admin.js file
		$airslider_translations = array(
			'slide' => __('Slide', AIRSLIDER_TEXTDOMAIN),
			'slider_import_type' => __('Import only txt type file.', AIRSLIDER_TEXTDOMAIN),
			'slider_import_no_file' => __('No file selected for import.', AIRSLIDER_TEXTDOMAIN),
			'slider_name' => __('Slider name can not be empty.', AIRSLIDER_TEXTDOMAIN),
			'slider_generate' => __('Slider has been generated successfully.', AIRSLIDER_TEXTDOMAIN),
			'slider_save' => __('Slider has been saved successfully.', AIRSLIDER_TEXTDOMAIN),
			'slider_error' => __('Something went wrong during save slider!', AIRSLIDER_TEXTDOMAIN),
			'slider_already_find' => __('Some other slider with alias', AIRSLIDER_TEXTDOMAIN),
			'slider_exists' => __('already exists.', AIRSLIDER_TEXTDOMAIN),
			'slider_delete' => __('Slider has been deleted successfully.', AIRSLIDER_TEXTDOMAIN),
			'slider_delete_error' => __('Something went wrong during delete slider!', AIRSLIDER_TEXTDOMAIN),
			'slider_duplicate' => __('Slider has been duplicated successfully.', AIRSLIDER_TEXTDOMAIN),
			'slider_duplicate_error' => __('Something went wrong during duplicate slider!', AIRSLIDER_TEXTDOMAIN),
			'slide_save' => __('Slide has been saved successfully.', AIRSLIDER_TEXTDOMAIN),
			'slide_error' => __('Something went wrong during save slide!', AIRSLIDER_TEXTDOMAIN),
			'slide_delete' => __('Slide has been deleted successfully.', AIRSLIDER_TEXTDOMAIN),
			'slide_delete_error' => __('Something went wrong during delete slide!', AIRSLIDER_TEXTDOMAIN),
			'slide_update_position_error' => __('Something went wrong during update slides position!', AIRSLIDER_TEXTDOMAIN),
			'slide_delete_confirm' => __('The slide will be deleted. Are you sure?', AIRSLIDER_TEXTDOMAIN),
			'slide_delete_just_one' => __('You can not delete this. You must have at least one slide.', AIRSLIDER_TEXTDOMAIN),
			'slider_delete_confirm' => __('The slider will be deleted. Are you sure?', AIRSLIDER_TEXTDOMAIN),
			'slider_duplicate_confirm' => __('The slider will be duplicated. Are you sure?', AIRSLIDER_TEXTDOMAIN),
			'text_element_default_html' => __('Text element', AIRSLIDER_TEXTDOMAIN),
			'element_no_found_txt' => __('No element found.', AIRSLIDER_TEXTDOMAIN),
			'slide_stop_preview' => __('Stop Preview', AIRSLIDER_TEXTDOMAIN),
			'youtube_video_title' => __('Youtube Video', AIRSLIDER_TEXTDOMAIN),
			'video_not_found' => __('Video does not exists.', AIRSLIDER_TEXTDOMAIN),
			'html5_video_title' => __('Html5 Video', AIRSLIDER_TEXTDOMAIN),
			'AirPluginUrl' => plugins_url().'/airslider',
		);
		wp_localize_script('airslider-admin', 'airslider_translations', $airslider_translations);
	}

}?>