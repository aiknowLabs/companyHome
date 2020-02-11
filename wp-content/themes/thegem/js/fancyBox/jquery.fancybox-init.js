(function($) {

	$.fn.initGalleryFancybox = function() {
	    $('a.fancy-gallery', this).fancybox({
	        caption : function( instance, item ) {
	            var slideInfo = $('.slide-info', this);
	            if ($('> *', slideInfo).length) {
	                return slideInfo.clone().html();
	            }
	        },
	        onInit: function(instance) {
	            instance.$refs.caption.addClass('fancybox-title');
	            instance.$refs.caption.parent().addClass('slideinfo');
	        }
	    });
	};

	$.fn.initPortfolioFancybox = function() {
		$('a.fancy, .fancy-link-inner a', this).fancybox();

		$('.portfolio-item a.vimeo, .portfolio-item a.youtube', this).fancybox({
			type: 'iframe'
		});

		$('.portfolio-item a.self_video', this).click(function(e) {
			e.preventDefault();
			var $a = $(this);
			$.fancybox.open({
				type: 'html',
				maxWidth: 1200,
				content: '<div id="fancybox-video"><video width="100%" height="100%" autoplay="autoplay" controls="controls" src="'+$a.attr('href')+'" preload="none"></video></div>',
				afterShow: function(instance, current) {
					$('video', current.$content).mediaelementplayer();
				}
			});
		});
	};

	$.fn.initBlogFancybox = function() {
		$('a.fancy, .fancy-link-inner a', this).fancybox();

		$('.blog article a.youtube, .blog article a.vimeo', this).fancybox({
			type: 'iframe'
		});
	};

	$(document).initGalleryFancybox();
	$(document).initPortfolioFancybox();
	$(document).initBlogFancybox();

	$('a.fancy, .fancy-link-inner a').fancybox();
})(jQuery);
