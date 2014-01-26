define(
	[
		"pixi",
		"lodash",

		"config",
		"./util/keys"
	],
	function (P, _, config, keys) {
		function Dialog (key, stage, renderer, next) {
			this.stage = stage;
			this.container = new P.DisplayObjectContainer();
			this.stage.addChild(this.container);

			this.textBg = new P.Sprite(P.Texture.fromImage("dialog/textBg.png"));
			this.text =
				new P.Text("",
				           {
					           font: 'bold 24px Avro',
					           fill: 'black',
					           align: 'left',
					           wordWrap: true,
					           wordWrapWidth: config.width - (2 * config.dialog.marginLeft)
				           }
				          );

			this.head = new P.Sprite(P.Texture.fromImage("dialog/lana_closed.png"));

			this.textBg.position.x = 0;
			this.textBg.position.y = config.height - 50 - (2 * config.dialog.marginBottom);
			
			this.text.position.x = config.dialog.marginLeft;
			this.text.position.y = config.height - 50 - config.dialog.marginBottom;

			this.head.position.x = config.dialog.marginLeft;
			this.head.position.y = config.height - 50 - config.dialog.marginBottom - (this.head.height * 0.8);
			
			this.container.addChild(this.head);
			this.container.addChild(this.textBg);
			this.container.addChild(this.text);
			
			this.renderer = renderer;
			this.next = next;

			this.scene = config.dialog.script[key];
			this.sceneIdx = 0;
			this.scriptLine = 0;

		}
		
		_.extend(Dialog.prototype, {

			start: function () {
				window.requestAnimationFrame(this.frame.bind(this));
			},

			frame: function () {
				var script = this.scene[this.sceneIdx];
				
				if (keys["space"] || !this.inited) {
					this.inited = true;
					if (!this.debounceSpace) {
						this.debounceSpace = true;

						if (this.lastOne) {
							this.done = true;
						} else {
							console.log(68);
							if (this.scriptLine == 0) {
								//Set up next person talking
								if (!script.head) {
									this.head.visible = false;
								}
								else {
									this.head.visible = true;
									this.head.setTexture(P.Texture.fromImage(script.head));
								}
								this.head.position.x =
									script.side
									? config.width - config.dialog.marginLeft - this.head.width
									: config.dialog.marginLeft;
							}

							//Show next line
							this.text.setText(script.lines[this.scriptLine++]);

							//Advance markers
							if (script.lines.length <= this.scriptLine) {
								this.scriptLine = 0;
								this.sceneIdx++;
								if (this.sceneIdx >= this.scene.length) {
									this.lastOne = true;
								}
							}
						} // !this.lastOne	
					} // !this.debounceSpace
				} // keys["space"]
				else {
					this.debounceSpace = false;
				}

				this.renderer.render(this.stage);
				
				if (this.done) {
					this.stage.removeChild(this.container);
					return this.next();
				}
				else {
					return window.requestAnimationFrame(this.frame.bind(this));
				}
			}
			
		});

		return Dialog;
	}
);
