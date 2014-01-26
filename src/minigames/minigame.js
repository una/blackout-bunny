define(
	[
		"pixi"
	],

	function (P) {
		function minigame(renderer) {

			this.renderer = renderer;
			this.gameOver = false;
			this.gameState = false;

			this.gameStage = new P.Stage();		
		}

		minigame.prototype.run = function(callback) {

			//this.gameState holds the outcome of the game, true if won, false if lost
			callback(this.gameState);

		}

		return minigame;
	}
);
