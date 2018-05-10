const myLocalIp = require('my-local-ip')

/**
 * make a log directory, just in case it isn't there.
 */
try {
  require('fs').mkdirSync('./log')
} catch (e) {
  if (e.code !== 'EEXIST') {
    console.error('Could not set up log directory, error was: ', e)
    process.exit(1)
  }
}

const log4js = require('log4js')
log4js.configure('./log4js.config.json')
const log = log4js.getLogger('startup')
const app = require('../server.js')

app.set('port', process.env.PORT || 3000)

const server = app.listen(app.get('port'), function() {
  log.debug(
    'Express server listening on port ',
    myLocalIp() + ':' + server.address().port,
    ' with pid:', process.pid
  )
})
