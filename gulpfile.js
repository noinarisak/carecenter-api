var env = require('gulp-env'),
    gulp = require('gulp'),
    mocha = require('gulp-mocha'),
    nodemon = require('gulp-nodemon'),
    plumber = require('gulp-plumber'),
    runSequence = require('run-sequence'),
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


/**
 * handleMochaError
 * ================
 * Simple error handling specifically for mocha. Reports the latest error
 * encountered, then uses `process.exit(1)` to force an exit from the gulp
 * task and communicate that an error occurred (e.g. to Travis CI).
 */
var handleMochaError = function (err) {
  console.log('Mocha encountered an error, exiting with status 1');
  console.log('Error:', err.message);
  process.exit(1);
};


/**
 * mocha
 * =====
 * Runs mocha tests.
 */
gulp.task('mocha', function (callback) {
  var mochaErr;
  return gulp.src('tests/*.js', {read: false})
    .pipe(plumber())
    .pipe(mocha())
    /**
     * Keep track of latest error on Mocha. Because a failed test counts
     * as an error, the process should not be exited until end of tests.
     */
    .on('error', function(err) {
      /**
       * This intermediate log is useful for when mocha crashes (as opposed
       * to a test failing), especially necessary for Travis CI reporting.
       * Without these logs, Travis CI will not report anything meaningful
       * if mocha crashes. Can be commented out if desired.
       */
      console.error('ERROR:', err.message);
      console.error('Stack:', err.stack);
      mochaErr = err;
    })
    /**
     * The methods below are a hack to get gulp to exit after mocha tests
     * finish. Without them, `gulp mocha` doesn't exit and Travis
     * never finishes running the tests.
     */
    .on('end', function () {
      if (mochaErr) return handleMochaError(mochaErr);
      // Force mocha to exit, because gulp-mocha is stupid.
      process.exit();
    });
});


// Run testing suite: lint and mocha (server-side)
gulp.task('test', function(callback) {
  /**
   * Use `runSequence` to call tasks synchronously, otherwise
   * messages from both will be potentially interleaved.
   */
  env({vars:{ENV:'Test'}});
  runSequence('mocha', callback);
  // runSequence('lint', 'mocha', callback);      /* todo: implement the lint gulp-task.*/
});