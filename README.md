# vue-ssr-blog
vue服务端渲染

> 前提是了解了 [#32](https://github.com/Jmingzi/blog/issues/32)、[#33](https://github.com/Jmingzi/blog/issues/33)。
> 博客地址：[https://iming.work](iming.work)

### 需要额外掌握的点
- leanCloud数据交互
- 实现markdown编辑器
- Date处理函数
- element-ui使用
- [vue-meta](https://github.com/declandewet/vue-meta)
- nvm管理node版本
- .zsh的安装
- [阿里云域名升级https](https://blog.csdn.net/cslucifer/article/details/79077831)
- 页面级与接口缓存
  - [LRU](https://github.com/isaacs/node-lru-cache)
  - [route-cache](https://github.com/bradoyler/route-cache)

### Feat
- [X] pm2进程管理
- [X] webhooks + shell 自动化部署
- [X] log4js dateFile日志输出到文件
- [X] 自定义MarkDown编辑器
- [X] vue全家桶
- [X] 适配移动端
- [X] 完成列表
- [X] 编辑器代码高亮，tab与缩进，快捷键。
- [X] 完成关于
- [X] 美化favicon.ico
- [X] nginx反向代理

### Todo
- [ ] nginx 缓存静态资源，开启gzip
- [ ] 优化缓存逻辑，目前页面级缓存与部分接口缓存均为15min。未做组件缓存
- [ ] 解决server-bundle.json(700kb)打包大的问题
- [ ] 更合理的抽取公共css，非公共采用内联
- [ ] 实现点赞👍

### bug
- [ ] 内存泄漏
- [ ] 混合渲染失败

更重要的是，学会分析vue ssr的性能点。
