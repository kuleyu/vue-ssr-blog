# vue-ssr-blog
vue服务端渲染

> 前提是了解了 [#32](https://github.com/Jmingzi/blog/issues/32)、[#33](https://github.com/Jmingzi/blog/issues/33)。  
> 博客地址：[http://116.62.70.156:3000/](http://116.62.70.156:3000/)，由于域名备案还未通过，所以未解析。

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
- [X] webhooks实现提交github自动垃取打包重启
- [X] vue全家桶实现ssr
- [X] log4js日志输出到文件

### ToDo
- [ ] nginx对非响应请求转发，保证访问的友好性
- [ ] 优化缓存逻辑，目前页面级缓存与部分接口缓存均为15min。未做组件缓存
- [ ] 日志文件dateFile输出
- [ ] 美化favicon.ico
- [ ] 解决server-bundle.json(600kb)打包大的问题
- [ ] 更合理的抽取公共css，非公共采用内联
- [ ] 实现点赞👍
- [ ] 完成列表与关于
- [ ] 适配移动端

更重要的是，学会分析vue ssr的性能点。
