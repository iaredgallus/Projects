/* DECLARE VARIABLES */
let timeDelay = 25;
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const timeDisplay = document.getElementById('time-display');
const volumeDisplay = document.getElementById('volume-display');
const tempDisplay = document.getElementById('temp-display');
let log = document.querySelector('#log-text');
let bombardButtons = document.getElementsByClassName('bombard');
let forwardButtons = document.getElementsByClassName('forward');
const stars = [];
const planets = [];
const numStars = 8000;
let galaxyColors = [[255,140,0,0.02], [230,85,125,0.03], [0,0,140,0.06], [0,0,140,0.06], [0,0,140,0.06]];
let time = 9400000000;
let timeIncrement = 0; // Used by Forward() to determine years per sun-movement
let tempAdded = 0;
let tempAtmosphere = 0;
let tempSun = -410;
let temp = -410;
let o2 = 0;
let sunRadius = 16;
let planetRadius = 0; // DEFAULT = 0
let planetColor = [0, 0, 0, 1]; // DEFAULT = black
let path;
let inputSize = parseInt(document.querySelector('#input-size').value);
let inputColorR = parseInt(document.querySelector('#input-color-r').value);
let inputColorG = parseInt(document.querySelector('#input-color-g').value);
let inputColorB = parseInt(document.querySelector('#input-color-b').value);
let lastMessage;
let pause = false;
let sunStart;
let volumeEarths;

/* DEFINE SKYOBJECT CLASS: sun, stars, planets */
class SkyObject {
    constructor(position, radius, color) {
        this._position = position;
        this._radius = radius;
        this._color = color;
        this._volume = 4 / 3 * Math.PI * (this._radius ** 3);
    }

    get position() {
        return this._position;
    }

    get radius() {
        return this._radius;
    }

