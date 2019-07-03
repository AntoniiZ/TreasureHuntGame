var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 512,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Load, Start, LoadTheGame, Maze, End]
};

var x = 96;
var y = 416;

var game = new Phaser.Game(config);
