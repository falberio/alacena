import 'dotenv/config'
import app from '../src/app.js'

// Handler para Vercel Serverless Function
export default (req, res) => {
  console.log('Handler llamado:', req.url, req.method)
  
  // Delegar a Express
  app(req, res)
}
