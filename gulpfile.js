var gulp = require('gulp')

var folder = {
    'src':'src/',
    'dist':'docs/'
}
var htmlclean = require('gulp-htmlclean')   // 压缩html文件
var imagemin = require('gulp-imagemin')     // 压缩图片

var less = require("gulp-less")             // less装换成css
var cleanCss = require("gulp-clean-css")    // 压缩css文件
var autoprefixer = require("gulp-autoprefixer") // 添加css3浏览器前缀 

// npm install gulp-connect gulp-strip-debug gulp-uglify gulp-autoprefixer gulp-clean-css gulp-babel gulp-less gulp-htmlclean gulp-imagemin 


var babel = require('gulp-babel')
var uglify = require('gulp-uglify')         // 压缩js
var stripDebug = require('gulp-strip-debug')    // 去除调试代码

// 开启本地服务器
var connect = require("gulp-connect") // 开启本地服务器
 
gulp.task("html",function(){
    gulp.src(folder.src+"html/*")
    .pipe(htmlclean())
    .pipe(gulp.dest(folder.dist+"/"))
})

gulp.task("css",function(){
    gulp.src(folder.src + "css/*")      // 读取src/css文件夹下面的所有文件
    .pipe(less())                       // 将less转译成css
    .pipe(autoprefixer({                // 自动给css添加浏览器前缀
        browsers: ['last 20 versions'] 
    }))
    .pipe(cleanCss())                   // css代码压缩
    .pipe(gulp.dest(folder.dist+"css/"))  // 输出代码到dist/css目录下面
})

gulp.task("images",function(){
    gulp.src(folder.src+"images/lib/*") // 读取src/images文件夹下面的所有文件
    .pipe(imagemin())               // 图片压缩
    .pipe(gulp.dest(folder.dist+"images/lib/")) // 输出代码到dist/images目录下面
})
gulp.task("js",function(){
    gulp.src(folder.src + "js/*")       // 读取src/js文件夹下面的所有文件
    .pipe(babel({
        "presets":['@babel/env']
    }))                               // 使用babel
    .pipe(uglify())                     // js代码压缩
    .pipe(stripDebug())                 // 去除全部调试语句
    .pipe(gulp.dest(folder.dist+"js/")) // 输出代码到dist/js目录下面
})

gulp.task("audio",function(){
    gulp.src(folder.src + "audio/*")       // 读取src/audio文件夹下面的所有文件 
    .pipe(gulp.dest(folder.dist+"audio/")) // 输出代码到dist/audio目录下面
})

gulp.task("server",function(){
    connect.server({                // 链接服务器
        port:9999,                  // 设置服务器端口为9999
        livereload:true             // 热替换开启
    })
})
gulp.task("watch",function(){
    
    // 分别监听src/html/路径、src/css/路径、src/js/路径下面的所有文件
    // 如果改动 则执行数组里面的任务
    gulp.watch("src/html/*",["html"])   
    gulp.watch("src/css/*",["css"])
    gulp.watch("src/js/*",["js"])
    gulp.watch("src/images/*",["images"])
})

gulp.task("default", ["html", "images", "css", "js", "audio", "server", "watch"])