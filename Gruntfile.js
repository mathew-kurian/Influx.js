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
          dest: 'example/dist/',
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
          dest: 'example/dist/',
          ext: '.js'
        }]
      }
    },
    babel: {
      options: {
        sourceMap: false,
        "presets": ["es2015", "react"],
        "plugins": ["transform-object-rest-spread"]
      },
      dist: {
        files: [{
          expand: true,
          cwd: 'lib/',
          src: ['*.js'],
          dest: 'dist/lib/',
          ext: '.js'
        },{
          expand: true,
          cwd: '',
          src: ['index.js'],
          dest: 'dist/',
          ext: '.js'
        }]
      }
    }
  });

  grunt.loadNpmTasks('grunt-browserify');
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('build', ['browserify:dist','babel:dist']);
  grunt.registerTask('auto-build', ['browserify:dev']);
};