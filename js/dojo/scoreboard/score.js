define(["dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container", 
"dijit/_Contained", "dijit/_TemplatedMixin", "dojo/dom-geometry", "dojo/dom-class", "dojo/text!scoreboard/templates/score.html"], function(lang, Declare, _WidgetBase, _Container, _Contained, _TemplatedMixin, domGeometry, domClass, template) {
	return Declare("scoreboard.score", [_WidgetBase, _TemplatedMixin, _Contained, _Container], {
		///
		/// This is the class for the score
		///
		templateString : template,
		args : null,
		team:null,

		constructor : function(args) {
			this.team = args.team;
		},
		buildRendering : function() {
			this.inherited(arguments);
		},
		updateScore : function(score) {
			//NOTE: set all the information/styles on the dojo attach points in the html template
			
			//NOTE: Output the object
			console.log(score)
			
			if (score.name == "undefined"){
				
				//NOTE: Make sure that an actual object is coming down
				
			}else{
			
				//Get updates
				this.nameDAP.innerHTML = score.name;
				this.pointsDAP.innerHTML = score.points;
				this.rods = score.Rods;
				this.valves = score.Valves;
				this.pumps = score.Pumps;
				this.poll = score.Poll;
				this.user = score.Users;
				this.quake = score.Earthquake;
	
				//Store the objects in an array
				var items = new Array();
				items[0] = this.rods;
				items[1] = this.valves;
				items[2] = this.pumps;
				items[3] = this.poll;
				items[4] = this.user;
				items[5] = this.quake;
						
				//domClass.remove(this.iconDAP)
				//domClass.add(this.iconDAP,"stockteam");		
				
				//Set appropriate team image
				switch(this.nameDAP.innerHTML){
					case "Team1":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team1img");	
						break;
					
					case "Team2":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team2img");	
						break;
						
					case "Team3":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team3img");	
						break;
					
					case "Team4":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team4img");	
						break;
					
					case "Team5":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team5img");	
						break;
					
					case "Team6":
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"team6img");	
						break;
						
					default:
						domClass.remove(this.iconDAP)
						domClass.add(this.iconDAP,"stockteam");	
						break;
				}
				
				//Set appropriate status image
				for (var i = 0; i < 6; i++){	
					
					switch(items[i]){
					case 'b':
						//Status: Bad ... Color: Blue
						//console.log("Case B: " + items[i] + " Item: " + i)  
						switch(i){
							case 0:
								domClass.remove(this.rodsDAP)
								domClass.add(this.rodsDAP,"blueball");
								break;
							case 1:
								domClass.remove(this.valvesDAP)
								domClass.add(this.valvesDAP,"blueball");
								break;
							case 2:
								domClass.remove(this.pumpsDAP)
								domClass.add(this.pumpsDAP,"blueball");
								break;
							case 3:
								domClass.remove(this.pollDAP)
								domClass.add(this.pollDAP,"blueball");
								break;
							case 4:
								domClass.remove(this.userDAP)
								domClass.add(this.userDAP,"blueball");
								break;
							case 5:
								domClass.remove(this.quakeDAP)
								domClass.add(this.quakeDAP,"blueball");
								break;
							default:
								break;
						}
						break;
						
					
					case 'g':
						//Status: Good ... Color: Green
						//console.log("Case G: " + items[i] + " Item: " + i)
						switch(i){
							case 0:
								domClass.remove(this.rodsDAP)
								domClass.add(this.rodsDAP,"greenball");
								break;
							case 1:
								domClass.remove(this.valvesDAP)
								domClass.add(this.valvesDAP,"greenball");
								break;
							case 2:
								domClass.remove(this.pumpsDAP)
								domClass.add(this.pumpsDAP,"greenball");
								break;
							case 3:
								domClass.remove(this.pollDAP)
								domClass.add(this.pollDAP,"greenball");
								break;
							case 4:
								domClass.remove(this.userDAP)
								domClass.add(this.userDAP,"greenball");
								break;
							case 5:
								domClass.remove(this.quakeDAP)
								domClass.add(this.quakeDAP,"greenball");
								break;
							default:
								break;
						}
						break;
					
					case 'e':
						//Status: Error ... Color: Red
						//console.log("Case E: " + items[i] + " Item: " + i)
						switch(i){
							case 0:
								domClass.remove(this.rodsDAP)
								domClass.add(this.rodsDAP,"redball");
								break;
							case 1:
								domClass.remove(this.valvesDAP)
								domClass.add(this.valvesDAP,"redball");
								break;
							case 2:
								domClass.remove(this.pumpsDAP)
								domClass.add(this.pumpsDAP,"redball");
								break;
							case 3:
								domClass.remove(this.pollDAP)
								domClass.add(this.pollDAP,"redball");
								break;
							case 4:
								domClass.remove(this.userDAP)
								domClass.add(this.userDAP,"redball");
								break;
							case 5:
								domClass.remove(this.quakeDAP)
								domClass.add(this.quakeDAP,"redball");
								break;
							default:
								break;
						}
						break;
						
					default:
						//console.log("DEFAULT: " + items[i] + " Item: " + i)
						break;
				}
					
				}
			
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

