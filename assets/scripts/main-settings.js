(function($) {
'use strict';

		//Global Variables
		var myWindow = $(window),
		myBody = $('body'),
		myFooter = $('footer'),
		desktop = 993,
		tablet = 784,
		windowSize = globalWindowWidth,
		browserID = WhichBrowser(),
		resizedWidth;

		// ==========================================================================
		// Global A tag click
		// ==========================================================================
		$('a').on("click", function (e) {

			if($(this).attr('href')==='#'){
				e.preventDefault();
			}

		});
		// ==========================================================================
		// Master Resize
		// ==========================================================================
		$(window).on('resize', function() {
			(!window.requestAnimationFrame) ? setTimeout(specialFooter, 300):
				window.requestAnimationFrame(specialFooter);
		});

		// ==========================================================================
		// Browser Check
		// ==========================================================================

		//add footer function
		function addFooterPush(){
			$('main').children('.section').last().addClass('footer-push');
		}

		function WhichBrowser() {

			//IE
			if (navigator.appName == "Microsoft Internet Explorer") {
				addFooterPush();
				return "msie";
			}

			//Chrome
			if ((navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (
				navigator.userAgent.toLowerCase().indexOf('safari') > -1) && (navigator.appName ==
				"Netscape")) {
				addFooterPush();
				return "chrome";
			}
			//Firefox
			if ((navigator.userAgent.toLowerCase().indexOf('firefox') > -1) && (
				navigator.appName == "Netscape")) {
				addFooterPush();
				return "firefox";
			}
			//Safari
			if ((navigator.userAgent.toLowerCase().indexOf('safari') > -1) && !(
				navigator.userAgent.toLowerCase().indexOf('chrome') > -1) && (navigator.appName ==
				"Netscape")) {

				if(navigator.userAgent.match(/iPad/i) != null){
					$('body, footer').addClass('ipad');

					$('section').last().removeClass('footer-push');
					return "ipad";

				}else{

					$('section').last().removeClass('footer-push');

					return "safari";
				}
			}

			//Opera
			if (navigator.appName == "Opera") {
				addFooterPush();
				return "opera";
			}
		}

		//IE9 changes
		function browserJs( browserID ){

			var cascadeFeature = $('#cascadeFeature');

				if(browserID == 'msie' && document.documentMode == 9){
						
						//IE9 fix for cascading animation
						cascadeFeature.find('.svfm1__card').each(function(index){
								$(this).css('opacity', 1);
						});

						//slide in for image text blocks
						$('.text-image').find('.text-image-img').children('img').addClass('active');
						$('.image-text').find('.image-text-img').children('img').addClass('active');


						//ie9 fix for cards
						ie9ProductsEvent();

				}else{
						//Run if any other browser

							setTimeout(function() {
								ScrollCascade(windowSize, cascadeFeature)
							},300);

						modernProductsEvent();
				}

		}

		// ==========================================================================
		// Activate Product details modern browser
		// ==========================================================================
		function modernProductsEvent(){
			var wrapper = $('.card__slider');

			wrapper.on('click', function(event){
				event.preventDefault();
				$(this).find('.content__wrapper').toggleClass('active');
			});
		}

		// ==========================================================================
		// Rearrange copy for IE9
		// ==========================================================================
		function ie9ProductsEvent(){
			var productsContainer = $('.products');

			//click event
			var wrapper = $('.card__slider');

			wrapper.on('click', function(event){
				event.preventDefault();
				$(this).toggleClass('active');
			});

			//move elements

			if(productsContainer){
				productsContainer.find('.card__slider').each(function(i, v){

					var $this = $(this);
					var bio = $this.find(".bio"),
						title = $this.find('.title'),
						contentWrapper = $this.find('.content__wrapper');

					bio.detach();
					bio.insertBefore(contentWrapper);

					var newBio = $this.find('.bio').children('h6');
					title.clone().insertBefore(newBio);
				});
			}
		}

		// ==========================================================================
		// Scroll Magic functions
		// ==========================================================================
		function ScrollCascade(windowWidthX, object){
			
			var cascadeFeature = object;

			var duration = cascadeFeature.height();
			
			var controller = new ScrollMagic.Controller({globalSceneOptions: {duration: duration}});

			function cascadeClasses(){
				cascadeFeature.find('.svfm1__card').each(function(index){
					$(this).addClass('active' + index);
				});
			}

			function imageActiveLeft(){
				$('.image-text').find('.image-text-img').children('img').addClass('active');
			}

			function imageActiveRight(){
				$('.text-image').find('.text-image-img').children('img').addClass('active');
			}

			if(windowWidthX >= 600){
				// build scenes
				var introServices = new ScrollMagic.Scene({triggerElement: "#cascadeFeature"})
					.offset(-200)
					.on("enter", cascadeClasses)
			    //.addIndicators() // add indicators (requires plugin)
					.addTo(controller);

				var imageLeft = new ScrollMagic.Scene({triggerElement: ".image-text"})
					.offset(-200)
					.on("enter", imageActiveLeft)
					.addTo(controller);

				var imageRight = new ScrollMagic.Scene({triggerElement: ".text-image"})
					.offset(-200)
					.on("enter", imageActiveRight)
					.addTo(controller);


			}else {
				cascadeClasses();
				imageActiveLeft();
				imageActiveRight();
			}
		}

		// ==========================================================================
		// Skrollr parallax
		// ==========================================================================
		function skrollrCheck() {

			//check if skrollr is enabled or not
			var winWidth = globalWindowWidth + 15;

			var winHeight = window.innerHeight;

			//if its not an ipad and window is larger than 769 enable skrollr
			if (winWidth >= 992 && browserID != 'ipad') {

				//check if body has skroller
				if (document.body.id !== 'skrollr-body') {
					document.body.id = 'skrollr-body';

					//Init Scrollr
					var s = skrollr.init({
						render: function(data) {
							//Debugging - Log the current scroll position.
							//console.log(data.curTop);
						},

						forceHeight: false, //disable setting height on body
						smoothScrolling: false
					});

				}

				if (winWidth > winHeight) {
					skrollr.get().refresh();
				} else if (winWidth < winHeight) {
					skrollr.get().refresh();
				}
			} else if (winWidth < 992) {

				// Destroy skrollr for screens less than 600px for mobile
				if (document.body.id === 'skrollr-body') {
					skrollr.init().destroy();
					document.body.id = '';

					//Find skrollr elements and adjust background sizing
					findskrollr();
				}
			}
		}

		// ==========================================================================
		// Pre loader and page init
		// ==========================================================================

		///main init for display
		function initLayout(){

			setTimeout(function() {
				specialFooter();

				// Fade in sections
				myBody.removeClass('loading').addClass('loaded');
				myFooter.removeClass('loading').addClass('loaded');

			}, 200);
		}

		//preload background images
		function preLoadElement(element, func){
			$(element).Prefetch({

				onImageLoaded:function(source, instance){

				},

				onAllLoaded:function(instance) {

					if(func){
						func();
					}
				}
			});
		}

		//primary preload
		function shavePreloader(){
			//onload check for loaded class
			if (myBody.hasClass('loaded')) {

				specialFooter();

			} else {

				//FadeIn all sections
				myBody.imagesLoaded(function(){
					var modal = $('.modal-bookNow');

					//run while preloading
					preLoadElement(modal);

				}).done(function (instance) {
					var isoGalleryItem = $('.gallery-item').find('span').get(),
						  heroItem = $('.hero-background');

							//background image preloader
							if(heroItem.length > 0){
								preLoadElement(heroItem, initLayout);
							}else if(isoGalleryItem.length > 0 ) {
								preLoadElement(isoGalleryItem, initLayout);
							}else{
								initLayout();
							}
				});
			}
		}

		//check skrollr functions
		function findskrollr() {
			var main = $('main');
			var sectionId;

			//For each section adjust background sizing for mobile devices
			main.children('.section').each(function() {
				sectionId = $(this).attr('id');

				if (sectionId !== undefined) {

					//see if the section has skr in it
					var match = sectionId.match(/skr/gi);
					if (match !== null) {
						$(this).find('div.skrollable').css('background-position', '50% 70%');
					}
				}
			});
		}

		// ==========================================================================
		// Footer adjustment
		// ==========================================================================
		function specialFooter() {

				var footerHeight,
						body = $('body');

			//Overwrite windowsize on resize
			windowSize = globalWindowWidth;
			//console.log(globalWindowWidth);

			//Resize angle
			setAngleWidth(windowSize);
			if (windowSize + 15 >= desktop) {
				skrollrCheck();
				myFooter.width(windowSize);

				body.removeClass('footer-mobile');

				if ($('main').find('.footer-push')) {
					footerHeight = $('footer').height() + 'px';

					//set footerpush margin to same height as footer
					$('.footer-push').css('margin-bottom', footerHeight);
				}

			} else if( windowSize - 15 <= desktop){
				skrollrCheck();
				myFooter.width(windowSize);
				$('.footer-push').css('margin-bottom', 0);

			}

		}

		// ==========================================================================
		// Angle borders
		// ==========================================================================
		function setAngleWidth(width){

			var angleBottomNav = $('.angle-bottom-nav'),
					priceTable = $('.price__table'),
					cardSlider = $('.card__slider'),
					barberBox = $('.barber__box'),
					priceSheet = $('.price__sheet');

			$('.angle-top').css('border-right-width', width);
			$('.angle-bottom').css('border-left-width', width);
			$('.angle-top-bottom').css('border-right-width', width);
			$('.angle-bottom-top').css('border-left-width', width);

			//Check for angle on homepage nav
			if(angleBottomNav){
				angleBottomNav.css('border-left-width', width);
			}

			//Check for price angles
			if(priceTable){
				var priceBox = $('.price__container').width();

				//set box width to remove decimals
				priceTable.css('width', priceBox);

				$('.angle-bottom-price').css('border-left-width', priceBox);
				$('.angle-top-price').css('border-right-width', priceBox);
			}

			//Check for product angles
			if(cardSlider){
				//get width
				var cardWidth = cardSlider.width();

				//set width
				$('.angle-bottom-card').css('border-left-width', cardWidth);
			}

			//Check for bio angles
			if(barberBox){

				//get width
				var boxWidth = barberBox.parent('div').width();

				//set box width to remove decimals
				barberBox.css('width', boxWidth);

				//set width
				$('.angle-top-bottom-barber').css('border-right-width', boxWidth);
			}

			//Check price sheet
			if(priceSheet){

				//get width
				var sheetWidth = $('#myTabContent').find('.active').find('img').width();

				//set width
				$('.angle-top-price').css('border-right-width', sheetWidth);
			}


		}

		// ==========================================================================
		// check width
		// ==========================================================================
		function checkWindowWidth() {

			var screenSize = windowSize + 15;

			$(window).on('resize', function() {
				resizedWidth = $(window).width() + 15;
			});

			if (resizedWidth >= tablet || screenSize >= tablet) {
				return true;
			} else {
				return false;
			}
		}


		var header = $('#header');

		// ==========================================================================
		// Modal click functions
		// ==========================================================================
		$('.modal-form').find('li').on('click', function (e) {
			e.preventDefault();
			var link = $(this).children('a').attr('href');
			window.location = link;
		});

		// ==========================================================================
		// Form focus for comments
		// ==========================================================================
		$( ".comment__form" ).delegate( "*", "focus blur", function() {
			var elem = $( this );
			setTimeout(function() {
				elem.prev().toggleClass('focused');
				elem.toggleClass( "focused", elem.is( ":focus" ) );
			}, 0 );
		});

		// ==========================================================================
		// FAQ
		// ==========================================================================
		var faqTrigger = $('.shave__faq--trigger');

		faqTrigger.on('click', function(event){
			event.preventDefault();
			$(this).next('.shave__faq--content').slideToggle(200).end().parent('li').toggleClass('active');
		});

		// ==========================================================================
		// Testimonial Carousel
		// ==========================================================================
		$('#testimonial-carousel').carousel({
			interval: 15000,
			pause: "false"
		});

		// ==========================================================================
		// Scroll to functions
		// ==========================================================================
		$('.box-sm-hours').find('a').on('click', function (e) {
			e.preventDefault();

			$('html, body').animate({
				scrollTop: $( $.attr(this, 'href') ).offset().top - 80
			}, 900);
			return false;

		});

		// ==========================================================================
		// Feature Module 2
		// ==========================================================================


		var myTab = $('#svfm2Tab'),
				myTabNext = myTab.next(),
				myTabContent = $('#myTabContent'),
				mobilePanelHeight,
				svfm2Wrapper = $('.svfm2__wrapper'),
				svfm2ImageContainer = $('.svfm2__wrapper--images'),
				svfm2Image = '.svfm2__image',
				tabTitle = myTab.find('li.active').data('title'),
				headline = svfm2Wrapper.find('.headline-container').children('h3');

				//Change tab content
				myTab.on('click', 'li', function(){

					var tab = $(this);

					//get panel ID that was clicked and remove the hash
					var panelId = tab.find('a').attr('href').substr(1);

					//get the data-attrb for the current clicked tab
					tabTitle = tab.data('title');

					myTabContent.children('div').each( function() {

						//first chck if the tab has active that was clicked
						if(!$(this).hasClass('active')){

							$(this).removeClass('active').removeClass('in');

							if(panelId === this.id){

								var element = $(this),
										currentImage = svfm2Wrapper.children(svfm2ImageContainer).children('.active');

								//get heigh of clicked content
								var panelHeight = element.height(),
										imageTitle = svfm2Wrapper.children(svfm2ImageContainer).children(svfm2Image).get();

								//loop through the images and match the title to the tab title
								for( var i=0; i < imageTitle.length; i++){

									if($(imageTitle[i]).data('title') === panelId){

										$(imageTitle[i]).addClass('active');
									}
								}

								//add hight to adj the for new content
								if(windowSize <= 600){
									//slide content out and then add the content back in
									setTimeout(function(){
										myTabNext.height(panelHeight);
									}, 400);

								}

								currentImage.removeClass('active');

								//change title
								headline.fadeTo( "slow", 0, function(){
									headline.text(tabTitle).fadeTo('fast', 1);
								});

								setTimeout(function(){
									element.addClass('in');
								}, 400);
							}
						}

					});

				});

				//change title on page load
				headline.text(tabTitle);

				mobilePanelHeight = myTabContent.find('.active').height();

				myTabContent.height(mobilePanelHeight);

				//set height for phones on load
				if(windowSize <= 600){

					mobilePanelHeight = myTabContent.find('.active').height();

					myTabContent.height(mobilePanelHeight);

				}

		// ==========================================================================
		// Price Tab sizing function
		// ==========================================================================

		function animatePriceIn(object){
			setTimeout(function(){
				object.addClass('in');
			}, 100);
		}

		//Change size of body depending on content in tabs
		$('#priceTabs').on('click', 'li', function(e){
			e.preventDefault();

			var galleryPageHeight = $(window).height(),
					tabContentHeight = $('.sv__container--sm').height(),
				  updatedHeight = galleryPageHeight - tabContentHeight,
					myPriceContent = $('#myPriceContent'),
					panelId = $(this).find('a').attr('href').substr(1),
					activeElement = myPriceContent.children('.active'),
					$this = $(this);

			if($this.hasClass('active')){
				//do nothing
			}else{

				//loop through the elements and remove active and add it to the clicked element
				$this.parent().children('li').each(function(){
					$(this).removeClass('active');
				});

				$this.addClass('active');

				//slide old element out
				activeElement.removeClass('in');

				//slide in new item
				setTimeout(function(){

					//remove active from prev panel
					activeElement.removeClass('active');

					//loop through the tabcontent and find the match and animate in
					myPriceContent.children('div').each(function(){
						if(panelId === this.id){

							var element = $(this);
							$(this).addClass('active');

							animatePriceIn(element);
						}
					});

				},600);
			}

		});

		// ==========================================================================
		// Run on First Load
		// ==========================================================================

		//browser check
		browserJs(browserID);

		//Image Preloader check
		shavePreloader();

})(jQuery);
