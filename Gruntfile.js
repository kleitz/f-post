'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    env : {
      options : {
      //Shared Options Hash
      },
      dev : {
        NODE_ENV : 'development',
        DEST     : 'temp'
      },
      test : {
        NODE_ENV : 'test',
        DEST     : 'testtemp'
      },
      build : {
        NODE_ENV : 'production',
        DEST     : 'dist',
        concat   : {
          PATH     : {
            'value': 'node_modules/.bin',
            'delimiter': ':'
          }
        }
      },
      functions: {
        // BY_FUNCTION: function() {
        //   var value = '123';
        //   grunt.log.writeln('setting BY_FUNCTION to ' + value);
        //   return value;
        // }
      }
    },

    uglify : {
      options : {
        mangle : false
      },

      my_target : {
        files : {
          'public/js/app.js' :
          [

            'public/js/dev/app.js',

            'public/js/dev/services/ConfigService.js',
            'public/js/dev/services/LoginService.js',
            'public/js/dev/services/LogoutService.js',
            'public/js/dev/services/PasswordService.js',
            'public/js/dev/services/RememberService.js',
            'public/js/dev/services/DealerDashsService.js',
            'public/js/dev/services/MessagesService.js',
            'public/js/dev/services/TaskActionsHistoryService.js',
            'public/js/dev/services/UserService.js',
            'public/js/dev/services/SocketService.js',
            'public/js/dev/services/LeadsService.js',
            'public/js/dev/services/TasksService.js',
            'public/js/dev/services/TaskActionsService.js',
            'public/js/dev/services/ProductsService.js',
            'public/js/dev/services/EmployeesService.js',
            'public/js/dev/services/DealersService.js',
            'public/js/dev/services/ActionsService.js',
            'public/js/dev/services/ActionGroupsService.js',
            'public/js/dev/services/SupportsService.js',

            'public/js/dev/controllers/AppCtrl.js',
            'public/js/dev/controllers/LoginCtrl.js',
            'public/js/dev/controllers/PasswordCtrl.js',
            'public/js/dev/controllers/RememberCtrl.js',
            'public/js/dev/controllers/DealerDashCtrl.js',
            'public/js/dev/controllers/EmployeeDashCtrl.js',
            'public/js/dev/controllers/DealerListLeadsCtrl.js',
            'public/js/dev/controllers/DealerAddLeadsCtrl.js',
            'public/js/dev/controllers/DealerEditLeadsCtrl.js',
            'public/js/dev/controllers/DealerListSupportsCtrl.js',
            'public/js/dev/controllers/DealerAddActionGroupsCtrl.js',
            'public/js/dev/controllers/DealerListActionGroupsCtrl.js',
            'public/js/dev/controllers/DealerEditActionGroupsCtrl.js',
            'public/js/dev/controllers/DealerAddSupportsCtrl.js',
            'public/js/dev/controllers/DealerEditSupportsCtrl.js',
            'public/js/dev/controllers/DealerEditDataCtrl.js',
            'public/js/dev/controllers/EmployeeEditDataCtrl.js',
            'public/js/dev/controllers/EmployeeListActionsCtrl.js',
            'public/js/dev/controllers/EmployeeEditActionsCtrl.js',
            'public/js/dev/controllers/DealerListTasksCtrl.js',
            'public/js/dev/controllers/DealerAddProductsCtrl.js',
            'public/js/dev/controllers/DealerListProductsCtrl.js',
            'public/js/dev/controllers/DealerEditProductsCtrl.js',
            'public/js/dev/controllers/DealerListEmployeesCtrl.js',
            'public/js/dev/controllers/DealerAddEmployeesCtrl.js',
            'public/js/dev/controllers/DealerEditEmployeesCtrl.js',
            'public/js/dev/controllers/DealerListActionsCtrl.js',
            'public/js/dev/controllers/DealerAddActionsCtrl.js',
            'public/js/dev/controllers/DealerEditActionsCtrl.js',

          ]
        }
      }
    },

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/**/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // clear temporary dir
    // clean: {
    //   test: ['tmp']
    // },

    apidoc: {
      test: {
        src: 'routes/',
        dest: 'public/doc/',
        options: {
          debug: true,
          includeFilters: [ '.*\\.js$' ]
        }
      }
    },

    // jscoverage: {
    //   tasks: {
    //     expand: true
    //     // cwd: 'tasks/',
    //     // src: ['**/*.js'],
    //     // dest: 'tasks-cov/',
    //     // ext: '.js',
    //   },
    //   // otherstuff: {
    //   //   expand: true,
    //   //   cwd: 'otherstuff/',
    //   //   src: ['**/*.js'],
    //   //   dest: 'otherstuff-cov/',
    //   //   ext: '.js',
    //   // },
    //   options: {

    //   }
    // },

    // connect: {
    //   server: {
    //     options: {
    //       target: "http://localhost",
    //       port: "3000",
    //     }
    //   }
    // },

    watch : {
      dist : {
        files :
        [
          'public/js/dev/**'
        ]
        , tasks :
        [
          'uglify'
        ]
      }
    },

    // mochaTest: {
    //   test: {
    //     options: {
    //       reporter: 'nyan',// base, doc, dot, html-cov, html, index, json-cov, json-stream, json, landing, list, markdown, min, nyan, progress, spec, tap, xunit
    //       // grep,
    //       // ui,
    //       timeout: 10000,
    //       // invert,
    //       // ignoreLeaks,
    //       // growl,
    //       // globals,
    //       // options: "./test/mocha.opts",
    //       // var dir = '../../';
    //       // colors (specify as "colors: true"),
    //       // slow,
    //       // require: 'jscoverage'
    //     },
    //     src: ['test/**/*.js']
    //   },
    //   // coverage: {
    //   //   options: {
    //   //     reporter: 'jscoverage',
    //   //     quiet: true,
    //   //     // captureFile: 'coverage.html'
    //   //   },
    //   //   src: ['./routes/*.js']
    //   // },
    // }

  });

  for (var key in grunt.file.readJSON("package.json").devDependencies) {
    if (key !== "grunt" && key.indexOf("grunt") === 0){
      grunt.loadNpmTasks(key);
    }
  }

  // grunt.loadNpmTasks('grunt-contrib-clean');

  // grunt.registerTask('test', ['env:test', 'jshint', 'mochaTest']);
  grunt.registerTask('dev', ['env:dev', 'jshint', 'apidoc']); //'mochaTest',  'connect', 'watch'
  // grunt.registerTask('build', ['env:build', 'lint', 'other:build:tasks']);
  grunt.registerTask( 'w', [ 'watch' ] );

};
