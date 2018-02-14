/*global module:false*/

'use strict';

var packageJson = require('./package.json');
var path = require('path');
var swPrecache = require('sw-precache');

module.exports = function(grunt) {
  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      html: 'dist/**/*.html'
    },
    swPrecache: {
      dev: {
        handleFetch: false,
        rootDir: 'dist'
      }
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [
          {
            cwd: 'src/pug',
            src: ['**/*.pug', '!**/blocks/**'],
            dest: 'dist/',
            expand: true,
            ext: '.html'
          }
        ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compact',
          sourcemap: 'inline'
        },
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss', '!**/mixins/**', '!**/parts/**'],
            dest: 'dist/css/',
            ext: '.css'
          }
        ]
      },
      prod: {
        options: {
          style: 'compressed',
          sourcemap: 'none'
        },
        files: [
          {
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss'],
            dest: 'dist/css/',
            ext: '.css'
          }
        ]
      }
    },
    autoprefixer: {
      options: {
        browsers: ['last 4 versions', '> 10%']
      },
      no_dest_multiple: {
        src: 'dist/css/*.css'
      }
    },
    coffee: {
      files: {
        expand: true,
        flatten: true,
        cwd: 'src/coffee/',
        src: ['*.coffee'],
        dest: 'dist/js/',
        ext: '.js'
      }
    },
    watch: {
      files: ['src/**/*.*'],
      tasks: ['neweronly'],
      options: {
        livereload: true
      }
    },
    connect: {
      server: {
        options: {
          open: true,
          livereload: true,
          port: 9001,
          hostname: 'localhost',
          base: 'dist/'
        }
      }
    }
  });

  function writeServiceWorkerFile(rootDir, handleFetch, callback) {
    var config = {
      cacheId: packageJson.name,
      // dynamicUrlToDependencies: {
      //   'dynamic/page1': [
      //     path.join(rootDir, 'views', 'layout.jade'),
      //     path.join(rootDir, 'views', 'page1.jade')
      //   ],
      //   'dynamic/page2': [
      //     path.join(rootDir, 'views', 'layout.jade'),
      //     path.join(rootDir, 'views', 'page2.jade')
      //   ]
      // },
      // If handleFetch is false (i.e. because this is called from swPrecache:dev), then
      // the service worker will precache resources but won't actually serve them.
      // This allows you to test precaching behavior without worry about the cache preventing your
      // local changes from being picked up during the development cycle.
      handleFetch: handleFetch,
      logger: grunt.log.writeln,
      staticFileGlobs: [
        rootDir + '/css/**.*',
        rootDir + '/fonts/**/**.*',
        rootDir + '/**/**.html',
        rootDir + '/img/**/**.*',
        rootDir + '/js/**/**.*'
      ],
      stripPrefix: rootDir + '/',
      // verbose defaults to false, but for the purposes of this demo, log more.
      verbose: true
    };

    swPrecache.write(path.join(rootDir, 'service-worker.js'), config, callback);
  }

  grunt.registerMultiTask('swPrecache', function() {
    /* eslint-disable no-invalid-this */
    var done = this.async();
    var rootDir = this.data.rootDir;
    var handleFetch = this.data.handleFetch;
    /* eslint-enable */

    writeServiceWorkerFile(rootDir, handleFetch, function(error) {
      if (error) {
        grunt.fail.warn(error);
      }
      done();
    });
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-reload');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', [
    'sass:dev',
    'autoprefixer',
    'swPrecache',
    'pug',
    'coffee'
  ]);
  grunt.registerTask('neweronly', [
    'sass:dev',
    'autoprefixer',
    'swPrecache',
    'pug',
    'newer:coffee'
  ]);
  grunt.registerTask('prod', [
    'sass:prod',
    'autoprefixer',
    'swPrecache',
    'pug',
    'coffee'
  ]);

  // USE THESE TASKS
  grunt.registerTask('build', ['clean:html', 'prod']);
  grunt.registerTask('serve', ['default', 'connect:server', 'watch']);
};
