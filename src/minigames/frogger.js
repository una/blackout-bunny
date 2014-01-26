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
				next.apply(arguments);
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
				var ii;
				
				this.musicCache = sound.switchMusic("assets/src/Music/MinigameSober.mp3");

				this.stage.addChild(this.bg);
				
				this.eggsLeft = config.frogger.eggs + this.drunk;
				for (ii = 0; ii < this.eggsLeft; ii++) {
					this.eggs.push(new Egg());
					this.eggs[ii].position.y = 5;
					this.eggs[ii].position.x =
						(((3 * (ii + 1)) % 7) * 100) + 50;

					this.stage.addChild(this.eggs[ii]);
				}

				for (ii = 0; ii < config.sheepCount * (this.drunk + 1); ii++) {
					this.sheep.push(new Sheep());
					this.sheep[ii].init();
					this.stage.addChild(this.sheep[ii]);
				}

				this.stage.addChild(this.bunny);
					
				
				window.requestAnimationFrame(this.frame.bind(this));
			},

			frame: function () {
				this.renderer.render(this.stage);

				this.bunny.update(this, this.eggs, this.sheep);
				_.each(this.sheep, function (s) {
					s.update();
					console.log(s.position.x);
				}, this);
				
				if (this.eggsLeft)
					window.requestAnimationFrame(this.frame.bind(this));
			},

			takeEgg: function (egg) {
				this.eggs.splice(this.eggs.indexOf(egg), 1);

				this.stage.removeChild(egg);

				this.bunny.position.y = config.height - this.bunny.height - 5;
				
				if (this.eggs.length == 0)
					this.next();
			},

			lose: function () {
				this.next(true);
			}

		});

		
		return Frogger;
	}
);

