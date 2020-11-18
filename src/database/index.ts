import mongoose from 'mongoose'
require('dotenv/config')

class Database {
  public initConnection () {
    return mongoose.connect(
      process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }).then(() => {
      console.log('[moongoose] connection estabilised successful')
    }).catch((err) => {
      console.log(`${err}`)
    })
  }
}

export default new Database()
