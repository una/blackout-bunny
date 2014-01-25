define(
	[
		"pixi",

		"config",

		"./game",
		"./scenes/index"
	],
	function (P, config, Game, scenes) {
		function App () {

		}

		App.prototype.start = function () {
			//Init PIXI
			var renderer = new P.CanvasRenderer(config.width, config.height)

			document.body.appendChild(renderer.view)

			//Create Game
			var game = new Game(renderer);

			//Create Scenes
			game.addScene(new scenes.Cutscene());
			game.addScene(new scenes.Overworld());
			game.addScene(new scenes.Puzzle());
			game.addScene(new scenes.Frogger());
			game.addScene(new scenes.Snake());
			
			//Start Game
			game.changeScene();
		};

		return App;
	}
);
