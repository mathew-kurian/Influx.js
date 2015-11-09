'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
    browserify: {
      dist: {
        options: {
          transform: [["babelify", {
            "presets": ["es2015", "react"],
            "plugins": ["transform-object-rest-spread"]
          }]],
          browserifyOptions: {
            debug: true, // source mapping
            ignoreMTime: true
          }
        },
        files: [{
          expand: true,
          cwd: 'example/src/',
          src: ['Bootstrap.jsx'],
          dest: 'example/',
          ext: '.js'
        }]
      },
      dev: {
        options: {
          watch: true,
          keepAlive: true,
          transform: [["babelify", {
            "presets": ["es2015", "react"],
            "plugins": ["transform-object-rest-spread"]
          }]],
          browserifyOptions: {
            debug: true, // source mapping
            ignoreMTime: true
          }
        },
        files: [{
          expand: true,
          cwd: 'example/src/',
          src: ['Bootstrap.jsx'],
          dest: 'example/',
          ext: '.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');

  grunt.registerTask('build', ['browserify:dist']);
  grunt.registerTask('auto-build', ['browserify:dev']);
};