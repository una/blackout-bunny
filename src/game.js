define(
	[
		"pixi",
		"lodash",

		"config",

		"./game"
		//		"./scenes/index"
	],
	function (P, _, config, scenes) {
		function Game () {

		}
		_.extend(Game.prototype, {
			
			start: function () {
				//Init PIXI
				var stage = new P.Stage(),
				    renderer = new P.CanvasRenderer(config.width, config.height),
				    background = new P.RenderTexture(
					    config.world[0].length * config.tileWidth,
					    config.world.length * config.tileHeight
				    ),

				    //sprite = new P.Sprite(P.Texture.fromImage("tempBoxRed.png")),
				    ii,
				    spriteNum = 0,
				    spriteFile,
				    sprite;

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

				var backgroundSprite = new P.Sprite(background);
				stage.addChild(backgroundSprite);
				
				document.body.appendChild(renderer.view)

				renderer.render(stage);
				
				
			},

			cutscene: function () {
			}
		})

		return Game;
	}
);
