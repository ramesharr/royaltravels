 var App = new Object;

var App = {

	Elements: {
		Wrapper: document.getElementById('wrapper'),
	},
	Vars: {},
	Functions: {},
	Dimensions: {},
	Modules: {

		Scroll: {
			lastScrollTop: null,
			direction: null,
		},

	},
	Swipes: {},

};

/**
 **/

App.Functions.googleMaps = function ( id, latitude, longitude, zoom ) {

	var Map, Marker, Position = new google.maps.LatLng(latitude, longitude);

	Map = new google.maps.Map(document.getElementById(id), {
		scrollwheel: false,
		center: Position,
		zoom: zoom,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	});

	Marker = new google.maps.Marker({
		position: Position,
		map: Map,
	});

}

App.Functions.toggleMenu = function () {

	var Header = $('#header'),
		Backdrop = $('#backdrop');

	Header.toggleClass('active');

	if ( Header.hasClass('active') ) {

		Backdrop.addClass('active');

	}
	else {

		Backdrop.removeClass('active');

	}

}

App.Functions.hasDesktop = function () {

	return ( App.Vars.device == 'desktop' ? true : false );

};

App.Functions.hasTablet = function () {

	return ( App.Vars.device == 'tablet' ? true : false );

};

App.Functions.hasMobile = function () {

	return ( App.Vars.device == 'mobile' ? true : false );

};

App.Functions.Scrolling = function () {

	var top = document.documentElement.scrollTop || document.body.scrollTop;

	if ( top > 100 ) {

		document.body.classList.add('scrolling');

	}
	else {

		document.body.classList.remove('scrolling');

	}

};

App.Functions.setTranslate3D = function (element, width, height) {

    element.css({

		"-webkit-transform": "translate3d(" + width + "px, " + height + "px, 0px)",
		"-moz-transform": "translate3d(" + width + "px, " + height + "px, 0px)",
		"transform": "translate3d(" + width + "px, " + height + "px, 0px)",
		"-ms-transform": "translate3d(" + width + "px, " + height + "px, 0px)",
		"-o-transform": "translate3d(" + width + "px, " + height + "px, 0px)"

    });

};

App.Functions.detectDirection = function () {

    var scrollTop = window.pageYOffset;

    if ( scrollTop > App.Modules.Scroll.lastScrollTop ) {

        App.Modules.Scroll.direction = 1;

    }
    else {

        App.Modules.Scroll.direction = 2;

    }

    App.Modules.Scroll.lastScrollTop = scrollTop;

    return  App.Modules.Scroll.direction;

}

// @behaviors
App.Functions.responsiveClass = function () {

	var Width = window.innerWidth;

	if ( Width > 1300 ) {

		App.Vars.device = 'desktop';

	}
	else if ( Width > 1030 ) {

		App.Vars.device = 'tablet';

	}
	else {

		App.Vars.device = 'mobile';

	}

	if ( !App.Elements.Wrapper.classList.contains(App.Vars.device) ) {

		App.Elements.Wrapper.classList.remove('desktop', 'tablet', 'mobile');
		App.Elements.Wrapper.classList.add(App.Vars.device);

	}

};

