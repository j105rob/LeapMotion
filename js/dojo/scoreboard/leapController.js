define(["dojo/_base/lang", "dojo/_base/declare", "dojo/Evented"], function(lang, Declare, Evented) {
	return Declare("scoreboard.leap", [Evented], {
		///
		/// This is the class for the Leap Motion Control
		///
		prevFrame : null,
		handLastDirection : null,
		interactionBox : null,
		constructor : function(args) {
			if ( typeof Leap === "undefined") {
				Console.log("Leap JS not defined. Leap functionality not available!!!");
			}
			this.init();
		},
		init : function() {
			console.log("Initializing Leap Motion Control.")
			//hand motion x,y,z we will use for controlling the viz
			var previousFrame;
			var paused = false;
			var pauseOnGesture = false;

			var controllerOptions = {
				enableGestures : true
			};

			var self = this;
			Leap.loop(controllerOptions, function(frame) {
				self.loopHandler(frame);
			}, self);

		},
		start:function(){
			
		},
		loopHandler : function(frame) {
			//do stuff.... emit events with evented.
			//TODO: need to come up with normalized event API for objects.
			
			if (this.prevFrame != null) {
				var translation = frame.translation(this.prevFrame);
				this.emit("translation", translation);
			}
			if (frame.hands.length > 0) {
				this.hands(frame.hands);
			}
			if (this.interactionBox == null) {
				//only need to get one interaction box, since it appears to stay the same.
				this.interactionBox = new Leap.InteractionBox(frame.interactionBox);
				console.log(this.interactionBox);
			}
			this.prevFrame = frame
		},
		hands : function(aryHands) {
			var hand = aryHands[0];

			if (this.prevFrame != null) {
				var translation = hand.translation(this.prevFrame);
				var rotationAxis = hand.rotationAxis(this.prevFrame, 2);
				var rotationAngle = hand.rotationAngle(this.prevFrame);
				//console.log(translation, rotationAxis, rotationAngle);
			};
			var direction = {
				x : hand.direction[0].toFixed(2),
				y : hand.direction[0].toFixed(2),
				z : hand.direction[0].toFixed(2),
			};
			
			if (this.handLastDirection != null) {
				//console.log(this.interactionBox);
			}
			//The center position of the palm in millimeters from the Leap origin.
			var palmPosition = {
				x : hand.palmPosition[0].toFixed(2),
				y : hand.palmPosition[1].toFixed(2),
				z : hand.palmPosition[2].toFixed(2),
			};
			var palmVelocity = {
				x : hand.palmVelocity[0].toFixed(2),
				y : hand.palmVelocity[1].toFixed(2),
				z : hand.palmVelocity[2].toFixed(2),
			};
			var numFingers = 0;
			if (hand.pointables.length > 0) {

					numFingers = hand.pointables.length;
					palmVelocity.fingers = numFingers; 
					palmPosition.fingers = numFingers;

			}
			this.emit("palmPosition", palmPosition);
			this.emit("palmVelocity", palmVelocity);
			
			if (palmVelocity.z > 10){
				console.log(palmVelocity.z);
			}
			if (palmVelocity.z < -10){
				console.log(palmVelocity.z);
			}

			this.handLastDirection = direction;
		}
	});
});

