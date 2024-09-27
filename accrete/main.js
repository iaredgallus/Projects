/* DECLARE VARIABLES */
const totalTime = 1000;
const timeDelay = 25;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timeDisplay = document.getElementById('time-display');
const stars = [];
const planets = [];
const numStars = 8000;
let galaxyColors = [[255,140,0,0.02], [230,85,125,0.04], [0,0,140,0.08]];
let time = 0;
let sunRadius = 18;
let planetRadius = 40;
let planetColor = [200, 200, 200, 1];
let path;

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

    get r() {
        return this._color[0];
    }

    get g() {
        return this._color[1];
    }

    get b() {
        return this._color[2];
    }

    get a() {
        return this._color[3];
    }

    get color() {
        return rgbaString(this._color[0], this._color[1], this._color[2], this._color[3]);
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

/* HELPER FUNCTIONS */
function randomPercentage() {
    return Math.floor(Math.random() * 100);
}

function rgbaString(r, g, b, a) {
    return `rgba(${r},${g},${b},${a})`;
}

/* CREATE SUN, PLANET */
let sun = new SkyObject([0, canvas.height / 2], sunRadius, [255,255,255,1]);
let planet = new SkyObject([canvas.width / 2, canvas.height / 2], planetRadius, planetColor);
/* CREATE STARS */
for (let i = 0; i < numStars; i++) {
    let randomX = Math.floor(Math.random() * canvas.width * 2);
    let randomY;
    let galaxy = false;
    // Determine density of stars
    if (randomPercentage() < 10) {
        randomY = Math.floor(Math.random() * canvas.height);
    } else if (randomPercentage() < 20) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.9 - canvas.height * 0.1 + 1) + canvas.height * 0.1);
    } else if (randomPercentage() < 30) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.8 - canvas.height * 0.2 + 1) + canvas.height * 0.2);
    } else if (randomPercentage() < 40) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.7 - canvas.height * 0.3 + 1) + canvas.height * 0.3);
        // Add galaxy haze to near-middle of the sky, 5% chance
        if (randomPercentage() < 5) {
            galaxy = true;
        }
    } else if (randomPercentage() < 50) {
        randomY = Math.floor(Math.random() * (canvas.height * 0.6 - canvas.height * 0.4 + 1) + canvas.height * 0.4);
        // Add galaxy haze to near-middle of the sky, 10% chance
        if (randomPercentage() < 10) {
            galaxy = true;
        }
    } else {
        randomY = Math.floor(Math.random() * (canvas.height * 0.55 - canvas.height * 0.45 + 1) + canvas.height * 0.45);
        // Add galaxy haze to middle of the sky, 15% chance
        if (randomPercentage() < 15) {
            galaxy = true;
        }
    }

    // Select random RGBA values
    let position = [randomX, randomY];
    let randomR = Math.floor(Math.random() * 30 + 225);
    let randomG = Math.floor(Math.random() * 30 + 225);
    let randomB = Math.floor(Math.random() * 30 + 225);
    let randomA = Math.floor(Math.random() * 8 + 3) / 10;
    let radius;

    // Determine size of star objects
    if (i % 60 == 0) {
        // Big star, 10% of sky
        radius = 2;
    } else if (galaxy) {
        // Galaxy haze
        let randomIndex = Math.floor(Math.random() * 3);
        randomR = galaxyColors[randomIndex][0];
        randomG = galaxyColors[randomIndex][1];
        randomB = galaxyColors[randomIndex][2];
        randomA = galaxyColors[randomIndex][3];
        radius = 30;
    } else {
        // Small star
        radius = 1;
    }

    let skyObject = new SkyObject(position, radius, [randomR, randomG, randomB, randomA]);
    stars.push(skyObject);
}
console.log('STARS have been created:', stars.length);

function drawSun() {
    let step = 64;
    let a = 0.001;
    let newX = sun.x;
    // If sun is almost at canvas edge, begin rendering aura at negative x-value
    if (sun.x > 999 - step * 2) {
        newX = 0 - (999 - sun.x);
    }
    for (let i = step; i > 0; i--) {
        drawCircle(newX, sun.y, sun.radius + (i * 3), rgbaString(255,255,255-i,a));
        a = a * 1.085;
    }

    // Enlarge sun slightly at edges of view
    let firstFifth = canvas.width / 5;
    let secondFifth = canvas.width * 4 / 5;
    let fraction = canvas.width / 6;
    if (newX < firstFifth || newX > secondFifth) {
        let diff;
        if (newX < firstFifth) {
            diff = (firstFifth - newX) / fraction;
        } else {
            diff = (newX - secondFifth) / fraction;
        }
        drawOvalLeft(newX, sun.y, sun.radius, sun.radius + diff, sun.color);
        drawOvalRight(newX, sun.y, sun.radius, sun.radius + diff, sun.color);
    } else {
        drawCircle(newX, sun.y, sun.radius, sun.color);
    }
}

function moveSun() {
    if (sun.x == 999) {
        sun.x = 0;
    } else {
        sun.x++;
    }
}

