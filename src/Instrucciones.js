var Instrucciones = new Phaser.Class({
    Extends: Phaser.Scene,

    initialize: function records() {
        Phaser.Scene.call(this, { key: "Instrucciones", active:false});
    },

    preload:function() {
        this.load.image('instrucciones', 'assets/instruccionesbien.png');
        this.load.image("menu", "assets/menu.webp");
    },
 

    create: function() {
        this.add.image(400, 300, 'instrucciones');

        let menuButton = this.add.image(570, 450, "menu");
        menuButton.setScale(.2);
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



    }



});