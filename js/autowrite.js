$(function(){
	$('#search').autocomplete({
		source: $.getDaemonNames(),
		autoFocus: true,
		delay: 0,
		minLength: 1
	});
});
