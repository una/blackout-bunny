define(
	[
		"config",
		"../minigames/puzzleGame",
		"../dialog"
	],
	function (config, Puzzle, Dialog) {
		config.triggers = {
			"1,1": function (game, next) {
				if (game.progress > 0)
					next();
				else {
					(new Dialog("intro", game.stage, game.renderer, function (result) {
						

						next();
					})).start();
				}
			}
		};
	}
);
