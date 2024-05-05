import { AppDataSource } from "./data-source"
import express from "express"
import Route from "./routes"
import swaggerDocs from "./utils/swagger"

AppDataSource.initialize().then(async () => {
    const app = express()
    const port = 5000

    app.use(express.json())
    app.use('/api/v1', Route)
    

    app.listen(port, () => {
        swaggerDocs(app, port)
        console.log(`Server started on port:${port}`)
    })
}).catch(error => console.log(error))
