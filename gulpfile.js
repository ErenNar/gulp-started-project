const gulp = require("gulp");
const { src, dest, watch, series } = require("gulp");
const terser = require("gulp-terser");
const minify = require("gulp-minify");
const autoPrefixer = require("gulp-autoprefixer");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();
const babel = require("gulp-babel");

function miniHtml() {
  return src("*.html").pipe(dest("dist/"));
}

function miniCss() {
  return src("src/css/*.css")
    .pipe(cleanCSS())
    .pipe(autoPrefixer())
    .pipe(minify())
    .pipe(dest("dist/css"));
}

function minijs() {
  return src("src/js/*.js")
    .pipe(
      babel({
        presets: ["@babel/env"],
      })
    )
    .pipe(terser())
    .pipe(dest("dist/js/"));
}

function miniImg() {
  return src("src/images/**/*").pipe(gulp.dest("dist/img/"));
}
function server(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}
function serverReload(cb) {
  browserSync.reload();
  cb();
}

function watchFolder() {
  watch("*.html", serverReload);
  watch("./src/css/*.css ", series(miniCss));
  watch("./src/js/*.js", series(minijs));
  watch("./src/img/**/*", series(miniImg));
}

exports.default = series(
  server,
  minijs,
  miniHtml,
  miniCss,
  miniImg,
  watchFolder
);

/*

function compileScss() {
        return src('src/scss/*.scss')
            .pipe(sass())
            .pipe(prefix())
            .pipe(minify())
            .pipe(dest('dist/css'))
}


function compileJs() {
        return src('src/js/*.js')
        .pipe(terser())
        .pipe(dest('dist/js'))

}

function compileImages() {

    return src('src/images/*.{jpg,png}')
    .pipe(imagemin(
        imagemin.mozjpeg({quality:80, progressive:true}),
        imagemin.optipng({optimizationLevel:2})
    ))
    .pipe(dest('dist/img'))
}

function wepbImage() {
    return src('dist/img/*.{jpg,png}')
    .pipe(imagewebp())
    .pipe(dest('dist/img'))
}


function watchTask() {
    watch('src/scss/*.scss',compileScss)
    watch('src/js/*.js',compileJs )
    watch('src/images/*.{jpg,png}',compileImages)
    watch('dist/img/*.{jpg,png}',wepbImage)
}

exports.default= series(
    compileScss,
    compileJs,
    compileImages,
    wepbImage,
    watchTask
)*/
