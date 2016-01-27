<?php

class AirsliderTables {

        /**
         * Update the current Air Animation Slider version in the database
        */
	public static function airsliderSetVersion() {
		update_option('airslider_version', AS_VERSION);
	}

        /**
         * remove the current Air Animation Slider version from the database
        */
	public static function airsliderRemoveVersion() {
		delete_option('airslider_version');
	}

        /**
         * Creates or updates all the tables
        */
	public static function airsliderSetTables() {
		self::airsliderSetSlidersTable();
		self::airsliderSetSlidesElementsTable();
	}

        /**
         * Create slider table
        */
	public static function airsliderSetSlidersTable() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'air_sliders';

		$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		name TEXT CHARACTER SET utf8,
		alias TEXT CHARACTER SET utf8,
		slider_option LONGTEXT CHARACTER SET utf8,
		UNIQUE KEY id (id)
		);";
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}

        /**
         * Create slide table
        */
	public static function airsliderSetSlidesElementsTable() {
		global $wpdb;
		$table_name = $wpdb->prefix . 'air_slides';
		
		$sql = "CREATE TABLE $table_name (
		id mediumint(9) NOT NULL AUTO_INCREMENT,
		slider_parent mediumint(9),
		position INT,
		params LONGTEXT CHARACTER SET utf8,
		layers LONGTEXT CHARACTER SET utf8,
		UNIQUE KEY id (id)
		);";
		
		require_once(ABSPATH . 'wp-admin/includes/upgrade.php');
		dbDelta($sql);
	}

        /**
         * Drops all the slider tables
        */
	public static function airsliderDropTables() {
		global $wpdb;
		
		self::airsliderDropTable($wpdb->prefix . 'air_sliders');
		self::airsliderDropTable($wpdb->prefix . 'air_slides');
	}
        
        /**
         * Drops called the slider tables
         * 
         * @param string $table_name table name for drop
        */
	public static function airsliderDropTable($table_name) {
		global $wpdb;
		
		$sql = 'DROP TABLE ' . $table_name . ';';
		$wpdb->query($sql);
	}

}

?>