App.Functions.scrollBehavior = function () {

	var scrollPos = $(document).scrollTop();
	var scrollHeight = Math.floor(scrollPos / 2);
	var direction = App.Functions.detectDirection();

	// @Stop animate
	if ( App.Vars.Scrolling ) {

		//$('html, body').stop();

	}

	// @Anchors
	if ( !App.Vars.Scrolling ) {

		$('.page > a.anchor').each(function(){

			var anchor_top = ($(this).offset().top) - 60;
			var anchor_name = $(this).attr('name');

			if ( scrollPos >= anchor_top ) {

				$('a.anchor-link[href="#' + anchor_name + '"]').addClass('active');
				$('a.anchor-link').not('[href="#' + anchor_name + '"]').removeClass('active');

			}

		});

	}

	// @Home
	if ( App.Pages.home.hasClass('fp-scrooler-animate') ) {

		(function(){

			if ( App.Functions.hasDesktop() ) {

				App.Functions.setTranslate3D($('.background', App.Pages.home), 0, scrollHeight);

			}

		})();

	}

	// @Partners
	if ( App.Pages.partners.hasClass('fp-scrooler-animate') ) {

		(function(){

			if ( App.Functions.hasDesktop() ) {

				//var offsetPartners = App.Pages.partners.offset();
				//var scrollPartners = Math.floor(offsetPartners.top - scrollPos);

				//App.Functions.setTranslate3D($('.background', App.Pages.partners), 0, (scrollPartners * 0.2));

			}

		})();

	}

	// @Newsletter
	if ( App.Pages.newsletter.hasClass('fp-scrooler-animate') ) {

		(function(){

			if ( App.Functions.hasDesktop() ) {

				var offsetNewsletter = App.Pages.newsletter.offset();
				var scrollNewsletter = Math.floor(offsetNewsletter.top - scrollPos);

				App.Functions.setTranslate3D($('.image-2', App.Pages.newsletter), 0, (scrollNewsletter * 0.4));
				App.Functions.setTranslate3D($('.image-1', App.Pages.newsletter), 0, (scrollNewsletter * 0.6));
				App.Functions.setTranslate3D($('.image-0', App.Pages.newsletter), 0, (scrollNewsletter * 0.2));

			}

		})();

	}

	//

};

App.Functions.resizeBehavior = function () {

	// @Flexible heights
	if ( !App.Functions.hasMobile() ) {

	    $('.flexible-height').each(function(index, element) {

	        var Item = $(element), Ratio, Width = Item.width();

	        Ratio = Item.data('ratio');

			if ( Ratio ) {

				Item.css({

					height: Math.floor(Width * Ratio)

		        });

	        }

	    });

	}

};

