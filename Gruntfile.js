'use strict';

module.exports = function (grunt) {

  grunt.initConfig({
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
;
  grunt.loadNpmTasks('grunt-babel');

  grunt.registerTask('build', ['babel:dist']);
};