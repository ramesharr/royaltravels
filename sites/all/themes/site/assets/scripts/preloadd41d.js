(function($)
{

	var imgList = [];

	$.extend({

		preload: function(imgArr, option)
		{

			var setting = $.extend({
				init: function(loaded, total) {},
				loaded: function(img, loaded, total) {},
				loaded_all: function(loaded, total) {}
			}, option);

			var total = imgArr.length;
			var loaded = 0;
			
			setting.init(0, total);

			for ( var i in imgArr )
			{

				imgList.push($("<img />")
					.attr("src", imgArr[i])
					.load(function() {
						loaded++;
						setting.loaded(this, loaded, total);
						if(loaded == total) {
							setting.loadedAll(loaded, total);
						}
					})
				);

			}

		}

	});

})(jQuery);

$(function(){

	$.preload([
		'http://lacca.com.br/lacca/sites/default/files/styles/full/public/apresentation/background/home1.jpg',
		'http://lacca.com.br/lacca/sites/default/files/styles/full/public/apresentation/background/home2.jpg',
		'http://lacca.com.br/lacca/sites/default/files/styles/full/public/apresentation/background/home3.jpg',
		'http://lacca.com.br/lacca/sites/default/files/styles/full/public/apresentation/background/home4.jpg',
	], {

		init: function(loaded, total) {

			$('body').addClass('loading');
			$('.loading-container').addClass('active');

		},
		loaded: function(img, loaded, total) {

			var porcent = Math.round( loaded / total * 100 );
			var loader = Math.round( loaded / total * 500 );

			$(".loading-bar").stop().animate({
				width: porcent + '%'
			}); 

		},
		loadedAll: function(loaded, total) {

			$('.loading-container').removeClass('active');
			$('body').removeClass('loading');

		}

	});

});