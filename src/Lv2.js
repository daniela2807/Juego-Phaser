var estre;
var controlmute = false;
var controlpause = false;
var audio3;
var audio1;
var audio4;
var lives;
var player;
var muerte;
var c;
var bonusaudio;
var audioperder;
var bonustomado=false;
var banderabonus = false;
var stars;
var level;
var bombs;
var timebon;
var time_seg2;
var bonus;
var pointer;
var platforms;
var cursors;
var timedEvent;
var textBonus;
var score;
var gameOver = false;
var scoreText;
var time_seg;
var time_min;
var timefi;
var music;
var image;
var sonido;
var nosonido;
var timedEvent;
var estre;
var personaje;
var informacion;


var Level2Scene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function Level2Scene() {
    Phaser.Scene.call(this, { key: "Level2Scene", active: false });
  },

  init: function(data) {
    informacion = data; 
    console.log(informacion);
  },

  preload: function() {
    this.load.image("sky2", "assets/fondo3.png");
    this.load.image("ground1", "assets/gris.png");
    this.load.image("star", "assets/moneda.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.image("ground3", "assets/lava.png");
    this.load.audio('audio4','assets/audio4.mp3');
    this.load.spritesheet("dude", "assets/"+informacion.nombre+".png", {
      frameWidth: 37,
      frameHeight: 47
    });
    this.load.audio("audio1", "assets/audio1.mp3");
    this.load.audio("audio3", "assets/audio3.mp3");
    this.load.image("vida", "assets/corazon.png");
    this.load.image("sonido", "assets/sonido.png");
    this.load.image("nosonido", "assets/nosonido.png");
    this.load.image("bon", "assets/moneda2.png");
    this.load.image("pause", "assets/pause.png");
    this.load.audio('bonusaudio','assets/bonusaudio.mp3');
    this.load.audio('audioperder','assets/audioperder.mp3')
  },

  create: function() {
    c=0;
    time_seg2=5;
    bonustomado=false;
    banderabonus=false;
      time_seg = informacion.seg;
      time_min= informacion.min;
      level= informacion.mundo;
    lives = informacion.vidas;
    score = informacion.puntos;

    audio4= this.sound.add("audio4",{loop:false});

    audio3 = this.sound.add("audio3", { loop: true });
    audio3.play();
    //  A simple background for our game
    this.add.image(400, 300, "sky2");

    pointer = this.input.activePointer;
    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    platformsPiso = this.physics.add.staticGroup();

    //  Here we create the ground.
    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    platformsPiso.create(400, 568, "ground3").setScale(1).refreshBody();

    //  Now let's create some ledges
    platforms.create(590, 400, "ground1");
    platforms.create(50, 250, "ground1");
    platforms.create(400, 150, "ground1");
    platforms.create(180, 400, "ground1");
    platforms.create(750, 220, "ground1");

    // The player and its settings
    player = this.physics.add.sprite(100, 100, "dude");

    //  Player physics properties. Give the little guy a slight bounce.
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //  Our player animations, turning, walking left and walking right.
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers("dude", { start: 1, end: 3 }),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: "turn",
      frames: [{ key: "dude", frame: 4 }],
      frameRate: 20
    });

    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers("dude", { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });

    //  Input Events
    cursors = this.input.keyboard.createCursorKeys();

    //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    stars = this.physics.add.group({
      key: "star",
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function(child) {
      //  Give each star a slightly different bounce
      child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    bombs = this.physics.add.group();

    bonus = this.physics.add.group();

    //  The score
    nameUsuario = this.add.bitmapText(16, 16, 'marioFont', informacion.jugador, 15);
    scoreText =  this.add.bitmapText(16, 36, 'marioFont', "score: 0", 15);

    xText = this.add.bitmapText(280, 21, 'marioFont', "x", 15);
    livesText = this.add.bitmapText(300, 20, 'marioFont', "0"+lives, 15);

    worldText = this.add.bitmapText(470, 16, 'marioFont', "world", 15);

    worldText2 = this.add.bitmapText(485, 37, 'marioFont', "1-1", 15);

    
    //livesText = this.add.text(500, 16, 'lives: '+lives, { fontFamily: 'Super-Mario', fill: '#fff' });

    time = this.add.bitmapText(650, 16, 'marioFont', "time", 15);

    textBonus = this.add.bitmapText(16, 56, 'marioFont', "", 15);
    time2 = this.add.bitmapText(660, 35, 'marioFont', "0 : 0", 15);
    image = this.add.image(260, 30, "vida");
    pause = this.add.image(760, 30, "pause");
    pause.setScale(1.5);
    pause.setInteractive();
    sonido = this.add.image(650, 570, "sonido").setInteractive();
    nosonido = this.add.image(730, 570, "nosonido").setInteractive();

    //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(bombs, platformsPiso);
    this.physics.add.collider(bonus, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    //this.physics.add.overlap(player, stars, this.tomarbonus, null, this);

    this.physics.add.overlap(player, stars, this.collectStar, null, this);

    this.physics.add.collider(player,platformsPiso, this.muerte,null,this)

    this.physics.add.collider(player, bombs, this.hitBomb, null, this);

    timefi = setInterval(tiemp,1000);

    function tiemp(){
      if (time_seg == 60) {
        time_seg = 0;
        time_min++;
      } else {
        time_seg++;
        console.log(time_seg);
      }
      time2.setText(time_min + " : " + time_seg);
    }

    nosonido.on("pointerup", function() {
      if (controlmute == false) {
        controlmute = true;
        audio3.setVolume(0);
      }
    });
    sonido.on("pointerup", function() {
      if (controlmute == true) {
        controlmute = false;
        audio3.setVolume(1);
      }
    });
    var _anims = this.anims;

    pause.on(
      "pointerdown",
      () => {
        if (pointer.leftButtonDown()) {
          if (controlpause == true) {
            controlpause = false;
            this.physics.resume();
            if (controlmute != true && gameOver!=true) {
                audio3.setVolume(1);
            }
            timefi = setInterval(tiemp ,1000);
            if(banderabonus==true){timebon = setInterval(bonust,1000)};
            console.log(controlpause);
          } else {
            controlpause = true;
            this.physics.pause();
            audio3.setVolume(0);
            if(banderabonus==true){clearInterval(timebon)};
            clearInterval(timefi);
            console.log(controlpause);
          }
        }
      },
      this
    );
  },

  update: function() {
    if (controlpause == false) {

      if (cursors.left.isDown) {
        player.setVelocityX(-160);

        player.anims.play("left", true);
      } else if (cursors.right.isDown) {
        player.setVelocityX(160);

        player.anims.play("right", true);
      } else {
        player.setVelocityX(0);

        player.anims.play("turn");
      }

      if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
      }
    }
  },

  collectStar: function(player, star) {
    audio1 = this.sound.add("audio1", { loop: false });
    star.disableBody(true, true);

    //  Add and update the score
    if(banderabonus==true){
      score+=200;
    }else{
    score += 25;
    }
    if(star.setTint(0xff0000)){
      console.log("true");
    }
    else{
      console.log("false");
    }
    audio1.play();
    scoreText.setText("score: " + score);

    

    if (stars.countActive(true) === 0) {
      //  A new batch of stars to collect
      stars.children.iterate(function(child) {
        child.enableBody(true, child.x, 0, true, true);
        c++;
        if(banderabonus==false && c==1)
        {
          banderabonus=true;
          child.setTint(0xff0000);
          audio3.setVolume(0);
          audio4.play();
          timebon = setInterval(bonust, 1000);
        }
      });
      var x =
        player.x < 400
          ? Phaser.Math.Between(400, 800)
          : Phaser.Math.Between(0, 400);
      var bomb = bombs.create(x, 16, "bomb");
      bomb.setBounce(1);
      bomb.setCollideWorldBounds(true);
      bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
      bomb.allowGravity = false;

    }
  },

  hitBomb: function(player, bomb) {
    if (lives > 1) {
      audioperder = this.sound.add("audioperder", { loop: false });
      audioperder.play();

      lives--;
      bomb.disableBody(true, true);
      livesText.setText("0" + lives);
    } else {
      livesText.setText("0" + lives);

      this.physics.pause();

      player.setTint(0xff0000);

      player.anims.play("turn");

      gameOver = true;
      var datos = {
        nombre: informacion.jugador,
        puntos: score,
        mundo: level, 
        min: time_min,
        seg: time_seg
      }
      this.scene.start("GameOverScene", datos);
      //guardar en scores
      datos = null;
      resetDatos();
    }
  },

  muerte: function(player,piso){
    lives=0;
    livesText.setText("0"+lives);

    this.physics.pause();

    player.setTint(0xff0000);

    player.anims.play("turn");

    gameOver = true;
    var datos = {
      nombre: informacion.jugador,
      puntos: score,
      mundo: level, 
      min: time_min,
      seg: time_seg
    }
    this.scene.start("GameOverScene", datos);
    //guardar en scores
    datos = null;
    resetDatos();

},

  
});

function bonust(){
  if (time_seg2>0 && bonustomado==false) {
    time_seg2--;
    textBonus.setText("bonus: 0:"+time_seg2)
  }else{
  textBonus.setText("");
  audio3.setVolume(1);
  stars.children.iterate(function(child) {
      child.setTint();
      banderabonus=false;
  });
  } 
}

function resetDatos(){
  clearInterval(timebon);
  clearInterval(timefi);
  audio3.stop();
  controlmute = false;
  controlpause = false;
  lives = 3;          ///CAMBIAR
  bonustomado=false;
  banderabonus = false;
  level = 1;
  time_seg2=5;
  score = 0;
  gameOver = false;
  time_seg = 0;
  time_min = 0;
  personaje = "";
}
