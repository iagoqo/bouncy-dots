var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gravity = 0.2;
var dots = [];

canvas.onclick = function(event) {
  dots.push({
    x: 100,
    y: 100,
    vx: 1,
    vy: 0,
    radius: 3,
    bounce: 0.7,
    friction: 0.99,
    color: 'grey',
    draw: drawDot
  });
};

function drawDot() {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
  clearCanvas();
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
  dots.forEach(function(dot) {
    dot.draw();

    // Update velocity due to gravity
    dot.vy += gravity;

    // Update the position of the dot
    dot.y += dot.vy;
    dot.x += dot.vx;

    // Check if the dot is at the bottom of the canvas, calculate rebound
    if (dot.y + dot.radius > canvas.height) {
      // Position the dot just on top of the bottom of the canvas
      dot.y = canvas.height - dot.radius;

      // The y velocity changes direction and is weaker than before
      dot.vy *= -dot.bounce;
      // Friction slows down the dot on the x axis
      dot.vx *= dot.friction;
    }
  });
}

// Update the canvas 60 times per second
setInterval(draw, 1000 / 60);
