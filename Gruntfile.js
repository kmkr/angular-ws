'use strict';

module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-injector');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),
        buildDir: 'build',
        portNumber: 9090,
        finalName: '<%= pkg.name %>',

        paths: {
            scripts: {
                src: [
                    'src/**/*-module.js',
                    'src/**/*.js'
                ],
                mock: [
                    'test/mock/*.js'
                ],
                tests: {
                    unit: [
                        'src/**/*-test.js'
                    ]
                },
            },
            templates: [
                'src/**/*.html',
                '!src/index.html'
            ],
        },

        watch: {
            dev: {
                files: ['<%= paths.scripts.src %>', '<%= paths.scripts.mock %>', '<%= paths.scripts.tests.unit %>'],
                tasks: ['injector']
            }
        },

        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= paths.scripts.src %>',
                '<%= paths.scripts.mock %>',
                '<%= paths.scripts.tests.unit %>'
            ]
        },

        karma: {
            options: {
                configFile: 'test/karma.unit.conf.js'
            },
            unit: {},
            continuousUnit: {
                singleRun: false,
                autoWatch: true
            }
        },

        clean: {
            options: {
                force: true
            },
            build: ['<%= buildDir %>']
        },

        connect: {
            server: {
                options: {
                    port: '<%= portNumber %>',
                    hostname: '0.0.0.0',
                    middleware: function(connect, options) {
                        var middlewares = [];
                        var directory = options.directory ||
                          options.base[options.base.length - 1];
                        if (!Array.isArray(options.base)) {
                            options.base = [options.base];
                        }

                        options.base.forEach(function(base) {
                            // Serve static files.
                            middlewares.push(connect.static(base));
                        });

                        // Make directory browse-able.
                        middlewares.push(connect.directory(directory));
                        return middlewares;
                    }
                },
                proxies: [
                    {
                        context: '/todo',
                        host: 'localhost',
                        port: 8080
                    }
                ]
            }
        },

        open: {
            dev: {
                url: 'http://localhost:<%= portNumber %>/src'
            }
        },

        injector: {
            options: {
            },
            index: {
                files: {
                    'src/index.html': [ 'bower.json', '<%= paths.scripts.src %>', '<%= paths.scripts.mock %>' ]
                }
            },
            karma: {
                options: {
                    addRootSlash: false,
                    transform: function (file, i, length) {
                      return '\'' + file + '\'' + (i + 1 < length ? ',' : '');
                    }
                },
                files: {
                    'test/karma.unit.conf.js': [ 'bower.json', '<%= paths.scripts.src %>', '<%= paths.scripts.mock %>', '<%= paths.scripts.tests.unit %>' ]
                }
            }
        }
    });

    grunt.registerTask('serve', ['configureProxies', 'connect:server', 'open', 'watch']);
    grunt.registerTask('dev', ['jshint', 'karma:continuousUnit']);
    grunt.registerTask('test', ['jshint', 'karma:unit']);
};
