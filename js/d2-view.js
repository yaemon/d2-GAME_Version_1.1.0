/*!
 * d2-view.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * $Date:$
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

function clean(){
  $("#info-name span, #info-grade span, #info-type span, #info-rare span").text(" ");
  $("#info-ic, #result, #search").empty()
}

function change(name){
    clean(),isModified == true && window.history.pushState(location.hash, null),
		dView.show(church.searchDaemonByName(name));
}

// $(document).ready(function(){
$(function() {
	church.init();
	dView.setAutoComplete();
	var search = $("#search");
		
 	$("head").append("<style></style>");

 	$("#search-btn").click(function() {
        "" != search.val() && search.val() != target && change(search.val());
    }),search.keypress(function(i) {
        13 == i.which && "" != search.val() && search.val() != target && change(search.val());
    }), $('input[type="checkbox"]').change(function() {
        if ($(this).prop("checked")) $("head style").append("." + $(this).attr("id") + "{display:none !important}");
        else {
            var a = "." + $(this).attr("id") + "{display:none !important}";
            $("head style").html($("head style").html().replace(a, ""))
        }
    })
});
	
$(window).on("load hashchange", function(){
		clean();
		if (searchHash = location.hash.substring(3), "" != searchHash){
			let name = dView.show(church.searchDaemonByNumber(searchHash));
			$("#search").val(name);
		}
}).one("load", function() {
		isModified = true, $("#search-remove input").prop("checked", !1)
})


// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
