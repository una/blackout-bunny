define(
	[
		"config",
		"../minigames/puzzleGame"
	],
	function (config, Puzzle) {
		config.triggers = {
			"1,1": function (game, next) {
				if (game.progress > 0)
					next();
				else {
					(new Puzzle(game.renderer, next)).start();
				}
			}
		};
	}
);
