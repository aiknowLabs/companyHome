(function($) {
	$.fn.thegemPreloader = function(callback) {
		$(this).each(function() {
			var $el = $(this),
				hasSrc = ['img', 'iframe'].indexOf($el[0].nodeName.toLowerCase()) != -1;

			$el.data('thegemPreloader', $('img, iframe', $el).add($el.filter('img, iframe')).length);

			if ($el.data('thegemPreloader') == 0 || (hasSrc && !$el.attr('src'))) {
				$el.prev('.preloader').remove();
				callback();
				$el.trigger('thegem-preloader-loaded');
				return;
			}

			if(!$el.prev('.preloader').length) {
				$('<div class="preloader">').insertBefore($el);
			}

			$('img, iframe', $el).add($el.filter('img, iframe')).each(function() {
				function preloaderItemLoaded() {
					$el.data('thegemPreloader', $el.data('thegemPreloader')-1);
					if($el.data('thegemPreloader') == 0) {
						$el.prev('.preloader').remove();
						callback();
						$el.trigger('thegem-preloader-loaded');
					}
				}

				if (!$(this).attr('src')) {
					preloaderItemLoaded();
					return;
				}

				var $obj = $('<img>');
				if($(this).prop('tagName').toLowerCase() == 'iframe') {
					$obj = $(this);
				}
				$obj.attr('src', $(this).attr('src'));
				$obj.on('load error', preloaderItemLoaded);
			});
		});
	}
})(jQuery);

