const {src, dest, series, watch } = require('gulp');
const browserSync = require('browser-sync').create();

//Styles
const scss = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cssMinify = require('gulp-clean-css');

function styles() {
	// Method 1
    // return src('./frontend/src/styles/**/*.scss')
	// .pipe( scss() )
	// .pipe( autoprefixer('last 2 versions') )
	// .pipe( cssMinify() )
	// .pipe( dest('./frontend/dist/styles/'))
	
    // Method 2
	// return src('src/scss/**/*.scss')
    return src('./frontend/src/styles/**/*.scss')
    .pipe(scss().on('error',scss.logError) )
	.pipe( autoprefixer('last 2 versions') )
	.pipe( cssMinify() )
    .pipe( dest('./frontend/dist/styles/') )
    .pipe( browserSync.stream() );
}


//Scripts
const jsMinify = require('gulp-terser')

function scripts() {
	// Method 1
    // return src('./frontend/src/scripts/**/*.js')
	// .pipe( jsMinify() )
	// .pipe( dest('./frontend/dist/scrips/') )

	// return src('src/js/**/*.js')
	return src('./frontend/src/scripts/**/*.js')
	.pipe( jsMinify() )
	.pipe( dest('./frontend/dist/scripts/') )
    .pipe( browserSync.stream() );
}

//Watch task
function watchTask() {
	browserSync.init({
		port: 2020,
        server: {
            // baseDir: "./",
            // index: "index.html"

            baseDir: "./frontend/dist/",
            index: "index.html"
        }
	});
	
	watch(
		['./frontend/src/styles/**/*.scss', './frontend/src/scripts/**/*.js'],
		// ['src/scss/**/*.scss', 'src/js/**/*.js'],
		series(styles, scripts)
	)

    // watch(['./frontend/dist/**/*.html', './frontend/dist/*.html']).on('change', browserSync.reload);
    watch(['./frontend/dist/**/*.html']).on('change', browserSync.reload);
}

exports.default = series(styles, scripts, watchTask)