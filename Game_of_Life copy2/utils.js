let spectrum = [0, 1, 2, 3, 5];
let probabilities = [0, 0.8, 0.1, 0.1, 0.001];

let matrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 3]
];

let grassArr = [];
let grazerArr = [];
let predatorArr = [];
let corpseArr = [];
let eradicatorArr = [];

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

function getRandomMatrix(b, h) {
    let matrix = [];
    for (let y = 0; y < h; y++) {
        matrix.push([]);
        for (let x = 0; x < b; x++) {
            matrix[y][x] = generateRandomNumber(spectrum, probabilities);
        }
    }
    return matrix;
}

function getMatrix() {
    return matrix;
}

function setMatrix(newMatrix) {
    matrix = newMatrix;
}

function random(...args) {
    if (args.length === 0) {
        return Math.random();
    } else if (args.length === 1 && Array.isArray(args[0])) {
        return args[0][Math.floor(Math.random() * args[0].length)];
    } else if (args.length === 1 && typeof args[0] === 'number') {
        return Math.floor(Math.random() * args[0]);
    } else if (args.length === 2 && typeof args[0] === 'number' && typeof args[1] === 'number') {
        return Math.floor(Math.random() * (args[1] - args[0] + 1) + args[0]);
    } else {
        console.log(args);
        throw new Error('Invalid arguments');
    }
}

module.exports = { getMatrix, setMatrix, getRandomMatrix, random, grassArr, grazerArr, predatorArr, corpseArr, eradicatorArr };
