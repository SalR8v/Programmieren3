const { getMatrix, setMatrix, getRandomMatrix } = require('./utils');
const Grass = require('./Classes/Grass');
const Grazer = require('./Classes/Grazer');
const Predator = require('./Classes/Predator');
const Corpse = require('./Classes/Corpse');
const Eradicator = require('./Classes/Eradicator');

let grassArr = [];
let grazerArr = [];
let predatorArr = [];
let corpseArr = [];
let eradicatorArr = [];

function setup() {
    let matrix = getRandomMatrix(125, 125);
    setMatrix(matrix);

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
    console.log('Initial Grass:', grassArr);
    console.log('Initial Grazers:', grazerArr);
    console.log('Initial Predators:', predatorArr);
    logMatrix(getMatrix());
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

    // Log matrix or some representation if needed for debugging
    logMatrix(getMatrix());
}

function logMatrix(matrix) {
    for (let y = 0; y < matrix.length; y++) {
        console.log(matrix[y].join(' '));
    }
    console.log('\n');
}

// Initialize and run the simulation
setup();
draw();
