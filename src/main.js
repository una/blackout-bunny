require.config({
	paths: {
		lodash: "../bower_comoponents/lodash/dist/lodash.underscore.min",
		pixi: "../bower_components/pixi/bin/pixi"
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
		'pixi'
	],
	function (P) {
		console.log("Loaded with Require.");
	}
);
