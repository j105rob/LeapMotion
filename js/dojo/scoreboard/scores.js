define(["dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container", 
"dijit/_Contained", "dijit/_TemplatedMixin", "dojo/dom-geometry", "scoreboard/score","dojo/_base/array","dojo/text!scoreboard/templates/scores.html"], 
function(lang, Declare, _WidgetBase, _Container, _Contained, _TemplatedMixin, domGeometry, Score, Array, template) {
	return Declare("scoreboard.scores", [_WidgetBase, _TemplatedMixin, _Contained, _Container], {
		///
		/// This is the class for the score
		///
		templateString : template,
		args : null,
		socket : null,
		teams: null,

		constructor : function(args) {
			this.teams ={} //object for team's score widgets
			this.socket = args.socket;
			this.socket.on("score", lang.hitch(this, this.onScoreMsg));
		},
		buildRendering : function() {
			this.inherited(arguments);
		},
		_scoreCompare: function(a,b){
			return parseInt(b.points) - parseInt(a.points);
		},
		onScoreMsg : function(obj) {
			leaderBoard = []
			Array.forEach(obj.scores,lang.hitch(this,function(entry,i){
				if (this.teams[entry.name]==null){
					this.teams[entry.name] = new Score({'team':entry.name});
			
				}
				leaderBoard.push(entry);
				//notify the score obj w/ new data
				this.teams[entry.name].updateScore(entry);
			}));
			// need to sort the scores and move the nodes.
			leaderBoard.sort(this._scoreCompare);
			console.log("Leaderboard",leaderBoard);
			for (var i=0; i<leaderBoard.length;i++){
				this.removeChild(this.teams[leaderBoard[i].name]);
				this.addChild(this.teams[leaderBoard[i].name]);
			}
			
			
		},		
		postCreate : function() {
			this.inherited(arguments);
		},
		startup : function() {
			this.inherited(arguments);
		}
	});

});