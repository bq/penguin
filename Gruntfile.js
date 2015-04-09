/* global module, require */

'use strict';

module.exports = function(grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        bw: grunt.file.readJSON('bower.json'),
        pkg: grunt.file.readJSON('package.json'),
        readme_generator: {
            readme: {
                options: {
                    github_username: 'bq',
                    readme_folder: 'doc'
                },
                order: {
                    'quickstart.md': 'Quickstart',
                    'included.md': 'What\'s included',
                    'usage.md': 'Usage',
                    'components.md': 'Components'
                }
            }
        },
        mochacli: {
            options: {
                bail: true
            },
            all: ['test/spec/*.js']
        },
        uglify: {
            penguin: {
                options: {
                    preserveComments: false,
                    banner: '/*! <%= bw.name %> - v<%= bw.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
                },
                files: {
                    'lib/js/penguin.min.js': [
                        'src/js/*.js'
                    ]
                }
            }
        },
        clean: {
            dist: ['dist']
        },
        copy: {
            scripts: {
                files: [{
                    expand: true,
                    cwd: 'src/js/',
                    dest: 'lib/js/components/',
                    src: '**'
                }]
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none'
                },
                files: {
                    'lib/css/penguin.css': 'src/css/main.scss'
                }
            }
        },
        cssmin: {
            target: {
                files: [{
                    expand: true,
                    cwd: 'lib/css',
                    src: ['*.css', '!*.min.css'],
                    dest: 'lib/css',
                    ext: '.min.css'
                }]
            }
        },
        concat: {
            options: {
                banner: '/*! <%= bw.name %> - v<%= bw.version %> - ' + '<%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'lib/js/penguin.js',
            },
        },
        bump: {
            options: {
                files: ['bower.json'],
                updateConfigs: ['bw'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['bower.json', 'CHANGELOG.md'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: '<%= bw.repository.url %>',
                gitDescribeOptions: '--tags --always --abbrev=1 --dirty=-d',
                globalReplace: false,
                prereleaseName: false,
                regExp: false
            }
        },
        changelog: {
            options: {
                version: '<%= bw.version %>',
                repository: '<%= bw.repository.url %>'
            }
        }
    });

    grunt.registerTask('_commit', [
        'changelog',
        'bump-commit'
    ]);

    grunt.registerTask('build', [
        'clean',
        'concat',
        'sass',
        'cssmin',
        'copy',
        'uglify',
        'readme_generator'
    ]);

    grunt.registerTask('test', [
        'mochacli'
    ]);

    grunt.registerTask('release', function(version) {
        var semVer = /\bv?(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)\.(?:0|[1-9][0-9]*)(?:-[\da-z\-]+(?:\.[\da-z\-]+)*)?(?:\+[\da-z\-]+(?:\.[\da-z\-]+)*)?\b/ig;

        if (!semVer.test(version)) {
            grunt.option('setversion', false);
            grunt.task.run('bump-only:' + version);
        } else {
            grunt.option('setversion', version);
            grunt.task.run('bump-only');
        }

        grunt.task.run('_commit');
    });

};
