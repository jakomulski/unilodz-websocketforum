module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        src: {
            js: ['src/**/*.js']
        },
        requirejs: {
            options: {
                paths: {
                    'appFiles': './src/js'
                },
                removeCombined: true,
                out: './optimized.js',
                optimize: 'none',
                name: 'main'
            },
            dev: {
                options: {
                    optimize: 'none'
                }
            },
            release: {
                options: {
                    optimize: 'uglify'
                }
            }
        },
        less: {
            development: {
                files: {
                    "target/main.css": "src/less/main.less"
                }
            }
        },
        watch: {
            less: {
                files: ['src/less/*.less'],
                tasks: ['less']
            }
        },
        concat: {
            js: {
                src: 'src/js/*.js',
                dest: 'target/main.min.js'
            },
            css: {
                src: 'src/css/*.css',
                dest: 'target/main.min.css'
            }
        },
        cssmin: {
            css: {
                src: 'dest/css/main.min.css',
                dest: 'dest/css/main.min.css'
            }
        },
        uglify: {
            my_target: {
                files: {
                    'dest/js/main.min.js': ['dest/js/main.min.js']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');


    // Default task(s).
    grunt.registerTask('default', ['watch']);

};