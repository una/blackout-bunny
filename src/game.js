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

				    sprite = new P.Sprite(P.Texture.fromImage("tempBoxRed.png"));
				
				document.body.appendChild(renderer.view)

				stage.addChild(sprite);
				renderer.render(stage);
				
				
			},

			cutscene: function () {
			}
		})

		return Game;
	}
);
