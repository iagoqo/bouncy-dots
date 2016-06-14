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
    // Vertical velocity = random between -10 and 5 (shot upwards more often)
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

function Dot(attr) {
  if (!attr) attr = {};
  this.x = attr.x || 0;
  this.y = attr.y || 0;
  this.vx = attr.vx || 1;
  this.vy = attr.vy || 0;
  this.radius = attr.radius || 5;
  this.bounce = attr.bounce || 0.75;
  this.friction = attr.friction || 0.99;
  this.color = attr.color || 'grey';
}

Dot.prototype.draw = function(ctx) {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
  ctx.closePath();
};
