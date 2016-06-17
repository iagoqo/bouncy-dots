/* jslint jasmine: true */
(function() {
  'use strict';

  describe('Dot', function() {
    var dot;
    var defaults = {
      x: 0,
      y: 0,
      vx: 0,
      vy: 0,
      radius: 1,
      bounce: 1,
      friction: 1
    };

    beforeEach(function() {
      dot = new Dot(defaults);
    });

    it('should be affected by gravity', function() {
      var gravity = 1;
      var originalVY = dot.vy;

      dot.updateVelocity(gravity);

      expect(dot.vy).toEqual(originalVY + gravity);
    });

    it('should move horizontally', function() {
      var gravity = 0;
      var originalX = dot.x;

      dot.vx = 1;
      dot.updateVelocity(gravity);
      expect(dot.x).toBeGreaterThan(originalX);

      dot.vx = -1;
      dot.updateVelocity(gravity);
      expect(dot.x).toEqual(originalX);
    });

    it('should move vertically', function() {
      var gravity = 0;
      dot.vy = 1;
      var originalY = dot.y;

      dot.updateVelocity(gravity);
      expect(dot.y).toBeGreaterThan(originalY);

      dot.vy = -1;
      dot.updateVelocity(gravity);
      expect(dot.y).toEqual(originalY);
    });

    it('should bounce horizontally', function() {
      dot.vx = 1;
      dot.bounce = 0.5;
      var originalVX = dot.vx;

      dot.horizontalBounce();
      expect(dot.vx).toBeLessThan(0);
      expect(dot.vx).toBeGreaterThan(-originalVX);
    });

    it('should bounce vertically', function() {
      dot.vy = 1;
      dot.bounce = 0.5;
      var originalVY = dot.vy;

      dot.verticalBounce();
      expect(dot.vy).toBeLessThan(0);
      expect(dot.vy).toBeGreaterThan(-originalVY);
    });

    it('should bounce off the left edge', function() {
      dot.x = 0;
      dot.vx = -1;

      dot.horizontalEdge(100);

      expect(dot.vx).toBeGreaterThan(0);
    });

    it('should bounce off the right edge', function() {
      dot.x = 100;
      dot.vx = 1;

      dot.horizontalEdge(100);

      expect(dot.vx).toBeLessThan(0);
    });

    it('should bounce off the top edge', function() {
      dot.y = 0;
      dot.vy = -1;

      dot.verticalEdge(100);

      expect(dot.vy).toBeGreaterThan(0);
    });

    it('should bounce off the bottom edge', function() {
      dot.y = 100;
      dot.vy = 1;

      dot.verticalEdge(100);

      expect(dot.vy).toBeLessThan(0);
    });

    it('should slow down due to friction', function() {
      var originalVX;
      var originalVY;
      dot.friction = 0.5;

      originalVX = dot.vx = 1;
      dot.verticalBounce();
      expect(dot.vx).toBeLessThan(originalVX);

      originalVX = dot.vx = -1;
      dot.verticalBounce();
      expect(dot.vx).toBeGreaterThan(originalVX);

      originalVY = dot.vy = 1;
      dot.horizontalBounce();
      expect(dot.vy).toBeLessThan(originalVY);

      originalVY = dot.vy = -1;
      dot.horizontalBounce();
      expect(dot.vy).toBeGreaterThan(originalVY);
    });

  });

})();
