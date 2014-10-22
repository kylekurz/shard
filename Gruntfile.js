var browserifyOpts = {
	transform: ['hbsfy'],
	browserifyOptions: {
		debug: true
	}
};
module.exports = function(grunt) {
    grunt.initConfig({
        browserify: {
            js: { /* main switchboard */
                src: 'src/js/main.js',
                dest: 'lib/main.js',
                options: browserifyOpts
            },
			client : {
				src: 'src/js/client.js',
				dest: 'lib/client.js',
				options: browserifyOpts
			},
			server : {
				src: 'src/js/server.js',
				dest: 'lib/server.js',
				options: browserifyOpts
			}

        },
        watch : {
            js : {
                tasks : ['browserify'],//, 'browserify:communicationsLayer'],
                files : [
					'src/js/*.js',
					'src/js/**/*.js',
					'src/tmpl/*.hbs',
				]
            },
			vendor : {
				tasks : ['uglify:libs'],
				files : ['src/js/vendor/*.js']
			},
			css : {
				tasks : ['less:main'],
				files : ['src/css/**/*.css','src/css/**/*.less']
			}
        },
        uglify : {
			libs : {
				options : {
					mangle: false,
					beautify: true,
					preserveComments: 'all'
				},
				files : {
					'lib/libs.js': [
						// 'src/js/vendor/jquery-1.11.1.js',
						// 'src/js/vendor/moment.js',
						// 'src/js/vendor/jquery.qtip.js',
						// 'src/js/vendor/jquery.dragger.js',
						// 'src/js/vendor/velocity.js'
						//'src/js/vendor/require.js',
						//'src/js/vendor/handlebars.runtime.js'
					]
				}
			}
        },

		less: {
			main: {
				options: {
				},
				src : [
					'src/css/**/*.less',
					'src/css/**/*.css'
				],
				dest : 'lib/main.css',
			}
		}
    });

    // Load the npm installed tasks
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-handlebars');
	grunt.loadNpmTasks('grunt-contrib-less');

    // The default tasks to run when you type: grunt
    grunt.registerTask('default', ['browserify', 'less', 'uglify']);
    grunt.registerTask('w', ['watch']);
};
