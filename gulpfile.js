"use strict";

var gulp = require("gulp");
var less = require("gulp-less");
var plumber = require("gulp-plumber");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();

// мои переменные

var csso = require('gulp-csso'); // для css.min
var rename = require("gulp-rename"); // для css.min
const imagemin = require('gulp-imagemin'); // для min jpg/png/svg
const webp = require("gulp-webp"); // для webp conversion
var rename = require("gulp-rename"); // для svg sprite
var svgstore = require('gulp-svgstore'); // для svg sprite
var posthtml = require("gulp-posthtml"); //для posthtml
var include = require("posthtml-include"); //для posthtml
var del = require("del"); //для удаления папки build

// заводим локальный сервер

gulp.task("server", function () {
  server.init({
    server: "build/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/img/sprite/*.svg", gulp.series("sprite", "html", "refresh"));
  gulp.watch("source/*.html", gulp.series("html", "refresh"));
});

// обновление страницы

gulp.task("refresh", function (done) {
  server.reload();
  done();
});

// моя оптимизация

// css.min

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream())
    .pipe(csso())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css"));
});

// min jpg/png/svg

gulp.task("images", function () {
  return gulp.src("source/img/**/*.{png,jpg,svg}")
    .pipe(imagemin([
      imagemin.optipng({ optimizationLevel: 3}),
      imagemin.jpegtran({ progressive: true }),
      imagemin.svgo({
        plugins: [
          {removeViewBox: false},
          {cleanupIDs: true}
        ]
      })
    ]))
    .pipe(gulp.dest("source/img"));
});

// webp conversion

gulp.task("webp", function () {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 100}))
    .pipe(gulp.dest("source/img"));
});

// svg sprite

gulp.task("sprite", function () {
  return gulp.src("source/img/sprite/*.svg")
    .pipe(svgstore({
      inlineSvg: true
    }))
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img/sprite"));
});

// posthtml

gulp.task("html", function () {
  return gulp.src("source/*.html")
    .pipe(posthtml([
      include()
    ]))
    .pipe(gulp.dest("build"))
});

// удаление папки билд

gulp.task("clean", function () {
  return del("build");
});

// копирование

gulp.task("copy", function ()  {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/js/**"
  ], {
    base: "source"
  })
  .pipe(gulp.dest("build"));
});

// запуск билда

gulp.task("build", gulp.series(
  "clean",
  "copy",
  "css",
  "sprite",
  "html"
));

gulp.task("start", gulp.series("build", "server"));

// конец моей оптимизации
