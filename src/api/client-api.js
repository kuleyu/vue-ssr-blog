import db from './db.js'

export default function () {
  console.log('client api')

  db.init()

  db.addArticle = data => {
    const article = db.initTables('Article', data.id)
    Object.keys(data).forEach(key => {
      if (key !== 'id') {
        article.set(key, data[key])
      }
    })
    return article.save()
  }

  return db
}
