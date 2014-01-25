define(
	[
		"lodash"
	],
	function (_) {
		function PuzzleGame (renderer, done) {
			this.renderer = renderer;
			this.done = done;
		}
		_.extend(PuzzleGame.prototype, {
			run: function () {
				console.log("Starting puzzle game!");
				window.setTimeout(function () {
					console.log("Puzzle game done!");
					this.done();
				}.bind(this), 2000);
			}
		});

		return PuzzleGame;
	}
);
