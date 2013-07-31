define(["dojo/_base/lang", "dojo/_base/declare", "dojo/Evented","dojox/socket"], function(lang, Declare, Evented, Socket) {
	return Declare("scoreboard.sockets", [Evented], {
		///
		/// This is the class for standing up all the sockets and dealing with the comms.
		///
		vizSocket : null,
		constructor : function(args) {
			this.vizSocket = new Socket("ws://localhost:9081"); //192.168.2.116
			this.vizSocket.on("message",lang.hitch(this,this.onVizSocketMsg));
		},
		onVizSocketMsg: function(event){
			var obj = JSON.parse(event.data);
			this.emit(obj.cmd,obj);
		}
	});
});
