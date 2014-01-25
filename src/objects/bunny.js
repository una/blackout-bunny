define(
	[
		"pixi",
		"lodash",

		"config",

		"../util/keys"
	],
	function (P, _, config, keys) {
		function Bunny () {
			P.Sprite.call(this, P.Texture.fromImage(this.assets[0][0]));
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
			update: function () {
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

				if (moving && !(collision = this.checkCollision(newPos))) {					
					this.position.x = newPos.x;
					this.position.y = newPos.y;
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
			
			checkCollision: function (newPos) {
				var maxY = newPos.y + this.height,
				    minY = maxY - config.legHeight,
				    maxX = newPos.x + this.width - config.legXOffset,
				    minX = newPos.x + config.legXOffset,

				    row = Math.floor(minY / config.tileHeight),
				    col = Math.floor(minX / config.tileWidth),
				    maxRow = Math.floor(maxY / config.tileHeight),
				    maxCol = Math.floor(maxX / config.tileWidth);

//				console.log(config.legHeight + ", " + maxY);
//				console.log(row + " - " + maxRow + ", " + col + " - " + maxCol);

				if (minX < 0 ||
				    minY < 0 ||
				    maxX > (config.tileWidth * config.world[0].length) ||
				    maxY > (config.tileHeight * config.world.length))
				    return true;
				
				while (row <= maxRow) {
					while (col <= maxCol) {
						if (!config.passableTiles[config.world[row][col]]) {
							console.log("width: " + this.width, "height: " + this.height);
							return true;
						}
//						else
//							console.log(config.world[row][col] + " is passable");
						col++;
					}
					row++;
				}				
				
				return false;

			}
		});

		return Bunny;
	}
);








