(function($){
  'use strict';

    var currHeight,
        currThumbHeight,
        winWidth = globalWindowWidth + 15;

    //get height of image on window resize
    function getImgHeightMaster(){
      var myImg = document.querySelector(".flickity-slider").children[0].children[0];
      currHeight = myImg.clientHeight;

      return currHeight;
    }

    //get height of thumbnail on window resize
    function getThumbnailHeight(){
      var myImg = document.querySelector("#subNav").getElementsByTagName('img');

      currThumbHeight = myImg[0].clientHeight;

      return currThumbHeight;
    }

    //resize function
    function resizeFlickity(){
      var gallery = $(".gallery-main"),
          reSize = getImgHeightMaster();

      gallery.find('.flickity-viewport').height(reSize);
      $('.gallery-nav').height(getThumbnailHeight());
    }

    // Gallery Details Style Details elements
    function showGalleryDetails(){
      $('#collapseExample').collapse('show');
    }
    function hideGalleryDetails(){
      $('#collapseExample').collapse('hide');
    }

    function galleryDetails(){

      if(winWidth > 1200){
        showGalleryDetails();
      }else if(winWidth < 1200 && winWidth > 991){
        hideGalleryDetails();
      }else{
        showGalleryDetails();
      }
    }

    //apply
    $(window).on('resize', function(){

      resizeFlickity();
      galleryDetails();

    });

    //on load
    $(window).on('load', function(){
      resizeFlickity();
      galleryDetails();
    });

})(jQuery);