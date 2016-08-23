module.exports = function (grunt) {
    'use strict';

    var date = (new Date()).valueOf().toString();

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        assemble: {
            options: {
                flatten: true,
                partials: ['views/templates/partials/*.html']
            },
            pages: {
                files: {
                    'public/templates/': [
                        './views/templates/pages/*.html',
                        './views/templates/admin/*.html'
                    ]
                }
            }
        },
        clean: {
            css: ['public/styles/*.css'],
            html: ['public/templates/**/*.html']
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'styles',
                    src: ['**/*.scss'],
                    dest: 'public/styles/',
                    ext: '.css'
                }]
            }
        },
        cssmin: {
          dist: {
            files: [{
              expand: true,
              cwd: 'public/styles',
              src: ['*.css', '!*.min.css'],
              dest: 'public/styles',
              ext: '.min.css'
            }]
          }
        },
        watch: {
            options: {
                livereload: 3000
            },
            sass: {
                files: 'styles/**/*.scss',
                tasks: ['clean:css','sass', 'cssmin']
            },
            html: {
                files: ['views/templates/**/*.html'],
                tasks: ['clean:html','assemble']
            },
            js: {
                files: ['public/js/**/*.js', 'routes/**/*.js']
            },
            server: {
                files: [
                    '.rebooted',
                    'app.js',
                    'views/**/*.js',
                    'routes/**/*.js',
                    'models/**/*.js'
                ]
            }
        },
        nodemon: {
            dev: {
                script: 'app.js',
                options: {
                    nodeArgs: ['--debug'],
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });
                        nodemon.on('restart', function () {
                            setTimeout(function() {
                                require('fs').writeFileSync('.rebooted', 'rebooted');
                            }, 1000);
                        });
                        nodemon.on('config:update', function () {
                            setTimeout(function() {
                                require('open')('http://localhost:8080');
                            }, 1000);
                        });
                    },
                    ignoredFiles: ['node_modules/**'],
                    watchedExtensions: ['js'],
                    //watchedFolders: ['server'],
                    delayTime: 1,
                    watch: ['server'],
                    env: {
                        PORT: '8080'
                    }
                }
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 3000,
                    'web-host': 'localhost',
                    'debug-port': 5857,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 4,
                    'hidden': ['node_modules']
                }
            }
        },
        concurrent: {
            dev: {
                tasks: ['nodemon', 'watch'],
                options: {
                    logConcurrentOutput: true
                }
            }
        },
        jshint: {
            myFiles: ['grunt.js','app.js','routes/**/*.js', 'public/js/**/*.js'],
            options: {
                jshintrc: '.jshintrc',
                ignores: ['public/js/lib/**/*.js']
            }
        },
        imagemin: {
            dynamic: {
              files: [{
                expand: true,
                cwd: 'public/images/',
                src: ['**/*.{png,jpg,gif}'],
                dest: 'public/images/'
              }]
            }
        }
    });

    grunt.loadNpmTasks('assemble');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-concurrent');
    grunt.loadNpmTasks('grunt-node-inspector');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    grunt.registerTask('build', ['clean:css','clean:html', 'assemble', 'sass', 'cssmin', 'imagemin']);
    grunt.registerTask('process', ['jshint','clean:css', 'clean:html', 'assemble', 'sass', 'cssmin', 'imagemin']);
    grunt.registerTask('start', ['concurrent:dev']);
};
