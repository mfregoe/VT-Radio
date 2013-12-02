// Initialize object literals
var ThemeTransition = {};

/////////////////////////////////////////////
// jQuery functions					
/////////////////////////////////////////////
(function($){

// Test if touch event exists //////////////////////////////
function is_touch_device() {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch(e) {
		return false;
	}
}

// Theme Transition Animation /////////////////////////
ThemeTransition = {
	init: function() {
		this.setup();
	},
	setup: function() {
		if ( typeof s !== 'undefined') {
			$.each(definedConstants.transitionSetup, function(i, val){
				$(val.selector).attr(val.value);
			});

			setTimeout(function(){
				s.refresh();
			}, 2000);
		}
	}
};

// Scroll to Element //////////////////////////////
function themeScrollTo(offset) {
	if( typeof s !== 'undefined' && definedConstants.scrollingEffectOn ) {
		s.animateTo(offset, {duration: 800});
	} else {
		$('body,html').animate({ scrollTop: offset }, 800);
	}
}

// DOCUMENT READY
$(document).ready(function() {

	/////////////////////////////////////////////
	// Scroll to top
	/////////////////////////////////////////////
	$('.back-top a').on('click', function(e){
		e.preventDefault();
		themeScrollTo(0);
	});

});

// WINDOW LOAD
$(window).load(function() {

	// Transition Effect
	if ( definedConstants.scrollingEffectOn && typeof skrollr !== 'undefined' ) {
		ThemeTransition.init();
		s.refresh();
	}

});

// skrollr initiate
if ( typeof (skrollr) !== 'undefined' && definedConstants.scrollingEffectOn ) {
	// initialize skrolr
	if(is_touch_device()){
		$('#pagewrap').wrap('<div id="skrollr-body" />'); // iscroll support
		$('body').addClass('touch-device-body');
		
		var $headerwrap = $('#headerwrap'), headerHeight = $headerwrap.height(),
		$headClone = $headerwrap.clone();
	}
	var s = skrollr.init({
		smoothScrolling : true,
		easing: {
			wtf: Math.random,
		  	inverted: function(p) {
				return 1 - p;
		  	}
		},
		forceHeight : false,
		render: function(data) {
			if ( is_touch_device() && definedConstants.fixedHeader != '' ) {
				headerHeight = $headerwrap.height();
				if(data.curTop > headerHeight) {
					if(!$headerwrap.parent().hasClass('touch-device-body')) {
						$headerwrap.remove();
						$headClone.prependTo($('body'));
						$headerwrap.addClass('fixed-header');
					}
				} else {
					if($headerwrap.parent().hasClass('touch-device-body')) {
						$headerwrap.remove();
						$headClone.prependTo($('#pagewrap'));
						$headerwrap.removeClass('fixed-header');
					}
				}
			}
		}
	});
}
	
})(jQuery);