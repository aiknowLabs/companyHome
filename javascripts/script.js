
                
					setREVStartSize({c: 'rev_slider_4_1',rl:[1240,1024,778,480],el:[920,768,960,720],gw:[1920,1024,778,480],gh:[920,768,960,720],layout:'fullscreen',offsetContainer:'',offset:'',mh:"0"});
					var	revapi4,
						tpj;
					jQuery(function() {
						tpj = jQuery;
						if(tpj("#rev_slider_4_1").revolution == undefined){
							revslider_showDoubleJqueryError("#rev_slider_4_1");
						}else{
							revapi4 = tpj("#rev_slider_4_1").show().revolution({
								jsFileLocation:"./wp-content/plugins/revslider/public/assets/js/",
								sliderLayout:"fullscreen",
								visibilityLevels:"1240,1024,778,480",
								gridwidth:"1920,1024,778,480",
								gridheight:"920,768,960,720",
								minHeight:"",
								editorheight:"920,768,960,720",
								responsiveLevels:"1240,1024,778,480",
								navigation: {
									mouseScrollNavigation:false,
									onHoverStop:false,
									touch: {
										touchenabled:true
									}
								},
								parallax: {
									levels:[-10,-7,-5,-3,-2,-1,0,1,2,3,5,7,10,15,40,3],
									type:"mouse",
									origo:"slidercenter",
									disable_onmobile:true
								},
								fallbacks: {
									panZoomDisableOnMobile:true,
									allowHTML5AutoPlayOnAndroid:true
								},
							});
							(function() {

		if (window.creativeDarkShowAnimation == undefined) {
			function checkSupportWebGL() {
	        	try {
	        		var canvas = document.createElement( 'canvas' );
	        		return !! ( window.WebGLRenderingContext && ( canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) ) );
	        	} catch ( e ) {
	        		return false;
	        	}
	        }

	        window.creativeDarkShowAnimation = checkSupportWebGL() && window.gemBrowser.name == 'chrome' && window.gemOptions.clientWidth >= 768;
			
			if (!window.creativeDarkShowAnimation) {
	        	window.creativeDarkAnimationFallback = new Image();
	        	window.creativeDarkAnimationFallback.src = window.gemSettings.rootUrl + '/wp-content/uploads/revslider/Splash-Creative-Dark-Slider-Full.jpg';
	        } else {
	        	var head = document.getElementsByTagName('head')[0];
	        	var threejs = document.createElement('script');
		        threejs.type = 'text/javascript';
		        threejs.async = true;
		        threejs.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r70/three.min.js';
		        head.appendChild(threejs);
	        }
		}

        if (!window.creativeDarkShowAnimation) {
            var slide = document.querySelector('rs-module > rs-slides > rs-slide');
            if (slide) {
                var image = slide.querySelector('rs-sbg');
                image.src = window.creativeDarkAnimationFallback.src;
            }
            return false;
        }

		var animationWrapper = document.getElementById('world').parentNode;
                                                                                  
        var lastTime = 0;
        var vendors = ['ms', 'moz', 'webkit', 'o'];
        for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
            window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
            window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] || window[vendors[x]+'CancelRequestAnimationFrame'];
        }

        if (!window.requestAnimationFrame)
            window.requestAnimationFrame = function(callback, element) {
                var currTime = new Date().getTime();
                var timeToCall = Math.max(0, 16 - (currTime - lastTime));
                var id = window.setTimeout(function() { callback(currTime + timeToCall); },
                    timeToCall);
                    lastTime = currTime + timeToCall;
                return id;
            };

            if (!window.cancelAnimationFrame)
                window.cancelAnimationFrame = function(id) {
                    clearTimeout(id);
                };

        function getMat(color) {
            return new THREE.MeshPhongMaterial({
                color: color,
                shininess: 0,
                specular: 0x000000,
                emissive: 0x270000,
                shading: THREE.FlatShading
            });
        }

        // colors
        var Colors = {
            green: 0x8fc999,
            blue: 0x5fc4d0,
            orange: 0xee5624,
            yellow: 0xfaff70
        }

        var colorsLength = Object.keys(Colors).length;

        function getRandomColor() {
            var colIndx = Math.floor(Math.random() * colorsLength);
            var colorStr = Object.keys(Colors)[colIndx];
            return Colors[colorStr];
        }

        var parameters = {
            minRadius: 30,
            maxRadius: 50,
            minSpeed: .012,
            maxSpeed: .020,
            particles: 300,
            minSize: .1,
            maxSize: 1
        };

        var scene, renderer, camera, diamond, light, world;

        var WIDTH,
            HEIGHT;

        function initWorld() {
            world = document.getElementById('world');

            WIDTH = world.parentNode.offsetWidth;
            HEIGHT = world.parentNode.offsetHeight;

            scene = new THREE.Scene();

            camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, .1, 2000);
            camera.position.z = 100;

            renderer = new THREE.WebGLRenderer({
                alpha: true,
                antialias: true
            });
            renderer.setSize(WIDTH, HEIGHT);
            renderer.shadowMapEnabled = true;

            world.appendChild(renderer.domElement);

            ambientLight = new THREE.AmbientLight(0x663344);
            scene.add(ambientLight);

            light = new THREE.DirectionalLight(0xffffff, 1.5);
            light.position.set(200, 100, 200);
            light.castShadow = true;
            light.shadowDarkness = .8;
            scene.add(light);

            diamond = new Diamond();
            diamond.mesh.rotation.x = .2;
            diamond.mesh.rotation.z = .2;
            scene.add(diamond.mesh);

            window.addEventListener('resize', handleWindowResize, false);

            loop();
        }

        var Diamond = function() {
            var geometry	= new THREE.Geometry();
            var tmpGeometry	= new THREE.CylinderGeometry(0.5, 0.9, 0.2, 6, 1, false);
            var tmpMatrix	= new THREE.Matrix4().makeTranslation(0, +tmpGeometry.parameters.height / 2, 0);
            geometry.merge(tmpGeometry, tmpMatrix);
            var tmpGeometry	= new THREE.CylinderGeometry(0.9, 0, 1, 6, 1, false);
            var tmpMatrix	= new THREE.Matrix4().makeTranslation(0, -tmpGeometry.parameters.height / 2, 0);
            geometry.merge(tmpGeometry, tmpMatrix);
            var matPlanet = getMat(Colors.orange);
            this.planet	= new THREE.Mesh(geometry, matPlanet);
            this.planet.scale.set(12, 12, 12);
            this.planet.position.y = 3;

            this.ring = new THREE.Mesh();
            this.nParticles = 0;

            // create the particles to populate the ring
            this.updateParticlesCount();

            this.mesh = new THREE.Mesh();
            this.mesh.add(this.planet);
            this.mesh.add(this.ring);

            this.planet.castShadow = true;

            // update the position of the particles => must be moved to the loop
            this.updateParticlesRotation();
        }

        Diamond.prototype.updateParticlesCount = function() {
            if (this.nParticles < parameters.particles) {
                // add particles
                for (var i = this.nParticles; i < parameters.particles; i++) {
                    var p = new Particle();
                    p.mesh.rotation.x = Math.random() * Math.PI;
                    p.mesh.rotation.y = Math.random() * Math.PI;
                    p.mesh.position.y = -2 + Math.random() * 4;
                    this.ring.add(p.mesh);
                }
            } else {
                // remove particles
                while(this.nParticles > parameters.particles) {
                    var m = this.ring.children[this.nParticles-1];
                    this.ring.remove(m);
                    m.userData.po = null;
                    this.nParticles--;
                }
            }

            this.nParticles = parameters.particles;

            this.angleStep = Math.PI * 2 / this.nParticles;
            this.updateParticlesDefiniton();
        }

        // Update particles definition
        Diamond.prototype.updateParticlesDefiniton = function() {
            for(var i = 0; i < this.nParticles; i++) {
                var m = this.ring.children[i];
                var s = parameters.minSize + Math.random() * (parameters.maxSize - parameters.minSize);
                m.scale.set(s, s, s);

                // set a random distance
                m.userData.distance = parameters.minRadius +  Math.random() * (parameters.maxRadius - parameters.minRadius);

                // give a unique angle to each particle
                m.userData.angle = this.angleStep * i;
                // set a speed proportionally to the distance
                m.userData.angularSpeed = rule3(m.userData.distance, parameters.minRadius, parameters.maxRadius, parameters.minSpeed, parameters.maxSpeed);
            }
        }

        var Particle = function() {
            // Size of the particle, make it random
            var s = 1;

            // geometry of the particle, choose between different shapes
            var geom,
                random = Math.random();

            if (random < .25) {
                // Cube
                geom = new THREE.BoxGeometry(s, s, s);
            } else if (random < .5) {
                // Pyramid
                geom = new THREE.CylinderGeometry(0, s, s * 2, 4, 1);
            } else if (random < .75) {
                // potato shape
                geom = new THREE.TetrahedronGeometry(s, 2);
            } else {
                // thick plane
                geom = new THREE.BoxGeometry(s / 6, s, s);
            }

            // color of the particle, make it random and get a material
            var color = getRandomColor();
            var mat = getMat(color);

            // create the mesh of the particle
            this.mesh = new THREE.Mesh(geom, mat);
            //this.mesh.receiveShadow = true;

            this.mesh.userData.po = this;
        }

        // Update particles position
        Diamond.prototype.updateParticlesRotation = function() {
            for(var i = 0; i < this.nParticles; i++) {
                var m = this.ring.children[i];
                // increase the rotation angle around the planet
                m.userData.angle += m.userData.angularSpeed;

                // calculate the new position
                var posX = Math.cos(m.userData.angle) * m.userData.distance;
                var posZ = Math.sin(m.userData.angle) * m.userData.distance;
                m.position.x = posX;
                m.position.z = posZ;

                // add a local rotation to the particle
                m.rotation.x += Math.random() * .05;
                m.rotation.y += Math.random() * .05;
                m.rotation.z += Math.random() * .05;
            }
        }

        function loop() {
            diamond.planet.rotation.y -= .01;
            diamond.updateParticlesRotation();

            renderer.render(scene, camera);

            requestAnimationFrame(loop);
        }

        function handleWindowResize() {
            WIDTH = world.parentNode.offsetWidth;
            HEIGHT = world.parentNode.offsetHeight;

            renderer.setSize(WIDTH, HEIGHT);
            camera.aspect = WIDTH / HEIGHT;
            camera.updateProjectionMatrix();
        }

        function rule3(v, vmin, vmax, tmin, tmax) {
            var nv = Math.max(Math.min(v, vmax), vmin);
            var dv = vmax - vmin;
            var pc = (nv - vmin) / dv;
            var dt = tmax - tmin;
            var tv = tmin + (pc * dt);
            return tv;

        }
        // setTimeout(function() {
        //     if (window.THREE != undefined) {
        //         initWorld();
        //         setTimeout(function() {
        //             handleWindowResize();
        //         }, 1000);
        //     } else {
        //         window.onload = initWorld;
        //     }
        // }, 2000);
    })();
						}
						
					});
				
					var htmlDivCss = unescape("rs-slide%3Aafter%20%7B%0A%20%20content%3A%20%27%27%3B%0A%20%20display%3A%20block%3B%0A%20%20position%3A%20absolute%3B%0A%20%20%20%20%20%20%20%20left%3A%200%3B%0A%20%20%20%20%20%20%20%20right%3A%200%3B%0A%20%20%20%20%20%20%20%20top%3A%200%3B%0A%20%20%20%20%20%20%20%20bottom%3A%200%3B%0A%20%20%20%20%20%20%20%20background%3A%20%232c2e3d%3B%0A%20%20%09%09opacity%3A%200.6%3B%0A%20%20%20%20%20%20%20%20z-index%3A8%3B%0A%7D%0Abody%20.slideshow-preloader%20%7B%0A%09height%3A%20100vh%3B%0A%7D%0A%0A.animation-wrapper%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width%3A%20100%25%3B%0A%20%09%20%20%20%20%20height%3A%20100%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20fixed%3B%0A%0A%20%20%20%20%20%20%20%20%7D%0A%0A%23world%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20width%3A%20100%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20height%3A%20100%25%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20overflow%3A%20hidden%3B%0A%20%20%20%20%20%20%20%20%20%20%20%20position%3A%20fixed%3B%0A%20%7D%0Aa.mouse-scroll.scroll-to-anchor%20%7B%0A%20%20%20%20border-width%3A%201px%20%21important%3B%0A%20%20%20%20border-color%3A%20%23fff%20%21important%3B%0A%7D%0Aa.mouse-scroll.scroll-to-anchor%3Aafter%20%7B%0A%20%20%20%20background%3A%20%23fff%20%21important%3B%0A%7D%0A.gem-button%20%20%7B%0Aheight%3A%20auto%20%21important%3B%0A%7D%0A%0A%0A%0A.rev_slider%20lirs-slide%20rs-sbg-wrap%20%7B%0A%20%20opacity%3A%200%20%21important%3B%0A%20%20-o-transition%3A%20opacity%204s%3B%0A%20%20-webkit-transition%3A%20opacity%204s%3B%0A%20%20transition%3A%20opacity%204s%3B%0A%7D%0A%20%20%0A.rev_slider%20lirs-slide.processing-revslide%20rs-sbg-wrap%20%7B%0A%20%20opacity%3A%201%20%21important%3B%0A%7D%0A%20%20%20%20%0A.rev_slider%20lirs-slide.active-rs-slide%20rs-sbg-wrap%20%7B%0A%20%20opacity%3A%201%20%21important%3B%0A%7D%0A%0A.rev_slider%20lirs-slide.processing-revslide%20rs-sbg-wrap%20.tp-bgimg%2C%0A.rev_slider%20lirs-slide.active-rs-slide%20rs-sbg-wrap%20.tp-bgimg%20%7B%0A%20%20-webkit-transform%3A%20scale%281%29%20rotate%280%29%3B%0A%20%20-ms-transform%3A%20scale%281%29%20rotate%280%29%3B%0A%20%20transform%3A%20scale%281%29%20rotate%280%29%3B%0A%7D%0A%20%20%0A.rev_slider%20lirs-slide%20rs-sbg-wrap%20.tp-bgimg%20%7B%0A%20%20-webkit-transform%3A%20scale%281.3%29%20rotate%2810deg%29%3B%0A%20%20-ms-transform%3A%20scale%281.3%29%20rotate%2810deg%29%3B%0A%20%20transform%3A%20scale%281.3%29%20rotate%2810deg%29%3B%0A%20%20%20%20%0A%20%20-o-transition%3A%20transform%2020s%20cubic-bezier%280.255%2C%200.025%2C%200.475%2C%201.000%29%3B%0A%20%20-webkit-transition%3A%20transform%2020s%20cubic-bezier%280.255%2C%200.025%2C%200.475%2C%201.000%29%3B%0A%20%20transition%3A%20transform%2020s%20cubic-bezier%280.255%2C%200.025%2C%200.475%2C%201.000%29%3B%0A%7D%0A%0A%40media%20%28max-width%3A%20768px%29%20%7B%0A%09.rev_slider%20lirs-slide%20rs-sbg-wrap%2C%0A%09.rev_slider%20lirs-slide.processing-revslide%20rs-sbg-wrap%2C%0A%09.rev_slider%20lirs-slide.active-rs-slide%20rs-sbg-wrap%20%7B%0A%20%20%09%09opacity%3A%201%20%21important%3B%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20-o-transition%3A%20opacity%200s%3B%0A%20%20%09%09-webkit-transition%3A%20opacity%200s%3B%0A%20%20%09%09transition%3A%20opacity%200s%3B%0A%20%20%20%20%7D%0A%20%20%20%20%0A%20%20%20%20.rev_slider%20lirs-slide.processing-revslide%20rs-sbg-wrap%20.tp-bgimg%2C%0A%09.rev_slider%20lirs-slide.active-rs-slide%20rs-sbg-wrap%20.tp-bgimg%2C%0A%20%20%09.rev_slider%20lirs-slide%20rs-sbg-wrap%20.tp-bgimg%20%7B%0A%20%20%20%20%09-webkit-transform%3A%20none%3B%0A%20%20%09%09-ms-transform%3A%20none%3B%0A%20%20%09%09transform%3A%20none%3B%0A%20%20%20%20%20%20%20%20%0A%20%20%20%20%20%20%20%20-o-transition%3A%20opacity%200s%3B%0A%20%20%09%09-webkit-transition%3A%20opacity%200s%3B%0A%20%20%09%09transition%3A%20opacity%200s%3B%0A%20%20%20%20%7D%0A%7D");
					var htmlDiv = document.getElementById('rs-plugin-settings-inline-css');
					if(htmlDiv) {
						htmlDiv.innerHTML = htmlDiv.innerHTML + htmlDivCss;
					}else{
						var htmlDiv = document.createElement('div');
						htmlDiv.innerHTML = '<style>' + htmlDivCss + '</style>';
						document.getElementsByTagName('head')[0].appendChild(htmlDiv.childNodes[0]);
					}




                  
