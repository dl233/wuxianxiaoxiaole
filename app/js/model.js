// JavaScript Document
"use strict";
var documentWidth=window.innerWidth;
var documentHeight=window.innerHeight;
var documentBH=documentHeight*0.3;
var boardWidth=documentWidth*0.19;



function checksize(){
	if(documentWidth*1.3>documentHeight){
		alert("分辨率不合适！");
		return false;
	}else
		return true;
}



function getEleft(i){
	return documentWidth*0.02+i*(documentWidth*0.18);
}


function getBleft(j){
	return documentWidth*0.015+j*documentWidth*0.195;
}


function getBtop(i){
	return documentBH+documentWidth*0.015+i*documentWidth*0.195;
}


function getBcolor(number){
	switch(number){
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

function randomtext(number){
	if(number>0.9)
		return 5;
	else if(number>0.75)
		return 4;
	else if(number>0.55)
		return 3;
	else if(number>0.35)
		return 2;
	else
		return 1;
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
