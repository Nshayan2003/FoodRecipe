import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import connectDB from './utils/connectDB.js'
import userRoutes from './routes/user.routes.js'
import recipeRoutes from './routes/recipe.routes.js'
import { addRecipeData } from './controllers/RecipeController.js'
dotenv.config()
const PORT = process.env.PORT || 8000
const app = express()

// Connect TO Database
;(async () => {
  await connectDB()
})()

app.use(
  cors({
    origin: ['*', 'http://localhost:5173'],
    credentials: true
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running....'
  })
})
// addRecipeData()

app.use('/user', userRoutes)
app.use('/recipe', recipeRoutes)

app.listen(PORT, console.log(`Server is listening on port ${PORT}...`))
