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
                    'src/**/*-app.js',
                    'src/**/*-module.js',
                    'src/**/*.js',
                    '!src/**/*_test.js'
                ],
                mock: [
                    'test/mock/*.js'
                ],
                tests: {
                    unit: [
                        'src/**/*_test.js'
                    ]
                },
            },
            templates: [
                'src/**/*.html',
                '!src/index.html'
            ],
        },

        watch: {
            src: {
                files: ['<%= paths.scripts.src %>', '<%= paths.scripts.mock %>'],
                tasks: ['injector:index']
            },
            test: {
                files: ['<%= paths.scripts.tests.unit %>'],
                tasks: ['injector:karma']
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
                    middleware: function (connect, options) {
                        var proxy = require('grunt-connect-proxy/lib/utils').proxyRequest;
                        if (Array.isArray(options.base)) {
                            options.base = options.base[0];
                        }
                        return [
                            // Include the proxy first
                            proxy,
                            // Serve static files.
                            connect.static(options.base),
                            // Make empty directories browsable.
                            connect.directory(options.base)
                        ];
                    }
                },
                proxies: [
                    {
                        context: '/guestbook',
                        host: '0.0.0.0',
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

    grunt.registerTask('serve', ['injector', 'configureProxies:server', 'connect:server', 'open', 'watch']);
    grunt.registerTask('dev', ['injector', 'jshint', 'karma:continuousUnit']);
    grunt.registerTask('test', ['injector', 'jshint', 'karma:unit']);
};
