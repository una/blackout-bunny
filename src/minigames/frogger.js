define(
	[
		"pixi",
		"lodash",

		"config",
		"../util/keys",
		"../util/sound",

		"./froggerBunny"
	],
	function (P, _, config, keys, sound, FroggerBunny) {
		function Frogger (renderer, next) {
			this.next = next;

			this.renderer = renderer;
			this.stage = new P.Stage();
			this.bg = new P.Sprite(P.Texture.fromImage("mini-game2/bg.png"));

			this.sheep = [];
			this.eggs = [];

			this.bunny = new FroggerBunny(this);
		}

		_.extend(Frogger.prototype, {

			start: function () {
//				this.musicCache = sound.switchMusic("assets/src/Music/MinigameSober.mp3");

				console.log("Starting Frogger");
				this.next();
				
			},

			frame: function () {

			}

		});

		return Frogger;
	}
);
		
