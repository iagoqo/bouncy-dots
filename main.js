var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var gravity = 0.2;

var dot = {
  x: 100,
  y: 100,
  vx: 1,
  vy: 0,
  radius: 3,
  bounce: 0.7,
  friction: 0.99,
  color: 'grey',
  draw: drawDot
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

  dot.draw();

  dot.vy += gravity;
  dot.y += dot.vy;
  dot.x += dot.vx;

  if (dot.y + dot.radius > canvas.height) {
    dot.y = canvas.height - dot.radius;

    dot.vy *= -dot.bounce;
    dot.vx *= dot.friction;
  }
}

setInterval(draw, 1000 / 60);
