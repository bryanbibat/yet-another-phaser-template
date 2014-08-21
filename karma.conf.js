module.exports = function(config) {
  config.set({
    frameworks: ['jasmine', 'browserify'],
    browsers : ['Chrome', 'Firefox'],
    preprocessors: {
      '**/*.coffee': ['coffee'],
      'src/js/*': ['browserify']
    },
    plugins : [
      'karma-jasmine',
      'karma-chrome-launcher',
      'karma-firefox-launcher'
    ],

    autoWatch : false,

    files: [
      'src/js/**/*.js',
      'src/js/**/*.coffee',
      'test/unit/**/*.js',
      'test/unit/**/*.coffee'
    ]
  });
};
