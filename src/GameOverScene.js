var informacion;

var GameOverScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function GameOverScene() {
    Phaser.Scene.call(this, { key: "GameOverScene", active:false });
  },

  init: function(datos) {
    informacion = datos; 
  },

  preload: function() {
    this.load.audio('audio5','assets/audio5.mp3')
    this.load.image("fondogameover", "assets/gameover.png");
    this.load.bitmapFont('marioFont', 'assets/font.png', 'assets/font.fnt');
  },

  create: function() {
    audio5 = this.sound.add("audio5", { loop: false});
    audio5.play();
    //  A simple background for our game
    this.add.image(400, 300, "fondogameover");
    var pointer = this.input.activePointer;

    var puntaje = this.add.bitmapText(100, 50, 'marioFont', "", 20);

    puntaje.setText([
        informacion.nombre,
        informacion.puntos
    ]);

    //Guardar info
    var jugador = JSON.stringify({
                    nombre: informacion.nombre,
                    puntos: informacion.puntos,
                });

    var records = localStorage.getItem("records");
    records = JSON.parse(records);
    if(records==null) records= [];

    records.push(jugador);
    localStorage.setItem("records",JSON.stringify(records));    

    var worldText = this.add.bitmapText(400, 50, 'marioFont', "", 20);
    worldText.setText([
        "world",
        informacion.mundo
    ]);

    var timeText = this.add.bitmapText(600, 50, 'marioFont', "", 20);
    timeText.setText([
        "time",
        informacion.min+" : "+informacion.seg
    ]);
    
    this.add.bitmapText(400, 350, 'marioFont', "game over", 50).setOrigin(0.5);

    var menuButton = this.add.bitmapText(600, 500, 'marioFont', '', 25).setOrigin(0.5).setCenterAlign().setInteractive();
    
    menuButton.setText("menu");
  
    menuButton.on(
        "pointerdown",
        () => {
          if (pointer.leftButtonDown()) {
            this.scene.start("MenuScene");
          }
        },
        this
      );
  },

  update: function() {}
});
