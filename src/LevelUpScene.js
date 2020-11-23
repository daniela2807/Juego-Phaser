var informacion;
var image;

var LevelUpScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function LevelUpScene() {
    Phaser.Scene.call(this, { key: "LevelUpScene", active: false });
  },

  init: function(data) {
    informacion = data;
    console.log(informacion);
  },

  preload: function() {
    this.load.image("fondowin", "assets/gameover.png");
    this.load.bitmapFont("marioFont", "assets/font.png", "assets/font.fnt");
    this.load.spritesheet("player", "assets/"+informacion.nombre+".png", {
      frameWidth: 37,
      frameHeight: 47
    });
  },

  create: function() {
    //  A simple background for our game
    this.add.image(400, 300, "fondowin");
    var pointer = this.input.activePointer;

    var puntaje = this.add.bitmapText(100, 50, "marioFont", "", 20);

    puntaje.setText([informacion.jugador, informacion.puntos]);

    var worldText = this.add.bitmapText(400, 50, "marioFont", "", 20);
    worldText.setText(["world", informacion.mundo]);

    var timeText = this.add.bitmapText(600, 50, "marioFont", "", 20);
    timeText.setText(["time", informacion.min + " : " + informacion.seg]);

    this.add.bitmapText(400, 220, "marioFont", "Level 2", 25).setOrigin(0.5);

    this.anims.create({
      key: "personaje",
      frames: [{ key: "player", frame: 4 }],
      frameRate: 20
    });
    var lives = this.add.bitmapText(400, 330, "marioFont", "", 20);
    image = this.add.sprite(350, 330, "player");
    image.setScale(2);
    image.anims.play("personaje");
    lives.setText("x " + informacion.vidas);

    var menuButton = this.add
      .bitmapText(400, 500, "marioFont", "", 18)
      .setOrigin(0.5)
      .setCenterAlign()
      .setInteractive();

    menuButton.setText("click to start");

    menuButton.on(
      "pointerdown",
      () => {
        if (pointer.leftButtonDown()) {
          this.scene.start("Level2Scene",informacion);
        }
      },
      this
    );
  },

  update: function() {}
});
