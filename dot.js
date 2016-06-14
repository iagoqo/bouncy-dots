/**
 * Constructor for Dots
 * @param {Object} attr Object with the properties of the Dot. Unknown properties will be ignored.
 */
function Dot(attr) {
  if (!attr) attr = {};
  // Starting position
  this.x = attr.x || 0;
  this.y = attr.y || 0;

  // Velocities, how fast the dot will move in each axis
  this.vx = attr.vx || 1;
  this.vy = attr.vy || 0;

  // Radius, defines how big the dot will be
  this.radius = attr.radius || 5;

  // Bounce factor, the higher this is the more the dot will bounce
  this.bounce = attr.bounce || 0.75;

  // Friction factor, the lower this is the more the dot will slow down when in contact with a surface
  this.friction = attr.friction || 0.99;

  // Color of the dot
  this.color = attr.color || 'grey';
}

Dot.prototype = {

  /**
   * Draws the dot on the specified canvas
   * @param  {CanvasRenderingContext2D} ctx Context of the canvas in which to draw the dot
   */
  draw: function(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  },

  /**
   * Changes the velocity and position of the dot based on the provided gravity
   * @param  {Number} gravity Downward acceleration
   * @return {Dot}         Current dot
   */
  updateVelocity: function(gravity) {
    // Update velocity due to gravity
    this.vy += gravity;

    // Update the position of the dot
    this.y += this.vy;
    this.x += this.vx;

    return this;
  },

  /**
   * Updates the velocity and position of a dot if it's past the top or bottom edge of the canvas
   * @param  {Number} height Height of the canvas
   * @return {Dot}        This dot
   */
  verticalEdge: function(height) {
    // If the dot is past an edge, put it right on the edge and make it bounce
    if (this.y + this.radius > height) {
      this.y = height - this.radius;
      this.verticalBounce();
    } else if (this.y - this.radius < 0) {
      this.y = 0 + this.radius;
      this.verticalBounce();
    }

    return this;
  },

  /**
   * Changes the vertical direction of the dot and applies friction
   * @return {Dot} This dot
   */
  verticalBounce: function() {
    this.vy *= -this.bounce;
    this.vx *= this.friction;
    return this;
  },

  /**
   * Updates the velocity and position of a dot if it's past the left or right edge of the canvas
   * @param  {Number} width Width of the canvas
   * @return {Dot}       This dot
   */
  horizontalEdge: function(width) {
    // If the dot is past an edge, put it right on the edge and make it bounce
    if (this.x + this.radius > width) {
      this.x = width - this.radius;
      this.horizontalBounce();
    } else if (this.x - this.radius < 0) {
      this.x = 0 + this.radius;
      this.horizontalBounce();
    }

    return this;
  },

  /**
   * Changes the horizontal direction of the dot and applies friction
   * @return {Dot} This dot
   */
  horizontalBounce: function() {
    this.vx *= -this.bounce;
    this.vy *= this.friction;
    return this;
  }

};
