define(
	[
	"pixi",
	"lodash",

	"config",

	"./util/keys"
	],
	function (P, _, config, keys) {
		function Game () {
			this.renderer = new P.CanvasRenderer(config.width, config.height);
			this.stage = new P.Stage();
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

				this.charSprite = new P.Sprite(P.Texture.fromImage("sprite-f-1.png"));
				this.charSprite.position.x = 600;
				this.charSprite.position.y = 100;


				backgroundSprite = new P.Sprite(background);
				this.stage.addChild(backgroundSprite);
				this.stage.addChild(this.charSprite);
				
				document.body.appendChild(this.renderer.view)

				window.requestAnimationFrame(this.frame.bind(this))
			},

			cutscene: function () {
			},

			frame: function frame (charSprite) {
				this.renderer.render(this.stage);

				if (keys["left"] ) {
					console.log("left is down this frame.");
					this.charSprite.position.x -= config.speed;
				}
				else if(keys["right"]) {
					console.log("right is down this frame.");
					this.charSprite.position.x += config.speed;
				}
				else if(keys["up"]) {
					console.log("up is down this frame.");
					this.charSprite.position.y -= config.speed;
				}
				else if(keys["down"]) {
					console.log("down is down this frame.");
					this.charSprite.position.y += config.speed;
				}
				
				window.requestAnimationFrame(frame.bind(this));
			}
		})

return Game;
}
);
