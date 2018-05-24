// JavaScript Document
 /* jshint esversion: 6 */
"use strict";
var board=new Array();
var same=new Array();
var lock=false;
var sum=0;

$(document).ready(function(){
	init();
	updataboard();
});


//初始化
function init(){
	
	for(let i=0;i<5;i++){
		$('#e-'+i).css('left',getEleft(i));
		
		board[i]=new Array();
		same[i]=new Array();
		for(let j=0;j<5;j++){
			board[i][j]=0;
			same[i][j]=true;
	}
}
}

//更新布局
function updataboard(){
	$('.board').remove();
	for(let i=0;i<5;i++){
		for(let j=0;j<5;j++){
				$('#main').append('<div class="board" id="b-'+i+'-'+j+'" onClick="Bclick(this)"></div>');
			
			    $('#b-'+i+'-'+j).css('top',getBtop(i));
			    $('#b-'+i+'-'+j).css('left',getBleft(j));
				$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
			    $('#b-'+i+'-'+j).text(board[i][j]);
		}
	}
}

//单击修改元素值
function Bclick(evt){
	if(lock)
		return;
	console.log("click");
	lock=true;
	let i=evt.id.charAt(2);
	let j=evt.id.charAt(4);
	board[i][j]++;
	$('#b-'+i+'-'+j).text(board[i][j]);
	checkclear();
	clearsame(same);
	lock=false;
	console.log("OVER");
}

//检测是否可以消除
function checkclear(){
	for(let i=0;i<5;i++){
		for(let j=0;j<5;j++){
			if(same[i][j]){
				check(i,j);
				sum=0;
			}
		}
	}
}

function check(i,j){
	sum++;
	console.log("check"+i+" "+j);
	same[i][j]=false;
	if((j+1)<=4&&board[i][j]!==0&&board[i][j]===board[i][j+1]){
					check(i,j+1);
				}
	else if((j-1)>=0&&board[i][j]!==0&&board[i][j]===board[i][j-1]){
					check(i,j-1);
				}
	else if((i+1)<=4&&board[i][j]!==0&&board[i][j]===board[i+1][j]){
					check(i+1,j);
				}
	else if((i-1)>=0&&board[i][j]!==0&&board[i][j]===board[i-1][j]){
					check(i-1,j);
				}
	if(sum>=3){
		board[i][j]=0;
		showremove(i,j);
	}

}

