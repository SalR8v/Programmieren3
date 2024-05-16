function generateRandomNumber(spectrum, probabilities) {
    if (spectrum.length !== probabilities.length) {
      throw new Error("Invalid input: Spectrum and probabilities arrays must have the same length.");
    }
    let sumOfProbabilities = probabilities.reduce((sum, probability) => sum + probability, 0);
    let randomValue = Math.random() * sumOfProbabilities;
  
    let cumulativeProbability = 0;
    for (let i = 0; i < spectrum.length; i++) {
      cumulativeProbability += probabilities[i];
      if (randomValue <= cumulativeProbability) {
        return spectrum[i];
      }
    }
    return spectrum[spectrum.length - 1];
  }

let spectrum = [0, 1, 2, 3];
let probabilities = [0, 0.8, 0.1, 0.1];

let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 3]
];  

function getRandomMatrix(b, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        matrix.push([]);
        for (let x = 0; x < b; x++) {
            matrix[y][x] = generateRandomNumber(spectrum, probabilities)
        }
    }
    return matrix;
}


let cube_size = 5
let fr = 20

let grassArr = []
let grazerArr = []
let predatorArr = []
let corpseArr = []


function setup() {
    matrix = getRandomMatrix(100,100)
    createCanvas(matrix[0].length * cube_size + 1, matrix.length * cube_size + 1);
    background("#acacac")
    frameRate(fr)

    //Grassobjekt zum Testen
    //let grasObj = new Grass(2,0); // (x,y) x geht nach rechts und y geht nach unten
    
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                grassArr.push(new Grass(x,y));
            } else if (matrix[y][x] === 2) {
                grazerArr.push(new Grazer(x,y))
            } else if (matrix[y][x] === 3) {
                predatorArr.push(new Predator(x,y))
            } else if (matrix[y][x] === 4) {
                corpseArr.push(new Corpse(x,y))
            }
        }
    }
    console.log(grassArr)
    console.log(grazerArr)
    console.log(predatorArr)
}


function draw() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grazerArr.length; i++) {
        grazerArr[i].mul()
        grazerArr[i].eat() 
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].mul()
        predatorArr[i].eat() 
    }
    for (let i = 0; i < corpseArr.length; i++) {
        corpseArr[i].decompose()
    }
    for (let i = 0; i < eradicatorArr.length; i++) {
        
        
    }


    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("white")
            }
            if (matrix[y][x] == 1) {
                fill("green")
            }
            if (matrix[y][x] == 2) {
                fill("yellow")
            }
            if (matrix[y][x] == 3) {
                fill("red")
            }
            if (matrix[y][x] == 4) {
                fill("grey")
            }
            rect(cube_size * x, cube_size * y, cube_size, cube_size);
        }
    }
}
