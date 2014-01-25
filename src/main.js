require.config({
	paths: {
		lodash: "../bower_components/lodash/dist/lodash.underscore.min",
		pixi: "../bower_components/pixi/bin/pixi",
		config: "./config"
	},

	shim: {
		pixi: {
			deps: [],
			exports: 'PIXI'
		}
	}
});

define(
	[
		"pixi",
		
		"./game"
	],
	function (P, Game) {
		var loader = new P.AssetLoader(["assets/tiles.json"])
		loader.onComplete = function () {
			(new Game()).start();
		};

		loader.load();
	}
);
