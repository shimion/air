/**
             * Allow to write only integer
             * 
             * @param {object} character code
             * 
             * @return {boolean} status of key valid or not
            */
            function isNumberKey(evt)
            {
                var charCode = (evt.which) ? evt.which : event.keyCode;
                if (charCode > 31 && (charCode < 48 || charCode > 57))
                {
                    return false;
                }
                else
                {
                    return true;
                }

            }
(function($) {
	$(window).load(function() {
            
            /**
             * Convert Hex o rgb
             * 
             * @param {string} hex color in hex
             * 
             * @param {string} opacity opacity of color
             * 
             * @return {string} rgba color
            */
            function  airsliderConvertHex(hex,opacity){
                hex = hex.replace('#','');
                var r = parseInt(hex.substring(0,2), 16);
                var g = parseInt(hex.substring(2,4), 16);
                var b = parseInt(hex.substring(4,6), 16);
                if($.trim(opacity) == '')
                {
                    opacity = '100';
                }
                opacity = parseInt($.trim(opacity));
                var result = 'rgba('+r+','+g+','+b+','+opacity/100+')';
                return result;
            }
            
            /**
             * Convert rgb to Hex
             * 
             * @param {string} color color in rgb
             * 
             * @return {string} hex color
            */
            function  airsliderRGBToHex(color) {
                if (color.substr(0, 1) === "#") {
                    return color;
                }
                var nums = /(.*?)rgb\((\d+),\s*(\d+),\s*(\d+)\)/i.exec(color),
                    r = parseInt(nums[2], 10).toString(16),
                    g = parseInt(nums[3], 10).toString(16),
                    b = parseInt(nums[4], 10).toString(16);
                return "#"+ (
                    (r.length == 1 ? "0"+ r : r) +
                    (g.length == 1 ? "0"+ g : g) +
                    (b.length == 1 ? "0"+ b : b)
                );
            }

            /**
             * Intialize color picker 
            */
            $('.air-admin .air-slider #air-slider-settings .ad-s-setting-content .air-slider-background-type-color-picker-input').wpColorPicker({
                    // a callback to fire whenever the color changes to a valid color
                    change: function(event, ui){
                            // Change only if the color picker is the user choice
                    },
                    // a callback to fire when the input is emptied or an invalid color
                    clear: function() {},
                    // hide the color picker controls on load
                    hide: true,
                    // show a group of common colors beneath the square
                    // or, supply an array of colors to customize further
                    palettes: true
            });
            
            /**
             * Onclick on color picker radio will be selected
            */
            $('.air-admin .air-slider #air-slider-settings .ad-s-setting-content .wp-picker-container').on('click',function(){
                var btn = $(this);
                btn.closest('.air-content').find('input[name="air-slider-background-type-color"][value="1"]').prop('checked',true);
            });
            
            /**
             * Run tabs
            */
            $('.air-tabs').tabs({
                    history: true,
                    show: function(event, ui) {
                            var $target = $(ui.panel);
                            if(target.hasClass('air-tabs-fade')) {
                                    $('.content:visible').effect(
                                            'explode',
                                            {},
                                            1500,
                                            function(){
                                                    $target.fadeIn(300);
                                            }
                                    );
                            }
                    }
            });
            
            /**
             * Run draggables
            */
            airsliderDraggableElements();
		
            if($('#air-slider-shortcode').html()!=''){
                $('#air-slider-shortcode').select();
            }
            /**
             * Display success message block    
            */
            function  airsliderShowMsg(msg,type) {
                if($.trim(msg)!=''){
                    $.bootstrapGrowl($.trim(msg), {
                    ele: 'body', // which element to append to
                    type: type, // (null, 'info', 'error', 'success')
                    offset: {from: 'top', amount: 50}, // 'top', or 'bottom'
                    align: 'right', // ('left', 'right', or 'center')
                    width: 350, // (integer, or 'auto')
                    delay: 8000, // Time while the message will be displayed. It's not equivalent to the *demo* timeOut!
                    allow_dismiss: true, // If true then will display a cross to close the popup.
                    stackup_spacing: 10 // spacing between consecutively stacked growls.
                  });
                  $("html, body").animate({ scrollTop: 0 }, "slow");
              }
            }
            /*************/
            /** SLIDERS **/
            /*************/
		
            
            /**
             * Set alias, shortcode and php function
            */
            $('.air-slider').find('#air-slider-name').on('keyup change',function() {
                    var alias = airsliderGetAlias();
                    var shortcode = '';
                    shortcode += '[airslider alias="';
                    shortcode += alias;
                    shortcode += '"]';
                    var phpfunction = '';
                    phpfunction += 'if(function_exists("airslider")) airslider("';
                    phpfunction += alias;
                    phpfunction += '");';
                    if(alias != '') {
                            $('.air-slider').find('#air-slider-alias').html(alias);
                            $('.air-slider').find('#air-slider-shortcode').html(shortcode);
                            $('.air-slider').find('#air-slider-php-function').html(phpfunction);
                            $(this).css('border','1px solid #ddd');
                    }
                    else {
                            $('.air-slider').find('#air-slider-alias').html('');
                            $('.air-slider').find('#air-slider-shortcode').html('');
                            $('.air-slider').find('#air-slider-php-function').html('');
                    }
            });

            /**
             * Get the alias starting form the name
            */
            function  airsliderGetAlias() {
                    var slider_name = $('.air-slider').find('#air-slider-name').val();
                    var slider_alias = slider_name.toLowerCase();
                    slider_alias = slider_alias.replace(/ /g, '_');
                    return slider_alias;
            }
            
            /**
             * Display import block
            */
            $('.air-admin .air-home').on('click', '.air-call-import-slider', function() {
                if($('.air-import-block').css('display') == 'none'){
                    $('.air-import-block').show();
                }
                else
                {
                    $('.air-import-block').hide();
                }
            });
            
            /**
             * Check file is exist or not and check its type
             */
            $('.air-admin .air-home').on('change', 'input[name="flImport"]', function() {
                var filename = $(this).val();
                if(filename!=''){
                    if(filename.split('.').pop().toLowerCase() == 'txt')
                    {
                        $('.air-import-slider').removeAttr('disabled');
                    }
                    else
                    {
                        $('.air-import-slider').attr('disabled','disabled');
                        airsliderShowMsg(airslider_translations.slider_import_type,'danger');
                    }
                }
                else
                {
                    $('.air-import-slider').attr('disabled','disabled');
                    airsliderShowMsg(airslider_translations.slider_import_no_file,'danger');
                }
            });
            
            /**
             * Select slider setting tab to display slider setting block
             */
            $('.air-admin').on('click', '.air-slider-setting-tab', function() {
                $('.air-slider-setting-tab').removeClass('air-is-active');
                $(this).addClass('air-is-active');
                $('.air-slider-setting-block').hide();
                $($(this).attr('data-slider-tab')).css('display','table');
            });
		
            /**
             *  Set active class to current clicked button
             */    
            $('.air-admin').on('click', '.air-slider-tabs a', function() {
                $('.air-slider-tabs').find('a').removeClass('air-is-active');
                $(this).addClass('air-is-active');
            });
            /************/
            /** SLIDES **/
            /************/
		
            
            var slides_number = $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').length - 1;
            // Run sortable
            var slide_before; // Contains the index before the sorting
            var slide_after; // Contains the index after the sorting
            
            /**
             * Set sortable
            */
            $('.air-slide-tabs .air-sortable').sortable({
                    items: 'li:not(.ui-state-disabled)',
                    cancel: '.ui-state-disabled',

                    // Store the actual index
                    start: function(event, ui) {
                            slide_before = $(ui.item).index();
                    },

                    // Change the .air-slide order based on the new index and rename the tabs
                    update: function(event, ui) {
                            // Store the new index
                            slide_after = $(ui.item).index();

                            // Change the slide position
                            var slide = $('.air-admin #air-slides .air-slides-list .air-slide:eq(' + slide_before + ')');			
                            var after = $('.air-admin #air-slides .air-slides-list .air-slide:eq(' + slide_after + ')');			
                            if(slide_before < slide_after) {
                                    slide.insertAfter(after);
                            }
                            else {
                                    slide.insertBefore(after);
                            }

                            // Rename all the tabs
                            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').each(function() {
                                    var temp = $(this);
                                    if(!temp.find('a').hasClass('air-add-new')) {
                                            temp.find('a').html(airslider_translations.slide + ' <span class="air-slide-index">' + (temp.index() + 1) + '</span><span class="dashicons dashicons-dismiss air-close"></span>');
                                    }
                            });
                    }
            });
            $('.air-slide-tabs .air-sortable li').disableSelection();
		
            /**
             * Show the slide when clicking on the link
            */
            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li a').live('click', function() {
                    $('.air-live-preview').each(function(){
                        var btn = $(this)
                        var slide_parent = btn.closest('.air-slide');
                        if(btn.hasClass('air-live-preview-running')) {
                            btn.removeClass('air-live-preview-running');
                            btn.html('<span class="dashicons dashicons-search"></span>');
                            airsliderStopLivePreview(slide_parent);
                        }
                    });
                    // Do only if is not click add new
                    if($(this).parent().index() != slides_number) {
                            // Hide all tabs
                            $('.air-admin #air-slides .air-slides-list .air-slide').css('display', 'none');
                            var tab = $(this).parent().index();
                            $('.air-admin #air-slides .air-slides-list .air-slide:eq(' + tab + ')').css('display', 'block');

                            // Active class
                            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').removeClass('active');
                            $(this).parent().addClass('active');
                            
                            if(!$(this).hasClass('air-add-new')){
                                $('.air-slide-tab').find('a').removeClass('air-is-active');
                                $(this).addClass('air-is-active');
                            }
                    }
            });
            
            /**
             * Show the slide when clicking on the link
            */
            $('.air-element-pro-tab ul.air-element-pro-tab-ul li a').live('click', function() {
                    var slide_parent = $(this).closest('.air-slide');
                    $(slide_parent).find('.air-element-type-block').hide();
                    $(slide_parent).find('li').removeClass('active');
                    $(slide_parent).find('li').find('a').removeClass('air-is-active');
                    $(slide_parent).find($(this).attr('data-href')).show();
                    $(this).parent().addClass('active');
                    $(this).addClass('air-is-active');
            });
            
            /**
              * On load check which tab is selected then assign active class
              */  
             if(window.location.hash) {
                //set the value as a variable, and remove the #
                var hash_value = window.location.hash;
                $('.air-slider-tabs li').find('a').each(function(){
                    if($(this).attr('href') == $.trim(hash_value)){
                        $('.air-slider-tabs li').find('a').removeClass('air-is-active');
                        $(this).addClass('air-is-active');
                    }
                });
                
            }
		
            /**
             * Add new slide
            */
            function  airsliderAddSlide() {

                    var add_btn = $('.air-admin #air-slides .air-add-new');
                    
                    $('.air-slide-tab').find('a').removeClass('air-is-active');

                    var void_slide = $('.air-admin #air-slides .air-void-slide').html();
                    // Insert the link at the end of the list
                    add_btn.parent().before('<li class="ui-state-default"><a class="air-button air-is-navy air-is-active">' + airslider_translations.slide + ' <span class="air-slide-index">' + (slides_number + 1) + '</span><span class="dashicons dashicons-dismiss air-close"></span></a></li>');
                    // jQuery UI tabs are not working here. For now, just use a manual created tab
//                    $('.air-admin #air-slides .air-slide-tab').tabs('refresh');
                    // Create the slide
                    $('.air-admin #air-slides .air-slides-list').append('<div class="air-slide">' + void_slide + '</div>');
                    slides_number++;

                    // Open the tab just created
                    var tab_index = add_btn.parent().index() - 1;
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(tab_index).find('a').click();

                    // Active class
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').removeClass('active');
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(tab_index).addClass('active');

                    // Set editing area sizes
                    airsliderSetSlidesEditingAreaSizes();

                    airsliderSlidesColorPicker();
            }
            
            
            /**
             * Set correct size for the editing area
            */
            function  airsliderSetSlidesEditingAreaSizes() {
                    var width = parseInt($('.air-admin #air-slider-settings .air-slider-settings-list #air-slider-startWidth').val());
                    var height = parseInt($('.air-admin #air-slider-settings .air-slider-settings-list #air-slider-startHeight').val());

                    $('.air-admin #air-slides .air-slide .air-slide-editing-area').css({
                            'width' : width,
                            'height' : height,
                    });

//                    $('.air-admin').css({
//                            'width' : width,
//                    });
            }
                
            /**
             * Add slide new on click
            */
            $('.air-admin #air-slides .air-add-new').click(function() {
                    airsliderAddSlide();
            });	
            
            /**
             * Also add a new slide if slides_number == 0
            */
            if(slides_number == 0) {
                    airsliderAddSlide();
            }
            else {
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(0).find('a').click();
            }
		
            /**
             * Delete slide
            */
            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li .air-close').live('click', function() {
                    var del_slide_index = $(this).closest('li').index();
                    var del_slide_id = $('.air-slide:eq('+del_slide_index+')').find('.air-save-slide').attr('data-slide-id');
                    if($('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').length <= 2) {
                            airsliderShowMsg(airslider_translations.slide_delete_just_one,'danger');
                            return;
                    }

                    var confirm = window.confirm(airslider_translations.slide_delete_confirm);
                    if(!confirm) {
                            return;
                    }

                    slides_number--;

                    var slide_index = $(this).closest('li').index();

                    // If is deleting the current viewing slide, set the first as active
//                    if($('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(slide_index).hasClass('active') && slides_number != 0) {
//                            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(0).addClass('active');
//                            
//                            $('.air-slide-tab').find('a').removeClass('air-is-active');
//                            $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li:eq(0) a').addClass('air-is-active');
//                            $('.air-admin #air-slides .air-slides-list .air-slide').css('display', 'none');
//                            $('.air-admin #air-slides .air-slides-list .air-slide').eq(0).css('display', 'block');			
//                    }

                    // Remove the anchor
