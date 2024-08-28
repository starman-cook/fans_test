import { EStatuses } from "../enums/EStatuses";
import { generateJWT } from "../helpers/generateJWT";
import IResponse from "../interfaces/IResponse";
import IUserGetDto from "../interfaces/IUserGetDto";
import IUserLoginDto from "../interfaces/IUserLoginDto";
import { User } from "../models/User";
import bcrypt from "bcrypt";

export class UserService {
  public getUsers = async (): Promise<IResponse<User[] | null>> => {
    try {
      const data = await User.findAll();
      return {
        status: EStatuses.OK,
        result: data,
        message: "Users found",
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        status: EStatuses.NOT_OK,
        result: null,
        message: error.message,
      };
    }
  };

  public getUserById = async (id: string): Promise<IResponse<User | null>> => {
    try {
      const data: User | null = await User.findByPk(id);
      if (!data) {
        throw new Error('User not found')
      }
      delete data.dataValues.password

      return {
        status: EStatuses.OK,
        result: data,
        message: "User found",
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        status: EStatuses.NOT_OK,
        result: null,
        message: error.message,
      };
    }
  };

  public addUser = async (
    user: User
  ): Promise<IResponse<IUserGetDto | null>> => {
    try {
      const salt = await bcrypt.genSalt(
        parseInt(process.env.BCRYPT_SALT || "") || 10
      );
      const hash = await bcrypt.hash(user.password, salt);
      user.password = hash;

      const data: User = await User.create({ ...user });
      delete data.dataValues.password
      
      return {
        status: EStatuses.OK,
        result: Object.assign({
          token: generateJWT({...data.dataValues}, "2h"),
        }, data.dataValues),
        message: "User was created",
      };
    } catch (err: unknown) {
      const error = err as Error;
      return {
        status: EStatuses.NOT_OK,
        result: null,
        message: error.message,
      };
    }
  };

  public loginUser = async (
    user: IUserLoginDto
  ): Promise<IResponse<IUserGetDto | null>> => {
    try {
      const userFound = await User.findOne({ where: { email: user.email } });
      if (!userFound) {
        return {
          status: EStatuses.NOT_OK,
          result: null,
          message: "Not found",
        };
      }
      const isMatch: boolean = await bcrypt.compare(
        user.password, userFound.password
      );

      if (!isMatch) {
        return {
          status: EStatuses.NOT_OK,
          result: null,
          message: "Access denied",
        };
      }
      delete userFound.dataValues.password
      return {
        status: EStatuses.OK,
        result: Object.assign({
          token: generateJWT(userFound.dataValues, "2h"),
        }, {...userFound.dataValues}),
        message: "Access granted",
      };
    } catch (err: unknown) {
      return {
        status: EStatuses.NOT_OK,
        result: null,
        message: "Server Error",
      };
    }
  };
}

export const userService = new UserService();
