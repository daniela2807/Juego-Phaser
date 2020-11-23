var PlayerScene = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function PlayerScene() {
    Phaser.Scene.call(this, { key: "PlayerScene", active:false});
  },

  preload: function() {
    this.load.image("fondosky", "assets/Seleccion.png");
    this.load.image("menu", "assets/menu.webp");
    this.load.spritesheet("personaje1", "assets/mario.png", {
      frameWidth: 37,
      frameHeight: 47
    });
    this.load.spritesheet("personaje2", "assets/luigi.png", {
      frameWidth: 37,
      frameHeight: 47
    });
    this.load.image("star1", "assets/star.png");
  },

  create: function() {
    this.anims.create({
      key: "mario",
      frames: [{ key: "personaje1", frame: 4 }],
      frameRate: 20
    });
    this.anims.create({
      key: "luigi",
      frames: [{ key: "personaje2", frame: 4 }],
      frameRate: 20
    });
    //  A simple background for our game
    this.add.image(400, 300, "fondosky");
    var pointer = this.input.activePointer;
    let marioButton = this.add.sprite(300, 300, "personaje1");
    marioButton.setScale(4);
    marioButton.anims.play("mario");
    let luigiButton = this.add.sprite(540, 300, "personaje2");
    luigiButton.setScale(4);
    luigiButton.anims.play("luigi");
    
    let menuButton = this.add.image(570, 450, "menu");
    menuButton.setScale(.2);

    marioButton.setInteractive();
    luigiButton.setInteractive();
    menuButton.setInteractive();

    marioButton.on("pointerover", () => {
      marioButton.tint = 0xff0000;
    });

    marioButton.on(
      "pointerdown",
      () => {
        if (pointer.leftButtonDown()) {
          this.scene.start("username" , "mario");
        }
      },
      this
    );

    menuButton.on("pointerover", () => {
        menuButton.tint = 0xff0000;
      });
  
      menuButton.on(
        "pointerdown",
        () => {
          if (pointer.leftButtonDown()) {
            this.scene.start("MenuScene");
          }
        },
        this
      );

    luigiButton.on("pointerover", () => {
      luigiButton.tint = 0xff0000;
    });

    luigiButton.on(
        "pointerdown",
        () => {
          if (pointer.leftButtonDown()) {
            this.scene.start("username", "luigi");
          }
        },
        this
      );


    marioButton.on("pointerout", () => {
        marioButton.tint = 0xffffff;
    });

    luigiButton.on("pointerout", () => {
        luigiButton.tint = 0xffffff;
    });

    menuButton.on("pointerout", () => {
        menuButton.tint = 0xffffff;
    });
  },

  update: function() {}
});
