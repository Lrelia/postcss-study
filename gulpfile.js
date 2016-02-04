var gulp = require('gulp'),
	postcss = require('gulp-postcss'),
	autoprefixer = require('autoprefixer-core'),
	postcssSimpleVars = require('postcss-simple-vars'),
	postcssMixins = require('postcss-mixins'),
	postcssNested = require('postcss-nested'),
	atImport = require('postcss-import'),
	mqpacker = require('css-mqpacker'),
	cssnano = require('cssnano'),
	postCircle = require('postcss-circle'),
	sourcemaps = require('gulp-sourcemaps');

// Css process.
gulp.task("postcss", function() {
	var custom = function(css, opts) {
		css.eachDecl(function(decl) {
			decl.value = decl.value.replace(/\d+rem/, function(str) {
				return 16 * parseFloat(str) + 'px';
			});
		});
	};
	var processors = [
		atImport,
		mqpacker,
		cssnano,
		postcssMixins,
		postcssSimpleVars,
		postcssNested,
		postCircle,
		autoprefixer({
			browsers: ["Android 4.1", "IOS 7.1", "Chrome > 31", "ff > 31", "ie >= 10"]
		}),
		custom
	];

	return gulp.src(['./src/css/*.css'])
		.pipe(sourcemaps.init())
		.pipe(postcss(processors))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest('./dist/css'));
});

