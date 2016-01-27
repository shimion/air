<?php
global $wpdb;

//Get the slider information
$sliders = $wpdb->get_results('SELECT * FROM ' . $wpdb->prefix . 'air_sliders');
?>

<!-- Display slider on home page -->
<table class="air-sliders-list air-table">
    <thead>
        <tr>
            <th colspan="5"><?php _e('Sliders List', AIRSLIDER_TEXTDOMAIN); ?></th>
        </tr>
    </thead>
    <tbody>
        <tr class="air-table-header">
            <td><?php _e('Sr. No.', AIRSLIDER_TEXTDOMAIN); ?></td>
            <td><?php _e('Name', AIRSLIDER_TEXTDOMAIN); ?></td>
            <td><?php _e('Alias', AIRSLIDER_TEXTDOMAIN); ?></td>
            <td><?php _e('Shortcode', AIRSLIDER_TEXTDOMAIN); ?></td>
            <td><?php _e('Actions', AIRSLIDER_TEXTDOMAIN); ?></td>
        </tr>
        <?php
        if (!$sliders) {
            echo '<tr>';
            echo '<td colspan="5">';
            _e('No Sliders found. Please add a new one.', AIRSLIDER_TEXTDOMAIN);
            echo '</td>';
            echo '</tr>';
        } else {
            $slider_cnt = 0;
            foreach ($sliders as $slider) {
                $slider_cnt++;
                echo '<tr>';
                echo '<td>' . $slider_cnt . '</td>';
                echo '<td><a href="?page=airslider&view=edit&id=' . $slider->id . '">' . $slider->name . '</a></td>';
                echo '<td>' . $slider->alias . '</td>';
                echo '<td>[airslider alias="' . $slider->alias . '"]</td>';
                echo '<td>
                        <a class="air-edit-slider air-button air-button air-is-success" href="?page=airslider&view=edit&id=' . $slider->id . '"><span class="dashicons dashicons-admin-generic mr5"></span>' . __('Settings', AIRSLIDER_TEXTDOMAIN) . '</a>
                        <a class="air-edit-slider air-button air-button air-is-primary" href="?page=airslider&view=edit&id=' . $slider->id . '#air-slides"><span class="dashicons dashicons-edit mr5"></span>' . __('Edit Slides', AIRSLIDER_TEXTDOMAIN) . '</a>
                        <a class="air-export-slider air-button air-button air-is-warning" href="?page=airslider&export=1&slider_id=' . $slider->id . '"><span class="dashicons dashicons-share-alt2 mr5"></span>' . __('Export Slider', AIRSLIDER_TEXTDOMAIN) . '</a>
                        <a class="air-delete-slider air-button air-button air-is-danger" href="javascript:void(0)" data-delete="' . $slider->id . '" title="Delete Slider"><span class="dashicons dashicons-trash"></span></a>
                        <a class="air-duplicate-slider air-button air-button air-is-secondary" href="javascript:void(0)" data-duplicate="' . $slider->id . '" title="Duplicate Slider"><span class="dashicons dashicons-format-gallery"></span></a>
                     </td>';
                echo '</tr>';
            }
        }
        ?>
    </tbody>
</table>


<!-- Create new slider -->
<a class="air-button air-is-primary air-add-slider" href="?page=airslider&view=add"><?php _e('Create New Slider', AIRSLIDER_TEXTDOMAIN); ?></a>
<!-- Import slider block -->
<div class="air-import-wrapper">
    <a href="javascript:void(0);" class="air-button air-is-success air-call-import-slider"><?php _e('Import Slider', AIRSLIDER_TEXTDOMAIN); ?></a>
    <div class="air-import-block">
        <form enctype="multipart/form-data" name="frmImport" id="frmImport" method="post">
            <input type="file" name="flImport" />
            <input name="sbtImport" type="submit" disabled="" class="air-button air-is-primary air-import-slider" value="<?php _e('Import Slider', AIRSLIDER_TEXTDOMAIN); ?>" />
        </form>
    </div>
</div>
