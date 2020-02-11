(function($) {
	var prefixes = 'Webkit Moz ms Ms O'.split(' ');
    var docElemStyle = document.documentElement.style;

    function getStyleProperty( propName ) {
        if ( !propName ) {
            return;
        }

        // test standard property first
        if ( typeof docElemStyle[ propName ] === 'string' ) {
            return propName;
        }

        // capitalize
        propName = propName.charAt(0).toUpperCase() + propName.slice(1);

        // test vendor specific properties
        var prefixed;
        for ( var i=0, len = prefixes.length; i < len; i++ ) {
            prefixed = prefixes[i] + propName;
            if ( typeof docElemStyle[ prefixed ] === 'string' ) {
                return prefixed;
            }
        }
    }

    var transitionProperty = getStyleProperty('transition');
    var transitionEndEvent = {
        WebkitTransition: 'webkitTransitionEnd',
        MozTransition: 'transitionend',
        OTransition: 'otransitionend',
        transition: 'transitionend'
    }[ transitionProperty ];

	function LineDiagram(element) {
		this.el = element;
		this.$el = jQuery(element);
		this.start();
	}

	LineDiagram.prototype = {
		start: function() {
			if (!this.$el.hasClass('digram-line-box')) return;
			this.initTimer();
			var diagram_lines_queue = [];
			jQuery('.skill-element', this.$el).each(function () {
				diagram_lines_queue.push(jQuery(this));
			});
			this.showLine(diagram_lines_queue, true);
		},

		showLine: function(queue, first) {
			var self = this,
				$skill = queue.shift();

			if ($skill == null || $skill == undefined) {
				return;
			}

			function thegem_show_digram_line_animation() {
				var $progress = $('.skill-line div', $skill),
					$skillAmount = $('.skill-amount', $skill),
					amount = parseFloat($progress.data('amount'));

				$progress.addClass('animation').css('width', amount + '%');
				jQuery({countNum: 0}).animate({countNum: amount}, {
					duration: 1600,
					easing:'easeOutQuart',
					step: function() {
						var count = parseFloat(this.countNum);
						var pct = Math.ceil(count) + '%';
						$skillAmount.html(pct);
					}
				});
				self.showLine(queue, false);
			}

			if (first) {
				thegem_show_digram_line_animation();
			} else {
				this.startTimer(thegem_show_digram_line_animation);
			}
		},

		initTimer: function() {
			var self = this;

			this.timer = this.$el.data('timer');
			this.timerCallback = function() {};
			$(this.timer).bind(transitionEndEvent, function(event) {
				self.timerCallback();
			});
		},

		startTimer: function(callback) {
			var self = this;
			this.timerCallback = callback;
			if (this.timer.className.indexOf('start-timer') != -1) {
				this.timer.className = this.timer.className.replace(' start-timer', '');
			} else {
				this.timer.className += ' start-timer';
			}
		}
	};

	jQuery.fn.thegem_start_line_digram = function() {
		return new LineDiagram(this.get(0));
	}
})(jQuery);

function thegem_show_diagram_line_mobile($box) {
	jQuery('.skill-element', $box).each(function () {
		jQuery('.skill-line div', this).width(jQuery('.skill-line div', this).data('amount') + '%');
	});
}

function thegem_start_line_digram(element) {
	jQuery(element).thegem_start_line_digram();
}

jQuery('.digram-line-box').each(function () {
	var self = this;

	var timer = document.createElement('div');
	timer.className = 'diagram-line-timer-element';
	document.body.appendChild(timer);
	timer.className += ' start-timer';
	jQuery(this).data('timer', timer);

	//jQuery('.skill-element .skill-amount', this).html('0%');

	jQuery(document).ready(function() {
		if (!jQuery(self).hasClass('lazy-loading-item') || window.gemSettings.lasyDisabled)
			jQuery(self).thegem_start_line_digram();
	});
});
