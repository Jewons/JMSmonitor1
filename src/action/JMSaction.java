package action;


import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import dao.JMSdao;
import service.JMSservice;

public class JMSaction extends BaseAction{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//private JMSdao dao;
	
	private int meetingId;
	private int userId;
	private int speakerId;
	private int bitRate;
	private int resourceId;
	private int FEC_orgiData;
	private int FEC_checkData;
	private int retryTimes;
	private int relayPort;
	private String relayIp;
	private JMSservice service = new JMSservice();
	/**
	 * 获取会议概要信息
	 * @return
	 */
	public String getSummaryView(){
		logger.info("进入getSummaryView.action");
		//String temp_String = dao.getMeetingSummaryInfo().toString();
		String a = request.getServerName();
		System.out.println("severName："+a );
		if (isAjax(request)) {
			logger.info("获取Agent回调上来的概要数据："+JMSdao.getMeetingSummaryInfo());
			return renderJsonString(JMSdao.getMeetingSummaryInfo()); 
		}
		return null;
	}
	//TODO:
	public String subscribeMeetingInfo(){
		logger.info("进入subscribeMeetingInfo.action");
		String tmp_String = service.subscribeMeetingDetail(meetingId);
		
		return renderString(tmp_String);
	}
	//TODO:
	public String cancelSubscribeMeetingInfo(){
		logger.info("进入cancelSubscribeMeetingInfo.action");
		String tmp_String = service.cancelSubscribeMeetingDetail(meetingId);
		JMSdao.clearMeetingDetailInfo();
		//getMeetingDetailInfo();
		return renderString(tmp_String);
	}
	public String getMeetingDetailInfo(){
		logger.info("进入getMeetingDetailInfo.action");
		String meetingDetailInfo = JMSdao.getMeetingDetailInfo(meetingId);
		
		/*JSONObject user1 = new JSONObject();
		JSONArray detailArray = new JSONArray();
		detailArray.add(user1);
		JSONObject testJson = new JSONObject();
		testJson.put("ret_info",detailArray );*/
		
		if (isAjax(request)) {
			logger.info("获取Agent回调上来的详情数据："+meetingDetailInfo);
			return renderJsonString(meetingDetailInfo); 
		}
		return null;
	}
	public String adjustMediaParam(){
		logger.info("进入adjustMediaParam.action");
	
		int ret = service.adjustMediaParam(meetingId, userId, speakerId, resourceId, bitRate, FEC_orgiData, FEC_checkData, retryTimes, relayPort, relayIp);
		/*if(ret != 0){
			logger.info("adjustMediaParam.action 修改参数失败");
		}else{
			logger.info("adjustMediaParam.action 修改参数成功");
		}*/
		return null;
	}
	public int getMeetingId() {
		return meetingId;
	}
	public void setMeetingId(int meetingId) {
		this.meetingId = meetingId;
	}
	public int getBitRate() {
		return bitRate;
	}
	public void setBitRate(int bitRate) {
		this.bitRate = bitRate;
	}
	public int getResourceId() {
		return resourceId;
	}
	public void setResourceId(int resourceId) {
		this.resourceId = resourceId;
	}
	public int getFEC_orgiData() {
		return FEC_orgiData;
	}
	public void setFEC_orgiData(int fEC_orgiData) {
		FEC_orgiData = fEC_orgiData;
	}
	public int getFEC_checkData() {
		return FEC_checkData;
	}
	public void setFEC_checkData(int fEC_checkData) {
		FEC_checkData = fEC_checkData;
	}
	public int getRetryTimes() {
		return retryTimes;
	}
	public void setRetryTimes(int retryTimes) {
		this.retryTimes = retryTimes;
	}
	public int getRelayPort() {
		return relayPort;
	}
	public void setRelayPort(int relayPort) {
		this.relayPort = relayPort;
	}
	public String getRelayIp() {
		return relayIp;
	}
	public void setRelayIp(String relayIp) {
		this.relayIp = relayIp;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public int getSpeakerId() {
		return speakerId;
	}
	public void setSpeakerId(int speakerId) {
		this.speakerId = speakerId;
	}
}
