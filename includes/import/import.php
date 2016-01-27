<?php
require_once('class.wordpress-importer.php');

//Call default import function
$aios_import = new WP_Import();
$content_import = array();
set_time_limit(0);

//print_r($_POST['datas']);
$aios_content = '';

if(isset($_FILES['flImport']) && $_FILES['flImport']['error'] == '4') {
    echo "no file selected";
}
else if(isset($_FILES['flImport']))
{
    $output = true;
    if (ini_get('allow_url_fopen')) {
        $aios_file_method = 'fopen';
    } else {
        $aios_file_method = 'file_get_contents';
    }
    if ($aios_file_method == 'fopen') {
        $aios_handle = fopen($_FILES['flImport']['tmp_name'], 'rb');

        if ($aios_handle !== false) {
            while (!feof($aios_handle)) {
                $aios_content .= fread($aios_handle, 8192);
            }
            fclose($aios_handle);
        }
        $file_content = $aios_content;
    } else {
        $file_content = file_get_contents($_FILES['flImport']['tmp_name']);
    }
    if ($file_content) {
        $unserialized_content = unserialize(base64_decode($file_content));
        if ($unserialized_content) {
            $content_import = $unserialized_content;
        }
    } else {
//    $this->message = __("File is empty.\n", "solwinframework");
    }
    if (!empty($content_import)) {
        
       
        $table_name = $wpdb->prefix . 'air_sliders';
        
        //Get total slider count
        $totalSlider = $wpdb->get_var( "SELECT COUNT(*) FROM $table_name" );
        
        //change the name of slider before copy
        $slider_name = 'Slider'.($totalSlider+1);
        $slider_alias = 'slider'.($totalSlider+1);

        
        $output = $wpdb->insert(
                $table_name,
                array(
                    'name' => $slider_name,
                    'alias' => $slider_alias,
                    'slider_option' => $content_import['slider_detail'][0]['slider_option'],
                )
        );
        if($output !== false){
           $last_inserted_id = $wpdb->insert_id;
            $slides_options = array();
            $place_holders = array();
            $slides_table_name = $wpdb->prefix . 'air_slides';
            
            if(isset($content_import['slides_detail']) && count($content_import['slides_detail']) > 0){
                $query = "INSERT INTO " . $slides_table_name . " (slider_parent, position, params, layers) VALUES ";
                
                foreach ($content_import['slides_detail'] as $single_slide) {
                    array_push($slides_options, $last_inserted_id, $single_slide['position'], $single_slide['params'], $single_slide['layers']);
                    $place_holders[] = "('%d', '%d', '%s', '%s')";
                }
                
                $query .= implode(', ', $place_holders);
                $wpdb->query( $wpdb->prepare("$query ", $slides_options));
            }
        }
    }
}