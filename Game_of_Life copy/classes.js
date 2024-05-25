class LivingEntity {
    constructor(x,y, colorCode){
        this.x = x;
        this.y = y;
        this.colorCode = colorCode;
        this.neighbours = [];
        this.updateNeighbours();
    }

    updateNeighbours() {
        this.neighbours = [
            [this.x - 1, this.y - 1],
            [this.x    , this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y    ],
            [this.x + 1, this.y    ],
            [this.x - 1, this.y + 1],
            [this.x    , this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }

    findFields(symbol){ 
        let found = [];
        for (let i = 0; i < this.neighbours.length; i++) {
            let pos = this.neighbours[i]; // [x,y]
            let posX = pos[0];
            let posY = pos[1];
            if (posX >=0 && posY >=0 && posX < matrix[0].length && posY < matrix.length) {
                if(matrix[posY][posX] === symbol) {
                    found.push(pos)
                }
            }
        }
        return found
    }

    move(){
        let emptyfields = this.findFields(0);
        if (emptyfields.length > 0) {
            let pos = random(emptyfields); // [x,y]
            let newX = pos[0]; 
            let newY = pos[1];
            matrix[this.y][this.x] = 0;
            matrix[newY][newX] = this.colorCode;
            this.x = newX;
            this.y = newY;
        }
    }
}

class Grass extends LivingEntity{
    constructor(x,y){
        super(x, y, 1);
        this.rounds = 0;
    }

    mul() {
        this.rounds += 1;
        if (this.rounds >= 6){
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

class Grazer extends LivingEntity{
    constructor(x,y){
        super(x, y, 2)
        this.eaten = 0
        this.notEaten = 0
    }

    eat(){
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

class Predator extends LivingEntity {
    constructor(x,y){
        super(x, y, 3)
        this.eaten = 0
        this.notEaten = 0   
    }

    eat(){
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
            if (this.notEaten >= 8) {
                this.die();
            } else{
                this.move();
            }
        }
    }  

    die(){
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
