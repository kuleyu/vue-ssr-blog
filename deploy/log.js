const log4js = require('log4js')
const logger = log4js.getLogger()

module.exports = {
  logger(type = 'debug') {
    logger.level = type
    return logger.debug.bind(logger)
  }
}