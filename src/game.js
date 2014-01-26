define(
	[
		"pixi",
		"lodash",

		"config",

		"./util/keys",
		"./util/sound",

		"./objects/bunny",


		"./dialog",
		"./configs/triggers"
	],
	function (P, _, config, keys, sound, Bunny, Dialog) {
		function Game () {
			
			this.progress = 0;
			this.drunk = 0;
			this.firstTimeDrunk = true;

			var el = document.createElement('canvas');
			el.id = "bunnyCanvas";
			this.renderer = new P.CanvasRenderer(config.width, config.height, el);
			this.stage = new P.Stage();

			this.background = new P.DisplayObjectContainer();
			this.foreground = new P.DisplayObjectContainer();
			
			this.camView = new P.Rectangle(0, 0, config.width, config.height);
			this.camBoundary = new P.Rectangle(
				config.width / 2,
				config.height / 2,
				config.world[0].length * config.tileWidth - config.width,
				config.world.length * config.tileHeight - config.height
			);
		}
		_.extend(Game.prototype, {
			start: function () {
				//Init PIXI
				var background = new P.RenderTexture(
					config.world[0].length * config.tileWidth,
					config.world.length * config.tileHeight
				),
				    backgroundSprite;

				//Launch main theme
				var soberMusic = "assets/src/Music/OverworldSober.mp3";
				sound.loadSound(soberMusic, function () {
					sound.switchMusic(soberMusic);
				});
				
				//Print background once
				(function () {
					var backgroundStage = new P.Stage(),
					    sprite, row, col;

					for (row = 0; row < config.world.length; row++) {
						for(col = 0; col < config.world[0].length; col++) {

							sprite = new P.Sprite(
								P.Texture.fromImage(
									"tiles/tiles_" + config.world[row][col] + ".png"
								)
							);

							sprite.position.x = col * (config.tileWidth);
							sprite.position.y = row * (config.tileHeight);

							backgroundStage.addChild(sprite);
						}
					}

					background.render(backgroundStage);


				})();

				this.bunny = new Bunny(this)
				
				this.bunny.position.x = 200; //200
				this.bunny.position.y = 450; //100


				backgroundSprite = new P.Sprite(background);

				this.background.addChild(backgroundSprite);
				this.foreground.addChild(this.bunny);

				this.stage.addChild(this.background);
				this.stage.addChild(this.foreground);
				
				document.body.appendChild(this.renderer.view)

				window.requestAnimationFrame(this.frame.bind(this))
			},

			frame: function frame (charSprite) {

				if(this.drunk > 3){
					console.log("RESETTING GAME");
					this.drunk =0;
					this.progress = 0;

					this.bunny.position.x = config.startX;
					this.bunny.position.y = config.startY;
					this.doneIntro = false;
					sound.switchMusic("assets/src/Music/OverworldSober.mp3");
					this.renderer.view.className = "drunk0";
					this.firstTimeDrunk = true;

				}

				var natural = true;
				var frameCount = 0;
				if(this.drunk == 1){
					
					if((Date.now()/1000)- (this.timer/1000) > 10){
						natural =  false;
						this.timer = Date.now();
						if(this.firstTimeDrunk){
						return (new Dialog("drunkStumble", this.stage, this.renderer, function(){
							this.firstTimeDrunk = false;
							window.requestAnimationFrame(frame.bind(this));
						}.bind(this))).start();
					}
						
						
				}
						

				}
				else if(this.drunk == 2){
					if((Date.now()/1000)- (this.timer/1000) > 7.5){
						natural =  false;
						this.timer = Date.now();	
					}
				}
				else if(this.drunk == 3){
					if((Date.now()/1000)- (this.timer/1000) > 5){
						natural =  false;
						this.timer = Date.now();	
					}
				}

				frameCount++;

				this.bunny.update(function () {

					//Camera pan
					var x = this.bunny.position.x,
					    y = this.bunny.position.y,
					    cameraX = this.camView.width / 2 - Math.max(this.camBoundary.x, Math.min(this.camBoundary.x + this.camBoundary.width, x)),
					    cameraY = this.camView.height / 2 - Math.max(this.camBoundary.y, Math.min(this.camBoundary.y + this.camBoundary.height, y));

					this.foreground.position.x = this.background.position.x = cameraX;
					this.foreground.position.y = this.background.position.y = cameraY;

					//				console.log(x + ", " + y)

					this.renderer.render(this.stage);

					if (!this.doneIntro) {
						this.doneIntro = true;
						return (new Dialog("intro", this.stage, this.renderer, function () {
							window.requestAnimationFrame(frame.bind(this));
						}.bind(this))).start();
					}
					
					return window.requestAnimationFrame(frame.bind(this));
				}.bind(this), natural);
			},

			trigger: function (row, col, next) {
				var trigId = row + "," + col;
				if (config.triggers[trigId])
					config.triggers[trigId](this, next);
				else
					next();
			}
		})

		return Game;
	}
);
