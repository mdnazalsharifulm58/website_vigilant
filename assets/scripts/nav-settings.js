(function($) {
	'use strict';

		//Open close
		var $menu_trigger = $('.cd-dropdown-trigger'),
				myBody = $('body'),
				$nav = $('.cd-dropdown'),
				menuOpen = false,
				$navigation = $('#header');

				//open dropdown nav
				$menu_trigger.on('click', function(event){
						event.preventDefault();
						menuOpen = !menuOpen;
						toastAnimationOut($('.sv-toast.in'));

						//Open nav
						$nav.toggleClass('dropdown-is-active');
						$menu_trigger.toggleClass('dropdown-is-active');
				});

				//close meganavigation
				$('.cd-dropdown .cd-close').on('click', function(event){
					event.preventDefault();
					toggleNav();
				});

				//on mobile - open submenu
				$('.has-children').children('a').on('click', function(event){

					//prevent default clicking on direct children of .has-children
					event.preventDefault();
					var selected = $(this);
					selected.next('ul').removeClass('is-hidden').end().parent('.has-children').parent('ul').addClass('move-out');
				});

		//on desktop - differentiate between a user trying to hover over a dropdown item vs trying to navigate into a submenu's contents
		var submenuDirection = ( !$('.cd-dropdown-wrapper').hasClass('open-to-left') ) ? 'right' : 'left';
		$('.cd-dropdown-content').menuAim({
        activate: function(row) {
        	$(row).children().addClass('is-active').removeClass('fade-out');
        	if( $('.cd-dropdown-content .fade-in').length == 0 ) $(row).children('ul').addClass('fade-in');
        },
        deactivate: function(row) {
        	$(row).children().removeClass('is-active');
        	if( $('li.has-children:hover').length == 0 || $('li.has-children:hover').is($(row)) ) {
        		$('.cd-dropdown-content').find('.fade-in').removeClass('fade-in');
        		$(row).children('ul').addClass('fade-out')
        	}
        },
        exitMenu: function() {
        	$('.cd-dropdown-content').find('.is-active').removeClass('is-active');
        	return true;
        },
        submenuDirection: submenuDirection,
    });

    //submenu items - go back link
		$('.go-back').on('click', function(){
			var selected = $(this),
				visibleNav = $(this).parent('ul').parent('.has-children').parent('ul');
			selected.parent('ul').addClass('is-hidden').parent('.has-children').parent('ul').removeClass('move-out');
		});

		function toggleNav(){
			menuOpen = false;
			var navIsVisible = ( !$('.cd-dropdown').hasClass('dropdown-is-active') ) ? true : false;
			$('.cd-dropdown').toggleClass('dropdown-is-active', navIsVisible);
			$('.cd-dropdown-trigger').toggleClass('dropdown-is-active', navIsVisible);
			if( !navIsVisible ) {
				$('.cd-dropdown').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend',function(){
					$('.has-children ul').addClass('is-hidden');
					$('.move-out').removeClass('move-out');
					$('.is-active').removeClass('is-active');
				});
			}
		}

	// ==========================================================================
	// Nav bar element
	// ==========================================================================

		var main = $('main'),
			logoBlack = $('.logo-black'),
			logoWhite = $('.logo-white'),
			isHero = true,
			winWidth = $(window).width() + 15,
			firstSection = main.children().first();
	
    //Get current position of Nav element
    var currentPosition = $(window).scrollTop();

		//check for hero section
		if(!firstSection.hasClass('hero-container') && !firstSection.hasClass('hero')){
			isHero = false;
		}

    function addShadow(){

    	currentPosition = $(window).scrollTop();

			if(currentPosition > 50 && isHero){
				$navigation.addClass('shadow-on');
				logoWhite.addClass('active');
				logoBlack.removeClass('active');
			}else if(isHero){
				$navigation.removeClass('shadow-on');
				logoWhite.addClass('active');
				logoBlack.removeClass('active');
			}

			if(currentPosition > 50 && !isHero){
				$navigation.addClass('shadow-on');
				$navigation.removeClass('no-hero');
				logoWhite.addClass('active');
				logoBlack.removeClass('active');

			}else if(currentPosition < 50 && !isHero){
				$navigation.removeClass('shadow-on');
				$navigation.addClass('no-hero');
				logoWhite.removeClass('active');
				logoBlack.addClass('active');
			}

    }
		//on page load
		addShadow();
		navResize();

		function navResize(){

			//overide if mobile
			if(winWidth < 768){
				logoWhite.removeClass('active');
				logoBlack.addClass('active');

			}else if( winWidth > 786){
				addShadow();
			}
		}

		$(window).on('scroll', function(){
			if(winWidth < 768){

			}else{
				(!window.requestAnimationFrame) ? addShadow() : window.requestAnimationFrame(addShadow);
			}
		});

		$(window).on('resize', function(){
			winWidth = $(window).width() + 15;
			navResize();
		});

		// ==========================================================================
		// Nav Short-Links
		// ==========================================================================
		var toastActive = false;

		//toast animationOut
		function toastAnimationOut(element){
			element.addClass('out');
			setTimeout(function() {
				element.removeClass('in out');
			}, 800 );
		}

		//toast animation InDelay
		function toastAnimationInOut(element){
			setTimeout(function() {
				element.addClass('in');
			}, 400 );
		}

		//Add click events to each link
		$('.quick-link').each(function(index){
			var id,
					active;

			return $(this).on('click', function(e){
				e.preventDefault();

				//menu is open - close when activating a toast
				if(menuOpen){
					toggleNav();
				}

				id = $(this).attr('id');

				//match id to data-attr
				$('.sv-toast').each(function(index){

					if($(this).data('toast') === id){

						//if match - and no other toast is active activate
						if(!toastActive){
							$(this).addClass('in');
							toastActive = true;
						}else{
							//if another toast is active - deactivate it and add in the next
							active = myBody.find('.sv-toast.in');
							toastAnimationOut(active);
							toastAnimationInOut($(this));
						}
					}
				});
			});
		});

		//if user clicks anywhere on the screen and toast is active - remove toast
		myBody.on('click', function(){

			//check if element is hovered or not
			var isToasterHovered = $(".sv-toast:hover").length;
			var isLinkHovered = $("#header").find('a:hover').length;

			if(toastActive && isToasterHovered != 0 || isLinkHovered != 0 ){
				//do nothing because the user is hovering over an item
			}else{
				toastAnimationOut($('.sv-toast.in'));
			}
		});

		//attach click event to toast close button
		$('.sv-toast').find('button').each(function(index){
			var svToast;

			return $(this).on('click', function(e){
				e.preventDefault();
				svToast = $(this).parent('div').parent('div');
				toastAnimationOut(svToast);
				toastActive = false;
			});
		});

		// ==========================================================================
		// Date Settings
		// ==========================================================================
		var d = new Date(),
				hours = d.getHours(),
				day = d.getUTCDay(),
				ampm = hours >= 12 ? 'pm' : 'am',
				closed = "We're closed",
				open = "We're open",
				toastStatus = $('.toast-title').children('h6');

				//mon-fri
				if(day >= 1 && day <= 5){
					//if its am or pm
					if(ampm === 'am'){

						if(hours >= 9 && hours <= 12){
							toastStatus.text(open);
						}else{
							toastStatus.text(closed);
						}

					}else{

						if(hours >= 12 && hours < 21){
							toastStatus.text(open);
						}else{
							toastStatus.text(closed);
						}
					}
				}else if(day == 6){
					//if its am or pm
					if(ampm === 'am'){

						if(hours >= 9 && hours <= 12){
							toastStatus.text(open);
						}else{
							toastStatus.text(closed);
						}

					}else{
						if(hours >= 1 && hours <= 6){
							toastStatus.text(open);
						}else{
							toastStatus.text(closed);
						}
					}
				}else{
					toastStatus.text(closed);
				}

		// ==========================================================================
		// Modal config
		// ==========================================================================

		var modal = $('.modal');


		modal.on('show.bs.modal', centerModal);
		modal.on('hide.bs.modal', modalOut);

		modal.on('click', function () {
			$('.modal').modal('toggle');
		});


		function centerModal(){
			//remove toast if toast is active
			toastAnimationOut($('.sv-toast.in'));

			//add display block to get height of the modal-dialog
			$(this).css('display', 'block');

			var dialog = $(this).children('.modal-dialog'),

			//center the object
				offset = ( $(window).height() - dialog.height() ) / 2,

			// get current bottom margin - set base 10
				bottomMargin = parseInt(dialog.css('marginBottom'), 10);

			//makes sure you dont have negative margin
			if(offset < bottomMargin){

				offset = bottomMargin;
			}

			dialog.css('margin-top', offset);

			modalIn();
		}

		function modalIn(){
			$('.modal-content').find('.row').children('div').eq(1).addClass('animate-in');
		}

		function modalOut(){
			$('.modal-content').find('.row').children('div').eq(1).removeClass('animate-in');

		}

})(jQuery);