(function($) {

	var oWidth=$.fn.width;
	$.fn.width=function(argument) {
		if (arguments.length==0 && this.length==1 && this[0]===window) {
			if (window.gemOptions.innerWidth != -1) {
				return window.gemOptions.innerWidth;
			}
			var width = oWidth.apply(this,arguments);
			window.updateGemInnerSize(width);
			return width;
		}

		return oWidth.apply(this,arguments);
	};

	var $page = $('#page');

	$(window).load(function() {
		var $preloader = $('#page-preloader');
		if ($preloader.length && !$preloader.hasClass('preloader-loaded')) {
			$preloader.addClass('preloader-loaded');
		}
	});

	$('#site-header.animated-header').headerAnimation();

	$.fn.updateTabs = function() {

		jQuery('.gem-tabs', this).each(function(index) {
			var $tabs = $(this);
			$tabs.thegemPreloader(function() {
				$tabs.easyResponsiveTabs({
					type: 'default',
					width: 'auto',
					fit: false,
					activate: function(currentTab, e) {
						var $tab = $(currentTab.target);
						var controls = $tab.attr('aria-controls');
						$tab.closest('.ui-tabs').find('.gem_tab[aria-labelledby="' + controls + '"]').trigger('tab-update');
					}
				});
			});
		});

		jQuery('.gem-tour', this).each(function(index) {
			var $tabs = $(this);
			$tabs.thegemPreloader(function() {
				$tabs.easyResponsiveTabs({
					type: 'vertical',
					width: 'auto',
					fit: false,
					activate: function(currentTab, e) {
						var $tab = $(currentTab.target);
						var controls = $tab.attr('aria-controls');
						$tab.closest('.ui-tabs').find('.gem_tab[aria-labelledby="' + controls + '"]').trigger('tab-update');
					}
				});
			});
		});

	};

	function fullwidth_block_after_update($item) {
		$item.trigger('updateTestimonialsCarousel');
		$item.trigger('updateClientsCarousel');
		$item.trigger('fullwidthUpdate');
	}

	function fullwidth_block_update($item, pageOffset, pagePaddingLeft, pageWidth,skipTrigger) {
		var $prevElement = $item.prev(),
			extra_padding = 0;
		if ($prevElement.length == 0 || $prevElement.hasClass('fullwidth-block')) {
			$prevElement = $item.parent();
			extra_padding = parseInt($prevElement.css('padding-left'));
		}

		var offsetKey = window.gemSettings.isRTL ? 'right' : 'left';
		var cssData = {
			width: pageWidth
		};
		cssData[offsetKey] = pageOffset.left - ($prevElement.length ? $prevElement.offset().left : 0) + parseInt(pagePaddingLeft) - extra_padding;

		$item.css(cssData);

		if (!skipTrigger) {
			fullwidth_block_after_update($item);
		}
	}

	var inlineFullwidths = [],
		notInlineFullwidths = [];

	$('.fullwidth-block').each(function() {
		var $item = $(this),
			$parents = $item.parents('.vc_row'),
			fullw = {
				isInline: false
			};

		$parents.each(function() {
			if (this.hasAttribute('data-vc-full-width')) {
				fullw.isInline = true;
				return false;
				}
		});

		if (fullw.isInline) {
			inlineFullwidths.push(this);
		} else {
			notInlineFullwidths.push(this);
			}
		});

	function update_fullwidths(inline, init) {
		var $needUpdate = [];

		(inline ? inlineFullwidths : notInlineFullwidths).forEach(function(item) {
			$needUpdate.push(item);
		});

		if ($needUpdate.length > 0) {
			var pageOffset = $page.offset(),
				pagePaddingLeft = $page.css('padding-left'),
				pageWidth = $page.width();

			$needUpdate.forEach(function(item) {
				fullwidth_block_update($(item), pageOffset, pagePaddingLeft, pageWidth);
				});
		}
	}

	if (!window.disableGemSlideshowPreloaderHandle) {
		jQuery('.gem-slideshow').each(function() {
			var $slideshow = $(this);
			$slideshow.thegemPreloader(function() {});
		});
	}

	$(function() {
		$('#gem-icons-loading-hide').remove();
		$('#thegem-preloader-inline-css').remove();

		jQuery('iframe').not('.gem-video-background iframe, .wcppec-checkout-buttons iframe').each(function() {
			$(this).thegemPreloader(function() {});
		});

		jQuery('.gem-video-background').each(function() {
			var $videoBG = $(this);
			var $videoContainer = $('.gem-video-background-inner', this);
			var ratio = $videoBG.data('aspect-ratio') ? $videoBG.data('aspect-ratio') : '16:9';
			var regexp = /(\d+):(\d+)/;
			var $fullwidth = $videoBG.closest('.fullwidth-block');
			ratio = regexp.exec(ratio);
			if(!ratio || parseInt(ratio[1]) == 0 || parseInt(ratio[2]) == 0) {
				ratio = 16/9;
			} else {
				ratio = parseInt(ratio[1])/parseInt(ratio[2]);
			}

			function gemVideoUpdate()  {
				$videoContainer.removeAttr('style');
				if($videoContainer.width() / $videoContainer.height() > ratio) {
					$videoContainer.css({
						height: ($videoContainer.width() / ratio) + 'px',
						marginTop: -($videoContainer.width() / ratio - $videoBG.height()) / 2 + 'px'
					});
				} else {
					$videoContainer.css({
						width: ($videoContainer.height() * ratio) + 'px',
						marginLeft: -($videoContainer.height() * ratio - $videoBG.width()) / 2 + 'px'
					});
				}
			}

			if ($videoBG.closest('.page-title-block').length > 0) {
				gemVideoUpdate();
			}

			if ($fullwidth.length) {
				$fullwidth.on('fullwidthUpdate', gemVideoUpdate);
			} else {
				$(window).resize(gemVideoUpdate);
				}
			});

		update_fullwidths(false, true);

		if (!window.gemSettings.parallaxDisabled) {
			$('.fullwidth-block').each(function() {
				var $item = $(this),
					mobile_enabled = $item.data('mobile-parallax-enable') || '0',
					is_custom_title = $item.hasClass('custom-title-background');

				if (!window.gemSettings.isTouch || mobile_enabled == '1') {
					if ($item.hasClass('fullwidth-block-parallax-vertical')) {
						var parallaxOptions = {};
						if (is_custom_title) {
							parallaxOptions.position = 'top';
						}

						$('.fullwidth-block-background', $item).each(function() {
							var backgroundImageCss = $(this).css('background-image') || '';

							if (backgroundImageCss == 'none' || backgroundImageCss == '') {
								$(this).on('tgpliVisible', function() {
									$(this).parallaxVertical('50%', parallaxOptions);
								});

								return;
							}

							$(this).parallaxVertical('50%', parallaxOptions);
						});
					} else if ($item.hasClass('fullwidth-block-parallax-horizontal')) {
						$('.fullwidth-block-background', $item).each(function() {
							var backgroundImageCss = $(this).css('background-image') || '';

							if (backgroundImageCss == 'none' || backgroundImageCss == '') {
								$(this).on('tgpliVisible', function() {
									$(this).parallaxHorizontal();
								});

								return;
							}

							$(this).parallaxHorizontal();
						});
					}
				} else {
					$('.fullwidth-block-background', $item).css({
						backgroundAttachment: 'scroll'
					});
				}
			});

			if(!window.gemSettings.isTouch) {
				$('.page-title-parallax-background').each(function() {
					var backgroundImageCss = $(this).css('background-image') || '';
					if (backgroundImageCss == 'none' || backgroundImageCss == '') {
						$(this).on('tgpliVisible', function() {
							$(this).parallaxVertical('50%', {
								position: 'top'
							});
						});
						return;
					}

					$(this).parallaxVertical('50%', {
						position: 'top'
					});
				});
			} else {
				$('.page-title-parallax-background').css({
					backgroundAttachment: 'scroll'
				});
			}

		}

		$(window).resize(function() {
			update_fullwidths(false, false);
		});

		jQuery('select.gem-combobox, .gem-combobox select, .widget_archive select').each(function(index) {
			$(this).combobox();
		});

		jQuery('.widget_categories select').each(function() {
			this.onchange = null;
			$(this).on('change', function() {
				if($(this).val() != -1) {
					$(this).closest('form').submit();
				}
			});
		});

		jQuery('input.gem-checkbox, .gem-checkbox input').checkbox();
		if (typeof($.fn.ReStable) == "function") {
			jQuery('.gem-table-responsive').each(function(index) {
				$('> table', this).ReStable({
					maxWidth: 768,
					rowHeaders : $(this).hasClass('row-headers')
				});
			});
		}

		jQuery('.fancybox').each(function() {
			$(this).fancybox();
		});

		if (typeof jQuery.fn.scSticky === 'function') {
			jQuery('.panel-sidebar-sticky > .sidebar').scSticky();
		}

		jQuery('iframe + .map-locker').each(function() {
			var $locker = $(this);
			$locker.click(function(e) {
				e.preventDefault();
				if($locker.hasClass('disabled')) {
					$locker.prev('iframe').css({ 'pointer-events' : 'none' });
				} else {
					$locker.prev('iframe').css({ 'pointer-events' : 'auto' });
				}
				$locker.toggleClass('disabled');
			});
		});

		$('.primary-navigation a.mega-no-link').closest('li').removeClass('menu-item-active current-menu-item');

		function getElementPagePosition(element) {
			var width = element.offsetWidth,
				height = element.offsetHeight,
				left = 0,
				top = 0;

			while (element && element.id != 'page') {
				left += element.offsetLeft;
				top += element.offsetTop;
				element = element.offsetParent;
			}

			return {"left": left, "top": top, "width": width, "height": height};
		}

		var $anhorsElements = [];
		$('.quickfinder-item a, .primary-navigation a, .gem-button, .footer-navigation a, .scroll-top-button, .scroll-to-anchor, .scroll-to-anchor a, .top-area-menu a').each(function(e) {
			var $anhor = $(this);
			var link = $anhor.attr('href');
			if(!link) return ;
			link = link.split('#');
			if($('#'+link[1]).hasClass('vc_tta-panel')) return ;
			if($('#'+link[1]).length) {
				$anhor.closest('li').removeClass('menu-item-active current-menu-item');
				$anhor.closest('li').parents('li').removeClass('menu-item-current');
				$(document).on('update-page-scroller', function(e, elem) {
					var $elem = $(elem);
					if(!$anhor.closest('li.menu-item').length) return ;
					if($elem.is($('#'+link[1])) || $elem.find($('#'+link[1])).length) {
						$anhor.closest('li').addClass('menu-item-active');
						$anhor.closest('li').parents('li').addClass('menu-item-current');
					} else {
						$anhor.closest('li').removeClass('menu-item-active');
						$anhor.closest('li').parents('li.menu-item-current').each(function() {
							if(!$('.menu-item-active', this).length) {
								$(this).removeClass('menu-item-current');
							}
						});
					}
				});
				$anhor.click(function(e) {
					e.preventDefault();
					history.replaceState('data to be passed', $anhor.text(), $anhor.attr('href'));
					var correction = 0;
					var isPerspectiveMenu = $('#thegem-perspective.modalview').length;

					if($('#site-header.animated-header').length) {
						var shrink = $('#site-header').hasClass('shrink');
						$('#site-header').addClass('scroll-counting');
						$('#site-header').addClass('fixed shrink');
						correction = $('#site-header').outerHeight();
						if (!isPerspectiveMenu) {
							var siteHeaderTop = $('#site-header').position().top;
							if ($('#site-header').hasClass('shrink')) {
								siteHeaderTop = 0;
							}
							correction += siteHeaderTop;
						}

						if(!shrink) {
							$('#site-header').removeClass('fixed shrink');
						}
						setTimeout(function() {
							$('#site-header').removeClass('scroll-counting');
						}, 50);
					}
					var target_top = getElementPagePosition( $('#'+link[1])[0] ).top - correction + 1;
					if(getElementPagePosition( $('#'+link[1])[0] ).top == 0) { target_top = 0; }
					if($('body').hasClass('page-scroller') && $('.page-scroller-nav-pane').is(':visible')) {
						var $block = $('#'+link[1]+'.scroller-block').add($('#'+link[1]).closest('.scroller-block')).eq(0);
						if($block.length) {
							$('.page-scroller-nav-pane .page-scroller-nav-item').eq($('.scroller-block').index($block)).trigger('click');
						}
						if($anhor.closest('.overlay-menu-wrapper').length && $anhor.closest('.overlay-menu-wrapper').hasClass('active')) {
							if($anhor.closest('#primary-navigation').length && $anhor.closest('#primary-navigation').hasClass('responsive')) {
								$('.menu-toggle').trigger('click');
							} else {
								$('.overlay-toggle').trigger('click');
							}
						}
					} else {
						if (isPerspectiveMenu) {
							$('#page').stop(true, true).animate({scrollTop:target_top}, 1500, 'easeInOutQuint', function() {
								if($anhor.closest('#thegem-perspective').length && $anhor.closest('#thegem-perspective').hasClass('modalview')) {
									$('.perspective-menu-close').trigger('click');
								}
							});
						} else {
							$('html, body').stop(true, true).animate({scrollTop:target_top}, 1500, 'easeInOutQuint');
						}
						if($anhor.closest('#primary-menu').length && $anhor.closest('#primary-menu').hasClass('dl-menuopen')) {
							$('.menu-toggle').trigger('click');
						}
						if($anhor.closest('.mobile-menu-slide-wrapper').length && $anhor.closest('.mobile-menu-slide-wrapper').hasClass('opened')) {
							$('.mobile-menu-slide-close').trigger('click');
						}
						if($anhor.closest('.overlay-menu-wrapper').length && $anhor.closest('.overlay-menu-wrapper').hasClass('active')) {
							if($anhor.closest('#primary-navigation').length && $anhor.closest('#primary-navigation').hasClass('responsive')) {
								$('.menu-toggle').trigger('click');
							} else {
								$('.overlay-toggle').trigger('click');
							}
						}
						if($anhor.closest('#primary-navigation').length && $anhor.closest('#primary-navigation').hasClass('hamburger-active')) {
							$('.hamburger-toggle').trigger('click');
						}
					}
				});
				$anhorsElements.push($anhor[0]);
			}
		});

		if ($anhorsElements.length) {
			function anchorLinksScroll() {
				var isPerspectiveMenu = $('#thegem-perspective.modalview').length;
				var correction = 0;

				if (!$page.hasClass('vertical-header')) {
					correction = $('#site-header').outerHeight();
					if (!isPerspectiveMenu) {
						var siteHeaderTop = $('#site-header').length ? $('#site-header').position().top : 0;
						if ($('#site-header').hasClass('shrink')) {
							siteHeaderTop = 0;
						}
						correction += siteHeaderTop;
					}
				}

				for (var i = 0; i < $anhorsElements.length; i++) {
					var $anhor = $($anhorsElements[i]);
					var link = $anhor.attr('href');
					if(!link) continue ;
					link = link.split('#');
					var scrollY = getScrollY() + $page.scrollTop();

					if(!$anhor.closest('li.menu-item').length) continue ;
					var target_top = getElementPagePosition( $('#'+link[1])[0] ).top - correction;
					if(scrollY >= target_top && scrollY <= target_top + $('#'+link[1]).outerHeight()) {
						$anhor.closest('li').addClass('menu-item-active');
						$anhor.closest('li').parents('li').addClass('menu-item-current');
					} else {
						$anhor.closest('li').removeClass('menu-item-active');
						$anhor.closest('li').parents('li.menu-item-current').each(function() {
							if(!$('.menu-item-active', this).length) {
								$(this).removeClass('menu-item-current');
							}
						});
					}
				}
			}

			$(window).scroll(anchorLinksScroll);
			if ($('#thegem-perspective').length) {
				$page.scroll(anchorLinksScroll);
			}

			$(window).load(function() {
				for (var i = 0; i < $anhorsElements.length; i++) {
					var anhor = $anhorsElements[i];
					if (anhor.href != undefined && anhor.href && window.location.href == anhor.href) {
						anhor.click();
						break;
					}
				}
			});
		}

		$('body').on('click', '.post-footer-sharing .gem-button', function(e) {
			e.preventDefault();
			$(this).closest('.post-footer-sharing').find('.sharing-popup').toggleClass('active');
		});

		var scrollTimer,
			body = document.body;

		$(window).scroll(function() {
			clearTimeout(scrollTimer);
			if(!body.classList.contains('disable-hover')) {
				//body.classList.add('disable-hover')
			}

			scrollTimer = setTimeout(function(){
				//body.classList.remove('disable-hover')
			}, 300);

			if(getScrollY() > 0) {
				$('.scroll-top-button').addClass('visible');
			} else {
				$('.scroll-top-button').removeClass('visible');
			}
		}).scroll();

		function getScrollY(elem){
			return window.pageYOffset || document.documentElement.scrollTop;
		}

		$('a.hidden-email').each(function() {
			$(this).attr('href', 'mailto:'+$(this).data('name')+'@'+$(this).data('domain'));
		});

		var initFooterWidgetArea = function() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initFooterWidgetArea.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var self = this;
			$(self).thegemPreloader(function() {
				$(self).isotope({
					itemSelector: '.widget',
					layoutMode: 'masonry'
				});
			});
		};

		$('#colophon .footer-widget-area').each(initFooterWidgetArea);

		$('body').updateTabs();
	});

	$(document).on('show.vc.accordion', '[data-vc-accordion]', function() {
		var $target = $(this).data('vc.accordion').getContainer();
		var correction = 0;
		if(!$target.find('.vc_tta-tabs').length || !$(this).is(':visible') || $target.data('vc-tta-autoplay')) return ;
		if($('#site-header.animated-header').length && $('#site-header').hasClass('fixed')) {
			var shrink = $('#site-header').hasClass('shrink');
			$('#site-header').addClass('scroll-counting');
			$('#site-header').addClass('fixed shrink');
			correction = $('#site-header').outerHeight() + $('#site-header').position().top;
			if(!shrink) {
				$('#site-header').removeClass('fixed shrink');
			}
			$('#site-header').removeClass('scroll-counting');
		}
		var target_top = $target.offset().top - correction - 100 + 1;
		$('html, body').stop(true, true).animate({scrollTop:target_top}, 500, 'easeInOutQuint');
	});

	var vc_update_fullwidth_init = true;
	$(document).on('vc-full-width-row', function(e) {
		if (window.gemOptions.clientWidth - $page.width() > 25 || window.gemSettings.isRTL) {
			for (var i = 1; i < arguments.length; i++) {
				var $el = $(arguments[i]);
				$el.addClass("vc_hidden");
				var $el_full = $el.next(".vc_row-full-width");
				$el_full.length || ($el_full = $el.parent().next(".vc_row-full-width"));
				var el_margin_left = parseInt($el.css("margin-left"), 10),
					el_margin_right = parseInt($el.css("margin-right"), 10),
					offset = 0 - $el_full.offset().left - el_margin_left + $('#page').offset().left + parseInt($('#page').css('padding-left')),
					width = $('#page').width();

				var offsetKey = window.gemSettings.isRTL ? 'right' : 'left';
				var cssData = {
					position: "relative",
					left: offset,
					"box-sizing": "border-box",
					width: $("#page").width()
				};
				cssData[offsetKey] = offset;

				if ($el.css(cssData), !$el.data("vcStretchContent")) {
					var padding = -1 * offset;
					0 > padding && (padding = 0);
					var paddingRight = width - padding - $el_full.width() + el_margin_left + el_margin_right;
					0 > paddingRight && (paddingRight = 0), $el.css({
						"padding-left": padding + "px",
						"padding-right": paddingRight + "px"
					})
				}
				$el.attr("data-vc-full-width-init", "true"), $el.removeClass("vc_hidden");
				$el.trigger('VCRowFullwidthUpdate');
			}
		}
		update_fullwidths(true, vc_update_fullwidth_init);
		vc_update_fullwidth_init = false;
	});

	$('body').on('click', '.gem-button[href^="#give-form-"]', function(e) {
		var form_id = $(this).attr('href').replace('#give-form-', '');
		form_id = parseInt(form_id);
		if (!isNaN(form_id)) {
			$('#give-form-' + form_id + ' .give-btn-modal').click();
		}
		e.preventDefault();
		return false;
	});

})(jQuery);

(function($) {
		$('.menu-item-search a').on('click', function(e){
			e.preventDefault();
			$('.menu-item-search').toggleClass('active');
		});
})(jQuery);


(function($) {
    $('.menu-item-search a').click(function(){
        $('#searchform-input').focus();
    });
})(jQuery);



