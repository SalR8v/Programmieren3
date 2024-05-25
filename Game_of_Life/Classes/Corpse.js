const { getMatrix } = require('../utils');

class Corpse {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.colorCode = 4;
        this.decompositionTime = 7; // Define the time it takes for the corpse to decompose and spawn new grass
        this.decompositionCounter = 0; // Counter to keep track of the decomposition progress
    }

    decompose() {
        this.decompositionCounter++;
        if (this.decompositionCounter >= this.decompositionTime) {
        let grassObj = new Grass(this.x, this.y, 1); // Create a new Grass object with color code 1
        grassArr.push(grassObj);
        matrix[this.y][this.x] = grassObj.colorCode; // Set the matrix value to the colorCode of the Grass class
        this.destroy(); // Call destroy() only after creating the new grass object
        }
    }
    

    destroy() {
    // Remove the corpse from the matrix and the array of corpses
    matrix[this.y][this.x] = 0; // Set the matrix value back to 0 to remove the corpse
    for (let i = 0; i < corpseArr.length; i++) {
        let corpseObj = corpseArr[i];
        if (corpseObj.x === this.x && corpseObj.y === this.y) {
        corpseArr.splice(i, 1);
        break;
        }
    }
}}

module.exports = Corpse;