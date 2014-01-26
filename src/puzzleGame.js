define(
	[
	"pixi",
	"config",
	"./util/keys",

	],

	function(P, config, keys){
		function puzzleGame(callBack){
			minigame.apply(this, arguments);

			this.spots = [];
			this.items = [];
			this.backgroundImage = new P.Sprite(P.Texture.fromImage("test.png"));
			this.callBack = callBack;
			this.cursor = new item(this, P.Sprite(P.Texture.fromImage("cursor.png"));
			this.cursorCounter = 0;

			this.start();
			this.startTime = (Date.now()/1000);





		}

		puzzleGame.prototype = new minigame();

		puzzleGame.prototype.start = function(){
			this.generatePuzzle();
			this.displayPuzzle();

			this.cursor.position = new P.Point(this.items[this.cursorCounter].position.x-5, this.items[this.cursorCounter].position.y-5);
			this.cursor.linkedItem = this.items[this.cursorCounter];



			this.puzzleStage.addChildAt(1, this.cursor);

			window.requestAnimationFrame(this.animate.bind(this))




		}

		puzzleGame.prototype.animate = function(){
			this.renderer.render(this.stage);

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
			else if(keys["space"]){

				if(Math.abs(this.cursor.linkedItem.position.x - this.cursor.linkedItem.spot.x) < 20
				&& Math.abs(this.cursor.linkedItem.position.y - this.cursor.linkedItem.spot.y) < 20){
					console.log("CORRECT SPOT!");
					this.items[this.cursorCounter].placed = true;
					this.cursorCounter++;
					if(this.cursorCounter > this.items.length){
						this.cursorCounter = -0;
					}

					this.cursor.position = new P.Point(this.items[this.cursorCounter].position.x-5, this.items[this.cursorCounter].position.y-5);
					this.cursor.linkedItem = this.items[this.cursorCounter];

				}

			}

			this.checkPuzzle();
			if(this.checkPuzzle){

				this.gameState = true;
				this.gameOver = true;
			}
			else if(this.startTime - (Date.now()/1000) > 30){
				this.gameState = false;
				this.gameOver = true;
			}



			if(this.gameOver)
			{
				return this.callBack(this.gameState);
			}
			else
				window.requestAnimationFrame(this.animate.bind(this));
		}



		puzzleGame.prototype.generatePuzzle = function(){


		//First generate the possible positions that can be filled, so:
		//There are 10 possible spots, of which 7 will be used
			var spotCounter = 0;
			while(spotCounter < 7){
				var tempSpot = Math.floor(Math.random()*10);
				var inList = false;
				for(var i = 0; i <this.spots.length;i++){

					if(this.spots[i].id == tempSpot){
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
		var checked = true;
		for(var ii =0; ii< this.items.length;ii++){
			if(!this.items[ii].placed){
				checked = false;
				break;
			}
		}
		return checked;
	}

	puzzleGame.prototype.displayPuzzle = function(){

		

		this.puzzleStage = new P.Stage();

		this.puzzleStage.addChild(this.backgroundImage);

		for(var ii =0; ii< this.items.length; ii++){
			this.items[ii].position = new P.Point(this.items[ii].spot.x, this.items[ii].spot.y);

			this.puzzleStage.addChild(this.items[ii]);


		}

		this.renderer.render(this.puzzleStage);

		setTimeout(this.displayPlayerView(), 3000);






	}

	puzzleGame.prototype.displayPlayerView = function(){
		//TODO
		setTimeout(function(){
			this.flashStage = new P.Stage(0x000000);
			this.renderer.render(this.flashStage);

			setTimeout(function(){
				for(var ii=0;ii< this.items.length;ii++){
					this.items[ii].position = new P.Point((Math.random()*300)+500, Math.random()*250);
				}
				this.renderer.render(this.puzzleStage);

			},1000);
		}, 1000);

	}



	function item(spot, id){
		P.Sprite.call(this, P.Texture.fromImage("object-" + id + ".png"));
		this.spot = spot;
		this.placed = false;


	}

	item.prototype = Object.create(P.Sprite.prototype);

}



)