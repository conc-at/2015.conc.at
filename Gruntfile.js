module.exports = function (grunt) {
  'use strict'

  var fs = require('fs')
  var markdown = require('markdown').markdown

  // Load grunt tasks automatically
  require('load-grunt-tasks')(grunt)

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt)

  var config = {
    app: 'app',
    dist: 'dist'
  }

  grunt.initConfig({

    config: config,

    watch: {
      js: {
        files: ['<%= config.app %>/scripts/**/*.js'],
        tasks: ['jshint'],
        options: {
          livereload: true
        }
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      less: {
        files: ['<%= config.app %>/styles/**/*.less'],
        tasks: ['less:styles', 'autoprefixer']
      },
      jade: {
        files: ['<%= config.app %>/**/*.{jade,md}'],
        tasks: ['jade:build']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '.tmp/**/*.html',
          '.tmp/styles/**/*.css',
          '<%= config.app %>/images/**/*'
        ]
      }
    },

    connect: {
      options: {
        port: 9000,
        open: true,
        livereload: 35729,
        hostname: '0.0.0.0'
      },
      livereload: {
        options: {
          middleware: function(connect) {
            return [
              connect.static('.tmp'),
              connect().use('/node_modules', connect.static('./node_modules')),
              connect.static(config.app)
            ]
          }
        }
      },
      dist: {
        options: {
          base: '<%= config.dist %>',
          livereload: false
        }
      }
    },

    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= config.dist %>/*',
            '!<%= config.dist %>/.git*'
          ]
        }]
      },
      server: '.tmp'
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: [
        'Gruntfile.js',
        '<%= config.app %>/scripts/**/*.js',
        '!<%= config.app %>/scripts/vendor/*'
      ]
    },

    autoprefixer: {
      options: {
        browsers: ['last 1 version']
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '**/*.css',
          dest: '<%= config.dist %>/styles/'
        }]
      }
    },

    rev: {
      dist: {
        files: {
          src: [
            '<%= config.dist %>/scripts/**/*.js',
            '<%= config.dist %>/styles/**/*.css',
            '<%= config.dist %>/images/**/*.*',
            '!<%= config.dist %>/images/**/*@2x.*',
            '<%= config.dist %>/fonts/**/*.*',
            '<%= config.dist %>/*.{ico,png}'
          ]
        }
      }
    },

    useminPrepare: {
      options: {
        dest: '<%= config.dist %>'
      },
      html: '<%= config.dist %>/index.html'
    },

    usemin: {
      options: {
        assetsDirs: ['<%= config.dist %>', '<%= config.dist %>/images'],
        blockReplacements: {
          js: function (block) {
            if (block.dest === 'scripts/main.js') {
              return '<script async src="' + block.dest + '"><\/script>'
            }
            return '<script src="' + block.dest + '"><\/script>'
          }
        }
      },
      html: ['<%= config.dist %>/**/*.html'],
      css: ['<%= config.dist %>/styles/**/*.css']
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '**/*.{gif,jpeg,jpg,png}',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>/images',
          src: '**/*.svg',
          dest: '<%= config.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseBooleanAttributes: true,
          collapseWhitespace: true,
          removeAttributeQuotes: true,
          removeCommentsFromCDATA: true,
          removeEmptyAttributes: true,
          removeOptionalTags: true,
          removeRedundantAttributes: true,
          useShortDoctype: true
        },
        files: [{
          expand: true,
          cwd: '<%= config.dist %>',
          src: '**/*.html',
          dest: '<%= config.dist %>'
        }]
      }
    },

    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= config.app %>',
          dest: '<%= config.dist %>',
          src: [
            'CNAME',
            '.nojekyll',
            'google*.html',
            'favicons/**/*.*',
            '*.{ico,png,txt}',
            'images/**/*.webp',
            'styles/fonts/**/*.*'
          ]
        }, {
          expand: true,
          dot: true,
          cwd: 'node_modules/bootstrap/dist',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }, {
          expand: true,
          dot: true,
          cwd: 'node_modules/font-awesome/',
          src: ['fonts/*.*'],
          dest: '<%= config.dist %>'
        }]
      }
    },

    less: {
      styles: {
        src: '<%= config.app %>/styles/main.less',
        dest: '.tmp/styles/main.css'
      }
    },

    jade: {
      options: {
        pretty: true,
        data: {
          dynamicmd: function(path) {
            return markdown.toHTML(fs.readFileSync(path.trim()) + '')
          }
        }
      },
      build: {
        src: '<%= config.app %>/index.jade',
        dest: '.tmp/index.html'
      },
      dist: {
        src: '<%= config.app %>/index.jade',
        dest: '<%= config.dist %>/index.html'
      }
    },

    concurrent: {
      server: [
        'less:styles',
        'jade:build'
      ],
      dist: [
        'less:styles',
        'imagemin',
        'svgmin'
      ]
    },

    sitemap: {
      dist: {
        siteRoot: '<%= config.dist %>',
        homepage: 'https://conc.at'
      }
    },

    manifest: {
      options: {
        basePath: '<%= config.dist %>',
        preferOnline: true,
        verbose: false
      },
      dist: {
        src: [
          'fonts/**/*.*',
          'images/**/*.*',
          'scripts/**/*.*',
          'styles/**/*.*'
        ],
        dest: '<%= config.dist %>/manifest.appcache'
      }
    },

    uncss: {
      options: {
        ignore: [
          /fa/,
          /btn/,
          /.in/,
          /.out/,
          /tito/,
          /#map/,
          /\.markerPopup/,
          /modal/,
          /footer/,
          /sponsor/,
          /headroom/,
          /\.team-member/,
          /\.img\-circle/,
          /\.list\-inline/,
          /\.navbar\-shrink/,
          /collap/,
          /\.social\-buttons/
        ]
      },
      dist: {
        files: [{
          src: '<%= config.dist %>/index.html',
          dest: '<%= config.dist %>/styles/main.css'
        }]
      }
    },

    cssmin: {
      dist: {
        files: [{
          src: '<%= config.dist %>/styles/main.css',
          dest: '<%= config.dist %>/styles/main.css'
        }]
      }
    },

    jsonmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= config.app %>',
          src: ['schemas/*.jsonld'],
          dest: '<%= config.dist %>'
        }]
      }
    }
  })

  grunt.registerTask('serve', function (target) {
    if (target === 'dist') {
      return grunt.task.run(['build', 'connect:dist:keepalive'])
    }

    grunt.task.run([
      'clean:server',
      'concurrent:server',
      'autoprefixer',
      'connect:livereload',
      'watch'
    ])
  })

  grunt.registerTask('build', [
    'clean:dist',
    'jade:dist',
    'useminPrepare',
    'concurrent:dist',
    'autoprefixer',
    'concat',
    'uglify',
    'copy:dist',
    'uncss',
    'cssmin:dist',
    'rev',
    'usemin',
    'htmlmin',
    'jsonmin',
    'sitemap'
    // 'manifest'
  ])

  grunt.registerTask('default', [
    'newer:jshint',
    'build'
  ])
}
