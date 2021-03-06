define(
	[
		"pixi",
		"lodash",
		"config"
	],
	function (P, _, config) {

		function Sheep () {
			P.Sprite.call(this, P.Texture.fromImage(this.assets[0][0]));
		}
		Sheep.prototype = Object.create(P.Sprite.prototype);
		_.extend(Sheep.prototype, {
			assets: [
				["mini-game2/sheep-r-0.png","mini-game2/sheep-r-1.png","mini-game2/sheep-r-2.png"],
				["mini-game2/sheep-l-0.png","mini-game2/sheep-l-1.png","mini-game2/sheep-l-2.png"]
			],
			
			init: function () {
				console.log("Restarting a sheep.");
				console.log(this.frameDelay);
				//0 or 1
				this.direction = Math.round(Math.random());

				this.position.x =
					this.direction
					? config.width
					: (0 - this.width);
				this.position.y = Math.floor(Math.random() * 8) * 53 + 119;
				
				this.speed = Math.floor(Math.random() * config.frogger.maxSheepSpeed) + config.frogger.minSheepSpeed;

			},

			switchFrame: function (dir) {
				this.frameCounters = this.frameCounters || {};
				this.frameDelayItr = this.frameDelayItr || 0;
				
				if (++this.frameDelayItr < this.frameDelay)
					return;

				this.frameDelayItr = 0;

				
				this.frameCounters[dir] = this.frameCounters[dir] || 0;
				this.frameCounters[dir]++;

				if (this.assets[dir].length <= this.frameCounters[dir]) {
					this.frameCounters[dir] = 0;
				}
				
				this.setTexture(P.Texture.fromImage(this.assets[dir][this.frameCounters[dir]]));
			},

			frameDelay: config.frogger.sheepFrameDelay,

			update: function () {

				this.switchFrame(this.direction);

				this.position.x += (this.direction ? -1 * this.speed : this.speed)

				if (this.position.x + this.width < 0 || this.position.x > config.width) {
					this.init();
				}
			}
		});

		return Sheep;

	}
);
