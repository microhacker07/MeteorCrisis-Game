var MeteorCrisis = {};

MeteorCrisis.StatePreloader = function (game) {
	
    this.text = null;

};

MeteorCrisis.StatePreloader.prototype = {
	
	init: function() {
	
		this.text = this.add.text(this.world.centerX, this.world.centerY, "Loading: 0%", { font: "32px Arial", fill: "#ffffff", align: "center" });
		this.text.anchor.x = 0.5;
		
	},

    preload: function() {

		//Load all the images
        this.load.image('background', 'assets/space.png');
		//this.load.image('menuBackground', 'assets/MainMenuBackground.png');
		this.load.script('filter', 'assets/Plasma.js');
		this.load.image('stars1', 'assets/stars1.png');
		this.load.image('stars2', 'assets/stars2.png');
        this.load.image('logo', 'assets/MeteorCrisis_logo.png');
		this.load.spritesheet('button', 'assets/button.png', 160, 80);
		this.load.image('meteor', 'assets/meteor.png');
		this.load.spritesheet('meteorParticle', 'assets/meteorParticle.png', 6, 4);
		this.load.image('laser', 'assets/laser.png');
		this.load.spritesheet('explosion', 'assets/explosion.png', 35, 35);
		this.load.spritesheet('spacecraft', 'assets/spacecraft.png', 82, 48);
		
		this.load.onFileComplete.add(this.fileLoaded, this);
    },
	
	fileLoaded: function(progress) {

        this.text.text = "Loading: " + progress + "%";

    },

    create: function() {
	
		highscore = 0;
		//Start the next state
        this.state.start('MainMenu');
		
    }

};


