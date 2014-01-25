define(
	[
		"pixi",
		"lodash",

		"config",

		"./game"
//		"./scenes/index"
	],
	function (P, _, config, scenes) {
		function Game () {

		}
		_.extend(Game.prototype, {
			
			start: function () {
				//Init PIXI
				var stage = new P.Stage(),
				    renderer = new P.CanvasRenderer(config.width, config.height),

				    //sprite = new P.Sprite(P.Texture.fromImage("tempBoxRed.png")),
				    row,column;

				    for(row =0;row<config.world.length; row++)
				    {
				    	for(column =0; column<config.world[0].length; column++)
				    	{
				    		sprite = new P.Sprite(P.Texture.fromImage("tempBoxRed.png"));
				    		sprite.position.x = column*(config.tileWidth+2);
				    		sprite.position.y = row*(config.tileHeight+2);
				    		stage.addChild(sprite);


				    	}
				    }
				
				document.body.appendChild(renderer.view)

				
				renderer.render(stage);
				
				
			},

			cutscene: function () {
			}
		})

		return Game;
	}
);
