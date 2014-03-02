module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		copy: {
			release: {
				files: [
					{
						expand:true, 
						flatten: true,
						cwd:'bower_components/',
						src:['angular/angular.min.js', 
							'angular-bootstrap/ui-bootstrap-tpls.min.js',
							'bootstrap/dist/css/bootstrap.min.css'],
						dest:'prod/libs/'
					},
					{
						expand:true,
						flatten: true,
						src:['manifest.json', 'icon.png'],
						dest:'prod'
					},
					{
						expand:true, 
						flatten: true,
						cwd:'bower_components/',
						src: 'bootstrap/fonts/glyphicons-halflings-regular.*',
						dest:'prod/fonts/'
					}
				]
			}
		},
		clean: {
			release:['prod', 'prod.zip']
		},
		uglify: {
			options: {
				compress: {
					drop_console: true
				},
				mangle: false
			},
			release: {
				files: 
					{
						'prod/app.min.js':'app/*.js',
						'prod/background.js':'background.js',
					}
			}
		},
		cssmin: {
			release: {
				files:{'prod/style.min.css':'style.css'}
			}
		},
		processhtml: {
			release: {
				files: {
					'prod/player.html': ['player.html'] 
				}
			}
		},
		compress: {
			release: {
				options: {
					archive: 'prod.zip'
				},
				files: [
					{src: ['prod/**']}
				]
			}
		}
	});	
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-processhtml');
	grunt.loadNpmTasks('grunt-contrib-compress');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.registerTask('release', ['clean:release', 'copy:release', 'uglify:release', 'cssmin:release', 'processhtml:release', 'compress:release']);
};