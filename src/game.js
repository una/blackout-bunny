define(
	[
		"pixi",
		"lodash",

		"config",

		"./game",
		"./scenes/index"
	],
	function (P, _, config, scenes) {
		function Game () {

		}
		_.extend(Game.prototype, {
			
			start: function () {
				//Init PIXI
				var stage = new P.Stage(),
				    renderer = new P.CanvasRenderer(config.width, config.height)
				
				document.body.appendChild(renderer.view)
				
			}
		})

		return Game;
	}
);
