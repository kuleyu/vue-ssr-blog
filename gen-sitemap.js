const https = require('https')
const fs = require('fs')

https.get('https://www.xml-sitemaps.com/index.php?op=crawlproc&initurl=https%3A//iming.work&lastmod=on&priority=on&freq=&&injs=1', (res) => {
  res.setEncoding('utf8')
  let result
  res.on('data', (d) => {
    // console.log(d)
    result = d
  })

  res.on('close', () => {
    const id = JSON.parse(result).view_details

    const txt = fs.createWriteStream('./sitemap.xml')
    https.get(`https://www.xml-sitemaps.com/download/${id}/sitemap.xml`, file => {
      file.on('data', f => {
        txt.write(f)
      })
      file.on('close', () => {
        txt.end()
        console.log('执行完成！')
      })
    })
  })

}).on('error', (e) => {
  console.error(e)
})
