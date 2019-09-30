"use strict";

const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const server = require("browser-sync").create();
const del = require("del");
const csso = require("gulp-csso");
const rename = require("gulp-rename");
const svgstore = require("gulp-svgstore");
var posthtml = require("gulp-posthtml");
var include = require("posthtml-include");


gulp.task("css", function () {
    return gulp.src("source/sass/style.scss")
        .pipe(plumber())
        .pipe(sourcemap.init())
        .pipe(sass())
        .pipe(postcss([
            autoprefixer()
        ]))
        .pipe(csso())
        .pipe(rename("style.min.css"))
        .pipe(sourcemap.write("."))
        .pipe(gulp.dest("build/css"))
});

gulp.task("server", function () {
    server.init({
        server: "build/",
        notify: false,
        open: true,
        cors: true,
        ui: false
    });

    gulp.watch("source/sass/**/*.{scss,sass}", gulp.series("css", "refresh"));
    gulp.watch("source/**/*.html", gulp.series("html", "refresh"));
    gulp.watch("source/js/**/*.js", gulp.series("copy", "refresh"));
});

gulp.task("sprite", function () {
    return gulp.src("source/img/triangle*.svg")
        .pipe(svgstore({
            inlineSvg: true
        }))
        .pipe(rename("sprite.svg"))
        .pipe(gulp.dest("build/img"));
});
gulp.task("refresh", function (done) {
    server.reload();
    done();
});

gulp.task("copy", function () {
    return gulp.src([
        "source/fonts/**/*.ttf",
        "source/img/**",
        "source/js/**/*.js"
    ], {
        base: "source"
    })
        .pipe(gulp.dest("build"));
});

gulp.task("clean", function () {
    return del("build");
});

gulp.task("html", function () {
    return gulp.src("source/*.html")
        .pipe(posthtml([
            include()
        ]))
        .pipe(gulp.dest("build"));
})

gulp.task("build", gulp.series("clean","copy","css", "sprite", "html"));
gulp.task("start", gulp.series("build", "server"));
