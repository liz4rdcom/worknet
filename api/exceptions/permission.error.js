class PermissionError extends Error {
  constructor(message, statusCode) {
    super(message)
    Error.captureStackTrace(this, this.constructor)

    this.name = 'PermissionError'
    this.message = message
    this.statusCode = statusCode || 403
  }
}

module.exports = PermissionError
