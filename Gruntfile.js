'use strict';

module.exports = function(grunt) {

  require('load-grunt-tasks')(grunt);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    app: 'app',
    dist: 'dist',

    sass: {
      options: {
        includePaths: ['<%= app %>/bower_components/foundation/scss']
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
            browsers: 'last 2 versions'
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
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= app %>/',
          src: ['fonts/**', '**/*.html', '!**/*.scss', '!bower_components/**'],
          dest: '<%= dist %>/'
        }, {
          expand: true,
          flatten: true,
          src: ['<%= app %>/bower_components/font-awesome/fonts/**'],
          dest: '<%= dist %>/fonts/',
          filter: 'isFile'
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
      html: ['<%= dist %>/**/*.html', '!<%= app %>/bower_components/**'],
      css: ['<%= dist %>/css/**/*.css'],
      options: {
        dirs: ['<%= dist %>']
      }
    },

    watch: {
      grunt: {
        files: ['Gruntfile.js'],
        tasks: ['sass'],
        options: {
          spawn: true,
        },
      },
      sass: {
        files: '<%= app %>/scss/**/*.scss',
        tasks: ['sass'],
        options: {
          spawn: true,
        },
      },
      livereload: {
        files: ['<%= app %>/**/*.html', '!<%= app %>/bower_components/**', '<%= app %>/js/**/*.js', '<%= app %>/css/**/*.css', '<%= app %>/images/**/*.{jpg,gif,svg,jpeg,png}'],
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
          open: true,
          livereload: true,
          hostname: 'localhost'
        }
      },
      dist: {
        options: {
          port: 9000,
          base: '<%= dist %>/',
          open: true,
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
          'font-awesome',
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
  grunt.registerTask('bower-install', ['wiredep']);

  grunt.registerTask('default', ['compile-sass', 'bower-install', 'connect:app', 'watch']);
  grunt.registerTask('validate-js', ['jshint']);
  grunt.registerTask('server-dist', ['connect:dist']);
  grunt.registerTask('build', ['compile-sass', 'clean:dist', 'useminPrepare', 'copy:dist', 'concat', 'cssmin', 'uglify', 'usemin']);
  grunt.registerTask('deploy', ['build', 'ftp-deploy']);

};
