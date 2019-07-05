import {Load} from "../scenes/Load.js";
import {Start} from "../scenes/Start.js";
import {End} from "../scenes/End.js";
import {LoadTheGame} from "../scenes/LoadTheGame.js";
import {Maze} from "../scenes/Maze.js";

export var config = {
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


var game = new Phaser.Game(config);
