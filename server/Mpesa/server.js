
import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import router from './routes/route.js';

dotenv.config()
// initialize express
const app = express()

// middlewares
app.use(express.json())
app.use(cors())

// import routes
app.use('/api', router);

const port = process.env.PORT

app.listen(port, () => {
    console.log(`App listening on port ${port}`)
})
