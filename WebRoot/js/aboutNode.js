/*
*创建节点函数 x,y为位置 width,height为长宽，radius为半径,color为填充颜色，text为显示文本
*/
function CreateRectangleNode(x,y,width,height,color,text,status){
	
	var node = new JTopo.Node(text); 
    //node.textPosition = 'Middle_Center';
    //node.textPosition = 'Bottom_Cente';
    //node.setSize(width,height);
    node.font = "18px";
    node.fontColor = "0,0,0";
    //node.fillColor = color;
    //node.alpha = 0.8;
    node.setImage('./image/sever1.png');
    node.setLocation(x,y);    // 设置节点坐标  
 	
    return node;
}
function CreateCircleNode(x,y,radius,color,text){
	var node = new JTopo.CircleNode(text);
	//var node = new JTopo.Node(text);
   // node.textPosition = 'Middle_Center';
	//node.textPosition = 'Bottom_Cente';
	node.radius = 15;
    node.font = "18px";
    node.fontColor = "0,0,0";
    node.fillColor = color;
    //node.alpha = 0.8;
    //node.setImage('./image/client.png');
    node.setLocation(x,y);    // 设置节点坐标
    return node;  
}
/*function changeNodeColor(node,color){
	node.fillColor = color;
}*/
/*function setDivStyle(div){
	div.style.border='1px solid #FFDAB9'; // 设置边框
   	div.style.background = '#FFDAB9';
    div.style.position='absolute'; // 为新创建的DIV指定绝对定位
    div.style.width='200px'; // 指定宽度
    div.style.height='200px'; // 指定高度
}
function setMediaParam(html,data){
	if(data == null || data == undefined || data == ""){
		console.info("媒体参数为空");
		return;
	}
	var arrayFEC = data.FEC.split("\|");
	    //媒体参数
    html += "流ID：<div id='resource' class='div-inline'>"+data.rscId+"</div><br>"+
        "丢包率：<div id='losspack' class='div-inline'>"+data.lossPack+"</div><br>"+
        "FEC：<input type='text' class='form-control div-inline' style='width:50px;height:25px' value='"+arrayFEC[0]+"'/>"+
              "<input type='text' class='form-control div-inline' style='width:50px;height:25px' value = '"+arrayFEC[1]+"'/><br>"+
        "码率<input type='text' class='form-control div-inline' style='width:120px;height:25px;' value = '"+data.bitRate+"'/><br>";
    
}*/
function setNodeEventAndDisplay(userId,node,html){
		//var mediaParam = document.getElementById('mediaParam');
		var mediaParam = null;
		
		mediaParam = document.getElementById('mediaParam');
		//mediaParam.style.display = 'none';
		mediaParam.className = "row pre-scrollable";
		//mediaParam.innerHTML = html;
		
		//mediaParam.style.display = 'none';
		node.addEventListener("dbclick",function(event){
			var ele = event || window.event;
            var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
            var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
				mediaParam.innerHTML = html;
				mediaParam.style.left = ele.clientX +scrollX;
				mediaParam.style.top = ele.clientY +scrollY;
				//mediaParam.style.border='1px solid #FFDAB9'; // 设置边框
				mediaParam.style.background = '#7A67EE';
			    //mediaParam.style.position='fixed'; // 为新创建的DIV指定绝对定位
			    mediaParam.style.position='absolute'; // 为新创建的DIV指定绝对定位
			    mediaParam.style.width='200px'; // 指定宽度
			    mediaParam.style.height='auto'; // 指定高度
			    mediaParam.style.display = 'block';
		 });
/*		node.addEventListener("mouseout",function(event){
			mediaParam.style.display = 'none';
		});*/
		 /*  stage.click(function(event){
		   		mediaParam.style.display = 'none';
		   });*/

}
function linkNode(scene,node1,node2,text,color,val_c){
	//var link  = new JTopo.FoldLink(node1,node2,text);
	//var link  = new JTopo.FlexionalLink(node1,node2,text);
	
	var link  = new JTopo.Link(node1,node2,text);
	//link.direction = 'horizontal';
	link.arrowsRadius = 10;
	//link.bundleOffset = 60; // 折线拐角处的长度
	link.bundleGap = 15; // 线条之间的间隔
	link.lineWidth = 2;
	//link.text = text;
	link.strokeColor = color;
	scene.add(link);
	/*if(val_c != undefined || val_c != null){
		link.addEventListener("mouseover",function(event){
			link.text = "rscId:"+val_c.rscId+";loss:"+val_c.lossPack+";delay:"+val_c.delayTime+";Rate:"+val_c.bitRate+";FEC:"+val_c.FEC;
		});
		link.addEventListener("mouseout",function(event){
			link.text = text;
		});
	}*/
	
	return link;
}
function linkFoldNode(scene,node1,node2,text,color){
	var link  = new JTopo.FoldLink(node1,node2,text);
	//var link  = new JTopo.FlexionalLink(node1,node2,text);
	
	//var link  = new JTopo.Link(node1,node2,text);
	//link.direction = 'horizontal';
	link.arrowsRadius = 10;
	//link.bundleOffset = 60; // 折线拐角处的长度
	link.bundleGap = 20; // 线条之间的间隔
	//link.text = text;
	link.strokeColor = color;
	scene.add(link);
	return link;
}
/*function setDivHTML(div,html){
	div.innerHTML = html;
}*/
