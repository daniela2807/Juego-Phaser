var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: "container",
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { 
                y: 300 
            },
            debug: false
        }
    },
    scene: [PresentationScene,MenuScene, PlayerScene,username, Level1Scene, GameOverScene, LevelUpScene, Records, Instrucciones,Level2Scene]
};

var game = new Phaser.Game(config);