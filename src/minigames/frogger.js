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
		function Frogger (renderer, drunk, next) {
			this.next = next;
			this.drunk = drunk;

			this.renderer = renderer;
			this.stage = new P.Stage();
			this.bg = new P.Sprite(P.Texture.fromImage("mini-game2/bg.png"));

			this.sheep = [];
			this.eggs = [];

			this.bunny = new FroggerBunny(this);
		}

		_.extend(Frogger.prototype, {

			start: function () {
				var ii;
				
				this.musicCache = sound.switchMusic("assets/src/Music/MinigameSober.mp3");
				for (ii = 0; ii < config.frogger.eggs + this.drunk; ii++) {
					this.eggs.push(new Egg());
					this.eggs[ii].position.y = 5;
//					this.eggs[ii].position.x =
//						((3 * (ii + 1)) % 7) * 
				}
				

				window.requestAnimationFrame(this.frame.bind(this));
			},

			frame: function () {
				this.renderer.render(this.stage);

				window.requestAnimationFrame(this.frame.bind(this));
			}

		});

		return Frogger;
	}
);
		
