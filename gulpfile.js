const { src, dest, watch, series, parallel } = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const browserSync = require("browser-sync").create();
const { rimraf } = require("rimraf");
const svgSprite = require("gulp-svg-sprite");

// Пути — ИСПРАВЛЕНО (убраны лишние пробелы!)
const paths = {
  pug: {
    src: "src/pug/pages/**/*.pug",
    dest: "dist/",
  },
  scss: {
    src: "src/scss/**/*.scss",
    dest: "dist/css/",
  },
  images: {
    src: "src/img/**/*.{png,jpg,jpeg,gif,webp}",
    dest: "dist/img/",
  },
  svg: {
    src: "src/img/**/*.svg",
    dest: "dist/img/",
  },
  js: {
    src: "src/js/**/*.js",
    dest: "dist/js/",
  },
  icons: {
    src: "src/icons/**/*.svg",
    dest: "dist/",
  },
  fonts: {
    src: "src/fonts/**/*.{woff,woff2,ttf,otf,eot,svg}",
    dest: "dist/fonts/",
  },
  vendor: {
    src: "src/vendor/**/*",
    dest: "dist/vendor/",
  },
  video: {
    src: "src/video/**/*",
    dest: "dist/video/",
  },
};

// Очистка
function clean() {
  return rimraf("dist");
}

// Pug → HTML
function compilePug() {
  return src(paths.pug.src)
    .pipe(pug({ pretty: true }))
    .pipe(dest(paths.pug.dest))
    .pipe(browserSync.stream({ once: true }));
}

// Normalize.scss → normalize.css (ОТДЕЛЬНО, без минификации!)
function compileNormalize() {
  return src("src/scss/normalize.scss", { allowEmpty: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(rename("normalize.css"))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Style.scss → style.css (ОТДЕЛЬНО, без минификации!)
function compileScss() {
  return src("src/scss/style.scss", { allowEmpty: true })
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    // .pipe(cleanCSS())
    .pipe(rename("style.css"))
    .pipe(dest(paths.scss.dest))
    .pipe(browserSync.stream());
}

// Изображения (кроме SVG)
function copyImages() {
  return src(paths.images.src, { encoding: false })
    .pipe(dest(paths.images.dest));
}

// SVG в img/svg/
function copySvg() {
  return src(paths.svg.src, { encoding: false })
    .pipe(dest(paths.svg.dest));
}

// JavaScript
function scripts() {
  return src(paths.js.src).pipe(dest(paths.js.dest));
}

// SVG спрайт
function sprite() {
  return src(paths.icons.src, { allowEmpty: true })
    .pipe(
      svgSprite({
        mode: {
          symbol: {
            dest: ".",
            sprite: "sprite.svg",
            example: false,
          },
        },
        shape: {
          transform: ["svgo"],
          spacing: { padding: 0 },
        },
      })
    )
    .pipe(dest(paths.icons.dest));
}

// Шрифты
function fonts() {
  return src(paths.fonts.src, { encoding: false })
    .pipe(dest(paths.fonts.dest));
}

// Vendor
function copyVendor() {
  return src(paths.vendor.src, { encoding: false })
    .pipe(dest(paths.vendor.dest));
}

// Видео
function copyVideo() {
  return src(paths.video.src, { encoding: false })
    .pipe(dest(paths.video.dest));
}

// Dev-сервер
function serve(done) {
  browserSync.init({
    listen: "127.0.0.1",
    host: "127.0.0.1",
    online: false,
    server: { baseDir: "dist" },
  }, done);
  watch("src/pug/**/*.pug", compilePug);
  watch("src/scss/normalize.scss", compileNormalize);
  watch(paths.scss.src, compileScss);
  watch(paths.images.src, copyImages).on("change", browserSync.reload);
  watch(paths.svg.src, copySvg).on("change", browserSync.reload);
  watch(paths.js.src, scripts).on("change", browserSync.reload);
  watch(paths.icons.src, sprite).on("change", browserSync.reload);
  watch(paths.fonts.src, fonts).on("change", browserSync.reload);
  watch(paths.vendor.src, copyVendor).on("change", browserSync.reload);
  watch(paths.video.src, copyVideo).on("change", browserSync.reload);
}

// Сборка
const build = series(
  clean,
  parallel(
    compilePug,
    compileNormalize,
    compileScss,
    copyImages,
    copySvg,
    copyVideo,
    scripts,
    sprite,
    fonts,
    copyVendor
  )
);

// Экспорт
exports.clean = clean;
exports.pug = compilePug;
exports.normalize = compileNormalize;
exports.scss = compileScss;
exports.images = copyImages;
exports.scripts = scripts;
exports.sprite = sprite;
exports.video = copyVideo;
exports.build = build;
exports.serve = series(build, serve);
exports.default = exports.serve;
