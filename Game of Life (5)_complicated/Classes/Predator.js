const LivingEntity = require('./LivingEntity.js');
const { matrix, predatorArr, grazerArr, corpseArr } = require('../matrix.js');
const Corpse = require('./Corpse.js');

module.exports = class Predator extends LivingEntity {
    constructor(x, y) {
        super(x, y, 3);
        this.eaten = 0;
        this.notEaten = 0;
    }

    eat() {
        let grazerfields = this.findFields(2);
        if (grazerfields.length > 0) {
            let pos = grazerfields[Math.floor(Math.random() * grazerfields.length)];
            let newX = pos[0];
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grazerArr.length; i++) {
                let grazerObj = grazerArr[i];
                if (grazerObj.x === this.x && grazerObj.y === this.y) {
                    grazerArr.splice(i, 1);
                    break;
                }
            }
            this.eaten++;
            this.notEaten = 0;
        } else {
            this.notEaten++;
            if (this.notEaten >= 8) {
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
        for (let i = 0; i < predatorArr.length; i++) {
            let predatorObj = predatorArr[i];
            if (predatorObj.x === this.x && predatorObj.y === this.y) {
                predatorArr.splice(i, 1);
                break;
            }
        }
    }

    mul() {
        if (this.eaten >= 3) {
            this.eaten = 0;
            let emptyfields = this.findFields(0);
            if (emptyfields.length > 0) {
                let pos = emptyfields[Math.floor(Math.random() * emptyfields.length)];
                let newX = pos[0];
                let newY = pos[1];
                predatorArr.push(new Predator(newX, newY));
                matrix[newY][newX] = this.colorCode;
            }
            this.eaten = 0;
        }
    }
};
