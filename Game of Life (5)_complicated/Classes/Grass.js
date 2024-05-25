const LivingEntity = require('./LivingEntity.js');
const { matrix, grassArr } = require('../matrix.js');

module.exports = class Grass extends LivingEntity {
    constructor(x, y) {
        super(x, y, 1);
        this.rounds = 0;
    }

    mul() {
        this.rounds += 1;
        if (this.rounds >= 6) {
            let emptyfields = this.findFields(0);
            if (emptyfields.length > 0) {
                let pos = emptyfields[Math.floor(Math.random() * emptyfields.length)];
                let posX = pos[0];
                let posY = pos[1];
                let grassObj = new Grass(posX, posY);
                grassArr.push(grassObj);
                matrix[posY][posX] = this.colorCode;
            }
            this.rounds = 0;
        }
    }
};
