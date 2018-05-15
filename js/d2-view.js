/*!
 * d2-view.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * 2018-05-12.
 */
var isModified = false;
var target = "";

dView.setAutoComplete = function(){
	$('#search').autocomplete({
		source: church.getDaemonNames(),
		autoFocus: true,
		delay: 0,
		minLength: 1
	});
};

dView.clean = function(){
  $("#info-name span, #info-grade span, #info-type span, #info-rare span").text(" ");
  $("#info-ic, #result, #search").empty()
}

dView.change = function(name){
    dView.clean(),isModified == true && window.history.pushState(location.hash, null),
		target = dView.show(church.searchDaemonByName(name));
}

$(function() {
 	$("head").append("<style></style>");

	$('input[type="checkbox"]').change(function() {
 		if ($(this).prop("checked")) $("head style").append("." + $(this).attr("id") + "{display:none !important}");
		else {
    	var a = "." + $(this).attr("id") + "{display:none !important}";
			$("head style").html($("head style").html().replace(a, ""))
    }
	});
});
	
$(window).on("load hashchange", function(){
	dView.clean();
	if (searchHash = location.hash.substring(3), "" != searchHash){
		target = dView.show(church.searchDaemonByNumber(searchHash));
		$("#search").val(target);
		isModified = true;
	}
}).one("load", function() {
	dView.setAutoComplete();
	church.init();
	var search = $("#search");
 	$("#search-remove input").prop("checked", false);

	$("#search-btn").click(function() {
		"" != search.val() && search.val() != target && dView.change(search.val());
	});

	search.focus();

	search.keypress(function(i) {
		13 == i.which && "" != search.val() && search.val() != target && dView.change(search.val());
   });
})
// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