// document-ready
(function($) {

	// @fix Google Font API (Mobile)
	$('body').css('font-family', "'Lato', 'Helvetica Neue'");

	// @FastClick
	// FastClick.attach(document.body);

	// @App
	App.Debug = $('#debugger');

	App.Pages = {

		home: $('#content > .page-home'),
		newsletter: $('#content > .page.page-newsletter'),
		partners: $('#content > .page-partners'),
		contact: $('#content > .page-contact'),

	}

	App.Functions.attDimensions = function () {

		App.Dimensions = {

			width: $(window).width(),
			height: $(window).height(),

		}

		if ( !App.Functions.hasMobile() ) {

			$('.browser-height').height(App.Dimensions.height);

		}

	};

	var onScroll = function () {

		App.Functions.scrollBehavior();
		App.Functions.Scrolling();

	}

	var onResize = function () {

		App.Functions.resizeBehavior();
		App.Functions.responsiveClass();
		App.Functions.attDimensions();

	}

	// @window events
	$(window).resize(function(){

		onResize();
		onScroll();

	});

	$(window).scroll(function(){

		onScroll();

	});

	// @exec
	App.Functions.attDimensions();
	App.Functions.responsiveClass();
	App.Functions.resizeBehavior();

	App.Modules.Scroll.scroller = new cbpScroller(document.getElementById('wrapper'));

	App.Swipes.home = new Swipe(document.getElementById('swipe-home'), {

		auto: 5000,
		continuous: false,
		disableScroll: false,
		callback: function(index, element){

			var index_real = $(element).data('index-real');

			$('.text', App.Pages.home).removeClass('active');
			$('.text', App.Pages.home).eq(index_real).addClass('active');

			$('.navigation-item', App.Pages.home).removeClass('active');
			$('.navigation-item', App.Pages.home).eq(index_real).addClass('active');

		},
		transitionEnd: function(index, element){
		},

	});

	App.Swipes.zoomProducts = new Swipe(document.getElementById('swipe-products'), {

		auto: false,
		continuous: false,
		disableScroll: false,
		callback: function(index, element){
		},
		transitionEnd: function(index, element){

			var title = $('.zoom-open').eq(index).attr('data-title');

			$('.zoom > .description p').text(title);

		},

	});

	if ( App.Functions.hasDesktop() || App.Functions.hasTablet() ) {

		App.Swipes.galleryPartners = new Swipe(document.querySelector('.desktop #swipe-partners-gallery, .tablet #swipe-partners-gallery'), {

			auto: false,
			continuous: false,
			disableScroll: false,
			callback: function(index, element){

				var pid = $('.gallery .swipe-item', App.Pages.partners).eq(index).data('id');

				//$('.headers .header, .slider .item', App.Pages.partners).removeClass('active');
				//$('.headers .header[data-id="' + pid + '"], .slider .item[data-id="' + pid + '"]', App.Pages.partners).addClass('active');

				$('.gallery .swipe-item', App.Pages.partners).removeClass('active');
				$('.gallery .swipe-item', App.Pages.partners).eq(index).addClass('active');

			},
			transitionEnd: function(index, element){

				//

			},

		});

	}

	if ( !App.Functions.hasMobile() ) {

		App.Swipes.innerPartners = new Swipe(document.getElementById('swipe-partners-inner'), {
	
			auto: false,
			continuous: false,
			disableScroll: false,
			callback: function(index, element){
			},
			transitionEnd: function(index, element){
	
				var title = $('.gallery img').eq(index).attr('title');
	
				$('.content > .description p').text(title);
	
				$('.node-partners .thumb').removeClass('active');
				$('.node-partners .thumb').eq(index).addClass('active');
	
				var thumbSwipe = Math.floor(index/6);
	
				App.Swipes.innerPartnersThumbs.slide(thumbSwipe);
	
			},
	
		});
	
		App.Swipes.innerPartnersThumbs = new Swipe(document.getElementById('swipe-partners-thumbs'), {
	
			auto: false,
			continuous: false,
			disableScroll: false,
			callback: function(index, element){
			},
			transitionEnd: function(index, element){
	
				if ( $('.navigation-item').eq(index).hasClass('active') == false ) {
	
					$('.navigation-item').removeClass('active').eq(index).addClass('active');
	
				}
			},
	
		});

	}

	if ( App.Functions.hasDesktop() || App.Functions.hasTablet() ) {

		App.Swipes.partners = new Swipe(document.querySelector('.desktop #swipe-partners, .tablet #swipe-partners'), {

			auto: false,
			continuous: false,
			disableScroll: false,
			callback: function(index, element){
			},
			transitionEnd: function(index, element) {

				if ( $('.navigation-item', App.Pages.partners).eq(index).hasClass('active') == false ) {

					$('.navigation-item', App.Pages.partners).removeClass('active').eq(index).addClass('active').dequeue();

				}

			},

		});

	}

	// @elements events
	$('.anchor-link').on('click', function(event){

		var Target, Anchor, Scroll;

		event.preventDefault();

		App.Vars.Scrolling = true;

		Target = $(this).attr('href').replace('#', '');
		Anchor = $('.anchor[name="' + Target + '"]');
		Scroll = Math.floor(Anchor.offset().top);

		$('.anchor-link').removeClass('active');
		$('.anchor-link[href="#' + Target + '"]').addClass('active');

		if ( Anchor.length ) {

			if ( App.Functions.hasMobile() ) {

				$('#header').removeClass('active');
				$('#backdrop').removeClass('active');

			}

			$('html, body').stop().animate({
				scrollTop: Scroll
			}, 1000, 'easeInOutQuart', function(){

				App.Vars.Scrolling = false;

			});

        }

	});

	$('.navigation-item', App.Pages.partners).click(function(){

		var index = $(this).data('index');

		$('.navigation-item', App.Pages.partners).removeClass('active');

		$(this).addClass('active');

		App.Swipes.partners.slide(index);

	});

	$('.navigation-item', App.Pages.home).click(function(){

		var index = $(this).data('index');

		$('.navigation-item', App.Pages.home).removeClass('active');
		$(this).addClass('active');;

		App.Swipes.home.slide(index);

	});

	$('.headers .close-container').delegate('.button', 'click', function(event){

		event.preventDefault();

		$('.title', App.Pages.partners).removeClass('active');
		$('.headers', App.Pages.partners).removeClass('active');
		$('.header.active', App.Pages.partners).removeClass('active');
		$('.gallery', App.Pages.partners).removeClass('active');
		$('.navigation', App.Pages.partners).removeClass('active');
		$('.partners-arrows', App.Pages.partners).addClass('active');

		loopStart_partners();

	});

	$('.slider .item', App.Pages.partners).on('mousedown', function (event) {

		$('.slider .item', App.Pages.partners).on('mouseup mousemove', function handler(event) {

			if (event.type === 'mouseup') {

				event.preventDefault();

				var index = $('.slider .item', App.Pages.partners).index($(this));
				var pid = $(this).data('id');

				var index_gallery = $('.gallery .swipe-item', App.Pages.partners).index($('.gallery .swipe-item[data-id="' + pid + '"]'));

				App.Swipes.galleryPartners.slide(index_gallery);

				var scroll = Math.floor($('.gallery', App.Pages.partners).offset().top);
				var top = document.documentElement.scrollTop || document.body.scrollTop;

				function callback () {

					$('.navigation', App.Pages.partners).addClass('active');
					$('.partners-arrows', App.Pages.partners).removeClass('active');
					$('.gallery', App.Pages.partners).addClass('active');
					$('.title', App.Pages.partners).addClass('active');
					$('.headers', App.Pages.partners).addClass('active');
					$('.header', App.Pages.partners).removeClass('active');
					$('.header', App.Pages.partners).eq(index).addClass('active');
	
					$('.slider .item', App.Pages.partners).removeClass('active');

					clearInterval(window.loop_Partners);
					delete this.interval;

				}

				if ( top == scroll ) {

					callback();

				}
				else {

					$('html, body').stop().animate({
						scrollTop: scroll
					}, 500, 'easeInOutQuart', function(){

						callback();

					});

				}

				$(this).addClass('active');

			}

			$('.slider .item', App.Pages.partners).off('mouseup mousemove', handler);

		});

	});

	$('.mobile .slider .item').click(function(){

		$('.mobile .slider .item').removeClass('active');
		$(this).addClass('active');

	});

	$('.flip-container', App.Pages.contact).click(function(event){

		if ( $(this).hasClass('active') ) {

			//$(this).removeClass('active');

		}
		else {

			$('.flip-container', App.Pages.contact).removeClass('active');

			$(this).addClass('active');

		}

	});

	$('input[type=file]', App.Pages.contact).change(function(){

		var File = $(this).val().split('\\');
		var Parent = $(this).parent();

		$('label', Parent).text(File[File.length - 1]);

	});

	$('.menu-mobile').click(function(event){

		event.preventDefault();

		App.Functions.toggleMenu();

	});

	$('.node').delegate('.zoom-open', 'click', function(event){

		event.preventDefault();		

		if ( !App.Functions.hasMobile() ) {

			var Parent = $(this).parents('.content'),
				index = $('.zoom-open', Parent).index($(this)),
				Zoom = $('.zoom', Parent),
				Details = $('.details', Parent);
	
				App.Swipes.zoomProducts.slide(index);
	
				var title = $('.zoom-open').eq(index).attr('data-title');
	
				$('.zoom > .description p').text(title);
	
			//
	
			App.Vars.Scrolling = true;
	
			var content = Parent;
			var scroll = Math.floor(content.offset().top - 84);
			var top = document.documentElement.scrollTop || document.body.scrollTop;
	
			if ( top == scroll ) {
	
				Details.removeClass('active');
				Zoom.addClass('active');
	
			}
			else {
	
				$('html, body').stop().animate({
					scrollTop: scroll
				}, 500, 'easeInOutQuart', function(){
	
					App.Vars.Scrolling = false;
	
					Details.removeClass('active');
					Zoom.addClass('active');
	
				});
	
			}

		}

	});

	$('.node').delegate('.zoom-close', 'click', function(event){

		event.preventDefault();

		var Parent = $(this).parents('.content'),
			Zoom = $('.zoom', Parent),
			Details = $('.details', Parent);

		Details.addClass('active');
		Zoom.removeClass('active');

	});

	$(document).mouseup(function(event){

	    var zoomContainer = $('.node-products .zoom');
	    var mapsCotainer = $('.page-stores .map-pop');

	    if ( !zoomContainer.is(event.target) && zoomContainer.has(event.target).length === 0) {

			$('.node-products .details').addClass('active');
	        $('.node-products .zoom.active').removeClass('active');

	    }

		if ( !mapsCotainer.is(event.target) && mapsCotainer.has(event.target).length === 0) {

	        $('.page-stores .map-pop.active').removeClass('active');

	    }

	});

	$('.node-products').delegate('.zoom-arrow, .zoom-arrow-area', 'click', function(event){

		event.preventDefault();

		var Parent = $(this).parents('.content'),
			Zoom = $('.zoom', Parent),
			Details = $('.details', Parent);

		if ( $(this).hasClass('arrow-right') || $(this).hasClass('zoom-right') ) {

			App.Swipes.zoomProducts.next();

		}
		else if ( $(this).hasClass('arrow-left') || $(this).hasClass('zoom-left') ) {

			App.Swipes.zoomProducts.prev();

		}

	});

	$('.page-partners').delegate('.gallery .zoom-arrow, .gallery .zoom-arrow-area', 'click', function(event){

		event.preventDefault();

		var active = $('.gallery .swipe-item.active', App.Pages.partners);
			var pid = active.data('id');

		if ( $(this).hasClass('arrow-right') || $(this).hasClass('zoom-right') ) {

			if ( active.next().data('id') != pid ) return;

			App.Swipes.galleryPartners.next();

		}
		else if ( $(this).hasClass('arrow-left') || $(this).hasClass('zoom-left') ) {

			if ( active.prev().data('id') != pid ) return;

			App.Swipes.galleryPartners.prev();

		}

	});

	$('.page-partners').delegate('.partners-arrows .zoom-arrow, .partners-arrows .zoom-arrow-area', 'click', function(event){

		event.preventDefault();

		var Parent = $('#swipe-partners');
		var index = $('.item', Parent).index($('.item.active', Parent));
		var total = $('.item', Parent).length;

		if ( $(this).hasClass('arrow-right') || $(this).hasClass('zoom-right') ) {

			var goTo = index + 1;

			if ( goTo >= 0 && goTo < total ) {

				var item = $('.item.item-' + goTo, Parent);
				var pid = item.data('id');
				var pager = $('#swipe-partners .swipe-item', App.Pages.partners).index($('#swipe-partners .item[data-id="' + pid + '"]').parents('.swipe-item'));
				var index_gallery = $('#swipe-partners-gallery .swipe-item', App.Pages.partners).index($('#swipe-partners-gallery .swipe-item[data-id="' + pid + '"]'));

				App.Swipes.galleryPartners.slide(index_gallery);

				$('.item', Parent).removeClass('active');
				$('.item', Parent).eq(goTo).addClass('active');

				App.Swipes.partners.slide(pager);

			}

		}
		else if ( $(this).hasClass('arrow-left') || $(this).hasClass('zoom-left') ) {

			var goTo = index - 1;

			if ( goTo >= 0 && goTo < total ) {

				var item = $('.item.item-' + goTo, Parent);
				var pid = item.data('id');
				var pager = $('#swipe-partners .swipe-item', App.Pages.partners).index($('#swipe-partners .item[data-id="' + pid + '"]').parents('.swipe-item'));
				var index_gallery = $('#swipe-partners-gallery .swipe-item', App.Pages.partners).index($('#swipe-partners-gallery .swipe-item[data-id="' + pid + '"]'));

				App.Swipes.galleryPartners.slide(index_gallery);

				$('.item', Parent).removeClass('active');
				$('.item', Parent).eq(goTo).addClass('active');

				App.Swipes.partners.slide(pager);

			}

		}

	});

	$(document.documentElement).keyup(function(event){

		var arrowLeft = 37,
			arrowRight = 39;

		if ( $('.node-products .zoom.active').length > 0 ) {

			if ( event.keyCode == arrowLeft ) {

				App.Swipes.zoomProducts.prev();

			} else if (event.keyCode == arrowRight) {

				App.Swipes.zoomProducts.next();

			}

		}

		if ( $('.node-partners .gallery').length > 0 ) {

			if ( event.keyCode == arrowLeft ) {

				App.Swipes.innerPartners.prev();

			} else if (event.keyCode == arrowRight) {

				App.Swipes.innerPartners.next();

			}

		}

		if ( $('.page-partners .gallery.active').length > 0 ) {

			var active = $('.gallery .swipe-item.active', App.Pages.partners);
			var pid = active.data('id');

			if ( event.keyCode == arrowLeft ) {

				if ( active.prev().data('id') != pid ) return;

				App.Swipes.galleryPartners.prev();

			} else if (event.keyCode == arrowRight) {

				if ( active.next().data('id') != pid ) return;

				App.Swipes.galleryPartners.next();

			}

		}

		if ( $('#menu a[href=#parceiros].active').length > 0 && $('.gallery.active', App.Pages.partners).length == 0 ) {

			if ( event.keyCode == arrowLeft ) {

				$('.partners-arrows .zoom-arrow-area.zoom-left', App.Pages.partners).click();

			} else if (event.keyCode == arrowRight) {

				$('.partners-arrows .zoom-arrow-area.zoom-right', App.Pages.partners).click();

			}

		}

	});

	// @loop Partners
	function loopStart_partners () {

		window.loop_Partners = setInterval(function(){
	
			var Parent = $('#swipe-partners');
			var index = $('.item', Parent).index($('.item.active', Parent));
			var total = $('.item', Parent).length;
	
			var goTo = index + 1;
	
			function gotoexec ( goTo ) {
	
				var item = $('.item.item-' + goTo, Parent);
				var pid = item.data('id');
				var pager = $('#swipe-partners .swipe-item', App.Pages.partners).index($('#swipe-partners .item[data-id="' + pid + '"]').parents('.swipe-item'));
				var index_gallery = $('#swipe-partners-gallery .swipe-item', App.Pages.partners).index($('#swipe-partners-gallery .swipe-item[data-id="' + pid + '"]'));
	
				App.Swipes.galleryPartners.slide(index_gallery);
	
				$('.item', Parent).removeClass('active');
				$('.item', Parent).eq(goTo).addClass('active');
	
				App.Swipes.partners.slide(pager);
	
			}
	
			if ( goTo >= 0 && goTo < total ) {
	
				gotoexec(goTo);
	
			}
			else {
	
				gotoexec(0);
	
			}
	
		}, 8000);

	}

	loopStart_partners();

	//

	$('.node-partners .zoom-arrow, .node-partners .zoom-arrow-area').click(function(event){

		event.preventDefault();

		var Parent = $(this).parents('.content');

		if ( $(this).hasClass('arrow-right') || $(this).hasClass('zoom-right') ) {

			App.Swipes.innerPartners.next();

		}
		else if ( $(this).hasClass('arrow-left') || $(this).hasClass('zoom-left') ) {

			App.Swipes.innerPartners.prev();

		}

	});

	$('.node-partners .thumb').click(function(event){

		event.preventDefault();

		var index = $('.node-partners .thumb').index($(this)),
			Parent = $(this).parents('.content'),
			Gallery = $('.gallery', Parent);

		App.Swipes.innerPartners.slide(index);

	});

	$('.node-partners .navigation-item').click(function(){

		var index = $(this).data('index');

		$('.node-partners .navigation-item').removeClass('active');

		$(this).addClass('active');

		App.Swipes.innerPartnersThumbs.slide(index);

	});

	// Stores
	$('.page-stores .map a').click(function(event){

		event.preventDefault();

		var Parent = $('.page-stores');
		var Description = $(this).attr('data-description');
		var Latitude = $(this).attr('data-latitude');
		var Longitude = $(this).attr('data-longitude');

		$('#store-map').empty();

		//

		var content = $('.map-pop');
		var scroll = Math.floor(content.offset().top - 120);
		var top = document.documentElement.scrollTop || document.body.scrollTop;

		$('.map-pop .description p', Parent).text(Description);
		$('.map-pop', Parent).toggleClass('active');

		setTimeout(function(){

			App.Functions.googleMaps( 'store-map', Latitude, Longitude, 16 );

		}, 1000);

		if ( top == scroll ) {		
		}
		else {

			$('html, body').stop().animate({
				scrollTop: scroll
			}, 500, 'easeInOutQuart');

		}

	});

	$('.page-stores .map-pop .close').click(function(event){

		event.preventDefault();

		var Parent = $('.page-stores');

		$('.map-pop', Parent).removeClass('active');

	});

	// @page-front: about ajax
	$('.page.page-about .readmore').click(function(event){

		event.preventDefault();

		$('.page.page-about .window').addClass('loading');

		$.get(
			//Drupal.settings.basePath + 'node/4',
			$(this).attr('href'),
			function(data){

				$('.page.page-services .button').text('Saiba mais');
				$('.page.page-services .ajax-content').removeClass('active');
				$('.page.page-services .ajax-content').html('');

				//$('.page.page-about .window').addClass('loaded').delay(300).addClass('hide');
				$('.page.page-about .window').removeClass('loading');

				$('.page.page-about .ajax-content').html($('.node.node-page', data));
				$('.page.page-about .ajax-content').addClass('active');

				App.Functions.resizeBehavior();

				$('html, body').stop().animate({
					scrollTop: (($('.page.page-about .window').offset().top + $('.page.page-about .window').height() + 30) - 84)
				}, 500, 'easeInOutQuart');

			}
		)
		.fail(function(){

			//$('.page.page-about .window').removeClass('loaded loading');
			$('.page.page-about .window').removeClass('loading');

		});

	});

	$('.page.page-about').delegate('.button', 'click', function(event){

		event.preventDefault();

		$('.page.page-about .ajax-content').removeClass('active').delay(300).html('');
		$('.page.page-about .window').delay(300).removeClass('hide loaded loading');

		$('html, body').stop().animate({
			scrollTop: ($('.page.page-about .window').offset().top - 84)
		}, 500, 'easeInOutQuart');

	});

	// @page-front: products ajax
	$('.page.page-services .readmore, .page.page-services .button').click(function(event){

		event.preventDefault();

		$('.page.page-about .ajax-content').removeClass('active').delay(300).html('');
		$('.page.page-about .window').delay(300).removeClass('hide loaded loading');

		var parent = $(this).parents('.item');

		if ( parent.hasClass('ajax-loaded') ) {

			$('.button', parent).text('Saiba mais');

			//

			$('.ajax-content', parent).removeClass('active');

			setTimeout(function(){

				$('.ajax-content', parent).html('');
				parent.removeClass('ajax-loaded');
				$('html, body').scrollTop( parent.offset().top - 84 );

			}, 300);

		}
		else {

			$('.page.page-services .button').text('Saiba mais');
			$('.button', parent).text('Recolher');

			$('.page.page-services .item').removeClass('ajax-loaded');
			$('.page.page-services .ajax-content').removeClass('active').delay(300).html('');
			$('.page.page-services .window').delay(300).removeClass('hide loaded loading');

			$('html, body').scrollTop( parent.offset().top - 84 );

			$('.window', parent).addClass('loading');

			$.get(
				$(this).attr('href'),
				function(data){

					$('.ajax-content', parent).html($('.node > .container', data));

					parent.addClass('ajax-loaded');

					//$('.window', parent).addClass('loaded').delay(300).addClass('hide');
					$('.window', parent).removeClass('loading');

					$('.ajax-content', parent).addClass('active');

					App.Swipes.zoomProducts = new Swipe(document.getElementById('swipe-products'), {

						auto: false,
						continuous: false,
						disableScroll: false,
						callback: function(index, element){
						},
						transitionEnd: function(index, element){

							var title = $('.zoom-open').eq(index).attr('data-title');

							$('.zoom > .description p').text(title);

						},

					});

					$('.zoom.active', parent).removeClass('active');

				}

			)
			.fail(function(){

				parent.removeClass('ajax-loaded');

				$('.window', parent).removeClass('loaded loading');

			});

		}

	});

	// @dom init
	$('.zoom').removeClass('active');

})(jQuery);