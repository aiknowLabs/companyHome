/*========Loader js===========*/
$(window).on('load', function () {
	$(".loader").slideUp("slow");
	$("body").addClass("animate");
	$("html").addClass("animate");
});

/* ============= Page ScrollSpy =========*/
$(window).on('load', function () {
	$('body').scrollspy({
		target: '#nav-main',
		offset: 70
	});
});
$(document).ready(function () {
	'use strict';
	$('.page-scroll').bind('click', function (event) {
		var $anchor = $(this);
		if ($(window).width() > 768) {
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 65
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		} else if ($(window).width() < 768) {
			$(".navbar-toggler").click();
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 50
			}, 1500, 'easeInOutExpo');
			event.preventDefault();

		} else {
			$('html, body').stop().animate({
				scrollTop: $($anchor.attr('href')).offset().top - 50
			}, 1500, 'easeInOutExpo');
			event.preventDefault();
		}

	});

});

/* ============= Navbar White =========*/
$(document).ready(function () {
	'use strict';

	$(window).scroll(function () {
		var scroll = $(window).scrollTop();
		if (scroll > '0.1') {
			$('.navbar-light').addClass('nav-white');
		} else if (scroll < '0.1') {
			$('.navbar-light').removeClass('nav-white');
		}
	});
	$(document).ready(function () {
		var scroll = $(window).scrollTop();
		if (scroll > '0.1') {
			$('.navbar-light').addClass('nav-white');
		} else if (scroll < '0.1') {
			$('.navbar-light').removeClass('nav-white');
		}
	});
});


/*=============Progressbar Js=============*/
$(document).ready(function () {
	'use strict';
	$('.ico-status-bar  span').each(function () {
		$(this).animate({
			width: $(this).data('progress')
		}, 1500);
	});
});

/*===============Countdown Js============*/
$(document).ready(function () {
	'use strict';

	function makeTimer() {
		var endTime = new Date("June 15 2019  9:56:00");
		endTime = (Date.parse(endTime) / 1000);

		var now = new Date();
		now = (Date.parse(now) / 1000);

		var timeLeft = endTime - now;

		var days = Math.floor(timeLeft / 86400);
		var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
		var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600)) / 60);
		var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

		if (hours < "10") {
			hours = "0" + hours;
		}
		if (minutes < "10") {
			minutes = "0" + minutes;
		}
		if (seconds < "10") {
			seconds = "0" + seconds;
		}

		$("#days").html(days + "<span class='c-text'>Days</span>");
		$("#hours").html(hours + "<span class='c-text'>Hour</span>");
		$("#minutes").html(minutes + "<span class='c-text'>Min</span>");
		$("#seconds").html(seconds + "<span class='c-text'>Sec</span>");

	}

	setInterval(function () {
		makeTimer();
	}, 1000);
});

/* ============= Roadmap Slider =========*/
$(document).ready(function () {
	'use strict';
	$('.roadmap-slider').slick({
		autoplay: false,
		prevArrow: $(".slick-arrow-left"),
		nextArrow: $(".slick-arrow-right"),
		infinite: true,
		speed: 1000,
		autoplaySpeed: 1000,
		slidesToShow: 4,
		slidesToScroll: 1,
		variableWidth: false,
		centerMode: false,
		responsive: [{
				breakpoint: 1025,
				settings: {
					variableWidth: false,
					centerMode: false,
					slidesToShow: 2,
				}
			},
			{
				breakpoint: 768,
				settings: {
					variableWidth: false,
					centerMode: false,
					slidesToShow: 1,
				}
			},

		]
	});
});
/*==============Chart JS=========*/

$(document).ready(function () {
	'use strict';
	Highcharts.chart('pie-chart-left', {
		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45
			}
		},
		title: {
			text: 'Token Distribution'
		},
		subtitle: {
			text: ''
		},
		plotOptions: {
			pie: {
				innerSize: 120,
				depth: 45,
				allowPointSelect: true,
				cursor: 'pointer',
			},
			series: {
				dataLabels: {
					enabled: true,
					format: '{point.name}: <br>	{point.y:.1f}%'
				}
			}
		},
		colors: ['#f5a623', '#2bc460', '#108ca2', '#7e63df'],
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
					name: 'Fundraiser',
					y: 10.00,

				}, {
					name: 'Long Term Budget',
					y: 30.00,

				}, {
					name: 'Founders,Team & Advisors',
					y: 10.00,

				},
				{
					name: 'Community & Partnership ',
					y: 50.00,

				}
			]
		}],
		tooltip: {
			enabled: false,
		},
		  responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    align: 'center',
                    verticalAlign: 'bottom',
                   
                }
            }
        }]
    }

	});
});
$(document).ready(function () {
	'use strict';
	Highcharts.chart('pie-chart-right', {

		chart: {
			type: 'pie',
			options3d: {
				enabled: true,
				alpha: 45
			}
		},
		title: {
			text: 'Use of Proceeds'
		},
		subtitle: {
			text: ''
		},
		plotOptions: {
			pie: {
				innerSize: 120,
				depth: 45,
				allowPointSelect: true,
				cursor: 'pointer',
			},
			series: {
				dataLabels: {
					enabled: true,
					format: '{point.name}: <br>{point.y:.1f}%'
				}
			}
		},
		colors: ['#f5a623', '#2bc460', '#108ca2', '#7e63df'],
		series: [{
			name: 'Brands',
			colorByPoint: true,
			data: [{
					name: 'Software Development',
					y: 30.00,

				}, {
					name: 'Bancor ETH Reserve',
					y: 10.00,

				}, {
					name: 'Legal Expenses',
					y: 10.00,

				},
				{
					name: 'Marketing  ',
					y: 50.00,

				}
			]
		}],
		tooltip: {
			enabled: false,
		},
	});
});