import dotenv from 'dotenv'
dotenv.config({ path: '../config.env' })

// Uncaught exception handling
process.on('uncaughtException', (err: Error) => {
  console.log('UNCAUGHT EXCEPTION! 💥 SHUTTING DOWN!')
  console.log(err.name, err.message)
  process.exit(1)
})

// Boot express
import app from './app'

// Server settings
const port = process.env.PORT || 5000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}!`)
})

// Unhandled rejection handling
process.on('unhandledRejection', (err: Error) => {
  console.log(err.name, err.message)
  console.log('UNHANDLED REJECTION! 💥 SHUTTING DOWN!')
  server.close(() => {
    process.exit(1)
  })
})
