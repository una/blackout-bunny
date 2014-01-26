define(
	[
		"pixi",
		"lodash",

		"config",

		"../util/keys",

		"./egg",
		"./sheep"
	],
	function (P, _, config, keys, Egg, Sheep) {
		function Bunny (game) {
			P.Sprite.call(this, P.Texture.fromImage(this.assets[2][0]));
			this.game = game;
			console.log("width: " + this.width, "height: " + this.height);
		}

		Bunny.prototype = Object.create(P.Sprite.prototype);
		_.extend(Bunny.prototype, {
			assets: [
				["char-sprites/sprite-b-1.png", "char-sprites/sprite-b-2.png"],
				["char-sprites/sprite-r-1.png", "char-sprites/sprite-r-2.png", "char-sprites/sprite-r-3.png", "char-sprites/sprite-r-4.png"],
				["char-sprites/sprite-f-1.png", "char-sprites/sprite-f-2.png"],
				["char-sprites/sprite-l-1.png", "char-sprites/sprite-l-2.png", "char-sprites/sprite-l-3.png", "char-sprites/sprite-l-4.png"]
			],
			frameDelay: config.frameDelay,
			update: function (next) {
				var newPos = {
					x: 0,
					y: 0
				},
				    moving = false,
				    collision;

				if (keys["left"] ) {
					newPos.x -= config.speed;
					this.switchFrame(3);
					moving = true;
				}
				else if(keys["right"]) {
					newPos.x += config.speed;
					this.switchFrame(1);
					moving = true;
				}
				else if(keys["up"]) {
					newPos.y -= config.speed;
					this.switchFrame(0);
					moving = true;
				}
				else if(keys["down"]) {
					newPos.y += config.speed;
					this.switchFrame(2);
					moving = true;
				}

				collision = this.checkCollision(newPos);
				if (!collision) {
					this.position.x += newPos.x;
					this.position.y += newPos.y;
				}
				else {
					if (collision instanceof Egg) {
						this.game.takeEgg(collision);
					}
					else if (collision instanceof Sheep) {
						this.game.lose();
					}
				}
			},
			
			checkCollision: function (newPos, moving) {
				var maxY = newPos.y + this.position.y + this.height,
				    minY = maxY - config.legHeight,
				    maxX = newPos.x + this.position.x + this.width - config.legXOffset,
				    minX = newPos.x + this.position.x + config.legXOffset,
				    ii, egg, sheep;

				
				//				console.log(config.legHeight + ", " + maxY);
				//				console.log(minRow + " - " + maxMinRow + ", " + col + " - " + maxCol);

				if (minX < 0 ||
				    minY < 0 ||
				    maxX > (config.tileWidth * config.world[0].length) ||
				    maxY > (config.tileHeight * config.world.length))
					return true;

				for (ii = 0; ii < this.game.eggs.length; ii++) {
					egg = this.game.eggs[ii];
					if (maxX > egg.position.x
					    && minX < egg.position.x + egg.width
					    && maxY > egg.position.y
					    && minY < egg.position.y + egg.height)
						return egg;
				};
//				console.log(this.game.sheep.length);
				for (ii = 0; ii < this.game.sheep.length; ii++) {
					sheep = this.game.sheep[ii];
					if (maxX > sheep.position.x
					    && minX < sheep.position.x + sheep.width
					    && maxY > sheep.position.y
					    && minY < sheep.position.y + sheep.height)
						return sheep;
				};

				return false;
				
			},

			switchFrame: function (dir) {
				this.frameCounters = this.frameCounters || {};
				this.frameDelayItr = this.frameDelayItr || 0;

				console.log(this.frameDelayItr);
				
				if (++this.frameDelayItr < this.frameDelay) {
					return;
				}

				this.frameDelayItr = 0;
				
				this.frameCounters[dir] = this.frameCounters[dir] || 0
				this.frameCounters[dir]++;
				//					console.log(this.frameCounters[dir])
				//					console.log(dir)

				if (this.assets[dir].length <= this.frameCounters[dir]) {
					this.frameCounters[dir] = 0;
				}
				
				this.setTexture(P.Texture.fromImage(this.assets[dir][this.frameCounters[dir]]));
			}

		});

		return Bunny;
	}
);

