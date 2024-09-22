/* DECLARE VARIABLES */
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timeDisplay = document.getElementById('time-display');
const stars = [];
let time = 0;

class SkyObject {
    constructor(position, radius, color) {
        this._position = position;
        this._radius = radius;
        this._color = color;
    }

    get position() {
        return this._position;
    }

    get radius() {
        return this._radius;
    }

    get color() {
        return this._color;
    }

    get x() {
        return this._position[0];
    }

    get y() {
        return this._position[1];
    }

    set x(integer) {
        this._position[0] = integer;
    }

    set y(integer) {
        this._position[1] = integer;
    }

    set position(coordinatesArray) {
        this._position = coordinatesArray;
    }

    set radius(integerLength) {
        this._radius = integerLength;
    }

    set color(rgbaString) {
        this._color = rgbaString;
    }
}

function randomPercentage() {
    return Math.floor(Math.random() * 100);
}

/* CREATE SUN */
let sun = new SkyObject([0, canvas.height / 2], 15, "rgba(255,255,255,1")
/* CREATE PLANET */
let planet = new SkyObject([canvas.width / 2, canvas.height / 2], 60, "rgba(0,0,0,1)");
/* CREATE STARS */
for (let i = 0; i < 6000; i++) {
    let randomX = Math.floor(Math.random() * canvas.width * 2);
    let randomY;
    let galaxy = false;
    if (randomPercentage() < 10) {
        randomY = Math.floor(Math.random() * canvas.height);
    } else if (randomPercentage() < 20) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.9 - canvas.height * 0.1 + 1) + canvas.height * 0.1);
    } else if (randomPercentage() < 30) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.8 - canvas.height * 0.2 + 1) + canvas.height * 0.2);
    } else if (randomPercentage() < 40) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.7 - canvas.height * 0.3 + 1) + canvas.height * 0.3);
    } else if (randomPercentage() < 50) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.6 - canvas.height * 0.4 + 1) + canvas.height * 0.4);
    } else {
        randomY = Math.floor(Math.random() * (canvas.height * 0.55 - canvas.height * 0.45 + 1) + canvas.height * 0.45);
        if (randomPercentage() < 20) {
            galaxy = true;
        }
    }

    let position = [randomX, randomY];
    let randomR = Math.floor(Math.random() * 30 + 225);
    let randomG = Math.floor(Math.random() * 30 + 225);
    let randomB = Math.floor(Math.random() * 30 + 225);
    let randomA = Math.floor(Math.random() * 11) / 10;
    let color = `rgba(${randomR},${randomG},${randomB},${randomA})`;
    let radius;

    if (i % 60 == 0) {
        // This is a big star.
        radius = 2;
    } else if (galaxy) {
        // This is galaxy haze.
        let galaxyColors = ['rgba(255,140,0,0.02)', 'rgba(230,85,125,0.04', 'rgba(0,0,140,0.08'];
        let randomIndex = Math.floor(Math.random() * 3);
        color = galaxyColors[randomIndex];
        radius = 30;
    } else {
        radius = 1;
    }

    let skyObject = new SkyObject(position, radius, color);
    stars.push(skyObject);
}
console.log('STARS have been created:', stars.length);
//console.log(stars[0].position, stars[0].radius, stars[0].color);

function drawSun() {
    drawCircle(sun.x, sun.y, sun.radius + 64, 'rgba(255, 255, 215, 0.05');
    drawCircle(sun.x, sun.y, sun.radius + 32, 'rgba(255, 255, 220, 0.05');
    drawCircle(sun.x, sun.y, sun.radius + 16, 'rgba(255, 255, 225, 0.1');
    drawCircle(sun.x, sun.y, sun.radius + 8, 'rgba(255, 255, 230, 0.1');
    drawCircle(sun.x, sun.y, sun.radius + 4, 'rgba(255, 255, 235, 0.2');
    drawCircle(sun.x, sun.y, sun.radius + 3, 'rgba(255, 255, 240, 0.2');
    drawCircle(sun.x, sun.y, sun.radius + 2, 'rgba(255, 255, 245, 0.4');
    drawCircle(sun.x, sun.y, sun.radius + 1, 'rgba(255, 255, 250, 0.8)');
    drawCircle(sun.x, sun.y, sun.radius, sun.color);
}

function moveSun() {
    if (sun.x == 999) {
        sun.x = 0;
    } else {
        sun.x++;
    }
}

function drawPlanet() {
    if (Math.abs(planet.x - sun.x) < planet.radius - 40) {
        drawCircle(planet.x, planet.y, planet.radius + 1, 'rgba(255,255,255,0.05');
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(16,8,0,1');
    } else if (Math.abs(planet.x - sun.x) < planet.radius - 30) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(18,9,0,1');
    } else if (Math.abs(planet.x - sun.x) < planet.radius - 20) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(20,10,0,1');
    } else if (Math.abs(planet.x - sun.x) < planet.radius - 10) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(24,12,0,1');
    } else if (Math.abs(planet.x - sun.x) < planet.radius - 8) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(30,15,0,1');
    } else if (Math.abs(planet.x - sun.x) < planet.radius - 4) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(31,16,0,1');
    }else if (sun.x > canvas.width) {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(36,18,0,1');
    } else {
        drawCircle(planet.x, planet.y, planet.radius, 'rgba(32,16,0,1');
    }
}

/* BUTTON FUNCTIONS */

function showCanvas() {
    canvas.style.visibility = "visible";
    console.log('SHOW CANVAS has executed.');
    document.getElementById('begin').style.display = "none";
    document.getElementById('buttons').style.display = "block";
}

/* CANVAS FUNCTIONS */

function clear() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function getCenter() {
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    return [x, y];
}

function drawCircle(x, y, radius, color) {
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawStars() {
    for (s of stars) {
        //console.log('Drawing star at', s.x, s.y, 'with radius', s.radius, 'and color', s.color);
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
    }
    //console.log('STARS have been drawn.');
}

function moveStars() {
    for (s of stars) {
        if (s.x === 999) {
            s.x = 0;
        } else {
            s.x++;
        }
    }
}

function setup() {
    clear();
    drawStars();
}

function main() {
    setup();
    for (let i = 0; i < 10000; i++) {
        setTimeout(() => {
            timeDisplay.textContent = time;
            clear();
            moveStars();
            moveSun();
            drawStars();
            drawSun();
            drawPlanet();
            time++;
        }, i * 25);
    }
}

main();