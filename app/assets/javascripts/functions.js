;// Themify Theme Scripts - http://themify.me/

// Fix iPhone viewport scaling bug on orientation change - By @mathias @cheeaun @jdalton
if(navigator.userAgent.match(/iPhone/i)){(function(doc){
	var addEvent = 'addEventListener', type = 'gesturestart', qsa = 'querySelectorAll',
		scales = [1, 1], meta = qsa in doc ? doc[qsa]('meta[name=viewport]') : [];
	function fix() {
		meta.content = 'width=device-width,minimum-scale=' + scales[0] + ',maximum-scale=' + scales[1];
		doc.removeEventListener(type, fix, true); }
	if ((meta = meta[meta.length - 1]) && addEvent in doc) {
		fix(); scales = [.25, 1.6];
		doc[addEvent](type, fix, true);	}
}(document));}

// Initialize object literals
var FixedHeader = {},
	ThemeTransition = {};

/////////////////////////////////////////////
// jQuery functions					
/////////////////////////////////////////////
(function($){

// Initialize carousels //////////////////////////////
function createCarousel(obj) {
	obj.each(function() {
		var $this = $(this);
		$this.carouFredSel({
			responsive : true,
			prev : '#' + $this.data('id') + ' .carousel-prev',
			next : '#' + $this.data('id') + ' .carousel-next',
			pagination : {
				container : '#' + $this.data('id') + ' .carousel-pager'
			},
			circular : true,
			infinite : true,
			scroll : {
				items : 1,
				wipe : true,
				fx : $this.data('effect'),
				duration : parseInt($this.data('speed'))
			},
			auto : {
				play : !!('off' != $this.data('autoplay')),
				pauseDuration : 'off' != $this.data('autoplay') ? parseInt($this.data('autoplay')) : 0
			},
			items : {
				visible : {
					min : 1,
					max : 1
				},
				width : 222
			},
			onCreate : function() {
				$this.closest('.slideshow-wrap').css({
					'visibility' : 'visible',
					'height' : 'auto'
				});
				var $testimonialSlider = $this.closest('.testimonial.slider');
				if( $testimonialSlider.length > 0 ) {
					$testimonialSlider.css({
						'visibility' : 'visible',
						'height' : 'auto'
					});
				}
				$(window).resize();
			}
		});
	});
}

// Test if touch event exists //////////////////////////////
function is_touch_device() {
	try {
		document.createEvent('TouchEvent');
		return true;
	} catch(e) {
		return false;
	}
}

// Fixed Header /////////////////////////
FixedHeader = {
	init: function() {
		var cons = is_touch_device() ? 10 : 0;
		this.headerHeight = $('#headerwrap').height() - cons;
		$(window)
		.on('scroll', this.activate)
		.on('touchstart.touchScroll', this.activate)
		.on('touchmove.touchScroll', this.activate);
		if ( is_touch_device() ) {
			$('body').addClass('mobile-body');
		}
	},

	activate: function() {
		var $window = $(window),
			scrollTop = $window.scrollTop();

		if( scrollTop > FixedHeader.headerHeight ) {
			FixedHeader.scrollEnabled();

			if ( is_touch_device() ) {
				setTimeout(function(){
					FixedHeader.scrollEnabled();
				}, 100);
			}
		} else {
			FixedHeader.scrollDisabled();
			if ( is_touch_device() ) {
				setTimeout(function(){
					FixedHeader.scrollDisabled();
				}, 100);
			}
		}
	},

	scrollDisabled: function() {
		$('#headerwrap').removeClass('fixed-header');
		$('#header').removeClass('header-on-scroll');
		$('#pagewrap').css('padding-top', '');
	},

	scrollEnabled: function() {
		$('#headerwrap').addClass('fixed-header');
		$('#header').addClass('header-on-scroll');
		$('#pagewrap').css('padding-top', FixedHeader.headerHeight);
	}
};

// Theme Transition Animation /////////////////////////
ThemeTransition = {
	init: function() {
		this.setup();
	},
	setup: function() {
		if ( typeof s !== 'undefined') {
			// shortcode columns add class
			$('.col2-1.first, .col3-1.first, .col4-1.first, .col4-2.first').each(function(){
				var $this = $(this);
				if($this.hasClass('col2-1')) {
					$this.next('.col2-1').addClass('last');
				} else if($this.hasClass('col3-1')) {
					$this.next('.col3-1').addClass('second').next('.col3-1').addClass('last');
				} else if($this.hasClass('col4-1')) {
					$this.next('.col4-1').addClass('second').next('.col4-1').addClass('third').next('.col4-1').addClass('last');
				} else if($this.hasClass('col4-2')) {
					$this.next('.col4-2').addClass('last');
					$this.next('.col4-1').addClass('third').next('.col4-1').addClass('last');
				}
			});
			var col_nums = 1;
			$('.col-full').each(function(){
				var $this = $(this);
				if( col_nums % 2 == 0) {
					$this.addClass('animate-last');
				} else {
					$this.addClass('animate-first');
				}
				col_nums += 1;
			});
			$.each(themifyScript.transitionSetup, function(i, val){
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
	if( typeof s !== 'undefined' && themifyScript.scrollingEffectOn ) {
		s.animateTo(offset, {duration: 800});
	} else {
		$('body,html').animate({ scrollTop: offset }, 800);
	}
}

// DOCUMENT READY
$(document).ready(function() {

	var $body = $('body'), $placeholder = $('[placeholder]'), $charts = $('.chart'), $skills = $('.progress-bar');

	// Fixed header
	if( ('' != themifyScript.fixedHeader && ! themifyScript.scrollingEffectOn) || (! is_touch_device() && '' != themifyScript.fixedHeader) ){
		FixedHeader.init();
	}

	/////////////////////////////////////////////
	// Chart Initialization
	/////////////////////////////////////////////
	if( typeof $.fn.easyPieChart !== 'undefined' ) {
		$charts.each(function(){
			var $self = $(this),
				barColor = $self.data('color'),
				percent = $self.data('percent');
			$.each(themifyScript.chart, function(index, value){
				if( 'false' == value || 'true' == value ){
					themifyScript.chart[index] = 'false'!=value;
				} else if( parseInt(value) ){
					themifyScript.chart[index] = parseInt(value);
				} else if( parseFloat(value) ){
					themifyScript.chart[index] = parseFloat(value);
				}
			});
			if( typeof barColor !== 'undefined' ) 
				themifyScript.chart.barColor = '#' + barColor.replace('#', '');
			$self.easyPieChart( themifyScript.chart );
			$self.data('easyPieChart').update(0);
			if( typeof $.waypoints !== 'undefined' && themifyScript.scrollingEffectOn && !is_touch_device() ) {
				$self.waypoint(function(direction){
					$self.data('easyPieChart').update(percent);
				}, {offset: '80%'});
				$self.waypoint(function(direction){
					if(direction === 'up') {
						$self.data('easyPieChart').update(0);
					}
				}, {offset: '92%'});
			} else {
				$self.data('easyPieChart').update(percent);	
			}
		});
	}

	/////////////////////////////////////////////
	// Skillset Animation
	/////////////////////////////////////////////
	if( typeof s !== 'undefined' && themifyScript.scrollingEffectOn ) {
		$skills.each(function(){
			var $self = $(this).find('span'),
				percent = $self.data('percent');
			$self.attr({'data-center-top': 'width[sqrt]:' + percent + ';', 'data-bottom-top': 'width[sqrt]:0%;'});
		});
	}

	/////////////////////////////////////////////
	// HTML5 placeholder fallback
	/////////////////////////////////////////////
	$placeholder.focus(function() {
		var input = $(this);
		if (input.val() == input.attr('placeholder')) {
			input.val('');
			input.removeClass('placeholder');
		}
		}).blur(function() {
			var input = $(this);
			if (input.val() == '' || input.val() == input.attr('placeholder')) {
				input.addClass('placeholder');
				input.val(input.attr('placeholder'));
			}
		}).blur();
	$placeholder.parents('form').submit(function() {
		$(this).find('[placeholder]').each(function() {
			var input = $(this);
			if (input.val() == input.attr('placeholder')) {
				input.val('');
			}
		})
	});

	/////////////////////////////////////////////
	// Scroll to top
	/////////////////////////////////////////////
	$('.back-top a').on('click', function(e){
		e.preventDefault();
		themeScrollTo(0);
	});

	// anchor scrollTo
	$body.on('click', 'a[href*=#]', function(e){
		var url = $(this).prop('href'),
			idx = url.indexOf('#'),
			hash = idx != -1 ? url.substring(idx+1) : '',
			offset = 0;

		if(hash.length > 1 && $('#' + hash).length > 0 && hash !== 'header') {
			offset = $('#' + hash).offset().top;
			themeScrollTo(offset);
			e.preventDefault();
		}
	});

	/////////////////////////////////////////////
	// Toggle main nav on mobile
	/////////////////////////////////////////////
	$body.on('click', '#menu-icon', function(e){
		e.preventDefault();
		$('#main-nav').fadeToggle();
		$('#top-nav', $('#headerwrap')).hide();
		$(this).toggleClass('active');
	});

	$body.on('touchstart touchmove touchend', '#main-nav', function(e) {
		e.stopPropagation();
	});

	/////////////////////////////////////////////
	// Add class "first" to first elements
	/////////////////////////////////////////////
	$('.highlight-post:odd').addClass('odd');

});

// WINDOW LOAD
$(window).load(function() {
	/////////////////////////////////////////////
	// Lightbox / Fullscreen initialization
	/////////////////////////////////////////////
	if(typeof ThemifyGallery !== 'undefined') {
		ThemifyGallery.init({'context': $(themifyScript.lightboxContext)});
	}

	/////////////////////////////////////////////
	// Carousel initialization
	/////////////////////////////////////////////
	if( typeof $.fn.carouFredSel !== 'undefined' ) {
		createCarousel($('.slideshow'));
	}

	// Transition Effect
	if ( themifyScript.scrollingEffectOn && typeof skrollr !== 'undefined' ) {
		ThemeTransition.init();
		s.refresh();
	}

});

// skrollr initiate
if ( typeof (skrollr) !== 'undefined' && themifyScript.scrollingEffectOn ) {
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
			if ( is_touch_device() && themifyScript.fixedHeader != '' ) {
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