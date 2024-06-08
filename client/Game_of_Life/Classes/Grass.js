const { getMatrix, random, grassArr } = require('../utils');
const LivingEntity = require('./LivingEntity');


class Grass extends LivingEntity{
    constructor(x,y){
        super(x, y, 1);
        this.rounds = 0;
    }

    mul() {
        let matrix = getMatrix()
        this.rounds += 1;
        if (this.rounds >= 6){ // 6
            let emptyfields = this.findFields(0)
            if(emptyfields.length > 0){
                //zufällig ein Nachbarfeld-Pos auswählen
                let pos = random(emptyfields) // [x,y]
                let posX = pos[0];
                let posY = pos[1];
                let grassObj = new Grass(posX, posY);
                grassArr.push(grassObj);
                matrix[posY][posX] = this.colorCode;
            }
            this.rounds = 0;
        }
    }
}

module.exports = Grass;