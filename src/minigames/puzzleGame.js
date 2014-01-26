define(
	[
		"pixi",
		"config",
		"../util/keys",
		"../util/sound",
		"./minigame",
		"../dialog"
	],

	function(P, config, keys, sound, Minigame, Dialog) {
		function puzzleGame(renderer, drunk, callBack){
			Minigame.apply(this, arguments);

			this.spots = [];
			this.items = [];
			this.drunk = drunk;
			this.backgroundImage = new P.Sprite(P.Texture.fromImage("mini-game1/bg.png"));
			this.callBack = function () {
				sound.switchMusic(this.musicCache);
				callBack.apply(arguments);
			}.bind(this);
			this.cursor = new P.Sprite(P.Texture.fromImage("mini-game1/cursor.png"));
			this.cursorCounter = 0;
			this.text = new P.Text("0000",{font: 'bold 40px Avro', fill: 'black', align: 'center'});
			this.text.position.x = config.width/2;
			this.text.position.y = 50;

		}

		puzzleGame.prototype = new Minigame();

		puzzleGame.prototype.start = function () {
			var puzzleMusic = "assets/src/Music/MinigameSober.mp3";
			sound.loadSound(puzzleMusic, function () {
				this.musicCache = sound.switchMusic(puzzleMusic);
			}.bind(this));

			this.generatePuzzle();
			return this.displayPuzzle(function () {
				window.requestAnimationFrame(this.animate.bind(this))
			}.bind(this));
		}

		puzzleGame.prototype.animate = function () {

			this.timer = config.puzzle.loseTime - Math.floor((Date.now()/1000) - this.startTime);
			this.text.setText(this.timer);



			this.renderer.render(this.puzzleStage);

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

					//Move old item to background
					this.puzzleForeground.removeChild(this.cursor.linkedItem);
					this.puzzleBackground.addChild(this.cursor.linkedItem);

					//Switch items
					this.cursor.linkedItem = this.items[this.cursorCounter];
					this.cursor.position.x = this.cursor.linkedItem.position.x - 5;
					this.cursor.position.y = this.cursor.linkedItem.position.y - 5;

					//Move new item to foreground
					this.puzzleBackground.removeChild(this.cursor.linkedItem);
					this.puzzleForeground.addChild(this.cursor.linkedItem);

				}
			}
			
			if (!keys["space"]) {
				this.debounceSpace = false;
			}
			
			if(this.checkPuzzle()){
				this.gameState = false;
				this.gameOver = true;
			}
			else if( (Date.now() / 1000) - this.startTime > config.puzzle.loseTime) {
				this.gameState = true;
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
			
			while (spotCounter < config.puzzle.items + this.drunk) {
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
			for(var ii = 0; ii < this.items.length; ii++){
				if(!this.items[ii].placed){
					return false;
				}
			}
			return true;
		}

		puzzleGame.prototype.displayPuzzle = function (next) {

			this.puzzleBackground = new P.DisplayObjectContainer();
			this.puzzleForeground = new P.DisplayObjectContainer();
			this.puzzleStage = new P.Stage();
			this.puzzleStage.addChild(this.puzzleBackground);
			this.puzzleBackground.addChild(this.backgroundImage);

			this.puzzleForeground.addChild(this.text);
			this.puzzleForeground.addChild(this.cursor);
			this.cursor.position.x = -999;
			this.cursor.position.y = -999;

			(new Dialog("karrotking", this.puzzleStage, this.renderer, function () {
				
				
				//Add items
				for(var ii = 0; ii< this.items.length; ii++){
					// this.items[ii].position = new P.Point(this.items[ii].spot.x, this.items[ii].spot.y);

					this.items[ii].position.x = this.items[ii].spot.x;
					this.items[ii].position.y = this.items[ii].spot.y;

					this.puzzleBackground.addChild(this.items[ii]);
				}

				this.renderer.render(this.puzzleStage);

				return window.setTimeout(function () {
					return this.displayPlayerView(next)
				}.bind(this), 3000);
			}.bind(this))).start();
		}

		puzzleGame.prototype.displayPlayerView = function (next) {
			return window.setTimeout(function(){
				this.flashStage = new P.Stage(0x000000);
				this.renderer.render(this.flashStage);

				return window.setTimeout(function(){
					for (var ii = 0; ii < this.items.length; ii++) {
						this.items[ii].position.x = (Math.random() * 300) + 400;
						this.items[ii].position.y =  config.height - (Math.random() * 250) - 75;
					}

					//Switch items
					this.cursor.linkedItem = this.items[this.cursorCounter];
					this.cursor.position.x = this.cursor.linkedItem.position.x - 5;
					this.cursor.position.y = this.cursor.linkedItem.position.y - 5;

					//Move new item to foreground
					this.puzzleBackground.removeChild(this.cursor.linkedItem);
					this.puzzleForeground.addChild(this.cursor.linkedItem);
					
					//Kick off the real game
					this.startTime = (Date.now() / 1000);

					this.timerWindow = new P.Sprite(P.Texture.fromImage("mini-game1/timer.png"));
					this.timerWindow.position.x = (config.width/2) - (this.timerWindow.width/2);
					this.timerWindow.position.y = 45;
					this.puzzleStage.addChild(this.timerWindow);

					this.puzzleStage.addChild(this.puzzleForeground);
					
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
