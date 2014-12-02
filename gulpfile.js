// Load Plugins
var pkg          = require('./package.json'),
    gulp         = require("gulp"),
    uglify       = require("gulp-uglify"),
    rename       = require("gulp-rename"),
    jshint       = require("gulp-jshint"),
    merge        = require("merge-stream"),
    header       = require("gulp-header"),
    livereload   = require("gulp-livereload");

// Used for copyright headers
var banner = "/*! <%= pkg.title %> <%= pkg.version %> | <%= pkg.homepage %> | (c) 2014 BoomTown | MIT License */\n";

// JS Hint
gulp.task("jshint", function() {
  return gulp.src("src/*.js")
    .pipe(jshint({
      "boss": true,
      "sub": true,
      "evil": true,
      "browser": true,
      "multistr": true,
      "globals": {
        "module": false,
        "require": true
      }
    }))
    .pipe(jshint.reporter("jshint-stylish"));
});

// Scripts
gulp.task("scripts", function() {
  var uncompressed = gulp.src("src/*.js")
    .pipe(header(banner, { pkg : pkg }))
    .pipe(gulp.dest("dist/js/"));

  var compressed = gulp.src("src/*.js")
    .pipe(uglify())
    .pipe(header(banner, { pkg : pkg }))
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest("dist/js/"));

  return merge(uncompressed, compressed);
});

// Default task
gulp.task("default", ["jshint", "scripts"]);

// Watch
gulp.task("watch", function () {
  gulp.watch("src/*.js", ["jshint", "scripts"]);

  // Create LiveReload server
  var server = livereload();
  livereload.listen();

  // Watch files in patterns below, reload on change
  gulp.watch("dist/js/*.js").on("change", function(file) {
    server.changed(file.path);
  });
});