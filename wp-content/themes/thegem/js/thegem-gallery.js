(function($) {
	$(function() {

		function gallery_images_loaded($box, image_selector, callback) {
			function check_image_loaded(img) {
				return img.complete && img.naturalWidth !== undefined && img.naturalWidth != 0;
			}

			var $images = $(image_selector, $box).filter(function() {
					return !check_image_loaded(this);
				}),
				images_count = $images.length;

			if (images_count == 0) {
				return callback();
			}

			if (window.gemBrowser.name == 'ie' && !isNaN(parseInt(window.gemBrowser.version)) && parseInt(window.gemBrowser.version) <= 10) {
				function image_load_event() {
					images_count--;
					if (images_count == 0) {
						callback();
					}
				}

				$images.each(function() {
					if (check_image_loaded(this)) {
						return;
					}

					var proxyImage = new Image();
					proxyImage.addEventListener( 'load', image_load_event );
					proxyImage.addEventListener( 'error', image_load_event );
					proxyImage.src = this.src;
				});
				return;
			}

			$images.on('load error', function() {
				images_count--;
				if (images_count == 0) {
					callback();
				}
			});
		}

		function init_circular_overlay($gallery, $set) {
			if (!$gallery.hasClass('hover-circular')) {
				return;
			}

			$('.gallery-item', $set).on('mouseenter', function() {
				var overlayWidth = $('.overlay', this).width(),
					overlayHeight = $('.overlay', this).height(),
					$overlayCircle = $('.overlay-circle', this),
					maxSize = 0;

				if (overlayWidth > overlayHeight) {
					maxSize = overlayWidth;
					$overlayCircle.height(overlayWidth)
				} else {
					maxSize = overlayHeight;
					$overlayCircle.width(overlayHeight);
				}
				maxSize += overlayWidth * 0.3;

				$overlayCircle.css({
					marginLeft: -maxSize / 2,
					marginTop: -maxSize / 2
				});
			});
		}

		function initGalleryGrid() {
			if ($(this).hasClass('metro')) {
				return;
			}

			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initGalleryGrid.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $gallery = $(this);
			var $set = $('.gallery-set', this);

			gallery_images_loaded($set, '.image-wrap img', function() {
				$gallery.closest('.gallery-preloader-wrapper').prev('.preloader').remove();

				init_circular_overlay($gallery, $set);

				var itemsAnimations = $gallery.itemsAnimations({
					itemSelector: '.gallery-item',
					scrollMonitor: true
				});
				var init_gallery = true;

				$set
					.on( 'arrangeComplete', function( event, filteredItems ) {
						if (init_gallery) {
							init_gallery = false;

							var items = [];
							filteredItems.forEach(function(item) {
								items.push(item.element);
							});
							itemsAnimations.show($(items));
							// setTimeout(function() {
							// 	itemsAnimations.show($(items));
							// });
						}
					})
					.isotope({
						itemSelector: '.gallery-item',
						itemImageWrapperSelector: '.image-wrap',
						fixHeightDoubleItems: $gallery.hasClass('gallery-style-justified'),
						layoutMode: 'masonry-custom',
						'masonry-custom': {
							columnWidth: '.gallery-item:not(.double-item)'
						}
					});
			});

			if ($set.closest('.gem_tab').size() > 0) {
				$set.closest('.gem_tab').bind('tab-update', function() {
					$set.isotope('layout');
				});
			}
			$(document).on('show.vc.tab', '[data-vc-tabs]', function() {
				var $tab = $(this).data('vc.tabs').getTarget();
				if($tab.find($set).length) {
					$set.isotope('layout');
				}
			});
		}

		var resizeTimer = null;
		function initGalleryMetroGrid() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initGalleryMetroGrid.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $gallery = $(this);
			var $set = $('.gallery-set', this);
			gallery_images_loaded($set, '.image-wrap img', function() {
				$gallery.closest('.gallery-preloader-wrapper').prev('.preloader').remove();

				var itemsAnimations = $gallery.itemsAnimations({
					itemSelector: '.gallery-item',
					scrollMonitor: true
				});
				var init_gallery = true;

				init_circular_overlay($gallery, $set);

				$set
					.on( 'arrangeComplete', function( event, filteredItems ) {
						if (init_gallery) {
							init_gallery = false;

							var items = [];
							filteredItems.forEach(function(item) {
								items.push(item.element);
							});
							//setTimeout(function() {
								itemsAnimations.show($(items));
							//});
						}
					})
					.isotope({
						itemSelector: '.gallery-item',
						itemImageWrapperSelector: '.image-wrap',
						fixHeightDoubleItems: $gallery.hasClass('gallery-style-justified'),
						layoutMode: 'metro',
						'masonry-custom': {
							columnWidth: '.gallery-item:not(.double-item)'
						},
						transitionDuration: 0
					});

				if ($set.closest('.gem_tab').size() > 0) {
					$set.closest('.gem_tab').bind('tab-update', function() {
						$set.isotope('layout');
					});
				}
				$(document).on('gem.show.vc.tabs', '[data-vc-accordion]', function() {
					var $tab = $(this).data('vc.accordion').getTarget();
					if($tab.find($set).length) {
						$set.isotope('layout');
					}
				});
				$(document).on('gem.show.vc.accordion', '[data-vc-accordion]', function() {
					var $tab = $(this).data('vc.accordion').getTarget();
					if($tab.find($set).length) {
						$set.isotope('layout');
					}
				});
			});
		}

		function initGallerySlider() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initGallerySlider.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $gallery = $(this);
			var $set = $('.gallery-set', this);
			var $items = $('.gallery-item', $set);

			init_circular_overlay($gallery, $set);

			// update images list
			$set.wrap('<div class="gem-gallery-preview-carousel-wrap clearfix"/>');
			var $galleryPreviewWrap = $('.gem-gallery-preview-carousel-wrap', this);
			$galleryPreviewWrap.wrap('<div class="gem-gallery-preview-carousel-padding clearfix"/>');
			var $galleryPreviewNavigation = $('<div class="gem-gallery-preview-navigation"/>')
				.appendTo($galleryPreviewWrap);
			var $galleryPreviewPrev = $('<a href="#" class="gem-prev gem-gallery-preview-prev"></a>')
				.appendTo($galleryPreviewNavigation);
			var $galleryPreviewNext = $('<a href="#" class="gem-next gem-gallery-preview-next"></a>')
				.appendTo($galleryPreviewNavigation);

			// create thumbs list
			var $galleryThumbsWrap = $('<div class="gem-gallery-thumbs-carousel-wrap col-lg-12 col-md-12 col-sm-12 clearfix" style="opacity: 0"/>')
				.appendTo($gallery);
			var $galleryThumbsCarousel = $('<ul class="gem-gallery-thumbs-carousel"/>')
				.appendTo($galleryThumbsWrap);
			var $galleryThumbsNavigation = $('<div class="gem-gallery-thumbs-navigation"/>')
				.appendTo($galleryThumbsWrap);
			var $galleryThumbsPrev = $('<a href="#" class="gem-prev gem-gallery-thumbs-prev"></a>')
				.appendTo($galleryThumbsNavigation);
			var $galleryThumbsNext = $('<a href="#" class="gem-next gem-gallery-thumbs-next"></a>')
				.appendTo($galleryThumbsNavigation);
			var thumbItems = '';
			$items.each(function() {
				thumbItems += '<li><span><img src="' + $('.image-wrap img', this).data('thumb-url') + '" alt="" /></span></li>';
			});
			var $thumbItems = $(thumbItems);
			$thumbItems.appendTo($galleryThumbsCarousel);
			$thumbItems.each(function(index) {
				$(this).data('gallery-item-num', index);
			});

			var $galleryPreview = $set.carouFredSel({
				auto: false,
				circular: false,
				infinite: false,
				responsive: true,
				width: '100%',
				height: '100%',
				items: 1,
				align: 'center',
				prev: $galleryPreviewPrev,
				next: $galleryPreviewNext,
				swipe: true,
				scroll: {
					items: 1,
					onBefore: function(data) {
						var current = $(this).triggerHandler('currentPage');
						var thumbCurrent = $galleryThumbs.triggerHandler('slice', [current, current+1]);
						var thumbsVisible = $galleryThumbs.triggerHandler('currentVisible');
						$thumbItems.filter('.active').removeClass('active');
						if(thumbsVisible.index(thumbCurrent) === -1) {
							$galleryThumbs.trigger('slideTo', current);
						}
						$('span', thumbCurrent).trigger('click');
					}
				}
			});

			var $galleryThumbs = null;
			gallery_images_loaded($galleryThumbsCarousel, 'img', function() {
				$galleryThumbs = $galleryThumbsCarousel.carouFredSel({
					auto: false,
					circular: false,
					infinite: false,
					width: '100%',
					height: 'variable',
					align: 'center',
					prev: $galleryThumbsPrev,
					next: $galleryThumbsNext,
					swipe: true,
					onCreate: function(data) {
						$('span', $thumbItems).click(function(e) {
							e.preventDefault();
							$thumbItems.filter('.active').removeClass('active');
							$(this).closest('li').addClass('active');
							$galleryPreview.trigger('slideTo', $(this).closest('li').data('gallery-item-num'));
						});
						$thumbItems.eq(0).addClass('active');
					}
				});
				$galleryThumbsWrap.animate({opacity: 1}, 400);
				if($thumbItems.length < 2) {
					$galleryThumbsWrap.hide();
				}
			});
		}

		function initGallery() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initGallery.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $galleryElement = $(this);

			var $thumbItems = $('.gem-gallery-item', $galleryElement);

			var $galleryPreviewWrap = $('<div class="gem-gallery-preview-carousel-wrap"/>')
				.appendTo($galleryElement);
			var $galleryPreviewCarousel = $('<div class="gem-gallery-preview-carousel "/>')
				.appendTo($galleryPreviewWrap);
			var $galleryPreviewNavigation = $('<div class="gem-gallery-preview-navigation"/>')
				.appendTo($galleryPreviewWrap);
			var $galleryPreviewPrev = $('<a href="#" class="gem-prev gem-gallery-preview-prev"></a>')
				.appendTo($galleryPreviewNavigation);
			var $galleryPreviewNext = $('<a href="#" class="gem-next gem-gallery-preview-next"></a>')
				.appendTo($galleryPreviewNavigation);
			if($galleryElement.hasClass('with-pagination')) {
				var $galleryPreviewPagination = $('<div class="gem-gallery-preview-pagination gem-mini-pagination"/>')
					.appendTo($galleryPreviewWrap);
			}
			var $previewItems = $thumbItems.clone(true, true);
			$previewItems.appendTo($galleryPreviewCarousel);
			$previewItems.each(function() {
				$('img', this).attr('src', $('a', this).attr('href'));
				$('a', this)
					.attr('href', $('a', this)
					.data('full-image-url'))
					.attr('data-fancybox', $('a', this).data('fancybox-group'))
					.addClass('fancy-gallery');
			});

			$galleryPreviewCarousel.initGalleryFancybox();

			var $galleryThumbsWrap = $('<div class="gem-gallery-thumbs-carousel-wrap"/>')
				.appendTo($galleryElement);
			var $galleryThumbsCarousel = $('<div class="gem-gallery-thumbs-carousel"/>')
				.appendTo($galleryThumbsWrap);
			var $galleryThumbsNavigation = $('<div class="gem-gallery-thumbs-navigation"/>')
				.appendTo($galleryThumbsWrap);
			var $galleryThumbsPrev = $('<a href="#" class="gem-prev gem-gallery-thumbs-prev"></a>')
				.appendTo($galleryThumbsNavigation);
			var $galleryThumbsNext = $('<a href="#" class="gem-next gem-gallery-thumbs-next"></a>')
				.appendTo($galleryThumbsNavigation);
			$thumbItems.appendTo($galleryThumbsCarousel);
			$thumbItems.each(function(index) {
				$(this).data('gallery-item-num', index);
			});
		}

		$('.gem-gallery-grid').not('.gallery-slider').each(initGalleryGrid);
		$('.gem-gallery-grid.metro').not('.gallery-slider').each(initGalleryMetroGrid);
		$('.gallery-slider').each(initGallerySlider);

		$('.gem-gallery-grid').on('click', '.gallery-item', function() {
			$(this).mouseover();
		});

		$('.gem-gallery').each(initGallery);

		$('body').updateGalleries();
		$('body').buildSimpleGalleries();
		$('body').updateSimpleGalleries();

		$('.gem_tab').on('tab-update', function() {
			$(this).updateGalleries();
		});
		$(document).on('gem.show.vc.tabs', '[data-vc-accordion]', function() {
			$(this).data('vc.accordion').getTarget().updateGalleries();
		});
		$(document).on('gem.show.vc.accordion', '[data-vc-accordion]', function() {
			$(this).data('vc.accordion').getTarget().updateGalleries();
		});
	});

	function updateGallery() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
				updateGallery.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $galleryElement = $(this);

		var $galleryPreviewCarousel = $('.gem-gallery-preview-carousel', $galleryElement);
		var $galleryThumbsWrap = $('.gem-gallery-thumbs-carousel-wrap', $galleryElement);
		var $galleryThumbsCarousel = $('.gem-gallery-thumbs-carousel', $galleryElement);
		var $thumbItems = $('.gem-gallery-item', $galleryThumbsCarousel);
		var $galleryPreviewPrev = $('.gem-gallery-preview-prev', $galleryElement);
		var $galleryPreviewNext = $('.gem-gallery-preview-next', $galleryElement);
		var $galleryPreviewPagination = $('.gem-gallery-preview-pagination', $galleryElement);
		var $galleryThumbsPrev = $('.gem-gallery-thumbs-prev', $galleryElement);
		var $galleryThumbsNext = $('.gem-gallery-thumbs-next', $galleryElement);

		$galleryElement.thegemPreloader(function() {

			var $galleryThumbs = $galleryThumbsCarousel, $galleryPreview = $galleryPreviewCarousel;

			$galleryPreview = $galleryPreviewCarousel.carouFredSel({
				auto: $galleryElement.data('autoscroll') ? $galleryElement.data('autoscroll') : false,
				circular: true,
				infinite: true,
				responsive: true,
				width: '100%',
				height: 'auto',
				items: 1,
				align: 'center',
				prev: $galleryPreviewPrev,
				next: $galleryPreviewNext,
				pagination: $galleryElement.hasClass('with-pagination') ? $galleryPreviewPagination : false,
				swipe: true,
				scroll: {
					pauseOnHover: true,
					items: 1,
					onBefore: function(data) {
						var current = $(this).triggerHandler('currentPage');
						var thumbCurrent = $galleryThumbs.triggerHandler('slice', [current, current+1]);
						var thumbsVisible = $galleryThumbs.triggerHandler('currentVisible');
						$thumbItems.filter('.active').removeClass('active');
						if(thumbsVisible.index(thumbCurrent) === -1) {
							$galleryThumbs.trigger('slideTo', current);
						}
						$('a', thumbCurrent).trigger('gemActivate');
					}
				},
				onCreate: function () {
					$(window).on('resize', function () {
						$galleryPreviewCarousel.parent().add($galleryPreviewCarousel).height($galleryPreviewCarousel.children().first().height());
					}).trigger('resize');
				}
			});

			$galleryThumbs = $galleryThumbsCarousel.carouFredSel({
				auto: false,
				circular: true,
				infinite: true,
				width: '100%',
				height: 'variable',
				align: 'center',
				prev: $galleryThumbsPrev,
				next: $galleryThumbsNext,
				swipe: true,
				onCreate: function(data) {
					$('a', $thumbItems).on('gemActivate', function(e) {
						$thumbItems.filter('.active').removeClass('active');
						$(this).closest('.gem-gallery-item').addClass('active');
						$galleryPreview.trigger('slideTo', $(this).closest('.gem-gallery-item').data('gallery-item-num'));
					});
					$('a', $thumbItems).click(function(e) {
						e.preventDefault();
						$(this).trigger('gemActivate');
					});
				}
			});

			if($thumbItems.filter('.active').length) {
				$thumbItems.filter('.active').eq(0).find('a').trigger('click');
			} else {
				$thumbItems.eq(0).find('a').trigger('gemActivate');
			}

			if($thumbItems.length < 2) {
				$galleryThumbsWrap.hide();
			}

		});
	}

	function updateSimpleGallery() {
		if (window.tgpLazyItems !== undefined) {
			var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
				updateSimpleGallery.call(node);
			});
			if (!isShowed) {
				return;
			}
		}

		var $galleryElement = $(this);

		var $galleryItemsCarousel = $('.gem-gallery-items-carousel', $galleryElement);
		var $thumbItems = $('.gem-gallery-item', $galleryItemsCarousel);
		var $galleryItemsPrev = $('.gem-gallery-items-prev', $galleryElement);
		var $galleryItemsNext = $('.gem-gallery-items-next', $galleryElement);

		$galleryElement.thegemPreloader(function() {
			var $galleryItems = $galleryItemsCarousel.carouFredSel({
				auto: ($galleryElement.data('autoscroll') > 0 ? $galleryElement.data('autoscroll') : false),
				circular: true,
				infinite: true,
				responsive: $galleryElement.hasClass('responsive'),
				width: '100%',
				height: 'variable',
				align: 'center',
				prev: $galleryItemsPrev,
				next: $galleryItemsNext,
				swipe: true,
				scroll: {
					pauseOnHover: true
				},
				onCreate: function(data) {
					$galleryElement.trigger('gallery-inited');
				}
			});

		});
	}

	$.fn.buildSimpleGalleries = function() {
		$('.gem-simple-gallery:not(.activated)', this).each(function() {

			var $galleryElement = $(this);
			$galleryElement.addClass('activated');

			var $thumbItems = $('.gem-gallery-item', $galleryElement);

			var $galleryItemsWrap = $('<div class="gem-gallery-items-carousel-wrap"/>')
				.appendTo($galleryElement);
			var $galleryItemsCarousel = $('<div class="gem-gallery-items-carousel"/>')
				.appendTo($galleryItemsWrap);
			var $galleryItemsNavigation = $('<div class="gem-gallery-items-navigation"/>')
				.appendTo($galleryItemsWrap);
			var $galleryItemsPrev = $('<a href="#" class="gem-prev gem-gallery-items-prev"></a>')
				.appendTo($galleryItemsNavigation);
			var $galleryItemsNext = $('<a href="#" class="gem-next gem-gallery-items-next"></a>')
				.appendTo($galleryItemsNavigation);
			$thumbItems.appendTo($galleryItemsCarousel);
			$('a', $galleryItemsCarousel).addClass('fancy-gallery');
			$galleryItemsCarousel.initGalleryFancybox();
		});
	}

	$.fn.updateGalleries = function() {
		$('.gem-gallery', this).each(updateGallery);
	}

	$.fn.updateSimpleGalleries = function() {
		$('.gem-simple-gallery', this).each(updateSimpleGallery);
	}

})(jQuery);
