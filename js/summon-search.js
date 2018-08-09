/*!
 * summon-search.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 */

const dView = {};
dView.show = function(a) {
	var s;
	if (null == a){
		document.title = "〇〇を作るには";
		history.replaceState("", "", location.hash="");
		return "";
	}
	if (null != a.notFound){
		document.title = a.notFound + " が分かりません";
		history.replaceState("", "", location.hash="#NotFound");
		return "";
	}
	if (null == a.race.comb){
		dView.Conditions.Hide();
		if (null == a.detail.union){
			document.title = a.detail.name + " は作れません"
			s = "<h2>未実装</h2>",
			s += '<div id = "message">',
			s	+= "<p>" + a.race.type + "を合体で作成する方法は提供されていません</p>",
			s += '</div>';
		}
		else{
			document.title = a.detail.name + "を作るには";
			s = "<h2>検索結果</h2>";
			s += "<article><h3>" +  "多身<br /><br />　合体" + "</h3>";
			s += '<ul>';
			for (let e of a.detail.union){
				tmp = church.searchDaemonByNumber(e);
				s += dView.d2liBox(tmp.detail);
			}
			s += dView.p2liBox(a.detail.price);
			s += '</ul>';
		}
	}
	else
	{
		//dView.ConditionsShow();
		document.title = a.detail.name + "を作るには";
		s = "<h2>検索結果</h2>";
		var lesser = (a.rank == 0) ? 0 : a.race.list[a.rank -1].grade;
		var rareTarget = a.detail.rare.length;
		var rareTargetW = 2 * rareTarget;

		a.race.comb.forEach(function(pair){
			var x = [];
			var left  = church.getRaceByName(pair.n1).list;
			var right = church.getRaceByName(pair.n2).list;

			for (let e of left)
				for (let t of right) {
					let z = Math.floor((e.grade + t.grade) / 2 ) + 1;
					if (lesser < z && z <= a.detail.grade)
						x.push( {"left":e, "right":t, "price":church.invoice(a.detail, e, t)});
				}

			if (x.length > 0) {
				s += "<article><h3>" + pair.n1 + "<br>×<br>" + pair.n2 + "</h3>";
				for (let e of x){
					var rareL = e.left.rare.length;
					var rareR = e.right.rare.length;

					var priceClass = " pStd";
					{
						var rareUp = rareTargetW - rareL - rareR;
						if (1 == rareUp) priceClass = " pHalf";
						else if (1 < rareUp) priceClass = " pMax";
					}


					s += '<ul class="',
					s	+= "rare" + rareL + " rare" + rareR + priceClass,
					s += '">';

					s += dView.d2liBox(e.left);
					s += dView.d2liBox(e.right);
					s += dView.p2liBox(e.price, rareTarget);
					s += "</ul>";
				}
				s += "</article>"
			}
			return true;
		});
	}
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
// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
