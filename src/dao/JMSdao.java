package dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.opensymphony.xwork2.util.logging.Logger;
import com.sun.org.apache.bcel.internal.generic.NEW;

import net.sf.json.JSON;
import net.sf.json.JSONObject;


public class JMSdao {
	private static String meetingDetailInfo = new String();
	private static String meetingSummaryInfo = new String();
	private static List<Integer> subscribedMeetingId = new ArrayList<Integer>();
	
	public void addMeetingSummaryInfo(String context){
		//TODO:
		synchronized (meetingSummaryInfo){
			//放入缓存
			//meetingSummaryInfo = temp_meetingSummaryInfo;
			//System.out.println("更新会议概要数据"+meetingSummaryInfo);
			meetingSummaryInfo = context;
		}
	}
	public void addMeetingDetailInfo(String context){
		//TODO:
		//解析数据
		String detailInfo = context;
		//放入缓存
		synchronized (meetingDetailInfo){
			//放入缓存
			//meetingSummaryInfo = temp_meetingSummaryInfo;
			//System.out.println("更新会议详情数据"+meetingDetailInfo);
			meetingDetailInfo = context;
		}
	}
	public static void addMeetingIDtoList(int meetingId){
		subscribedMeetingId.add(meetingId);
	}
	public static void clarMeetingIdList(){
		subscribedMeetingId.clear();
	}
	public static void clearMeetingDetailInfo(){
			meetingDetailInfo = "";
	}
	public static String getMeetingDetailInfo(int meetingId){
		String tempMeetingDetailInfo;
		synchronized (meetingDetailInfo){
			tempMeetingDetailInfo = meetingDetailInfo;
		}
		return tempMeetingDetailInfo;
	}
	/*public JSONObject getMeetingSummryInfo(){
		synchronized (meetingSummaryInfo){
			JSONObject resultJsonObject = new JSONObject();
			if(meetingSummaryInfo != null){
				resultJsonObject.put("result", 0);
				resultJsonObject.put("ret_info", meetingSummaryInfo);
				return resultJsonObject;
			}
			else{
				// -1 表示缓存中没有数据
				resultJsonObject.put("result", -1);
				return resultJsonObject;
			}
		}
	}*/
	public void receiver(int cmdId,int status,String context){
		switch(cmdId){
		//TODO:
			case 0:{
				System.out.println("unkown msg,status:"+status);
				break;
			}
			case 1:{
				System.out.println("Error|"+status);
				break;
			}
			case 3:{
				
				break;
			}
			case 4:{
				//处理数据
				addMeetingSummaryInfo(context);
				break;
			}
			case 5:{
				//处理数据
				addMeetingDetailInfo(context);
				break;
			}
		}
	}
	public static String getMeetingSummaryInfo(){
		String tempMeetingSummaryInfo;
		synchronized(meetingSummaryInfo){
			tempMeetingSummaryInfo = meetingSummaryInfo;
		}
		return tempMeetingSummaryInfo;
	}
}
