module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            datepicker: {
                src: [
                    'build/datepicker.js'
                ],
                dest: 'src/js/datepicker.js'
            },
        },
        uglify: {
            datepicker: {
                options: {
                    sourceMap: true,
                    sourceMapName: 'src/js/datepicker.js.map'
                },
                files: {
                    'src/js/datepicker.min.js': ['build/datepicker.js']
                }
            },
        },
        sass: {
            style: {
                files: {
                    'src/css/datepicker.css': ['build/datepicker.scss']
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie 11']
            },
            dist: {
                files: {
                    'src/css/datepicker.css': ['src/css/datepicker.css']
                }
            }
        },
        cssmin: {
            options: {
                mergeIntoShorthands: false,
                roundingPrecision: -1
            },
            target: {
                files: {
                    'src/css/datepicker.min.css': ['src/css/datepicker.css']
                }
            }
        },
        watch: {
            scripts: {
                files: ['build/datepicker.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                },
            },
            styles: {
                files: ['build/datepicker.scss'],
                tasks: ['sass', 'autoprefixer', 'cssmin'],
                options: {
                    spawn: false
                }
            }
        }
    });

    // Load npm packages
    // npm install grunt-contrib-concat grunt-contrib-uglify-es grunt-contrib-sass grunt-autoprefixer grunt-css grunt-contrib-cssmin grunt-contrib-watch
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify-es');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-css');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Grunt task`s
    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'autoprefixer', 'cssmin', 'watch']);
};