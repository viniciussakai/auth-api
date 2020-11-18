import { Document, Schema, model } from 'mongoose'
import bcrypt from 'bcrypt'

interface UserInterface extends Document{
    name:string
    email:string
    password: string
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    select: false
  }
}, {
  timestamps: true
})

UserSchema.pre<UserInterface>('save', function (next) {
  bcrypt.hash(this.password, 10).then((result) => {
    this.password = result
    return next()
  })
})

// Compile model from schema
export default model<UserInterface>('User', UserSchema)
