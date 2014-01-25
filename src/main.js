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
		
		"./game"
	],
	function (P, Game) {
		var loader = new P.AssetLoader(["assets/sprites.json"])
		loader.onComplete = function () {
			(new Game()).start();
		};

		loader.load();
	}
);
