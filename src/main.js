require.config({
	paths: {
		lodash: "../bower_components/lodash/dist/lodash.underscore.min",
		pixi: "../bower_components/pixi/bin/pixi",
		config: "./configs/config"
	},

	shim: {
		pixi: {
			deps: [],
			exports: 'PIXI'
		}
	}
});

//Polyfill for animation frame
window.requestAnimationFrame = (function(){
	return window.requestAnimationFrame
		|| window.webkitRequestAnimationFrame
		|| window.mozRequestAnimationFrame
		|| function( callback ){
			window.setTimeout(callback, 1000 / 60);
		};
})();

define(
	[
		"pixi",

		"lodash",
		
		"./game",
		"./util/sound"
	],
	function (P, _, Game, sound) {

		document.getElementById('Play').onclick = function () {
			document.getElementById('Play').className = "hide";
			document.getElementById('splash').className = "hide";
			(new Game()).start();
		};
		
		var loader = new P.AssetLoader(["assets/sprites.json"])
		loader.onComplete = function () {
			document.getElementById("loadingText").className = "hide";
			document.getElementById("Play").className = "";
		};

		var musics = ["OverworldSober", "OverworldDrunk1", "OverworldDrunk2", "OverworldDrunk3", "MinigameSober"],
		    musicCount = 0;
		
		_.each(musics, function (f) {
			sound.loadSound("assets/src/Music/" + f + ".mp3", function () {
				if (++musicCount == musics.length) {
					document.getElementById("loadingText").innerHTML = "Loading images...";
					loader.load();
				}
				else {
					document.getElementById("loadingText").innerHTML = "Loading music (" + Math.floor((musicCount / musics.length) * 100) + "%)..."
				}
			});
		});
	}
);
