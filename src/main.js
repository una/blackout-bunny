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

		var loader = new P.AssetLoader(["assets/sprites.json"])
		loader.onComplete = function () {
			(new Game()).start();
		};

		var musicCount = 5;
		_.each(["OverworldSober", "OverworldDrunk1", "OverworldDrunk2", "OverworldDrunk3", "MinigameSober"], function (f) {
			sound.loadSound("assets/src/Music/" + f + ".mp3", function () {
				if (--musicCount == 0)
					loader.load();
			});
		});
	}
);
