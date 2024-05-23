const { initialMatrix, getRandomMatrix } = require('./matrix');
const { Grass, Grazer /*, other classes */ } = require('./classes');

let matrix = initialMatrix;  // Use initialMatrix here
let cube_size = 5;
let fr = 20;

let grassArr = [];
let grazerArr = [];
let predatorArr = [];
let corpseArr = [];
let eradicatorArr = [];

function setup() {
    matrix = getRandomMatrix(125, 125);
    createCanvas(matrix[0].length * cube_size + 1, matrix.length * cube_size + 1);
    background("#acacac");
    frameRate(fr);

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] === 1) {
                grassArr.push(new Grass(x, y));
            } else if (matrix[y][x] === 2) {
                grazerArr.push(new Grazer(x, y));
            } else if (matrix[y][x] === 3) {
                predatorArr.push(new Predator(x, y));
            } else if (matrix[y][x] === 4) {
                corpseArr.push(new Corpse(x, y));
            } else if (matrix[y][x] === 5) {
                eradicatorArr.push(new Eradicator(x, y));
            }
        }
    }
    console.log(grassArr);
    console.log(grazerArr);
    console.log(predatorArr);
}

function draw() {
    for (let i = 0; i < grassArr.length; i++) {
        grassArr[i].mul();
    }
    for (let i = 0; i < grazerArr.length; i++) {
        grazerArr[i].mul();
        grazerArr[i].eat();
    }
    for (let i = 0; i < predatorArr.length; i++) {
        predatorArr[i].mul();
        predatorArr[i].eat();
    }
    for (let i = 0; i < corpseArr.length; i++) {
        corpseArr[i].decompose();
    }
    for (let i = 0; i < eradicatorArr.length; i++) {
        eradicatorArr[i].move();
        eradicatorArr[i].destroyNeighbours();
    }

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 0) {
                fill("white");
            }
            if (matrix[y][x] == 1) {
                fill("green");
            }
            if (matrix[y][x] == 2) {
                fill("yellow");
            }
            if (matrix[y][x] == 3) {
                fill("red");
            }
            if (matrix[y][x] == 4) {
                fill("grey");
            }
            if (matrix[y][x] == 5) {
                fill("purple");
            }
            rect(cube_size * x, cube_size * y, cube_size, cube_size);
        }
    }
}
