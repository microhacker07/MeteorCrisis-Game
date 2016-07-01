MeteorCrisis.StateGame = function(game) {
	
	var highscore;

	//Variables
	var space;
	var stars1;
	var stars2;

    var player;
	
	var meteors;
	var meteorDifficultly;
	
	var score;
	var scoreText

	var weapon;

	var fireButton;
	var cursors;

	var KeyW;
	var KeyS;
	var KeyA;
	var KeyD;
};



MeteorCrisis.StateGame.prototype = {

    create: function() {

		this.physics.startSystem(Phaser.Physics.ARCADE);

		//Adds Simple Background
        background = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'background');
		stars1 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'stars1');
		stars2 = this.game.add.tileSprite(0, 0, this.game.world.width, this.game.world.height, 'stars2');

		//Player Laser Gun
		weapon = this.add.weapon(-1, 'laser');
		weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
		weapon.bulletSpeed = 600;
		weapon.fireRate = 800;

		player = this.add.sprite(45, this.world.centerY, 'spacecraft');
		player.enableBody = true;
		this.physics.arcade.enable(player);
		player.body.collideWorldBounds = true;
		player.animations.add('idle', [0, 1], 5, true);

		weapon.trackSprite(player, 82, 24, true);
		
		meteors = this.add.group();
		meteors.enableBody = true;
		meteors.physicsBodyType = Phaser.Physics.ARCADE;
		meteorDifficultly = 0;
		this.time.events.loop(1500 - meteorDifficultly, this.createMeteor, this);
		
		score = 0;
		scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#FFF' });

		cursors = this.input.keyboard.createCursorKeys();
		fireButton = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		KeyW = this.input.keyboard.addKey(Phaser.Keyboard.W);
		KeyS = this.input.keyboard.addKey(Phaser.Keyboard.S);
		KeyA = this.input.keyboard.addKey(Phaser.Keyboard.A);
		KeyD = this.input.keyboard.addKey(Phaser.Keyboard.D);
    },

	createMeteor: function() {
	
		var meteor = meteors.create(800, this.world.randomY - 40, 'meteor');
		meteor.scale.setTo(2, 2);
		meteorDifficultly += 5;
	},

	update: function() {
		//Scrolls Background
		background.tilePosition.x += -1.5;
		stars1.tilePosition.x += -1.6;
		stars2.tilePosition.x += -1.85;

		this.physics.arcade.overlap(weapon.bullets, meteors, this.laserHitMeteor, null, this);
		this.physics.arcade.overlap(player, meteors, this.meteorHitPlayer, null, this);

		player.body.velocity.y = 0;
		player.body.velocity.x = 0;

		if (cursors.down.isDown || KeyS.isDown)
		{
			//Move player down
			player.body.velocity.y = 250;

		}

		if (cursors.up.isDown || KeyW.isDown)
		{
			//Move player up
			player.body.velocity.y = -250;

		}

		if (cursors.left.isDown || KeyA.isDown)
		{

			player.body.velocity.x = -250;

		}

		if (cursors.right.isDown || KeyD.isDown)
		{

			player.body.velocity.x = 250;

		}

		if (fireButton.isDown)
        {
            weapon.fire();
        }

		player.animations.play('idle');

		meteors.setAll('x', -5, true, true, 1);
		meteors.forEach(this.checkMeteor, this, true);

	},

	checkMeteor: function(meteor) {
        if (meteor.x < -85)
        {
            meteors.remove(meteor, true);
        }
	},

	laserHitMeteor: function(bullet, meteor) {
		
		var meteorBits = this.game.add.emitter(meteor.x + 40, meteor.y + 40, 100);
		meteorBits.makeParticles('meteor');
		meteorBits.minParticleScale = 0.1;
		meteorBits.maxParticleScale = 1;
		meteorBits.gravity = 0;
		meteorBits.start(true, null, null, 5);
		
		var explosionMeteor = this.add.sprite(meteor.x - 20, meteor.y - 20, 'explosion');
		explosionMeteor.scale.setTo(3, 3);
		explosionMeteor.animations.add('explode', [0, 1, 1, 2], 3, false);
		explosionMeteor.animations.play('explode');
	
		weapon.bullets.remove(bullet, true);
		meteors.remove(meteor, true);
		
		this.add.tween(explosionMeteor).to( { alpha: 0 }, 250, "Linear", true, 500);

		score += 10;
		scoreText.text = 'Score: ' + score;
		
		meteorDifficultly += 10;
	},

	meteorHitPlayer: function(player, meteor) {
		var playerClone = this.add.sprite(player.x, player.y, 'spacecraft');
		
		var explosion = this.add.sprite(player.x - 41, player.y - 48, 'explosion');
		explosion.scale.setTo(4, 4);
		explosion.animations.add('explode', [0, 1 , 1, 2, 2], 3, false);
		explosion.animations.play('explode');
		
		weapon.trackSprite(player, -810, 24, true);

		this.add.tween(playerClone).to( { alpha: 0 }, 250, "Linear", true, 500);
		this.add.tween(explosion).to( { alpha: 0 }, 250, "Linear", true, 1000);

		player.kill();
		meteors.remove(meteor, true);
		
		if(this.highscore <= score) {
			highscore = score;
		}

		this.time.events.add(3000, this.gameOver, this);
	},

	gameOver: function () {

        this.state.start('MainMenu');

    }
};