var gulp = require('gulp'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    ngAnnotate = require('gulp-ng-annotate'),
    cleanCSS = require('gulp-clean-css')
    //sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    templateCache = require('gulp-angular-templatecache'),
    connect = require('gulp-connect'),
    gutil = require('gulp-util'),
    ftp = require('vinyl-ftp'),
    readline = require('readline'),
    rename = require("gulp-rename")
    // login = require('./ftpLogin')

    files = {
        libjs: [
            './node_modules/jquery/dist/jquery.js',
            './node_modules/angular/angular.min.js',
            './node_modules/@uirouter/angularjs/release/angular-ui-router.min.js',
            './node_modules/angular-translate/dist/angular-translate.min.js',
            './node_modules/bootstrap/dist/js/bootstrap.min.js',
            './node_modules/ng-notify/dist/ng-notify.min.js',
            './lib/**/*.js',
        ],
        appjs: ['src/**/module.js', 'src/**/*.js'],
        libcss: [
            './node_modules/bootstrap/dist/css/bootstrap.min.css',
            './node_modules/bootstrap-rtl/bootstrap/dist/css/bootstrap-rtl.min.css',
            './node_modules/font-awesome/css/font-awesome.min.css',
            './node_modules/ng-notify/dist/ng-notify.min.css',
            './lib/**/*.css',
        ],
        appcss: [
            'src/**/*.css',
        ],
        config: [
            './src/contact.php',
            './src/CNAME',
            './src/.htaccess',
            './src/config.json',
            './src/favicon.ico',
            './src/logo.ico',
            './src/index.html'
        ],
        glob: ['dist/**/*.*'],
        remoteFolder: '/ato770/7for70'
    };

gulp.task('libjs', function () {
    gulp.src(files.libjs)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('appjs', function () {
    gulp.src(files.appjs)
        .pipe(jshint())
        .pipe(jshint.reporter('default'))    
        .pipe(sourcemaps.init())
        .pipe(concat('app.js'))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/'))
});

gulp.task('libcss', function () {
    gulp.src(files.libcss)
        .pipe(sourcemaps.init())
        .pipe(concat('lib.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('appcss', function () {
    gulp.src(files.appcss)
        .pipe(sourcemaps.init())
        .pipe(concat('app.css'))
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('templates', function () {
    gulp.src(['src/js/components/**/*.html', 'src/js/states/**/*.html'])
        .pipe(sourcemaps.init())
        .pipe(templateCache())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist'))
});
  
gulp.task('fonts', function() {
    gulp.src(['./node_modules/font-awesome/fonts/fontawesome-webfont.*'])
        .pipe(gulp.dest('dist/fonts/'))
});

gulp.task('images', function() {
    gulp.src(['./src/img/*.png', './src/img/*.jpg'])
        .pipe(gulp.dest('dist/img/'))
});

gulp.task('html', function () {
    gulp.src(files.config)
        .pipe(gulp.dest('dist'))
});

gulp.task('rename', function () {
    gulp.src(['./src/index.html'])
        .pipe(rename("404.html"))
        .pipe(gulp.dest('./dist'))
});

gulp.task('webserver', function() {
    connect.server({ port: 7700, root: 'dist' });
});

gulp.task('ftp-deploy', function () {
    if (login) {
        var conn = ftp.create({
            host: login.host,
            port: login.port,
            user: login.user,
            password: login.password,
            parallel: 5,
            log: gutil.log
        });
    
        return gulp.src(files.glob, { base: './dist', buffer: false })
            .pipe(conn.newer(files.remoteFolder))
            .pipe(conn.dest(files.remoteFolder));
    } else {
        console.log('missing login info.');
    }
});

var tasks =  ['libjs', 'appjs', 'libcss', 'appcss', 'templates', 'fonts', 'images', 'html', 'rename'];
// Styles task
// gulp.task('styles', function () {
//     gulp.src(files.appcss)
//         .pipe(sourcemaps.init())    
//         // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
//         // .pipe(sass({ onError: function (e) { console.log(e); } }))
//         .pipe(sourcemaps.write('./'))
//         .pipe(gulp.dest('dist/'));
// });

gulp.task('build', tasks);

gulp.task('watch', ['libjs', 'appjs', 'libcss', 'appcss', 'fonts', 'html', 'templates'], function () {
    gulp.watch('src/**/*.js', ['appjs']);
    gulp.watch('src/**/*.css', ['appcss']);
    gulp.watch('src/**/*.html', ['html', 'templates']);
    
    var rl = readline.createInterface({ input: process.stdin });

    rl.on('line', function (line) {
        if (line === 'rb') {
            gulp.start('watch');
        } else if (line === 'ftp') {
            gulp.start('ftp-deploy');
        } else {
            console.log("What? Try 'rb' to rebuild, or 'ftp' to deploy.");
        }
    });
});
