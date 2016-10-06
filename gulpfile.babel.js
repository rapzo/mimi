'use strict'

import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import { stream as wiredep } from 'wiredep';

var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var buildNumber = process.env.BUILD_NUMBER || 'TAG';

function executeBrowserify(type) {
    return browserify({
        entries: [`./app/scripts.babel/${type}/index.js`],
        debug: true,
        transform: [babelify]
    })
    .bundle()
    .pipe(source(`${type}.js`))
    .pipe(buffer())
    .pipe(gulp.dest('./app/scripts'));
};

const $ = gulpLoadPlugins();

gulp.task('extras', () => (
    gulp.src([
        'app/*.*',
        'app/_locales/**',
        '!app/scripts.babel',
        '!app/*.json',
        '!app/*.html',
    ], {
        base: 'app',
        dot: true
    }).pipe(gulp.dest('dist'))
));

function lint(files, options) {
    return () => (
        gulp.src(files)
            .pipe($.eslint(options))
            .pipe($.eslint.format())
    );
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
    env: {
        es6: true
    }
}));

gulp.task('images', () => {
    return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
        progressive: true,
        interlaced: true,
        // don't remove IDs from SVGs, they are often used
        // as hooks for embedding and styling
        svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
        console.log(err);
        this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html',  () => {
    return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    .pipe($.sourcemaps.init())
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('audio', () => {
  return gulp.src('app/sounds/**/*.mp3')
    .pipe(gulp.dest('dist/sounds'))
})

gulp.task('chromeManifest', () => {
    return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
        buildnumber: true,
        background: {
            target: 'scripts/background.js',
            exclude: [
                'scripts/chromereload.js'
            ]
        }
    }))
    .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    .pipe($.if('*.js', $.sourcemaps.init()))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.js', $.sourcemaps.write('.')))
    .pipe(gulp.dest('dist'));
});

gulp.task('babel', () => {
    return gulp.src('app/scripts.babel/**/*.js')
    .pipe($.babel({
        presets: ['es2015']
    }))
    .pipe(gulp.dest('app/scripts'));
});


gulp.task('browserify', () => {
    return executeBrowserify('background');
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'babel'], () => {
    $.livereload.listen();

    gulp.watch([
        'app/*.html',
        'app/scripts/**/*.js',
        'app/images/**/*',
        'app/styles/**/*',
        'app/_locales/**/*.json'
    ]).on('change', $.livereload.reload);

    gulp.watch('app/scripts.babel/**/*.js', ['lint', 'babel']);
});

gulp.task('size', () => {
    return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('wiredep', () => {
    gulp.src('app/*.html')
    .pipe(wiredep({
        ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('package', function () {
    var manifest = require('./dist/manifest.json');
    return gulp.src('dist/**')
    .pipe($.zip('mimi-' + manifest.version + '.zip'))
    .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
    runSequence(
        'lint', 'babel', 'browserify', 'chromeManifest',
        ['html', 'images', 'extras', 'audio'],
        'size', cb);
    });

    gulp.task('default', ['clean'], cb => {
        runSequence('build', cb);
    });
