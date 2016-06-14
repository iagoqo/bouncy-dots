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

Dot.prototype = {

  draw: function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  },

  updateVelocity: function(gravity) {
    // Update velocity due to gravity
    this.vy += gravity;

    // Update the position of the dot
    this.y += this.vy;
    this.x += this.vx;
  },

  verticalBounce: function(height) {
    // Check if the this is at the bottom of the canvas, calculate rebound
    if (this.y + this.radius > height) {
      // Position the this just on top of the bottom of the canvas
      this.y = height - this.radius;

      // The y velocity changes direction and is weaker than before
      this.vy *= -this.bounce;
      // Friction slows down the this on the x axis
      this.vx *= this.friction;
    }
  }

}
