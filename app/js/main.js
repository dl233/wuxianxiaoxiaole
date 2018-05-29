// JavaScript Document
 /* jshint esversion: 6 */
"use strict";
var board=new Array();//每个格子的值
var same=new Array();//每一个格子都设一个检测信号量
var del=new Array();//每一个格子都设一个消除信号量
var lock=false;//锁住屏幕
var sum=0;//判断有多少格子是连续的
var energy=5;//

var changetime=0;//检测时间
var updataboardtime=0;//更新时间
var randomboardtime=0;//随机数生成时间


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
		del[i]=new Array();
		for(let j=0;j<5;j++){
			board[i][j]=0;
			same[i][j]=true;
			del[i][j]=true;
		}
	}
	initrandom();
	checkclear();
	setTimeout("updataboard()",400);
}

//更新布局
function updataboard(){
	$('.board').remove();
	for(let i=0;i<5;i++){
		for(let j=0;j<5;j++){
				$('#main').append('<div class="board" id="b-'+i+'-'+j+'" onClick="Bclick(this)"></div>');
			
				if(board[i][j]===0)
				randomboard(i,j);
			
			    $('#b-'+i+'-'+j).css('top',getBtop(i));
			    $('#b-'+i+'-'+j).css('left',getBleft(j));
				$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
			    $('#b-'+i+'-'+j).text(board[i][j]);
		}
	}
}

//开始游戏随机生成单元格
function initrandom(){
	let randomNumber;
	for(let i=0;i<5;i++){
		for(let j=0;j<5;j++){
			randomNumber=Math.random();
			board[i][j]=randomtext(randomNumber);
		}
	}
}

//随机生成单元格
function randomboard(i,j){
	let randomNumber;
	randomNumber=Math.random();
	board[i][j]=randomtext(randomNumber);
}

//单击修改元素值
function Bclick(evt){
	changetime=1800;
	updataboardtime=900;
	randomboardtime=700;
	delshowtime=300;
	if(lock)
		return;
	energychange(-1);
	console.log("click");
	lock=true;
	let i=evt.id.charAt(2);
	let j=evt.id.charAt(4);
	board[i][j]++;
	board[i][j]=board[i][j]%99;
	$('#b-'+i+'-'+j).text(board[i][j]);
	checkclear();
	console.log("OVER");
}

//检测是否可以消除
function checkclear(){
	
	if(delateboard()){
		cleararr(same);//消除所有检测信号量
		setTimeout("checkclear()",changetime);
		return true;
	}
	else{
		lock=false;
	}
	cleararr(same);//消除所有检测信号量
	return false;
}

//递归检查每个单元格
function check(i,j){
	del[i][j]=false;
	if(!same[i][j]){return;}
	sum++;
//	console.log("check"+i+" "+j+" "+same[i][j]+" "+sum);
	same[i][j]=false;
	if((j+1)<=4&&board[i][j]!==0&&board[i][j]===board[i][j+1]&&same[i][j+1]){
		console.log("right");
					check(i,j+1);
				}
	if((j-1)>=0&&board[i][j]!==0&&board[i][j]===board[i][j-1]&&same[i][j-1]){
		console.log("left");
					check(i,j-1);
				}
	if((i+1)<=4&&board[i][j]!==0&&board[i][j]===board[i+1][j]&&same[i+1][j]){
		console.log("down");
					check(i+1,j);
				}
	if((i-1)>=0&&board[i][j]!==0&&board[i][j]===board[i-1][j]&&same[i-1][j]){
		console.log("up");
					check(i-1,j);
				}

}

function delateboard(){
	for(let i=0;i<5;i++){
		for(let j=0;j<5;j++){
			if(same[i][j]){
				check(i,j);
					if(sum>=3){
						energychange(1);
						for(let a=0;a<5;a++){
							for(let b=0;b<5;b++){
							if(!del[a][b]){
							  board[a][b]=0;
							  showremove(a,b);
							  
							  setTimeout("downmove()",300);
     						  setTimeout("updataboard()",updataboardtime);
									}
								}
							}
						cleararr(del);//消除所有消除信号量
			    		sum=0;
						return true;
						}
				cleararr(del);//消除所有消除信号量
				sum=0;
			}
		}
	}
	return false;
}


function downmove(){
	console.log("downmove")
	for(let j=0;j<5;j++){
		for(let i=4;i>=0;i--){
			console.log("check"+i+" "+j)
			for(let k=4;k>i;k--){
				if(board[k][j]===0&&board[i][j]!==0){
					showdownmove(i,j,k,board);
					break;
				}
				
			}
		}
	}
}

function energychange(num){
	energy+=num;
	if(num>0){
		if(energy>5){
			energy=5;
		}else{
				showenergyadd(energy-1);
			}
	}else{
		if(energy<0){
			energy=0;
		}
		else{
			showenergydel(energy);
		}
	}
}
