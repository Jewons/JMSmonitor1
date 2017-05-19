function getRelayInfo(relayIp){
	var relayMap = new Map();
	relayMap.put("210.51.168.102:20026","北京联通");
	relayMap.put("114.112.74.7:20023","北京电信");
/*	relayMap.put("112.65.213.217:20026","上海 联通");
	relayMap.put("180.153.194.185:20023","上海电信");*/
	relayMap.put("122.13.78.228:20026","广东联通");
	relayMap.put("125.88.254.161:20023","广东电信");
	relayMap.put("125.211.202.30:20026","哈尔滨联通");
	relayMap.put("222.171.242.144:20023","哈尔滨电信");
	relayMap.put("123.138.91.26:20026","西安联通");
	relayMap.put("124.116.176.117:20023","西安电信");
	relayMap.put("220.249.119.219:20026","武汉联通");
	relayMap.put("61.183.245.142:20023","武汉电信");
	relayMap.put("221.7.112.76:20026", "重庆联通");
    relayMap.put("222.178.179.75:20023", "重庆电信");
	relayMap.put("175.102.21.37:20026", "上海联通");
    relayMap.put("175.102.8.231:20023", "上海电信");
    
    relayMap.put("111.206.20.107:20026", "北京高配联通 主");
    relayMap.put("114.112.74.3:20023", "北京高配电信 主");
    relayMap.put("111.206.20.106:20026", "北京高配联通 备");
    relayMap.put("114.112.74.2:20023", "北京高配电信 备");
    relayMap.put("121.46.2.24", "广州高配 主");
    relayMap.put("121.46.2.25", "广州高配 备");
	var message = relayMap.get(relayIp);
	if(message!=null&&message !=undefined){
		message += " " + relayIp;
		return message;
	}else{
		return relayIp;
	}
}