define(
	[
		"config",
		"../minigames/puzzleGame",
		"../dialog"
	],
	function (config, Puzzle, Dialog) {
		config.triggers = {
			"14,17": function (game, next) {
				if (game.progress > 0)
					next();
				else {
					(new Puzzle(game.renderer, game.drunk, function(result){

						if(result){
							game.drunk++;
							game.renderer.view.className = "drunk" + game.drunk;
						}
						console.log("BEFORE X: " + game.bunny.position.x/config.tileWidth);
						console.log("BEFORE Y: " + game.bunny.position.y/config.tileHeight);
						game.bunny.position.y = 15*config.tileHeight;
						game.bunny.position.x = 17*config.tileWidth;

						console.log("AFTER X: " + game.bunny.position.x/config.tileWidth);
						console.log("AFTER Y: " + game.bunny.position.y/config.tileHeight);




						next();
					}

						
					)).start();
				}
			}
		};
	}
);
