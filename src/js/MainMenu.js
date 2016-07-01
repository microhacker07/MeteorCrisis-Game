MeteorCrisis.StateMainMenu = function (game) {
	
	//var menuBackground;
	var background;
	var filter;
	var logo
	var button_play;
	var text_play;
	var button_help;
	var text_help;
	var button_control;
	var text_control;
	var device_input = 0;
};

MeteorCrisis.StateMainMenu.prototype = {
	
	create: function() {
	
		////menuBackground = this.add.sprite(0, 0, 'menuBackground');
		background = game.add.sprite(0, 0);
		background.width = 800;
		background.height = 600;

		filter = game.add.filter('Plasma', 800, 600);
		filter.size = 0.1;
		filter.redShift = 0;
		filter.greenShift = 0;
		filter.blueShift = 0.1;
		background.filters = [filter];
		
		logo = this.add.sprite(this.world.centerX - 223, 75, 'logo');
	
		button_play = this.add.button(this.world.centerX - 80, 250, 'button', this.buttonPressedPlay, this, 1, 0, 2);
		
		button_help = this.add.button(this.world.centerX - 80, 355, 'button', this.buttonPressedHelp, this, 1, 0, 2);
		
		var buttonStyle = { font: "60px Tahoma", fill: "#000000", wordWrap: true, wordWrapWidth: button_play.width, align: "center"};
		
		text_play = this.add.text(0, 0, "Play", buttonStyle);
		text_play.alignIn(button_play, Phaser.CENTER, 0, 0);
	
		text_help = this.add.text(0, 0, "Help", buttonStyle);
		text_help.alignIn(button_help, Phaser.CENTER, 0, 0);
		
	},
	
	buttonPressedPlay: function() {
		
		//Start the next state
		this.state.start('Game');
		
	},
	
	buttonPressedHelp: function() {
		
		//Start the next state
		this.state.start('HelpMenu');
		
	},
	
	update: function() {

	filter.update();
	}
};

MeteorCrisis.StateHelpMenu = function (game) {
	
	//var menuBackground;
	var background;
	var filter;
	var logo;
	var text_help;
	var button_back;
	var text_back;
};

MeteorCrisis.StateHelpMenu.prototype = {
	
	create: function() {
	
		//menuBackground = this.add.sprite(0, 0, 'menuBackground');
		background = game.add.sprite(0, 0);
		background.width = 800;
		background.height = 600;

		filter = game.add.filter('Plasma', 800, 600);
		filter.size = 0.1;
		filter.redShift = 0;
		filter.greenShift = 0;
		filter.blueShift = 0.1;
		background.filters = [filter];
		
		logo = this.add.sprite(this.world.centerX - 223, 75, 'logo');
		
		button_back = this.add.button(this.world.centerX - 80, 495, 'button', this.buttonPressedBack, this, 1, 0, 2);
		
		var buttonStyle = { font: "60px Tahoma", fill: "#000000", wordWrap: true, wordWrapWidth: button_back.width, align: "center"};
		
		text_back = this.add.text(0, 0, "Back", buttonStyle);
		text_back.alignIn(button_back, Phaser.CENTER, 0, 0);
		
		subText_help = this.add.text(this.world.centerX - 20, 175, "Help", {font: "30px Arial", fill: "#FFFFFF", align: "center"});
		
		text_help = this.add.text(175, 225, "Movement: W,A,S,D or Arrow Keys \nFire laser: Press Spacebar\n Goal: Try to shoot as many meteors as you can and do not explode!", {font: "26px Courier New", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 600, align: "center"});
	
	},
	
	buttonPressedBack: function() {
		
		//Start the next state
		this.state.start('MainMenu');
	},
	
	update: function() {

	filter.update();
	}
};

MeteorCrisis.StateControlMenu = function (game) {
	
	//var menuBackground;
	var background;
	var filter;
	var logo;
	var text_help;
	var button_back;
	var text_back;
};

MeteorCrisis.StateControlMenu.prototype = {
	
	create: function() {
	
		//menuBackground = this.add.sprite(0, 0, 'menuBackground');
		background = game.add.sprite(0, 0);
		background.width = 800;
		background.height = 600;

		filter = game.add.filter('Plasma', 800, 600);
		filter.size = 0.1;
		filter.redShift = 0;
		filter.greenShift = 0;
		filter.blueShift = 0.1;
		background.filters = [filter];
		
		logo = this.add.sprite(this.world.centerX - 223, 75, 'logo');
		
		button_back = this.add.button(this.world.centerX - 80, 495, 'button', this.buttonPressedBack, this, 1, 0, 2);
		
		var buttonStyle = { font: "60px Tahoma", fill: "#000000", wordWrap: true, wordWrapWidth: button_back.width, align: "center"};
		
		text_back = this.add.text(0, 0, "Back", buttonStyle);
		text_back.alignIn(button_back, Phaser.CENTER, 0, 0);
		
		subText_help = this.add.text(this.world.centerX - 20, 175, "Controls", {font: "30px Arial", fill: "#FFFFFF", align: "center"});
		
		//text_help = this.add.text(175, 225, "Movement: W,A,S,D or Arrow Keys \nFire laser: Press Spacebar\n Goal: Try to shoot as many meteors as you can and do not explode!", {font: "26px Courier New", fill: "#FFFFFF", wordWrap: true, wordWrapWidth: 600, align: "center"});
	
	},
	
	buttonPressedBack: function() {
		
		//Start the next state
		this.state.start('MainMenu');
	},
	
	update: function() {

	filter.update();
	}
};