/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      html: "dist/**/*.html"
    },
    pug: {
      compile: {
        options: {
          data: {
            debug: false
          }
        },
        files: [ {
          cwd: "src/pug",
          src: ['**/*.pug', '!**/blocks/**'],
          dest: "dist/",
          expand: true,
          ext: ".html"
        } ]
      }
    },
    sass: {
      dev: {
        options: {
          style: 'compact',
          sourcemap: 'inline'
        },
        files:
          [{
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss', '!**/mixins/**', '!**/parts/**'],
            dest: 'dist/css/',
            ext: '.css'
          }]
      },
      prod: {
        options: {
          style: "compressed",
          sourcemap: 'none'
        },
        files:
          [{
            expand: true,
            cwd: 'src/scss',
            src: ['*.scss'],
            dest: 'dist/css/',
            ext: '.css'
          }]
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
        livereload: true,
      },
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

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-pug');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks("grunt-reload");
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-coffee');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-newer');

  // Default task.
  grunt.registerTask('default', ['sass:dev', 'autoprefixer', 'pug', 'coffee']);
  grunt.registerTask('neweronly', ['sass:dev', 'autoprefixer', 'newer:pug', 'newer:coffee']);
  grunt.registerTask('prod', ['sass:prod', 'autoprefixer', 'pug', 'coffee']);

  // USE THESE TASKS
  grunt.registerTask('build', ['clean:html', 'prod']);
  grunt.registerTask('serve', ['default', 'connect:server', 'watch'])

};
