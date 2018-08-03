module.exports = function(grunt) {
  //// Подключение расширений
  // Наблюдает за изменениями в проекте
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Для сжатия HTML
  require('load-grunt-tasks')(grunt);

  // Добавляет работу SASS и дополнительный функционал от Compass, Bourbon, Susy
  // (можно добавлять ещё в файлы конфигурации с расширением rb).
  // Также модуль сжимает итоговые CSS файлы
  grunt.loadNpmTasks('grunt-contrib-compass');

  // Добавляет работу CoffeeScript
  grunt.loadNpmTasks('grunt-contrib-coffee');

  // Организовывает работы с подключаемыми библиотеки типа jQuery через команду require().
  // Также можно создавать свои модули с помощью команды module
  grunt.loadNpmTasks('grunt-watchify');

  // Для сжатия всех файлов JavaScript в 1 строку в 1 файле
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Для сжатия всех изображений
  grunt.loadNpmTasks('grunt-contrib-imagemin');

  // Для нормального сжатия PNG-файлов
  var pngcrush = require('imagemin-pngcrush');

  // Для копирования файлов и папок
  grunt.loadNpmTasks('grunt-contrib-copy');

  // Также можно cжимать файлы JSON


  // Основная конфигурация Grunt
  grunt.initConfig({
    copy: {
      main: {
        files: [
          {
            expand: true,
            cwd: 'frontend/fonts/',
            src: ['**'],
            dest: 'public/fonts/'
          }
        ]
      },
      html: {
        files: [
          {
            expand: true,
            cwd: 'frontend/',
            src: ['*.html'],
            dest: 'public/'
          }
        ]
      },
      script: {
        files: [
          {
            expand: true,
            cwd: 'frontend/js/',
            src: ['script.js'],
            dest: 'public/js/'
          }
        ]
      }
    },

    minifyHtml: {
      options: {
        cdata: true
      },  // options
      dist: {
        files: {
          "public/index.html": "frontend/index.html"
        } // files
      } // dist
    },  // minifyHtml

    imagemin: {
      dynamic: {
        options: {
          optimizationLevel: 3,
          svgoPlugins: [{ removeViewBox: false }],
          use: [pngcrush()]
        },  // options
        files: [{
          expand: true,
          cwd: 'frontend/img/',
          src: ['**/*.{png,jpg,gif}'],
          dest: 'public/img/'
        }]  // files
      } // dynamic
    },  // imagemin

    uglify: {
      default: {
        files: {
          'public/js/script.js': ['frontend/js/script.js']
        } // files
      } // default
    },  // uglify

    compass: {
      expanded: {
        options: {
          config: 'config_expanded.rb'
        } // options
      },  // expanded
      compressed: {
        options: {
          config: 'config_compressed.rb'
        } // options
      } // compressed
    },  // compass

    watchify: {
      app: {
        src: './frontend/js/precompiled/*.js',
        dest: './frontend/js/script.js'
      },  // app
    },  // watchify

    coffee: {
      compile: {
        options: {
          expand: true,
          flatten: true
        },  // options
        files: {
          'frontend/js/precompiled/coffee.js': ['frontend/coffee/*.coffee']
        } // files
      }, // compile
      compile_modules: {
        expand: true,
        cwd: 'frontend/coffee/modules/',
        src: ['*.coffee'],
        dest: 'frontend/js/precompiled/modules/',
        ext: '.js'
      } // compile_modules
    }, // coffee

    watch: {
      options: {livereload: true},
      coffee: {
        files: ['frontend/coffee/**/*.coffee'],
        tasks: ['coffee']
      },  // coffee
      watchify: {
        files: ['frontend/js/precompiled/*.js'],
        tasks: ['watchify']
      },  // watchify
      script: {
        files: ['frontend/js/script.js'],
        tasks: ['copy:script']
      },  // watchify
      sass: {
        files: ['frontend/scss/*.scss'],
        tasks: ['compass:expanded']
      },  // sass
      html: {
        files: ['frontend/*.html'],
        tasks: ['copy:html']
      } // html
    } // watch
  }); // initConfig



  // Создаём задачу, которая сжимает всё
  grunt.registerTask('combine_all', [
    'compass:compressed',
    'coffee',
    'watchify',
    'uglify',
    // 'imagemin',
    'minifyHtml'
    // 'copy:main'
  ]);

  // Режим разработки (по умолчанию)
  var env = process.env.NODE_ENV || 'dev';
  if (env === 'dev') {
    grunt.registerTask('default', ['combine_all', 'watch']);
  }

  // Режим Production ($ NODE_ENV=production grunt)
  if (env === 'production') {
    grunt.registerTask('default', ['combine_all']);

    // Для автоматической сборки на Heroku
    grunt.registerTask('heroku:production', 'build');
  }
};  // exports