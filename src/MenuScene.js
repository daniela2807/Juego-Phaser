var audio;

var MenuScene = new Phaser.Class({

    Extends: Phaser.Scene,

    initialize:

        function MenuScene() {
            Phaser.Scene.call(this, { key: 'MenuScene'});
        },


    preload: function () {
        this.load.image('fondo', 'assets/menu.jpg');
        this.load.image('play_button','assets/play.png');
        this.load.image('records_button','assets/options.png');
        this.load.image('options_button','assets/options.png');
        this.load.image('star1','assets/star.png');
        this.load.audio('audio2', 'assets/audio2.mp3');
        this.load.bitmapFont('marioFont', 'assets/font.png', 'assets/font.fnt');

        //create loading bar
        let loadingBar = this.add.graphics({
            fillStyle: {
                color: 0xffffff
            }
        })


        this.load.on("progress", (percent)=>{
            loadingBar.fillRect(0,this.game.renderer.height/2,this.game.renderer.width*percent,50);
        })
    },

    create: function () {
        audio = this.sound.add('audio2', { loop: true });
        audio.play();
        //  A simple background for our game
        this.add.image(400, 300, 'fondo');
        var pointer = this.input.activePointer;
        var playButton = this.add.bitmapText(400, 400, 'marioFont', "<play>", 25).setOrigin(0.5);
        var recordsButton = this.add.bitmapText(400, 460, 'marioFont', "<records>", 20).setOrigin(0.5);
        var instructionsButton = this.add.bitmapText(400, 510, 'marioFont', "<instrucciones>", 20).setOrigin(0.5);
        var salirButton = this.add.bitmapText(400, 560, 'marioFont', "<salir>", 20).setOrigin(0.5);

        let hoverSprite = this.add.sprite(100,100,"star1");
        hoverSprite.setVisible(false);

        playButton.setInteractive();
        recordsButton.setInteractive();
        instructionsButton.setInteractive();
        salirButton.setInteractive();

        playButton.on("pointerover",()=>{
            playButton.setTint(0xff0000);
        })

        playButton.on("pointerout", ()=>{
            playButton.setTint(0xffffff);
        })

        playButton.on('pointerup', ()=> {
                audio.setVolume(0);
                this.scene.start("PlayerScene");
        });

        recordsButton.on("pointerover",()=>{
            recordsButton.setTint(0xff0000);
        })

        recordsButton.on("pointerout", ()=>{
            recordsButton.setTint(0xffffff);
        })

        recordsButton.on('pointerup', ()=> {
                //pantalla de records
                audio.setVolume(0);
                this.scene.start("Records");
        });

        instructionsButton.on("pointerover",()=>{
            instructionsButton.setTint(0xff0000);
        })

        instructionsButton.on("pointerout", ()=>{
            instructionsButton.setTint(0xffffff);
        })

        instructionsButton.on('pointerup', ()=> {
            audio.setVolume(0);
            this.scene.start("Instrucciones");
            //pantalla de instrucciones
        });

        salirButton.on("pointerover",()=>{
            salirButton.setTint(0xff0000);
        })

        salirButton.on("pointerout", ()=>{
            salirButton.setTint(0xffffff);
        })

        salirButton.on('pointerup', ()=> {
            window.close();
        });

    },

    update: function () {
        
    },

    hitBomb: function(player, bomb) {

    }
});