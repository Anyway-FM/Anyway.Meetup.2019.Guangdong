var gulp = require('gulp'), gulpLoadPlugins = require('gulp-load-plugins'), plugins = gulpLoadPlugins();

var cdnUrl = [
	[ 'css/about.css', 'https://s.anw.red/anyway.fm/about.min.css' ],
	[ 'css/main.css', 'https://s.anw.red/anyway.fm/main.min.css' ],
	[ 'css/archive.css', 'https://s.anw.red/anyway.fm/archive.min.css' ],
	[ 'css/hashover.css', 'https://s.anw.red/anyway.fm/hashover.min.css' ],
	[ 'css/theme.css', 'https://s.anw.red/anyway.fm/theme.min.css' ],
	[ 'css/member.css', 'https://s.anw.red/anyway.fm/member.min.css' ],
	[ 'css/store.css', 'https://s.anw.red/anyway.fm/store.min.css' ],
	[ 'css/numbers.css', 'https://s.anw.red/anyway.fm/numbers.min.css' ],
	[ 'css/timeline.css', 'https://s.anw.red/anyway.fm/timeline.min.css' ],
	[ '-local.png', '-32.png' ],
	[ 'js/vue.js', 'https://s.anw.red/js/vue.min.js' ],
	[ 'js/numbers.js', 'https://s.anw.red/anyway.fm/numbers.js' ],
	[ 'js/main.js', 'https://s.anw.red/anyway.fm/main.js' ],
	[ 'js/timeline.js', 'https://s.anw.red/anyway.fm/timeline.js' ],
	[ 'js/about.js', 'https://s.anw.red/anyway.fm/about.js' ],
	[ 'js/archive.js', 'https://s.anw.red/anyway.fm/archive.js' ],
	[ 'js/profile.js', 'https://s.anw.red/anyway.fm/profile.js' ],
	[ 'js/about.js', 'https://s.anw.red/anyway.fm/about.js' ],
	[ 'js/vue-lazyload.js', 'https://s.anw.red/anyway.fm/vue-lazyload.js' ],
	[ 'js/social-share.min.js', 'https://s.anw.red/anyway.fm/social-share.min.js' ],
	[ 'images/profile-home.png', 'https://s.anw.red/anyway.fm/profile-home.png' ],
	[ '../images/', 'https://s.anw.red/anyway.fm/' ],
	[ '../assets/', 'https://s.anw.red/anyway.fm/' ],
	[ './images/', 'https://s.anw.red/anyway.fm/' ],
	[ '\'images/', '\'https://s.anw.red/anyway.fm/' ],
  [ '../builds/fonts/', 'https://s.anw.red/font/' ],
	[ 'css/subscribe.css', 'https://s.anw.red/anyway.fm/subscribe.min.css' ]
];

gulp.task('default', function() {

	gulp.src(['template/anyway-v2/*.php','!template/anyway-v2/info.php'])
		.pipe(plugins.cacheBust({
      type: 'MD5',
      basePath: './'
    	}))
		.pipe(plugins.batchReplace(cdnUrl))
    .pipe(plugins.htmlmin({
			collapseWhitespace: true,
			removeComments: true
		}))
		.pipe(plugins.changed('builds'))
		.pipe(gulp.dest('builds'));

	// gulp.src('images/*.svg')
  //   .pipe(plugins.svgo())
  //   .pipe(gulp.dest('builds'));
	gulp.src(['js/main.js','js/profile.js','js/about.js','js/archive.js','js/timeline.js'])
		.pipe(plugins.batchReplace(cdnUrl))
		.pipe(plugins.stripDebug())
		.pipe(plugins.changed('builds'))
		.pipe(plugins.minify({
			ext:{
				min:'.js'
			},
			noSource: true
		}))
    .pipe(gulp.dest('builds'))


	const cssSrc = ['css/*.css','!css/*.min.css']

	gulp.src(cssSrc)
  	.pipe(plugins.cleanCss())
    .pipe(plugins.rename({
      suffix: '.min'
      }))
    .pipe(plugins.batchReplace(cdnUrl))
		.pipe(plugins.changed('builds'))
    .pipe(gulp.dest('builds'));
});

gulp.task('watch', function() {
	gulp.watch(['*','*/*'], ['default']);
 });
