//Thanks to Andrew Davis - theandrewdavis.com

define(
	[
		"pixi",
		"lodash"
	],
	function (P, _) {

		function Camera () {}
		_.extend(Camera.prototype, {
			update: function () {
				
			}
		});

		return Camera;
	}
);
