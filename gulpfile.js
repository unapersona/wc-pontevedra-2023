const AppName = 'wc-pontevedra-2023';

const gulp         = require( 'gulp' ),
	sass         = require( 'gulp-sass' )( require( 'node-sass' ) ),
	autoprefixer = require( 'gulp-autoprefixer' ),
	plumber      = require( 'gulp-plumber' ),
	concat       = require( 'gulp-concat' ),
	log          = require( 'fancy-log' ),
	sourcemaps   = require( 'gulp-sourcemaps' ),
	rename       = require( 'gulp-rename' ),
	uglify       = require( 'gulp-uglify' );

//sass.compiler = require('node-sass');

/** SCSS Task **/
gulp.task( 'public-scss', function() {
	return gulp.src( './sass/style.scss' )
		.pipe( sourcemaps.init() )
		.pipe( sourcemaps.identityMap() )
		.pipe( plumber() )
		.pipe( concat( 'style.css' ) )
		.pipe( autoprefixer( 'last 2 versions', '> 5%', 'not ie 6-9' ) )
		.pipe( sass( { outputStyle: 'compressed' } ).on( 'error', sass.logError ) )
		.pipe( sourcemaps.write( './maps' ) )
		.pipe( gulp.dest( './' ) )
		.on( 'end', function() {
			log.info( 'Result Gulp Task CSS: Created: ./style.css' );
		} );
} );

gulp.task( 'watch', function() {
	// Inspect changes in all scss files.
	gulp.watch( [ './sass/**/*.scss' ], gulp.parallel( [ 'public-scss' ] ) );
} );

gulp.task( 'default', gulp.parallel( 'watch', 'public-scss' ) );
