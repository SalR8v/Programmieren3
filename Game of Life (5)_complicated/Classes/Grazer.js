const LivingEntity = require('./LivingEntity.js');
const { matrix, grazerArr, grassArr, corpseArr } = require('../matrix.js');
const Corpse = require('./Corpse.js');

module.exports = class Grazer extends LivingEntity {
    constructor(x, y) {
        super(x, y, 2);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let grassfields = this.findFields(1);
        if (grassfields.length > 0) {
            let pos = grassfields[Math.floor(Math.random() * grassfields.length)];
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grassArr.length; i++) {
                let grasObj = grassArr[i];
                if (grasObj.x === this.x && grasObj.y === this.y) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
            this.eaten++;
            this.notEaten = 0;
        } else {
            this.eaten = 0;
            this.notEaten++;

            if (this.notEaten >= 3) {
                this.die();
            } else {
                this.move();
            }
        }
    }

    die() {
        let corpseObj = new Corpse(this.x, this.y);
        corpseArr.push(corpseObj);
        matrix[this.y][this.x] = corpseObj.colorCode;
        for (let i = 0; i < grazerArr.length; i++) {
            let grazerObj = grazerArr[i];
            if (grazerObj.x === this.x && grazerObj.y === this.y) {
                grazerArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        if (this.eaten >= 5) {
            let emptyfields = this.findFields(0);
            if (emptyfields.length > 0) {
                let pos = emptyfields[Math.floor(Math.random() * emptyfields.length)];
                let newX = pos[0];
                let newY = pos[1];
                grazerArr.push(new Grazer(newX, newY));
                matrix[newY][newX] = this.colorCode;
            }
            this.eaten = 0;
        }
    }
};
