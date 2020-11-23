var audio;

var PresentationScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function PresentationScene() {
            Phaser.Scene.call(this, { key: 'PresentationScene', active: true });
        },


    preload: function () {
        this.load.image('fondopresentation', 'assets/presentation.jpg');
        this.load.image('uaalogo', 'assets/uaalogo.png');
        this.load.bitmapFont('marioFont', 'assets/font.png', 'assets/font.fnt');
    },

    create: function () {
        this.add.image(0, 0, 'fondopresentation').setOrigin(0);
        this.add.image(400, 80, 'uaalogo').setScale(.4);
        this.add.bitmapText(400, 240, 'marioFont', '"Super Mario Bros"', 35).setOrigin(0.5);
        this.add.bitmapText(400, 320, 'marioFont', "Daniela Gutierrez Plascencia", 15).setOrigin(0.5);
        this.add.bitmapText(400, 370, 'marioFont', "Sonia Paulina Horta Vargas", 15).setOrigin(0.5);
        this.add.bitmapText(400, 420, 'marioFont', "Juan Pablo Quintanilla Gonzalez", 15).setOrigin(0.5);

        var pointer = this.input.activePointer;
        var continueButton = this.add.bitmapText(400, 550, 'marioFont', "Click to continue", 25).setOrigin(0.5);

        continueButton.setInteractive();

        continueButton.on('pointerup', ()=> {
                this.scene.start("MenuScene");
        });

    },

    update: function () {
        
    },

    hitBomb: function(player, bomb) {

    }
});