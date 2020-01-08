(function($){
	'use strict';

	$(document).ready(function() {
		'use strict';
		if(!Modernizr.input.placeholder){

			$("input").each(
				function(){
					if($(this).val()=="" && $(this).attr("placeholder")!=""){
						$(this).val($(this).attr("placeholder"));
						$(this).focus(function(){
							if($(this).val()==$(this).attr("placeholder")) $(this).val("");
						});
						$(this).blur(function(){
							if($(this).val()=="") $(this).val($(this).attr("placeholder"));
						});
					}
			});
		}
	});

})(jQuery);