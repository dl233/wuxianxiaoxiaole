// JavaScript Document
"use strict";

//单元格消除动画
function showremove(i,j){
	$('#b-'+i+'-'+j).animate({
		width:0,
		height:0,
	},200);
}