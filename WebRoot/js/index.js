/*全局变量*/
var scene = null;   	//Jtopo：会议详情的scene对象
var stage = null;

var interValId = null;  //循环定时器的ID
/*********GLOBAL_MAP*********/
var meetingIdList = new Array();

/********/
function init(){
	//bufferImage.src = './image/back.png';
	/*var canvas = document.getElementById('meetingDetailInfo'); 
    var stage = new JTopo.Stage(canvas); // 创建一个舞台对象

    var scene = new JTopo.Scene(stage); // 创建一个场景对象
    //scene.alpha = 50;
    scene.background = './image/lightgray_two.jpg';
    //scene.backgroundColor =  'red';
    var circlenode = new JTopo.CircleNode("63000278");    // 创建一个节点
    //node.text='Client';
    circlenode.textPosition = 'Middle_Center';
    circlenode.radius = 30;
    circlenode.font = "18px";
    circlenode.fontColor = "0,0,0";
    circlenode.fillColor = '0,255,0';
    circlenode.setLocation(100,100);    // 设置节点坐标                 
    scene.add(circlenode); // 放入到场景中

    var node = new JTopo.Node("RLY");    // 创建一个节点
    //node.text='Client';
    node.textPosition = 'Middle_Center';
    node.setSize(50,50);
    node.font = "18px";
    node.fontColor = "0,0,0";
    node.fillColor = '7,20,138';
    node.setLocation(200,100);    // 设置节点坐标                 
    scene.add(node); // 放入到场景中

    var link = new JTopo.Link(circlenode, node); // 增加连线
    scene.add(link);

    var circlenode1 = new JTopo.CircleNode("60000278");    // 创建一个节点
    //node.text='Client';
    circlenode1.textPosition = 'Middle_Center';
    circlenode1.radius = 30;
    circlenode1.font = "18px";
    circlenode1.fontColor = "0,0,0";
    circlenode1.fillColor = '255,0,0';
    circlenode1.setLocation(300,50);    // 设置节点坐标                 
    scene.add(circlenode1); // 放入到场景中

    var link1 = new JTopo.Link(node, circlenode1); // 增加连线
    scene.add(link1);

	var mediaParam = document.getElementById('mediaParam');


	circlenode.addEventListener("mouseover",function(event){
   		var html = "<p>123321123</p>";
   		mediaParam.innerHTML = html;
   		mediaParam.style.left = event.clientX+'px';
   		mediaParam.style.top = event.clientY+'px';
   		mediaParam.style.border='1px solid #FFDAB9'; // 设置边框
   		mediaParam.style.background = '#FFDAB9';
        mediaParam.style.position='absolute'; // 为新创建的DIV指定绝对定位
        mediaParam.style.width='200px'; // 指定宽度
        mediaParam.style.height='200px'; // 指定高度
        mediaParam.style.display = 'block';
   });
   circlenode1.addEventListener("mouseover",function(event){
   		var html =	"CPU：<div id='cpu' class='div-inline'>20%</div><br>"+
   					"内存：<div id='mem' class='div-inline'>50%</div><br>"+
   					"流ID：<div id='resource' class='div-inline'>100</div><br>"+
   					"丢包率：<div id='losspack' class='div-inline'>0|0|0</div><br>"+
   					"双向延时：<div id='delay' class='div-inline'>0|0|0|0|0</div><br>"+
   					"网速：<div id='netspeed' class='div-inline'>500</div><br>"+
   					"FEC：<input type='text' class='form-control div-inline' style='width:50px;height:25px'><input type='text' class='form-control div-inline' style='width:50px;height:25px'><br>"+
   					"重发次数：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"码率<input type='text' class='form-control div-inline' style='width:120px;height:25px;'><br>"+
   					"帧率：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"流ID：<div id='resource' class='div-inline'>200</div><br>"+
   					"丢包率：<div id='losspack' class='div-inline'>0|0|0</div><br>"+
   					"双向延时：<div id='delay' class='div-inline'>0|0|0|0|0</div><br>"+
   					"网速：<div id='netspeed' class='div-inline'>500</div><br>"+
   					"FEC：<input type='text' class='form-control div-inline' style='width:50px;height:25px'><input type='text' class='form-control div-inline' style='width:50px;height:25px'><br>"+
   					"重发次数：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"码率<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"帧率：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"流ID：<div id='resource' class='div-inline'>300</div><br>"+
   					"丢包率：<div id='losspack' class='div-inline'>0|0|0</div><br>"+
   					"双向延时：<div id='delay' class='div-inline'>0|0|0|0|0</div><br>"+
   					"网速：<div id='netspeed' class='div-inline'>500</div><br>"+
   					"FEC：<input type='text' class='form-control div-inline' style='width:50px;height:25px'><input type='text' class='form-control div-inline' style='width:50px;height:25px'><br>"+
   					"重发次数：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"码率<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"帧率：<input type='text' class='form-control div-inline' style='width:120px;height:25px'><br>"+
   					"<input type='button' style='width:50px;' value='提交'><br>";
   		mediaParam.innerHTML = html;
   		mediaParam.style.left = event.clientX+'px';
   		mediaParam.style.top = event.clientY+'px';
   		//mediaParam.style.border='1px solid #FFDAB9'; // 设置边框
   		mediaParam.style.background = '#FFDAB9';
        mediaParam.style.position='absolute'; // 为新创建的DIV指定绝对定位
        mediaParam.style.width='200px'; // 指定宽度
        mediaParam.style.height='600px'; // 指定高度
        mediaParam.style.display = 'block';
   });
   stage.click(function(event){
   		mediaParam.style.display = 'none';
   });*/
}
function loopGetSummarView(){
	//初始化页面
	//scene = init_Stage();
	//开始获取概要数据
	getSummaryView();
	setInterval("getSummaryView()",5000);
}
function goodbye(){
	if(meetingIdList.length >= 1){
		//console.info("取消订阅会议："+meetingIdList.pop());
		//cancelSubscribeMeetingInfo(meetingIdList.pop());
		$.each(meetingIdList,function(i,val){
			cancelSubscribeMeetingInfo(val);
		});
	}
}
function getSummaryView(){
	/*ajax({
		  method: 'POST',
		   url: 'JMS.getSummaryView.action',
		   data: {
		   	//TODO:
		       index:1
		   },
		   success: function (response) {
		     showData(response);
		   },
		   complete: function(response){

		   }
		});*/
	$.ajax({
		type : "post",
		url : "JMS.getSummaryView.action",
		dataType : "json",
		data : "index="+1,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			showData(data);
		},
		error : function(request, textStatus, errorThrown) {
			
		/*	if (request.status == 900) {
				window.location.href = "login.jsp";
			}*/
		}
	});
}
function subscribeMeetingInfo(meetingID){
	if(meetingIdList[0] == meetingID){
		console.log("已订阅该会议"+meetingID+",不进行再次订阅");
		return;
	}
	if(meetingIdList.length >= 1){
		//console.info("取消订阅会议："+meetingIdList.pop());
		cancelSubscribeMeetingInfo(meetingIdList.pop());
	}
	$.ajax({
		type : "post",
		url : "JMS.subscribeMeetingInfo.action",
		dataType : "json",
		data : "meetingId="+meetingID,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			//alert("发送订阅"+meetingID+"请求成功，回执信息："+data)
		
			meetingIdList.push(meetingID);   //将已订阅的会议号放入数组
			getMeetingDetailInfo(meetingID);
			interValId = setInterval("getMeetingDetailInfo("+meetingID+")",5000);
		},
		error : function(request, textStatus, errorThrown) {
			
		/*	if (request.status == 900) {
				window.location.href = "login.jsp";
			}*/
		}
		});
}
//如何获取 页面上的会议号
function cancelSubscribeMeetingInfo(meetingID){
	window.clearInterval(interValId);
	$.ajax({
		type : "post",
		url : "JMS.cancelSubscribeMeetingInfo.action",
		dataType : "json",
		data : "meetingId="+meetingID,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			//alert("发送订阅"+meetingID+"请求成功，回执信息："+data);
			//scene.clear();
			//alert("取消订阅"+meetingID+"成功");
			document.getElementById('stage').innerHTML = "";
		},
		error : function(request, textStatus, errorThrown) {
			
		}
		});
}
function getMeetingDetailInfo(meetingID){
	$.ajax({
		type : "post",
		url : "JMS.getMeetingDetailInfo.action",
		dataType : "json",
		data : "index="+1,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			//alert("发送订阅"+meetingID+"请求成功，回执信息："+data);
			showDetailData(data,meetingID);
			
		},
		error : function(request, textStatus, errorThrown) {
			
		}	
		});
}
function ajustMediaParam(meetingID,rscId,FEC_1,FEC_2,retryTimes,bitRate,relayIp,relayPort,userId,spkId){
	$.ajax({
		type : "post",
		url : "JMS.adjustMediaParam.action",
		dataType : "json",
		data : "meetingId="+meetingID+"&resourceId="+rscId+"&FEC_orgiData="+FEC_1+"&FEC_checkData="+FEC_2+"&retryTimes="+retryTimes+"&bitRate="+bitRate+"&relayIp="+relayIp+"&relayPort="+relayPort+"&userId="+userId+"&speakerId="+spkId,
		beforeSend : function() {
			
		},
		complete : function() {
			
		},
		success : function(data) {
			
		},
		error : function(request, textStatus, errorThrown) {
			
		}	
		});
}