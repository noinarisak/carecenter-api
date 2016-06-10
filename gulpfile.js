var gulp = require('gulp'),
    nodemon = require('gulp-nodemon'),
    gulpMocha = require('gulp-mocha'),
    env = require('gulp-env'),
    supertest = require('supertest');
    
gulp.task('default', function() {
    nodemon({
        script: 'app.js',
        ext:'js',
        env: {
            PORT: 8080
        },
        ignore: ['./node_modules/**']
    })
    .on('restart', function(){
        console.log('Restarting...');
    });
});

gulp.task('test', function() {
    env({vars:{ENV:'Test'}});
    gulp.src('tests/*.js', {read:true})
        .pipe(gulpMocha({reporter:'nyan'}))
        .once('error', () => {
            process.exit(1);
        })
        .once('end', () => {
            process.exit();
        });    
})

