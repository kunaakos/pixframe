'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',
    temp: '.tmp',

    pug: {
      compile: {
        options: {
          pretty: true,
          data: {
            debug: true,
            building: function() {
              return false
            }
          }
        },
        files: {
          '<%= app %>/index.html': ['<%= app %>/templates/index.pug']
        }
      }
    },

    sass: {
      options: {
        includePaths: []
      },
      dist: {
        options: {
          outputStyle: 'extended'
        },
        files: {
          '<%= app %>/css/app.css': '<%= app %>/scss/app.scss'
        }
      }
    },

    postcss: {
      options: {
        map: true, // inline sourcemaps
        processors: [
          require('autoprefixer')({
            browsers: 'Firefox >= 19, Chrome >= 20, ie >=9, Edge >= 12, Opera >= 15, Safari >=6, iOS >= 6.1, ExplorerMobile >= 10, Android >= 4.4, last 6 versions' // viewport units are the bottleneck
          })
        ]
      },
      dist: {
        src: '<%= app %>/css/app.css'
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: [
        'Gruntfile.js',
        '<%= app %>/js/**/*.js'
      ]
    },

    clean: {
      dist: {
        src: ['<%= dist %>/*']
      },
      temp: {
        src: ['<%= temp %>/*']
      },
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app %>/',
          src: [ 'index.html'],
          dest: '<%= dist %>/'
        }]
      },
    },

    uglify: {
      options: {
        preserveComments: 'some',
        mangle: false
      }
    },

    useminPrepare: {
      html: ['<%= app %>/index.html'],
      options: {
        dest: '<%= dist %>'
      }
    },

    usemin: {
      html: ['<%= dist %>/**/*.html'],
      css: ['<%= dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= dist %>']
      }
    },

    watch: {
      sass: {
        files: '<%= app %>/scss/**/*.scss',
        tasks: ['compile-sass'],
        options: {
          spawn: true,
        },
      },
      pug: {
        files: '<%= app %>/templates/**/*.pug',
        tasks: ['pug'],
        options: {
          spawn: true,
        },
      },
      livereload: {
        files: ['<%= app %>/**/*.html', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
        options: {
          spawn: true,
          livereload: true
        }
      }
    },

    connect: {
      app: {
        options: {
          port: 9000,
          base: '<%= app %>/',
          open: false,
          livereload: true,
          hostname: 'localhost'
        }
      },
      dist: {
        options: {
          port: 9000,
          base: '<%= dist %>/',
          open: false,
          keepalive: true,
          livereload: false,
          hostname: 'localhost'
        }
      }
    },

    wiredep: {
      target: {
        src: [
          '<%= app %>/**/*.html'
        ],
        exclude: [
          'modernizr',
          'jquery-placeholder'
        ]
      }
    },

    'ftp-deploy': {
      production: {
        auth: {
          host: 'pix.pub',
          port: 21,
          authKey: 'production'
        },
        src: '<%= dist %>/',
        dest: 'web/',
        exclusions: []
      }
    }

  });

  grunt.registerTask('compile-sass', ['sass', 'postcss']);

  grunt.registerTask('default', ['clean:temp', 'pug', 'compile-sass', 'wiredep', 'connect:app', 'watch']);
  grunt.registerTask('validate-js', ['jshint']);
  grunt.registerTask('server-dist', ['connect:dist']);
  grunt.registerTask('build', ['clean', 'pug', 'compile-sass', 'wiredep', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin']);
  grunt.registerTask('deploy', ['build', 'ftp-deploy']);

  console.log(grunt.task.current.name);

};
