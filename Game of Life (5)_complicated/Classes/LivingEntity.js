const { matrix } = require('../matrix.js');

module.exports = class LivingEntity {
    constructor(x, y, colorCode) {
        this.x = x;
        this.y = y;
        this.colorCode = colorCode;
        this.neighbours = [];
        this.updateNeighbours();
    }

    updateNeighbours() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(symbol) {
        let found = [];
        for (let i = 0; i < this.neighbours.length; i++) {
            let pos = this.neighbours[i];
            let posX = pos[0];
            let posY = pos[1];
            if (posX >= 0 && posY >= 0 && posX < matrix[0].length && posY < matrix.length) {
                if (matrix[posY][posX] === symbol) {
                    found.push(pos);
                }
            }
        }
        return found;
    }

    move() {
        let emptyfields = this.findFields(0);
        if (emptyfields.length > 0) {
            let pos = emptyfields[Math.floor(Math.random() * emptyfields.length)];
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
        }
    }
};
