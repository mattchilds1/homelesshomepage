var gulp = require("gulp");
var sass = require("gulp-sass");
var shell = require('gulp-shell');
var autoprefixer = require("gulp-autoprefixer");
var minifyCss = require('gulp-minify-css');
var connect = require('gulp-connect');


// Configuration options
var opts = {
    directories: {
        scss: "./src/scss",
        site: "./_site"
    },
    plugins: {
        autoprefixer: {
            browsers: ["last 2 versions"]
        }
    }
};

// run jekyll

gulp.task('jekyll', shell.task([
  'jekyll build --source src --destination _site'
]))


// Compile the SCSS and run through auto-prefixer
gulp.task("sass", ['jekyll'], function() {
    gulp.src(opts.directories.scss + "/*.scss")
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(sass({
            style: "expanded",
            sourceComments: "normal"
        }))
        .pipe(autoprefixer(opts.plugins.autoprefixer))
        .pipe(minifyCss())
        .pipe(gulp.dest(opts.directories.site));
});

gulp.task('connect', function() {
  connect.server({root: opts.directories.site, host:'localhost', port: 2001});
});

gulp.task('default', ['jekyll', 'sass', 'connect']);
