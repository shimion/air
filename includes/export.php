<?php
if (!function_exists('add_action')) {
    header('Status: 403 Forbidden');
    header('HTTP/1.1 403 Forbidden');
    exit();
}

class AirsliderExport {
    public $error_msg = '';
    
    /**
     * Call export slider function
    */
    function airsliderExport() {
        $this->airsliderExportSlider();
    }
    
    /**
     * export slider
    */
    function airsliderExportSlider()
    {
        global $wpdb;
        $slider_id = $_REQUEST['slider_id'];
        $this->data = array();
        
        $table_name = $wpdb->prefix.'air_sliders';
        $slides_table_name = $wpdb->prefix.'air_slides';
        
        //Get slider information
        $slider_detail = $wpdb->get_results("SELECT name,alias,slider_option FROM $table_name where id = $slider_id", ARRAY_A);
        if($slider_detail){
            
            $this->data['slider_detail'] = $slider_detail;
            
            //Get slide information
            $slides_detail = $wpdb->get_results("SELECT position,params,layers FROM $slides_table_name where slider_parent = $slider_id", ARRAY_A);
            if($slides_detail){
                $this->data['slides_detail'] = $slides_detail;
            }

            if( count($this->data) > 0 ) {
                $output = base64_encode(serialize($this->data));
                $slider_name = $slider_detail[0]['alias'];
                $export_file_name = "export_".$slider_name.".txt";
                $this->airsliderSaveAsTxtFile($export_file_name, $output);
            }
            else {
                $this->error_msg = 'Error in exporting.';
            }
        }    
        else 
        {
            $this->error_msg = 'Error in exporting.';
        }
    }

    /**
     * Generate text file for export
    */
    function airsliderSaveAsTxtFile($file_name, $output) {
        header("Content-type: application/text", true, 200);
        header("Content-Disposition: attachment; filename=$file_name");
        header("Pragma: no-cache");
        header("Expires: 0");
        echo $output;
        exit;
    }
}

$my_AirsliderExport = new AirsliderExport();