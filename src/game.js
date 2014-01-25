define(
	[
		"pixi",
		"lodash",

		"config",

		"./util/keys",

		"./objects/bunny"
	],
	function (P, _, config, keys, Bunny) {
		function Game () {
			this.renderer = new P.CanvasRenderer(config.width, config.height);
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

				//Print background once
				(function () {
					var backgroundStage = new P.Stage(),
					    sprite, row, col;

					for (row = 0; row < config.world.length; row++) {
						for(col = 0; col < config.world[0].length; col++) {

							sprite = new P.Sprite(
								P.Texture.fromImage(
									"tile" + config.world[row][col] + ".png"
								)
							);

							sprite.position.x = col * (config.tileWidth);
							sprite.position.y = row * (config.tileHeight);

							backgroundStage.addChild(sprite);
						}
					}

					background.render(backgroundStage);


				})();

				this.bunny = new Bunny()
				
				this.bunny.position.x = 600;
				this.bunny.position.y = 100;


				backgroundSprite = new P.Sprite(background);

				this.background.addChild(backgroundSprite);
				this.foreground.addChild(this.bunny);

				this.stage.addChild(this.background);
				this.stage.addChild(this.foreground);
				
				document.body.appendChild(this.renderer.view)

				window.requestAnimationFrame(this.frame.bind(this))
			},

			cutscene: function () {
			},

			frame: function frame (charSprite) {

				this.bunny.update();

				//Camera pan
				var x = this.bunny.position.x,
				    y = this.bunny.position.y,
				    cameraX = this.camView.width / 2 - Math.max(this.camBoundary.x, Math.min(this.camBoundary.x + this.camBoundary.width, x)),
				    cameraY = this.camView.height / 2 - Math.max(this.camBoundary.y, Math.min(this.camBoundary.y + this.camBoundary.height, y));

				this.foreground.position.x = this.background.position.x = cameraX;
				this.foreground.position.y = this.background.position.y = cameraY;

//				console.log(x + ", " + y)

				this.renderer.render(this.stage);

				console.log("frame");
				window.requestAnimationFrame(frame.bind(this));
			}
		})

		return Game;
	}
);
