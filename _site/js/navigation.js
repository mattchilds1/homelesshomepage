(function() {
	$(document).ready(function() {
		$('#menu').on('click', function(){
    	$('#navigation').css("display", "block");
		});
		$('#close-menu').on('click', function(){
    	$('#navigation').css("display", "none");
		});
	});
})();
