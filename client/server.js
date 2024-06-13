const {
    setup,
    draw
} = require("./Game_of_Life/script.js")

const {
    getMatrix, grassArr, grazerArr, predatorArr, corpseArr, eradicatorArr
} = require("./Game_of_Life/utils.js")


const express = require('express');
const { get } = require("http");
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

let interval;
let intervalTime = 30; // Default interval time

// Array to track cells struck by lightning
let struckCells = [];

// we say Express that the files in the client folder are static
app.use(express.static('.'));

// if a user opens the page, they will be redirected to the index.html file
app.get('/', (req, res) => {
    res.redirect('/index.html');
});

// we start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

// if a user connects to the server, this function is executed
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log('user disconnected');

        // we stop the game if the user disconnects
        clearInterval(interval);
    });

    socket.on('changeSpeed', (newSpeed) => {
        clearInterval(interval);
        intervalTime = newSpeed;
        startInterval();
    });

    socket.on('lightningStrike', () => {
        performLightningStrike();
    });

    setup();
    startInterval();
});

function startInterval() {
    interval = setInterval(() => {
        const matrix = getMatrix();
        draw();

        updateStruckCells(matrix);

        // Send matrix and entity counts to the client
        io.emit('matrix', matrix);
        io.emit('entityCounts', {
            grass: grassArr.length,
            grazers: grazerArr.length,
            predators: predatorArr.length,
            corpses: corpseArr.length,
            eradicators: eradicatorArr.length
        });
    }, intervalTime);
}

function performLightningStrike() {
    const matrix = getMatrix();
    const x = Math.floor(Math.random() * matrix[0].length);
    const y = Math.floor(Math.random() * matrix.length);

    const radius = 1; // Define the radius of the lightning strike effect
    for (let i = -radius; i <= radius; i++) {
        for (let j = -radius; j <= radius; j++) {
            const newX = x + i;
            const newY = y + j;
            if (newX >= 0 && newX < matrix[0].length && newY >= 0 && newY < matrix.length) {
                if (!isEradicatorAt(newX, newY)) {
                    matrix[newY][newX] = 6; // Mark the cell as struck by lightning (orange)

                    // Add to struckCells array
                    struckCells.push({ x: newX, y: newY, turns: 0 });

                    // Remove entities from the arrays
                    removeEntity(grassArr, newX, newY);
                    removeEntity(grazerArr, newX, newY);
                    removeEntity(predatorArr, newX, newY);
                    removeEntity(corpseArr, newX, newY);
                }
            }
        }
    }
    io.emit('matrix', matrix);
    io.emit('entityCounts', {
        grass: grassArr.length,
        grazers: grazerArr.length,
        predators: predatorArr.length,
        corpses: corpseArr.length,
        eradicators: eradicatorArr.length
    });
}

function updateStruckCells(matrix) {
    for (let i = struckCells.length - 1; i >= 0; i--) {
        const cell = struckCells[i];
        cell.turns++;
        if (cell.turns >= 3) {
            matrix[cell.y][cell.x] = 0; // Change back to original state
            struckCells.splice(i, 1); // Remove from struckCells array
        }
    }
}

function isEradicatorAt(x, y) {
    for (const eradicator of eradicatorArr) {
        if (eradicator.x === x && eradicator.y === y) {
            return true;
        }
    }
    return false;
}

function removeEntity(arr, x, y) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].x === x && arr[i].y === y) {
            arr.splice(i, 1);
            break;
        }
    }
}
