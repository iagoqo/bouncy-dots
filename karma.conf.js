module.exports = function(config) {
  config.set({
    plugins: [
      'karma-phantomjs-launcher',
      'karma-jasmine'
    ],
    browsers: ['PhantomJS'],
    frameworks: ['jasmine'],
    files: [
      'src/**/*.js',
      'src/**/!(main).js',
      'test/**/*.spec.js'
    ]
  });
};
