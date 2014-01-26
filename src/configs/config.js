define(
	[
	],
	function () {
		return {
			//Canvas size
			width: 800,
			height: 600,

			//Bunny settings
			speed: 3,
			frameDelay: 5,
			legHeight: 35, 
			legXOffset: 10,

			//World construction
			tileWidth: 32,
			tileHeight: 32,
			tileTypes: 132,
			passableTiles: {
				0: true,
				87: true,
				46: true,
				45: true,
				66: true,
				84: true,
				67: true,
				68: true,
				69: true,
			},

			dialog: {
				marginLeft: 10,
				marginBottom: 10,

				script: {

					intro: [
						{
							head: false,
							side: 0,
							lines: [
								"You blacked out again..."
							]
						},
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"Ugh, what happened last night? I must have drank more than I thought. Last thing I remember was doing shots of carrot juice."
							]
						},
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Man, I'm hungry. Let's get some food."
							]
						}
					]


				}

			},
			

			puzzle: {
				spots: [
					{x:50,  y:120},
					{x:145, y:120},
					{x:315, y:120},
					{x:405, y:120},
					{x:580, y:120},
					{x:670, y:120},
					{x:90, y:310},
					{x:200, y:310},
					{x:515, y:250},
					{x:625, y:250}],
				items: 3,
				loseTime: 5
			},
			

			world:
			[
				[87,87,87,87,87,43,87,87,87,87,87,87,87,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,46,46,87,87,87,87,123,124,125,87,87,87,87,87,123,124,125,87,87,87,87,46,46,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43],
				[87,87,87,87,87,44,87,103,104,105,61,87,87,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,46,46,87,87,87,87,117,118,119,87,87,87,43,87,126,127,128,87,43,87,87,46,46,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44],
				[87,87,87,87,87,87,106,107,108,109,87,87,87,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,46,46,87,87,43,87,120,121,122,87,87,87,44,87,129,130,131,87,44,87,87,46,46,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44],
[87,87,87,87,87,43,110,111,112,113,87,87,87,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,46,46,87,87,44,87,42,66,42,87,87,87,87,87,42,66,42,87,87,87,87,46,46,87,87,58,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,57,44,43,44,43],
[87,87,87,87,87,42,42,62,66,42,87,43,87,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,46,46,87,87,87,87,87,66,87,87,87,87,87,87,87,66,87,87,87,87,87,46,46,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,0,1,2,3,4,5,6,87,87,87,87,87,56,43,44,43,44],
[87,87,87,87,87,87,87,87,66,87,87,87,87,87,44,87,44,87,44,87,44,87,44,87,44,87,44,87,44,87,44,87,44,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,8,9,10,11,12,13,14,15,87,87,87,87,56,44,43,44,43],
[46,46,46,46,46,46,46,46,46,46,46,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,16,17,18,19,20,21,22,23,87,87,87,87,56,43,44,43,44],
[46,46,46,46,46,46,46,46,46,46,46,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,24,25,26,27,28,29,30,31,87,87,87,87,56,44,43,44,43],
[43,44,46,46,87,87,87,87,87,87,87,46,46,87,47,48,75,76,77,78,66,66,66,63,64,65,66,66,87,87,87,87,87,46,46,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,87,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,32,33,34,35,36,37,38,39,87,87,87,87,56,43,44,43,44],
[44,43,46,46,87,87,61,123,124,125,87,46,46,87,49,50,79,80,81,82,66,66,66,67,68,69,70,66,87,61,87,87,43,46,46,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,87,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,40,41,41,45,45,45,40,41,40,87,87,87,56,44,43,44,43],
[43,44,46,46,87,87,43,126,127,128,87,46,46,87,52,53,83,84,85,86,66,66,66,71,72,73,74,66,87,87,87,87,44,46,46,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,87,61,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,41,40,41,45,45,45,41,40,40,87,87,87,56,43,44,43,44],
[44,43,46,46,87,87,44,129,130,131,87,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,87,44,87,44,87,44,87,44,87,44,87,44,87,44,87,44,87,87,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,87,87,61,45,45,45,87,87,87,87,87,87,56,44,43,44,43],
[43,44,46,46,87,61,42,42,45,42,87,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,87,87,87,45,45,45,87,87,87,87,87,87,56,43,44,43,44],
[44,43,46,46,45,45,45,45,45,61,87,87,103,104,105,87,46,46,43,44,43,44,43,44,43,87,87,61,87,114,115,116,87,46,46,46,46,46,46,46,46,46,46,46,46,87,87,87,87,87,87,88,89,90,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,87,87,87,45,45,45,87,87,87,87,87,87,56,44,43,44,43],
[43,44,46,46,87,87,87,87,87,87,87,106,107,108,109,87,46,46,44,43,44,43,44,43,44,43,87,87,87,117,118,119,87,46,46,46,46,46,46,46,46,46,46,46,46,87,87,87,87,87,91,92,93,94,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,87,87,87,45,45,45,87,87,87,87,87,87,56,43,44,43,44],
[44,43,46,46,87,87,87,87,87,87,87,110,111,112,113,87,46,46,43,44,43,44,43,44,43,44,87,87,62,120,121,122,87,46,46,87,87,87,87,87,87,87,87,46,46,87,87,87,87,87,95,96,97,98,87,87,87,87,56,87,101,101,101,101,101,101,101,101,101,101,101,101,101,101,87,87,87,87,87,45,45,45,87,87,87,87,87,87,56,44,43,44,43],
[43,44,46,46,87,87,87,87,87,42,42,62,61,45,61,87,46,46,44,43,44,43,44,43,44,43,87,87,87,62,45,87,87,46,46,87,87,87,87,87,87,87,87,46,46,87,87,87,87,87,42,42,45,45,62,87,87,87,56,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,87,45,45,45,62,87,87,58,59,59,60,43,44,43,44],
[44,43,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,43,44,43,44,43,44,43,44,87,87,87,87,45,45,45,46,46,87,87,87,87,87,87,87,87,46,46,87,87,87,87,87,87,62,45,45,62,87,87,87,55,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,59,45,45,45,59,59,59,60,87,87,43,44,43,44,43],
[43,44,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,44,43,44,43,44,43,44,43,87,87,87,87,87,87,87,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46],
[44,43,46,46,87,87,87,87,87,87,87,87,87,87,87,87,43,44,43,44,43,44,43,44,43,44,43,87,87,87,87,87,87,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46,46],
[43,44,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,],
[87,43,46,46,87,87,87,87,87,87,87,87,46,46,46,44,87,44,87,44,87,87,43,87,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,],
			]
			
		};
	}
);
