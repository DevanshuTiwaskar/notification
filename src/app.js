import express from "express"
import cors from "cors"
import notificationRouter from './routers/notification.routes.js'


const app = express()

app.use(cors())
app.use(express.json())




app.use('/api/notification',notificationRouter)

export default app
 