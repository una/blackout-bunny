define(
	[
		"pixi",
		"lodash",

		"config",

		"../util/keys"
	],
	function (P, _, config, keys) {
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
			commands: ["left", "right", "up", "down"],

			update: function (next, natural) {
				var newPos = {
					x: 0,
					y: 0
				},
				    moving = false,
				    collision;

				var directions;
				

				Array.prototype.shuffle = function() {
					var input = this;

					for (var i = input.length-1; i >=0; i--) {

						var randomIndex = Math.floor(Math.random()*(i+1));
						var itemAtIndex = input[randomIndex];

						input[randomIndex] = input[i];
						input[i] = itemAtIndex;
					}
					return input;
				}

				if(!natural)
				{
					//get the new random commands
					var holderArray = this.commands;
					directions = this.commands.shuffle();
					this.commands = holderArray;
					console.log(natural);

				}
				else
				{
					directions = this.commands;
					
				}

				// console.log(directions);

				if (keys[directions[0]]) {
					newPos.x -= config.speed;
					this.switchFrame(3);
					moving = true;
				}
				else if(keys[directions[1]]) {
					newPos.x += config.speed;
					this.switchFrame(1);
					moving = true;
				}
				else if(keys[directions[2]]) {
					newPos.y -= config.speed;
					this.switchFrame(0);
					moving = true;
				}
				else if(keys[directions[3]]) {
					newPos.y += config.speed;
					this.switchFrame(2);
					moving = true;
				}
				else if(keys["space"]) {
					var row = Math.floor(this.position.y / config.tileHeight),
					    col = Math.floor(this.position.x / config.tileWidth);
					console.log(row + ", " + col + ", " + config.world[row][col]);
				}

				if (moving) {
					this.checkCollision(newPos, function (collided) {
						if (!collided) {
							this.position.x += newPos.x;
							this.position.y += newPos.y;
						}
						next();
					}.bind(this));
				}
				else {
					next();
				}
				
			},

			switchFrame: function (dir) {
				this.frameCounters = this.frameCounters || {};
				this.frameDelay = this.frameDelay || 0;
				
				if (++this.frameDelay < config.frameDelay)
					return;

				this.frameDelay = 0;

				
				this.frameCounters[dir] = this.frameCounters[dir] || 0
				this.frameCounters[dir]++;
				//					console.log(this.frameCounters[dir])
				//					console.log(dir)

				if (this.assets[dir].length <= this.frameCounters[dir]) {
					this.frameCounters[dir] = 0;
				}
				
				this.setTexture(P.Texture.fromImage(this.assets[dir][this.frameCounters[dir]]));
			},
			
			checkCollision: function (newPos, next) {
				var maxY = newPos.y + this.position.y + this.height,
				    minY = maxY - config.legHeight,
				    maxX = newPos.x + this.position.x + this.width - config.legXOffset,
				    minX = newPos.x + this.position.x + config.legXOffset,

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
						if (!config.passableTiles[config.world[row][col]]) {
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








