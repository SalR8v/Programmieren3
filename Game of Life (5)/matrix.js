const spectrum = [0, 1, 2, 3, 5];
const probabilities = [0, 0.8, 0.1, 0.1, 0.001];

const initialMatrix = [
    [0, 0, 1, 0, 0],
    [1, 0, 0, 0, 0],
    [0, 1, 0, 0, 0],
    [0, 0, 1, 0, 0],
    [1, 1, 0, 0, 0],
    [1, 1, 0, 2, 0],
    [1, 1, 0, 0, 3]
];

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

module.exports = { spectrum, probabilities, initialMatrix, generateRandomNumber, getRandomMatrix };
