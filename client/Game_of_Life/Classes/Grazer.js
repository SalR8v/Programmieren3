const { getMatrix, random, grassArr, grazerArr, corpseArr } = require('../utils');
const LivingEntity = require('./LivingEntity');
const Corpse = require('./Corpse');

class Grazer extends LivingEntity{
    constructor(x,y){
        super(x, y, 2)
        this.eaten = 0
        this.notEaten = 0
    }

    eat(){
        let matrix = getMatrix()
        let grassfields = this.findFields(1)
        if (grassfields.length > 0) {
            let pos = random(grassfields);
            let newX = pos[0]; 
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
            for (let i = 0; i < grassArr.length; i++) {
                let grasObj = grassArr[i];
                if (grasObj.x === this.x && grasObj.y === this.y ) {
                    grassArr.splice(i, 1);
                    break;
                }
            }
        this.eaten++;
        this.notEaten = 0;
        }else{
            this.eaten = 0;
            this.notEaten++;

            if (this.notEaten >= 3) {
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
        for (let i = 0; i < grazerArr.length; i++) {
          let grazerObj = grazerArr[i];
          if (grazerObj.x === this.x && grazerObj.y === this.y) {
            grazerArr.splice(i, 1);
            break;
            }
            
        }
    }

    mul(){
        let matrix = getMatrix()
        if (this.eaten >= 5) {
            let emptyfields = this.findFields(0)
            if (emptyfields.length > 0) {
                let pos = random(emptyfields);
                let newX = pos[0]; 
                let newY = pos[1];
                grazerArr.push(new Grazer(newX, newY))
                matrix[newY][newX] = this.colorCode;
            }
            this.eaten = 0
        }
    }

}

module.exports = Grazer;