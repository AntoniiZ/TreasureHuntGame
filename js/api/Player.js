import {Point} from "./Point.js";
import {MapOptions} from "../config/MapOptions.js";
import {Utility} from "./Utility.js";
import {EnumConstants} from "./EnumConstants.js";

export class Player {

    constructor(gameMap){
        this.gameMap = gameMap;
        this.updatePath(0, this.gameMap.getSizeY()-1);
    }

    getCoords(){
        return this.coords;
    }

    setCoords(point){
        if(!(point instanceof Point)){
            throw "Argument of setCoords must be a point";
        }
        this.coords = point;
    }

    update() {
        if (typeof this.path === "undefined") {
            throw "The player doesn't know his path";
        }
        if (this.path.length <= 1) {
            return;
        }
        let playerCoords = this.getCoords();
        let currentCoord = this.path[this.path.length - 2];
        let dX = 0, dY = 0;
        if (currentCoord.getX() > playerCoords.getX()) {
            dX = 4;
        } else if (currentCoord.getX() < playerCoords.getX()) {
            dX = -4;
        } else if (currentCoord.getY() > playerCoords.getY()) {
            dY = 4;
        } else if (currentCoord.getY() < playerCoords.getY()) {
            dY = -4;
        }
        this.setCoords(new Point(playerCoords.getX() + dX, playerCoords.getY() + dY));
        this.player.x = this.getCoords().x;
        this.player.y = this.getCoords().y;

        if (!dX && !dY) {
            this.path.splice(-1, 1);
        }
    }

    updatePath(startX, startY){
        this.path = Utility.bfs(this.gameMap, startX, startY,
            this.gameMap.getSizeX()-1, 0);
    }

    draw(){

        let playerCoords = this.coords;

        let playerImg = this.gameMap.getScene().add.image(
            playerCoords.getX(),
            playerCoords.getY(),
            `player`
        );
        playerImg.setDisplaySize(MapOptions.cellSizeX, MapOptions.cellSizeY);

        this.player = playerImg;
    }

}