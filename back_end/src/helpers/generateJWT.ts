import jwt from 'jsonwebtoken'
import { User } from '../models/User'

export const generateJWT = (payload: User, lifeTime: string | number) => {
    return jwt.sign(payload, process.env.SECRET_KEY || '', {expiresIn: lifeTime})
}