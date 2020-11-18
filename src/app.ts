import express from 'express'
import database from './database'

import auth from './routes/auth'

class App {
    public express: express.Application
    /**
     * constructor
     */
    public constructor () {
      this.express = express()
      this.database()
      this.middleware()
      this.routes()
    }

    private middleware ():void {
      this.express.use(express.json())
    }

    private routes ():void {
      this.express.use('/auth', auth)
    }

    private database ():void {
      database.initConnection()
    }
}

export default new App().express
