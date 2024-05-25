const { getMatrix } = require('../utils');
const LivingEntity = require('./LivingEntity');

class Eradicator extends LivingEntity {
    constructor(x, y) {
        super(x, y, 5)
    }

    destroyNeighbours() {
    for (let i = 0; i < this.neighbours.length; i++) {
        let pos = this.neighbours[i];
        let posX = pos[0];
        let posY = pos[1];
        if (
        posX >= 0 &&
        posY >= 0 &&
        posX < matrix[0].length &&
        posY < matrix.length
        ) {
        let objectCode = matrix[posY][posX];
        if (objectCode !== 0 && objectCode !== this.colorCode) {
            // Check if the object is not an empty field or another Eradicator
            matrix[posY][posX] = 0; // Destroy the object by setting its code to 0
            // Remove the object from the respective array
            if (objectCode === 1) {
            this.removeGrass(posX, posY);
            } else if (objectCode === 2) {
            this.removeGrazer(posX, posY);
            } else if (objectCode === 3) {
            this.removePredator(posX, posY);
            } else if (objectCode === 4) {
            this.removeCorpse(posX, posY);
            }
        }
        }
    }
    }

    removeGrass(x, y) {
    for (let i = 0; i < grassArr.length; i++) {
        let grassObj = grassArr[i];
        if (grassObj.x === x && grassObj.y === y) {
        grassArr.splice(i, 1);
        break;
        }
    }
    }

    removeGrazer(x, y) {
    for (let i = 0; i < grazerArr.length; i++) {
        let grazerObj = grazerArr[i];
        if (grazerObj.x === x && grazerObj.y === y) {
        grazerArr.splice(i, 1);
        break;
        }
    }
    }

    removePredator(x, y) {
    for (let i = 0; i < predatorArr.length; i++) {
        let predatorObj = predatorArr[i];
        if (predatorObj.x === x && predatorObj.y === y) {
        predatorArr.splice(i, 1);
        break;
        }
    }
    }

    removeCorpse(x, y) {
    for (let i = 0; i < corpseArr.length; i++) {
        let corpseObj = corpseArr[i];
        if (corpseObj.x === x && corpseObj.y === y) {
        corpseArr.splice(i, 1);
        break;
        }
    }
    }
}

module.exports = Eradicator;