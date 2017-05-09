module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        less: {
            options: {
                compress: true
            },
            development: {
                files: {
                    'dest/main.css': ['bower_components/angular-material/angular-material.min.css', 'src/less/main.less']
                }
            }
        },
        watch: {
            less: {
                files: ['./src/less/*.less'],
                tasks: ['less']
            }
        },

        cssmin: {
            css: {
                src: 'dest/css/main.min.css',
                dest: 'dest/css/main.min.css'
            }
        },
        uglify: {
            options: {
                mangle: false
            },
            build: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.js',
                    dest: 'dest'
                }]
            }
        },
        processhtml: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: '**/*.htm',
                    dest: 'dest'
                }]
            },
        },
    });
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-processhtml');


    grunt.registerTask('default', ['uglify', 'less', 'processhtml']);

};