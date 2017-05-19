package service;

import moniterAgent.moniterAgentControl;

public class JMSservice {
	
	moniterAgentControl agentControl = moniterAgentControl.getInstance();
	
	public String subscribeMeetingDetail(int meetingId){
		return agentControl.SubscribeMeetingDetailInfo(meetingId);
	}
	public String cancelSubscribeMeetingDetail(int meetingId){
		return agentControl.CancelSubscribeMeetingDetailInfo(meetingId);
	}
	public int adjustMediaParam(int meetingId,int userId,int speakerId,
									int resourceId,int bitRate,int FEC_origiData,
									int FEC_checkData,int retryTimes,int relayPort,
									String relayIp){
		
		return agentControl.adjustMediaParam(meetingId, userId, speakerId, resourceId, bitRate, FEC_origiData, FEC_checkData, retryTimes, relayPort, relayIp);
	}

}
