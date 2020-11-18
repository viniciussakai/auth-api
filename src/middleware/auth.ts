import { NextFunction, Request, Response } from 'express'
import jwtConfig from '../config/auth.json'
import jwt from 'jsonwebtoken'

interface DecodeUserId{
    id:number
}

export default (req:Request, res:Response, next:NextFunction):Response => {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res
      .status(401)
      .send({ error: 'No token provided' })
  }

  const parts = authHeader.split(' ')

  if (!(parts.length === 2)) {
    return res
      .status(401)
      .send({ error: 'Token error' })
  }
  const [schema, token] = parts
  if (!(schema === 'Bearer')) {
    return res
      .status(401)
      .send({ error: 'Token malformed' })
  }

  jwt.verify(token, jwtConfig.JWT_SECRET, (err, decoded:DecodeUserId) => {
    if (err) {
      return res
        .status(401)
        .send({ error: 'Token  is Incorrect' })
    }

    req.body.userId = decoded.id

    return next()
  })
}
