package common;

import java.util.ResourceBundle;

public class CommonStatus {

	public static final String stprcIp;
	public static final int stprcPort;
	public static final String localIp;
	public static final String version;
	static {
		   version = ResourceBundle.getBundle("config").getString("version");
		   stprcIp = ResourceBundle.getBundle("config").getString("stprcIP");
		   stprcPort = Integer.parseInt(ResourceBundle.getBundle("config").getString("stprcPort"));
		   localIp = ResourceBundle.getBundle("config").getString("localIP");
	}
}
