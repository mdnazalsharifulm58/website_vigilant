(function($){
  'use strict';
  // ======================================================================
  // Gallery Isotope Settings
  // ======================================================================
  $(window).load(function(){

    //Get grid to assign dynamically
    var gridId = $('.inner-content-module').children('div').attr('id'),
      reIso,
      $grid,
      $gallery_grid,
      $gallery_wrapper_width,
      $fullGrid = $('#' + gridId);

    //add transition for intro animation
    $('.gallery-item').css('transition-duration', "600ms");

    //init isotope
    $grid = $fullGrid.isotope({
      percentPosition: true,
      itemSelector: '.gallery-item',
      isInitLayout: false,
      masonry: {
        "columnWidth": ".grid-sizer"
      },
      transitionDuration: '.6s'

    });

    function pxConvert(string){
      return parseInt(string.slice(0, -2));
    }

    function reFilter(item){
      $grid.isotope({
        filter: item
      });
    }

    //resize isotope and minHeight
    function reSized(){
      $grid.isotope();
      setMinHeight();
    }

    //assign grid
    function galleryIsotopeWrapper () {

      if ( $(window).innerWidth() > 1600 ) {
        $gallery_grid = 5;
      } else if ( $(window).innerWidth() <= 600 ) {
        $gallery_grid = 1;
      } else if ( $(window).innerWidth() <= 991 ) {
        $gallery_grid = 2;
      } else if ( $(window).innerWidth() <= 1199 ) {
        $gallery_grid = 3;
      } else {
        $gallery_grid = 4;
      }

      if ( $('.gallery-3-grid').length > 0 && $(window).innerWidth() > 1248 )
      {
        $gallery_grid = 3;
      }

      if ( $('.gallery-4-grid').length > 0 && $(window).innerWidth() > 1584 )
      {
        $gallery_grid = 4;
      }

      $gallery_wrapper_width = $('.gallery-container').width();

      if ( $gallery_wrapper_width % $gallery_grid > 0 ) {
        $gallery_wrapper_width = $gallery_wrapper_width + ( $gallery_grid - $gallery_wrapper_width%$gallery_grid);
      }

      $('.gallery-isotope').css('width',$gallery_wrapper_width);

      return $gallery_grid;
    } // end galleryIsotopeWrapper

    //set gallery height depending on new content reloaded
    function setMinHeight(){
      var currentHeight = $('.gallery-item.width1').css('padding-bottom');
      currentHeight = pxConvert(currentHeight);

      if(currentHeight != 0){
        $('.gallery-isotope').css('min-height', currentHeight);
      } else{
        currentHeight = $('.gallery-item.width1').height();
        $('.gallery-isotope').css('min-height', currentHeight);
      }

    }

    //on page load
    galleryIsotopeWrapper();
    setTimeout(reSized, 1000);

    $grid.isotope( 'once', 'arrangeComplete', function() {
      //fade in
      $('.gallery-item').addClass('active');

      //remove animation for smooth filtering
      setTimeout(function(){
        $('.gallery-item').css('transition-duration', "0ms");
      },500);

    });

    window.onresize = function(){

      clearTimeout(reIso);

      //gallery isotope
      if ( $('.gallery-container').size() ) {
        galleryIsotopeWrapper();

        //on resize complete, readjust grid
        reIso = setTimeout(reSized, 500);
      }
    };

    //Filter on click
    $('.filter-group').on( 'click', 'li', function() {

      var $this = $(this);

      $this.parent().children('li').each(function(){
        $(this).removeClass('selected');
      });

      $this.addClass('selected');

      var filterValue = $this.attr('data-filter');

      reFilter(filterValue);

    });

    //select show all on load
    $('.filter-group').children('li').first().addClass('selected');


    //Filter URL
    var val = window.location.hash;
    var hash;

    if(val != ''){
      hash = val.substr(8);

      reFilter(hash);

      $('.filter-group > li').each(function(){
        var data = $(this).data('filter');
        if( data === hash){
          $(this).addClass('selected');
        }
        return;
      });
    }

  });

})(jQuery);
