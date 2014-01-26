define(
	[
		"config",
		"../util/sound",
		"../minigames/puzzleGame",
		"../dialog"
	],
	function (config, sound, Puzzle, Dialog) {
		config.triggers = {
			"10,17": function (game, next) {
				if (game.progress > 0)
					next();
				else {
					(new Puzzle(game.renderer, game.drunk, function(result){
						game.bunny.position.y = 11*config.tileHeight;
						game.bunny.position.x = 16*config.tileWidth;
						if(result){
							game.drunk++;
							var musicUrl = "assets/src/Music/OverworldDrunk" + game.drunk + ".mp3";
							if(game.drunk == 1){
								(new Dialog("karrotkingOutroDrunk1", game.stage, game.renderer, function(){


									sound.loadSound(musicUrl, function () {
										sound.switchMusic(musicUrl);
									});
									next();
								})).start();


							}
							else if(game.drunk == 2){

								(new Dialog("karrotkingOutroDrunk2", game.stage, game.renderer, function(){
									sound.loadSound(musicUrl, function () {
										sound.switchMusic(musicUrl);
									});
									next();
								})).start();
							}
							else if(game.drunk == 3){
								(new Dialog("karrotkingOutroDrunk3", game.stage, game.renderer, function(){
									sound.loadSound(musicUrl, function () {
										sound.switchMusic(musicUrl);
									});
									next();
								})).start();
							}
							else if(game.drunk > 3){
								return next();
							}
							game.renderer.view.className = "drunk" + game.drunk;

						}
						else {
							game.progress++;
							(new Dialog("karrotkingOutroWin", game.stage, game.renderer, function(){
								next();
							})).start();
							
						}


					})).start();
				}
			}
		};
	}
);
