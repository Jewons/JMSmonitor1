package moniterAgent;


public class moniterAgentThread extends Thread{
	
	private moniterAgentControl control = moniterAgentControl.getInstance();
	public void init(){
		control.InitMoniter();
	}
	public void run(){
		//启动Agent
		control.StartAgentMoniter();
	}
}
