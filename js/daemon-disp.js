/*!
 * daemon-disp
 * https://github.com/yaemon/
 *
 * Copyright r-jp, yaemon.
 * Released under the MIT license
 *
 * 2018-05-14.
 */

dView.priceFormat = new Intl.NumberFormat('en-US');

dView.d2liBox = function(a){
	return '<li><span class="result-name">' + a.name + '</span>' +
		'<div class="result-item"><img src="' + a.img + '" alt="">' + 
		'<span class="result-rare">' + a.rare + '</span>' +
		'<span class="result-grade">Grade <span class="result-grade-num">' +
		a.grade + '</span></span>' +
		'</div></li>';
};

dView.p2liBox = function(a){
	return '<li class ="price">' + dView.priceFormat.format(a) + '</li>';
}
