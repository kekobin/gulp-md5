原理(以src/js/*.js为例)
1.gulp.src('./src/*.js')获取所有的js
2.pipe(md5(10,'./output/*.html')),这里将所有的js通过md5(),在md5中会将js一个个的生成对应的md5值,并且暂存其name,
然后,根据传进去的参数截取md5值、读取目的文件并根据name搜索出要替换的文件名使用name_md5替换,然后再重新将该文件写回去

