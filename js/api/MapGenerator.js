import {config2} from "../config/config.js";
export class MapGenerator {
    static fixed() {
        return [
            [0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, -1, 0, 0],
            [0, -2, 0, 0, 0, -2, 0, -3, 0, -2, 0, -3, 0, -2, 0, 0],
            [-2, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
            [0, 0, 0, -3, 0, -3, 0, -2, 0, -3, 0, -2, 0, -3, 0, 0],
            [-2, -1, 0, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -2, -1],
            [0, -2, 0, -2, 0, -3, 0, -3, 0, -2, 0, -3, 0, -2, 0, 0],
            [0, -1, -2, -1, 0, -1, 0, -1, -2, -1, -2, -1, -2, -1, -3, -1],
            [0, 0, 0, -1, 0, 0, 0, -2, 0, -3, 0, -2, 0, -2, 0, 0]
        ]
    }
    static stackPrim(map, sizeY, sizeX){
        let map2 = this.primMaze(sizeY, sizeX);
        for(let i = 0; i < sizeY; i++) {
            for (let j = 0; j < sizeX; j++) {
                if(!map2[i][j]){
                    map[i][j] = map2[i][j];
                }
            }
        }
    }
    static randomized(sizeY, sizeX){
        let map = this.primMaze(sizeY-1, sizeX);
        this.stackPrim(map, sizeY-1, sizeX);


        for(let i = 0; i < sizeY; i++){
            for(let j = 0; j < sizeX; j++){
                if(i===0 || j===0 || i===sizeY-2 || j===sizeY-2){
                    if(map[i][j] && Math.random() < 0.5){
                        map[i][j] = 0;
                    }
                }
                if(i !== sizeY-1) {
                    if (map[i][j]) {
                        if (Math.random() < 0.6 || i === 0 || j === 0 || j === sizeX-1) {
                            map[i][j] = -1;
                        } else {
                            map[i][j] = -3;
                        }
                    }
                } else {
                    map[i][j] = 0;
                }
            }
        }

        for(let i = 1; i < sizeY-1; i++) {
            for (let j = 1; j < sizeX-1; j++) {
                if((map[i-1][j] === -3 && map[i+1][j] === -3) ||
                    (map[i][j-1] === -3 && map[i][j+1] === -3) ||
                    (map[i-1][j] === -1 && map[i+1][j] === -1) ||
                    (map[i][j-1] === -1 && map[i][j+1] === -1)){
                    if(!map[i-1][j]){
                        map[i-1][j] = -2;
                    }
                    else if(!map[i+1][j]){
                        map[i-1][j] = -2;
                    }
                    else if(!map[i][j-1]){
                        map[i][j-1] = -2;
                    }
                    else if(!map[i][j+1]){
                        map[i][j+1] = -2;
                    }
                    else {
                        map[i][j] = -2;
                    }

                }

            }
        }
        return map;
    }
    static inMaze(row, col, sizeY, sizeX){
        return row > 0 && row < sizeY &&
            col > 0 && col < sizeX;
    }
    static addWalls(row, col, sizeY, sizeX){
        let dir = [[0, 1], [1, 0], [0, -1], [-1, 0]];
        for(let i = 0; i < dir.length; i++){
            let wallRow = row + dir[i][0];
            let wallCol = col + dir[i][1];
            let cellRow = wallRow + dir[i][0];
            let cellCol = wallCol + dir[i][1];

            if(!(this.inMaze(wallRow, wallCol, sizeY, sizeX)) ||
                !(this.inMaze(cellRow, cellCol, sizeY, sizeX))){
                continue;
            }
            this.walls.push([wallRow, wallCol,
                cellRow, cellCol]);
        }
    }
    static primMaze(sizeY, sizeX) {
        /// put randomizing map algorithm here
        let maze = [];
        this.walls = [];
        for(let row = 0; row < sizeY; row++){
            maze[row] = [];
            for(let col = 0; col < sizeX; col++){
                maze[row][col] = 1;
            }
        }
        maze[sizeY] = [];
        let cellRow = sizeY - 2, cellCol = 1;
        maze[cellRow][cellCol] = 0;
        this.addWalls(cellRow, cellCol, sizeY, sizeX);
        while(this.walls.length > 0){
            let id = Math.floor(Math.random() * this.walls.length);
            let wallRow = this.walls[id][0], wallCol = this.walls[id][1];
            let cellRow = this.walls[id][2], cellCol = this.walls[id][3];

            this.walls.splice(id, 1);

            if(!maze[cellRow][cellCol] ||
                !maze[wallRow][wallCol]){
                continue;
            }
            maze[wallRow][wallCol] = 0;
            maze[cellRow][cellCol] = 0;
            this.addWalls(cellRow, cellCol, sizeY, sizeX);
        }

        maze[sizeY-1][0] = 0;
        if(Math.random() < 0.5) {
            maze[sizeY - 1][1] = 0;
        } else {
            maze[sizeY - 2][0] = 0;
        }
        if(Math.random() < 0.5) {
            maze[0][sizeX - 2] = 0;
        } else {
            maze[1][sizeX - 1] = 0;
        }
        maze[0][sizeX - 1] = 0;

        return maze;
    }

}