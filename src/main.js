(function() {
  'use strict';
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');

  console.log(canvas, ctx);

  var gravity = 0.2;
  var dots = [];
  var dotLimit = 1000;

  canvas.onclick = addDot;

  // Update the canvas 60 times per second
  setInterval(draw, 1000 / 60);

  /////

  /**
   * Creates a dot at the clicked position
   * @param  {event} event Click event
   */
  function addDot(event) {
    var r = Math.floor(Math.random() * 256);
    var g = Math.floor(Math.random() * 256);
    var b = Math.floor(Math.random() * 256);

    var attr = {
      // Starting point = click point
      x: event.x,
      y: event.y,
      // Horizontal velocity = random between -10 and 10
      vx: Math.random() * 20 - 10,
      // Vertical velocity = random between -15 and 5 (shoot upwards more often)
      vy: Math.random() * 20 - 15,
      // Radius = random between 2 and 20
      radius: Math.random() * 18 + 2,
      // Bounce = random between 0.05 and 0.9
      bounce: Math.random() * 0.4 + 0.5,
      // Friction = random between 0.95 and 0.99
      friction: Math.random() * 0.04 + 0.95,
      // Color = random
      color: 'rgb(' + r + ',' + g + ',' + b + ')'
    };

    dots.push(new Dot(attr));

    // Remove the oldest dot if the limit is reached
    if(dots.length > dotLimit) dots.shift();
  }

  /**
   * Erases all the drawn objects on the canvas
   */
  function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Paints all the active dots on the canvas
   */
  function draw() {
    clearCanvas();
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    dots.forEach(function(dot) {
      dot.draw(ctx);

      dot
        .updateVelocity(gravity)
        .verticalEdge(canvas.height)
        .horizontalEdge(canvas.width);
    });
  }

})();
