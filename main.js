var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gravity = 0.2;
var dots = [];

canvas.onclick = function(event) {
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);

  var attr = {
    // Starting point = click point
    x: event.x,
    y: event.y,
    // Horizontal velocity = random between -5 and 5
    vx: Math.random() * 10 - 5,
    // Vertical velocity = random between -10 and 5 (shoot upwards more often)
    vy: Math.random() * 15 - 10,
    // Radius = random between 2 and 10
    radius: Math.random() * 8 + 2,
    // Bounce = random between 0.05 and 0.9
    bounce: Math.random() * 0.4 + 0.5,
    // Friction = random between 0.95 and 1
    friction: Math.random() * 0.05 + 0.95,
    // Color = completely random
    color: 'rgb(' + r + ',' + g + ',' + b + ')'
  };

  dots.push(new Dot(attr));
};


function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  dots.forEach(function(dot) {
    dot.draw(ctx);

    dot.updateVelocity(gravity);

    dot.verticalBounce(canvas.height);
  });
}

// Update the canvas 60 times per second
setInterval(draw, 1000 / 60);
