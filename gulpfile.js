const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const obfuscate = require('gulp-obfuscate');

const rootPath = {
	source: "./src/",
	dist: "./public",
};

const paths = {
	html: "**/*.html",
	sass: "assets/scss/**/*.scss",
	mainSass:"assets/scss/main.scss",
	js: "assets/js/app.js"
};

gulp.task("mover_html",()=>{
	gulp.src(rootPath.source + paths.html)
		.pipe(gulp.dest(rootPath.dist));
});

gulp.task('prepararJS', () =>{
	gulp.src(rootPath.source + paths.js)
		.pipe(uglify())
		.pipe(obfuscate())
		.pipe(gulp.dest(rootPath.dist + '/assets/js'));
});

gulp.task('prepararCSS', () =>{
	gulp.src(rootPath.source + paths.mainSass)
		.pipe(sass({outputStyle: "compressed"})
			.on("error", sass.logError))
		.pipe(gulp.dest(rootPath.dist + '/assets/css'))
});

gulp.task('wachando_cambios', () => {
	browserSync.init({
		server: {
			baseDir: './public'
		}
	});
	gulp.watch(rootPath.source + paths.mainSass, ['sass-watch']);
	gulp.watch(rootPath.source + paths.js, ['js-watch']);
	gulp.watch(rootPath.source + paths.html, ['html-watch']);
});

gulp.task('js-watch', ['prepararJS'], ()=>{
	browserSync.reload();
});

gulp.task('sass-watch', ['prepararCSS'], ()=>{
	browserSync.reload();
});

gulp.task('html-watch', ['mover_html'], ()=>{
	browserSync.reload();
});