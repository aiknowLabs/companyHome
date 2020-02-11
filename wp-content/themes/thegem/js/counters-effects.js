(function($) {
	$(function() {

		$('.gem-counter').each(function() {
			var $item = $(this);
			var initHover = {
				icon_color1: $('.gem-icon-half-1', $item).css('color'),
				icon_color2: $('.gem-icon-half-2', $item).css('color'),
				icon_background: $('.gem-icon-inner', $item).css('background-color'),
				icon_border: $('.gem-icon', $item).css('border-left-color'),
				icon_box_border: $('.gem-counter-icon-circle-1', $item).css('border-left-color'),
				icon_box_shadow: $('.gem-icon', $item).css('box-shadow'),
				box_color: $('.gem-counter-inner', $item).css('background-color'),
				number_color: $('.gem-counter-number', $item).css('color'),
				text_color: $('.gem-counter-text', $item).css('color'),
			};
			$item.data('initHover', initHover);
			if($item.hasClass('gem-counter-effect-background-reverse') || $item.hasClass('gem-counter-effect-border-reverse')) {
				$('.gem-icon-inner', $item).prepend('<div class="gem-counter-animation"/>');
				if($item.hasClass('gem-counter-effect-border-reverse')) {
					$('.gem-counter-animation', $item).css('background-color', initHover.box_color);
				} else if($item.data('hover-background-color')) {
					$('.gem-counter-animation', $item).css('background-color', $item.data('hover-background-color'));
				}
			}
		});

		$('body').on('mouseenter', '.gem-counter a', function() {
			var $item = $(this).closest('.gem-counter');
			var initHover = $item.data('initHover');
			var $box = $item.closest('.gem-counter-box');
			$item.addClass('hover');
			if($item.data('hover-icon-color')) {
				if($box.hasClass('gem-counter-style-2')) {
					$('.gem-icon-half-1', $item).css('color', initHover.icon_box_border);
					$('.gem-icon-half-2', $item).css('color', initHover.icon_box_border);
					$('.gem-counter-icon-circle-1', $item).css('border-color', $item.data('hover-icon-color'));
					$('.gem-counter-icon-circle-1', $item).css('background-color', $item.data('hover-icon-color'));
					$('.gem-counter-icon-circle-2', $item).css('border-color', 'transparent');
				} else {
					if($item.hasClass('gem-counter-effect-background-reverse')) {
						$('.gem-icon', $item).css('border-color', $item.data('hover-icon-color'));
						$('.gem-icon-half-1', $item).css('color', $item.data('hover-icon-color'));
						$('.gem-icon-half-2', $item).css('color', $item.data('hover-icon-color'));
					}
					if($item.hasClass('gem-counter-effect-border-reverse')) {
						$('.gem-icon', $item).css('border-color', $item.data('hover-icon-color'));
						$('.gem-icon-inner', $item).css('background-color', $item.data('hover-icon-color'));
						$('.gem-icon-half-1', $item).css('color', '#ffffff');
						$('.gem-icon-half-2', $item).css('color', '#ffffff');
					}
					if($item.hasClass('gem-counter-effect-simple')) {
						$('.gem-icon-half-1', $item).css('color', $item.data('hover-icon-color'));
						$('.gem-icon-half-2', $item).css('color', $item.data('hover-icon-color'));
					}
				}
			}
			if($item.data('hover-numbers-color')) {
				$('.gem-counter-number', $item).css('color', $item.data('hover-numbers-color'));
			}
			if($item.data('hover-text-color')) {
				$('.gem-counter-text', $item).css('color', $item.data('hover-text-color'));
			}
			if($item.data('hover-background-color')) {
				$('.gem-counter-inner', $item).css('background-color', $item.data('hover-background-color'));
				$('.gem-counter-bottom-left, .gem-counter-bottom-right', $item).css('background-color', $item.data('hover-background-color'));
				$('.gem-counter-bottom svg', $item).css('fill', $item.data('hover-background-color'));
				if(!$box.hasClass('gem-counter-style-vertical')) {
					$('.gem-icon', $item).css('box-shadow', '0 0 0 5px '+$item.data('hover-background-color') + ', 0 0 0 6px ' + ($item.data('hover-icon-color') ? $item.data('hover-icon-color') : '#ffffff'));
				}
			}
		});

		$('body').on('mouseleave', '.gem-counter a', function() {
			var $item = $(this).closest('.gem-counter');
			var initHover = $item.data('initHover');
			$item.removeClass('hover');
			$('.gem-icon', $item).css('border-color', initHover.icon_border);
			$('.gem-icon-inner', $item).css('background-color', initHover.icon_background);
			$('.gem-icon-half-1', $item).css('color', initHover.icon_color1);
			$('.gem-icon-half-2', $item).css('color', initHover.icon_color2);
			$('.gem-icon', $item).css('box-shadow', initHover.icon_box_shadow),
			$('.gem-counter-icon-circle-1, .gem-counter-icon-circle-2', $item).css('border-color', initHover.icon_box_border);
			$('.gem-counter-icon-circle-1').css('background-color', 'transparent');
			$('.gem-counter-inner', $item).css('background-color', initHover.box_color);
			$('.gem-counter-bottom-left, .gem-counter-bottom-right', $item).css('background-color', initHover.box_color);
			$('.gem-counter-bottom svg', $item).css('fill', initHover.box_color);
			$('.gem-counter-number', $item).css('color', initHover.number_color);
			$('.gem-counter-text', $item).css('color', initHover.text_color);
		});

	});
})(jQuery);