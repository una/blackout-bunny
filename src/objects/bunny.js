define(
	[
		"pixi",
		"lodash",

		"config",

		"../util/keys"
	],
	function (P, _, config, keys) {
		function Bunny (game) {
			P.Sprite.call(this, P.Texture.fromImage(this.assets[0][0]));
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
			update: function (next) {
				var newPos = {
					x: this.position.x,
					y: this.position.y
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

				if (moving) {
					this.checkCollision(newPos, function (collided) {
						if (!collided) {
							this.position.x = newPos.x;
							this.position.y = newPos.y;
						}
						next();
					}.bind(this));
				}
				else {
					next();
				}
				
			},

			switchFrame: (function () {
				var frameCounters = {},
				    frameDelay = 0;
				
				return function (dir) {
					if (++frameDelay < config.frameDelay)
						return;

					frameDelay = 0;

					
					frameCounters[dir] = frameCounters[dir] || 0
					frameCounters[dir]++;
					//					console.log(frameCounters[dir])
					//					console.log(dir)

					if (this.assets[dir].length <= frameCounters[dir]) {
						frameCounters[dir] = 0;
					}
					
					this.setTexture(P.Texture.fromImage(this.assets[dir][frameCounters[dir]]));
				};
			})(),
			
			checkCollision: function (newPos, next) {
				var maxY = newPos.y + this.height,
				    minY = maxY - config.legHeight,
				    maxX = newPos.x + this.width - config.legXOffset,
				    minX = newPos.x + config.legXOffset,

				    minRow = Math.floor(minY / config.tileHeight),
				    minCol = Math.floor(minX / config.tileWidth),
				    maxRow = Math.floor(maxY / config.tileHeight),
				    maxCol = Math.floor(maxX / config.tileWidth),
				    row = minRow,
				    col = minCol,
				    trigger;

				//				console.log(config.legHeight + ", " + maxY);
				//				console.log(minRow + " - " + maxMinRow + ", " + col + " - " + maxCol);

				if (minX < 0 ||
				    minY < 0 ||
				    maxX > (config.tileWidth * config.world[0].length) ||
				    maxY > (config.tileHeight * config.world.length))
					return next(true);
				
				for (row = minRow; row <= maxRow; row++) {
					for (col = minCol; col <= maxCol; col++) {
						if (!config.passableTiles[config.world[minRow][col]]) {
							return next(true);
						}
					}
				}				


				var triggerLoop;
				triggerLoop = function (r, c, next) {
					//Recursive version of loop
					if (c > maxCol) {
						c = minCol;
						r++;
					}
					if (r > maxRow) {
						return next();
					}
					else {
						return this.game.trigger(r, c, function () {
							return triggerLoop(r, c + 1, next);
						}.bind(this));
					}
				}.bind(this);
				return triggerLoop(minRow, minCol, next);

			}
		});

		return Bunny;
	}
);








