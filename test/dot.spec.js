/* jslint jasmine: true */
(function() {
  'use strict';

  var attr = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 1,
    bounce: 1,
    friction: 1
  };

  var dummyCanvas = document.createElement('canvas');
  document.getElementById = jasmine.createSpy('HTML Element').andReturn(dummyCanvas);

  describe('Dot', function() {

    it('should accelerate downwards', function() {
      var dot = new Dot(attr);
      var gravity = 1;
      var originalVY = dot.vy;
      dot.updateVelocity(gravity);

      expect(dot.vy).toBe(originalVY + gravity);
    });

  });

})();
