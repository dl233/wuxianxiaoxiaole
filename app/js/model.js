// JavaScript Document
"use strict";
var documentWidth=window.innerWidth;
var documentHeight=window.innerHeight;
var mainWidth=documentWidth;
var boardWidth=documentWidth*0.19;
var afterscore=0;
var musiclock=true;

function checksize(){
	if(documentWidth*1.3>documentHeight){
		return false;
	}else
		return true;
}

function setmainWidth(num){
	mainWidth=Math.floor(num);
	boardWidth=mainWidth*0.19;
}

function getEleft(i){
	return mainWidth*0.02+i*(mainWidth*0.18);
	alert(mainWidth);
}


function getBleft(j){
	return mainWidth*0.015+j*mainWidth*0.195;
}


function getBtop(i){
	return mainWidth*0.015+i*mainWidth*0.195;
}


function getBcolor(number){
	switch(number%18){
		case 1:return "#DAA520";break;
		case 2:return "#7CFC00";break;
		case 3:return "#7CCD7C";break;
	    case 4:return "#8470FF";break;
	    case 5:return "#DB7093";break;
		case 6:return "#CD4F39";break;
		case 7:return "#CD6600";break;
		case 8:return "#B03060";break;
		case 9:return "#ADD8E6";break;
		case 10:return "#00CED1";break;
		case 11:return "#FFD700";break;
		case 12:return "#FFA54F";break;
		case 13:return "#FF4500";break;
		case 14:return "#EE3A8C";break;
		case 15:return "#CD2626";break;
		case 16:return "#BCEE68";break;
		case 17:return "#ADADAD";break;
		case 18:return "#DB7093";break;
		default:break;
	}
}

//随机数生成的概率
function randomtext(number){
	if(number>0.95)
		return 5+afterscore;//0.05
	else if(number>0.85)
		return 4+afterscore;//0.1
	else if(number>0.6)
		return 3+afterscore;//0.25
	else if(number>0.35)
		return 2+afterscore;//0.25
	else
		return 1+afterscore;//0.35
}

function cleararr(arr){
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			arr[i][j]=true;
		}
	}
}

function changescore(score){
	$('#score').text(score);
}

function endscoret(score){
	$('#endscore').text(score);
	if(score>10000){
		$('#endscore').css('font-size','10vh');
	}
	else{
		$('#endscore').css('font-size','15;vh');
	}
}

function delmusic(number){
	if(number>=3&&number<=5){
		$('#del-'+number)[0].play();
	}
	else if(number>5){
		$('#del-x')[0].play();
	}
	else return;
}