    get volume() {
        return this._volume;
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

    set volume(newVolume) {
        this._volume = newVolume;
    }

    set color(rgbaString) {
        this._color = rgbaString;
    }

    set r(value) {
        this._color[0] = value;
    }

    set g(value) {
        this._color[1] = value;
    }

    set b(value) {
        this._color[2] = value;
    }

    set a(value) {
        return this._color[3] = value;
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

/* CREATE PLANET */
let planet = new SkyObject([canvas.width / 2, canvas.height / 2], planetRadius, planetColor);
// Pull any default values from the HTML inputs if they exist.
if (inputColorR != null && inputColorG != null && inputColorB != null) {
    planetColor
    planet.r = inputColorR;
    planet.g = inputColorG;
    planet.b = inputColorB;
    planet.a = 1;
}
if (inputSize != null) {
    planet.radius = inputSize;
    planet.volume = 4 / 3 * Math.PI * (planet.radius ** 3);
    //console.log("Planet volume:", planet.volume);
}

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
        if (randomPercentage() < 6) {
            galaxy = true;
        }
    }

    // Select random RGBA values
    let position = [randomX, randomY];
    let randomR = Math.floor(Math.random() * 30 + 225);
    let randomG = Math.floor(Math.random() * 30 + 225);
    let randomB = Math.floor(Math.random() * 30 + 225);
    let randomA = Math.random() + 0.85;
    if (randomA > 1) {randomA = 1};
    let radius;

    // Determine size of star objects
    if (i % 60 == 0) {
        // Big star, 10% of sky
        radius = 1;
    } else if (galaxy) {
        // Galaxy haze
        let randomIndex = Math.floor(Math.random() * 4);
        randomR = galaxyColors[randomIndex][0];
        randomG = galaxyColors[randomIndex][1];
        randomB = galaxyColors[randomIndex][2];
        randomA = galaxyColors[randomIndex][3];
        radius = 35;
    } else {
        // Small star
        radius = 0.5;
    }

    let skyObject = new SkyObject(position, radius, [randomR, randomG, randomB, randomA]);
    stars.push(skyObject);
}
//console.log('STARS have been created:', stars.length);

/* GET USER INPUT */
function getUserInput() {
    inputSize = parseInt(document.querySelector('#input-size').value);
    inputColorR = parseInt(document.querySelector('#input-color-r').value);
    inputColorG = parseInt(document.querySelector('#input-color-g').value);
    inputColorB = parseInt(document.querySelector('#input-color-b').value);
    console.log('INPUTS = Size:',inputSize,'R:',inputColorR,'G:',inputColorG,'B:',inputColorB);
    if (inputColorR >= 0 && inputColorR <= 255 && inputColorR != null) {
        if (inputColorR > planet.r) {
            log.textContent = "Planet color: red increased.";
        } else if (inputColorR < planet.r) {
            log.textContent = "Planet color: red decreased.";
        }
        planet.r = inputColorR;
    }
    if (inputColorG >= 0 && inputColorG <= 255 && inputColorG != null) {
        if (inputColorG > planet.g) {
            log.textContent = "Planet color: green increased.";
        } else if (inputColorG < planet.g) {
            log.textContent = "Planet color: green decreased.";
        }
        planet.g = inputColorG;
    }
    if (inputColorB >= 0 && inputColorB <= 255 && inputColorB != null) {
        if (inputColorB > planet.b) {
            log.textContent = "Planet color: blue increased.";
        } else if (inputColorB < planet.b) {
            log.textContent = "Planet color: blue decreased.";
        }
        planet.b = inputColorB;
    }
    if (inputSize >= 1 && inputSize <= 80 && inputSize != null) {
        if (inputSize > planet.radius) {
            log.textContent = "Planet size increased.";
        } else if (inputSize < planet.radius) {
            log.textContent = "Planet size decreased.";
        }
        planet.radius = inputSize;
    }
    lastMessage = Date.now();
    //console.log(lastMessage);
    //console.log('Size:',planet.radius,'R:',planet.r,'G:',planet.g,'B:',planet.b);
}

function changeSunColor() {
    let relativeTime;
    if (time > 9500000000) {
        relativeTime = time - 9500000000;
        let stepB = Math.floor(relativeTime / 300000);
        let stepG = Math.floor(stepB / 2);
        sun.g = 255 - stepG;
        sun.b = 255 - stepB;
    }
}

function checkSunSize() {
    let ratio;
    if (time < 9500000000) {
        ratio = 1 + (time / 10000000000 / 2); // Div by 2, div by 2 (for radius);
    } else {
        let relativeTime = time - 9500000000;
        //console.log(relativeTime);
        ratio = relativeTime / 10000000;
        if (ratio < 1.5) {
            ratio = 1.5;
        }
    }
    //console.log(ratio);
    return ratio;
}

function checkSunLuminosity() {
    let ratio = 1 + (time / 100000000000);
    //console.log(ratio);
    return ratio;
}

function redGiantHaze() {
    if (time > 9500000000) {
        let relativeTime = time - 9500000000;
        let ratio = relativeTime / 750000000;
        //console.log(ratio);
        return ratio;
    }
}

function drawSun() {
    let step = Math.floor(62 * checkSunLuminosity());
    sun.radius = Math.floor(sunRadius * checkSunSize());
    let size = sun.radius;
    changeSunColor();
    //console.log(size, step);
    let a = 0.001;
    let newX = sun.x;
    // If sun is almost at canvas edge, begin rendering aura at negative x-value
    if (sun.x > 999 - step * 3) {
        newX = 0 - (999 - sun.x);
    }
    for (let i = step; i > 0; i--) {
        drawCircle(newX, sun.y, size + (i * 3), rgbaString(sun.r-i,sun.g-i,sun.b-i,a));
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
        drawOvalLeft(newX, sun.y, size, size + diff, sun.color);
        drawOvalRight(newX, sun.y, size, size + diff, sun.color);
    } else {
        drawCircle(newX, sun.y, size, sun.color);
    }
}

function moveSun(integer) {
    if (sun.x >= (canvas.width * 2) - 1) {
        sun.x = 0;
    } else {
        sun.x = sun.x + integer;
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

function shadow(object) {
    let shadowColor = rgbaString(0,0,0,0.9);
    let zeroToDiameter = Math.floor((object.radius / 90 * path) % (object.radius * 2));
    let countUp = (zeroToDiameter + object.radius) % (object.radius * 2);
    let countDown = (object.radius * 2) - countUp;

    if (path < 90) {
        // Waning crescent (shadow increasing to left)
        addShadow(object.x, object.y, object.radius, countUp, shadowColor);
    } else if (path < 180) {
        // Waxing crescent (shadow decreasing from right)
        removeShadow(object.x, object.y, object.radius, countDown, shadowColor);
    } else if (path < 270) {
        // Waxing gibbous (shadow decreasing to left)
        removeShadow(object.x, object.y, object.radius, countDown, shadowColor);
    } else if (path < 360) {
        // Waning gibbous (shadow increasing from right)
        addShadow(object.x, object.y, object.radius, countUp, shadowColor);
    }
}

function drawHeatOverlay() {
    let heatR = 255;
    let heatG = 0;
    let heatB = 0;
    let heatA = 0;
    let percentOfTransition = 0;
    let hot = false;
    let veryHot = false;
    if (temp > 1800) {
        heatG = 165;
        heatA = 0.9;
        veryHot = true;
    } else if (temp > 1500) {
        percentOfTransition = (300 - 1800 + temp) / 300;
        heatG = Math.floor(percentOfTransition * 165);
        heatA = 0.9;
        hot = true;
    } else if (temp >= 900) {
        percentOfTransition = (600 - 1500 + temp) / 600;
        if (percentOfTransition > 0.9) {heatA = 0.9} else {heatA = percentOfTransition};
    }

    if (veryHot) {
        drawCircle(planet.x, planet.y, planet.radius + 8, rgbaString(heatR, heatG, heatB, 0.0675));
        drawCircle(planet.x, planet.y, planet.radius + 4, rgbaString(heatR, heatG, heatB, 0.0675));
        drawCircle(planet.x, planet.y, planet.radius + 2, rgbaString(heatR, heatG, heatB, 0.125));
        drawCircle(planet.x, planet.y, planet.radius + 1, rgbaString(heatR, heatG, heatB, 0.125));
        //console.log('Drawing very hot glow.');
    } 
    if (hot) {
        drawCircle(planet.x, planet.y, planet.radius + 4, rgbaString(heatR, heatG, heatB, 0.0675));
        drawCircle(planet.x, planet.y, planet.radius + 2, rgbaString(heatR, heatG, heatB, 0.125));
        drawCircle(planet.x, planet.y, planet.radius + 1, rgbaString(heatR, heatG, heatB, 0.125));
        //console.log('Drawing hot glow.');
    }

    drawCircle(planet.x, planet.y, planet.radius, rgbaString(heatR, heatG, heatB, heatA));

    return 1 - heatA;
}


function drawPlanet() {
    drawCircle(planet.x, planet.y, planet.radius, rgbaString(planet.r, planet.g, planet.b, planet.a));
    let shadowA = drawHeatOverlay();
    //console.log(planet.radius);
    
    let shadowColor = rgbaString(0,0,0,shadowA);
    let zeroToDiameter = Math.floor((planet.radius / 90 * path) % (planet.radius * 2));
    let countUp = (zeroToDiameter + planet.radius) % (planet.radius * 2);
    let countDown = (planet.radius * 2) - countUp;

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

    if (time > 9500000000) {
        // Add red haze over planet
        let hazeOpacity = redGiantHaze();
        drawCircle(planet.x, planet.y, planet.radius + 1, rgbaString(sun.r, sun.g, sun.b, hazeOpacity));
    }

    /* UPDATE STATS */
    updateVolumeDisplay();
    //showNewTime();
}

function updateVolumeDisplay() {
    let newRadius = Math.cbrt((3 * planet.volume) / (4 * Math.PI));
    newRadius = newRadius * 100 * 1.60934;
    let newVolume = (4 / 3 * Math.PI * (newRadius ** 3) / 1000000000000).toFixed(4);
    let newEarth = (newVolume / 1.086).toFixed(2);
    volumeEarths = newEarth;
    volumeDisplay.innerText = `Volume: ${newEarth} Earth (${newVolume} trillion km^3)`;
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

function moveStars(integer) {
    for (s of stars) {
        if (s.x >= canvas.width * 2 - 1) {
            s.x = 0;
        } else {
            s.x = s.x + integer;
        }
    }
}

function setup() {
    clear();
    drawStars();
    sunStart = Math.floor(canvas.width / 4);
    sun.x = sunStart;
    drawSun();
    path = calculatePath360(); // Calculate new sun position (defined by 360 degrees);
    drawPlanet();
    newTime();
    newTemp();
}

/* Sends a new message to the log; updates time of "lastMessage". */
function newMessage(string) {
    log.textContent = string;
    lastMessage = Date.now();
}

/* Toggles between pause and unpause; prints message to the log. */
function pauseUnpause() {
    if (pause == false) {
        pause = true;
        newMessage("Simulation paused.");
    } else {
        pause = false;
        newMessage("Simulation resumed.");
    }
}

let messageEarthSized = true;

function checkUpdates() {

}

function checkMessages() {
    if (volumeEarths == 1.00 && messageEarthSized) {newMessage("Your planet is Earth-sized!"); messageEarthSized = false};
}

function displayPaused() {
    let fontSize = 7;
    drawCircle(canvas.width / 2, canvas.height / 2, 21, rgbaString(255,255,255,0.5));
    ctx.fillStyle = rgbaString(0,0,0,0.85);
    ctx.fillRect(canvas.width / 2 - fontSize * 1.5, canvas.height / 2 - fontSize * 1.35, fontSize, fontSize * 2.85);
    ctx.fillRect(canvas.width / 2 - fontSize * 1.5 + fontSize * 2, canvas.height / 2 - fontSize * 1.35, fontSize, fontSize * 2.85);
}

/* Clears log after last message has been active for 5 seconds. */
function tryClearLog() {
    let now = Date.now();
    if (now - lastMessage >= 5000) {
        log.textContent = "";
    }
}

/* Hides the "Begin" button and displays the in-game log and stat panel. */
function showPanels() {
    document.querySelector('#begin').style.display = "none";
    document.querySelector('#input-container').style.display = "block";
    document.querySelector('#log').style.display = "flex";
    document.querySelector('#stat-display').style.display = "block";
}

function calculatePath360() {
    return Math.floor((sun.x * (360 / (canvas.width * 2)))); // Path divides sun's path into 360 degrees
}

function faster() {
    if (timeDelay > 5) {
        timeDelay -= 5;
    }
    console.log(timeDelay);
}

function slower() {
    if (timeDelay < 60) {
        timeDelay += 5;
    }
    console.log(timeDelay);
}

function calculateNewTemp(years) {
    if (tempAdded > 0) {tempAdded = tempAdded - (years * 0.0001);} else {tempAdded = 0;}
    tempAtmosphere = (90 * volumeEarths) + (-0.666 * o2);
    tempSun = -410 + (time / 100000000 * 9);
    temp = tempSun + tempAdded + tempAtmosphere;
    //console.log(`Sun: ${tempSun}, Atmosphere: ${tempAtmosphere}, Impacts: ${tempAdded}`);
}

function showNewTemp() {
    let tempFahrenheit = (temp).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    let tempCelsius = ((temp - 32) * 5 / 9).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
    let formattedTemp = `Temperature: ${tempFahrenheit} F (${tempCelsius} C)`;
    tempDisplay.textContent = formattedTemp;
}

function newTemp(optionalIncrement) {
    if (optionalIncrement === null || optionalIncrement === undefined) {
        calculateNewTemp(timeIncrement);
    } else {
        calculateNewTemp(optionalIncrement);
    }
    showNewTemp();
}

function showNewTime() {
    let year = time;
    let formattedYear;
    if (time < 1000000) {
        year = (time).toLocaleString('en-US', {minimumFractionDigits: 0, maximumFractionDigits: 0});
        formattedYear = `Year: ${year}`;
    } else if (time < 1000000000) {
        year = (time / 1000000).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2});
        formattedYear = `Year: ${year} Million`;
    } else {
        year = (time / 1000000000).toLocaleString('en-US', {minimumFractionDigits: 4, maximumFractionDigits: 4});
        formattedYear = `Year: ${year} Billion`;
    }
    timeDisplay.textContent = formattedYear;
}

let impactObjects = [];
let incoming = false;
let velocity;
let impactLevel = 0;
let animating = false;

function drawBackground() {
    drawStars();
    drawSun();
}

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

let bombardCount = 0;

function animateImpact() {
    clear();
    drawBackground();
    drawImpactObject();
    drawPlanet();
    showNewTemp();
    if (incoming) {
        moveImpactObject();
        requestAnimationFrame(animateImpact);
    }
}

function drawStarsSunPlanet() {
    clear(); // Clear canvas from last drawing
    drawStars(); // Draw stars in new position
    drawSun(); // Draw sun in new position
    drawPlanet(); // Draw planet with new shading
}

function incrementTime(integer) {
    time = time + integer;
}

function newTime() {
    incrementTime(timeIncrement);
    showNewTime();
}

function animateForward() {
    moveSun(1);
    moveStars(1);
    path = calculatePath360(); // Calculate new sun position (defined by 360 degrees);
    drawStarsSunPlanet();
    newTime();
    newTemp();
    if (sun.x === sunStart) {
        // If sun has made it back around to its original spot...
        animating = false;
        drawStarsSunPlanet();
        showForward();
        showNewTime();
        showNewTemp();
    }
    if (animating) {
        requestAnimationFrame(animateForward);
    }
}

function showBombard() {
    for (button of bombardButtons) {
        button.style.visibility = "visible";
    }
}

function hideBombard() {
    for (button of bombardButtons) {
        button.style.visibility = "hidden";
    }
}

function showForward() {
    for (button of forwardButtons) {
        button.style.visibility = "visible";
    }
}

function hideForward() {
    for (button of forwardButtons) {
        button.style.visibility = "hidden";
    }
}

function bombard(number, size) {
    hideBombard();
    for (let i = 0; i < number; i++) {
        incoming = true;
        createImpactObject(size);
        animateImpact();
        clear();
        drawBackground();
        drawPlanet();
    }
}

function forward(incomingNumber) {
    timeIncrement = incomingNumber * 1000000 / canvas.width * 2 / 4;
    hideForward();
    animating = true;
    animateForward();
}

function createImpactObject(size) {
    let impactObjectSize;
    // Size between 1 and 10 inclusive
    if (size == 1) {
        impactObjectSize = 1;
    } else if (size == 4) {
        impactObjectSize = Math.floor(Math.random() * 3) + 2;
    } else if (size == 7) {
        impactObjectSize = Math.floor(Math.random() * 3) + 5;
    } else {
        impactObjectSize = Math.floor(Math.random() * 3) + 7;
    }
    //let impactObjectSize = Math.floor(Math.random() * size) + 1;
    impactObjects.push(new SkyObject([0,canvas.height/2], impactObjectSize, [75,75,75,1]));
    velocity = Math.floor(Math.random() * 2) + 2; // Between 2 and 3
    if (randomPercentage(50) < 50) {
        velocity = 0 - velocity;
        impactObjects[0].x = canvas.width;
    }
    //console.log('Volume:', impactObjects[0].volume);
    //console.log('Size:', impactObjectSize, "Speed:", velocity);
}

function calculateTempAdded(size, speed) {
    let impactTemp = size * 10 * (speed * speed);
    //console.log('Temp Increase:', impactTemp);
    return impactTemp;
}

function drawImpactObject() {
    let impactObject = impactObjects[0];
    drawCircle(impactObject.x, impactObject.y, impactObject.radius, impactObject.color);

    //shadow(impactObject);

    if (velocity > 0 && impactObject.x + impactObject.radius >= planet.x - planet.radius) {
        impactLevel++;
        //console.log('Impact Level: ', impactLevel);
    } else if (velocity < 0 && impactObject.x - impactObject.radius <= planet.x + planet.radius) {
        impactLevel++;
        //console.log('Impact Level: ', impactLevel);
    }

    if (impactLevel == 1) {
        drawCircle(impactObject.x - velocity, impactObject.y, impactObject.radius * 2, rgbaString(255,150,0,0.75));
        impactObject.a = 0.25;
    } else if (impactLevel == 2) {
        drawCircle(impactObject.x - velocity * 3, impactObject.y, impactObject.radius * 4, rgbaString(255,200,100,0.25));
        impactObject.a = 0.125;
    } else if (impactLevel == 3) {
        drawCircle(impactObject.x - velocity * 5, impactObject.y, impactObject.radius * 6, rgbaString(255,255,200,0.125));
        impactObject.a = 0.0675;
    } else if (impactLevel == 4) {
        drawCircle(impactObject.x - velocity * 6, impactObject.y, impactObject.radius * 8, rgbaString(255,255,255,0.0675));
        impactObject.a = 0.3875;
        //if (impactObject.radius > 1) {impactObject.radius = impactObject.radius - 1;}
    }
    
    if (velocity > 0 && impactObject.x - impactObject.radius >= planet.x - planet.radius ||
        velocity < 0 && impactObject.x + impactObject.radius <= planet.x + planet.radius) {
        calculatePlanetRadius(impactObject);
        destroyImpactObject();
        incoming = false;
        impactLevel = 0;
        clear();
        drawBackground();
        drawPlanet();
        tempAdded = tempAdded + calculateTempAdded(impactObject.radius / 2, velocity);
        newTemp(0);
        showBombard();
    }
}

function calculatePlanetRadius(impactObject) {
    let newVolume = planet.volume + impactObject.volume;
    let newRadius = Math.floor(Math.cbrt((3 * newVolume) / (4 * Math.PI)));
    if (newRadius > planet.radius) {
        newMessage('Planet size has increased!');
    }
    planet.radius = newRadius;
    planet.volume = newVolume;
    //console.log("New planet radius:", planet.radius);
    //console.log("New planet volume:", planet.volume);
}

function moveImpactObject() {
    let impactObject = impactObjects[0];
    impactObject.x += velocity;
    //console.log(impactObject.x);
}

function destroyImpactObject() {
    incoming = false;
    impactObjects.pop();
}

/*
function drawFrame() {
    if (pause === false) {
    // If not paused...
        showNewTime();
        path = calculatePath360(); // Calculate new sun position (defined by 360 degrees);
        clear(); // Clear canvas from last drawing
        drawStars(); // Draw stars in new position
        drawSun(); // Draw sun in new position
        /*
        if (incoming) {
            drawImpactObject();
            moveImpactObject();
        }
        drawPlanet(); // Draw planet with new shading
        //time = time + (timeDelay * 10000); // Increment time
    } else {
    // If paused...
        // Draw sun, stars, and planet in last position before pause
        clear();
        drawStars();
        drawSun();
        drawPlanet();
        displayPaused(); // And, draw pause icon
    }
    tryClearLog(); // Check duration of last message; clear after some # of seconds

    if (time >= 9500000000) {
        if (sun.x != canvas.width / 2) {
            moveStars();
            moveSun();
        }
    }
    
}
*/

function main() {
    setup();
    setInterval(tryClearLog, 500);
    //setInterval(checkUpdates, 500);
    setInterval(checkMessages, 500);
}

function begin() {
    showPanels();
    main();
}