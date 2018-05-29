// JavaScript Document
"use strict";
var delshowtime=0;
//单元格消除动画
function showremove(i,j){
	$('#b-'+i+'-'+j).animate({
		opacity: 0,
	},delshowtime);
}

function showdownmove(fromx,fromy,tox,board){
	console.log("Move Down!!!!!!!!!!!!!!!!!!!!!!");
	$('#b-'+fromx+'-'+fromy).animate({
		top:getBtop(tox)
	},300);
	board[tox][fromy]=board[fromx][fromy];
	board[fromx][fromy]=0;
}

function showenergydel(num){
	console.log("del");
	$('#e-'+num).animate({
		opacity: 0,
	},200);
}

function showenergyadd(num){
	console.log("add");
	$('#e-'+num).animate({
		opacity: 1,
	},200);
}