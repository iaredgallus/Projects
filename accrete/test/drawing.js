const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');



function removeShadow(x, y, radius, shadowWidth, color, tilt = 0, ) {
    let crescent;
    if (shadowWidth < radius) {
        crescent = true;
        shadowWidth = radius - shadowWidth;
    } else {
        crescent = false;
        shadowWidth = shadowWidth - radius;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, tilt, Math.PI*0.5, Math.PI*1.5);
    ctx.ellipse(x, y, shadowWidth, radius, tilt, Math.PI*1.5, Math.PI*0.5, crescent);
    ctx.fillStyle = color;
    ctx.fill();
}

function addShadow(x, y, radius, shadowWidth, color, tilt = 0, ) {
    let crescent;
    if (shadowWidth < radius) {
        crescent = true;
        shadowWidth = radius - shadowWidth;
    } else {
        crescent = false;
        shadowWidth = shadowWidth - radius;
    }

    ctx.beginPath();
    ctx.ellipse(x, y, radius, radius, tilt, Math.PI*1.5, Math.PI*0.5);
    ctx.ellipse(x, y, shadowWidth, radius, tilt, Math.PI*0.5, Math.PI*1.5, crescent);
    ctx.fillStyle = color;
    ctx.fill();
}


/*
addShadow(100, 100, 50, 10, "black");
addShadow(200, 200, 50, 90, "black");
addShadow(300, 300, 50, 100, "black");
removeShadow(400, 400, 50, 30, "black");
*/

for (let i = 0; i < 1000; i++) {
    setTimeout(() => {
        let degree;

        if (i % 360 < 180) {
            degree = i % 360;
        } else if (i % 360 < 360) {
            degree = 359 - (i % 360);
        }

        let shadowWidth = 100 / 180 * degree;
        let gradientWidth = shadowWidth + 10;
        let gradientWidth2 = shadowWidth + 20;
        if (gradientWidth < 0 || gradientWidth >= 100) {
            gradientWidth = 0;
        }
        if (gradientWidth2 < 0 || gradientWidth2 >= 100) {
            gradientWidth2 = 0;
        }

        if (i % 360 < 180) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 500, 500);
            addShadow(250, 250, 50, 100, "lightblue");
            addShadow(250, 250, 50, shadowWidth, "rgba(0,0,0,0.8)", 0.25);
        } else if (i % 360 < 360) {
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, 500, 500);
            addShadow(250, 250, 50, 100, "lightblue");
            removeShadow(250, 250, 50, shadowWidth, "rgba(0,0,0,0.8)", 0.25);
        }

        degree++;
        console.log(i, degree);
    }, i * 20);
}