var Records = new Phaser.Class({
  Extends: Phaser.Scene,

  initialize: function records() {
    Phaser.Scene.call(this, { key: "Records", active: false });
  },

  preload: function() {
    this.load.image("record", "assets/hola.png");
    this.load.image("menu", "assets/menu.webp");
    this.load.bitmapFont('marioFont', 'assets/font.png', 'assets/font.fnt');
  },

  create: function() {
    this.add.image(400, 300, "record").setTint(0xcdcdcd);

    this.add.bitmapText(400, 100, 'marioFont',"RECORDS", 35).setOrigin(.5);

    this.add.bitmapText(610, 500, 'marioFont',"menu", 15);

    let menuButton = this.add.image(640, 550, "menu");
    menuButton.setScale(0.2);
    var pointer = this.input.activePointer;
    menuButton.setInteractive();

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

    menuButton.on("pointerout", () => {
      menuButton.tint = 0xffffff;
    });

    this.primeros();
  },

  primeros: function() {
    var records = localStorage.getItem("records");
    var records = JSON.parse(records);
    if (records == null) records = [];

    //ordena

    var data = [];
    records.forEach(record => {
      data.push(JSON.parse(record));
    });
    records = data;
    records.sort(function(a, b) {
      return b.puntos - a.puntos;
    });
    this.rec1 = this.add.bitmapText(400, 200, 'marioFont',
    JSON.stringify(records[0].nombre)+" - - - - - - - "+JSON.stringify(records[0].puntos + "pts"), 25).setOrigin(.5);
    this.rec2 = this.add.bitmapText(400, 300, 'marioFont',
    JSON.stringify(records[1].nombre)+" - - - - - - - "+JSON.stringify(records[1].puntos + "pts"), 25).setOrigin(.5);
    this.rec3 = this.add.bitmapText(400, 400, 'marioFont',
    JSON.stringify(records[2].nombre)+" - - - - - - - "+JSON.stringify(records[2].puntos + "pts"), 25).setOrigin(.5);
    this.rec4 = this.add.bitmapText(400, 500, 'marioFont',
    JSON.stringify(records[3].nombre)+" - - - - - - - "+JSON.stringify(records[3].puntos + "pts"), 25).setOrigin(.5);
  },

  update: function() {}
});
