// Socket.io: Verbindung zum Server herstellen
// Die socket Variable enthält eine Verbindung zum Server.
const socket = io();
const cellSize = 7;

// setup Funktion von p5.js
function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke()
}

// Mit socket.on() können wir auf Ereignisse vom Server reagieren.
// Hier reagieren wir auf das Ereignis matrix, das uns die aktuelle Matrix vom Server sendet.
socket.on('matrix', (matrix) => {
    // Die Matrix wird auf den Bildschirm gezeichnet.
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
            if (matrix[y][x] == 5) {
                fill("purple")
            }
            rect(cellSize * x, cellSize * y, cellSize, cellSize);
        }
    }
});



// wir können hier auch auf andere Ereignisse reagieren, die der Server sendet
// socket.on('someEvent', (data) => {