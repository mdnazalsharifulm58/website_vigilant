(function($) {
  'use strict';

//GALLERY DETAILS PAGE
  $('.gallery-main').flickity({
    setGallerySize: true,
    prevNextButtons: true,
    pageDots: false,
    wrapAround: true
  });

  $('.gallery-nav').flickity({
    asNavFor: '.gallery-main',
    contain: true,
    setGallerySize: false,
    prevNextButtons: false,
    pageDots: false
  });

})(jQuery);