import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import token from '../services/token'

import User from '../models/User'

class AuthController {
  public async register (req:Request, res: Response):Promise<Response> {
    const { email } = req.body

    try {
      if (await User.findOne({ email })) {
        return res
          .status(400)
          .send({ error: 'User alredy exists' })
      }

      const user = await User.create(req.body)

      user.password = undefined

      return res
        .send({
          user,
          token: token.generate({ id: user.id })
        })
    } catch (err) {
      return res
        .status(400)
        .send({ error: `Registration Failed ${err}` })
    }
  }

  public async authenticate (req:Request, res:Response):Promise<Response> {
    const { email, password } = req.body

    try {
      const user = await User.findOne({ email }).select('+password')

      if (!user) {
        return res
          .status(400)
          .send({ error: 'User not exists' })
      }

      if (!await bcrypt.compare(password, user.password)) {
        return res
          .status(400)
          .send({ error: 'Invalid Password' })
      }

      user.password = undefined

      return res
        .send({
          user,
          token: token.generate({ id: user.id })
        })
    } catch (err) {
      res.send({ error: `${err}` })
    }
  }
}

export default new AuthController()
