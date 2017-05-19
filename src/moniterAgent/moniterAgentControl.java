package moniterAgent;



import common.CommonStatus;
import dao.JMSdao;
import moniterAgentJni.*;;

public class moniterAgentControl {
	JMSdao dao = new JMSdao();
	CommonStatus commonStatus = new CommonStatus();
	
	private static moniterAgentControl control;
	
	private moniterAgentControl(){
		dao = new JMSdao();
	}
	
	public static moniterAgentControl getInstance(){
		if(control == null){
			control = new moniterAgentControl();
		}
		return control;
	}
	

	
	private moniterAgentCBInterface monitorAgentCBInterface = new moniterAgentCBInterface() {	 
		 @Override
		 public void monitorAgent_CallBack(int cmdId,int status,String context) {
			 //接收底层回调
			 //System.out.println("接收底层回调： cmdId="+cmdId+";status="+status+";context:"+context);
			// monitorAgentCBInterface.monitorAgent_CallBack(cmdId, status, context);
			 dao.receiver(cmdId, status, context);
		}
	};
	public void InitMoniter(){
		//设置回调
		System.out.println("初始化回调");
		int ret = moniterAgent_jni.Init(monitorAgentCBInterface);
		if(ret != 0){
			System.out.println("初始化回调失败，"+ret);
			return ;
		}
	}
	public void StartAgentMoniter(){
		System.out.println("启动，设置本地IP");
		int ret = moniterAgent_jni.Start(CommonStatus.stprcIp, CommonStatus.stprcPort, CommonStatus.localIp);
		//startAgent之后开始接收回调的数据。
		if(ret != 0){
			//写日志，启动失败
			System.out.println("启动Agent失败");
		}
	}
	public void Stop(){ 
		moniterAgent_jni.Stop();
	}
	public String SubscribeMeetingDetailInfo(int meetingId){
		String subscribeInfo = moniterAgent_jni.SubscribeMeetingInfo(meetingId);
		return subscribeInfo;
	}
	public String CancelSubscribeMeetingDetailInfo(int meetingId){
		String cancelSubInfo = moniterAgent_jni.CancelSubscribeMeetingInfo(meetingId);
		return cancelSubInfo;
	}
	public int adjustMediaParam(int meetingId,int userId,int speakerId,int resourceId,int bitRate,int FEC_origiData,int FEC_checkData,int retryTimes,int relayPort,String relayIp){
		//String cancelSubInfo = moniterAgent_jni.CancelSubscribeMeetingInfo(meetingId);
		//moniterAgent_jni.AdjustMediaParam(meetingId, userId, speakerId, relayIp, relayPort, resourceId, FEC_origiData, FEC_checkData, retryTimes, bitRate);
		return moniterAgent_jni.AdjustMediaParam(meetingId, userId, speakerId, relayIp, relayPort, resourceId, FEC_origiData, FEC_checkData, retryTimes, bitRate);
		
	}

}
