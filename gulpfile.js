// Modules 호출
const gulp = require('gulp'); // gulp 플러그인 호출 
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps'); // sourcemaps 호출 
const sass = require('gulp-sass'); // sass 호출
const watch = require('gulp-watch'); // watch
const autoPrefixer = require('gulp-autoprefixer');// 
const autoprefixer_browsers = ['last 4 version', 'not IE 8'];

const src = '_src';
const dist = 'dist';
const paths = {
    local:`${__dirname}`,
    js: src + '/js/**/*.js',
    scss: src + '/sass/**/*.scss'
};


let compileJS = () => {
     gulp.src(`${paths.js}`)
    //.pipe(concat('combined.js'))
    //.pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest(dist + '/js'));
};


let compileSass = () =>{

    gulp.src(`${paths.scss}`)
    .pipe(sourcemaps.init())
    .pipe(sass({outputStyle: 'compact'}).on('error',sass.logError))
    .pipe(autoPrefixer(autoprefixer_browsers))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(dist+'/css'));
}

gulp.task('dev', ()=>{
    compileJS();
    compileSass();
    // console.log(`${paths.local}`, '--------------check-----------')
   watch(`${paths.local}/_src/js/**/*.js`,compileJS);
   watch(`${paths.local}/_src/sass/**/*.scss`, compileSass);
}); // gulp 를 실행하면 default 로 js:combine task, scss:compile task 그리고 watch task 를 실행하도록 한다. 
