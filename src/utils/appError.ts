class AppError extends Error {
  statusCode: number
  status: 'fail' | 'error'
  isOperationalError: true

  constructor(message: string, statusCode: number) {
    super(message)
    this.statusCode = statusCode
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error'
    this.isOperationalError = true
    Error.captureStackTrace(this, this.constructor)
  }
}

export default AppError
