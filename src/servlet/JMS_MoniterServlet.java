package servlet;

import javax.servlet.http.HttpServlet;

import moniterAgent.moniterAgentThread;

public class JMS_MoniterServlet extends HttpServlet{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	moniterAgentThread moniterTherad = new moniterAgentThread();
	
	public JMS_MoniterServlet(){
		super();
	}
	public void init(){
		System.out.println("初始化并启动Agent线程");
		moniterTherad.init();
		new Thread(moniterTherad).start();
	}
	
}