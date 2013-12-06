// Initialize object literals
var ThemeTransition = {};

/////////////////////////////////////////////
// jQuery functions					
/////////////////////////////////////////////
(function($){

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
if ( typeof (skrollr) !== 'undefined' && definedConstants.scrollingEffectOn && screen.width >= 1100 ) {
	var s = skrollr.init({
		smoothScrolling : true,
		easing: {
			wtf: Math.random,
		  	inverted: function(p) {
				return 1 - p;
		  	}
		},
		forceHeight : false,
	});
}
	
})(jQuery);