/***********DEFINE*********/
var QUALITY_Red = 1;
var QUALITY_Yellow = 2;
var QUALITY_Green =3;

/***********RGB************/
var RGB_RED = '255,0,0';
var RGB_YELLOW = '255,255,0';
var RGB_GREEN = '0,255,0';
var RGB_BLUE = '0,0,255';  //RELAY节点专属颜色

/*********GLOBAL_MAP*********/
var detailMap = new Map();
var spkAndCanvasMap = new Map();  //key userId, value canvas
var spkAndStageMap = new Map();  //key userId, value stage
var spkAndSceneMap = new Map();  //key userId, value scene
var spkAndNodeMapMap = new Map();	//key userId,value Map;
/*********GLOBAL_VALUE*********/
var speakerDistance = 150;
var relayDistace = 150;
var normalDistance = 100;

var bufferImage = new Image();
var stageWidth_global = null;

function subscribeMeetingResponse(type,response){
	if(type <0 || type >1 || response == null || response == undefined){
		console.log("subscribeMeetingResponse传入参数错误");
		return;
	}
	//TODO:解析response
}
/*function init_Stage(){
	var canvas = document.getElementById('meetingDetailInfo'); 
	
	stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    
	var scene = new JTopo.Scene(stage); // 创建一个场景对象
    //scene.alpha = 50;
    scene.background = './image/back.png';
    //scene.backgroundColor =  'red';
    var mediaParam = document.getElementById('mediaParam');
    mediaParam.style.display = 'none';
    return scene;
}*/
function showData(data){
	if(data == null || data == undefined){
		console.log("showData传入参数错误");
		return ;
	}
	console.info(data);
	//TODO:解析data
	if(data.result == 0){
		var html = "<tr>" +
					"<th>会议号</th>" +
					//"<th>  </th>" +
					"<th>状态</th>" +
					"</tr>";
		var table = document.getElementById("summaryTable");
		$.each(data.ret_info,function(i,val){
			tempstr_quality = analysisMeetingQuality(+val.meetingQuality);
			html += "<tr>" +
					"<td onclick='subscribeMeetingInfo("+val.meetingId+")'>"+val.meetingId+"</td>" +
					//"<td><input type='button' onclick='cancelSubscribeMeetingInfo("+val.meetingId+")' value='x' /></td>"+
					"<td><img src='"+tempstr_quality+"'></img></td>" +
					"</tr>";
		});
		table.innerHTML = html;
	}
	else{
		console.info("概要信息传输有误，不解析");
		return;
	}
}
function analysisMeetingQuality(meetingQuality){
	var tempHtml = "";
	switch(meetingQuality){
		case QUALITY_Red:{
			tempHtml = "image\\red.jpg";
			break;
		}
		case QUALITY_Yellow:{
			tempHtml = "image\\yellow.jpg";
			break;
		}
		case QUALITY_Green:{
			tempHtml = "image\\green.jpg";
			break;
		}
	}
	return tempHtml;
}

