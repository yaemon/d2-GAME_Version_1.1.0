/*!
 * d2-view.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
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

dView.Conditions = {};
dView.Conditions.Flag = true;
dView.Conditions.Word = '#search-remove';
dView.Conditions.Hidden = function(){
	if (true == dView.Conditions.Flag){
		$("head style").append(dView.Conditions.Word + "{display:none !important}");
		dView.Conditions.Flag = false;
	}
}
dView.Conditions.Show = function(){
	if (false == dView.Conditions.Flag){
		var a = dView.Conditions.Word + "{display:none !important}";
		$("head style").html($("head style").html().replace(a, ""))
		dView.Conditions.Flag = true;
	}
}


dView.clean = function(){
  $("#info-name span, #info-grade span, #info-type span, #info-rare span").text(" ");
  $("#info-ic, #result, #search").empty(),
	dView.Conditions.Show()
}

dView.change = function(name){
    dView.clean(),isModified == true &&
		window.history.pushState(name, null),
		dView.show(church.searchDaemonByName(name));
}

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
 	$("#search-remove input").prop("checked", !1);

	$("#search-btn").click(function() {
		"" != search.val() && search.val() != target && dView.change(search.val());
	});

	search.focus();
	search.keypress(function(i) {
		13 == i.which && "" != search.val() && search.val() != target && dView.change(search.val());
   });
 	$("head").append("<style></style>");

	$('input[type="checkbox"]').change(function() {
 		if ($(this).prop("checked")) $("head style").append("." + $(this).attr("id") + "{display:none !important}");
		else {
    	var a = "." + $(this).attr("id") + "{display:none !important}";
			$("head style").html($("head style").html().replace(a, ""))
    }
	});
})
// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
