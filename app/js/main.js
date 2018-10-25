// JavaScript Document
"use strict";
var board=new Array();//每个格子的值
var same=new Array();//每一个格子都设一个检测信号量
var del=new Array();//每一个格子都设一个消除信号量
var lock=false;//锁住屏幕
var musiclock=true;//消除音乐锁
var sum;//判断有多少格子是连续的
var energy;//能量条
var deltime=0;//消除的次数

var maxboard;//最大单元格数值
var score;//分数
var changetime;//检测时间
var updataboardtime;//更新时间


$(document).ready(function(){
	if(checksize()){init();}
	else{
		$('#main').css("height","500px");
		$('#main').css("width","500px");
		$('#main').css("left",documentWidth/2-250);
		
		$('#header').css("height","300px");
		$('#header').css("width","500px");
		$('#header').css("left",documentWidth/2-250);
		setmainWidth(parseInt($('#main').css("width")));
        init();
	}
	//事件代理 优化
	$('#main').click(function(ev){
　　　　var ev = ev || window.event;
　　　　var evt = ev.target || ev.srcElement;
　　　　if(evt.className.toLowerCase() == 'board'){
		$('#scoreadd').css("display","inherit");
		if(lock)
		return;
		energychange(-1);
		console.log("click");
		lock=true;
		musiclock=false;
		var i=evt.id.charAt(2);
		var j=evt.id.charAt(4);
		board[i][j]++;
		board[i][j]=board[i][j]%99;
		$('#b-'+i+'-'+j).text(board[i][j]);
		$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
		checkclear();
		console.log("OVER");
　　　　}
　　});
});

function start(i){
	console.log("start~");
	$('#page1').css("display","none");
	$('#page3').css("display","none");
	showpage(i);//切页动画
	score=0;//初始分数
	changetime=1300;//消除时间
	updataboardtime=600;//更新时间
	delshowtime=400;//消除时间
	changescore(score);
	lock=false;
}


function startbutton(){
//	try{			
	if(!lock){
		lock=true;
	setTimeout("start(2)",500)
	}
	else
		return;
//	}
//	catch(err){
//		alert("您的浏览器内核版本不支持！");
//		return;
//}

}


//初始化
function init(){
	maxboard=0;
	sum=0;
	energy=5;
	score=0;//初始分数
	changetime=0;//消除时间
	updataboardtime=0;//更新时间
	delshowtime=0;//消除时间
	
	for(var i=0;i<energy;i++){
		$('#e-'+i).css('left',getEleft(i));
		
		board[i]=new Array();
		same[i]=new Array();
		del[i]=new Array();
		for(var j=0;j<5;j++){
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
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
				$('#main').append('<div class="board" id="b-'+i+'-'+j+'"></div>');
			
				if(board[i][j]===0)
				{randomboard(i,j);}
			else if(board[i][j]>maxboard){
				maxboard=board[i][j]
				if(maxboard>8){
					afterscore=maxboard-8;
				}
			}
			
			    $('#b-'+i+'-'+j).css('top',getBtop(i));
			    $('#b-'+i+'-'+j).css('left',getBleft(j));
				$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
			    $('#b-'+i+'-'+j).css('content',board[i][j]);
			    $('#b-'+i+'-'+j).css('font-size',mainWidth*0.15);
			    $('#b-'+i+'-'+j).text(board[i][j]);
			
//		      $('.board').css("height","100px");
//		      $('.board').css("width","100px");
//		      $('.board').css("border-radius","100px");
//		      $('.board').css("font-size","80px");
//		
//		      $('.energy').css("height","40px");
//		      $('.energy').css("width","100px");
//		      $('.energy').css("margin","20px");
		}
	}
}

//初始化随机生成单元格
function initrandom(){
	var randomNumber;
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			randomNumber=Math.random();
			board[i][j]=randomtext(randomNumber);
		}
	}
}

//随机生成单元格
function randomboard(i,j){
	var randomNumber;
	randomNumber=Math.random();
	board[i][j]=randomtext(randomNumber);
}

//单击修改元素值（事件代理后已优化）
//function Bclick(event){
//	var event=event || window.Event
//	var evt=event.target
//	$('#scoreadd').css("display","inherit");
//	if(lock)
//		return;
//	energychange(-1);
//	console.log("click");
//	lock=true;
//	musiclock=false;
//	var i=evt.id.charAt(2);
//	var j=evt.id.charAt(4);
//	board[i][j]++;
//	board[i][j]=board[i][j]%99;
//	$('#b-'+i+'-'+j).text(board[i][j]);
//	$('#b-'+i+'-'+j).css('background-color',getBcolor(board[i][j]));
//	checkclear();
//	console.log("OVER");
//}

//检测是否可以消除
function checkclear(){
	
	if(delateboard()){
		cleararr(same);//消除所有检测信号量
		setTimeout("checkclear()",changetime);
		return true;
	}
	else{
		lock=false;
		musiclock=true;
		deltime=0;
		if(energy<=0){
			gameover();
		}
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

//检测单元格并删除3个相同数量及以上的方块
function delateboard(){
	for(var i=0;i<5;i++){
		for(var j=0;j<5;j++){
			if(same[i][j]){
				check(i,j);
					if(sum>=3){
						del[i][j]=true;
						energychange(1);
						score+=board[i][j]*sum*10;
						showscoreadd(board[i][j]*sum*10);
						showbig(i,j,board);
						deltime++;
						for(var a=0;a<5;a++){
							for(var b=0;b<5;b++){
							if(!del[a][b]){
							  board[a][b]=0;
							  showremove(a,b);
							  
									}
								}
							}
							if(!musiclock){
								   $('#xiaochumusic')[0].play();
							       delmusic(deltime);
							}
						  setTimeout("downmove()",300);
						  setTimeout("updataboard()",updataboardtime);
						 changescore(score);
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

//向下移动检测
function downmove(){
	console.log("downmove")
	for(var j=0;j<5;j++){
		for(var i=4;i>=0;i--){
			console.log("check"+i+" "+j)
			for(var k=4;k>i;k--){
				if(board[k][j]===0&&board[i][j]!==0){
					showdownmove(i,j,k,board);
					break;
				}
				
			}
		}
	}
}

//更新能量条
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

function gameover(){
	endscoret(score);
	$('#page2').css("display","none");
	$('#scoreadd').css("display","none");
	
	for(var i=0;i<5;i++){
		showenergyadd(i);
	}
	showpage(3);
	init();
}

function changemusic(){
	$('#scoreadd').css("display","inherit");
	if(musiclock){
		musiclock=false;
		$('#bgmusic')[0].pause();
		$('#scoreadd').text("暂停音乐");
		floatscore();
	}
	else{
		musiclock=true;
		$('#bgmusic')[0].play();
		$('#scoreadd').text("打开音乐");
		floatscore();
	}
}