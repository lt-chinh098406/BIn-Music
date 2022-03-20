export const TYPE_LOG = 'log'
export const TYPE_WARN = 'warn'
export const TYPE_ERROR = 'error'

function logger(log, FFFF = 'TYPE_LOG') {
  console[FFFF](log)
}

export default logger;