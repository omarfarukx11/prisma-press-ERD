import { error } from "node:console";
import config from "../../config";
import { prisma } from "../../lib/prisma";
import { jwtUtilis } from "../../utility/jwt";
import { ILoginUser } from "./auth.interface"
import bcrypt from "bcrypt"
import jwt, { JwtPayload, SignOptions } from "jsonwebtoken"

const loginUserIntoDB =  async(payload : ILoginUser) => {
  const {email , password} = payload;
  const user = await prisma.user.findUniqueOrThrow({
    where : {email}
  })
  const isPasswordMatch = await bcrypt.compare(password , user.password)
  if(!isPasswordMatch) {
    throw new Error("Password is inccorect")
  }

  const jwtPayload  = {
    id : user.id,
    name : user.name,
    email : user.email,
    role : user.role,
  }

  const accessToken = jwtUtilis.createToken( jwtPayload, config.jwt_access_secret , config.jwt_access_expires_in as SignOptions)
  const refreshToken = jwtUtilis.createToken(jwtPayload , config.jwt_refresh_secret , config.jwt_refresh_expires_in as SignOptions)

  return {accessToken , refreshToken , };

}

const refreshToken = async (refreshToken : string) => {
  const verifiedRefreshToken = jwtUtilis.verifyToken(refreshToken , config.jwt_refresh_secret)
  if(!verifiedRefreshToken.success) {
    throw new Error(verifiedRefreshToken.error)
  }

  const {id} = verifiedRefreshToken.data as JwtPayload;
  const user = await prisma.user.findUniqueOrThrow({
    where : {id}
  })

  if(user.activeStatus === "BLOCKED") {
    throw new Error("User is Blocked")
  }

  const jwtPayload = {
    id ,
    name : user.name,
    email : user.email,
    role : user.role
  }

  const accessToken = jwtUtilis.createToken(jwtPayload , config.jwt_access_secret , config.jwt_access_expires_in as SignOptions)
  return {accessToken}
}

export const authService = {loginUserIntoDB , refreshToken}