function darkenLeft() {
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fillStyle = 'black';
    ctx.fill();
}

function darkenRight() {
    ctx.beginPath();
    ctx.arc(planet.x, planet.y, planet.radius, Math.PI * 1.5, Math.PI * 0.5);
    ctx.fillStyle = 'black';
    ctx.fill();
}


function drawPlanet() {
    drawCircle(planet.x, planet.y, planet.radius, rgbaString(planet.r, planet.g, planet.b, planet.a));
    drawCircle(planet.x, planet.y, planet.radius + 2, rgbaString(0,0,255,0.2));
    
    let shadowColor = rgbaString(0,0,0,0.9);
    let zeroToDiameter = Math.floor((planet.radius / 90 * path) % (planet.radius * 2));
    let countUp = (zeroToDiameter + planet.radius) % (planet.radius * 2);
    let countDown = (planet.radius * 2) - countUp;

    /*
    let numberOfGradients = 16;
    for (let i = -(numberOfGradients / 2); i < numberOfGradients; i++) {
        let newColor = rgbaString(0,0,0,1/numberOfGradients);
        let newPath = Math.abs((path + i)) % 360;
        let newCountUp = Math.abs(countUp + i) % (planet.radius * 2);
        let newCountDown = Math.abs(countDown + i) % (planet.radius * 2);
        console.log('newPath',newPath, 'newCountUp:',newCountUp,'newCountDown:',newCountDown);

        //console.log(newCountUp, newCountDown);
    
        if (newPath < 90) {
            // Waning crescent
            addShadow(planet.x, planet.y, planet.radius, newCountUp, newColor);
        } else if (newPath < 180) {
            // Waxing crescent
            removeShadow(planet.x, planet.y, planet.radius, newCountDown, newColor);
        } else if (newPath < 270) {
            // Waxing gibbous
            removeShadow(planet.x, planet.y, planet.radius, newCountDown, newColor);
        } else if (newPath < 360) {
            // Waning gibbous
            addShadow(planet.x, planet.y, planet.radius, newCountUp, newColor);
        }    
    }
    */

    if (path < 90) {
        // Waning crescent (shadow increasing to left)
        addShadow(planet.x, planet.y, planet.radius, countUp, shadowColor);
    } else if (path < 180) {
        // Waxing crescent (shadow decreasing from right)
        removeShadow(planet.x, planet.y, planet.radius, countDown, shadowColor);
    } else if (path < 270) {
        // Waxing gibbous (shadow decreasing to left)
        removeShadow(planet.x, planet.y, planet.radius, countDown, shadowColor);
    } else if (path < 360) {
        // Waning gibbous (shadow increasing from right)
        addShadow(planet.x, planet.y, planet.radius, countUp, shadowColor);
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

function drawOvalLeft(x, y, radiusX, radiusY, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, 0, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fillStyle = color;
    ctx.fill();
}

function drawOvalRight(x, y, radiusX, radiusY, color) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, Math.PI, Math.PI * 0.5, Math.PI * 1.5);
    ctx.fillStyle = color;
    ctx.fill();
}

function addShadow(x, y, radius, shadowWidth, color, tilt = 0, newXRadius) {
    let crescent;
    let xRadius;
    if (newXRadius != null) {
        xRadius = newXRadius;
    } else {
        xRadius = radius;
    }
    if (shadowWidth < xRadius) {
        crescent = true;
        shadowWidth = xRadius - shadowWidth;
    } else {
        crescent = false;
        shadowWidth = shadowWidth - xRadius;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, xRadius, radius, tilt, Math.PI*1.5, Math.PI*0.5);
    ctx.ellipse(x, y, shadowWidth, radius, tilt, Math.PI*0.5, Math.PI*1.5, crescent);
    ctx.fillStyle = color;
    ctx.fill();
}

function removeShadow(x, y, radius, shadowWidth, color, tilt = 0, newXRadius) {
    let crescent;
    let xRadius;
    if (newXRadius != null) {
        xRadius = newXRadius;
    } else {
        xRadius = radius;
    }
    if (shadowWidth < xRadius) {
        crescent = true;
        shadowWidth = xRadius - shadowWidth;
    } else {
        crescent = false;
        shadowWidth = shadowWidth - xRadius;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, xRadius, radius, tilt, Math.PI*0.5, Math.PI*1.5);
    ctx.ellipse(x, y, shadowWidth, radius, tilt, Math.PI*1.5, Math.PI*0.5, crescent);
    ctx.fillStyle = color;
    ctx.fill();

    //console.log('xRadius:', xRadius);
}

function drawStars() {
    for (s of stars) {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.fill();
    }
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
    for (let i = 0; i < totalTime; i++) {
        setTimeout(() => {
            timeDisplay.textContent = time;
            // PATH divides canvas into 360 degrees based on sun's x-position
            path = Math.floor((sun.x * (360 / (canvas.width * 2))));
            clear();
            moveStars();
            moveSun();
            drawStars();
            drawSun();
            drawPlanet();
            time++;
        }, i * timeDelay);
    }
}

main();