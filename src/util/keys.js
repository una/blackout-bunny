define(
	[
	],
	function () {
		// Track which keys are pressed.
		var keys = {},
		    specialKeys = {
			    8: "backspace",
			    9: "tab",
			    10: "return",
			    13: "return",
			    16: "shift",
			    17: "ctrl",
			    18: "alt",
			    19: "pause",
			    27: "esc",
			    32: "space",
			    37: "left",
			    38: "up",
			    39: "right",
			    40: "down"
		    },
		    keyName = function (event) {
			    return specialKeys[event.which] || String.fromCharCode(event.which).toLowerCase();
		    };

		window.document.onkeydown = function (evt) {
			evt.preventDefault();
			
			keys[keyName(event)] = true;

			return false;
		}.bind(this);

		window.document.onkeyup = function (event) {
			keys[keyName(event)] = false;
		}.bind(this);

		return keys;

	}
);
