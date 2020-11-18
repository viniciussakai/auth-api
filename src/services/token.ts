import authConfig from '../config/auth.json'
import jwt from 'jsonwebtoken'

class Token {
  public generate (params = {}):string {
    return jwt.sign(params, authConfig.JWT_SECRET, {
      expiresIn: 84100
    })
  }
}
export default new Token()
