'use strict';

/* jshint camelcase: false */


module.exports = function (grunt)
{
    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    var appConfig = {
        app: 'src',
        example: 'example',
        dist: 'dist'
    };
    // Define the configuration for all the tasks
    grunt.initConfig({
        // Watches files for changes and runs tasks based on the changed files
        appConfig: appConfig,
        watch: {
            options: {
                interrupt: true,
                spawn: true
            },
            validationMsgs: {
                files: ['<%= appConfig.tpl %>/*.html'],
                tasks: ['ngtemplates:ngFabForm']
            },
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep:dev']
            },
            js: {
                files: [
                    '<%= appConfig.app %>/**/*.js',
                    '<%= appConfig.example %>/**/*.js'
                ],
                tasks: [
                    'newer:jshint:all',
                    'fileblocks:index',
                    'fileblocks:dev'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },

            gruntfile: {
                files: ['Gruntfile.js'],
                tasks: [
                    'newer:jshint:all'
                ]
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= appConfig.example %>/**/*.html',
                    '<%= appConfig.example %>/*.css',
                    '<%= appConfig.app %>/**/*.html',
                    '.tmp/styles/**/*.css'
                ]
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: 'http://localhost:9000/dev.html',
                    middleware: function (connect)
                    {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static('./src'),
                            connect.static('./example')
                        ];
                    }
                }
            },
            test: {
                options: {
                    port: 9001,
                    middleware: function (connect)
                    {
                        return [
                            connect.static('.tmp'),
                            connect.static('test'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app),
                            connect.static(appConfig.example)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= appConfig.dist %>'
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: {
                src: [
                    'Gruntfile.js',
                    '<%= appConfig.app %>/**/*.js',
                    '!<%= appConfig.app %>/default-validation-msgs.js'
                ]
            }
        },

        // Empties folders to start fresh
        clean: {
            server: {
                files: [
                    {
                        src: [
                            '.tmp'
                        ]
                    }
                ]
            },
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= appConfig.dist %>/**/*',
                            '!<%= appConfig.dist %>/.git*'
                        ]
                    }
                ]
            }
        },


// Automatically inject Bower components into the app
        wiredep: {
            dev: {
                src: [
                    '<%= appConfig.example %>/index.html',
                    '<%= appConfig.example %>/dev.html'
                ],
                ignorePath: /\.\.\//,
                exclude: [],
                devDependencies: true
            },
            dist: {
                src: [
                    '<%= appConfig.example %>/index.html',
                    '<%= appConfig.example %>/dev.html'
                ],
                ignorePath: /\.\.\//,
                exclude: [],
                devDependencies: true
            }
        },


// Reads HTML for usemin blocks to enable smart builds that automatically
// concat, minify and revision files. Creates configurations in memory so
// additional tasks can operate on them
        useminPrepare: {
            html: '<%= appConfig.example %>/index.html',
            options: {
                dest: '<%= appConfig.dist %>',
                flow: {
                    html: {
                        steps: {
                            js: ['concat', 'uglifyjs'],
                            css: ['cssmin']
                        },
                        post: {}
                    }
                }
            }
        },

// Performs rewrites based on filerev and the useminPrepare configuration
        usemin: {
            html: ['<%= appConfig.dist %>/**/*.html'],
            options: {
                assetsDirs: ['<%= appConfig.dist %>', '<%= appConfig.dist %>/images']
            }
        },

        concat: {
            options: {
                sourceMap: true
            }
        },
        fileblocks: {
            options: {
                removeFiles: true
            },
            index: {
                src: '<%= appConfig.example %>/index.html',
                blocks: {
                    'module': {
                        cwd: '<%= appConfig.app %>',
                        src: [
                            // module then submodules
                            '{,*/}**/_*.js',
                            // all the rest of the files
                            '{,*/}**/*.js',
                            // without test files
                            '!{,*/}**/*.spec.js'
                        ]
                    }
                }
            },
            dev: {
                src: '<%= appConfig.example %>/dev.html',
                blocks: {
                    'module': {
                        cwd: '<%= appConfig.app %>',
                        src: [
                            // module then submodules
                            '{,*/}**/_*.js',
                            // all the rest of the files
                            '{,*/}**/*.js',
                            // without test files
                            '!{,*/}**/*.spec.js'
                        ]
                    }
                }
            }
        },


