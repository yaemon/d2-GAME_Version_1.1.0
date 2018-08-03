/*!
 * scrifice-search.js
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
		document.title = "〇〇は何の素材になるか";
		history.replaceState("", "", location.hash="");
		return "";
	}
	if (null != a.notFound){
		document.title = a.notFound + " が分かりません";
		history.replaceState("", "", location.hash="#NotFound");
		return "";
	}
	if (null == a.race.comb){
		document.title = a.detail.name + " は二身合体に使えません";
		s = "<h2>未実装</h2>",
		s += '<div id = "message">',
		s += '<p>' + a.race.type + "は素材になりません</p>",
		s += '</div>';
		dView.Conditions.Hidden();
	}
	else
	{
		document.title = a.detail.name + "は何の素材になるか";
		s = "<h2>検索結果</h2>";
		var rList = [];
		var rareTarget = a.detail.rare.length;

		for(let race of church.data){
			if (null == race.comb){continue;}
			for(let comb of race.comb){
				if (a.race.type == comb.n1){
					rList.push({"second":comb.n2, "summon":race});
				} else if (a.race.type == comb.n2){
						rList.push({"second":comb.n1, "summon":race});
				}
			}
		}
		for(let r of rList){
			let x = [];
			let i = 0, j = 0, z =0;
			let second = church.getRaceByName(r.second)
			while (true) {
				if (z==0) {z = Math.floor((a.detail.grade + second.list[i].grade) / 2 ) + 1};
				if (z <= r.summon.list[j].grade){
					x.push(
						{"second":second.list[i], "summon":r.summon.list[j],
						"price":church.invoice(r.summon.list[j], a.detail, second.list[i])}
					);
					z = 0, i++;
					if (i < second.max) continue;
					break;
				}
				j++;
				if (j < r.summon.max) continue;
				break;
			}
			if (x.length > 0) {
				s += '<article class="sozai-search"><h3>' + r.second + "<br>×<br>" + r.summon.type + "</h3>";
				for (let e of x){
					var rareSecond = e.second.rare.length;
					var rareSummon = e.summon.rare.length;

					var priceClass = " pStd";
					{
						var rareUp = rareSummon *2 - rareTarget - rareSecond;
						if (1 == rareUp) priceClass = " pHalf";
						else if (1 < rareUp) priceClass = " pMax";
					}
					var downGrade = ""
					if (rareTarget > rareSummon) downGrade = " down";

					s += '<ul class="',
					s	+= "rare" + rareSecond + priceClass + downGrade,
					s += '">';

					s += dView.d2liBox(e.second, "+");
					s += dView.d2liBox(e.summon, "=");
					s += dView.p2liBox(e.price);
					s += "</ul>";
				}
				s += "</article>";
			}
		}
	}

	history.replaceState("", "", "#no" + a.detail.no);
	$("#info-ic").html('<img src="' + a.detail.img + '" alt="">');
	$("#info-name span").text(a.detail.name);
	$("#info-grade span").text(a.detail.grade);
	$("#info-type span").text(a.race.type);
	$("#info-rare span").text(a.detail.rare);
	$("#result").html(s);
	$("#info-prop li").each(function(b){$("span", this).html(a.detail.prop[b]) });

	return a.detail.name;
}
// vim:ts=4:sw=4:tw=78:fenc=utf-8:ff=unix:ft=javascript:noexpandtab:nolist
