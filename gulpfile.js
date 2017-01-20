const install = require('gulp-install'),
      gulp = require('gulp'),
      eslint= require('gulp-eslint'),
      htmllint= require('gulp-html-lint'),
      gutil= require('gulp-util'),
      webpack= require('webpack'),
      WebpackDevServer= require('webpack-dev-server'),
      webpackConfig= require('./webpack.config.js');

gulp.task('lint', () => {
  return gulp.src('main.js')
            .pipe(eslint())
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
});
gulp.task('html', () => {
  return gulp.src('index.html')
            .pipe(htmllint({
              'rules': {
                'indent-width': 4
              }
            }
            ))
            .pipe(htmllint.format())
            .pipe(htmllint.failAfterError());
});
gulp.task('webpack-dev-server', function(callback) {
    // Start a webpack-dev-server
   let config = Object.create(webpackConfig);

    new WebpackDevServer(webpack(config), {
        // server and middleware options
    		stats: {
    			colors: true
    		}
    }).listen(8080, 'localhost', function(err) {
        if(err) throw new gutil.PluginError('webpack-dev-server', err);
        // Server listening
        gutil.log('[webpack-dev-server]', 'http://localhost:8080/index.html');

        // keep the server alive or continue?
        // callback();
    });
});
gulp.task('default', ['lint','html','webpack-dev-server'], () => {
  //run as default
  gulp.watch('main.js', ['lint']);
  gulp.watch('index.html', ['html']);
});
