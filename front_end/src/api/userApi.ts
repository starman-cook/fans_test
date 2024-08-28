import { EStatuses } from "../enums/EStatuses";
import IResponse from "../interfaces/IResponse";
import IUserCreateDto from "../interfaces/IUserCreateDto";
import IUserGetDto from "../interfaces/IUserGetDto";
import IUserLoginDto from "../interfaces/IUserLoginDto";
import { instance } from "./instance";


class UserApi {
    public login = async (user: IUserLoginDto): Promise<IResponse<IUserGetDto | null>> => {
        try {
            const response = await instance.post(`/users/login`, user)
            return response.data
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.NOT_OK,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public register = async (user: IUserCreateDto): Promise<IResponse<IUserGetDto | null>> => {
        try {
            const response = await instance.post(`/users`, user)
            return response.data
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.NOT_OK,
                result: null,
                message: error.message
            }
            return response
        }
    }

    public checkToken = async (): Promise<IResponse<IUserGetDto | null>> => {
        try {
            const response = await instance.get(`/users/token`)
            return response.data
        } catch (err: unknown) {
            const error = err as Error
            const response: IResponse<null> = {
                status: EStatuses.NOT_OK,
                result: null,
                message: error.message
            }
            return response
        }
    }
}

export const userApi = new UserApi()