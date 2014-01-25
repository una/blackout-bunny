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
		'./game'
	],
	function (P, Game) {
		(new Game()).start();
	}
);
