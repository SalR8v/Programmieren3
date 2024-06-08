const { getMatrix, random, grazerArr, predatorArr, corpseArr } = require('../utils');
const LivingEntity = require('./LivingEntity');
const Corpse = require('./Corpse');

class Predator extends LivingEntity {
    constructor(x,y){
        super(x, y, 3)
        this.eaten = 0
        this.notEaten = 0   
    }

    eat(){
        let matrix = getMatrix()
        let grazerfields = this.findFields(2)
        if (grazerfields.length > 0) {
            let pos = random(grazerfields); //[x,y]
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
        }else{
            this.notEaten++;
            if (this.notEaten >= 35) { // 8
                this.die();
            } else{
                this.move();
            }
        }
    }  

    die(){
        let matrix = getMatrix()
        let corpseObj = new Corpse(this.x, this.y);
        corpseArr.push(corpseObj);
        matrix[this.y][this.x] = corpseObj.colorCode;
        for (let i = 0; i < predatorArr.length; i++) {
            let predatorObj = predatorArr[i];
            if (predatorObj.x === this.x && predatorObj.y === this.y) {
                predatorArr.splice(i, 1)
                break;
            }
        }
    }

    mul(){
        let matrix = getMatrix()
        if (this.eaten >= 3) {
            this.eaten = 0 
            let emptyfields = this.findFields(0)
            if (emptyfields.length > 0) {
                let pos = random(emptyfields);
                let newX = pos[0]; 
                let newY = pos[1];
                predatorArr.push(new Predator(newX, newY))
                matrix[newY][newX] = this.colorCode;
            }
            this.eaten = 0
        }
    }
}

module.exports = Predator;