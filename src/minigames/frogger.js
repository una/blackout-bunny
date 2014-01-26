define(
	[
		"pixi",
		"lodash",

		"config",
		"../util/keys",
		"../util/sound",

		"./froggerBunny",
		"./egg",
		"./sheep"
	],
	function (P, _, config, keys, sound, FroggerBunny, Egg, Sheep) {
		function switchFrame (dir) {
			this.frameCounters = this.frameCounters || {};
			this.frameDelayItr = this.frameDelay || 0;
			
			if (++this.frameDelayItr < this.frameDelay)
				return;

			this.frameDelayItr = 0;

			
			this.frameCounters[dir] = this.frameCounters[dir] || 0
			this.frameCounters[dir]++;
			//					console.log(this.frameCounters[dir])
			//					console.log(dir)

			if (this.assets[dir].length <= this.frameCounters[dir]) {
				this.frameCounters[dir] = 0;
			}
			
			this.setTexture(P.Texture.fromImage(this.assets[dir][this.frameCounters[dir]]));
		};


		function Frogger (renderer, drunk, next) {
			this.next = function () {
				sound.switchMusic(this.musicCache);
				next.apply(this, arguments);
			}.bind(this);
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
				var ii, egg, sheep;
				
				this.musicCache = sound.switchMusic("assets/src/Music/MinigameSober.mp3");

				this.stage.addChild(this.bg);
				
				this.eggsLeft = config.frogger.eggs + this.drunk;
				for (ii = 0; ii < this.eggsLeft; ii++) {
					egg = new Egg();
					egg.position.y = 5;
					egg.position.x =
						(((3 * (ii + 1)) % 7) * 100) + 50;

					this.eggs.push(egg);
					this.stage.addChild(egg);
				}

				for (ii = 0; ii < config.frogger.sheepCount * (this.drunk + 1); ii++) {
					sheep = new Sheep();
					this.sheep.push(sheep);
					sheep.init();
					this.stage.addChild(sheep);
				}

//				console.log(this.sheep);
				
				this.stage.addChild(this.bunny);
					
				
				window.requestAnimationFrame(this.frame.bind(this));
			},

			frame: function () {
				this.renderer.render(this.stage);

				this.bunny.update(this, this.eggs, this.sheep);
				_.each(this.sheep, function (s) {
					s.update();
				}, this);
				
				if (this.done) {
					this.next(!this.win)
				}
				else {
					window.requestAnimationFrame(this.frame.bind(this));
				}
			},

			takeEgg: function (egg) {
				this.eggs.splice(this.eggs.indexOf(egg), 1);

				this.stage.removeChild(egg);

				this.bunny.position.y = config.height - this.bunny.height - 5;
				
				if (this.eggs.length == 0) {
					this.done = true;
					this.win = true;
				}
			},

			lose: function () {
				this.done = true;
				this.win = false;
			}

		});

		
		return Frogger;
	}
);

