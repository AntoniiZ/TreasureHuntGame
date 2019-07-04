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

var x = 32;
var y = 480;
var score = 0;
var results=0;

var game = new Phaser.Game(config);