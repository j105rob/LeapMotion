define(["dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container", "dijit/_Contained",
"dijit/_TemplatedMixin", "scoreboard/twit", "scoreboard/viz", "scoreboard/scores", "scoreboard/socket", 
"scoreboard/leapController", "dojo/text!scoreboard/templates/ui.html"], 
function(lang, Declare, _WidgetBase, _Container, _Contained, _TemplatedMixin, Twit, Viz, Scores, 
	Socket, LeapController, template) {
	return Declare("scoreboard.ui", [_WidgetBase, _TemplatedMixin, _Contained, _Container], {
		///
		/// This is the class for the main UI
		///
		templateString : template,
		args : null, //property ba
		twit : null,
		viz : null,
		score : null,
		socket : null,
		leapControls : null,

		constructor : function(args) {
			this.args = args;
			
			
		},
		buildRendering : function() {
			this.inherited(arguments);
		},
		postCreate : function() {
			this.socket = new Socket({});
			this.leapControls = LeapController();
			this.twit = new Twit({}, this.twitDAP);
			this.viz = new Viz({
				socket : this.socket
			}, this.vizDAP);
			this.leapControls.on("palmPosition", lang.hitch(this, function(palmPosition) {

				this.viz.rotate(palmPosition);
			}));
			this.leapControls.on("palmVelocity", lang.hitch(this, function(palmVelocity) {

				this.viz.zoom(palmVelocity);
			}));
			
			this.score = new Scores({
				socket : this.socket
			}, this.scoreDAP);
			this.inherited(arguments);
		},
		startup : function() {
			this.inherited(arguments);
		}
	});

});
