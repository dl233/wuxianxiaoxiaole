// JavaScript Document
"use strict";
var documentWidth=window.screen.availWidth;
var documentHeight=window.screen.availHeight;
var documentBH=documentHeight*0.3;
var boardWidth=documentWidth*0.19;
//确定能量条位置
function getEleft(i){
	return documentWidth*0.02+i*(documentWidth*0.18);
}
//确定单元格位置
function getBleft(j){
	return documentWidth*0.015+j*documentWidth*0.195;
}

function getBtop(i){
	return documentBH+documentWidth*0.015+i*documentWidth*0.195;
}
function getBcolor(number){
	switch(number){
		case 1:return 
	}
}
//消除判定
function clearsame(arr){
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			arr[i][j]=true;
		}
	}
}