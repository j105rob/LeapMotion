define(["dojo/_base/lang", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_Container", "dijit/_Contained", "dijit/_TemplatedMixin", "dojo/dom-geometry", "dojo/text!scoreboard/templates/viz.html"], function(lang, Declare, _WidgetBase, _Container, _Contained, _TemplatedMixin, domGeometry, template) {
	return Declare("scoreboard.viz", [_WidgetBase, _TemplatedMixin, _Contained, _Container], {
		///
		/// This is the class for the 3djs viz
		///
		templateString : template,
		args : null,
		socket : null,

		constructor : function(args) {
			this.socket = args.socket;
			this.socket.on("graph", lang.hitch(this, this.onVizMsg));
			this.rendered = false;
		},
		buildRendering : function() {
			this.inherited(arguments);
		},
		onVizMsg : function(obj) {

			var srcNode = this.graph.addNode(new $3DJS.Node({
				id : obj.srcaddr,
				color : [1.0, 1.0, 1.0, 1.0],
				size : 20,
				imageUrl : "textures/deathstar.png"
			}));

			var dstNode = this.graph.addNode(new $3DJS.Node({
				id : obj.dstaddr,
				color : [1.0, 1.0, 1.0, 1.0],
				size : 20,
				imageUrl : "textures/deathstar.png"
			}));

			this.graph.addEdge({
				source : this.graph.nodes[this.graph.nodeLookupArray[obj.srcaddr]],
				dest : this.graph.nodes[this.graph.nodeLookupArray[obj.dstaddr]],
			});

			//Determine particle size
			var particleSize = ((obj.bytes) / 100)
			if (particleSize > 20) {
				particleSize = 20 //Sets a limit on size, because anything over 20 is TOO big
			}

			/*
			 //Determine particle speed
			 var particleSpeed
			 var speedDict = {1:8, 2:7, 3:6, 4:5, 5:4, 6:3, 7:2, 8:1,
			 9:0.9, 10:0.8, 11:0.7, 12:0.6, 13:0.5,
			 14:0.4, 15:0.3, 16:0.2, 17:0.2, 18:0.1,
			 19:0.1, 20:0.1}
			 particleSpeed = (speedDict[Math.round(particleSize)])
			 if (particleSpeed > 20){
			 particleSpeed = 0.1
			 }else if(particleSpeed < 1){
			 particleSpeed = 10
			 }
			 */

			var particle = {
				color : [1.0, 1.0, 1.0, 1.0],
				size : particleSize,
				speed : 0.8,
				source_position : this.graph.nodes[this.graph.nodeLookupArray[obj.srcaddr]].position,
				dest_position : this.graph.nodes[this.graph.nodeLookupArray[obj.dstaddr]].position
			};

			this.graph.nodeObj.updateVertexBuffers();
			this.graph.edgeObj.updateVertexBuffers();

			if (!this.rendered) {
				this.graph.render();
				this.rendered = true;
			}
			this.graph.particleSystem.emitParticle(particle);
		},

		postCreate : function() {

			var g_rotScene = false;
			var g_rotSpeed = 0.1;

			$3DJS.init({
				domNode : this.domNode,
				width : 1400,
				backgroundColor : [0.0, 0.0, 0.0, 1.0],
				userInputHandler : function() {

					if (this.currentlyPressedKeys[51]) {// 3
						g_rotScene = false;
					}

					if (this.currentlyPressedKeys[52]) {// 4
						g_rotScene = true;
					}

					if (g_rotScene) {// rotate the scene if true
						var quat = new quat4();
						var rotationMatrix = mat4.create();

						quat.axisAngleToQuat(g_rotSpeed, this.transform[1], this.transform[5], this.transform[9]);
						this.rotation = quat.multiply(this.rotation);

						quat.axisAngleToQuat(g_rotSpeed, this.transform[0], this.transform[4], this.transform[8]);
						this.rotation = quat.multiply(this.rotation);

						this.updateRotation();
					}
				}
			});
			this.marginbox = domGeometry.getMarginBox(this.domNode);

			this.graph = new $3DJS.Graph({
				edgeColor : [0.7, 0.7, 0.7, 1.0],
				animateEdges : true,
				autoUpdateBuffers : false, // prevents vertex buffers to be updated each time a new node or edge is added (faster loading)
				nodeLabelColor : "#CCCCCC",
				nodeLabelSize : 3.0,
				nodeLabelOffset : {
					x : 0,
					y : -20
				},
				renderNodeLabels : true,
				layout : {
					edgeLength : 160, //160
					edgeStiffness : 0.008, //0.008
					charge : -30,
					damping : 0.95,
					theta : 0.8,
					stableEnergyThreshold : 10
				}
			});
			//HACK: this is needed until 3djs groks scope
			graph = this.graph
			this.g_nodeArray = [];

			this.inherited(arguments);
		},
		startup : function() {
			this.inherited(arguments);
		},
		zoom : function(palmVelocity) {
			//simulates mouse wheel and move
			if (palmVelocity.fingers > 4) {
				if (palmVelocity.z > 25) {
					myZ = 10;
				}
				if (palmVelocity.z < -25) {
					myZ = -10;
				}
				$3DJS.interactor.translation[2] += myZ * 1.0;
				$3DJS.interactor.updateTranslation();
			};
		},
		rotate : function(palmPosition) {
			//simulates left mouse down and move
			if (palmPosition.fingers == 1) {
				$3DJS.interactor.leftMouseDown = true;
				this._rotate(palmPosition);
				$3DJS.interactor.leftMouseDown = false;
			};
			//simulates center mouse down and move
			/*
			if (palmPosition.fingers == 2) {
				$3DJS.interactor.middleMouseDown = true;
				this._rotate(palmPosition);
				$3DJS.interactor.middleMouseDown = false;
			};
			*/
		},
		_rotate : function(palmPosition) {
			$3DJS.interactor.mouseMoving = true;
			

			var currMouseX = palmPosition.x;
			var currMouseY = palmPosition.y;

			var deltaX = currMouseX - $3DJS.interactor.lastMouseX;
			var deltaY = currMouseY - $3DJS.interactor.lastMouseY;

			if ($3DJS.interactor.leftMouseDown) {

				var quat = new quat4();
				var rotationMatrix = mat4.create();

				quat.axisAngleToQuat(-deltaX * 0.2, $3DJS.interactor.transform[1], $3DJS.interactor.transform[5], $3DJS.interactor.transform[9]);
				$3DJS.interactor.rotation = quat.multiply($3DJS.interactor.rotation);

				quat.axisAngleToQuat(-deltaY * 0.2, $3DJS.interactor.transform[0], $3DJS.interactor.transform[4], $3DJS.interactor.transform[8]);
				$3DJS.interactor.rotation = quat.multiply($3DJS.interactor.rotation);

				$3DJS.interactor.updateRotation();

			}

			if ($3DJS.interactor.middleMouseDown) {

				$3DJS.interactor.translation[0] += deltaX * $3DJS.interactor.translationSpeed;
				$3DJS.interactor.translation[1] -= deltaY * $3DJS.interactor.translationSpeed;
				$3DJS.interactor.updateTranslation();

			}

			$3DJS.interactor.lastMouseX = currMouseX;
			$3DJS.interactor.lastMouseY = currMouseY;
		}
	});

});