/*****全局节点-显示会议号******/
var textNode = new JTopo.TextNode();
textNode.font = 'bold 12px 微软雅黑';
textNode.setLocation(10, 10);
/****************************/
function showDetailData(data,meetingID){
	if(data == null || data == undefined){
		console.log("showDetailData传入参数错误");
		return ;
	}
	//detail_buff = data;
	getUsers(data.ret_info,meetingID);
	//scene.clear(); //清除上次的节点数据
	
	
	//textNode.text = "会议号："+meetingID;
	//scene.add(textNode);
	
	
	
/*	console.info(data);
	//TODO:解析data
	var userInfoList = data.ret_info;
	var client_y_spk = 50;
	var client_y_nromal = 100;
	var relay_y_up = 10;
	var relay_y_down = 10;
	var index_spk = 0;
	var index_normal = 0;
	$.each(userInfoList,function(i,val){
		//val.userId;
		var tmp_Node = null;
		var color = null;
		switch(val.cpuMemStatus){
		case 1:{
			color = RGB_RED;
			break;
		}
		case 2:{
			color = RGB_YELLOW;
			break;
		}
		case 3:{
			color = RGB_GREEN;
			break;
		}
		}
		if(val.isSpk == 1){
			tmp_Node = CreateCircleNode(100+50*(index_spk%2),client_y_spk,30,color,val.userId+"&-25&-5@CPU:"+val.cpu+"&-25&5@内存:"+val.mem+"&-25&15@");
			//console.info("printfTest:"+val.userId+" \n CPU:"+val.cpu+" \n 内存:"+val.mem);
			//TODO:通过Relay列表的发言者ID，获取上行Relay的目的relay（如果有的话）
			//将目的relay连接到上行Relay
			client_y_spk += speakerDistance;
			index_spk++;
		}else{
			tmp_Node = CreateCircleNode(900+50*(index_normal%2),client_y_nromal,30,color,val.userId+"&-25&-5@CPU:"+val.cpu+"&-25&5@内存:"+val.mem+"&-25&15@");
			//TODO:如果不是发言者，
			//判断nodemap中是否有Relay的列表没有的话，
			//创建一个Relay节点，将未发言的人连接到下行Relay上
			client_y_nromal += normalDistance;
			index_normal++;
		}
		var html = "CPU：<div id='cpu' class='div-inline'>"+val.cpu+"</div><br>"+
					"内存：<div id='mem' class='div-inline'>"+val.mem+"</div><br>";
		NodeMap.put(val.userId,tmp_Node);
		scene.add(tmp_Node);
		//var relay_flag = false;
		//html += "<button type='button' class='btn btn-default navbar-btn' onclick='stopIntervalToEdit()'>编辑</button><br>";
		html += "<div class='div-inline'>--------上行--------</div><br>";
		if(val.upInfo != null || val.upInfo != undefined){
		
			$.each(val.upInfo,function(i,val_c){
				var link = null;
					if(!NodeMap.isContain(val_c.upRelay)){
						//console.info("MAP中没有RLY节点");	
						var tmpRlyNode = CreateRectangleNode(400,relay_y_up,120,30,RGB_BLUE,val_c.upRelay);
						NodeMap.put(val_c.upRelay,tmpRlyNode);
						scene.add(tmpRlyNode);
						link = linkNode(scene,tmp_Node,tmpRlyNode,val_c.rscId+"");
						relay_y_up += relayDistace;
					}else{
						scene.add(NodeMap.get(val_c.upRelay));
						link = linkNode(scene,tmp_Node,NodeMap.get(val_c.upRelay),val_c.rscId+"");
					}
					if(val.isSpk != 1){
						scene.remove(link);
						scene.remove(tmpRlyNode);
					}
					//setMediaParam(html,val_c);
					var arrayFEC = val_c.FEC.split("\|");
				    //媒体参数
			    html += "流ID：<div id='resource' class='div-inline'>"+val_c.rscId+"</div><br>"+
			        "丢包率：<div id='losspack' class='div-inline'>"+val_c.lossPack+"</div><br>"+
			        "双向延时：<div id='delayTime' class='div-inline'>"+val_c.delayTime+"</div><br>"+
			        "FEC：<input id='upfec_1"+val_c.rscId+"' type='text' class='form-control div-inline' style='width:50px;height:25px' value='"+arrayFEC[0]+"'/>"+
			              "<input id='upfec_2"+val_c.rscId+"' type='text' class='form-control div-inline' style='width:50px;height:25px' value = '"+arrayFEC[1]+"'/><br>"+
			        "重发次数：<input id='upRetry"+val_c.rscId+"' type='text'  class='form-control div-inline' style='width:120px;height:25px;' value = '"+val_c.retryTimes+"'/><br>"+
			        "码率：<input id='upbitRate"+val_c.rscId+"' type='text' class='form-control div-inline' style='width:120px;height:25px;' value = '"+val_c.bitRate+"'/><br>"+
			    	"<button type='button' class='btn btn-default navbar-btn' onclick=upSubmitParam("+val_c.rscId+","+meetingID+",'"+val_c.upRelay+"',"+val.userId+")>提交</button><br>";
			});
		}
		html += "<div class='div-inline'>--------下行--------</div><br>";
		if(val.downInfo != null || val.downInfo != undefined){
			//console.info("downInfo不为空");
			
			$.each(val.downInfo,function(i,val_c){
				//var recv_num = "recv_"+ index;
				console.info(val_c);
				//for(var i = 0;i < val_c.length;i++){
				var index = 0,
					vari = "recv_"+index;
				 while (val_c[vari] != undefined && val_c[vari].length > 0 ) {
					 $.each(val_c[vari], function(i, val_c_c){
							if(!NodeMap.isContain(val_c_c.downRelay)){
								var tmpRlyNode = CreateRectangleNode(550,relay_y_down,120,30,RGB_BLUE,val_c_c.downRelay);
								NodeMap.put(val_c_c.downRelay,tmpRlyNode);
								scene.add(tmpRlyNode);
								linkNode(scene,tmpRlyNode,tmp_Node,val_c_c.rscId+"");
								relay_y_down += relayDistace;
							}else{
								scene.add(NodeMap.get(val_c_c.downRelay));
								linkNode(scene,NodeMap.get(val_c_c.downRelay),tmp_Node,val_c_c.rscId+"");
							}
							//setMediaParam(html,val_c);
							var arrayFEC = val_c_c.FEC.split("\|");
						    //媒体参数
							html += "流ID：<div id='resource' class='div-inline'>"+val_c_c.rscId+"</div><br>"+
							        "丢包率：<div id='losspack' class='div-inline'>"+val_c_c.lossPack+"</div><br>"+
							        "双向延时：<div id='delayTime' class='div-inline'>"+val_c_c.delayTime+"</div><br>"+
							        "FEC：<input id='downfec_1"+val_c_c.rscId+"_"+index+"' type='text' class='form-control div-inline' style='width:50px;height:25px' value='"+arrayFEC[0]+"'/>"+
							              "<input id='downfec_2"+val_c_c.rscId+"_"+index+"' type='text' class='form-control div-inline' style='width:50px;height:25px' value = '"+arrayFEC[1]+"'/><br>"+
							        "重发次数：<input id='downRetry"+val_c_c.rscId+"_"+index+"' type='text' class='form-control div-inline' style='width:120px;height:25px;' value = '"+val_c_c.retryTimes+"'/><br>"+
							        "码率：<input id='downbitRate"+val_c_c.rscId+"_"+index+"' type='text' class='form-control div-inline' style='width:120px;height:25px;' value = '"+val_c_c.bitRate+"'/><br>"+
									"<button type='button' class='btn btn-default navbar-btn' onclick=downSubmitParam("+index+","+val_c_c.rscId+","+meetingID+",'"+val_c_c.downRelay+"',"+val.userId+","+val_c_c.spkId+")>提交</button><br>";
						});
						index++;
						vari = "recv_" + index;
				 }	    
			});
		}
		//detailMap.put(val.userId, html);
		setNodeEventAndDisplay(val.userId,tmp_Node,html);
		
	});*/
}