//			$(this).parent().remove();
                    $(this).closest('li').remove();
                    // Remove the slide itself
                    $('.air-admin #air-slides .air-slides-list .air-slide').eq(slide_index).remove();

                    // Scale back all the slides text
                    for(var i = slide_index; i < slides_number; i++) {
                            var slide = $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(i);
                            var indx = parseInt(slide.find('.air-slide-index').text());
                            slide.find('.air-slide-index').text(indx - 1);
                    }
                    
                    
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').removeClass('active');
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li').eq(0).addClass('active');
                            
                    $('.air-slide-tab').find('a').removeClass('air-is-active');
                    $('.air-admin #air-slides .air-slide-tabs ul.air-sortable li:eq(0) a').addClass('air-is-active');
                    $('.air-admin #air-slides .air-slides-list .air-slide').css('display', 'none');
                    $('.air-admin #air-slides .air-slides-list .air-slide').eq(0).css('display', 'block');		
                    
                    airsliderDeleteSlide(del_slide_id);
            });
		
            airsliderSlidesColorPicker();
		
            /**
             * Run background color picker
            */
            function  airsliderSlidesColorPicker() {
                    $('.air-admin #air-slides .air-slides-list .air-slide-settings-list .air-slide-background-type-color-picker-input').wpColorPicker({
                            // a callback to fire whenever the color changes to a valid color
                            change: function(event, ui){
                                    // Change only if the color picker is the user choice
                                    var btn = $(this);
                                    if(btn.closest('.air-content').find('input[name="air-slide-background-type-color"]:checked').val() == '1') {
                                            var area = btn.closest('.air-slide').find('.air-elements .air-slide-editing-area');
                                            var opacity_per = $.trim(btn.closest('.air-content').find('.air-slide-background-opacity').val());
                                            area.css('background-color', airsliderConvertHex(ui.color.toString(),opacity_per));
                                    }
                            },
                            // a callback to fire when the input is emptied or an invalid color
                            clear: function() {},
                            // hide the color picker controls on load
                            hide: true,
                            // show a group of common colors beneath the square
                            // or, supply an array of colors to customize further
                            palettes: true
                    });
            }
            
            /**
             * Onclick on color picker radio will be selected
            */
            $('.air-admin #air-slides .air-slides-list .air-slide-settings-list .wp-picker-container').on('click',function() {
                var btn = $(this);
                btn.closest('.air-content').find('input[name="air-slide-background-type-color"][value="1"]').prop('checked',true);
            });
            
            /**
             * Set background color (transparent or color-picker)
            */
            $('.air-admin #air-slides').on('change', '.air-slides-list .air-slide-settings-list input[name="air-slide-background-type-color"]:radio', function() {
                    var btn = $(this);
                    var area = btn.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    if(btn.val() == '0') {
                            area.css('background-color', '#fff');
                    }
                    else {
                            var color_picker_value = btn.closest('.air-content').find('.wp-color-result').css('background-color');
                            var opacity_per = $.trim(btn.closest('.air-content').find('.air-slide-background-opacity').val());
                            area.css('background-color', airsliderConvertHex(airsliderRGBToHex(color_picker_value),opacity_per));
                    }
            });
            
            /**
             * Set background color (transparent or color-picker)
            */
            $('.air-admin #air-slides').on('keyup', '.air-slides-list .air-slide-settings-list .air-slide-background-opacity', function() {
                    var curr = $(this);
                    var opacity_per = '100';
                    var area = curr.closest('.air-slide').find('.air-elements .air-slide-editing-area');
                    if(curr.closest('.air-content').find('input[name="air-slide-background-type-color"]:checked').val() == '1') {
                        if($.trim(curr.val()) != '') {
                               opacity_per = $.trim(curr.val());
                        }
                        var color_picker_value = curr.closest('.air-content').find('.wp-color-result').css('background-color');
                        area.css('background-color', airsliderConvertHex(airsliderRGBToHex(color_picker_value),opacity_per));
                    }    
            });
		
            /**
             * Set background image (none or image)
            */
            $('.air-admin #air-slides').on('change', '.air-slides-list .air-slide-settings-list input[name="air-slide-background-type-image"]:radio', function() {
                    var btn = $(this);
                    var area = btn.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    if(btn.val() == '0') {
                            area.css('background-image', 'none');
                    }
                    else {
                            var slide_parent = $(this).closest('.air-slide');
                            airsliderAddSlideImageBackground(slide_parent);
                    }
            });

            /**
             * Select option for loader
            */
            $('.air-admin .air-slider').on('change', '#air-slider-settings .ad-s-setting-content input[name=air-slide-loader-image]', function() {
                if($(this).val() == 0){
                    $('.air-slider-loader-type-image-upload-button').attr('data-src','');
                    $('.air-slider-loader-type-image-upload-button').attr('data-width','');
                    $('.air-slider-loader-type-image-upload-button').attr('data-height','');
                    $('.air-loader-list-wrapper').show();
                }
                else
                {
                    $('.air-slider-default_loader').attr('data-loader-class','loader1');
                    $('.air-loader-list td').removeClass('active');
                    $('.air-loader-list td:eq(0)').addClass('active');
                    $('.air-loader-list-wrapper').hide();
                    var slide_parent = $(this).closest('.air-slider-settings-list');
                    airsliderAddSliderLoaderImage(slide_parent);
                }
            });
            
            /**
             * Set default loader image
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-slider-default_loader', function(event) {
                if($(this).closest('.air-content').find('input[name=air-slide-loader-image]:checked').val() == 0)
                {
                    if($('.air-loader-list-wrapper').css('display') == 'none')
                    {
                        $('.air-default-option-wrapper').hide();
                        $('.air-loader-list-wrapper').show();
                    }
                    else
                    {
                        $('.air-loader-list-wrapper').hide();    
                    }
                }
                else
                {
                    $(this).closest('.air-content').find('input[name=air-slide-loader-image]').prop('checked',false);
                    $(this).closest('.air-content').find('input[name=air-slide-loader-image][value="0"]').prop('checked',true);
                    $(this).closest('.air-content').find('input[name=air-slide-loader-image][value="0"]').trigger('change');
                }
            });
            
            
            /**
             * Select deault loader from given list
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-loader-list tr td', function() {
                $('.air-loader-list tr td').removeClass('active');
                $(this).addClass('active');
                var image_class = $(this).find('img').attr('data-loader-class');
                
                $(this).closest('.air-content').find('.air-slider-default_loader').attr('data-loader-class',image_class);
            });
            
            /**
             * Set Loader image (the upload function)
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .ad-s-setting-content .air-slider-loader-type-image-upload-button', function() {
                    var btn = $(this);
                    if(btn.closest('.air-content').find('input[name="air-slide-loader-image"]:checked').val() == '1') {
                            var slide_parent = $(this).closest('.air-slider-settings-list');
                            airsliderAddSliderLoaderImage(slide_parent);
                    }
                    else
                    {
                        
                        $(this).closest('.air-content').find('input[name=air-slide-loader-image][value="1"]').prop('checked',true);
                        btn.closest('.air-content').find('input[name="air-slide-loader-image"][value="1"]').trigger('change');
                    }
            });
            
            /**
             * upload loader image
             * 
             * @param {object} slider_parent parent class
            */
            function  airsliderAddSliderLoaderImage(slide_parent) {
                    // Upload
                    var file_frame;

                    // If the media frame already exists, reopen it.
                    if ( file_frame ) {
                      file_frame.open();
                      return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.file_frame = wp.media({
                      title: jQuery( this ).data( 'uploader_title' ),
                      button: {
                            text: jQuery( this ).data( 'uploader_button_text' ),
                      },
                      multiple: false  // Set to true to allow multiple files to be selected
                    });

                    // When an image is selected, run a callback.
                    file_frame.on( 'select', function() {
                      // We set multiple to false so only get one image from the uploader
                      attachment = file_frame.state().get('selection').first().toJSON();

                      // Do something with attachment.id and/or attachment.url here
                      var image_src = attachment.url;
                      var image_alt = attachment.alt;
                      var image_width = attachment.width;
                      var image_height = attachment.height;
                      slide_parent.find('.air-slider-loader-type-image-upload-button').data('src',image_src);
                      slide_parent.find('.air-slider-loader-type-image-upload-button').data('width',image_width);
                      slide_parent.find('.air-slider-loader-type-image-upload-button').data('height',image_height);
                    });

                    // Finally, open the modal
                    file_frame.open();	
            }
            
            /**
             * Select option for shadow
            */
            $('.air-admin .air-slider').on('change', '#air-slider-settings .ad-s-setting-content input[name=air-slide-shadow]', function() {
                if($(this).val() == 1){
                    $('.air-shadow-list-wrapper').show();
                }
                else
                {
                    $('.air-shadow-list-wrapper').hide();
                }
            });
            
            /**
             * Set default loader image
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-slider-default_shadow', function(event) {
                if($(this).closest('.air-content').find('input[name=air-slide-shadow]:checked').val() == 1)
                {
                    if($('.air-shadow-list-wrapper').css('display') == 'none')
                    {
                        $('.air-default-option-wrapper').hide();
                        $('.air-shadow-list-wrapper').show();
                    }
                    else
                    {
                        $('.air-shadow-list-wrapper').hide();    
                    }
                }
                else
                {
//                    $('.air-shadow-list-wrapper').hide();
                    $(this).closest('.air-content').find('input[name=air-slide-shadow][value="1"]').prop('checked',true);
                    $(this).closest('.air-content').find('input[name=air-slide-shadow][value="1"]').trigger('change');
                }
            });
            
            
            /**
             * Select deault loader from given list
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-shadow-list tr td', function() {
                $('.air-shadow-list tr td').removeClass('active');
                $(this).addClass('active');
                var image_class = $(this).find('img').attr('data-shadow-class');
                
                $(this).closest('.air-content').find('.air-slider-default_shadow').attr('data-shadow-class',image_class);
            });
            
            /**
             * Check whether to display control list or not
            */
            $('.air-admin .air-slider').on('change', '#air-slider-settings #air-slider-showControls', function() {
                if($(this).val() == 1){
                    $('.air-controls-block').show();
                }
                else
                {
                    $('.air-controls-block').hide();
                }
            });
            
            /**
             * Set default controls image
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-slider-default-controls', function() {
                if($('.air-control-list-wrapper').css('display') == 'none')
                {
                    $('.air-default-option-wrapper').hide();
                    $('.air-control-list-wrapper').show();
                }
                else
                {
                    $('.air-control-list-wrapper').hide();    
                }
            });
            
            /**
             * Select deault controls from given list
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-control-list tr td', function() {
                $('.air-control-list tr td').removeClass('active');
                $(this).addClass('active');
                var image_class = $(this).find('img').attr('data-control-class');
                
                $(this).closest('.air-content').find('.air-slider-default-controls').attr('data-control-class',image_class);
            });
            
            /**
             * Check whether to display navigation list or not
            */
            $('.air-admin .air-slider').on('change', '#air-slider-settings #air-slider-showNavigation', function() {
                if($(this).val() == 1){
                    $('.air-navigation-block').show();
                }
                else
                {
                    $('.air-navigation-block').hide();
                }
            });
            
            /**
             * Set default navigation image
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-slider-default-navigation', function(event) {
                if($('.air-navigation-list-wrapper').css('display') == 'none')
                {
                    $('.air-default-option-wrapper').hide();
                    $('.air-navigation-list-wrapper').show();
                }
                else
                {
                    $('.air-navigation-list-wrapper').hide();    
                }
            });
            
            
            /**
             * Select deault navigation from given list
            */
            $('.air-admin .air-slider').on('click', '#air-slider-settings .air-navigation-list tr td', function() {
                $('.air-navigation-list tr td').removeClass('active');
                $(this).addClass('active');
                var image_class = $(this).find('img').attr('data-navigation-class');
                
                $(this).closest('.air-content').find('.air-slider-default-navigation').attr('data-navigation-class',image_class);
            });
            
            /**
             * Check whether to display navigation or not
            */
            $('.air-admin .air-slider').on('change', '#air-slider-settings #air-slider-showTimerBar', function() {
                if($(this).val() == 1){
                    $('.air-progress-bar-block').show();
                }
                else
                {
                    $('.air-progress-bar-block').hide();
                }
            });
            
            /**
             * Set Background image (the upload function)
            */
            $('.air-admin #air-slides').on('click', '.air-slides-list .air-slide-settings-list .air-slide-background-type-image-upload-button', function() {
                    var btn = $(this);
                    if(btn.closest('.air-content').find('input[name="air-slide-background-type-image"]:checked').val() == '1') {
                            var slide_parent = $(this).closest('.air-slide');
                            airsliderAddSlideImageBackground(slide_parent);
                    }
                    else
                    {
                        btn.closest('.air-content').find('input[name="air-slide-background-type-image"][value="1"]').prop('checked',true);
                        btn.closest('.air-content').find('input[name="air-slide-background-type-image"][value="1"]').trigger('change');
                    }
            });
            
            /**
             * upload slider background image
             * 
             * @param {object} slider_parent parent object
            */
            function  airsliderAddSlideImageBackground(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');

                    // Upload
                    var file_frame;

                    // If the media frame already exists, reopen it.
                    if ( file_frame ) {
                      file_frame.open();
                      return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.file_frame = wp.media({
                      title: jQuery( this ).data( 'uploader_title' ),
                      button: {
                            text: jQuery( this ).data( 'uploader_button_text' ),
                      },
                      multiple: false  // Set to true to allow multiple files to be selected
                    });

                    // When an image is selected, run a callback.
                    file_frame.on( 'select', function() {
                      // We set multiple to false so only get one image from the uploader
                      attachment = file_frame.state().get('selection').first().toJSON();

                      // Do something with attachment.id and/or attachment.url here
                      var image_src = attachment.url;
                      
                      // Set background
                      area.css('background-image', 'url("' + image_src + '")');
                      // I add a data with the src because, is not like images (when there is only the src link), the background contains the url('') string that is very annoying when we will get the content
                      area.data('background-image-src', image_src);
                    });

                    // Finally, open the modal
                    file_frame.open();	
            }

            /**
             * Background propriety: repeat or no-repeat
            */
            $('.air-admin #air-slides').on('change', '.air-slides-list .air-slide-settings-list input[name="air-slide-background-repeat"]:radio', function() {
                    var btn = $(this);
                    var area = btn.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    if(btn.val() == '0') {
                            area.css('background-repeat', 'no-repeat');
                    }
                    else {
                            area.css('background-repeat', 'repeat');
                    }
            });

            /**
             * Background propriety: positions x 
            */
            $('.air-admin #air-slides').on('keyup', '.air-slides-list .air-slide-settings-list .air-slide-background-propriety-position-x', function() {
                    var text = $(this);
                    var val = text.val();
                    var area = text.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    area.css('background-position-x', val);		
            });
            
            /**
             * Background propriety: positions y
            */
            $('.air-admin #air-slides').on('keyup', '.air-slides-list .air-slide-settings-list .air-slide-background-propriety-position-y', function() {
                    var text = $(this);
                    var val = text.val();
                    var area = text.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    area.css('background-position-y', val);		
            });

            /**
             * Background propriety: size
            */
            $('.air-admin #air-slides').on('keyup', '.air-slides-list .air-slide-settings-list .air-slide-background-propriety-size', function() {
                    var text = $(this);
                    var val = text.val();
                    var area = text.closest('.air-slide').find('.air-elements .air-slide-editing-area');

                    area.css('background-size', val);		
            });

            /**
             * Apply custom CSS
            */
            $('.air-admin #air-slides').on('keyup', '.air-slides-list .air-slide-settings-list .air-slide-custom-css', function() {
                    var text = $(this);
                    var area = text.closest('.air-slide').find('.air-elements .air-slide-editing-area');
                    var css = text.val();

                    // Save current styles
                    var width = area.css('width');
                    var height = area.css('height');
                    var background_image = area.css('background-image');
                    var background_color = area.css('background-color');
                    var background_position_x = area.css('background-position-x');
                    var background_position_y = area.css('background-position-y');
                    var background_repeat = area.css('background-repeat');
                    var background_size = area.css('background-size');

                    // Apply CSS
                    area.attr('style', css);
                    area.css({
                            'width' : width,
                            'height' : height,
                            'background-image' : background_image,
                            'background-color' : background_color,
                            'background-position-x' : background_position_x,
                            'background-position-y' : background_position_y,
                            'background-repeat' : background_repeat,
                            'background-size' : background_size
                    });
            });		
            //DUPLICATE ELEMENT
            /**
             * Duplicate the selected element
             * 
             * @param {object} element selected element object
            */
            function  airsliderDuplicateElement(element) {

                    var index = element.index();
                    var slide_parent = element.closest('.air-slide');

                    element.clone().appendTo(element.parent());
                    var element_options = slide_parent.find('.air-elements-list .air-element-settings').eq(index);
                    var duplicateElement = element_options.clone();
                    duplicateElement.insertBefore(element_options.parent().find('.air-void-text-element-settings'));

                    airsliderDeselectElements();
                    
                    airsliderSelectElement(element.parent().find('.air-element').last());
                    
                    // change the video type name
                    var as_slide_index = $('.air-slide-tab li.active').index();
                    var slide_index = ( parseInt(as_slide_index) + 1);
                    var video_type_name = 'air-video-type-'+slide_index+'-'+slide_parent.find('.air-slide-editing-area').find('.air-element').length;
                    if($('.air-element-settings').hasClass('air-video-element-settings') && $('.air-element-settings').hasClass('active')){
                        $('.air-video-element-settings.active').find('.air-element-video-type').attr('name',video_type_name);
                    }

                    var prev_layer_class = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').attr('class');
                    var prev_layer_name = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').find('.air-ele-title').html();
                    var prev_delay_time = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').find('.air-delay-ele').val();
                    var prev_easein = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').find('.air-easein-ele').val();
                    var prev_easeout = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').find('.air-easeout-ele').val();
                    var prev_zindex = element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').find('.air-z-index-ele').val();
                    if(!element.closest('.air-slide').find('.air-ele-list:eq(' + index + ')').hasClass('active')){
                        prev_layer_class = prev_layer_class+' active';
                    }
                    if(slide_parent.find('.air-ele-time tbody').find('tr.air-no-record').length > 0){
                        slide_parent.find('.air-ele-time tbody').html('');
                    }
                    slide_parent.find('.air-ele-time tbody').append('<tr class="' + prev_layer_class + '"><td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td><td class="air-ele-title">'+ prev_layer_name +'</td><td><input type="text" value="' + prev_delay_time + '" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easein-ele air-txt-easein" type="text" value="' + prev_easein + '" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easeout-ele air-txt-easeout" type="text" value="' + prev_easeout + '" onkeypress="return isNumberKey(event);" /></td><td><input class="air-z-index-ele air-txt-z-index" type="number" value="' + prev_zindex + '" min="0" onkeypress="return isNumberKey(event);" /></td></tr>');
                    

                    // Clone fixes (Google "jQuery clone() bug")
                    var cloned_options = element.parent().find('.air-element').last().closest('.air-slide').find('.air-elements-list .air-element-settings.active');

                    cloned_options.find('.air-element-data-in').val(element_options.find('.air-element-data-in').val());
                    cloned_options.find('.air-element-data-out').val(element_options.find('.air-element-data-out').val());
                    cloned_options.find('.air-element-custom-css').val(element_options.find('.air-element-custom-css').val());			
                    if(element_options.hasClass('air-image-element-settings')) {
                            cloned_options.find('.air-image-element-upload-button').data('src', element_options.find('.air-image-element-upload-button').data('src'));	
                            cloned_options.find('.air-image-element-upload-button').data('alt', element_options.find('.air-image-element-upload-button').data('alt'));	
                    }

                    $('.air-slide:eq('+ as_slide_index +')').find('.air-elements-list').find('.air-element-video-type').each(function(){
                        var str = $(this).parent().html();
                        if (str.toLowerCase().indexOf("checked") > 0) {
                           $(this).prop('checked',true);
                        }
                    });
                    // Make draggable
                    airsliderDraggableElements();
                    
                    
                    
            }
            /**
             * By click on Duplicate Slide icon to call deulicate slide function
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-duplicate-slide', function() {
                    var slide_parent = $(this).closest('.air-slide');
                    airsliderDuplicateSlide(slide_parent);
            });
            
            /**
             * Duplicate the selected slide
             * 
             * @param {object} slide selected slide object
            */
            function  airsliderDuplicateSlide(slide) {
                    var index = slide.index();
                    var slide_parent = slide.closest('#air-slides');
                    var slide_clone = slide.clone();
                    
                    slide_clone.appendTo(slide_parent.find('.air-slides-list'));
                    
                    var add_new_slide_li = slide_parent.find('.air-add-new').closest('li');
                    var slide_tab = slide_parent.find('.air-slide-tab li').eq(index);
                    slide_tab.clone().insertBefore(add_new_slide_li);
                    
                    var second_last_slide_index = slide_parent.find('.air-slide-tab li').length-2;
                    slides_number++;
                    slide_parent.find('.air-slide-tab li:eq('+second_last_slide_index+')').find('.air-slide-index').html(slides_number);
                    slide_parent.find('.air-slide-tab li:eq('+second_last_slide_index+') a').trigger('click');
                    
                    // Make draggable
                    airsliderDraggableElements();
                    
                    //Change the video type name in next duplicate slide
                    var slide_index = slides_number;

                    var ele_cnt = 0;
                    $('.air-slide:eq('+ (slide_index-1) +')').find('.air-elements-list').find('.air-element-settings.air-video-element-settings').each(function(){
                        ele_cnt++;
                        $(this).find('.air-element-video-type').attr('name','air-video-type-'+slide_index+'-'+ele_cnt);
                    });
                    
                    
                    //Checked the video type after it duplicate
                    $('.air-slide:eq('+ index +')').find('.air-elements-list').find('.air-element-video-type').each(function(){
                        var str = $(this).parent().html();
                        if (str.toLowerCase().indexOf("checked") > 0) {
                           $(this).prop('checked',true);
                        }
                    });
                    $('.air-slide:eq('+ (slide_index-1) +')').find('.air-save-slide').attr('data-slide-id','0');
                    //reinitalize color picker after duplicate
                    if($('.air-slide:eq('+ (slide_index-1) +')').find('.wp-picker-container').length > 0){
                        $('.air-slide:eq('+ (slide_index-1) +')').find('.wp-picker-container').remove();
                        var color_picker_input = '<input class="air-slide-background-type-color-picker-input air-button air-is-default" type="text" value="'+ $('.air-slide:eq('+ index +')').find('.air-slide-background-type-color-picker-input').val() +'" />';
                        $('.air-slide:eq('+ (slide_index-1) +')').find('.air-slide-background-opacity').before(color_picker_input);
                        airsliderSlidesColorPicker();
                    }
            }    
            /**************/
            /** ELEMENTS **/
            /**************/

            // GENERAL

            /**
             * Make draggable
            */
            function  airsliderDraggableElements() {
                    $('.air-admin .air-elements .air-element').draggable({
                            'containment' : 'parent',

                            start: function() {
                                    // Select when dragging
                                    airsliderSelectElement($(this));
                            },

                            drag: function(){
                                    // Set left and top positions on drag to the textbox
                                    var position = $(this).position();
                                    var left = position.left;
                                    var top = position.top;
                                    var index = $(this).index();

                                    $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ') .air-element-data-left').val(left);
                                    $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ') .air-element-data-top').val(top);
                            },
                    });
            }

            /**
             * call select element function
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-slide-editing-area .air-element', function(e) {
                    // Do not click the editing-area
                    e.stopPropagation();

                    // Do not open links
                    e.preventDefault();

                    airsliderSelectElement($(this));
            });
            
            /**
             * Selects an element, shows its options and makes the delete element button available
             * 
             * @param {object} element selected element object
            */
            function  airsliderSelectElement(element) {
                    var index = element.index();
                    var slide = element.closest('.air-slide');		
                    var options = slide.find('.air-elements .air-elements-list');

                    // Hide all options - .active class
                    options.find('.air-element-settings').css('display', 'none');
                    options.find('.air-element-settings').removeClass('active');

                    // Show the correct options + .active class
                    options.find('.air-element-settings:eq(' + index + ')').css('display', 'block');
                    options.find('.air-element-settings:eq(' + index + ')').addClass('active');
                    options.find('.air-element-settings:eq(' + index + ')').find('.air-element-type-block').hide();
                    options.find('.air-element-settings:eq(' + index + ')').find('.air-element-pro-tab-ul li:nth-child(1) a').trigger('click');

                    // Add .active class to the element in the editing area
                    element.parent().children().removeClass('active');
                    element.addClass('active');

                    // Make the delete and the duplicate buttons working
                    slide.find('.air-elements-actions .air-delete-element').removeClass('air-is-disabled');
                    slide.find('.air-elements-actions .air-duplicate-element').removeClass('air-is-disabled');

                    $(element).closest('.air-elements').find('.air-ele-time').find('.air-ele-list').removeClass('active');
                    $(element).closest('.air-elements').find('.air-ele-time').find('.air-ele-list:eq(' + index + ')').addClass('active');
            }
            
            //ELEMENT TIMING BLOCK
            
            /**
             * Display Element Timing block
            */
            $( '.air-ele-time-btn' ).live('click',function(){
                var slide_parent = $(this).closest('.air-slide');
                slide_parent.find('.air-ele-time').fadeIn();
            });
            
            /**
             * Hide Element Timing block
            */
            $('.air-close-block').live('click', function(){
                $(this).parent().fadeOut();
            });
            
            /**
             * Change delay time layer wise
            */
            $('.air-admin').on('keyup', '.air-elements .air-ele-time .air-txt-delay-time', function() {
                    var index = $(this).closest('.air-ele-list').index();
                    var delay_element = $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ')').find('.air-element-data-delay');
                    delay_element.val($(this).val());
            });
            
            /**
             * Change Ease In layer wise
            */
            $('.air-admin').on('keyup', '.air-elements .air-ele-time .air-txt-easein', function() {
                    var index = $(this).closest('.air-ele-list').index();
                    var easein_element = $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ')').find('.air-element-data-easeIn');
                    easein_element.val($(this).val());
            });
            
            /**
             * Change Ease Out layer wise
            */
            $('.air-admin').on('keyup', '.air-elements .air-ele-time .air-txt-easeout', function() {
                    var index = $(this).closest('.air-ele-list').index();
                    var easeout_element = $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ')').find('.air-element-data-easeOut');
                    easeout_element.val($(this).val());
            });
            
            /**
             * Change z_index layer wise
            */
            $('.air-admin').on('keyup change click', '.air-elements .air-ele-time .air-txt-z-index', function() {
                    var index = $(this).closest('.air-ele-list').index();
                    var easeout_element = $(this).closest('.air-elements').find('.air-elements-list .air-element-settings:eq(' + index + ')').find('.air-element-z-index');
                    easeout_element.val($(this).val());
            });
            
            /**
             * Select element
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-ele-time .air-ele-list', function() {
                    var index = $(this).index();
                    var select_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                    $(select_block).trigger('click');
            });
            
            /**
             * Hide element
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-ele-time .air-ele-list .dashicons', function() {
                    var index = $(this).closest('.air-ele-list').index();
                    var hide_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                    if($(this).closest('.air-ele-list').hasClass('hide_element'))
                    {
                        hide_block.show();
                        $(this).closest('.air-ele-list').removeClass('hide_element');
                    }
                    else
                    {
                        hide_block.hide();
                        $(this).closest('.air-ele-list').addClass('hide_element');
                    }

            });
            //DESELECT ELEMENTS
            
            /**
             * Call Deselect elements
            */
            $('.air-admin').on('click', '.air-slide .air-elements .air-slide-editing-area', function() {
                    airsliderDeselectElements();
            });
            
            /**
             * Deselect elements function
            */
            function  airsliderDeselectElements() {
                    $('.air-admin .air-slide .air-elements .air-slide-editing-area .air-element').removeClass('active');
                    $('.air-admin .air-slide .air-elements .air-elements-list .air-element-settings').removeClass('active');		
                    $('.air-admin .air-slide .air-elements .air-elements-list .air-element-settings').css('display', 'none');		

                    // Hide delete and duplicate element btns
                    $('.air-admin .air-slide .air-elements-actions .air-delete-element').addClass('air-is-disabled');
                    $('.air-admin .air-slide .air-elements-actions .air-duplicate-element').addClass('air-is-disabled');
            }

            //DELETE ELEMENT
            
            /**
             * Delete element. Remember that the button should be enabled / disabled somewhere else
             * 
             * @param {object} element selected element object
            */
            function  airsliderDeleteElement(element) {
                    var index = element.index();
                    var slide_parent = element.closest('.air-slide');

                    element.closest('.air-slide').find('.air-ele-time').find('.air-ele-list:eq('+ index +')').remove();

                    element.remove();
                    var element_options = slide_parent.find('.air-elements-list .air-element-settings:eq(' + index + ')');
                    element_options.remove();
                    
                    //Set the disable class for Delete all Element
                    if(slide_parent.find('.air-slide-editing-area .air-element').length == 0){
                        if(!slide_parent.find('.air-elements-actions .air-delete-all-element').hasClass('air-is-disabled'))
                        {
                            slide_parent.find('.air-elements-actions .air-delete-all-element').addClass('air-is-disabled');
                        }    
                    }
                    airsliderDeselectElements();

            }
            
            /**
             * By click on delete element call delete element function
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-delete-element', function() {
                    // Click only if an element is selected
                    if($(this).hasClass('.air-is-disabled')) {
                            return;
                    }
                    var slide_parent = $(this).closest('.air-slide');
                    var element = slide_parent.find('.air-elements .air-slide-editing-area .air-element.active');
                    airsliderDeleteElement(element);

            });
            
            //DELETE ALL ELEMENT
            
            /**
             * By click on delete all element call delete element function
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-delete-all-element', function() {
                    // Click only if an element is selected
                    if($(this).hasClass('.air-is-disabled')) {
                            return;
                    }

                    var slide_parent = $(this).closest('.air-slide');
                    var elements = slide_parent.find('.air-elements .air-slide-editing-area .air-element');
                    $(elements).each(function(){
                        var element = $(this);
                        airsliderDeleteElement(element);
                    });
                    
                    slide_parent.find('.air-ele-time tbody').append('<tr class="air-no-record"><td colspan="6" align="center">'+airslider_translations.element_no_found_txt+'</td></tr>');
                    

            });
            
            /**
             * By click on Duplicate element button to call deulicate element function
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-duplicate-element', function() {
                    // Click only if an element is selected
                    if($(this).hasClass('.air-is-disabled')) {
                            return;
                    }

                    var slide_parent = $(this).closest('.air-slide');
                    var element = slide_parent.find('.air-elements .air-slide-editing-area .air-element.active');
                    airsliderDuplicateElement(element);
            });

            /**
             * Modify delay option
            */
            $('.air-admin').on('keyup', '.air-elements .air-element-data-delay', function() {

                    var index = $(this).closest('.air-element-settings').index();
                    var delay_element = $(this).closest('.air-elements').find('.air-ele-time').find('.air-ele-list:eq('+index+')').find('input.air-delay-ele');
                    delay_element.val($(this).val());
            });
            
            /**
             * Modify Ease In option
            */
            $('.air-admin').on('keyup', '.air-elements .air-element-data-easeIn', function() {

                    var index = $(this).closest('.air-element-settings').index();
                    var easein_element = $(this).closest('.air-elements').find('.air-ele-time').find('.air-ele-list:eq('+index+')').find('input.air-easein-ele');
                    easein_element.val($(this).val());
            });
            
            /**
             * Modify Ease Out option
            */
            $('.air-admin').on('keyup', '.air-elements .air-element-data-easeOut', function() {

                    var index = $(this).closest('.air-element-settings').index();
                    var easeout_element = $(this).closest('.air-elements').find('.air-ele-time').find('.air-ele-list:eq('+index+')').find('input.air-easeout-ele');
                    easeout_element.val($(this).val());
            });
            
            /**
             * Modify Z-index option
            */
            $('.air-admin').on('keyup change click', '.air-elements .air-element-z-index', function() {

                    var index = $(this).closest('.air-element-settings').index();
                    var easeout_element = $(this).closest('.air-elements').find('.air-ele-time').find('.air-ele-list:eq('+index+')').find('input.air-z-index-ele');
                    easeout_element.val($(this).val());
            });
            
            /**
             * Modify left position
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-data-left', function() {
                    var index = $(this).closest('.air-element-settings').index();
                    $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('left', parseFloat($(this).val()));
            });

            /**
             * Modify top position
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-data-top', function() {
                    var index = $(this).closest('.air-element-settings').index();
                    $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('top', parseFloat($(this).val()));
            });

            /**
             * Modify z-index
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-z-index', function() {
                    var index = $(this).closest('.air-element-settings').index();
                    $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('z-index', parseFloat($(this).val()));
            });

            /**
             * Add / remove link wrapper (fire on textbox edit or on checkbox _target:"blank" edit)
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-link', function() {
                    airsliderEditElementsLink($(this));
            });
            $('.air-admin').on('change', '.air-elements .air-elements-list .air-element-settings .air-element-link-new-tab', function() {
                    var textbox = $(this).parent().find('.air-element-link');
                    airsliderEditElementsLink(textbox);
            });

            /**
             * Wrap - unwrap elements with an <a href="" target="">
             * 
             * @param {object} textbox_link textbox object
            */
            function  airsliderEditElementsLink(textbox_link) {
                    var index = textbox_link.closest('.air-element-settings').index();
                    var copy_attributes = false;
                    var reapply_css = false;

                    if(textbox_link.val() != '' && !textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').hasClass('air-element')) {
                            var link_new_tab = textbox_link.parent().find('.air-element-link-new-tab').prop('checked') ? 'target="_blank"' : '';
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').wrap('<a href="' + textbox_link.val() + '"' + link_new_tab + ' />');
                            copy_attributes = true;
                            reapply_css = true;
                    }
                    else if(textbox_link.val() != '' && textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').hasClass('air-element')) {
                            var link_new_tab = textbox_link.parent().find('.air-element-link-new-tab').prop('checked') ? true : false;

                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').attr('href', textbox_link.val());

                            if(link_new_tab) {
                                    textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').attr('target', '_blank');
                            }
                            else {
                                    textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').removeAttr('target');
                            }

                            copy_attributes = false;
                    }
                    else if(textbox_link.val() == '' && textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').hasClass('air-element')) {
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').attr('class', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').attr('class')).removeClass('ui-draggable');

                            // Reapply CSS and custom CSS
                            airsliderApplyCustomCss(textbox_link.closest('.air-element-settings').find('.air-element-custom-css'));
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').css('top', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').css('top'));
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').css('left', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').css('left'));
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').css('z-index', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').css('z-index'));

                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').unwrap();
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').parent('a').draggable('destroy');
                            copy_attributes = false;
                    }

                    if(copy_attributes) {
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').parent().attr('style', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').attr('style'));
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').parent().attr('class', textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').attr('class')).removeClass('ui-draggable');

                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').removeAttr('style');
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').removeAttr('class');
                            textbox_link.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').draggable('destroy');
                    }

                    airsliderDraggableElements();

                    if(reapply_css) {
                            airsliderApplyCustomCss(textbox_link.closest('.air-element-settings').find('.air-element-custom-css'));
                    }
            }

            /**
             * call Apply custom CSS
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-custom-css', function() {
                    airsliderApplyCustomCss($(this));
            });

            /**
             * Apply custom CSS
             * 
             * @param {object} textarea textarea object
            */
            function  airsliderApplyCustomCss(textarea) {
                    var index = textarea.closest('.air-element-settings').index();
                    // Save current positions
                    var left = textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('left');
                    var top = textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('top');
                    var z_index = textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('z-index');

                    // Apply CSS
                    if(! textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').is('a')) {
                            textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').attr('style', textarea.val());
                    }
                    else {
                            textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ') > *').attr('style', textarea.val());
                            textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').removeAttr('style');
                    }
                    textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('top', top);
                    textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('left', left);
                    textarea.closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').css('z-index', z_index);			
            }

            // TEXT ELEMENTS

            /**
             * Add text click
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-add-text-element', function() {
                    var slide_parent = $(this).closest('.air-slide');

                    airsliderAddTextElement(slide_parent);
            });

            /**
             * Add text. Receives the slide as object
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderAddTextElement(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');
                    var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');
                    var settings = '<div class="air-element-settings air-text-element-settings">' + $('.air-admin .air-slide .air-elements .air-void-text-element-settings').html() + '</div>';

                    // Insert in editing area
                    area.append('<div class="air-element air-text-element" style="z-index: 1;">' + airslider_translations.text_element_default_html + '</div>');

                    // Insert the options
                    settings_div.before(settings);

                    // Make draggable
                    airsliderDraggableElements();

                    // Display settings
                    airsliderSelectElement(area.find('.air-element').last());
                    if(slide_parent.find('.air-ele-time tbody').find('tr.air-no-record').length > 0){
                        slide_parent.find('.air-ele-time tbody').html('');
                    }
                    slide_parent.find('.air-ele-time tbody').append('<tr class="air-ele-list active"><td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td><td class="air-ele-title"><span class="dashicons dashicons-editor-textcolor"></span><span>'+ airslider_translations.text_element_default_html +'</span></td><td><input type="text" value="0" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easein-ele air-txt-easein" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easeout-ele air-txt-easeout" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-z-index-ele air-txt-z-index" type="number" value="1" min="0" onkeypress="return isNumberKey(event);" /></td></tr>');
                    
                    //Enable Delete All Element Button
                    slide_parent.find('.air-elements-actions .air-delete-all-element').removeClass('air-is-disabled');
            }

            /**
             * Modify text
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-inner-html', function() {
                    var index = $(this).closest('.air-element-settings').index();
                    var slide_parent = $(this).closest('.air-slide');
                    var text_element = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');

                    if(! text_element.is('a')) {
                            text_element.html($(this).val());
                    }
                    else {
                            text_element.find('> div').html($(this).val());
                    }
                    slide_parent.find('.air-ele-time').find('.air-ele-list:eq('+index+')').find('.air-ele-title span:eq(1)').html($(this).val());
            });
            
            //VIDEO ELEMENTS
            
            /**
             * Add video on click button
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-add-video-element', function() {
                    var slide_parent = $(this).closest('.air-slide');
                    airsliderAddVideoElement(slide_parent);
            });
            
            /**
             * Add Video. Receives the slide as object
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderAddVideoElement(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');
                    var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');
                    var settings = '<div class="air-element-settings air-video-element-settings">' + $('.air-admin .air-slide .air-elements .air-void-video-element-settings').html() + '</div>';

                    // Temporarily insert an element with no src and alt
                    // Add the image into the editing area.
                      area.append('<div class="air-element air-video-element air-iframe-element" style="background:#000;z-index: 999;"><img src="'+airslider_translations.AirPluginUrl+'/images/video_sample.jpg" width="320" height="240" style="z-index: 1;" /></div>');
                      
                      var total_video = area.find('.air-video-element').length;
                      
                      var slide_index = ($('.air-slide-tab li a.air-is-active').index() + 1);
                    // Insert the options
                    settings_div.before(settings);

                    // Make draggable
                    airsliderDraggableElements();

                    // Display settings
                    airsliderSelectElement(area.find('.air-element').last());
                    
                    $('.air-video-element-settings.active').find('.air-element-video-type').attr('name','air-video-type-'+slide_index+'-'+total_video)

                    if(slide_parent.find('.air-ele-time tbody').find('tr.air-no-record').length > 0){
                        slide_parent.find('.air-ele-time tbody').html('');
                    }
                    slide_parent.find('.air-ele-time tbody').append('<tr class="air-ele-list active"><td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td><td class="air-ele-title"><span class="dashicons dashicons-format-video"></span><span>Video Element</span></td><td><input type="text" value="0" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easein-ele air-txt-easein" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easeout-ele air-txt-easeout" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-z-index-ele air-txt-z-index" type="number" value="1" min="0" onkeypress="return isNumberKey(event);" /></td></tr>');
                    
                    //Enable Delete All Element Button
                    slide_parent.find('.air-elements-actions .air-delete-all-element').removeClass('air-is-disabled');

            }
            
            /**
             * Change video type
            */
            $('.air-admin').on('change', '.air-elements .air-elements-list .air-element-settings .air-element-video-type', function() {
                $(this).closest('.air-element-settings-list').find('.air-video-search').hide(); 
                $(this).closest('.air-element-settings-list').find('.air-video-block').hide(); 
                if($(this).val() == 'Y'){
                    $(this).closest('.air-element-settings-list').find('.air-youtube-search').show();   
                    if($.trim($(this).closest('.air-element-settings-list').find('.air-element-youtube-video-link').val()) == '')
                    {
                        $(this).closest('.air-element-settings-list').find('.air-youtube-option').hide();   
                    }
                    else
                    {
                        $(this).closest('.air-element-settings-list').find('.air-youtube-option').show();   
                        $(this).closest('.air-element-settings-list').find('.air-search-youtube-video').trigger('click');   
                    }
                }
                else if($(this).val() == 'V'){
                    $(this).closest('.air-element-settings-list').find('.air-vimeo-search').show();   
                    if($.trim($(this).closest('.air-element-settings-list').find('.air-element-vimeo-video-link').val()) == '')
                    {
                        $(this).closest('.air-element-settings-list').find('.air-vimeo-option').hide();   
                    }
                    else
                    {
                        $(this).closest('.air-element-settings-list').find('.air-vimeo-option').show();   
                        $(this).closest('.air-element-settings-list').find('.air-search-vimeo-video').trigger('click');   
                    }
                }
                else if($(this).val() == 'H'){
                    $(this).closest('.air-element-settings-list').find('.html5_search').show();   
                    $(this).closest('.air-element-settings-list').find('.air-html5-option').show();   
                    
                    var mp4_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-mp4-video-link').val());
                    var webm_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-webm-video-link').val());
                    var ogv_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-ogv-video-link').val());
                    
                    if(mp4_url!='' || webm_url!='' || ogv_url!=''){
                        $(this).closest('.air-element-settings-list').find('.search_html5_video').trigger('click'); 
                    }
                }
            });
            
            
            /**
             * Get youtube video id by video url or id
             * 
             * @param {string} url youtube id or url
             * 
             * @return {string} youtube id
            */
            function  airsliderGetYoutubeIDFromUrl(url) {
                url = $.trim(url);

                var video_id = url.split('v=')[1];
                if (video_id) {
                    var ampersandPosition = video_id.indexOf('&');
                    if (ampersandPosition != -1) {
                        video_id = video_id.substring(0, ampersandPosition);
                    }
                } else {
                    video_id = url;
                }

                return(video_id);
            }
            
            /**
             * Search youtube video on click of button
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-element-settings .air-search-youtube-video', function() {
                    var url_val = $.trim($(this).closest('.air-content').find('.air-element-youtube-video-link').val());
                    var index = $(this).closest('.air-element-settings').index();
                    if(url_val!='')
                    {
                        airsliderGetYoutubeInfo($(this),url_val,index);
                    }
            });
            
            /**
             * Get youtube information based on id
             * 
             * @param {object} curr object of youtube url/id contain textbox 
             * 
             * @param {string} url_val youtube url/id
             * 
             * @param {integer} index element index
            */
            function  airsliderGetYoutubeInfo(curr,url_val,index)
            {
                var youtube_block = $(curr).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                var video_width = $.trim($(curr).closest('.air-element-settings').find('.air-youtube-option').find('.air-element-video-width').val());
                var video_height = $.trim($(curr).closest('.air-element-settings').find('.air-youtube-option').find('.air-element-video-height').val());
                var youtubeID = '';
                var youtubeImg = '';
                var youtubeTitle = '';
                var validYoutubeID = '';
                
                var ytApiKey = $.trim($('.air-youtube-api-key').val());
                if(ytApiKey!='')
                {
                    youtubeID = $.trim(url_val);
                    youtubeID = airsliderGetYoutubeIDFromUrl(youtubeID);

                    $.get("https://www.googleapis.com/youtube/v3/videos?part=snippet&id=" + youtubeID + "&key=" + ytApiKey, function(data) {
                        validYoutubeID = data.pageInfo.totalResults
                        
                        if(validYoutubeID==0 || validYoutubeID == '0')
                        {
                            airsliderShowMsg(airslider_translations.video_not_found,'danger');
                        }
                        else
                        {
                            youtubeTitle = data.items[0].snippet.title;
                            youtubeImg = data.items[0].snippet.thumbnails.high.url;
                            disYoutubeInfo(curr,index,youtube_block,youtubeID,youtubeTitle,youtubeImg,video_width,video_height);
                        }    
                    }).fail(function() {
                        disYoutubeInfo(curr,index,youtube_block,youtubeID,youtubeTitle,youtubeImg,video_width,video_height);
                    });
                }
                else
                {
                    disYoutubeInfo(curr,index,youtube_block,youtubeID,youtubeTitle,youtubeImg,video_width,video_height);
                }
            }

            /**
             * Display youtube information
             * 
             * @param {object} curr current selected div
             * @param {integer} index current selected div index
             * @param {object} youtube_block current selected div's youtube block
             * @param {string} youtubeID youtube id or url
             * @param {string} youtubeTitle youtube title
             * @param {string} youtubeImg youtube preview image URL
             * @param {integer} video_width youtube video width
             * @param {integer} video_height youtube video height
            */
            function disYoutubeInfo(curr,index,youtube_block,youtubeID,youtubeTitle,youtubeImg,video_width,video_height){
                var youtubeHtml = '';
                //If api call fail then display youtube image
                if(youtubeImg == ''){
                    var newUrl = 'https://i.ytimg.com/vi/'+youtubeID+'/hqdefault.jpg';
                    youtubeImg = newUrl;
                    youtubeTitle = airslider_translations.youtube_video_title;
                }
               
                if($.trim(youtubeTitle)!='')
                {
                    youtubeHtml += '<label class="video_block_title">'+$.trim(youtubeTitle)+'</label>';
                    $('.air-ele-time').find('.air-ele-list:eq('+ index +')').find('.air-ele-title span:eq(1)').html($.trim(youtubeTitle));
                } 
                
                youtubeHtml += '<img src="'+youtubeImg+'" width="'+video_width+'" height="'+video_height+'" />';
                youtubeHtml += '<div class="video_block_icon youtube_icon"></div>';
                $(youtube_block).html(youtubeHtml);
                
                $(curr).closest('.air-element-settings').find('.air-youtube-option').find('.air-preview-image-element-upload-button').data('src', youtubeImg);
                $(curr).closest('.air-element-settings').find('.air-youtube-option').find('.air-preview-image-element-upload-button').data('alt', youtubeTitle);
                $(curr).closest('.air-element-settings').find('.air-youtube-option').find('.air-preview-image-element-upload-button').data('is-preview', 'false');
                $(curr).closest('.air-element-settings').find('.air-youtube-option').show();
            }
           
            /**
             * Get vimeo video id from video url or id
             * 
             * @param {string} url vimeo id or url
             * 
             * @return {string} vimeo id
            */
            function  airsliderGetVimeoIDFromUrl(url) {
                url = $.trim(url);

                var video_id = url.replace(/[^0-9]+/g, '');
                video_id = $.trim(video_id);

                return(video_id);
            }
            
            /**
             * Search vimeo video on click of button
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-element-settings .air-search-vimeo-video', function() {
                    var url_val = $.trim($(this).closest('.air-content').find('.air-element-vimeo-video-link').val());
                    var index = $(this).closest('.air-element-settings').index();
                    if(url_val!='')
                    {
                        airsliderGetVimeoInfo($(this),url_val,index);
                    }
            });
            
            /**
             * Get vimeo video information based on id/url
             * 
             * @param {object} curr object of vimeo url/id contain textbox 
             * 
             * @param {string} url_val vimeo url/id
             * 
             * @param {integer} index element index
            */
            function  airsliderGetVimeoInfo(curr,url_val,index)
            {
                var vimeo_block = $(curr).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                var video_width = $.trim($(curr).closest('.air-element-settings').find('.air-vimeo-option').find('.air-element-video-width').val());
                var video_height = $.trim($(curr).closest('.air-element-settings').find('.air-vimeo-option').find('.air-element-video-height').val());
                var vimeoID = '';
                var vimeoImg = '';
                var vimeoTitle = '';
                
                vimeoID = $.trim(url_val);
                vimeoID = airsliderGetVimeoIDFromUrl(vimeoID);

                $.ajax({
                    url: 'http://vimeo.com/api/v2/video/' + vimeoID + '.json',
                    dataType: 'jsonp',
                    success: function (data) {
                        vimeoImg = data[0].thumbnail_large;
                        vimeoTitle = data[0].title;

                        var vimeoHtml = '';
                        if($.trim(vimeoTitle)!='')
                        {
                            vimeoHtml += '<label class="video_block_title">'+$.trim(vimeoTitle)+'</label>';
                            $('.air-ele-time').find('.air-ele-list:eq('+ index +')').find('.air-ele-title span:eq(1)').html($.trim(vimeoTitle));
                        }  
                        vimeoHtml += '<img src="'+vimeoImg+'" width="'+video_width+'" height="'+video_height+'" />';
                        vimeoHtml += '<div class="video_block_icon vimeo_icon"></div>';
                        $(vimeo_block).html(vimeoHtml);

                        $(curr).closest('.air-element-settings').find('.air-vimeo-option').show();
                        $(curr).closest('.air-element-settings').find('.air-vimeo-option').find('.air-preview-image-element-upload-button').data('src', vimeoImg);
                        $(curr).closest('.air-element-settings').find('.air-vimeo-option').find('.air-preview-image-element-upload-button').data('alt', vimeoTitle);
                        $(curr).closest('.air-element-settings').find('.air-vimeo-option').find('.air-preview-image-element-upload-button').data('is-preview', 'false');
                    }
                });
            }
            
            /**
             * Search Html5 video on click of button
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-element-settings .search_html5_video', function() {
                
                var mp4_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-mp4-video-link').val());
                var webm_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-webm-video-link').val());
                var ogv_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-ogv-video-link').val());
                var poster_url = $.trim($(this).closest('.air-element-settings-list').find('.air-element-html5-poster-url').val());

                var index = $(this).closest('.air-element-settings').index();
                if(mp4_url!='' || webm_url!='' || ogv_url!='')
                {
                    var video_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                    var video_width = $.trim($(this).closest('.air-element-settings').find('.air-html5-option').find('.air-element-video-width').val());
                    var video_height = $.trim($(this).closest('.air-element-settings').find('.air-html5-option').find('.air-element-video-height').val());
                    var html5Image = '';
                    if(poster_url!=''){
                        html5Image = poster_url;
                    }
                    else
                    {
                        html5Image = airslider_translations.AirPluginUrl+'/images/html5-video.png';
                    }
                    var html5Html = '';
                    html5Html += '<label class="video_block_title">'+airslider_translations.html5_video_title+'</label>';
                    html5Html += '<img src="'+html5Image+'" width="'+video_width+'" height="'+video_height+'" />';
                    html5Html += '<div class="video_block_icon html5_icon"></div>';
                    $(video_block).html(html5Html);
                }    
            });

            /**
             * Check extension of mp4 video
            */
            $('.air-admin').on('blur', '.air-elements .air-elements-list .air-element-settings .air-element-html5-mp4-video-link', function() {
                var mp4_url = $.trim($(this).val());
                var html5_mp4_ext = mp4_url.split('.').pop();

                if(mp4_url!='' && html5_mp4_ext.toLowerCase()!='mp4'){
                    $(this).val('');
                    alert('Extension of video must be mp4.');
                }
            });
            
            /**
             * Check extension of webm video
            */
            $('.air-admin').on('blur', '.air-elements .air-elements-list .air-element-settings .air-element-html5-webm-video-link', function() {
                var webm_url = $.trim($(this).val());
                var html5_webm_ext = webm_url.split('.').pop();

                if(webm_url!='' && html5_webm_ext.toLowerCase()!='webm'){
                    $(this).val('');
                    alert('Extension of video must be webm.');
                }
            });
            
            /**
             * Check extension of ogv video
            */
            $('.air-admin').on('blur', '.air-elements .air-elements-list .air-element-settings .air-element-html5-ogv-video-link', function() {
                var ogv_url = $.trim($(this).val());
                var html5_ogv_ext = ogv_url.split('.').pop();

                if(ogv_url!='' && html5_ogv_ext.toLowerCase()!='ogv'){
                    $(this).val('');
                    alert('Extension of video must be ogv.');
                }
            });

            /**
             * Modify Fullwidth option
            */
            $('.air-admin').on('change', '.air-elements .air-elements-list .air-element-settings .air-element-video-full-width', function() {
                var index = $(this).closest('.air-element-settings').index();
                var video_type = $(this).closest('.air-element-settings').find('.air-element-video-type:checked').val();
                var video_option = '';
                if(video_type == 'Y'){
                    video_option = '.air-youtube-option';
                }
                else if(video_type == 'V'){
                    video_option = '.air-vimeo-option';
                }
                else if(video_type == 'H'){
                    video_option = '.air-html5-option';
                }
                var wh_tr_block = $(this).closest('.air-elements-list').find(video_option).find('.air-video-wh');
                var wh_left = $(this).closest('.air-elements-list').find('.air-element-data-left');
                var wh_top = $(this).closest('.air-elements-list').find('.air-element-data-top');
                var iframe_wrapper = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                var iframe_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').find('img');

                if($(this).is(':checked'))
                {
                    $(wh_tr_block).hide();
                    $(iframe_block).attr('width',$.trim($('#air-slider-startWidth').val()));
                    $(iframe_block).attr('height',$.trim($('#air-slider-startHeight').val()));
                    $(iframe_wrapper).css('width',$.trim($('#air-slider-startWidth').val()));
                    $(iframe_wrapper).css('height',$.trim($('#air-slider-startHeight').val()));
                    $(wh_tr_block).find('.air-element-video-width').val($.trim($('#air-slider-startWidth').val()));
                    $(wh_tr_block).find('.air-element-video-height').val($.trim($('#air-slider-startHeight').val()));
                    $(iframe_wrapper).css('left','0');
                    $(iframe_wrapper).css('top','0');
                    $(wh_left).val('0');
                    $(wh_top).val('0');
                }
                else
                {
                    $(wh_tr_block).show();
                    $(iframe_block).attr('width','320');
                    $(iframe_block).attr('height','240');
                    $(iframe_wrapper).css('width','320');
                    $(iframe_wrapper).css('height','240');
                    $(wh_tr_block).find('.air-element-video-width').val('320');
                    $(wh_tr_block).find('.air-element-video-height').val('240');
                }
            });
            
            /**
             * Modify Width option
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-video-width', function() {
                    var video_width = $.trim($(this).val());
                    var index = $(this).closest('.air-element-settings').index();
                    var iframe_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').find('img');
                    var iframe_wrapper = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                    if(video_width!='' && video_width!=0)
                    {
                        $(iframe_wrapper).css('width',video_width);
                        $(iframe_block).attr('width',video_width);
                    }
            });
            
            /**
             * Modify Height option
            */
            $('.air-admin').on('keyup', '.air-elements .air-elements-list .air-element-settings .air-element-video-height', function() {
                    var video_height = $.trim($(this).val());
                    var index = $(this).closest('.air-element-settings').index();
                    var iframe_block = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')').find('img');
                    var iframe_wrapper = $(this).closest('.air-elements').find('.air-slide-editing-area .air-element:eq(' + index + ')');
                    if(video_height!='' && video_height!=0)
                    {
                        $(iframe_wrapper).css('height',video_height);
                        $(iframe_block).attr('height',video_height);
                    }
            });
            
            /**
             * Modify Autoplay option
            */
            $('.air-admin').on('change', '.air-elements .air-elements-list .air-element-settings .air-element-video-autoplay', function() {
                var autoplay_firsttime_block = $(this).closest('.air-content').find('.air-autoplay-firsttime-block');
                var autoplay_rewind_block = $(this).closest('.air-content').find('.air-autoplay-rewind-block');
                var index = $(this).closest('.air-element-settings').index();
                if($(this).is(':checked'))
                {
                    $(autoplay_firsttime_block).show();
                    $(autoplay_rewind_block).show();
                }
                else
                {
                    $(autoplay_firsttime_block).hide();
                    $(autoplay_rewind_block).hide();
                    $(autoplay_firsttime_block).find('.air-element-video-autoplay-firsttime').prop('checked',false);
                    $(autoplay_rewind_block).find('.air-element-video-force-rewind').prop('checked',false);
                }
            });
            
            /**
             * Set preview image for vimeo and youtube
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-video-element-settings .air-preview-image-element-upload-button', function() {
                    var video_type = $(this).closest('.air-element-settings').find('.air-element-video-type:checked').val();
                    var video_option = '';
                    if(video_type == 'Y'){
                        video_option = '.air-youtube-option';
                    }
                    else if(video_type == 'V'){
                        video_option = '.air-vimeo-option';
                    }
                    var slide_parent = $(this).closest('.air-slide');
                    airsliderUploadPreviewImageElement(slide_parent,video_option);
            });
            
            /**
             * Set preview image
             * 
             * @param {object} slide_parent parent class object
             * 
             * @param {string} video_option string value of video type
            */
            function  airsliderUploadPreviewImageElement(slide_parent,video_option) {
                var area = slide_parent.find('.air-slide-editing-area');
                var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');

                var file_frame;

                // If the media frame already exists, reopen it.
                if (file_frame) {
                    file_frame.open();
                    return;
                }

                // Create the media frame.
                file_frame = wp.media.frames.file_frame = wp.media({
                    title: jQuery(this).data('uploader_title'),
                    button: {
                        text: jQuery(this).data('uploader_button_text'),
                    },
                    multiple: false  // Set to true to allow multiple files to be selected
                });

                // When an image is selected, run a callback.
                file_frame.on('select', function () {
                    // We set multiple to false so only get one image from the uploader
                    attachment = file_frame.state().get('selection').first().toJSON();

                    // Do something with attachment.id and/or attachment.url here
                    var image_src = attachment.url;
                    var image_alt = attachment.alt;

                    // Set attributes. If is a link, do the right thing
                    var image = area.find('.air-video-element.active').last();

                    image.find('img').attr('src', image_src);
                    image.find('img').attr('alt', image_alt);

                    // Set data (will be used in the ajax call)
                    settings_div.parent().find('.air-element-settings.active '+video_option+' .air-preview-image-element-upload-button').data('src', image_src);
                    settings_div.parent().find('.air-element-settings.active '+video_option+' .air-preview-image-element-upload-button').data('is-preview', 'true');
                });
                // Finally, open the modal
                file_frame.open();
            }

            /**
             * Remove preview
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-video-element-settings .air-remove-preview-image-element-upload-button', function() {
                    var video_type = $.trim($(this).closest('.air-element-settings-list').find('.air-element-video-type:checked').val());
                    var index = $(this).closest('.air-element-settings').index();

                    if(video_type == 'Y')
                    {
                        var url_val = $.trim($(this).closest('.air-element-settings-list').find('.air-element-youtube-video-link').val());
                        if(url_val!='')
                        {
                            airsliderGetYoutubeInfo($(this),url_val,index);
                        }
                    }
                    else if(video_type == 'V')
                    {
                        var url_val = $.trim($(this).closest('.air-element-settings-list').find('.air-element-vimeo-video-link').val());
                        if(url_val!='')
                        {
                            airsliderGetVimeoInfo($(this),url_val,index);
                        }
                    }
            });

            // IMAGE ELEMENTS

            /**
             * Add images click
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-add-image-element', function() {
                    var slide_parent = $(this).closest('.air-slide');
                    airsliderAddImageElement(slide_parent);
            });

            /**
             * Upload click
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-image-element-settings .air-image-element-upload-button', function() {
                    var slide_parent = $(this).closest('.air-slide');
                    airsliderUploadImageElement(slide_parent);
            });

            /**
             * Add image. Receives the slide as object
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderAddImageElement(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');
                    var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');
                    var settings = '<div class="air-element-settings air-image-element-settings">' + $('.air-admin .air-slide .air-elements .air-void-image-element-settings').html() + '</div>';

                    // Temporarily insert an element with no src and alt
                    // Add the image into the editing area.
                      area.append('<img class="air-element air-image-element" src="nothing_now.jpg" style="z-index: 1;" />');

                    // Insert the options
                    settings_div.before(settings);

                    // Make draggable
                    airsliderDraggableElements();

                    // Display settings
                    airsliderSelectElement(area.find('.air-element').last());

                    // Upload
                    airsliderUploadImageElement(slide_parent);
                    var total_image_block = slide_parent.find('.air-ele-time').find('.air-ele-image-list').length;
                    var new_image_index = (parseInt(total_image_block)+1);
                    
                    if(slide_parent.find('.air-ele-time tbody').find('tr.air-no-record').length > 0){
                        slide_parent.find('.air-ele-time tbody').html('');
                    }
                    slide_parent.find('.air-ele-time tbody').append('<tr class="air-ele-list air-ele-image-list active"><td title="Show/Hide Element"><span class="dashicons dashicons-visibility"></span></td><td class="air-ele-title"><span class="dashicons dashicons-format-image"></span><span>Image Element'+ new_image_index +'</span></td><td><input type="text" value="0" class="air-delay-ele air-txt-delay-time" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easein-ele air-txt-easein" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-easeout-ele air-txt-easeout" type="text" value="300" onkeypress="return isNumberKey(event);" /></td><td><input class="air-z-index-ele air-txt-z-index" type="number" value="1" min="0" onkeypress="return isNumberKey(event);" /></td></tr>');
                    
                    //Enable Delete All Element Button
                    slide_parent.find('.air-elements-actions .air-delete-all-element').removeClass('air-is-disabled');
            }
            
            /**
             * Upload image element
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderUploadImageElement(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');
                    var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');

                    var file_frame;

                    // If the media frame already exists, reopen it.
                    if ( file_frame ) {
                      file_frame.open();
                      return;
                    }

                    // Create the media frame.
                    file_frame = wp.media.frames.file_frame = wp.media({
                      title: jQuery( this ).data( 'uploader_title' ),
                      button: {
                            text: jQuery( this ).data( 'uploader_button_text' ),
                      },
                      multiple: false  // Set to true to allow multiple files to be selected
                    });

                    // When an image is selected, run a callback.
                    file_frame.on( 'select', function() {
                      // We set multiple to false so only get one image from the uploader
                      attachment = file_frame.state().get('selection').first().toJSON();

                      // Do something with attachment.id and/or attachment.url here
                      var image_src = attachment.url;
                      var image_alt = attachment.alt;
                      var image_width = attachment.width;
                      var image_height = attachment.height;

                      // Set attributes. If is a link, do the right thing
                      var image = area.find('.air-image-element.active').last();
                      var scale_image = settings_div.parent().find('.air-element-settings.active .air-element-image-scale');

                      if(! image.is('a')) {
                            image.attr('src', image_src);
                            image.attr('alt', image_alt);
                            image.attr('width', image_width);
                            image.attr('height', image_height);
                            image.css('width', image_width);
                            image.css('height', image_height);
                            if(scale_image.is(':checked'))
                            {
                                airsliderResizeImage(image);
                            }  
                      }
                      else {
                            image.find('> img').attr('src', image_src);
                            image.find('> img').attr('alt', image_alt);
                            image.find('> img').attr('width', image_width);
                            image.find('> img').attr('height', image_height);
                            image.find('> img').css('width', image_width);
                            image.find('> img').css('height', image_height);
                            if(scale_image.is(':checked'))
                            {
                                airsliderResizeImage(image.find('> img'));
                            }    
                      }
                      // Set data (will be used in the ajax call)
                      settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('src', image_src);
                      settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('alt', image_alt);
                      settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('width', image.attr('width'));
                      settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('height', image.attr('height'));
                    });

                    // Finally, open the modal
                    file_frame.open();
            }
            
            /**
             * onclick on label checked checkbox
            */
            $('.air-admin').on('click', '.air-elements .air-elements-list .air-label-for', function() {
                    var labelForChk = $(this).closest('tr').find($(this).attr('data-label-for'));
                    if(labelForChk.is(':checked')){
                        labelForChk.prop('checked',false);
                    }
                    else
                    {
                        labelForChk.prop('checked',true);
                    }
                    labelForChk.trigger('change');
            });
            
            /**
             * Scalling image based on slider height and width
            */
            $('.air-admin').on('change', '.air-elements .air-elements-list .air-image-element-settings .air-element-image-scale', function () {
                var slide_parent = $(this).closest('.air-slide');
                var area = slide_parent.find('.air-slide-editing-area');
                var settings_div = slide_parent.find('.air-elements .air-elements-list .air-void-text-element-settings');
                var image = area.find('.air-image-element.active').last();

                if($(this).is(':checked'))
                {
                    if (!image.is('a')) {
                        airsliderResizeImage(image);
                    }
                    else {
                        airsliderResizeImage(image.find('> img'));
                    }
                }  
                else
                {
                    $('<img src="'+(image.attr('src'))+'"/>').load(function(){
                        image.attr('width',this.width);
                        image.attr('height',this.height);
                        image.css('width',this.width);
                        image.css('height',this.height);
                    });
                }
                settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('width', image.attr('width'));
                settings_div.parent().find('.air-element-settings.active .air-image-element-upload-button').data('height', image.attr('height'));
            });
            
            /**
             * Resize image based on slider height and width
             * 
             * @param {object} img_obj image object
            */
            function  airsliderResizeImage(img_obj)
            {
                //Get current slider's width x height
                var maxWidth = parseFloat($('#air-slider-settings').find('#air-slider-startWidth').val());
                var maxHeight = parseFloat($('#air-slider-settings').find('#air-slider-startHeight').val());

                //Get image original width x height
                var srcWidth = parseFloat($(img_obj).attr('width'));
                var srcHeight = parseFloat($(img_obj).attr('height'));

                //Store in resize variable
                var resizeWidth = srcWidth;
                var resizeHeight = srcHeight;

                var aspect = parseFloat(resizeWidth / resizeHeight);

                //if image width greater than current container width then set width and height
                if (resizeWidth > maxWidth)
                {
                    resizeWidth = maxWidth;
                    resizeHeight = resizeWidth / aspect;
                }
                //if image height greater than current container height the set width and height
                if (resizeHeight > maxHeight)
                {
                    aspect = parseFloat(resizeWidth / resizeHeight);
                    resizeHeight = maxHeight;
                    resizeWidth = resizeHeight * aspect;
                }
                //Set the width and height of image    
                $(img_obj).attr('width',resizeWidth);
                $(img_obj).attr('height',resizeHeight);
                $(img_obj).css('width',resizeWidth);
                $(img_obj).css('height',resizeHeight);
            } 
            
            /******************/
            /** LIVE PREVIEW **/
            /******************/

            /**
             * Live preview click
            */
            $('.air-admin #air-slides').on('click', '.air-slide .air-elements .air-elements-actions .air-live-preview', function() {
                    var btn = $(this);
                    var slide_parent = btn.closest('.air-slide');

                    if(! btn.hasClass('air-live-preview-running')) {
                            btn.addClass('air-live-preview-running');
                            btn.html(airslider_translations.slide_stop_preview);
                            airsliderStartLivePreview(slide_parent);
                    }
                    else {
                            btn.removeClass('air-live-preview-running');
//                            btn.text(airslider_translations.slide_live_preview);
                            btn.html('<span class="dashicons dashicons-search"></span>');
                            airsliderStopLivePreview(slide_parent);
                    }
            });

            
            /**
             * Start single slide preview
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderStartLivePreview(slide_parent) {
                    airsliderDeselectElements();

                    var area = slide_parent.find('.air-slide-editing-area');

                    area.clone().addClass('air-slide-live-preview-area').insertAfter(area);
                    var prev = slide_parent.find('.air-slide-live-preview-area');

                    area.css('display', 'none');

                    // Set elements data and styles
                    var elements = prev.find('.air-element');
                    var original_elements = area.closest('.air-slide').find('.air-elements .air-element-settings');
                    var i = 0;
                    elements.each(function() {
                            var element = $(this);

                            element.attr({
                                    'data-left' : parseInt(original_elements.eq(i).find('.air-element-data-left').val()),
                                    'data-top' : parseInt(original_elements.eq(i).find('.air-element-data-top').val()),
                                    'data-delay' : parseInt(original_elements.eq(i).find('.air-element-data-delay').val()),
                                    'data-time' : original_elements.eq(i).find('.air-element-data-time').val(),
                                    'data-in' : original_elements.eq(i).find('.air-element-data-in').val(),
                                    'data-out' : original_elements.eq(i).find('.air-element-data-out').val(),
                                    'data-ignore-ease-out' : original_elements.eq(i).find('.air-element-data-out').prop('checked') ? 1 : 0,
                                    'data-ease-in' : parseInt(original_elements.eq(i).find('.air-element-data-easeIn').val()),
                                    'data-ease-out' : parseInt(original_elements.eq(i).find('.air-element-data-easeOut').val()),
                            });

                            element.removeAttr('style');
                            element.attr('style', original_elements.eq(i).find('.air-element-custom-css').val());				
                            element.css({
                                    'z-index' : parseInt(original_elements.eq(i).find('.air-element-z-index').val()),				
                            });

                            element.removeAttr('class');

                            i++;
                    });

                    // Prepare HTML structure
                    prev.wrapInner('<li />');
                    prev.wrapInner('<ul />');

                    // Set slide data and styles
                    var slide = prev.find('ul > li');
                    var original_slide = area.closest('.air-slide');
                    var content = original_slide.find('.air-slide-settings-list');
                    slide.attr({
                            'data-in' : content.find('.air-slide-data-in').val(),
                            'data-out' : content.find('.air-slide-data-out').val(),
                            'data-time' : parseInt(content.find('.air-slide-data-time').val()),
                            'data-ease-in' : parseInt(content.find('.air-slide-data-easeIn').val()),
                            'data-ease-out' : parseInt(content.find('.air-slide-data-easeOut').val()),
                    });

                    slide.attr('style', content.find('.air-slide-custom-css').val());
                    slide.css({
                            'background-image' : area.css('background-image') ,
                            'background-color' : area.css('background-color') + "",
                            'background-position-x' : content.find('.air-slide-background-propriety-position-x').val(),
                            'background-position-y' : content.find('.air-slide-background-propriety-position-y').val(),
                            'background-repeat' : content.find('input[name="air-slide-background-repeat"]:checked').val() == '0' ? 'no-repeat' : 'repeat',
                            'background-size' : content.find('.air-slide-background-propriety-size').val(),
                    });

                    var slider = $('.air-admin .air-slider #air-slider-settings');

                    // Run Air Slider
                    prev.airSlider({
                            'layout' : 'fixed',
                            'responsive' : false,
                            'startWidth' : parseInt(slider.find('#air-slider-startWidth').val()),
                            'startHeight' : parseInt(slider.find('#air-slider-startHeight').val()),

                            'automaticSlide' : true,
                            'showControls' : false,
                            'showNavigation' : false,
                            'enableSwipe' : false,
                            'showTimerBar' : false,
                            'showShadowBar' : false,
                            'pauseOnHover' : false,
                    });
            }
            
            /**
             * Stop single slide preview
             * 
             * @param {object} slide_parent parent class object
            */
            function  airsliderStopLivePreview(slide_parent) {
                    var area = slide_parent.find('.air-slide-editing-area');
                    var prev = slide_parent.find('.air-slide-live-preview-area');

                    prev.remove();
                    area.css('display', 'block');
            }

            /****************/
            /** AJAX CALLS **/
            /****************/

            /**
             * Save or update the new slider in the database
            */
            $('.air-admin .air-slider .air-save-settings').click(function() {
                if($.trim($(this).closest('.air-slider').find('#air-slider-name').val())!='')
                {
                    $(this).closest('.air-slider').find('#air-slider-name').css('border','1px solid #ddd');
                    airsliderSaveSlider();
                }
                else
                {
                    $(this).closest('.air-slider').find('#air-slider-name').css('border','1px solid red');
                    airsliderShowMsg(airslider_translations.slider_name,'danger')
                }
            });
            
            /**
             * Save or update the slide in the database
            */
           $('.air-admin #air-slides').on('click', '.air-slide .air-save-slide', function() {
                var slide_id = $(this).attr('data-slide-id');
                airsliderSaveSlide(slide_id);
            });
            
            /**
             * Reset Slider settings
            */
            $('.air-admin .air-slider .air-reset-slider-settings').click(function() {
                airsliderResetSlider($(this).attr('data-reset-block'));
            });

            /**
             * Delete slider
            */
            $('.air-admin .air-home .air-sliders-list .air-delete-slider').click(function() {
                    var confirm = window.confirm(airslider_translations.slider_delete_confirm);
                    if(!confirm) {
                            return;
                    }

                    airsliderDeleteSlider($(this));
            });
            
            /**
             * Duplicate slider
            */
            $('.air-admin .air-home .air-sliders-list .air-duplicate-slider').click(function() {
                    var confirm = window.confirm(airslider_translations.slider_duplicate_confirm);
                    if(!confirm) {
                            return;
                    }

                    airsliderDuplicateSlider($(this));
            });
            
            /**
            * Reset the slider
            * 
            * @param {object} resetBlock parent class object
            */
            function airsliderResetSlider(resetBlock){
                var content = $('.air-admin .air-slider #air-slider-settings');
                if(resetBlock == 'air-slider-info'){
                    content.find('#air-slider-name').val('');
                    content.find('#air-slider-alias').html('');
                    content.find('#air-slider-shortcode').html('');
                    content.find('#air-slider-php-function').html('');
                }
                else if(resetBlock == 'air-slider-general'){
                    content.find('#air-slider-layout').val('fixed');
                    content.find('#air-slider-responsive').val(1);
                    content.find('#air-slider-startWidth').val('1170');
                    content.find('#air-slider-startHeight').val('500');
                    content.find('#air-slider-automaticSlide').val(1);
                    content.find('input[name="air-slider-background-type-color"][value="0"]').prop('checked',true);
                    content.find('.wp-color-result').css('background-color','#fff');
                    content.find('.air-slider-background-type-color-picker-input').val('#fff');
                    content.find('.air-slider-background-opacity').val('100');
                    content.find('input[name="air-slide-shadow"][value="0"]').prop('checked',true);
                    content.find('.air-slider-default_shadow').attr('data-shadow-class','shadow1');
                    content.find('.air-shadow-list-wrapper').hide();
                    content.find('.air-shadow-list td').removeClass('active');
                    content.find('.air-shadow-list td:eq(0)').addClass('active');
                    content.find('#air-slider-pauseOnHover').val(1);
                }
                else if(resetBlock == 'air-slider-loader'){
                    content.find('input[name="air-slide-loader-image"][value="0"]').prop('checked',true);
                    content.find('.air-slider-default_loader').attr('data-loader-class','loader1');
                    content.find('.air-loader-list-wrapper').hide();
                    content.find('.air-loader-list td').removeClass('active');
                    content.find('.air-loader-list td:eq(0)').addClass('active');
                }
                else if(resetBlock == 'air-slider-controls'){
                    content.find('#air-slider-showControls').val(1);
                    content.find('.air-controls-block').show();
                    content.find('.air-slider-default-controls').attr('data-control-class','control1');
                    content.find('.air-control-list-wrapper').hide();
                    content.find('.air-control-list td').removeClass('active');
                    content.find('.air-control-list td:eq(0)').addClass('active');
                    content.find('#air-slider-enableSwipe').val(1);
                }
                else if(resetBlock == 'air-slider-navigation'){
                    content.find('#air-slider-showNavigation').val(1);
                    content.find('.air-navigation-block').show();
                    content.find('.air-slider-default-navigation').attr('data-navigation-class','navigation1');
                    content.find('.air-navigation-list-wrapper').hide();
                    content.find('#air-slider-navigationPosition').val('bc');
                    content.find('.air-navigation-list td').removeClass('active');
                    content.find('.air-navigation-list td:eq(0)').addClass('active');
                }
                else if(resetBlock == 'air-slider-timer-bar'){
                    content.find('#air-slider-showTimerBar').val(1);
                    content.find('#air-slider-timerBarPosition').val('top_pos');
                    content.find('.air-progress-bar-block').css('display','table-row');
                }
                else if(resetBlock == 'air-slider-youtube_api_key'){
                    content.find('.air-youtube-api-key').val('');
                }
                else if(resetBlock == 'air-slider-callbacks'){
                    content.find('.air-slider-callback-beforeStart').val('');
                    content.find('.air-slider-callback-beforeSetResponsive').val('');
                    content.find('.air-slider-callback-beforeSlideStart').val('');
                    content.find('.air-slider-callback-beforePause').val('');
                    content.find('.air-slider-callback-beforeResume').val('');
                }
            }
            
            /**
             * Sends an array with the new or current slider options
            */
            function  airsliderSaveSlider() {
                    var content = $('.air-admin .air-slider #air-slider-settings');
                    var final_options = new Array();
                    var loader_image = '';
                    var loader_image_width = '';
                    var loader_image_height = '';
                    var loader_type = '';
                    var loader_class = '';
                    
                    if(content.find('input[name="air-slide-loader-image"]:checked').val() == 0){
                        loader_type = 'default';
                        loader_class = content.find('.air-slider-default_loader').attr('data-loader-class');
                    }
                    else
                    {
                        loader_type = 'none';
                        loader_image = content.find('.air-slider-loader-type-image-upload-button').attr('data-src');
                        loader_image_width = content.find('.air-slider-loader-type-image-upload-button').attr('data-width');
                        loader_image_height = content.find('.air-slider-loader-type-image-upload-button').attr('data-height');
                    }
                    var control_class = content.find('.air-slider-default-controls').attr('data-control-class');
                    var navigation_class = content.find('.air-slider-default-navigation').attr('data-navigation-class');
                    var options = {
                            layout : content.find('#air-slider-layout').val(),
                            responsive : parseInt(content.find('#air-slider-responsive').val()),
                            startWidth : parseInt(content.find('#air-slider-startWidth').val()),
                            startHeight : parseInt(content.find('#air-slider-startHeight').val()),
                            automaticSlide : parseInt(content.find('#air-slider-automaticSlide').val()),
                            background_type_color : content.find('input[name="air-slider-background-type-color"]:checked').val() == '0' ? 'transparent' : content.find('.air-slider-background-type-color-picker-input').val() + "",
                            background_opacity : content.find('input[name="air-slider-background-type-color"]:checked').val() == '0' ? '100' : $.trim(content.find('.air-slider-background-opacity').val()) + "",
                            loader_type :  loader_type + "",
                            loaderClass :  loader_class + "",
                            loader_image : loader_image + "",
                            loader_image_width : loader_image_width + "",
                            loader_image_height : loader_image_height + "",
                            showControls : parseInt(content.find('#air-slider-showControls').val()),
                            controlsClass : control_class + "",
                            showNavigation : parseInt(content.find('#air-slider-showNavigation').val()),
                            navigationClass : navigation_class + "",
                            navigationPosition : content.find('#air-slider-navigationPosition').val(),
                            enableSwipe : parseInt(content.find('#air-slider-enableSwipe').val()),
                            showTimerBar : parseInt(content.find('#air-slider-showTimerBar').val()),
                            showShadowBar : content.find('input[name="air-slide-shadow"]:checked').val(),
                            shadowClass : content.find('input[name="air-slide-shadow"]:checked').val() == '1' ? content.find('.air-slider-default_shadow').attr('data-shadow-class') : '' ,
                            timerBarPosition : content.find('#air-slider-timerBarPosition').val(),
                            pauseOnHover : parseInt(content.find('#air-slider-pauseOnHover').val()),
                            youtube_api_key : content.find('.youtube_api_key').val(),
                            beforeStart : content.find('.air-slider-callback-beforeStart').val(),
                            beforeSetResponsive : content.find('.air-slider-callback-beforeSetResponsive').val(),
                            beforeSlideStart : content.find('.air-slider-callback-beforeSlideStart').val(),
                            beforePause : content.find('.air-slider-callback-beforePause').val(),
                            beforeResume : content.find('.air-slider-callback-beforeResume').val(),
                    };
                    final_options.push({"id":parseInt($('.air-admin .air-slider .air-save-settings').data('id')),"name":$.trim(content.find('#air-slider-name').val()),"alias":$.trim(content.find('#air-slider-alias').text()),"slider_option":JSON.stringify(options)});
                    // Do the ajax call
                    jQuery.ajax({
                            type : 'POST',
                            dataType : 'json',
                            url : ajaxurl,
                            data : {
                                    // Is it saving or updating?
                                    action: $('.air-admin .air-slider').hasClass('air-add-slider') ? 'airslider_addSlider' : 'airslider_editSlider',
                                    datas : final_options,
                            },
                            success: function(response) {
                                    // If adding a new slider, response will be the generated id, else will be the number of rows modified
                                    if(response !== false && response!='duplicate' && response!='') {
                                            // If is adding a slider, redirect
                                            if($('.air-admin .air-slider').hasClass('air-add-slider')) {
                                                    airsliderShowMsg(airslider_translations.slider_generate,'success');
                                                    window.location.href = '?page=airslider&view=edit&id=' + response;
                                            }
                                            else
                                            {
                                                $('.air-slider-title').html('Editing Slider: '+response);
                                                $('#air-slides').find('.air-slide-editing-area').css('width',parseInt(content.find('#air-slider-startWidth').val()));
                                                $('#air-slides').find('.air-slide-editing-area').css('height',parseInt(content.find('#air-slider-startHeight').val()));
                                                airsliderShowMsg(airslider_translations.slider_save,'success');
                                            }    
                                    }
                                    else {
                                        if(response === false || response == '')
                                        {
                                            airsliderShowMsg(airslider_translations.slider_error,'danger');
                                        }
                                        else if(response == 'duplicate'){
                                            airsliderShowMsg(airslider_translations.slider_already_find+' "'+ $.trim(content.find('#air-slider-alias').text()) +'" '+airslider_translations.slider_exists,'danger');
                                        }
                                    }
                            },

                            error: function(XMLHttpRequest, textStatus, errorThrown) {
                                    airsliderShowMsg('Error saving slider!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                            }
                    });
            }

            /**
             * Sends an array with all the slides options
             * 
             * @param {integer} slide_id slide id
            */
            function  airsliderSaveSlide(slide_id) {
                    var slide_index = $('.air-admin .air-slide-tab').find('li.active').index();
                    var slide = $('.air-admin .air-slider #air-slides .air-slide:eq('+ slide_index +')');
                    var i = 0;
                    var j = 0;
                    var final_options = new Array();
                    var slider_parent = parseInt($('.air-admin .air-save-settings').data('id'));
                    
                    
                    slide.each(function() {
                            j=0;
                            var element_arr = new Array();
                            var slide = $(this);
                            var content = slide.find('.air-slide-settings-list');

                            var options = {
//					position : i,					
                                    background_type_image : slide.find('.air-slide-editing-area').css('background-image') == 'none' ? 'none' : slide.find('.air-slide-editing-area').data('background-image-src') + "",
//                                    background_type_color : content.find('input[name="air-slide-background-type-color"]:checked').val() == '0' ? 'transparent' : slide.find('.air-slide-editing-area').css('background-color') + "",
                                    background_type_color : content.find('input[name="air-slide-background-type-color"]:checked').val() == '0' ? 'transparent' : $.trim(content.find('.air-slide-background-type-color-picker-input').val()),
                                    background_opacity : content.find('input[name="air-slide-background-type-color"]:checked').val() == '0' ? '100' : $.trim(content.find('.air-slide-background-opacity').val()),
                                    background_propriety_position_x : ($.trim(content.find('.air-slide-background-propriety-position-x').val())!='')?content.find('.air-slide-background-propriety-position-x').val():'0',
                                    background_propriety_position_y : ($.trim(content.find('.air-slide-background-propriety-position-y').val())!='')?content.find('.air-slide-background-propriety-position-y').val():'0',
                                    background_repeat : content.find('input[name="air-slide-background-repeat"]:checked').val() == '0' ? 'no-repeat' : 'repeat',
                                    background_propriety_size : content.find('.air-slide-background-propriety-size').val(),
                                    data_in : content.find('.air-slide-data-in').val(),
                                    data_out : content.find('.air-slide-data-out').val(),
                                    data_time : ($.trim(content.find('.air-slide-data-time').val())!='')?parseInt(content.find('.air-slide-data-time').val()):'0',
                                    data_easeIn : ($.trim(content.find('.air-slide-data-easeIn').val())!='')?parseInt(content.find('.air-slide-data-easeIn').val()):'0',
                                    data_easeOut : ($.trim(content.find('.air-slide-data-easeOut').val())!='')?parseInt(content.find('.air-slide-data-easeOut').val()):'0',
                                    custom_css : content.find('.air-slide-custom-css').val(),
                            };
                            var elements = slide.find('.air-elements .air-element-settings');
                            elements.each(function() {
                                    var element = $(this);

                                    // Stop each loop when reach the void element
                                    if(element.hasClass('air-void-element-settings')) {
                                            return;
                                    }
                                    var video_type = (element.find('.air-element-video-type').length > 0 && element.find('.air-element-video-type').is(':checked')) ? element.find('.air-element-video-type:checked').val() : '';
                                    var video_link = '';
                                    var video_id = '';
                                    var video_html5_mp4_video_link = '';
                                    var video_html5_webm_video_link = '';
                                    var video_html5_ogv_video_link = '';
                                    var video_html5_poster_url = '';
                                    var video_width = '';
                                    var video_height = '';
                                    var video_full_width = '';
                                    var video_autoplay = '';
                                    var video_autoplay_firsttime = '';
                                    var next_slide_on_video_end = '';
                                    var video_loop = '';
                                    var video_force_rewind = '';
                                    var video_mute = '';
                                    var video_preview_img_src = '';
                                    var video_preview_img_alt = '';
                                    var video_option = '';
                                    var is_preview = '';
                                    if(video_type == 'Y')
                                    {
                                        video_link = element.find('.air-element-youtube-video-link').length > 0 ? element.find('.air-element-youtube-video-link').val() : '';
                                        if(video_link!=''){
                                            video_id = airsliderGetYoutubeIDFromUrl(video_link);
                                        }
                                        video_option = '.air-youtube-option';
                                        is_preview = element.hasClass('air-video-element-settings') ? element.find(video_option).find('.air-preview-image-element-upload-button').data('is-preview') : '';
                                    }
                                    else if(video_type == 'V')
                                    {
                                        video_link = element.find('.air-element-vimeo-video-link').length > 0 ? element.find('.air-element-vimeo-video-link').val() : '';
                                        if(video_link!=''){
                                            video_id = airsliderGetVimeoIDFromUrl(video_link);
                                        }
                                        video_option = '.air-vimeo-option';
                                        is_preview = element.hasClass('air-video-element-settings') ? element.find(video_option).find('.air-preview-image-element-upload-button').data('is-preview') : '';
                                    }
                                    else if(video_type == 'H')
                                    {
                                        video_option = '.air-html5-option';
                                        video_html5_mp4_video_link = element.find('.air-element-html5-mp4-video-link').length > 0 ? element.find('.air-element-html5-mp4-video-link').val() : '';
                                        video_html5_webm_video_link = element.find('.air-element-html5-webm-video-link').length > 0 ? element.find('.air-element-html5-webm-video-link').val() : '';
                                        video_html5_ogv_video_link = element.find('.air-element-html5-ogv-video-link').length > 0 ? element.find('.air-element-html5-ogv-video-link').val() : '';
                                        video_html5_poster_url = element.find('.air-element-html5-poster-url').length > 0 ? element.find('.air-element-html5-poster-url').val() : '';
                                        is_preview = 'false';
                                        if($.trim(video_html5_poster_url)!='')
                                        {
                                            is_preview = 'true';
                                        }
                                    }

                                    video_width = element.find(video_option).find('.air-element-video-width').length > 0 ? element.find(video_option).find('.air-element-video-width').val() : '';
                                    video_height = element.find(video_option).find('.air-element-video-height').length > 0 ? element.find(video_option).find('.air-element-video-height').val() : '';
                                    video_full_width = (element.find(video_option).find('.air-element-video-full-width').length > 0 && element.find(video_option).find('.air-element-video-full-width').is(':checked')) ? element.find(video_option).find('.air-element-video-full-width').val() : '';
                                    video_autoplay = (element.find(video_option).find('.air-element-video-autoplay').length > 0 && element.find(video_option).find('.air-element-video-autoplay').is(':checked')) ? element.find(video_option).find('.air-element-video-autoplay').val() : '';
                                    video_autoplay_firsttime = (element.find(video_option).find('.air-element-video-autoplay-firsttime').length > 0 && element.find(video_option).find('.air-element-video-autoplay-firsttime').is(':checked')) ? element.find(video_option).find('.air-element-video-autoplay-firsttime').val() : '';
                                    next_slide_on_video_end = (element.find(video_option).find('.air-element-next-slide-on-video-end').length > 0 && element.find(video_option).find('.air-element-next-slide-on-video-end').is(':checked')) ? element.find(video_option).find('.air-element-next-slide-on-video-end').val() : '';
                                    video_loop = (element.find(video_option).find('.air-element-video-loop').length > 0 && element.find(video_option).find('.air-element-video-loop').is(':checked')) ? element.find(video_option).find('.air-element-video-loop').val() : '';
                                    video_force_rewind = (element.find(video_option).find('.air-element-video-force-rewind').length > 0 && element.find(video_option).find('.air-element-video-force-rewind').is(':checked')) ? element.find(video_option).find('.air-element-video-force-rewind').val() : '';
                                    video_mute = (element.find(video_option).find('.air-element-video-mute').length > 0 && element.find(video_option).find('.air-element-video-mute').is(':checked')) ? element.find(video_option).find('.air-element-video-mute').val() : '';
                                    video_preview_img_src = element.hasClass('air-video-element-settings') ? element.find(video_option).find('.air-preview-image-element-upload-button').data('src') : '';
                                    video_preview_img_alt = element.hasClass('air-video-element-settings') ? element.find(video_option).find('.air-preview-image-element-upload-button').data('alt') : '';
                                    var layers = {	
                                            position : element.index(),
                                            type : element.hasClass('air-text-element-settings') ? 'text' : element.hasClass('air-image-element-settings') ? 'image' : element.hasClass('air-video-element-settings') ? 'video':'',
                                            inner_html : element.hasClass('air-text-element-settings') ? element.find('.air-element-inner-html').val() : '',
                                            image_src : element.hasClass('air-image-element-settings') ? element.find('.air-image-element-upload-button').data('src') : '',
                                            image_alt : element.find('.air-element-image-alt').length > 0 ? $.trim(element.find('.air-element-image-alt').val()) : '',
                                            image_width : element.hasClass('air-image-element-settings') ? element.find('.air-image-element-upload-button').data('width') : '',
                                            image_height : element.hasClass('air-image-element-settings') ? element.find('.air-image-element-upload-button').data('height') : '',
                                            image_scale : (element.find('.air-element-image-scale').length > 0 && element.find('.air-element-image-scale').is(':checked')) ? element.find('.air-element-image-scale').val() : '',
                                            data_left : parseInt(element.find('.air-element-data-left').val()),
                                            data_top : parseInt(element.find('.air-element-data-top').val()),
                                            z_index : parseInt(element.find('.air-element-z-index').val()),
                                            data_delay : parseInt(element.find('.air-element-data-delay').val()),
                                            data_time : element.find('.air-element-data-time').val(),
                                            data_in : element.find('.air-element-data-in').val(),
                                            data_out : element.find('.air-element-data-out').val(),
                                            data_ignoreEaseOut : element.find('.air-element-data-ignoreEaseOut').prop('checked') ? 1 : 0,
                                            data_easeIn : parseInt(element.find('.air-element-data-easeIn').val()),
                                            data_easeOut : parseInt(element.find('.air-element-data-easeOut').val()),
                                            custom_css : element.find('.air-element-custom-css').val(),
                                            attr_id : (element.find('.air-element-attr-id').length > 0)?element.find('.air-element-attr-id').val():'',
                                            attr_class : (element.find('.air-element-attr-class').length > 0)?element.find('.air-element-attr-class').val():'',
                                            attr_title : (element.find('.air-element-attr-title').length > 0)?element.find('.air-element-attr-title').val():'',
                                            attr_rel : (element.find('.air-element-attr-rel').length > 0)?element.find('.air-element-attr-rel').val():'',
                                            link : (element.find('.air-element-link').length > 0)?element.find('.air-element-link').val():'',
                                            link_id : (element.find('.air-element-link-id').length > 0)?element.find('.air-element-link-id').val():'',
                                            link_class : (element.find('.air-element-link-class').length > 0)?element.find('.air-element-link-class').val():'',
                                            link_title : (element.find('.air-element-link-title').length > 0)?element.find('.air-element-link-title').val():'',
                                            link_rel : (element.find('.air-element-link-rel').length > 0)?element.find('.air-element-link-rel').val():'',
                                            link_new_tab : ( element.find('.air-element-link-new-tab').length > 0 && element.find('.air-element-link-new-tab').prop('checked') ) ? 1 : 0,
                                            video_type : video_type,
                                            video_link : video_link,
                                            video_id : video_id,
                                            video_html5_mp4_video_link : video_html5_mp4_video_link,
                                            video_html5_webm_video_link : video_html5_webm_video_link,
                                            video_html5_ogv_video_link : video_html5_ogv_video_link,
                                            video_html5_poster_url : video_html5_poster_url,
                                            video_width : video_width,
                                            video_height : video_height,
                                            video_full_width : video_full_width,
                                            video_autoplay : video_autoplay,
                                            video_autoplay_firsttime : video_autoplay_firsttime,
                                            next_slide_on_video_end : next_slide_on_video_end,
                                            video_loop : video_loop,
                                            video_force_rewind : video_force_rewind,
                                            video_mute : video_mute,
                                            video_preview_img_src : video_preview_img_src,
                                            video_preview_img_alt : video_preview_img_alt,
                                            video_is_preview_set : is_preview,
                                    };
                                    
                                    element_arr.push(layers);
                                    j++;
                            });
                            final_options.push({"slider_parent":slider_parent,"position":slide_index,"slide":options,"slide_id":slide_id,"layers":JSON.stringify(element_arr)});
                            i++;
                    });
                    jQuery.ajax({
                            type : 'POST',
                            dataType : 'json',
                            url : ajaxurl,
                            data : {
                                    action: 'airslider_editSlide',
                                    datas : final_options,
                            },
                            success: function(response) {
                                    if(response !== false && response!='') {
                                            if(response != 'update')
                                            {
                                                slide.find('.air-save-slide').attr('data-slide-id',response);
                                            }    
                                            airsliderShowMsg(airslider_translations.slide_save,'success');
                                            airsliderUpdateSlidePos()
                                                
                                    }
                                    else {
                                        airsliderShowMsg(airslider_translations.slide_error,'danger');
                                    }
                            },

                            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                airsliderShowMsg('Error saving slide!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                            }
                    });
            }

            /**
             * Delete Slide
             * 
             * @param {integer} del_slide_id slide id
            */
            function airsliderDeleteSlide(del_slide_id){
                if(del_slide_id!='' && del_slide_id!=0 && del_slide_id!='0')
                {
                    // Get options
                    var options = {
                            id : parseInt(del_slide_id),
                    };
                    jQuery.ajax({
                        type : 'POST',
                        dataType : 'json',
                        url : ajaxurl,
                        data : {
                                action: 'airslider_deleteSlide',
                                datas : options,
                        },
                        success: function(response) {
                                if(response !== false && response!='') {
                                        airsliderShowMsg(airslider_translations.slide_delete,'success');
                                        airsliderUpdateSlidePos();
                                }
                                else {
                                    airsliderShowMsg(airslider_translations.slide_delete_error,'danger');
                                }
                        },

                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            airsliderShowMsg('Error deleting slide!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                        }
                });
                }
                else
                {
                    airsliderShowMsg(airslider_translations.slide_delete,'success');
                    airsliderUpdateSlidePos();
                }
            }
            
            /**
             * Update all slide position
            */
            function airsliderUpdateSlidePos(){
                var slide_postion = new Array();
                //to reset position of all slides
                var slides = $('.air-admin .air-slider #air-slides .air-slide');
                var i=0;
                slides.each(function(){
                    var slide_pos = $(this);
                    var slide_id_pos = slide_pos.find('.air-save-slide').attr('data-slide-id');
                    if(slide_id_pos!='' && slide_id_pos!=0 && slide_id_pos!='0'){
                        slide_postion.push({"position_pos":i,"slide_id_pos":slide_id_pos});
                        i++;
                    }
                });
                
                jQuery.ajax({
                        type : 'POST',
                        dataType : 'json',
                        url : ajaxurl,
                        data : {
                                action: 'airslider_updateSlidePos',
                                slide_pos_datas : slide_postion,
                        },
                        success: function(response) {
                                if(response !== false && response!='') {
//                                        airsliderShowMsg('Slides Position have been updated successfully.','success');
                                }
                                else {
                                    airsliderShowMsg(airslider_translations.slide_update_position_error,'danger');
                                }
                        },

                        error: function(XMLHttpRequest, textStatus, errorThrown) { 
                            airsliderShowMsg('Error updating slides position!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                        }
                });
            }
           
            /**
             * Delete particular slider
             * 
             * @param {object} content object of slider anchor
            */
            function  airsliderDeleteSlider(content) {
                    // Get options
                    var options = {
                            id : parseInt(content.data('delete')),
                    };

                    // Do the ajax call
                    jQuery.ajax({
                            type : 'POST',
                            dataType : 'json',
                            url : ajaxurl,
                            data : {
                                    action: 'airslider_deleteSlider',
                                    datas : options,
                            },
                            success: function(response) {
                                    if(response !== false && response!='') {
                                        airsliderShowMsg(airslider_translations.slider_delete,'success');
                                        window.location.href = '?page=airslider';
                                    }
                                    else {
                                        airsliderShowMsg(airslider_translations.slider_delete_error,'danger');
                                    }
                            },

                            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                      airsliderShowMsg('Error deleting slider!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                            },
                    });
            }
            
            /**
             * Duplicate particular slider
             * 
             * @param {object} content object of slider anchor
            */
            function  airsliderDuplicateSlider(content) {
                    // Get options
                    var options = {
                            id : parseInt(content.data('duplicate')),
                    };

                    // Do the ajax call
                    jQuery.ajax({
                            type : 'POST',
                            dataType : 'json',
                            url : ajaxurl,
                            data : {
                                    action: 'airslider_duplicateSlider',
                                    datas : options,
                            },
                            success: function(response) {
                                    if(response !== false && response!='') {
                                        airsliderShowMsg(airslider_translations.slider_duplicate,'success');
                                        window.location.href = '?page=airslider';
                                    }
                                    else {
                                        airsliderShowMsg(airslider_translations.slider_duplicate_error,'danger');
                                    }
                            },

                            error: function(XMLHttpRequest, textStatus, errorThrown) { 
                                airsliderShowMsg('Error duplicating slider!<br>Status:'+textStatus+' <br>Error:'+errorThrown,'danger');
                            },
                    });
            }
    });
})(jQuery);