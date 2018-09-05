// Course: Webbutveckling III HT18
// Assignment: Moment 2
// Author: Fredrik Waldfelt - frwa1700
// Date: 2018-09-05
// Filename: gulpfile.js
// Description: Gulp configuration file
var 
    // Load gulp and modules
    gulp = require('gulp'),
    newer = require('gulp-newer'),
    inject = require('gulp-inject'),
    imagemin = require('gulp-imagemin'),
    concat = require('gulp-concat'),
    cleanCSS = require('gulp-clean-css'),
    browserSync = require('browser-sync').create(),
    runSequence = require('run-sequence'),
    del = require('del');

    // Setup folders
    folder = {
        // Source-directories
        src: 'src/',
        srcCss: 'src/css/**/*',
        srcHTML: 'src/html/**/*',
        srcJS: 'src/js/**/*',
        srcImages: 'src/images/', // Only take images in one directory

        // Testing-directories
        dev: 'dev/',
        devCSS: 'dev/css/',
        devHTML: 'dev/',
        devJS: 'dev/js/',
        devImages: 'dev/images/'
    }

    // Create gulp tasks

    // Task to copy compressed and move images to dev
    gulp.task('images:copy', function(){
        var
            out = folder.devImages,
            image = gulp.src(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}')
                .pipe(newer(out))
                .pipe(imagemin({optimizationLevel: 5}));
            
        return image.pipe(gulp.dest(out));
    })

    // Task to copy HTML-files to dev
    gulp.task('html:copy', function(){
        var 
            out = folder.devHTML,
            page = gulp.src(folder.srcHTML + '.html')
                .pipe(newer(out)) // Only pipe new files
        return page.pipe(gulp.dest(out)); // Save file
    })

    // Task to copy CSS-files to dev
    gulp.task('css:copy', function(){
        var
            out = folder.devCSS,
            fileName = 'style.css',
            css = gulp.src(folder.srcCss)
                .pipe(concat(fileName))
                .pipe(newer(out));

        return css.pipe(gulp.dest(out));
    });

    // Task to copy JS-files to dev
    gulp.task('js:copy', function(){
        var
            out = folder.devJS,
            js = gulp.src(folder.srcJS)
                .pipe(newer(out));
        return js.pipe(gulp.dest(out));
    });

    // Task to create page by inserting CSS, JS
    gulp.task('pages:create',['images:copy', 'css:copy','js:copy','html:copy'], function(){
        var
            out = folder.devHTML,
            css = gulp.src(folder.devCSS + '*.css', {read: false} ),
            js = gulp.src(folder.devJS + '*.js', {read: false} ),

            page = gulp.src(folder.srcHTML)
                .pipe(inject(css, {ignorePath:folder.dev, addRootSlash: false})) // Inject CSS
                .pipe(inject(js, {ignorePath:folder.dev, addRootSlash: false})) // Inject JavaScript

        return page.pipe(gulp.dest(out)); // Save file
    });

    // Deletes dev-directory
    gulp.task('del:dev', function(){
        del(folder.dev);
    })


    // Task to start BrowserSync
    gulp.task('start-server', function(){
        browserSync.init({
            server: {
                baseDir: folder.dev, // Base-direcory of server
            }
        })
    })

    // Task to start watchers
    gulp.task('start-watchers', function(){
        gulp.watch(folder.srcHTML + '.html', ['pages:create']); // Copy new html/css/js/images and injects css/js into html-files
        gulp.watch(folder.srcCss + '.css', ['css:copy']); // Concat and copies CSS-files a
        gulp.watch(folder.srcJS + '.js', ['js:copy']); //Copies JS-files
        gulp.watch(folder.srcImages + '**/*.{jpg,jpeg,png,svg,gif}', ['images:copy']); // Copies images
        gulp.watch(folder.dev + '**/*', browserSync.reload); // Reload browser when files changes

    })
    
    /**
     * Task to run to start development.
     * Run tasks in this sequence:
     * 1. Deletes ALL files in the dev-folder
     * 2. Copy src-files and injects css/js
     * 3. Start the BrowserSync-server
     * 4. Start watchers to copy new/changed files
     */
    gulp.task('start-dev', function(callback){
        runSequence('del:dev', 'pages:create','start-server', 'start-watchers', callback);
    })
