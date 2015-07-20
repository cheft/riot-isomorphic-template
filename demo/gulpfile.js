var fs         = require('fs');
var path       = require('path');
var gulp       = require('gulp');
var riotify    = require('riotify');
var watchify   = require('watchify');
var browserify = require('browserify');
var uglify     = require('gulp-uglify');
var rename     = require('gulp-rename');
var eslint     = require('gulp-eslint');
var sourcemaps = require('gulp-sourcemaps');
var buffer     = require('vinyl-buffer');
var source     = require('vinyl-source-stream');

var options = {
    entries: ['./client.js'],
    extensions: ['.html'],
    basedir: './'
};

gulp.task('watch', function() {
    rebundle();

    function rebundle() {
        var b = watchify(browserify(options)
        .transform(riotify, {ext: 'html'}));
        recurse('./app', './', b);
        b.on('update', rebundle);
        b.bundle()
            .pipe(source('app.js'))
            // .pipe(buffer())
            // .pipe(sourcemaps.init({loadMaps: true}))
            // .pipe(sourcemaps.write('./'))
            .pipe(gulp.dest('public/assets/js'));
    }
});

var recurse = function(dir, root, b) {
    fs.readdirSync(dir).forEach(function(file) {
        var filename = path.join(dir, file), ext;
        if (fs.statSync(filename).isDirectory()) {
            recurse(filename, root, b);
        } else {
            ext = path.extname(filename);
            if (ext === '.html') {
                filename = path.relative(root, filename)
                filename = path.join(path.dirname(filename), path.basename(filename, ext));
                b.require('./' + filename.replace(/\\/g, '/'), {entry: true, expose: false });
            }
        }
    })
}

gulp.task('browserify', function() {
    var b = browserify(options).transform(riotify, {ext: 'html', compact: true});
    recurse('./app', './', b);
    b.bundle()
        .pipe(source('app.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/assets/js'));
});

gulp.task('lint', function() {
    gulp.src('app/**/*.js')
        .pipe(eslint())
        .pipe(eslint.format());
});

gulp.task('default', ['watch']);
