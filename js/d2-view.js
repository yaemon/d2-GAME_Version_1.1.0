/*!
 * d2-view.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 */
dView.saveData = {};

$(window).one("load", function(){
	dView.setAutoComplete();
	church.init();
	dView.saveData.init();

 	$("head").append("<style></style>");

	$('input[type="checkbox"]').change(function(){
 		dView.toggle(null, $(this).attr("id"), $(this).prop("checked"), 'button');
	});

	var search = $("#search");
	search.keypress(function(i){
		13 == i.which && "" != search.val() && dView.saveData.change(search.val());
   });
	$("#search-btn").click(function(){
		"" != search.val() && dView.saveData.change(search.val());
	});

	$(".result-item li").click(function(){
		alert( "success!!: ");
	});
})

$(window).on("load hashchange", function(){
	var hashData = dView.saveData.load(location.hash);
	hashData.restore();
})

$(function(){
	$("#search").focus();
});

dView.setAutoComplete = function(){
	$('#search').autocomplete({
		source: church.getDaemonNames(),
		autoFocus: true,
		delay: 0,
		minLength: 1
	});
};

dView.saveData.init = function(){
	dView.saveData.buttonMax = dView.showFlags.length;
	dView.showFlags.push("search-remove");
	dView.saveData.detail = new searchStatus();
};

dView.saveData.change = function(name){
	if(dView.saveData.detail.target() == name)return;
	dView.clean();
	var a = church.searchDaemonByName(name);
	var b = dView.show(a);
	var c = dView.saveData.detail.update(b);
	// dView.saveData.detail.update(dView.show(church.searchDaemonByName(name)));
};

dView.saveData.load = function(s){
	var no=0,hide="";
	if ("" != s){
		s.split('#').forEach(function(t){
			var u = t.split('=');
			if("no" == u[0]) no=u[1];
			else if("hidden" == u[0]) hide=u[1];
		});
	}
	var ret = new searchStatus(no, "" , hide);
	return ret;
};

function searchStatus(no, name, hidden){
	this.parseHide= function(s){
			var a = s.split("");
			for(let i=0; i < dView.saveData.buttonMax ; i++){
				this.hidden[i] = (a[i] && "1" == a[i])? true: false;
			}
	};
	this.no = ('undefined' == typeof(no))? 0: no;
	this.name = ('undefined' == typeof(name))? "" : name;
	this.hidden = Array(dView.showFlags.length).fill(false);
	if('string' == typeof(hidden)){
		this.parseHide(hidden);
	}
	this.target = function(){
		return this.name;
	};
	this.update = function(a){
		this.no = a.no;
		this.name = a.name;
		window.history.pushState(name, null);
		dView.toggle(null, "search-remove", a.hideCondition, 'search');
		history.replaceState("", "", dView.saveData.detail.toHash());
	};
	this.toggle = function(){
	}
	this.toHash = function(){
		var s = ""
		if (0 != this.no) s+= "#no=" + this.no;
		var check = this.hidden.indexOf(true);
		if(-1 != check && check < dView.saveData.buttonMax){
			s += "#hidden=";
			for(let i =0; i < dView.saveData.buttonMax; i++){
				if(true == this.hidden[i]) s+= "1";
				else s+= "0";
			}
		}
		return s;
	};
	this.restore = function(){
		for(let i in this.hidden){
			dView.toggle(i, "", this.hidden[i], 'restore');
		}
		if(dView.saveData.detail.compare(this.no)){
			dView.saveData.detail.update(dView.show(church.searchDaemonByNumber(this.no)));
			$("#search").val(dView.saveData.detail.target());
		}
	};
	this.saveToggle = function(i, hideB){
		if (hideB != this.hidden[i]){
			this.hidden[i] = hideB;
			history.replaceState("", "", this.toHash());
			return true;
		}
		return false;
	};
	this.compare = function(i){
		return (this.no != i);
	};
}

dView.clean = function(){
  $("#info-name span, #info-grade span, #info-type span, #info-rare span").text(" ");
  $("#info-ic, #result, #search").empty();
};

dView.toggle = function(index, attr, hideB, from){
	if(null == index){
		index = dView.showFlags.indexOf(attr);
		if (index < 0){ throw("error " + attr + " is not in [" + dView.showFlags ); }
	}else{
		attr = dView.showFlags[index];
	}
	if (dView.saveData.detail.saveToggle(index, hideB)){
		if(hideB) $("head style").append("." + attr + "{display:none !important}");
		else{
			var c = "." + attr + "{display:none !important}";
			$("head style").html($("head style").html().replace(c, ""));
		}
		if ('button' != from && index < dView.saveData.buttonMax){
			$( '#' + attr).prop('checked' , hideB);
		}
	}
};
// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
