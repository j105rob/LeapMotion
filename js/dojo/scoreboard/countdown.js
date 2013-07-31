define(["dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container", 
"dijit/_Contained", "dijit/_TemplatedMixin", "dojo/dom-geometry","dojo/_base/array","dojo/text!scoreboard/templates/countdown.html"], 
function(lang, Declare, _WidgetBase, _Container, _Contained, _TemplatedMixin, domGeometry, Array, template) {
	return Declare("scoreboard.countdown", [_WidgetBase, _TemplatedMixin, _Contained, _Container], {
		///
		/// This is the class for the countdown
		///
		templateString : template,
		socket : null,

		constructor : function(args) {
			this.socket = args.socket;
			this.socket.on("timer", lang.hitch(this, this.onTimerMsg));
		},
		buildRendering : function() {
			this.inherited(arguments);
		},
		onTimerMsg : function(obj) {
			this.timerDAP.innerHTML = obj.time
		},		
		onTimerClick: function(e){
			
		},
		postCreate : function() {
			this.inherited(arguments);
		},
		startup : function() {
			this.inherited(arguments);
		}
	});

});