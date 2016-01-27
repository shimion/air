/**
 * Plugin Name: Air Slider
 * Plugin URI: http://www.simThemes.com/product/wordpress-plugins/air-slider/
 * Description: The premium WordPress slider with elements animations and much more.
 * Author: Solwin Infotech
 * Author URI: http://solwininfotech.com/
 * Copyright: Solwin Infotech
 * Version: 1.0.0
 * Requires at least: 3.8.0
 * Tested up to: 4.3.1
 * License: GPLv2 or later
 */

(function($) {
	
	/*******************************/
	/** Air SLIDER **/
	/******************************/
	
	var Airslider = function(target, settings) {
	
		/************************/
		/** EXTERNAL RESOURCES **/
		/************************/
		
		// TouchSwipe 1.6 (http://labs.rampinteractive.co.uk/touchSwipe/)
		// fn.swipe has been replaced with fn.airslider_swipe to avoid compatibility issues with other scripts
		(function(a){if(typeof define==="function"&&define.amd&&define.amd.jQuery){define(["jquery"],a)}else{a(jQuery)}}(function(f){var p="left",o="right",e="up",x="down",c="in",z="out",m="none",s="auto",l="swipe",t="pinch",A="tap",j="doubletap",b="longtap",y="hold",D="horizontal",u="vertical",i="all",r=10,g="start",k="move",h="end",q="cancel",a="ontouchstart" in window,v=window.navigator.msPointerEnabled&&!window.navigator.pointerEnabled,d=window.navigator.pointerEnabled||window.navigator.msPointerEnabled,B="TouchSwipe";var n={fingers:1,threshold:75,cancelThreshold:null,pinchThreshold:20,maxTimeThreshold:null,fingerReleaseThreshold:250,longTapThreshold:500,doubleTapThreshold:200,swipe:null,swipeLeft:null,swipeRight:null,swipeUp:null,swipeDown:null,swipeStatus:null,pinchIn:null,pinchOut:null,pinchStatus:null,click:null,tap:null,doubleTap:null,longTap:null,hold:null,triggerOnTouchEnd:true,triggerOnTouchLeave:false,allowPageScroll:"auto",fallbackToMouseEvents:true,excludedElements:"label, button, input, select, textarea, a, .noSwipe"};f.fn.airslider_swipe=function(G){var F=f(this),E=F.data(B);if(E&&typeof G==="string"){if(E[G]){return E[G].apply(this,Array.prototype.slice.call(arguments,1))}else{f.error("Method "+G+" does not exist on jQuery.swipe")}}else{if(!E&&(typeof G==="object"||!G)){return w.apply(this,arguments)}}return F};f.fn.airslider_swipe.defaults=n;f.fn.airslider_swipe.phases={PHASE_START:g,PHASE_MOVE:k,PHASE_END:h,PHASE_CANCEL:q};f.fn.airslider_swipe.directions={LEFT:p,RIGHT:o,UP:e,DOWN:x,IN:c,OUT:z};f.fn.airslider_swipe.pageScroll={NONE:m,HORIZONTAL:D,VERTICAL:u,AUTO:s};f.fn.airslider_swipe.fingers={ONE:1,TWO:2,THREE:3,ALL:i};function w(E){if(E&&(E.allowPageScroll===undefined&&(E.swipe!==undefined||E.swipeStatus!==undefined))){E.allowPageScroll=m}if(E.click!==undefined&&E.tap===undefined){E.tap=E.click}if(!E){E={}}E=f.extend({},f.fn.airslider_swipe.defaults,E);return this.each(function(){var G=f(this);var F=G.data(B);if(!F){F=new C(this,E);G.data(B,F)}})}function C(a4,av){var az=(a||d||!av.fallbackToMouseEvents),J=az?(d?(v?"MSPointerDown":"pointerdown"):"touchstart"):"mousedown",ay=az?(d?(v?"MSPointerMove":"pointermove"):"touchmove"):"mousemove",U=az?(d?(v?"MSPointerUp":"pointerup"):"touchend"):"mouseup",S=az?null:"mouseleave",aD=(d?(v?"MSPointerCancel":"pointercancel"):"touchcancel");var ag=0,aP=null,ab=0,a1=0,aZ=0,G=1,aq=0,aJ=0,M=null;var aR=f(a4);var Z="start";var W=0;var aQ=null;var T=0,a2=0,a5=0,ad=0,N=0;var aW=null,af=null;try{aR.bind(J,aN);aR.bind(aD,a9)}catch(ak){f.error("events not supported "+J+","+aD+" on jQuery.swipe")}this.enable=function(){aR.bind(J,aN);aR.bind(aD,a9);return aR};this.disable=function(){aK();return aR};this.destroy=function(){aK();aR.data(B,null);return aR};this.option=function(bc,bb){if(av[bc]!==undefined){if(bb===undefined){return av[bc]}else{av[bc]=bb}}else{f.error("Option "+bc+" does not exist on jQuery.swipe.options")}return null};function aN(bd){if(aB()){return}if(f(bd.target).closest(av.excludedElements,aR).length>0){return}var be=bd.originalEvent?bd.originalEvent:bd;var bc,bb=a?be.touches[0]:be;Z=g;if(a){W=be.touches.length}else{bd.preventDefault()}ag=0;aP=null;aJ=null;ab=0;a1=0;aZ=0;G=1;aq=0;aQ=aj();M=aa();R();if(!a||(W===av.fingers||av.fingers===i)||aX()){ai(0,bb);T=at();if(W==2){ai(1,be.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}if(av.swipeStatus||av.pinchStatus){bc=O(be,Z)}}else{bc=false}if(bc===false){Z=q;O(be,Z);return bc}else{if(av.hold){af=setTimeout(f.proxy(function(){aR.trigger("hold",[be.target]);if(av.hold){bc=av.hold.call(aR,be,be.target)}},this),av.longTapThreshold)}ao(true)}return null}function a3(be){var bh=be.originalEvent?be.originalEvent:be;if(Z===h||Z===q||am()){return}var bd,bc=a?bh.touches[0]:bh;var bf=aH(bc);a2=at();if(a){W=bh.touches.length}if(av.hold){clearTimeout(af)}Z=k;if(W==2){if(a1==0){ai(1,bh.touches[1]);a1=aZ=au(aQ[0].start,aQ[1].start)}else{aH(bh.touches[1]);aZ=au(aQ[0].end,aQ[1].end);aJ=ar(aQ[0].end,aQ[1].end)}G=a7(a1,aZ);aq=Math.abs(a1-aZ)}if((W===av.fingers||av.fingers===i)||!a||aX()){aP=aL(bf.start,bf.end);al(be,aP);ag=aS(bf.start,bf.end);ab=aM();aI(aP,ag);if(av.swipeStatus||av.pinchStatus){bd=O(bh,Z)}if(!av.triggerOnTouchEnd||av.triggerOnTouchLeave){var bb=true;if(av.triggerOnTouchLeave){var bg=aY(this);bb=E(bf.end,bg)}if(!av.triggerOnTouchEnd&&bb){Z=aC(k)}else{if(av.triggerOnTouchLeave&&!bb){Z=aC(h)}}if(Z==q||Z==h){O(bh,Z)}}}else{Z=q;O(bh,Z)}if(bd===false){Z=q;O(bh,Z)}}function L(bb){var bc=bb.originalEvent;if(a){if(bc.touches.length>0){F();return true}}if(am()){W=ad}a2=at();ab=aM();if(ba()||!an()){Z=q;O(bc,Z)}else{if(av.triggerOnTouchEnd||(av.triggerOnTouchEnd==false&&Z===k)){bb.preventDefault();Z=h;O(bc,Z)}else{if(!av.triggerOnTouchEnd&&a6()){Z=h;aF(bc,Z,A)}else{if(Z===k){Z=q;O(bc,Z)}}}}ao(false);return null}function a9(){W=0;a2=0;T=0;a1=0;aZ=0;G=1;R();ao(false)}function K(bb){var bc=bb.originalEvent;if(av.triggerOnTouchLeave){Z=aC(h);O(bc,Z)}}function aK(){aR.unbind(J,aN);aR.unbind(aD,a9);aR.unbind(ay,a3);aR.unbind(U,L);if(S){aR.unbind(S,K)}ao(false)}function aC(bf){var be=bf;var bd=aA();var bc=an();var bb=ba();if(!bd||bb){be=q}else{if(bc&&bf==k&&(!av.triggerOnTouchEnd||av.triggerOnTouchLeave)){be=h}else{if(!bc&&bf==h&&av.triggerOnTouchLeave){be=q}}}return be}function O(bd,bb){var bc=undefined;if(I()||V()){bc=aF(bd,bb,l)}else{if((P()||aX())&&bc!==false){bc=aF(bd,bb,t)}}if(aG()&&bc!==false){bc=aF(bd,bb,j)}else{if(ap()&&bc!==false){bc=aF(bd,bb,b)}else{if(ah()&&bc!==false){bc=aF(bd,bb,A)}}}if(bb===q){a9(bd)}if(bb===h){if(a){if(bd.touches.length==0){a9(bd)}}else{a9(bd)}}return bc}function aF(be,bb,bd){var bc=undefined;if(bd==l){aR.trigger("swipeStatus",[bb,aP||null,ag||0,ab||0,W,aQ]);if(av.swipeStatus){bc=av.swipeStatus.call(aR,be,bb,aP||null,ag||0,ab||0,W,aQ);if(bc===false){return false}}if(bb==h&&aV()){aR.trigger("swipe",[aP,ag,ab,W,aQ]);if(av.swipe){bc=av.swipe.call(aR,be,aP,ag,ab,W,aQ);if(bc===false){return false}}switch(aP){case p:aR.trigger("swipeLeft",[aP,ag,ab,W,aQ]);if(av.swipeLeft){bc=av.swipeLeft.call(aR,be,aP,ag,ab,W,aQ)}break;case o:aR.trigger("swipeRight",[aP,ag,ab,W,aQ]);if(av.swipeRight){bc=av.swipeRight.call(aR,be,aP,ag,ab,W,aQ)}break;case e:aR.trigger("swipeUp",[aP,ag,ab,W,aQ]);if(av.swipeUp){bc=av.swipeUp.call(aR,be,aP,ag,ab,W,aQ)}break;case x:aR.trigger("swipeDown",[aP,ag,ab,W,aQ]);if(av.swipeDown){bc=av.swipeDown.call(aR,be,aP,ag,ab,W,aQ)}break}}}if(bd==t){aR.trigger("pinchStatus",[bb,aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchStatus){bc=av.pinchStatus.call(aR,be,bb,aJ||null,aq||0,ab||0,W,G,aQ);if(bc===false){return false}}if(bb==h&&a8()){switch(aJ){case c:aR.trigger("pinchIn",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchIn){bc=av.pinchIn.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break;case z:aR.trigger("pinchOut",[aJ||null,aq||0,ab||0,W,G,aQ]);if(av.pinchOut){bc=av.pinchOut.call(aR,be,aJ||null,aq||0,ab||0,W,G,aQ)}break}}}if(bd==A){if(bb===q||bb===h){clearTimeout(aW);clearTimeout(af);if(Y()&&!H()){N=at();aW=setTimeout(f.proxy(function(){N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}},this),av.doubleTapThreshold)}else{N=null;aR.trigger("tap",[be.target]);if(av.tap){bc=av.tap.call(aR,be,be.target)}}}}else{if(bd==j){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("doubletap",[be.target]);if(av.doubleTap){bc=av.doubleTap.call(aR,be,be.target)}}}else{if(bd==b){if(bb===q||bb===h){clearTimeout(aW);N=null;aR.trigger("longtap",[be.target]);if(av.longTap){bc=av.longTap.call(aR,be,be.target)}}}}}return bc}function an(){var bb=true;if(av.threshold!==null){bb=ag>=av.threshold}return bb}function ba(){var bb=false;if(av.cancelThreshold!==null&&aP!==null){bb=(aT(aP)-ag)>=av.cancelThreshold}return bb}function ae(){if(av.pinchThreshold!==null){return aq>=av.pinchThreshold}return true}function aA(){var bb;if(av.maxTimeThreshold){if(ab>=av.maxTimeThreshold){bb=false}else{bb=true}}else{bb=true}return bb}function al(bb,bc){if(av.allowPageScroll===m||aX()){bb.preventDefault()}else{var bd=av.allowPageScroll===s;switch(bc){case p:if((av.swipeLeft&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case o:if((av.swipeRight&&bd)||(!bd&&av.allowPageScroll!=D)){bb.preventDefault()}break;case e:if((av.swipeUp&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break;case x:if((av.swipeDown&&bd)||(!bd&&av.allowPageScroll!=u)){bb.preventDefault()}break}}}function a8(){var bc=aO();var bb=X();var bd=ae();return bc&&bb&&bd}function aX(){return !!(av.pinchStatus||av.pinchIn||av.pinchOut)}function P(){return !!(a8()&&aX())}function aV(){var be=aA();var bg=an();var bd=aO();var bb=X();var bc=ba();var bf=!bc&&bb&&bd&&bg&&be;return bf}function V(){return !!(av.swipe||av.swipeStatus||av.swipeLeft||av.swipeRight||av.swipeUp||av.swipeDown)}function I(){return !!(aV()&&V())}function aO(){return((W===av.fingers||av.fingers===i)||!a)}function X(){return aQ[0].end.x!==0}function a6(){return !!(av.tap)}function Y(){return !!(av.doubleTap)}function aU(){return !!(av.longTap)}function Q(){if(N==null){return false}var bb=at();return(Y()&&((bb-N)<=av.doubleTapThreshold))}function H(){return Q()}function ax(){return((W===1||!a)&&(isNaN(ag)||ag<av.threshold))}function a0(){return((ab>av.longTapThreshold)&&(ag<r))}function ah(){return !!(ax()&&a6())}function aG(){return !!(Q()&&Y())}function ap(){return !!(a0()&&aU())}function F(){a5=at();ad=event.touches.length+1}function R(){a5=0;ad=0}function am(){var bb=false;if(a5){var bc=at()-a5;if(bc<=av.fingerReleaseThreshold){bb=true}}return bb}function aB(){return !!(aR.data(B+"_intouch")===true)}function ao(bb){if(bb===true){aR.bind(ay,a3);aR.bind(U,L);if(S){aR.bind(S,K)}}else{aR.unbind(ay,a3,false);aR.unbind(U,L,false);if(S){aR.unbind(S,K,false)}}aR.data(B+"_intouch",bb===true)}function ai(bc,bb){var bd=bb.identifier!==undefined?bb.identifier:0;aQ[bc].identifier=bd;aQ[bc].start.x=aQ[bc].end.x=bb.pageX||bb.clientX;aQ[bc].start.y=aQ[bc].end.y=bb.pageY||bb.clientY;return aQ[bc]}function aH(bb){var bd=bb.identifier!==undefined?bb.identifier:0;var bc=ac(bd);bc.end.x=bb.pageX||bb.clientX;bc.end.y=bb.pageY||bb.clientY;return bc}function ac(bc){for(var bb=0;bb<aQ.length;bb++){if(aQ[bb].identifier==bc){return aQ[bb]}}}function aj(){var bb=[];for(var bc=0;bc<=5;bc++){bb.push({start:{x:0,y:0},end:{x:0,y:0},identifier:0})}return bb}function aI(bb,bc){bc=Math.max(bc,aT(bb));M[bb].distance=bc}function aT(bb){if(M[bb]){return M[bb].distance}return undefined}function aa(){var bb={};bb[p]=aw(p);bb[o]=aw(o);bb[e]=aw(e);bb[x]=aw(x);return bb}function aw(bb){return{direction:bb,distance:0}}function aM(){return a2-T}function au(be,bd){var bc=Math.abs(be.x-bd.x);var bb=Math.abs(be.y-bd.y);return Math.round(Math.sqrt(bc*bc+bb*bb))}function a7(bb,bc){var bd=(bc/bb)*1;return bd.toFixed(2)}function ar(){if(G<1){return z}else{return c}}function aS(bc,bb){return Math.round(Math.sqrt(Math.pow(bb.x-bc.x,2)+Math.pow(bb.y-bc.y,2)))}function aE(be,bc){var bb=be.x-bc.x;var bg=bc.y-be.y;var bd=Math.atan2(bg,bb);var bf=Math.round(bd*180/Math.PI);if(bf<0){bf=360-Math.abs(bf)}return bf}function aL(bc,bb){var bd=aE(bc,bb);if((bd<=45)&&(bd>=0)){return p}else{if((bd<=360)&&(bd>=315)){return p}else{if((bd>=135)&&(bd<=225)){return o}else{if((bd>45)&&(bd<135)){return x}else{return e}}}}}function at(){var bb=new Date();return bb.getTime()}function aY(bb){bb=f(bb);var bd=bb.offset();var bc={left:bd.left,right:bd.left+bb.outerWidth(),top:bd.top,bottom:bd.top+bb.outerHeight()};return bc}function E(bb,bc){return(bb.x>bc.left&&bb.x<bc.right&&bb.y>bc.top&&bb.y<bc.bottom)}}}));
		
		/**********************/
		/** USEFUL VARIABLES **/
		/**********************/
	
		// HTML classes of the slider
		var SLIDER 	 = $(target);
		var AIR 	 = 'div.airslider';
		var SLIDES 	 = 'ul.air-slides';
		var SLIDE  	 = 'li.air-slide';
		var ELEMENTS = '> *';
                var videoplaying=false;
                
		
		var total_slides;
		var current_slide = 0;
		
		var paused = false;
		var can_pause = false;
		var can_change_slide = false;
		
		// Slide timer: only current slide. Elements timers: all the elements. This prevents conflicts during changes and pauses
		var current_slide_time_timer = new Timer(function() {}, 0);
		var elements_times_timers = new Array();
		var elements_delays_timers = new Array();
		
		var scale = 1;
		var window_width_before_setResponsive = 0; // This variable is useful ONLY to prevent that window.resize fires on vertical resizing or on a right window width
				
		/********************/
		/** INITIALIZATION **/
		/********************/
		
		airsliderInit();
		
                /**
                * Convert Hex o rgb
                * 
                * @param {string} hex color in hex
                * 
                * @param {string} opacity color opacity
                * 
                * @return {string} rgba color
                */
                function airsliderConvertHex(hex,opacity){
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
                * @param {string} color color in hex/rgb
                * 
                * @return {string} hex color
                */
                function airsliderRGBToHex(color) {
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
                 * The slider constructor: runs automatically only the first time, sets the basic needs of the slider and the preloader then runs Air Slider
                */
		function airsliderInit() {			
			// Add wrappers and classes
//			var customCSS = SLIDER.find('#customCSS').val();
//			SLIDER.wrapInner('<div class="airslider" style="' + customCSS + '" />');
			SLIDER.wrapInner('<div class="airslider" />');
			SLIDER.find(AIR + ' > ul').addClass('air-slides');
			SLIDER.find(AIR + ' ' + SLIDES + ' > li').addClass('air-slide');
			
			// Set total_slides
			total_slides = getSlides().length;
			
			// If the slider is empty, stop
			if(total_slides == 0) {
				return false;
			}
			
			// If there is only a slide, clone it
			if(total_slides == 1) {
				var clone = getSlide(0);
				var prepend = SLIDER.find(AIR).find(SLIDES);
				clone.clone().prependTo(prepend);
				total_slides++;
			}
			
			// Show controls (previous and next arrows)
			if(settings.showControls) {
                            var controlClass = $.trim(SLIDER.find('#controlClass').val());
				SLIDER.find(AIR).append('<div class="air-controls '+controlClass+'"><span class="air-next"></span><span class="air-previous"></span></div>');
			}
			
			// Show navigation
			if(settings.showNavigation) {
                            var navClass = $.trim(SLIDER.find('#navigationClass').val());
                            var navPos = $.trim(SLIDER.find('#navigationPosition').val());
				var nav = '<div class="air-navigation '+navClass+' '+navPos+'">';
				for(var i = 0; i < total_slides; i++) {
					nav += '<span class="air-slide-link"></span>';
				}
				nav += '</div>';
				SLIDER.find(AIR).append(nav);
			}
			
			// Show progress bar
			if(settings.showTimerBar) {
                            var progressPos = $.trim(SLIDER.find('#timerBarPosition').val());
				SLIDER.find(AIR).append('<div class="air-progress-bar '+progressPos+'"></div>');
			}
			else {
				SLIDER.find(AIR).append('<div class="air-progress-bar air-progress-bar-hidden"></div>');
			}
			// Show Shadow
			if(settings.showShadowBar) {
                            var shadowClass = $.trim(SLIDER.find('#shadowClass').val());
                            SLIDER.append('<div class="air-shadow-bar '+shadowClass+'"></div>');
			}
			
			// Display slider
			SLIDER.css('display', 'block');
			
			// Set layout for the first time
			if(settings.responsive) {
				setScale();
			}			
			setLayout();
			
			airsliderSetPreloader();
			
			// In WP window.load does not fire. Need to add that variable
			if(typeof airslider_is_wordpress_admin == 'undefined' || ! airslider_is_wordpress_admin) {
				airsliderLoadWindow();
			}
			else {
				airsliderLoadedWindow();
			}
		}
		
		/**
                 * Waits until the window loads
                */
		function airsliderLoadWindow() {
			$(window).load(function() {
                            	airsliderLoadedWindow();
			});
		}
		
		/**
                 * Does operations after window.load is complete. Need to do it as a function for back-end compatibility
                */
		function airsliderLoadedWindow() {
                    	airsliderUnsetPreloader();
			
			// Set layout for the second time
			if(settings.responsive) {
				setScale();
			}
			setLayout();
			
			window_width_before_setResponsive = $(window).width();
			
			airsliderInitProperties();
			
			airsliderAddListeners();
			
			settings.beforeStart();
			
			// Positions and responsive dimensions then run
			if(settings.responsive) {
				setResponsive();
			}
			else {
				play();
			}
		}
		
		/**
                 * Stores original slides, elements and elements contents values then hide all the slides and elements. "display: none" only if is an element, not an element content
                */
		function airsliderInitProperties() {
			getSlides().each(function() {
				var slide = $(this);
				
				slide.find(ELEMENTS).each(function() {
					var element = $(this);
					
					element.find('*').each(function() {
						var element_content = $(this);
						airsliderSetElementDatas(element_content, true);
					});
					
					airsliderSetElementDatas(element, false);
				});
				
				slide.css('display', 'none');
				slide.data('opacity', parseFloat(slide.css('opacity')));
			});
		}
		
		/**
                 * Initializes the element with original values
                 * 
                 * @param {object} element object of current element
                 * 
                 * @param {boolean} is_element_content content is set or not
                */
		function airsliderSetElementDatas(element, is_element_content) {
			element.data('width', parseFloat(element.width()));
			element.data('height', parseFloat(element.height()));			
			element.data('letter-spacing', parseFloat(element.css('letter-spacing')));
			element.data('font-size', parseFloat(element.css('font-size')));
			
			if(element.css('line-height').slice(-2).toLowerCase() == 'px') {
				element.data('line-height', parseFloat(element.css('line-height')));
			}
			else {
				element.data('line-height', parseFloat(element.css('line-height')) * getItemData(element, 'font-size'));
			}
			
			element.data('padding-top', parseFloat(element.css('padding-top')));
			element.data('padding-right', parseFloat(element.css('padding-right')));
			element.data('padding-bottom', parseFloat(element.css('padding-bottom')));
			element.data('padding-left', parseFloat(element.css('padding-left')));
			element.data('opacity', parseFloat(element.css('opacity')));
			
			if(! is_element_content) {
				element.css('display', 'none');
			}
		}
		
		/**
                 * Sets all listeners for the user interaction
                */
		function airsliderAddListeners() {
			// Make responsive. Run if resizing horizontally and the slider is not at the right dimension
			if(settings.responsive) {				
				$(window).resize(function() {
					if(window_width_before_setResponsive != $(window).width() && ((settings.layout == 'full-width' && getWidth() != $(SLIDER).width()) || ($(SLIDER).width() < getWidth() || (($(SLIDER).width() > getWidth()) && getWidth() < settings.startWidth)))) {
						setResponsive();
					}
				});
			}
			
			// Previous control click		
			SLIDER.find(AIR).find('.air-controls > .air-previous').click(function() {
				changeSlide(getPreviousSlide());
			});
			
			// Next Control click
			SLIDER.find(AIR).find('.air-controls > .air-next').click(function() {
				changeSlide(getNextSlide());
			});
			
			// Swipe and drag
			if(settings.enableSwipe) {
				SLIDER.find(AIR).airslider_swipe({
					swipeLeft : function(event, direction, distance, duration, fingerCount) {
						resume();
						changeSlide(getNextSlide());
					},
					
					swipeRight : function(event, direction, distance, duration, fingerCount) {
						resume();
						changeSlide(getPreviousSlide());
					},
				});
			}
			
			// Navigation link click
			SLIDER.find(AIR).find('.air-navigation > .air-slide-link').click(function() {
				if($(this).index() != current_slide) {
					paused = false;
					changeSlide($(this).index());
				}
			});
			
			// Pause on hover
			if(settings.pauseOnHover) {
				SLIDER.find(AIR).find(SLIDES).hover(function() {
					pause();
				});
				
				SLIDER.find(AIR).find(SLIDES).mouseleave(function() {
                                    if(videoplaying== false)
                                    {
                                    	resume();
                                    }
				});
			}
		}
		 
		/**
                 * Sets gif loader
                */
		function airsliderSetPreloader() {
			SLIDER.find(AIR).find(SLIDES).css('display', 'none');
			SLIDER.find(AIR).find('.air-progress-bar').css('display', 'none');
			SLIDER.find(AIR).find('.air-navigation').css('display', 'none');
			SLIDER.find(AIR).find('.air-controls').css('display', 'none');
                        
                        var loader_html = '';
                        var sliderBgColor = 'transparent';
                        if(SLIDER.find('#sliderBgColor').length > 0 && $.trim(SLIDER.find('#sliderBgColor').val()) != 'transparent'){
                            var getHexColor = airsliderRGBToHex($.trim(SLIDER.find('#sliderBgColor').val()));
                            var bg_opacity = $.trim(SLIDER.find('#sliderBgColorOpacity').val());
                            sliderBgColor = airsliderConvertHex(getHexColor,bg_opacity);
                        }
                        loader_html += '<div class="air-preloader" style="background-color:'+sliderBgColor+';">';
                        if($.trim(SLIDER.find('#loaderType').val()) == 'default')
                        {
                            loader_html += '<div class="air-loader '+ $.trim(SLIDER.find('#loaderClass').val()) +'">';    
                        }
                        else
                        {
                            loader_html += '<div class="air-loader" style="background-image: url(\''+$.trim(SLIDER.find('#loaderImg').val())+'\');width: '+$.trim(SLIDER.find('#loaderWidth').val())+'px;height: '+$.trim(SLIDER.find('#loaderHeight').val())+'px;">';
                        }    
                        loader_html += '</div></div>';
			SLIDER.find(AIR).append(loader_html);
		}
		
		/**
                 * Removes gif loader
                */
		function airsliderUnsetPreloader() {
			SLIDER.find(AIR).find(SLIDES).css('display', 'block');
			SLIDER.find(AIR).find('.air-progress-bar').css('display', 'block');
			SLIDER.find(AIR).find('.air-navigation').css('display', 'block');
			SLIDER.find(AIR).find('.air-controls').css('display', 'block');
			SLIDER.find(AIR).find('.air-preloader').remove();
		}
		
		/*******************************/
		/** LAYOUT AND RESPONSIVENESS **/
		/*******************************/
		
		/**
                 * Sets slider and slides. Width and height are scaled
                */
		function setLayout() {
			var layout = settings.layout;
			var width, height;
			
			switch(layout) {
				case 'fixed':
					width  = settings.startWidth;
					height = settings.startHeight;
					SLIDER.find(AIR).css({
						'width'  : getScaled(width),
						'height' : getScaled(height),
					});
					getSlides().css({
						'width'  : getScaled(width),
						'height' : getScaled(height),
					});
					break;
					
				case 'full-width':					
					width  = SLIDER.width();
					height = settings.startHeight;
					SLIDER.find(AIR).css({
						'width'  : width,
						'height' : getScaled(height),
					});
					getSlides().css({
						'width'  : width,
						'height' : getScaled(height),
					});
					break;
				default:
					return false;
					break;
			}
		}
		
		/**
                 * Returns the element top end left gaps (when the slider is full-width is very useful)
                 * 
                 * @param {object} element selected element object
                 * 
                 * @return {object} top and left value
                */
		function getLayoutGaps(element) {			
			var top_gap = (getHeight() - settings.startHeight) / 2;
			var left_gap = (getWidth() - settings.startWidth) / 2;
			
			var new_top = 0;
			var new_left = 0;
			
			if(top_gap > 0) {
				new_top = top_gap;
			}
			if(left_gap > 0) {
				new_left = left_gap;
			}
			
			return {
				top: new_top,
				left: new_left,
			};
		}
                
		/**
                 * Scales every element to make it responsive. It automatically restarts the current slide
                */
		function setResponsive() {
			settings.beforeSetResponsive();
			
			var slides = getSlides();
			
			stop(true);
                    
			slides.each(function() {
				var slide = $(this);
				var elements = slide.find(ELEMENTS);
				
				slide.finish();
				slideIn(slide);
				slide.finish();
                                
				elements.each(function() {
					var element = $(this);
					
					element.finish();
					elementIn(element);
					element.finish();
				});
			});
			
			setScale();
			
			setLayout();
			
			slides.each(function() {
				var slide = $(this);
				var elements = slide.find(ELEMENTS);
				
                                
                                elements.each(function() {	
					var element = $(this);
					
					element.find('*').each(function() {
						var element_content = $(this);
						scaleElement(element_content);
					});
					
					scaleElement(element);
                                        
					element.finish();
					elementOut(element);
					element.finish();
				});
				
				slide.finish();
				slideOut(slide);
				slide.finish();
			});
			
			window_width_before_setResponsive = $(window).width();
			
			play();
		}
		
		/**
                 * Scales a text or an image and their contents
                 * 
                 *  @param {object} element selected element object
                */
		function scaleElement(element) {
			// Standard element
                        
                        //if elements are children of html5 video type then no need to scale
                        if(element.hasClass('air-video-preivew-img') || (element.is('[class*="vjs-"]') && !element.hasClass('air-html5-video')))
                        {
                            return;
                        }
                        
                        //if scale true is set for image element then Resize that image 
                        if(element.attr('data-scale') && element.attr('data-scale') == 'true')
                        {
                            resizeImage(element);
                        }
                        else if(!element.hasClass('air-youtube-iframe') && !element.hasClass('air-vimeo-iframe'))
                        {
                            //no need to change the width and height of iframe
                            element.css({
                                'width' 		 : getScaled(getItemData(element, 'width')),
                                'height' 		 : getScaled(getItemData(element, 'height')),
                            });
                            
                            //change iframe height and width when wraper element call
                            if(element.find('iframe').length > 0){
                                element.find('iframe').attr('width',element.css('width').split('px')[0]);
                                element.find('iframe').attr('height',element.css('height').split('px')[0]);
                            }
                        }
                        
			element.css({
				'top' 			 : getScaled(getItemData(element, 'top') + getLayoutGaps(element).top),
				'left' 			 : getScaled(getItemData(element, 'left') + getLayoutGaps(element).left),
				'padding-top'            : getScaled(getItemData(element, 'padding-top')),
				'padding-right'	         : getScaled(getItemData(element, 'padding-right')),
				'padding-bottom'         : getScaled(getItemData(element, 'padding-bottom')),
				'padding-left'	         : getScaled(getItemData(element, 'padding-left')),
			});
                        
                        //set left and top position for fullwidth video
			if((element.attr('video-full-width') && element.attr('video-full-width') == 'true') || element.hasClass('fullscreenvideo') || element.hasClass('air-html5-video')){
                            element.css({
				'top' 			 : '0',
				'left' 			 : '0',
                            });
                        }
                        
			// Element contains text means for Text Element only
			if(element.text() != '' && !element.hasClass('air-iframe-wrapper') && !element.hasClass('air-youtube-iframe') && !element.hasClass('air-vimeo-iframe') && !element.hasClass('air-html5-video')) {
				element.css({
					'width' 		 : 'auto',
					'height' 		 : 'auto',							
					'line-height'            : getScaled(getItemData(element, 'line-height')) + 'px',
					'letter-spacing'         : getScaled(getItemData(element, 'letter-spacing')),
					'font-size'		 : getScaled(getItemData(element, 'font-size')),
				});
				
				/*				
				Warning: these lines were here because, in text elements, the width and the height depends on font-size, line height etc..
				Because of that, the we didn't really have to set the width and the height manually because the browser calculated them based on font-size, line-height etc.
				But, because I hate to see "width: auto", I wanted to set them.
				The problem appears when we have other HTML inside the text layer. It is scaled correctly but the width and the height aren't.
				This is not a big problem because, without specifying the dimensions, the slider works with "auto" parameter (wich is correct).
				If, in a future, I will have to specify a width and a height, I will have to try to fix the width() jQuery function that returns 0 when the element is in "display: none"
				
				if(element.width() > 0) {
					element.css('width', element.width());
				}
				if(element.height() > 0) {
					element.css('height', element.height());
				}
				*/
			}
		}
		
		/**
                 * Using the start dimensions, sets how the slider and it's elements should be scaled
                */
		function setScale() {
			var slider_width = SLIDER.width();
			var start_width = settings.startWidth;
			
                        if(slider_width >= start_width || ! settings.responsive) {
				scale = 1;
			}
			else {
                            scale = slider_width / start_width;
			}
		}
		
		/**
                 * Using the current scale variable, returns the value that receives correctly scaled. Remember to always use getScaled() to get positions & dimensions of the elements
                 * 
                 * @param {integer} value width/height of element for scale
                */
		function getScaled(value) {
			return value * scale;
		}
                
                /**
                 * Resize the image based on slider width and heigth
                 * 
                 *  @param {object} img_obj selected image object
                */
		function resizeImage(img_obj)
                {
                    //Get current slider's width x height
                    var maxWidth = parseFloat(SLIDER.width());
                    var maxHeight = parseFloat(SLIDER.height());
                    
                    //Get your container's set width x height
                    var containerWidth = parseFloat(getScaled(settings.startWidth));
                    var containerHeight = parseFloat(getScaled(settings.startHeight));
                    
                    //if slider width greater than container width then replace with container width
                    if(maxWidth > containerWidth)
                    {
                        maxWidth = containerWidth;
                    }
                    
                    //if slider height grater then container height then replace with container height
                    if(maxHeight > containerHeight)
                    {
                        maxHeight = containerHeight;
                    }
                    
                    //Get image original width x height
                    var srcWidth = parseFloat(getItemData(img_obj, 'width'));
                    var srcHeight = parseFloat(getItemData(img_obj, 'height'));

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
                    //if image is not resize by above calculation then scaled it.
                    if (resizeWidth < containerWidth && resizeHeight < containerHeight)
                    {
                        resizeWidth = getScaled(srcWidth);
                        resizeHeight = getScaled(srcHeight);
                    }

                    //Set the width and height of image    
                    img_obj.css({
				'width' 		 : resizeWidth,
				'height' 		 : resizeHeight,
                        });
                } 
                
                
		/*********************/
		/** SLIDER COMMANDS **/
		/*********************/
		
		/**
                 * Runs Air Slider from the current slide
                */
		function play() {
			if(settings.automaticSlide) {
				loopSlides();
			}
			else {
				executeSlide(current_slide);
			}
		}
		
		/**
                 * Stops all the slides and the elements and resets the progress bar
                 * 
                 *  @param {boolean} finish_queues status of slider is finished or not
                */
		function stop(finish_queues) {		
			for(var i = 0; i < elements_times_timers.length; i++) {
				elements_times_timers[i].clear();
			}
			
			for(var i = 0; i < elements_delays_timers.length; i++) {
				elements_delays_timers[i].clear();
			}
			
			current_slide_time_timer.clear();
			
			getSlides().each(function() {
				var temp_slide = $(this);
				if(finish_queues) {
					temp_slide.finish();
				}
				else {
					temp_slide.stop(true, true);
				}
				temp_slide.find(ELEMENTS).each(function() {
					var temp_element = $(this);
					if(finish_queues) {
						temp_element.finish();
					}
					else {
						temp_element.stop(true, true);
					}
				});
			});
			
			resetProgressBar();
		}
		
		/**
                 * Stops the progress bar and the slide time timer
                */
		function pause() {
			if(! paused && can_pause) {
                            	settings.beforePause();
				
				var progress_bar = SLIDER.find(AIR).find('.air-progress-bar');
				progress_bar.stop(true);
				current_slide_time_timer.pause();
				
				paused = true;
			}
		}
		
		/**
                 * Animates until the end the progress bar and resumes the current slide time timer
                */
		function resume() {
                    	if(paused && can_pause) {
                    		settings.beforeResume();
				
				var progress_bar = SLIDER.find(AIR).find('.air-progress-bar');			
				var slide_time = getItemData(getSlide(current_slide), 'time');
				var remained_delay = current_slide_time_timer.getRemaining();
				
				progress_bar.animate({
					'width' : '100%',
				}, remained_delay);
				
				current_slide_time_timer.resume();
				
				paused = false;
			}
		}
		
                
		/****************************************/
		/** SLIDER OR SLIDES DATAS / UTILITIES **/
		/****************************************/
		
		/**
                 * Returns the Air Slider container width
                */
		function getWidth() {
			return SLIDER.find(AIR).width();
		}
		
		/**
                 * Returns the Air Slider container height
                */
		function getHeight() {
			return SLIDER.find(AIR).height();
		}
		
		/**
                 * Returns the index of the next slide
                */
		function getNextSlide() {
			if(current_slide + 1  == total_slides) {
				return 0;
			}
			return current_slide + 1;
		}
		
		/**
                 * Returns the index of the previous slide
                */
		function getPreviousSlide() {
			if(current_slide - 1 < 0) {
				return total_slides - 1;
			}
			return current_slide - 1;
		}
		
		/**
                 * Returns a "data" of an item (slide or element). If is an integer || float, returns the parseInt() || parseFloat() of it. If the slide or the element has no data returns the default value
                 * 
                 *  @param {object} item selected element object
                 *  
                 *  @param {string} data selected element attribute
                */
		function getItemData(item, data) {
			var is_slide;
			
			if(item.parent('ul').hasClass('air-slides')) {
				is_slide = true;
			}
			else {
				is_slide = false;
			}
			
			switch(data) {
				case 'ease-in' :
					if(is_slide) {
						return isNaN(parseInt(item.data(data))) ? settings.slidesEaseIn : parseInt(item.data(data));
					}
					else {
						return isNaN(parseInt(item.data(data))) ? settings.elementsEaseIn : parseInt(item.data(data));
					}
					break;
					
				case 'ease-out' :
					if(is_slide) {
						return isNaN(parseInt(item.data(data))) ? settings.slidesEaseOut : parseInt(item.data(data));
					}
					else {
						return isNaN(parseInt(item.data(data))) ? settings.elementsEaseOut : parseInt(item.data(data));
					}
					break;
					
				case 'delay' :
					return isNaN(parseInt(item.data(data))) ? settings.elementsDelay : parseInt(item.data(data));
					
					break;
					
				case 'time' :
					if(is_slide) {
						return isNaN(parseInt(item.data(data))) ? settings.slidesTime : parseInt(item.data(data));
					}
					else {
						if(item.data(data) == 'all') {
							return 'all';
						}
						else {
							return isNaN(parseInt(item.data(data))) ? settings.itemsTime : parseInt(item.data(data));
						}
					}
					break;
					
				case 'ignore-ease-out' :
					if(parseInt(item.data(data)) == 1) {
						return true;
					}
					else if(parseInt(item.data(data)) == 0) {
						return false;
					}
					return settings.ignoreElementsEaseOut;
					break;
					
				case 'top' :
				case 'left' :
				case 'width' :
				case 'height' :				
				case 'padding-top' :
				case 'padding-right' :
				case 'padding-bottom' :
				case 'padding-left' :
				case 'line-height' :
				case 'letter-spacing' :
				case 'font-size' :
					return isNaN(parseFloat(item.data(data))) ? 0 : parseFloat(item.data(data));
					break;
					
				case 'in' :
				case 'out' :
				case 'opacity' :
					return item.data(data);
					break;
				
				default :
					return false;
					break;
			}
		}
		
		/**
                 * Returns the slides DOM elements
                */
		function getSlides() {
			return SLIDER.find(AIR).find(SLIDES).find(SLIDE);
		}
		
		/**
                 * Returns the slide DOM element
                 * 
                 *  @param {integer} slide_index called slide index
                */
		function getSlide(slide_index) {
			return getSlides().eq(slide_index);
		}
		
		/**
                 * Timeout with useful methods
                 * 
                 * @param {function} callback call callback fucntion
                 *  
                 * @param {integer} delay micro second time
                */
		function Timer(callback, delay) {
			var id;
			var start;
			var remaining = delay;

			this.pause = function() {
				clearTimeout(id);
				remaining -= new Date() - start;
			};

			this.resume = function() {
				start = new Date();
				clearTimeout(id);
				id = window.setTimeout(function() {
					callback();
				}, remaining);
			};
			
			this.clear = function () {
				clearTimeout(id);
			};
			
			// For now, works only after this.pause(). No need to calculate in other moments
			this.getRemaining = function() {
				return remaining;
			};

			this.resume();
		}
		
		/*****************/
		/** SLIDER CORE **/
		/*****************/
		
                // YOUTUBE PLAYER EVENTS HANDLING
                
                /**
                 * play video on video load
                 * 
                 * @param {object} event player event object
                */
                function onPlayerReady(event) {
                    event.target.playVideo();
                }
                
                /**
                 * Play video after slide change
                 * 
                 * @param {object} event player event object
                */
                function onPlayerChangeReady(event) {
                    var embedCode = event.target.getVideoEmbedCode();
                    var ytcont = $('#'+embedCode.split('id="')[1].split('"')[0])
                    var element = ytcont.closest('.air-iframe-wrapper');
                    if (element.data('video-force-rewind')=="true" || element.data('video-force-rewind')==true)
                    {
                            event.target.seekTo(0);
                    }
                    event.target.playVideo();
                }
                
                /**
                 * Call when player state change
                 * 
                 * @param {object} event player event object
                */
                function onPlayerStateChange(event) {
                    var embedCode = event.target.getVideoEmbedCode();
                    var ytcont = jQuery('#'+embedCode.split('id="')[1].split('"')[0])
                    var element = ytcont.closest('.air-iframe-wrapper');
                    var player = ytcont.parent().data('player');
                    
                    if (event.data == YT.PlayerState.PLAYING) { //Video in play state
                        
                        //Remove preivew image
                        element.find('.air-video-preivew-img').remove();
                        
                        //Mute the video if it set true
                        if (element.data('video-mute')=="true" || element.data('video-mute')==true){
                            player.mute();
                        }
                        pause();
                        videoplaying = true;
                    } else {
                            //Video in Pause state
                            if (event.data!=-1) {
                                videoplaying = false;
                                resume();
                            }
                    }
                    
                    //Video Ended
                    if(event.data==0){
                        resume();
                        videoplaying = false;
                        //if video loop set then again play video after finish
                        if((element.data('video-loop') == true || element.data('video-loop') == 'true')){
                            player.seekTo(0, true);
                            player.playVideo();
                        }
                        //if next slide on video end set true then change the slider after finish the video
                        if(element.data('next-slide-on-video-end') == true || element.data('next-slide-on-video-end') == 'true'){
                            changeSlide(getNextSlide());
                        }
                    }
                }

		// VIMEO PLAYER EVENTS HANDLING
                
                /**
                 * Add Event in vimeo
                 * 
                 * @param {object} element selected element object
                 * 
                 * @param {string} eventName name of the event
                 * 
                 * @param {function} callback 
                */
                function addEvent(element, eventName, callback) {

                        if (element.addEventListener)  element.addEventListener(eventName, callback, false);
                                else
                        element.attachEvent(eventName, callback, false);
                }

                /**
                 * Vimeo playback option call
                 * 
                 * @param {string} player_id current video's player id
                 * 
                 * @param {boolean} autoplay request for autoplay
                */
                function vimeoPlayback(player_id,autoplay) {
                    var froogaloop = $f(player_id);
                    var vimcont = $('#'+player_id);
                    var element = vimcont.closest('.air-iframe-wrapper');


                    froogaloop.addEvent('ready', function(data) {
                        
                        //if autoplay is set then play on load
                        if(autoplay) froogaloop.api('play');

                        froogaloop.addEvent('play', function(data) {
                            
                            //remove preview image
                            element.find('.air-video-preivew-img').remove();
                            
                            //Mute the video if it set true
                            if (element.data('video-mute')=="true" || element.data('video-mute')==true){
                                froogaloop.api('setVolume',"0");
                            }
                            pause();
                            videoplaying = true;
                        });

                        froogaloop.addEvent('finish', function(data) {
                            resume();
                            videoplaying = false;
                            
                            //if video loop set then again play video after finish
                            if (element.data('video-loop')=="true" || element.data('video-loop')==true){
                                froogaloop.api('setLoop',1);
                                froogaloop.api('play');
                            }
                            
                            //if next slide on video end set true then change the slider after finish the video
                            if(element.data('next-slide-on-video-end') == true || element.data('next-slide-on-video-end') == 'true'){
                                changeSlide(getNextSlide());
                            }
                        });

                        froogaloop.addEvent('pause', function(data) {
                            resume();
                            videoplaying = false;
                        });
                    });
                }
                
                // HTML5 PLAYER EVENTS HANDLING
                
                /**
                 * Html5 player operaton call
                 * 
                 * @param {string} player_id current video's player id
                 * 
                 * @param {object} myPlayer current video's player event
                */
                function html5VideoPlayback(myPlayer,player_id) {

                        if (player_id==undefined) player_id = $(myPlayer["b"]).attr('id');
                        var player_cont = $('#'+player_id);
                        var element = player_cont.closest('.air-iframe-wrapper');

                        myPlayer.on("play",function() {
                            
                            //Hide poster image
                            element.find('.vjs-poster').css({display:"none"});
                            
                            //Mute the video if it set true
                            if (element.data('video-mute')=="true" || element.data('video-mute')==true){
                                myPlayer.volume(0);
                            }
                            pause();
                            videoplaying = true;
                        });

                        myPlayer.on("pause",function() {
                            videoplaying = false;
                            resume();
                            //Display poster image
                            element.find('.vjs-big-play-button').css({display:"block"});
                        });

                        myPlayer.on("ended",function() {
                            videoplaying = false;
                            resume();
                            
                            //Display poster image and play button
                            element.find('.vjs-poster').css({display:"block"});
                            element.find('.vjs-big-play-button').css({display:"block"});
                            
                            //if next slide on video end set true then change the slider after finish the video
                            if(element.data('next-slide-on-video-end') == true || element.data('next-slide-on-video-end') == 'true'){
                                changeSlide(getNextSlide());
                            }
                        });
                }   
                
                /**
                 * STOP ALL VIDEO ON NEXT SLIDE   
                 * 
                 * @param {integer} previous_slide previous slide number
                */
                function stopAllVideo(previous_slide) {
                    $(SLIDE + ':eq(' + previous_slide + ')').find('.air-iframe-wrapper').each(function (i) {
                        var element = $(this);

                        if (element.find('iframe').length > 0) {
                            // VIMEO VIDEO PAUSE
                            try {
                                var ifr = element.find('iframe');
                                var id = ifr.attr('id');
                                var froogaloop = $f(id);
                                froogaloop.api("pause");
//                                clearTimeout(element.data('timerplay'));
                            } catch (e) {
                            }
                            //YOU TUBE PAUSE
                            try {
                                var player = element.data('player');
                                player.stopVideo();
//                                clearTimeout(element.data('timerplay'));
                            } catch (e) {
                            }
                        }

                        // IF HTML5 VIDEO IS EMBEDED
                        if (element.find('video').length > 0) {
                            try {
                                element.find('video').each(function (i) {
                                    var html5vid = $(this).parent();
                                    var videoID = html5vid.attr('id');
//                                    clearTimeout(html5vid.data('timerplay'));
                                    videojs(videoID).ready(function () {
                                        var myPlayer = this;
                                        myPlayer.pause();
                                    });
                                });
                            } catch (e) {
                            }
                        } // END OF VIDEO JS FUNCTIONS
                    });
                }
                
		/**
                 * Loops trough the slides
                */
		function loopSlides() {
			executeSlide(current_slide).done(function() {				
                            
				if(! paused) {
                                        stopAllVideo(current_slide);
					current_slide = getNextSlide();
					loopSlides();
				}
			});
		}
		
		/**
                 * Resets the progress bar and draw the new progress bar for the received slide
                 * 
                 * @param {integer} slide_index number of slide
                */
		function drawProgressBar(slide_index) {
			var progress_bar = SLIDER.find(AIR).find('.air-progress-bar');
			
			resetProgressBar();
			
			progress_bar.animate({
				'width' : '100%',
			}, getItemData(getSlide(current_slide), 'time'));
		}
		
		/**
                 * Resets the progress bar animation and CSS
                */
		function resetProgressBar() {
			var progress_bar = SLIDER.find(AIR).find('.air-progress-bar');
			
			progress_bar.stop();	
			progress_bar.css('width', 0);
		}
		
		/**
                 * Sets the right HTML classes of the navigation links
                */
		function setNavigationLink() {
			var nav = SLIDER.find(AIR).find('.air-navigation');
			var links = nav.find('> .air-slide-link');
			
			links.each(function() {
				var link = $(this);
				
				if(link.index() == current_slide) {
					link.addClass('air-active');
				}
				else {
					link.removeClass('air-active');
				}
			});
		}
		
		/**
                 * Finishes the current slide (animations out of elements and slide) and then plays the new slide
                 * 
                 * @param {integer} slide_index number of slide
                */
		function changeSlide(slide_index) {
			if(can_change_slide) {				
				stop(false);
				
				finishSlide(current_slide, false, true).done(function() {
                                        stopAllVideo(current_slide);
					current_slide = slide_index;
					play();
				});
			}
		}
		
		/**
                 * Executes a slide completely. If the auto loop is disabled won't animate out the slide and the elements with time == "all"
                 * 
                 * @param {integer} slide_index number of slide
                */
		function executeSlide(slide_index) {
			settings.beforeSlideStart();
			
			var def = new $.Deferred();
			
			// If something is still animating, reset
			for(var i = 0; i < elements_times_timers.length; i++) {
				elements_times_timers[i].clear();
			}			
			for(var i = 0; i < elements_delays_timers.length; i++) {
				elements_delays_timers[i].clear();
			}		
                        
			current_slide_time_timer.clear();
			getSlide(slide_index).finish();
			slideOut(slide_index);
			getSlide(slide_index).finish();	
                        
			var elements = getSlide(slide_index).find(ELEMENTS);
                        
			elements.each(function() {
				var element = $(this);				
				element.finish();				
				elementOut(element);
				element.finish();
                                
                                //Operation of video : Now check that element has iframe wrapper which indicate video wrapper
                                if(element.hasClass('air-iframe-wrapper')){
                                    
                                    var frameID = "iframe"+Math.round(Math.random()*1000+1);
                                    
                                    // START YOUTUBE HANDLING
                                    if (element.find('.air-youtube-iframe').length > 0){
                                        var ifr=element.find('iframe');
                                        var videoID = element.data('video-id');
                                        if (!ifr.hasClass("HasListener")) 
                                        {
                                            try {
                                                    $(ifr).wrap('<div id="'+frameID+'" class="HasListener air-youtube-iframe"></div>');
                                                    var player;
                                                    
                                                    //Call when autoplay is true
                                                    if (element.data('video-autoplay')==true || element.data('video-autoplay')=="true")
                                                    {
                                                        player = new YT.Player(frameID, {
                                                            width : element.css('width').split('px')[0],
                                                            height : element.css('height').split('px')[0],
                                                            videoId: videoID,
                                                            events: {
                                                                "onStateChange": onPlayerStateChange,
                                                                "onReady": onPlayerReady
                                                            }
                                                          });
                                                    }
                                                    else
                                                    {
                                                        //Call when just loading video
                                                        player = new YT.Player(frameID, {
                                                            width : element.css('width').split('px')[0],
                                                            height : element.css('height').split('px')[0],
                                                            videoId: videoID,
                                                            events: {
                                                                    "onStateChange": onPlayerStateChange
                                                            }
                                                        });
                                                    }        
                                                    
                                                    element.data('player',player);
                                                } catch(e) {}
                                        } 
                                        else 
                                        {
                                            //After change slide again check for autoplay
                                            if (element.data('video-autoplay')==true || element.data('video-autoplay')=="true") {
                                                $(ifr).wrap('<div id="'+frameID+'" class="HasListener air-youtube-iframe"></div>');
                                                player = new YT.Player(frameID, {
                                                    width : element.css('width').split('px')[0],
                                                    height : element.css('height').split('px')[0],
                                                    videoId: videoID,
                                                    events: {
                                                        "onStateChange": onPlayerStateChange,
                                                        "onReady": onPlayerChangeReady
                                                    }
                                                  });

                                            }
                                        }  
                                        // PLAY VIDEO IF THUMBNAIL HAS BEEN CLICKED
                                         element.find('.air-video-preivew-img').click(function() {
                                            element.find('.air-video-preivew-img').remove();
                                            var ifr=element.find('iframe');
                                            var videoID = element.data('video-id');
                                            var frameID = "iframe"+Math.round(Math.random()*1000+1);
                                            $(ifr).wrap('<div id="'+frameID+'" class="HasListener air-youtube-iframe"></div>');
                                            
                                            player = new YT.Player(frameID, {
                                                width : element.css('width').split('px')[0],
                                                height : element.css('height').split('px')[0],
                                                videoId: videoID,
                                                events: {
                                                    "onStateChange": onPlayerStateChange,
                                                    "onReady": onPlayerReady
                                                }
                                              });
                                            
                                         });
                                    }
                                    else if (element.find('.air-vimeo-iframe').length > 0) { // START VIMEO HANDLING
                                        var ifr=element.find('.air-vimeo-iframe');
                                        if (!ifr.hasClass("HasListener")) {
                                            ifr.addClass("HasListener");
                                            ifr.attr('id',frameID);
                                            var isrc = ifr.attr('src');
                                            var queryParameters = {}, queryString = isrc,
                                            re = /([^&=]+)=([^&]*)/g, m;
                                    
                                            // Creates a map with the query string parameters
                                            while (m = re.exec(queryString)) {
                                                    queryParameters[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
                                            }

                                            if (queryParameters['player_id']!=undefined)
                                                    isrc = isrc.replace(queryParameters['player_id'],frameID);
                                            else
                                                    isrc=isrc+"&player_id="+frameID;

                                            try{ isrc = isrc.replace('api=0','api=1'); } catch(e) {}

                                            isrc=isrc+"&api=1";
       
                                            ifr.attr('src',isrc);
                                            var player = element.find('iframe')[0];
                                            
                                            //Send autoplay date on video ready state
                                            $f(player).addEvent('ready', function() { vimeoPlayback(frameID,element.data('video-autoplay')); });
                                         } 
                                         else
                                         {
                                            //Check video operation reach video after slide change 
                                            if (element.data('video-autoplay')==true || element.data('video-autoplay')=="true") {
                                                element.find('.air-video-preivew-img').remove();
                                                var id = ifr.attr('id');
                                                var froogaloop = $f(id);
                                                element.data('timerplay',setTimeout(function() {
                                                        if (element.data('video-force-rewind')=="true" || element.data('video-force-rewind')==true)
                                                                froogaloop.api("seekTo",0);
                                                        froogaloop.api("play");
                                                },element.data('delay')));
                                            } 
                                        }   

                                         // PLAY VIDEO IF THUMBNAIL HAS BEEN CLICKED
                                         element.find('.air-video-preivew-img').click(function() {
                                            element.find('.air-video-preivew-img').remove();
                                            var ifr = element.find('iframe');
                                            var id = ifr.attr('id');
                                            var froogaloop = $f(id);
                                            froogaloop.api("play");
                                         });
                                    }
                                    else if (element.find('video').length>0) { //HANDLE HTML5 VIDEO
                                        
                                        var html5vid = element.find('video').parent();
                                        
                                        if (html5vid.hasClass("video-js")) {
                                            
                                            //Assign video id and get ready for video
                                            if (!html5vid.hasClass("HasListener")) {
                                                
                                                html5vid.addClass("HasListener");
                                                var videoID = "videoid_"+Math.round(Math.random()*1000+1);
                                                html5vid.attr('id',videoID);

                                                videojs(videoID).ready(function(){
                                                        html5VideoPlayback(this,videoID)
                                                });
                                                
                                            } else {
                                                videoID = html5vid.attr('id');
                                            }
                                            //Check if video auto play is true
                                            if (element.data('video-autoplay')==true || element.data('video-autoplay')=="true") {
                                                
                                                videojs(videoID).ready(function(){
                                                    var myPlayer = this;

                                                    try {
                                                            if (element.data('video-force-rewind')=="true" || element.data('video-force-rewind')==true)
                                                                      myPlayer.currentTime(0);
                                                    } catch(e) {

                                                    }
                                                    html5vid.data('timerplay',setTimeout(function() {
                                                        if (element.data('video-force-rewind')=="true" || element.data('video-force-rewind')==true)
                                                            myPlayer.currentTime(0);

                                                        if (element.data('video-mute')=="true" || element.data('video-mute')==true)
                                                            myPlayer.volume(0);

                                                            setTimeout(function() {
                                                                    myPlayer.play(0);
                                                                    html5vid.find('.vjs-poster').css({display:"none"});
                                                            },50);
                                                    },10+element.data('delay')));
                                                });
                                            }
                                            if (html5vid.data('ww') == undefined) html5vid.data('ww',html5vid.width());
                                            if (html5vid.data('hh') == undefined) html5vid.data('hh',html5vid.height());
                                        }
                                    }
                                    
//                                    // IF AUTOPLAY IS ON, WE NEED SOME STOP FUNCTION ON
                                    if (element.data('video-autoplay')==true || element.data('video-autoplay')=="true") {
                                            if (element.data('video-autoplay-firsttime') == true || element.data('video-autoplay-firsttime')=="true" ) {
                                                    element.data('video-autoplay',false);
                                                    element.data('video-autoplay-firsttime',false);
                                            }
                                    }
                                }
			});
			
			
			setNavigationLink();
			
			runSlide(slide_index);
			
			if(settings.automaticSlide) {
                            if(videoplaying === false){
				finishSlide(slide_index, true, true).done(function() {
					def.resolve();					
				});
                            }
			}
			else {
				finishSlide(slide_index, true, false).done(function() {
					def.resolve();					
				});
			}
			
			return def.promise();
		}
                
		/**
                 * Executes the in animation of the slide and it's elements
                 * 
                 * @param {integer} slide_index number of slide
                */
		function runSlide(slide_index) {	
			var slide = getSlide(slide_index);
			var elements = slide.find(ELEMENTS);
			
			var elements_in_completed = 0;
			var slide_in_completed = false;
			
			var def = new $.Deferred();
			
			can_pause = false;
			can_change_slide = false;
			
			// Do slide in animation
			slideIn(slide_index).done(function() {
				drawProgressBar(slide_index);
				
				can_pause = true;
				can_change_slide = true;
				
				slide_in_completed = true;
				if(slide_in_completed && elements_in_completed == elements.length) {
					def.resolve();
				}
			});
			
			// Do elements in animation
			elements.each(function() {
				var element = $(this);
				var element_delay = getItemData(element, 'delay');
				
				elements_delays_timers.push(new Timer(function() {
					elementIn(element).done(function() {
						elements_in_completed++;
						if(slide_in_completed && elements_in_completed == elements.length) {
							def.resolve();
						}
					});
				}, element_delay));
                                if(element.hasClass('air-iframe-wrapper')){
                            }
			});
				
			return def.promise();
		}
		
		/**
                 * Does all times, elements out animations and slide out animation. If necessary, won't animate out the slide and the elements with time == "all"
                 * 
                 * @param {integer} slide_index number of slide
                 * 
                 * @param {boolean} execute_time if true then take time
                 * 
                 * @param {boolean} animate_all_out if true then change slide set true
                */
		function finishSlide(slide_index, execute_time, animate_all_out) {			
			var slide = getSlide(slide_index);
			var elements = slide.find(ELEMENTS);
			var data_time = execute_time ? getItemData(slide, 'time') + getItemData(slide, 'ease-in') : 0;
			
			var elements_out_completed = 0;
			var slide_time_completed = false;
			
			var def = new $.Deferred();
			
			// Elements with time != "all"
			elements.each(function() {
				var element = $(this);
				var time = getItemData(element, 'time');
				
				if(time != 'all') {
					var final_element_time = execute_time ? time : 0;
					
					if(getItemData(element, 'ignore-ease-out')) {
						elements_out_completed++;
						
						if(elements.length == elements_out_completed && slide_time_completed) {
							slideOut(slide_index);
							def.resolve();
						}
					}
					
					elements_times_timers.push(new Timer(function() {						
						elementOut(element).done(function() {
							if(! getItemData(element, 'ignore-ease-out')) {
								elements_out_completed++;
								
								if(elements.length == elements_out_completed && slide_time_completed) {
									slideOut(slide_index);
									def.resolve();
								}
							}
						});
					}, final_element_time));
				}
                                if(element.hasClass('air-iframe-wrapper')){
                            }
			});
			
			// Execute slide time
			current_slide_time_timer = new Timer(function() {
				can_pause = false;
				
				resetProgressBar();
				
				slide_time_completed = true;
				
				if(elements.length == elements_out_completed && slide_time_completed) {
					slideOut(slide_index);
					def.resolve();
				}		
				
				if(! animate_all_out) {
					can_change_slide = true;
					def.resolve();
				}
				else {				
					can_change_slide = false;
					
					// Elements with time == "all"
					elements.each(function() {
						var element = $(this);
						var time = getItemData(element, 'time');
						
						if(time == 'all') {
							if(getItemData(element, 'ignore-ease-out')) {
								elements_out_completed++;
								
								if(elements.length == elements_out_completed && slide_time_completed) {
									slideOut(slide_index);
									def.resolve();
								}
							}
							
							elementOut(element).done(function() {
								if(! getItemData(element, 'ignore-ease-out')) {
									elements_out_completed++;
									
									if(elements.length == elements_out_completed && slide_time_completed) {
										slideOut(slide_index);
										def.resolve();
									}
								}
							});
						}
					});
				}
			}, data_time);
			
			return def.promise();
		}
		
		/****************/
		/** ANIMATIONS **/
		/****************/
		
		/**
                 * Does slide in animation
                 * 
                 * @param {integer} slide_index number of slide
                */
		function slideIn(slide_index) {
			var slide = getSlide(slide_index);
			var data_in = getItemData(slide, 'in');
			var data_ease_in = getItemData(slide, 'ease-in');
			
			var def = new $.Deferred();
			
			if(slide.css('display') == 'block') {
				return def.resolve().promise();
			}
			
			switch(data_in) {
				case 'fade' :
                                        slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : 0,
						'opacity' : 0,
					});
					slide.animate({
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeLeft' :
                                    
                                        slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : getWidth(),
						'opacity' : 0,
					});
					slide.animate({
						'opacity' : 1,
						'left'	  : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeRight' :
                                   
                                       slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : -getWidth(),
						'opacity' : 0,
					});
					slide.animate({
						'opacity' : 1,
						'left'	  : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideLeft' :
					slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : getWidth(),
					});
					slide.animate({
						'left' : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideRight' :
					slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : -getWidth(),
					});
					slide.animate({
						'left' : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideUp' :
					slide.css({
						'display' : 'block',
						'top'	  : getHeight(),
						'left'	  : 0,
					});
					slide.animate({
						'top' : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideDown' :
					slide.css({
						'display' : 'block',
						'top'	  : -getHeight(),
						'left'	  : 0,
					});
					slide.animate({
						'top' : 0,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				default:
					slide.css({
						'display' : 'block',
						'top'	  : 0,
						'left'	  : 0,
						'opacity' : 1,
					});
					def.resolve();
					break;
			}
			
			return def.promise();
		}
		
		/**
                 * Does slide out animation
                 * 
                 * @param {integer} slide_index number of slide
                */
		function slideOut(slide_index) {
			var slide = getSlide(slide_index);
			var data_out = getItemData(slide, 'out');
			var data_ease_out = getItemData(slide, 'ease-out');
			
			var def = new $.Deferred();
			
			if(slide.css('display') == 'none') {
				return def.resolve().promise();
			}
			
			switch(data_out) {
				case 'fade' :
					slide.animate({
						'opacity' : 0,
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeLeft' :
					slide.animate({
						'opacity' : 0,
						'left'	  : -getWidth(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'opacity' : 1,
							'left' 	  : 0,
						});
						def.resolve();
					});
					break;
					
				case 'fadeRight' :
					slide.animate({
						'opacity' : 0,
						'left'	  : getWidth(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'opacity' : 1,
							'left' 	  : 0,
						});
						def.resolve();
					});
					break;
					
				case 'slideLeft' :
					slide.animate({
						'left' : -getWidth(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'left' : 0,
						});
						def.resolve();
					});
					break;
					
				case 'slideRight' :
					slide.animate({
						'left' : getWidth(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'left' : 0,
						});
						def.resolve();
					});
					break;
					
				case 'slideUp' :
					slide.animate({
						'top' : -getHeight(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'top' : 0,
						});
						def.resolve();
					});
					break;
					
				case 'slideDown' :
					slide.animate({
						'top' : getHeight(),
					}, data_ease_out,
					function() {
						slide.css({
							'display' : 'none',
							'top' : 0,
						});
						def.resolve();
					});
					break;
					
				default :
					slide.css({
						'display' : 'none',
					});
					def.resolve();
					break;
			}
			
			return def.promise();
		}
		
		/**
                 * Does element in animation
                 * 
                 * @param {object} element selected element object
                */
		function elementIn(element) {
			var element_width = element.outerWidth();
			var element_height = element.outerHeight();
			var data_in = getItemData(element, 'in');
			var data_ease_in = getItemData(element, 'ease-in');
			var data_top = getItemData(element, 'top');
			var data_left = getItemData(element, 'left');
			
			var def = new $.Deferred();
			
			if(element.css('display') == 'block') {
				return def.resolve().promise();
			}
			
			switch(data_in) {
				case 'slideDown' :
					element.css({
						'display' : 'block',
						'top'	  : -element_height,
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideUp' :
					element.css({
						'display' : 'block',
						'top'  	  : getHeight(),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideLeft' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getWidth(),
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'slideRight' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : -element_width,
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fade' :
					element.css({
						'display' : 'block',
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 0,
					}).animate({
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeDown' :
					element.css({
						'display' : 'block',
						'top'	  : -element_height,
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 0,
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeUp' :
					element.css({
						'display' : 'block',
						'top'  	  : getHeight(),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 0,
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeLeft' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getWidth(),
						'opacity' : 0,
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeRight' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : -element_width,
						'opacity' : 0,
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeSmallDown' :
					element.css({
						'display' : 'block',
						'top'	  : getScaled(data_top + getLayoutGaps(element).top -30),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 0,
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeSmallUp' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top + 30),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 0,
					}).animate({
						'top'	  : getScaled(data_top + getLayoutGaps(element).top),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeSmallLeft' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left + 30),
						'opacity' : 0,
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' :1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				case 'fadeSmallRight' :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left - 30),
						'opacity' : 0,
					}).animate({
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 1,
					}, data_ease_in, function() { def.resolve(); });
					break;
					
				default :
					element.css({
						'display' : 'block',
						'top'  	  : getScaled(data_top + getLayoutGaps(element).top),
						'left'	  : getScaled(data_left + getLayoutGaps(element).left),
						'opacity' : 1,
					});
					def.resolve();
					break;
			}
			
			return def.promise();
		}
		
		/**
                 * Does element out animation
                 * 
                 * @param {object} element selected element object
                */
		function elementOut(element) {
			var element_width = element.outerWidth();
			var element_height = element.outerHeight();
			var data_out = getItemData(element, 'out');
			var data_ease_out = getItemData(element, 'ease-out');
			
			var def = new $.Deferred();
			
			if(element.css('display') == 'none') {
				return def.resolve().promise();
			}
			
			switch(data_out) {
				case 'slideDown' :
					element.animate({
						'top' : getHeight(),
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
						});
						def.resolve();
					});
					break;
					
				case 'slideUp' :
					element.animate({
						'top' : - element_height,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
						});
						def.resolve();
					});
					break;
					
				case 'slideLeft' :
					element.animate({
						'left' : - element_width,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
						});
						def.resolve();
					});
					break;
					
				case 'slideRight' :
					element.animate({
						'left' : getWidth(),
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
						});
						def.resolve();
					});
					break;
					
				case 'fade' :
					element.animate({
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeDown' :
					element.animate({
						'top' : getHeight(),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeUp' :
					element.animate({
						'top' : - element_height,
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeLeft' :
					element.animate({
						'left' : - element_width,
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeRight' :
					element.animate({
						'left' : getWidth(),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeSmallDown' :
					element.animate({
						'top' : getScaled(getItemData(element, 'top') + getLayoutGaps(element).top + 30),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeSmallUp' :
					element.animate({
						'top' : getScaled(getItemData(element, 'top') + getLayoutGaps(element).top - 30),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1,
						});
						def.resolve();
					});
					break;
					
				case 'fadeSmallLeft' :
					element.animate({
						'left' : getScaled(getItemData(element, 'left') + getLayoutGaps(element).left - 30),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' : 1
						});
						def.resolve();
					});
					break;
					
				case 'fadeSmallRight' :
					element.animate({
						'left' : getScaled(getItemData(element, 'left') + getLayoutGaps(element).left + 30),
						'opacity' : 0,
					}, data_ease_out,
					function() {
						element.css({
							'display' : 'none',
							'opacity' :1,
						});
						def.resolve();
					});
					break;
					
				default :
					element.css({
						'display' : 'none',
					});
					def.resolve();
					break;
			}
			
			return def.promise();
		}
		
	};
	
	
	/**************************/
	/** Air SLIDER PLUGIN **/
	/**************************/
	
	/**
         * Plugin intialization
        */
	$.fn.airSlider = function(options) {	
        var settings = $.extend({
			layout					: 'fixed',
			responsive				: true,
			startWidth				: 1170,
			startHeight				: 500,
			
			pauseOnHover			: true,			
			automaticSlide			: true,
			showControls 			: true,
			showNavigation			: true,
			showTimerBar			: true,
			showShadowBar			: true,
			enableSwipe				: true,
				
			slidesTime				: 3000,
			elementsDelay			: 0,
			elementsTime			: 'all',
			slidesEaseIn			: 300,
			elementsEaseIn			: 300,
			slidesEaseOut			: 300,
			elementsEaseOut			: 300,
			ignoreElementsEaseOut 	: false,
			
			beforeStart				: function() {},
			beforeSetResponsive		: function() {},
			beforeSlideStart		: function() {},
			beforePause				: function() {},
			beforeResume			: function() {},
        }, options);

        return this.each(function() {
			new Airslider(this, settings);
        });
    };
	
})(jQuery);