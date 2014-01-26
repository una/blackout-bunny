define(
	[
		"config",
		"../util/sound",
		"../minigames/puzzleGame",
		"../minigames/frogger",
		"../dialog"
	],
	function (config, sound, Puzzle, Frogger, Dialog) {
		function minigameLost (game, next) {
			var musicUrl = "assets/src/Music/OverworldDrunk" + game.drunk + ".mp3";
			game.drunk++;
			game.renderer.view.className = "drunk" + game.drunk;

			if(game.drunk <= 3) {
				return (new Dialog("karrotkingOutroDrunk" + game.drunk, game.stage, game.renderer, function(){

					sound.loadSound(musicUrl, function () {
						sound.switchMusic(musicUrl);
					});
					next();
				})).start();
			}
			else {
				return next();
			}
		};

		config.triggers = {
			"10,17": function (game, next) {
				if (game.progress > 0)
					next();
				else {
					(new Puzzle(game.renderer, game.drunk, function(result){
						game.bunny.position.y = 11*config.tileHeight;
						game.bunny.position.x = 16*config.tileWidth;
						if(result){
							minigameLost(game, next);
						}
						else {
							game.progress++;
							(new Dialog("karrotkingOutroWin", game.stage, game.renderer, function(){
								next();
							})).start();
							
						}
					})).start();
				}
			},

			"8,80": function (game, next) {
				if (game.progress == 1) {
					(new Frogger(game.renderer, game.drunk, function(result){
						console.log("Done Frogger: " + result);
						game.bunny.position.y = 9*config.tileHeight;
						game.bunny.position.x = 80*config.tileWidth;
						if(result){
							return minigameLost(game, next);
						}
						else {
							game.progress++;
							return (new Dialog("froggerOutroWin", game.stage, game.renderer, function(){
								next();
							})).start();
							
						}
					})).start();
				}
				else if (game.progress == 2) {

					//Jump straight to egg hunt
					next();

				}
				else {
					next();
				}
			}

		};
	}
);
