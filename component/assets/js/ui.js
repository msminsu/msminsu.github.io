$(document).ready(function() {
});
$(window).on('scroll', function () {
	//snb
	if ($('#snb').length) snbXscroll();
});

//snb
function snbXscroll () {
	var windowScroll = $(window);
	$('#snb').css('left', - windowScroll.scrollLeft());
};