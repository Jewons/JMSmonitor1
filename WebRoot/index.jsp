<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
  <head>
    <base href="<%=basePath%>">
    
    <title>JMS_monitor</title>
	<!--
	<link rel="stylesheet" type="text/css" href="styles.css">
	-->
<!--   <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"> -->
    <link rel="stylesheet" type="text/css" href="css\bootstrap.css">
    <link rel="stylesheet" type="text/css" href="css\bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="css\bootstrap-theme.css">
    <link rel="stylesheet" type="text/css" href="css\bootstrap-theme.min.css">

    <script type="text/javascript" src="js\JS-LIB\jquery-1.11.2.min.js"></script>
    <script type="text/javascript" src="js\JS-LIB\bootstrap.js"></script>
    <script type="text/javascript" src="js\JS-LIB\bootstrap.min.js"></script>
<!--     <script type="text/javascript" src="js\JS-LIB\npm.js"></script> -->
<!--     <script type="text/javascript" src="js\JS-LIB\jtopo-0.4.8-min.js"></script> -->
	<script type="text/javascript" src="js\JS-LIB\jtopo-0.4.8-min.js"></script>
    <script type="text/javascript" src="js\JS-LIB\ajax.js"></script>
    <script type="text/javascript" src="js\JS-LIB\map.js"></script>
    <script type="text/javascript" src="js\aboutNode.js"></script>
    <script type="text/javascript" src="js\InfoDictionary.js"></script>
    <script type="text/javascript" src="js\viewData.js"></script>
    <script type="text/javascript" src="js\index.js"></script>
    
    <style type="text/css">
      .div-inline{display: inline;}
    </style>
  </head>

  <body onload="loopGetSummarView()" onunload="goodbye()" onbeforeunload="goodbye()">
<!--   <div class="row">
    <div class="col-sm-3 col-md-4">
      <div class="thumbnail">
        <img src="..." alt="...">
        <div class="caption">

        </div>
      </div>
    </div> 
  </div> -->

        <div class="panel panel-default col-sm-2 div-inline" style="height:600;overflow-y:auto;">
      <!-- Default panel contents -->
          <div class="panel-heading" >概要列表</div>
  <!--         <div class="panel-body">
          </div> -->
          <!-- Table -->
            <table id="summaryTable" class="table">
            </table>
            <a href="http://103.25.23.104:20001/webShow/login.jsp"  target="_blank"style="font-size:20px;">Qos历史信息查询<a/>
        </div>
        <div class="panel panel-default col-sm-10 div-inline ">
               <div class="panel-heading">会议详情</div>
                <div id="stage" style="width:100%">
               </div>
               
<!--                <canvas id="spk0" width="1090" height="300"></canvas>
               <canvas id="spk1" width="1090" height="300"></canvas>
               <canvas id="spk2" width="1090" height="300"></canvas>
               <canvas id="spk3" width="1090" height="300"></canvas> -->
        </div>
        <div id="mediaParam" class="row pre-scrollable">
        </div>
  </body>
</html>