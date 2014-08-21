var properties = require('./src/js/game/properties.js');

module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-cache-bust');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compress');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-jade');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-stylus');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-pngmin');

  var productionBuild = !!(grunt.cli.tasks.length && grunt.cli.tasks[0] === 'build');

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    project: {
      src: 'src/js',
      js: '<%= project.src %>/game/{,*/}*.js',
      dest: 'build/js',
      bundle: 'build/js/app.min.js',
      port: properties.port,
      banner:
        '/*!\n' +
        ' * <%= pkg.title %>\n' +
        ' * <%= pkg.description %>\n' +
        ' * <%= pkg.url %>\n' +
        ' * @author <%= pkg.author %>\n' +
        ' * @version <%= pkg.version %>\n' +
        ' * Copyright <%= pkg.author %>. <%= pkg.license %> licensed.\n' +
        ' * Based on Phaser Blank <https://github.com/lukewilde/phaser-blank/>\n' +
        ' */\n'
    },

    connect: { 
      dev: {
        options: {
          port: '<%= project.port %>',
          base: './build'
        }
      }
    },

    jshint: {
      files: [
        'gruntfile.js',
        '<%= project.js %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    watch: {
      options: { 
        livereload: productionBuild ? false : properties.liveReloadPort
      },
      js: {
        files: '<%= project.dest %>/**/*.js',
        tasks: ['jade']
      }, 
      jade: {
        files: 'src/templates/*.jade',
        tasks: ['jade']
      },
      stylus: {
        files: 'src/style/*.styl',
        tasks: ['stylus']
      },
      images: {
        files: 'src/images/**/*',
        tasks: ['copy:images']
      },
      audio: {
        files: 'src/audio/**/*',
        tasks: ['copy:audio']
      },
      jasmine: {
        files: [
          'src/js/game/models/*.js',
          'src/js/game/models/*.coffee',
          'spec/unit/**/*.js',
          'spec/unit/**/*.coffee'
        ],
        tasks: ['browserify', 'jasmine']
      }        
    },

    browserify: {
      app: {
        src: ['<%= project.src %>/game/app.js'],
        dest: '<%= project.bundle %>', 
        options: {
          transform: ['browserify-shim', 'coffeeify'],
          watch: true,
          bundleOptions: {
            debug: !productionBuild
          }
        }
      },
      testable: {
        src: [
          '<%= project.src %>/game/models/*.js', 
          '<%= project.src %>/game/models/*.coffee' 
        ],
        dest: 'tmp/testable.js',
        options: {
          transform: ['browserify-shim', 'coffeeify']
        }
      },
      test: {
        src: [
          'spec/**/*.js', 
          'spec/**/*.coffee'
        ],
        dest: 'tmp/tests.js',
        options: {
          transform: ['browserify-shim', 'coffeeify']
        }
      }
    },

    open: {
      server: {
        path: 'http://localhost:<%= project.port %>'
      }
    },

    cacheBust: {
      options: {
        encoding: 'utf8',
        algorithm: 'md5',
        length: 8
      },
      assets: {
        files: [
          { 
            src: [ 
              'build/index.html',
              'build/cocoon.html',
              '<%= project.bundle %>'
            ]
          }
        ]
      }
    },

    jade: {
      compile: {
        options: {
          data: {
            properties: properties,
            productionBuild: productionBuild
          }
        },
        files: { 
          'build/index.html': ['src/templates/index.jade'],
          'build/cocoon.html': ['src/templates/cocoon.jade']
        }
      }
    },

    stylus: {
      compile: {
        files: {
          'build/style/index.css': ['src/style/index.styl'] 
        },
        options: {
          sourcemaps: !productionBuild
        }
      }
    },

    clean: ['./build/'],

    pngmin: {
      options: {
        ext: '.png',
        force: true
      },
      compile: { 
        files: [ 
          { 
            src: 'src/images/*.png',
            dest: 'src/images/'
          }
        ]
      }
    },

    copy: {
      images: {
        files: [
          { expand: true, cwd: 'src/images/', src: ['**'], dest: 'build/images/' }
        ]
      },
      audio: {
        files: [
          { expand: true, cwd: 'src/audio/', src: ['**'], dest: 'build/audio/' }
        ]
      }
    },

    uglify: { 
      options: {
        banner: '<%= project.banner %>'
      },
      dist: {
        files: {
          '<%= project.bundle %>': '<%= project.bundle %>'
        }
      }
    },

    compress: {
      options: {
        archive: '<%= pkg.name %>.zip'
      },
      zip: { 
        files: [ { expand: true, cwd: 'build/', src: ['**/*'], dest: '<%= pkg.name %>/' } ]
      },
      cocoon: {
        files: [ { expand: true, cwd: 'build/', src: ['**/*'] } ]
      }
    },

    jasmine : {
      src : 'tmp/testable.js', 
      options : {
        specs : 'tmp/tests.js'
      }
    }
  });

  grunt.registerTask('default', [ 
    'clean',
    'browserify',
    'jade',
    'stylus',
    'copy',
    'cacheBust',
    'connect',
    'open',
    'jasmine',
    'watch'
  ]);

  grunt.registerTask('build', [ 
    'jshint',
    'clean',
    'browserify',
    'jade',
    'stylus',
    'uglify',
    'copy',
    'cacheBust'
  ]);

  grunt.registerTask('optimise', ['pngmin', 'copy:images']);
  grunt.registerTask('cocoon', ['compress:cocoon']);
  grunt.registerTask('zip', ['compress:zip']);
};
