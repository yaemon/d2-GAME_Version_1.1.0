/*!
 * scrifice-search.js
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * 2018-05-13
 */
const dView = {};
dView.show = function(a) {
	if ( null == a ){
		document.title = "〇〇は何の素材になるか";
		return "";
	}

	var s = "<h2>検索結果</h2>";

	var rList = [];
	for(let race of church.data){
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
			s += "<article><h3>" + r.second + "<br>×<br>" + r.summon.type + "</h3>";
			for (let e of x){
				s += '<ul class="rare' + e.second.rare.length + '">';
				s += dView.d2liBox(e.second);
				s += dView.d2liBox(e.summon);
				s += dView.p2liBox(e.price);
				s += "</ul>";
			}
			s += "</article>";
		}
	}

	document.title = a.detail.name + "は何の素材になるか";
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
