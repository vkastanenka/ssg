import morgan from 'morgan'
import express, { Application, Request, Response, NextFunction } from 'express'
import AppError from './utils/appError'
import { ReasonPhrases, StatusCodes } from 'http-status-codes'

// Express app setup

const app: Application = express()
app.enable('trust proxy')

// Development logging
if (process.env.NODE_ENV === 'development') app.use(morgan('dev'))

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true, limit: '10kb' }))

// Test middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  req.requestTime = new Date().toISOString()
  next()
})

// Handling unhandled routes
app.all('*', (req, res, next) => {
  next(
    new AppError(
      `Error ${ReasonPhrases.NOT_FOUND}: Can't find ${req.originalUrl} on this server!`,
      StatusCodes.NOT_FOUND
    )
  )
})

export default app
