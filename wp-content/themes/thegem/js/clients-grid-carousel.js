(function($) {
	$(function() {

		$('.gem-clients-type-carousel-grid:not(.carousel-disabled)').each(function() {

			var $clientsCarouselElement = $(this);

			var $clientsItems = $('.gem-clients-slide', $clientsCarouselElement);

			var $clientsItemsWrap = $('<div class="gem-clients-grid-carousel-wrap"/>')
				.appendTo($clientsCarouselElement);
			var $clientsItemsCarousel = $('<div class="gem-clients-grid-carousel"/>')
				.appendTo($clientsItemsWrap);
			var $clientsItemsPagination = $('<div class="gem-clients-grid-pagination gem-mini-pagination"/>')
				.appendTo($clientsItemsWrap);
			$clientsItems.appendTo($clientsItemsCarousel);

		});


		$('.gem_client_carousel-items').each(function () {

			var $clientsElement = $(this);

			var $clients = $('.gem-client-item', $clientsElement);

			var $clientsWrap = $('<div class="gem-client-carousel-item-wrap"/>')
				.appendTo($clientsElement);
			var $clientsCarousel = $('<div class="gem-client-carousel"/>')
				.appendTo($clientsWrap);
			var $clientsNavigation = $('<div class="gem-client-carousel-navigation"/>')
				.appendTo($clientsWrap);
			var $clientsPrev = $('<a href="#" class="gem-prev gem-client-prev"/></a>')
				.appendTo($clientsNavigation);
			var $clientsNext = $('<a href="#" class="gem-next gem-client-next"/></a>')
				.appendTo($clientsNavigation);
			$clients.appendTo($clientsCarousel);

		});

		$('body').updateClientsGrid();
		$('body').updateClientsCarousel();
		$('.fullwidth-block').each(function() {
			$(this).on('updateClientsCarousel', function() {
				$(this).updateClientsCarousel();
			});
		});
		$('.gem_tab').on('tab-update', function() {
			$(this).updateClientsGrid();
		});
		$(document).on('gem.show.vc.tabs', '[data-vc-accordion]', function() {
			$(this).data('vc.accordion').getTarget().updateClientsGrid();
		});
		$(document).on('gem.show.vc.accordion', '[data-vc-accordion]', function() {
			$(this).data('vc.accordion').getTarget().updateClientsGrid();
		});

	});

	$.fn.updateClientsGrid = function() {
		function initClientsGrid() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initClientsGrid.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $clientsCarouselElement = $(this);

			var $clientsItemsCarousel = $('.gem-clients-grid-carousel', $clientsCarouselElement);
			var $clientsItemsPagination = $('.gem-mini-pagination', $clientsCarouselElement);

			var autoscroll = $clientsCarouselElement.data('autoscroll') > 0 ? $clientsCarouselElement.data('autoscroll') : false;

			$clientsCarouselElement.thegemPreloader(function() {

				var $clientsGridCarousel = $clientsItemsCarousel.carouFredSel({
					auto: autoscroll,
					circular: false,
					infinite: true,
					width: '100%',
					items: 1,
					responsive: true,
					height: 'auto',
					align: 'center',
					pagination: $clientsItemsPagination,
					scroll: {
						pauseOnHover: true
					}
				});

			});
		}

		$('.gem-clients-type-carousel-grid:not(.carousel-disabled)', this).each(initClientsGrid);
	}

	$.fn.updateClientsCarousel = function() {
		function initClientsCarousel() {
			if (window.tgpLazyItems !== undefined) {
				var isShowed = window.tgpLazyItems.checkGroupShowed(this, function(node) {
					initClientsCarousel.call(node);
				});
				if (!isShowed) {
					return;
				}
			}

			var $clientsElement = $(this);

			var $clientsCarousel = $('.gem-client-carousel', $clientsElement);
			var $clientsPrev = $('.gem-client-prev', $clientsElement);
			var $clientsNext = $('.gem-client-next', $clientsElement);

			var autoscroll = $clientsElement.data('autoscroll') > 0 ? $clientsElement.data('autoscroll') : false;

			$clientsElement.thegemPreloader(function() {

				var $clientsView = $clientsCarousel.carouFredSel({
					auto: autoscroll,
					circular: true,
					infinite: false,
					scroll: {
						items: 1
					},
					width: '100%',
					responsive: false,
					height: 'auto',
					align: 'center',
					prev: $clientsPrev,
					next: $clientsNext
				});

			});
		}

		$('.gem_client_carousel-items:not(.carousel-disabled)', this).each(initClientsCarousel);
	}

})(jQuery);
