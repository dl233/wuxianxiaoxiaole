// JavaScript Document
"use strict";
function showremove(i,j){
	$('#b-'+i+'-'+j).animate({
		top:getBtop(i,j)+boardWidth/2,
		left:getBleft(i,j)+boardWidth/2,
		width:0,
		height:0,
	},200);
}