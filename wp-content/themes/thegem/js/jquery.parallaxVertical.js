(function($){
	var $window = $(window),
		$page = $('#page');

	$.fn.parallaxVertical = function(xpos, options) {
		var windowHeight = $window.height(),
			perspectiveOpened = false;

		options = options || {};

		this.each(function() {
			var $this = $(this),
				speedFactor,
				offsetFactor = 0,
				getHeight,
				topOffset = 0,
				containerHeight = 0,
				containerWidth = 0,
				disableParallax = false,
				parallaxIsDisabled = false,
				baseImgHeight = 0,
				baseImgWidth = 0,
				isBgCover = ($this.css('background-size') == 'cover'),
				isAttachmentFixed = ($this.css('background-attachment') == 'fixed'),
				curImgHeight = 0,
				reversed = $this.hasClass('parallax-reversed'),
				baseSpeedFactor = reversed ? -0.1 : 0.61,
				outerHeight = true;

			if (xpos === undefined) xpos = "50%";

			if (outerHeight){
				getHeight = function(jqo){
					return jqo.outerHeight(true);
				};
			} else {
				getHeight = function(jqo){
					return jqo.height();
				};
			}

			function getBackgroundSize(callback){
				var img = new Image(),
				// here we will place image's width and height
					width, height,
				// here we get the size of the background and split it to array
					backgroundSize = ($this.css('background-size') || ' ').split(' ');

				// checking if width was set to pixel value
				if (/px/.test(backgroundSize[0])) width = parseInt(backgroundSize[0]);
				// checking if width was set to percent value
				if (/%/.test(backgroundSize[0])) width = $this.parent().width() * (parseInt(backgroundSize[0]) / 100);
				// checking if height was set to pixel value
				if (/px/.test(backgroundSize[1])) height = parseInt(backgroundSize[1]);
				// checking if height was set to percent value
				if (/%/.test(backgroundSize[1])) height = $this.parent().height() * (parseInt(backgroundSize[0]) / 100);

				if (width !== undefined && height !== undefined){
					// Image is not needed
					return callback({ width: width, height: height });
				}

				// Image is needed
				img.onload = function () {
					// check if width was set earlier, if not then set it now
					if (typeof width == 'undefined') width = this.width;
					// do the same with height
					if (typeof height == 'undefined') height = this.height;
					// call the callback
					callback({ width: width, height: height });
				};
				// extract image source from css using one, simple regex
				// src should be set AFTER onload handler
				img.src = ($this.css('background-image') || '').replace(/url\(['"]*(.*?)['"]*\)/g, '$1');
			}

			function update(){
				if (disableParallax){
					if ( ! parallaxIsDisabled){
						$this.css('backgroundPosition', '');
						if(!$this.is('.page-title-block')) {
							$this.removeClass('fullwidth-block-parallax-vertical');
						}
						parallaxIsDisabled = true;
					}
					return;
				}else{
					if (parallaxIsDisabled){
						if(!$this.is('.page-title-block')) {
							$this.addClass('fullwidth-block-parallax-vertical');
						}
						parallaxIsDisabled = false;
					}
				}
				if (isNaN(speedFactor))
					return;

				var pos = getScrollTop();

				// Check if totally above or totally below viewport
				if ((topOffset + containerHeight < pos) || (pos < topOffset - windowHeight)) return;

				var ypos = offsetFactor + speedFactor * (topOffset - pos);

				if (!isAttachmentFixed) {
					if (ypos > 0) {
						ypos = 0;
					} else if (curImgHeight + ypos < containerHeight) {
						ypos = containerHeight - curImgHeight;
					}
				}

				$this.css('backgroundPosition', xpos + " " + ypos + "px");
			}

			function getScrollTop() {
				return perspectiveOpened ? $page.scrollTop() : $window.scrollTop();
			}

			function resize(){
				setTimeout(function(){
					if (perspectiveOpened) {
						windowHeight = $page.height();
					} else {
						windowHeight = $window.height();
					}

					containerHeight = getHeight($this);
					containerWidth = $this.width();

					if (isBgCover){
						if (baseImgWidth / baseImgHeight <= containerWidth / containerHeight){
							// Resizing by width
							curImgHeight = baseImgHeight * ($this.width() / baseImgWidth);
							disableParallax = false;
						}
						else {
							disableParallax = true;
						}
					}

					topOffset = $this.offset().top;

					// Improving speed factor to prevent showing image limits
					if (curImgHeight !== 0) {
						if (baseSpeedFactor >= 0) {
							if (isAttachmentFixed) {
								speedFactor = Math.min(baseSpeedFactor, curImgHeight / windowHeight);
								offsetFactor = Math.min(0, .5 * (windowHeight - curImgHeight - speedFactor * (windowHeight - containerHeight)));
							} else {
								if (options.position !== undefined && options.position == 'top') {
									speedFactor = Math.min(0.25, (curImgHeight - containerHeight) / (containerHeight + topOffset));
									offsetFactor = -speedFactor * topOffset;
								} else {
									speedFactor = -Math.min(baseSpeedFactor, (curImgHeight - containerHeight) / (windowHeight + containerHeight));
									offsetFactor = containerHeight * speedFactor;
								}
							}
						} else {
							speedFactor = Math.min(baseSpeedFactor, (windowHeight - containerHeight) / (windowHeight + containerHeight));
							offsetFactor = Math.max(0, speedFactor * containerHeight);
						}
					} else {
						speedFactor = baseSpeedFactor;
						offsetFactor = 0;
					}

					update();
				}, 10);
			}

			getBackgroundSize(function(sz){
				curImgHeight = baseImgHeight = sz.height;
				baseImgWidth = sz.width;
				resize();
			});

			$window.bind({scroll: update, load: resize, resize: resize});

			var tgpliVisibleTimeout = false;
			$window.on('tgpliVisible', function(e) {
				if (tgpliVisibleTimeout) {
					clearTimeout(tgpliVisibleTimeout);
				}

				tgpliVisibleTimeout = setTimeout(function() {
					resize();
				}, 200);
			});
			//$page.bind({scroll: update, resize: resize});
			resize();
		});

		$(window).on('perspective-modalview-opened', function() {
			perspectiveOpened = true;
			windowHeight = $page.height();
		});
		$(window).on('perspective-modalview-closed', function() {
			perspectiveOpened = false;
			windowHeight = $window.height();
		});
	};
})(jQuery);
