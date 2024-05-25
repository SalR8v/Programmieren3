const { matrix, grassArr, corpseArr } = require('../matrix.js');
const Grass = require('./Grass.js');

module.exports = class Corpse {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorCode = 4;
        this.decompositionTime = 7;
        this.decompositionCounter = 0;
    }

    decompose() {
        this.decompositionCounter++;
        if (this.decompositionCounter >= this.decompositionTime) {
            let grassObj = new Grass(this.x, this.y);
            grassArr.push(grassObj);
            matrix[this.y][this.x] = grassObj.colorCode;
            this.destroy();
        }
    }

    destroy() {
        matrix[this.y][this.x] = 0;
        for (let i = 0; i < corpseArr.length; i++) {
            let corpseObj = corpseArr[i];
            if (corpseObj.x === this.x && corpseObj.y === this.y) {
                corpseArr.splice(i, 1);
                break;
            }
        }
    }
};
