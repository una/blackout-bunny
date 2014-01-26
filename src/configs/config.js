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
			startX: 200,
			startY: 500,

			//World construction
			tileWidth: 32,
			tileHeight: 32,
			tileTypes: 132,
			passableTiles: {
				0: true,
				83: true,
				84: true,
				85: true,
				86: true,
				87: true,
				46: true,
				45: true,
				66: true,
				84: true,
				67: true,
				68: true,
				34: true,
				35: true,
				36: true,
				37: true
			},

			dialog: {
				marginLeft: 160,
				marginBottom: 30,
				marginTop: 30,

				script: {

					intro: [
						{
							head: false,
							side: 1,
							lines: [
								"*?!^&@$$, what happened last night? You blacked out again... (press spacebar to continue)"
							]
						},
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"Man, I'm hungry. Last thing I remember were those carrot juice shots. Oops y'all."
							]
						},
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Where is FOOOOOOOOOD!?"
							]
						},
						{
							head: false,
							// head: "dialog/arrows.png",
							side: 1,
							lines: [
								"(Use the arrow keys to navigate to Karrot King)"
							]
						}
					],

					karrotking: [
						{
							head: "dialog/rufus_closed.png",
							side: 1,
							lines: [
								"Hello... welcome to Karrot King... home of the Bunny Burger and the minimum wage... what do you want, dude?"
							]
						},
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Yeah, can I have a Karrot Shake and a small fry?"
							]
						},
						{
							head: "dialog/rufus_closed.png",
							side: 1,
							lines: [
								"Rawrfs... $6.90."
							]
						},
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"Sure, let me get my..."
							]
						},
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Holy Cabbage Patch! Where's my wallet?!"
							]
						},
						{
							head: "dialog/manager_open.png",
							side: 1,
							lines: [
								"YOU!!!!!!!!",
								"RAWWRFS! I remember you! Last night you rawrfed my store big time!"
							]
						},
						{
							head: "dialog/manager_closed.png",
							side: 1,
							lines: [
								"The whole place is trashed! Clean up or I call the RAWRFLICE!"
							]
						},
				
						{
							head: false,
							// head: "dialog/holding_photo.png",
							side: 1,
							lines: [
								"You're about to see an image of what the store SHOULD look like. Remember it, and rearrange the pieces in the correct location."
							]
						},						
						{
							head: false,
							// head: "dialog/mini1_instruction.png",
							side: 1,
							lines: [
								"Use spacebar to change the item you are controlling. The arrow keys move the item around the screen.",
								"If the item won't budge anymore, that means it's in the right spot."
							]
						}
					],

					karrotkingOutroDrunk1: [
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"Oh !$%@ Am I still drunk?..."
							]

						}

					],

					karrotkingOutroDrunk2: [
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"I'm DEFINITELY still drunk."
							]
						}
					],

					karrotkingOutroDrunk3: [
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"BLERGHDERP PEAS AND CARROTS"
							]
						}
					],

					karrotkingOutroWin: [
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"What's this feather? Did I visit the chicks from the farm last night?"
							]
						}
					],

					froggerOutroWin: [
						{
							head: "dialog/bunny_closed.png",
							side: 0,
							lines: [
								"Crazy Sheep! I hope the chicks are still around."
							]

						},
						{

							head: "dialog/lana_closed.png",
							side: 1,
							lines: [
								"YOU LITTLE CACAWWKER!! YOU STOLE MY EGGS LAST NIGHT!!"
							]

						},
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Ugh, Lana, calm your cacawking. I'm just looking for my wallet",
								"Have you seen it?"
							]
						},
						{
							head: "dialog/lana_open.png",
							side: 1,
							lines: [
								"Yeah I've seen it. You'll get it back to you when you return ALL my eggs safe and sound."
							]
						},
						{
							head: false,
							side: 1,
							lines: [
								"You partied at the Easter Bunny's House last night. Find it and your collect the eggs you left, you silly rabbit."
							]
						}

					],

					drunkStumble: [
						{
							head: "dialog/bunny_open.png",
							side: 0,
							lines: [
								"Jeez, I can barely walk straight!"

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
				loseTime: 30,
				tolerance: 30
			},

			frogger: {
				eggs: 4,

				sheepFrameDelay: 6,
				minSheepSpeed: 3,
				maxSheepSpeed: 4,

				sheepCount: 12
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
				[43,44,46,46,87,87,87,87,87,87,87,87,87,87,87,87,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43,87,43],
				[87,43,46,46,87,87,87,87,87,87,87,87,46,46,46,44,87,44,87,44,87,87,43,87,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43,44,43]
			]
		};
	}
);
