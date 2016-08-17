var gulp = require('gulp');
var md5 = require("gulp-md5-plus");
var del = require('del');

gulp.task('clean', function(){
	return del(['./output'])
});

gulp.task('html',function(){
	return gulp.src('./source/*.html')
		.pipe(gulp.dest('./output/'))
})

gulp.task('css',['html'],function(){
	return gulp.src("./source/css/*.css")
		.pipe(md5(10,'./output/*.html'))
		.pipe(gulp.dest("./output/css/"));
})

gulp.task('js',['html'],function(){
	return gulp.src("./source/js/*.js")
		.pipe(md5(10,'./output/*.html'))
		.pipe(gulp.dest("./output/js/"));
})


gulp.task('img' , ['css'],function() {
    gulp.src('./source/img/**/*')
        .pipe(md5(10 ,'./output/css/*.css',{
        	dirLevel : 1
        }))
        .pipe(gulp.dest('./output/img/'));
});

gulp.task('default',['clean'],function(){
	gulp.start('html','css','img', 'js');
})

/**
**步骤(以src/js/*.js为例)
**1.gulp.src('./src/*.js')获取所有的js
**2.pipe(md5(10,'./output/*.html')),这里将所有的js通过md5(),在md5中会将js一个个的生成对应的md5值,并且暂存其name,
**  然后,根据传进去的参数截取md5值、读取目的文件并根据name搜索出要替换的文件名使用name_md5替换,然后在重新将该文件写回去
**/