package moniterAgentJni;



public class moniterAgent_jni {

	
	
	public final static native int Init(moniterAgentCBInterface cb);
	public final static native int Start(String stprcIP,int stprcPort,String localIp);
	public final static native int Stop();
	public final static native String SubscribeMeetingInfo(int meetingId);
	public final static native String CancelSubscribeMeetingInfo(int meetingId);
	public final static native int AdjustMediaParam(int meetingId,
													int userId,
													int speakerId,
													String RelayIp,
													int RelayPort,
													int resourceId,
													int FEC_origiData,
													int FEC_checkData,
													int retryTimes,
													int bitRate);

	static{
			String path = System.getProperty("java.library.path");
			System.out.println(path);
			System.loadLibrary("MoniterAgent_jni");
		}
	
}

