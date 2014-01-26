define(
	[
		"pixi"
	],
	function (P) {
		function Egg () {
			P.Sprite.call(this, P.Texture.fromImage("mini-game2/egg.png"));
		}
		Egg.prototype = Object.create(P.Sprite.prototype);

		return Egg;
	}
);
