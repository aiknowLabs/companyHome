(function($) {
	$(function(){

		$('.gem-team').each(function() {
			var $team = $(this);
			var hoverColors= $.extend({}, $team.data('hoverColors'));

			$('.team-person', $team).each(function() {
				var $teamPerson = $(this);

				if($('a.team-person-link',$teamPerson).length || $team.hasClass('gem-team-style-5')) {
					$teamPerson.data('defaultColors', {
						background_color: $teamPerson.css('backgroundColor'),
						border_color: $teamPerson.css('borderTopColor'),
						bottom_border_color: $teamPerson.css('borderBottomColor'),
						image_border_color: $('.team-person-image .image-hover', $teamPerson).css('borderTopColor'),
						name_color: $('.team-person-name', $teamPerson).css('color'),
						position_color: $('.team-person-position', $teamPerson).css('color'),
						desc_color: $('.team-person-description', $teamPerson).css('color'),
						tel_color: $('.team-person-phone a', $teamPerson).css('color'),
					});
					$teamPerson.on('mouseenter', function() {
						if(hoverColors.background_color) {
							if($team.hasClass('gem-team-style-5')) {
								$('.team-person-hover', $teamPerson).css('backgroundColor', hoverColors.background_color);
							} else {
								$teamPerson.css('backgroundColor', hoverColors.background_color);
								if($team.hasClass('gem-team-style-1') || $team.hasClass('gem-team-style-6')) {
									$teamPerson.css('borderColor', hoverColors.background_color);
								}
							}
						} else {
							if($team.hasClass('gem-team-style-1') || $team.hasClass('gem-team-style-6')) {
								$teamPerson.css('backgroundColor', 'transparent');
							}
							if($team.hasClass('gem-team-style-2') || $team.hasClass('gem-team-style-3') || $team.hasClass('gem-team-style-4')) {
								if(hoverColors.border_color) {
									$teamPerson.css('backgroundColor', hoverColors.border_color);
								} else {
									$teamPerson.css('backgroundColor', $teamPerson.data('defaultColors').border_color);
								}
							}
						}
						if(hoverColors.border_color) {
							$teamPerson.css('borderColor', hoverColors.border_color);
						}
						if(hoverColors.bottom_border_color) {
							$teamPerson.css('borderBottomColor', hoverColors.bottom_border_color);
						}
						if(hoverColors.image_border_color) {
							$('.team-person-image .image-hover', $teamPerson).css('backgroundColor', hoverColors.image_border_color);
							$('.team-person-image .image-hover', $teamPerson).css('borderColor', hoverColors.image_border_color);
						}
						if(hoverColors.name_color) {
							$('.team-person-name', $teamPerson).css('color', hoverColors.name_color);
						}
						if(hoverColors.position_color) {
							$('.team-person-position', $teamPerson).css('color', hoverColors.position_color);
						}
						if(hoverColors.desc_color) {
							$('.team-person-description', $teamPerson).css('color', hoverColors.desc_color);
						}
						if(hoverColors.tel_color) {
							$('.team-person-phone a', $teamPerson).css('color', hoverColors.tel_color);
						}
					});

					$teamPerson.on('mouseleave', function() {
						var defaultColors = $teamPerson.data('defaultColors');
						$teamPerson.css('backgroundColor', defaultColors.background_color);
						$teamPerson.css('borderColor', defaultColors.border_color);
						$teamPerson.css('borderBottomColor', defaultColors.bottom_border_color);
						$('.team-person-image .image-hover', $teamPerson).css('backgroundColor', 'transparent');
						$('.team-person-image .image-hover', $teamPerson).css('borderColor', defaultColors.image_border_color);
						$('.team-person-name', $teamPerson).css('color', defaultColors.name_color);
						$('.team-person-position', $teamPerson).css('color', defaultColors.position_color);
						$('.team-person-description', $teamPerson).css('color', defaultColors.desc_color);
						$('.team-person-phone a', $teamPerson).css('color', defaultColors.tel_color);
						if($team.hasClass('gem-team-style-5') && hoverColors.background_color) {
							$('.team-person-hover', $teamPerson).css('backgroundColor', 'transparent');
						}
					});

				}
			});

		});

	});
})(jQuery);