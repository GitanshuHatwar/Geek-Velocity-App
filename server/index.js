const express = require('express')
const cors = require('cors')
const path = require('path')
const app = express()

// Use environment port or default to 4000
const port = process.env.PORT || 4000

// Middleware
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  })
})

app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from the backend!' })
})

// Serve static files from the React app build
// Check if dist folder exists, if not serve from public
const staticPath = path.join(__dirname, '../dist')
const publicPath = path.join(__dirname, '../public')

if (require('fs').existsSync(staticPath)) {
  app.use(express.static(staticPath))
  console.log('Serving static files from dist folder')
} else if (require('fs').existsSync(publicPath)) {
  app.use(express.static(publicPath))
  console.log('Serving static files from public folder')
} else {
  console.log('No static files folder found')
}

// API fallback for unknown routes
app.get('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' })
})

// Catch all handler: send back React's index.html file for any non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../dist/index.html')
  const publicIndexPath = path.join(__dirname, '../public/index.html')
  
  if (require('fs').existsSync(indexPath)) {
    res.sendFile(indexPath)
  } else if (require('fs').existsSync(publicIndexPath)) {
    res.sendFile(publicIndexPath)
  } else {
    res.status(404).send('React app not built. Run "npm run build" first.')
  }
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(port, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${port}`)
  console.log(`📡 API available at http://localhost:${port}/api`)
  console.log(`🌐 React app served at http://localhost:${port}`)
  console.log(`🔧 Environment: ${process.env.NODE_ENV || 'development'}`)
}) 