/*!
 * summon-search.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * $Date:$
 */

const dView = {};
dView.show = function(a) {
	console.log("gone03 ");

	if ( null == a ){
		document.title = "〇〇を作るには";
		return "";
	}

	var s = "<h2>検索結果</h2>";
	var lesser = (a.rank == 0) ? 0 : a.race.list[a.rank -1].grade;

	a.race.comb.forEach(function(pair){
		var x = [];
		var left  = church.getRaceByName(pair.n1).list;
		var right = church.getRaceByName(pair.n2).list;

		for (let e of left)
			for (let t of right) {
				let z = Math.floor((e.grade + t.grade) / 2 ) + 1;
					if (lesser < z && z <= a.detail.grade)
						x.push( {"left":e, "right":t, "price":0} );
			}

		if (x.length > 0) {
			s += "<article><h3>" + pair.n1 + "<br>×<br>" + pair.n2 + "</h3>";
			for (let e in x)
				s += '<ul class="rare' + x[e].left.rare.length +
				" rare" + x[e].right.rare.length + '"><li><span class="result-name">' + x[e].left.name +
				'</span><div class="result-item"><img src="' + x[e].left.img +
				'" alt=""><span class="result-rare">' + x[e].left.rare +
				'</span><span class="result-grade">Grade <span class="result-grade-num">' + x[e].left.grade +
				'</span></span></div></li><li><span class="result-name">' + x[e].right.name +
				'</span><div class="result-item"><img src="' + x[e].right.img +
				'" alt=""><span class="result-rare">' + x[e].right.rare +
				'</span><span class="result-grade">Grade <span class="result-grade-num">' + x[e].right.grade +
				"</span></span></div></li></ul>";
			s += "</article>"
		}
		return true;
	});

	document.title = a.detail.name + "を作るには";
	history.replaceState("", "", "#no" + a.detail.no);
	$("#info-ic").html('<img src="' + a.detail.img + '" alt="">');
	$("#info-name span").text(a.detail.name);
	$("#info-grade span").text(a.detail.grade);
	$("#info-type span").text(a.race.type);
	$("#info-rare span").text(a.detail.rare);
	$("#result").html(s);
	$("#info-prop li").each(function(b){$("span", this).html(a.detail.prop[b]) })

	return a.detail.name;
};
