// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 6;

function setup() {
    let canvasHolderWidth = windowWidth - 200; // Adjust the width to leave space for the scoreboard
    let canvas = createCanvas(canvasHolderWidth, windowHeight);
    canvas.parent('canvas-holder');
    noStroke();

    const speedSlider = document.getElementById('speed-slider');
    speedSlider.addEventListener('input', () => {
        const minSpeed = 10;
        const maxSpeed = 1000;
        const value = parseInt(speedSlider.value);
        const speed = Math.round(minSpeed * Math.pow(maxSpeed / minSpeed, value / 100));
        socket.emit('changeSpeed', speed);
    });

    const lightningButton = document.getElementById('lightning-button');
    lightningButton.addEventListener('click', () => {
        socket.emit('lightningStrike');
    });
}

socket.on('matrix', (matrix) => {
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
            if (matrix[y][x] == 6) {
                fill("orange");
            }
            rect(cellSize * x, cellSize * y, cellSize, cellSize);
        }
    }
});

// Event listener for entity counts
socket.on('entityCounts', (counts) => {
    document.getElementById('grass-count').textContent = counts.grass;
    document.getElementById('grazer-count').textContent = counts.grazers;
    document.getElementById('predator-count').textContent = counts.predators;
    document.getElementById('corpse-count').textContent = counts.corpses;
    document.getElementById('eradicator-count').textContent = counts.eradicators;
});
