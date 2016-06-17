module.exports = function(config) {
  config.set({
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'test/**/*.spec.js',
      'src/**/*.js'
    ],
    exclude : [
      'src/**/main.js'
    ]
  });
};
