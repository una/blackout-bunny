define(
	[
		"pixi",
		"config",
		"../util/keys",
		"./minigame"
	],

	function(P, config, keys, Minigame){
		function puzzleGame(renderer, callBack){
			Minigame.apply(this, arguments);

			this.spots = [];
			this.items = [];
			this.backgroundImage = new P.Sprite(P.Texture.fromImage("mini-game1/bg.png"));
			this.callBack = callBack;
			this.cursor = new P.Sprite(P.Texture.fromImage("mini-game1/cursor.png"));
			this.cursorCounter = 0;
			this.text = new P.Text("0000",{font: 'bold 40px Avro', fill: 'black', align: 'center'});
			this.text.position.x = config.width/2;
			this.text.position.y = 50;

		}

		puzzleGame.prototype = new Minigame();

		puzzleGame.prototype.start = function () {
			this.generatePuzzle();
			return this.displayPuzzle(function () {
				window.requestAnimationFrame(this.animate.bind(this))
			}.bind(this));
		}

		puzzleGame.prototype.animate = function () {

			this.timer = config.puzzle.loseTime - Math.ceil((Date.now()/1000) - this.startTime);
			this.text.setText(this.timer);

			this.renderer.render(this.puzzleStage);

			this.cursor.position.x = this.items[this.cursorCounter].position.x-5;
			this.cursor.position.y = this.items[this.cursorCounter].position.y-5;
			this.cursor.linkedItem = this.items[this.cursorCounter];

			if(keys["right"]){
				if(!this.cursor.linkedItem.placed){
					this.cursor.position.x += config.speed;
					this.cursor.linkedItem.position.x += config.speed;
				}
			}
			else if(keys["left"]){
				if(!this.cursor.linkedItem.placed){
					this.cursor.position.x -= config.speed;
					this.cursor.linkedItem.position.x -= config.speed;
				}
			}
			else if(keys["up"]){
				if(!this.cursor.linkedItem.placed){
					this.cursor.position.y -= config.speed;
					this.cursor.linkedItem.position.y -= config.speed;
				}
				
			}
			else if(keys["down"]){

				if(!this.cursor.linkedItem.placed){
					this.cursor.position.y += config.speed;
					this.cursor.linkedItem.position.y += config.speed;
				}
				
			}
			else if(keys["space"]) {
				if (!this.debounceSpace) {
					this.debounceSpace = true;
					
					var li = this.cursor.linkedItem;
					if(Math.abs(li.position.x - li.spot.x) < 20
					   && Math.abs(li.position.y - li.spot.y) < 20){
						console.log("CORRECT SPOT!");
						li.placed = true;
						li.position.x = li.spot.x;
						li.position.y = li.spot.y;
					}

					this.cursorCounter++;
					if(this.cursorCounter >= this.items.length){
						this.cursorCounter = 0;
					}
				}
			}
			
			if (!keys["space"]) {
				this.debounceSpace = false;
			}
			
			if(this.checkPuzzle()){
				this.gameState = true;
				this.gameOver = true;
			}
			else if((Date.now()/1000) - this.startTime> config.puzzle.loseTime){
				this.gameState = false;
				this.gameOver = true;
			}

			if(this.gameOver)
				return this.callBack(this.gameState);
			else
				return window.requestAnimationFrame(this.animate.bind(this));
		};

		puzzleGame.prototype.generatePuzzle = function(){

			//First generate the possible positions that can be filled, so:
			//There are 10 possible spots, of which 7 will be used
			var spotCounter = 0,
			    tempSpot,
			    inList,
			    ii;
			
			while (spotCounter < config.puzzle.items) {
				tempSpot = Math.floor(Math.random()*10);
				inList = false;
				for(ii = 0; ii <this.spots.length;ii++){

					if(this.spots[ii] == config.puzzle.spots[tempSpot]){
						inList = true;
						break;
					}
				}

				if(!inList){
					this.spots[spotCounter] = config.puzzle.spots[tempSpot];

					//Next generate all the items tied to a spot
					this.items[spotCounter] = new item(this.spots[spotCounter], spotCounter);

					//Increment spotCounter
					spotCounter++;
				}
			}
		}

		puzzleGame.prototype.checkPuzzle = function(){
			for(var ii =0; ii< this.items.length;ii++){
				if(!this.items[ii].placed){
					return false;
				}
			}
			return true;
		}

		puzzleGame.prototype.displayPuzzle = function (next) {

			this.puzzleStage = new P.Stage();

			//Add bg
			this.puzzleStage.addChild(this.backgroundImage);

			this.puzzleStage.addChild(this.cursor);
			this.cursor.position.x = -999;
			this.cursor.position.y = -999;

			//Add items
			for(var ii =0; ii< this.items.length; ii++){
				// this.items[ii].position = new P.Point(this.items[ii].spot.x, this.items[ii].spot.y);

				this.items[ii].position.x = this.items[ii].spot.x;
				this.items[ii].position.y = this.items[ii].spot.y;

				this.puzzleStage.addChild(this.items[ii]);
			}

			this.renderer.render(this.puzzleStage);

			return window.setTimeout(function () {
				return this.displayPlayerView(next)
			}.bind(this), 3000);
		}

		puzzleGame.prototype.displayPlayerView = function (next) {
			return window.setTimeout(function(){
				this.flashStage = new P.Stage(0x000000);
				this.renderer.render(this.flashStage);

				return window.setTimeout(function(){
					for(var ii=0;ii< this.items.length;ii++){
						this.items[ii].position = new P.Point((Math.random()*300)+500, config.height - Math.random()*250);
					}

					//Kick off the real game
					this.startTime = (Date.now()/1000);
					this.puzzleStage.addChild(this.text);
					return next();
				}.bind(this), 1000);
			}.bind(this), 1000);
		}

		function item(spot, id){
			P.Sprite.call(this, P.Texture.fromImage("mini-game1/object-" + id + ".png"));
			this.spot = spot;
			this.placed = false;
		}

		item.prototype = Object.create(P.Sprite.prototype);


		return puzzleGame;
		
	}
)