// ngmin tries to make the code safe for minification automatically by
// using the Angular long form for dependency injection. It doesn't work on
// things like resolve or inject so those have to be done manually.
        ngAnnotate: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp/concat',
                        src: '**/*.js',
                        dest: '.tmp/concat'
                    }
                ]
            }
        },
// Run some tasks in parallel to speed up the build process
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            server: [
                'watch',
            ],
            test: [],
            dist: []
        },

// Test settings
        karma: {
            options: {
                //files: getBowerComponentPaths(),
                preprocessors: {
                    '<%= appConfig.dist %>/**/*.html': [
                        'ng-html2js'
                    ]
                }
            },
            unit: {
                configFile: 'karma.conf.js',
                singleRun: false
            },
            unitSingleRun: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        protractor: {
            options: {
                configFile: 'node_modules/protractor/example/conf.js', // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            chrome: {   // Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
                    configFile: 'e2e.conf.js', // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },
        protractor_webdriver: {
            options: {
                command: 'webdriver-manager start'
            },
            dev: {}
        },

        md2html: {
            one_file: {
                options: {
                    layout: '<%= appConfig.dist %>/example/index.html',
                },
                files: [{
                    src: ['*.md'],
                    dest: '<%= appConfig.dist %>/example/index.html'
                }]
            }
        },


        'gh-pages': {
            options: {
                // Options for all targets go here.
            },
            'gh-pages': {
                options: {
                    base: '<%= appConfig.dist %>/<%= appConfig.example %>'
                },
                // These files will get pushed to the `gh-pages` branch (the default).
                src: ['**/*']
            }
        },

        copy: {
            bowerComponentsToTmp: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['bower_components/**/*.*'],
                        dest: '<%= appConfig.example %>'
                    }
                ]
            },
            dist: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        src: ['<%= appConfig.example %>/**/*.*'],
                        dest: '<%= appConfig.dist %>/'
                    }
                ]
            },
            unminifiedJs: {
                files: [
                    // includes files within path
                    {
                        flatten: true,
                        src: ['.tmp/concat/ng-fab-form.min.js'],
                        dest: '<%= appConfig.dist %>/ng-fab-form.js'
                    }
                ]
            },
            ghPages: {
                files: [
                    // includes files within path
                    {
                        expand: true,
                        cwd: '<%= appConfig.dist %>',
                        src: ['*.js'],
                        dest: '<%= appConfig.dist %>/<%= appConfig.example %>/'
                    }
                ]
            }
        }
    });


    grunt.registerTask('serve', 'Compile then start a connect web server', function (target)
    {
        if (target) {
            return grunt.task.run(['build:' + target, 'connect:dist:keepalive']);
        }

        grunt.task.run([
            'clean:server',
            'fileblocks:dev',
            'wiredep:dev',
            'connect:livereload',
            'concurrent:server'
        ]);
    });


    grunt.registerTask('build', function (target)
    {
        grunt.task.run([
            'clean:dist',
            'wiredep:dist',
            'fileblocks',
            'copy:bowerComponentsToTmp',
            'jshint:all',
            //'karma:unitSingleRun',
            'useminPrepare',
            'concurrent:dist',
            'concat:generated',
            'copy:unminifiedJs',
            'ngAnnotate:dist',
            'copy:dist',
            //'cssmin:generated',
            'uglify:generated',
            'usemin',
            'copy:ghPages',
            'cdnify:dist',
            'md2html:one_file'
        ]);
    });

    grunt.registerTask('ghp', function (target)
    {
        grunt.task.run([
            'build',
            'gh-pages'
        ]);
    });

    grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead', function (target)
    {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
    });

    grunt.registerTask('test', [
        'clean:server',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('e2e', [
        'connect:test',
        'protractor_webdriver',
        'protractor'
    ]);

    grunt.registerTask('default', [
        'server'
    ]);
};
