(function($) {
  'use strict';

  // Set tab active based on URL
  var val = window.location.hash;
  var hash;

  var animateInDelay = function(e){
    setTimeout(function(){
      e.addClass('in');
    }, 500);
  };

  if(val != ''){
    //clean up value to get the string
    hash = val.substr(5);

    $('#priceTabs > li').each(function(){

      //remove the default active class on the tab elements
      $(this).removeClass('active');

      //check to make sure the id == the hash
      if( hash === this.id ){

        //set panelId
        var panelId = $(this).find('a').attr('href').substr(1);

        //show correct matching content with active Tab
        //loop through the panel conents
        $('#myPriceContent > div').each( function(){
          $(this).removeClass('active').removeClass('in');

          //check if the id of the tab matches the id of the panel
          if(panelId === this.id){

            var element = $(this);

            $(this).addClass('active');

            //animate in
            animateInDelay(element);

          }
        });

        //add active class to the tab element that was a match
        $(this).addClass('active');

      }
    });

  } else{

    //show default
    setTimeout(function(){
      $('#shaving').addClass('active in');
    }, 500);

  }

})(jQuery);