function getUsers(userMap,meetingID){
	var stage =  document.getElementById("stage");
	stage.innerHTML = "";
	var spk_Num = 0;		//用于记录发言者个数
	var isHasPaticipant = false;
	$.each(userMap,function(i,val){
		isHasPaticipant = true;
		//判断是否为发言者
		var y = 100,radius = 30,color = null;
		if(val.isSpk == 1){
			spk_Num++;
			switch(val.cpuMemStatus){
				case 1:{
					color = RGB_RED;
					break;
				}
				case 2:{
					color = RGB_YELLOW;
					break;
				}
				case 3:{
					color = RGB_GREEN;
					break;
				}
			}
			//如果是发言者
			
			var tmp_NodeMap = null;
			//创建一个储存节点map的map
			if(!spkAndNodeMapMap.isContain(val.userId)){
				tmp_NodeMap = new Map();
				spkAndNodeMapMap.put(val.userId,tmp_NodeMap);
			}else{
				tmp_NodeMap = spkAndNodeMapMap.get(val.userId);
			}
			
			var scene = createStage(stage,val);
			//在scene上创建发言者节点
			scene.clear();
			//在第一个 场景中 显示 会议号
			if(spk_Num == 1){
				textNode.text = "会议号："+meetingID;
				scene.add(textNode);
			}
			//将节点储存到之前创建的节点map中
			var spkNode = null;
			if(!tmp_NodeMap.isContain(val.userId)){
				spkNode = CreateCircleNode(stageWidth_global*0.05,y,radius,color,val.userId+"|cpu:"+val.cpu+"|mem:"+val.mem);
				tmp_NodeMap.put(val.userId,spkNode);
				//spkNode.layout = {type: 'tree', width:180, height: 100};
				scene.add(spkNode);
			}else{
			//如果节点map中有该节点，则直接从map中拉取节点
				spkNode = tmp_NodeMap.get(val.userId);
				spkNode.fillColor = color;
				spkNode.text = val.userId+"|cpu:"+val.cpu+"|mem:"+val.mem;
				scene.add(spkNode);
			}
			//获取上行信息
			var upRelay = getUpinfo(val,spkNode,scene,tmp_NodeMap,val.userId,meetingID);
			//连接好用户节点和上行relay之后
			//遍历relay信息
			//查找relay信息中该Relay是否有目的relay	
			var topoRlyList = getTopoRelay(val.relayList,upRelay,scene,tmp_NodeMap);
			//根据 Relay列表，遍历userMap，看下行信息中有哪几个用户连在Relay列表的Relay上，连接，显示信息。
			findDownRelayUser(userMap,val.userId,topoRlyList,scene,tmp_NodeMap,meetingID);
			
			//JTopo.layout.layoutNode(scene, spkNode, true);
		}else{
			return;
		}
	
	});
	if(spk_Num == 0 && isHasPaticipant == false){
		stage.innerHTML = "会议号："+meetingID+"，没有发言者且没有参会人";
	}else if(spk_Num == 0){
		stage.innerHTML = "会议号："+meetingID+"，没有发言者";
	}
}
function getUpinfo(userinfo,userNode,scene,tmp_NodeMap,userId,meetingID){
	//获取user的上行媒体信息
	//获取上行relay
	var tmpRlyNode = null;
	var upRelay = null;
	var html = "";
	html += "ID：<div id='userId' class='div-inline'>"+userId+"</div><br>";
	$.each(userinfo.upInfo,function(i,val_c){
		//var link = null;
		upRelay = val_c.upRelay;
		//创建Relay节点
		//连接user节点与Relay节点 
		var linkColor = null;
		switch(val_c.status){
		case 1:{
			linkColor = RGB_RED;
			break;
		}
		case 2:{
			linkColor = RGB_YELLOW;
			break;
		}
		case 3:{
			linkColor = RGB_GREEN;
			break;
		}
		}
			if(!tmp_NodeMap.isContain(upRelay)){
				//console.info("MAP中没有RLY节点");	
				var relayName = getRelayInfo(upRelay);
				tmpRlyNode = CreateRectangleNode(stageWidth_global*0.3,100,145,30,'0,0,255',relayName);
				tmp_NodeMap.put(upRelay,tmpRlyNode);
				scene.add(tmpRlyNode);
				/*if(val_c.status == 3){
					linkNode(scene,userNode,tmpRlyNode,val_c.rscId+"",linkColor,val_c);
					
				}else{
					linkNode(scene,userNode,tmpRlyNode,"rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC,linkColor,val_c);
				}*/
				linkNode(scene,userNode,tmpRlyNode,"rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC,linkColor,val_c);
				//relay_y_up += relayDistace;
			}else{
				scene.add(tmp_NodeMap.get(upRelay));
				//linkNode(scene,userNode,tmp_NodeMap.get(upRelay),"rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC,linkColor);
				/*if(val_c.status == 3){
					linkNode(scene,userNode,tmp_NodeMap.get(upRelay),val_c.rscId+"",linkColor,val_c);
				}else{
					linkNode(scene,userNode,tmp_NodeMap.get(upRelay),"rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC,linkColor,val_c);
				}*/
				linkNode(scene,userNode,tmp_NodeMap.get(upRelay),"rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC,linkColor,val_c);
			}
			html += 
				"流ID：<div id='resource' class='div-inline'>"+val_c.rscId+"</div><br>"+
				"FEC：<input id='upfec_1"+val_c.rscId+"' type='text' class='form-control div-inline' style='width:50px;height:25px'/>"+
            "<input id='upfec_2"+val_c.rscId+"' type='text' class='form-control div-inline' style='width:50px;height:25px' /><br>"+
            "<button type='button' class='btn btn-default navbar-btn' onclick=upSubmitParam("+val_c.rscId+","+meetingID+",'"+val_c.upRelay+"',"+userId+","+val_c.bitRate+","+val_c.retryTimes+")>提交</button><br>";
            
	});
	setNodeEventAndDisplay(userId,userNode,html);
	return upRelay;
}
function getTopoRelay(relayList,upRelay,scene,tmp_NodeMap){
	// 遍历RelayList
	var topoRlyList = new Array();
	var topoRly_y = 10;
	var topoRly_y_down = 60;
	$.each(relayList,function(i,val){
		// 判断RelayList的发言者
		if(val.relayInfo == upRelay){
			topoRlyList.push(val.relayInfo);
			return;
		}else{
			topoRlyList.push(val.relayInfo);
			if(!tmp_NodeMap.isContain(val.relayInfo)){
				var relayName = getRelayInfo(val.relayInfo);
				var Node = CreateRectangleNode(stageWidth_global*0.4,topoRly_y,145,30,'0,0,255',relayName);
				scene.add(Node);
				tmp_NodeMap.put(val.relayInfo,Node);
				linkNode(scene,tmp_NodeMap.get(upRelay),Node,null,RGB_BLUE);
				
			}else{
				scene.add(tmp_NodeMap.get(val.relayInfo));
				//topoRlyList.push(val.relayInfo);
				linkNode(scene,tmp_NodeMap.get(upRelay),tmp_NodeMap.get(val.relayInfo),null,RGB_BLUE);
			}
			topoRly_y += topoRly_y_down;		
		}
	});
	return topoRlyList;
}
function createStage(stage,userInfo){
	var tmp_scene = null;
	var tmp_stage = null;
	var tmp_canvas = null;

	//创建一个canvas
	if(!spkAndCanvasMap.isContain(userInfo.userId)){
		tmp_canvas = document.createElement('canvas');
		//tmp_canvas.setAttribute("class", "col-sm-10"); 
		tmp_canvas.width = stage.offsetWidth;
		stageWidth_global = stage.offsetWidth;
		//console.info(stageWidth_global);
		//globalWidth = stage.offsetWidth;
		tmp_canvas.height = '300';
		spkAndCanvasMap.put(userInfo.userId,tmp_canvas);
		stage.appendChild(tmp_canvas);
	}else{
		tmp_canvas = spkAndCanvasMap.get(userInfo.userId);
		stage.appendChild(tmp_canvas);
	}

	//var stage = new JTopo.Stage(canvas); // 创建一个舞台对象
	if(!spkAndStageMap.isContain(userInfo.userId)){
		tmp_stage = new JTopo.Stage(tmp_canvas); // 创建一个场景对象
		spkAndStageMap.put(userInfo.userId,tmp_stage);
	}else{
		tmp_stage = spkAndStageMap.get(userInfo.userId);
	}
	var mediaParam = document.getElementById('mediaParam');
	tmp_stage.click(function(event){
   		mediaParam.style.display = 'none';
   });
	if(!spkAndSceneMap.isContain(userInfo.userId)){
		tmp_scene = new JTopo.Scene(tmp_stage); // 创建一个场景对象
		tmp_scene.alpha = 50;
		//tmp_scene.backgroundColor = '158,158,158';
		tmp_scene.background = './image/metalGray.jpg';
		spkAndSceneMap.put(userInfo.userId,tmp_scene);
	}else{
		tmp_scene = spkAndSceneMap.get(userInfo.userId);
	}
	
	return tmp_scene;
}
function findDownRelayUser(userMap,userId,topoRlyList,scene,tmp_NodeMap,meetingID){
	//var downUserMap = new Map(); // key: rscId,value: userId
	var clk_y = 10;
	var clk_y_down = 40;
	$.each(userMap,function(i,val){
		var html = "";
		if(val.userId == userId){
			return;
		}
		var color = null;
		switch(val.cpuMemStatus){
		case 1:{
			color = RGB_RED;
			break;
		}
		case 2:{
			color = RGB_YELLOW;
			break;
		}
		case 3:{
			color = RGB_GREEN;
			break;
		}
	}
		var tmp_Node = null;
		if(!tmp_NodeMap.isContain(val.userId)){
			tmp_Node = CreateCircleNode(stageWidth_global*0.9,clk_y,30,color,val.userId+"|cpu:"+val.cpu+"|mem:"+val.mem);
			tmp_NodeMap.put(val.userId,tmp_Node);
			scene.add(tmp_Node);
		}else{
			tmp_Node = tmp_NodeMap.get(val.userId);
			tmp_Node.fillColor = color;
			tmp_Node.text = val.userId+"|cpu:"+val.cpu+"|mem:"+val.mem;
			scene.add(tmp_Node);
		}
		
/*		var tmp_Node = CreateCircleNode(1030,clk_y,30,color,val.userId);
		scene.add(tmp_Node);*/
		html += "ID：<div id='userId' class='div-inline'>"+val.userId+"</div><br>";
		$.each(val.downInfo,function(i,val_c){
				//console.info("前 ： "+JSON.stringify(val.downInfo));
				//console.info("---------------"+val.userId+"--------------------------");
				//var index = 0,
				vari = "recv_"+i;
				
				//while (val_c[vari] != undefined && val_c[vari].length >= 0) {
					//console.info("后 ：  "+JSON.stringify(val_c[vari]));
					//console.info("vari:"+vari);
					
					$.each(val_c[vari], function(i, val_c_c){
						if(val_c_c.result == -1){
							return;
						}
						var linkColor = null;
						switch(val_c_c.status){
						case 1:{
							linkColor = RGB_RED;
							break;
						}
						case 2:{
							linkColor = RGB_YELLOW;
							break;
						}
						case 3:{
							linkColor = RGB_GREEN;
							break;
						}
						}
						$.each(topoRlyList,function(i,val_relay){
							if(userId == val_c_c.spkId){
								if(val_c_c.downRelay == val_relay){
									/*if(val_c_c.status == 1 || val_c_c.status == 2 || val_c_c.emptyAudio >= 1){
										linkNode(scene,tmp_NodeMap.get(val_relay),tmp_Node,"rscId:"+val_c_c.rscId+";loss:"+val_c_c.lossPack+";delay:"+val_c_c.delayTime+";Rate:"+val_c_c.bitRate+";FEC:"+val_c_c.FEC,linkColor,val_c_c);
									}else{
										linkNode(scene,tmp_NodeMap.get(val_relay),tmp_Node,val_c_c.rscId+"",linkColor,val_c_c);
									}	*/
									html += 
										"流ID：<div id='resource' class='div-inline'>"+val_c_c.rscId+"</div><br>"+ 
										"FEC：<input id='downfec_1"+val_c_c.rscId+vari+"' type='text' class='form-control div-inline' style='width:50px;height:25px' />"+
						              	"<input id='downfec_2"+val_c_c.rscId+vari+"' type='text' class='form-control div-inline' style='width:50px;height:25px' /><br>"+
						              	"<button type='button' class='btn btn-default navbar-btn' onclick=downSubmitParam("+val_c_c.rscId+","+meetingID+",'"+val_c_c.downRelay+"',"+val.userId+","+val_c_c.spkId+",'"+vari+"')>提交</button><br>";
									linkNode(scene,tmp_NodeMap.get(val_relay),tmp_Node,"rscId:"+val_c_c.rscId+";loss:"+val_c_c.lossPack+";delay:"+val_c_c.delayTime+";Rate:"+val_c_c.bitRate+";FEC:"+val_c_c.FEC,linkColor,val_c_c);
								}
							}
						});
					});
					
			});
		setNodeEventAndDisplay(val.userId,tmp_Node,html);
		clk_y+=clk_y_down;
	});
}



function  stopIntervalToEdit(){
	//alert("注意，编辑之后一定要点提交！");
	//停止获取信息的定时器
	//window.clearInterval(interValId);
}
//提交上行参数
function upSubmitParam(rscId,meetingID,relay,userId,bitRate,retryTimes){
	var relayParam = relay.split(":");
	
	var FEC_1 = document.getElementById("upfec_1"+rscId).value;
	var FEC_2 = document.getElementById("upfec_2"+rscId).value;
	//var retryTimes = document.getElementById("upRetry"+rscId).value;
	//var bitRate = document.getElementById("upbitRate"+rscId).value;
	//var retryTimes = 10;
	//var bitRate = 800;
	var relayIp = relayParam[0];
	var relayPort = relayParam[1];
	var spkId = userId;
	ajustMediaParam(meetingID,rscId,FEC_1,FEC_2,retryTimes,bitRate,null,0,userId,spkId);
}


//提交下行参数
function downSubmitParam(rscId,meetingID,relay,userId,spkId,vari){
	var relayParam = relay.split(":");
	
	var FEC_1 = document.getElementById("downfec_1"+rscId+vari).value;
	var FEC_2 = document.getElementById("downfec_2"+rscId+vari).value;
	//var retryTimes = document.getElementById("downRetry"+rscId+"_"+index).value;
	//var bitRate = document.getElementById("downbitRate"+rscId+"_"+index).value;
	var relayIp = relayParam[0];
	var relayPort = relayParam[1];
	
	ajustMediaParam(meetingID,rscId,FEC_1,FEC_2,10,800,null,0,userId,spkId);
}