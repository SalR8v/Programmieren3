const { getMatrix, random } = require('../utils');


class LivingEntity {
    constructor(x,y, colorCode){
        this.x = x;
        this.y = y;
        this.colorCode = colorCode;
        this.neighbours = [];
        this.updateNeighbours();
    }

    updateNeighbours() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(symbol){ 
        let found = [];
        let matrix = getMatrix()
        for (let i = 0; i < this.neighbours.length; i++) {
            let pos = this.neighbours[i]; // [x,y]
            let posX = pos[0];
            let posY = pos[1];
            if (posX >=0 && posY >=0 && posX < matrix[0].length && posY < matrix.length) {
                if(matrix[posY][posX] === symbol) {
                    found.push(pos)
                }
            }
        }
        return found
    }

    move(){
        let matrix = getMatrix()
        let emptyfields = this.findFields(0);
        if (emptyfields.length > 0) {
            let pos = random(emptyfields); // [x,y]
            let newX = pos[0]; 
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            this.updateNeighbours();
        }
    }
}

module.exports = LivingEntity;