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

function showbig(i,j,board){
	board[i][j]++;
	$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
	$('#b-'+i+'-'+j).text(board[i][j]);
	$('#b-'+i+'-'+j).animate({
		transform:"scale(2)",
		
		height:boardWidth*2,
		width:boardWidth*2,
//		transform:"scale(1.5,1.5)",
	},150);
		$('#b-'+i+'-'+j).animate({
		transform:"scale(1)",
			
		height:boardWidth,
		width:boardWidth,
//		transform:"scale(1,1)",
	},150);
	console.log(boardWidth+"!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
}

function showscoreadd(number){
	$('#scoreadd').text("+"+number);
       floatscore();
}

function floatscore(){
		$('#scoreadd').animate({
		opacity:1,
		top:"10vh",
	},delshowtime);
		$('#scoreadd').animate({
		opacity:0,
		top:"8vh",
	},delshowtime);
	$('#scoreadd').animate({
		opacity:0,
		top:"12vh",
	},delshowtime);
}

function showpage(i){
	$('#page'+i).css("display","inherit");
	$("#page"+i).animate({
		opacity:1,
	},300);
}