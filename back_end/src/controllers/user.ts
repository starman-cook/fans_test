import { userService, UserService } from "../services/user"
import express, {Request, Response, Router} from 'express'
import IResponse from "../interfaces/IResponse"
import { EStatuses } from "../enums/EStatuses"
import IUserGetDto from "../interfaces/IUserGetDto"
import { auth } from "../middlewares/auth"
import IRequestWithTokenData from "../interfaces/IRequestWithTokenData"
import { User } from "../models/User"



export class UserController {
    private service: UserService
    private router: Router
    constructor() {
        this.service = userService
        this.router = express.Router()
        this.router.get('/', this.getUsers)
        this.router.post('/', this.createUser)
        this.router.post('/login', this.login)
        this.router.get('/token', auth, this.checkToken)
        this.router.get('/:id', this.getUserById)
    }
    public getRouter = (): Router => {
        return this.router
    }
    private createUser = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | null> = await this.service.addUser(req.body)
        res.status(200).send(response)
    }

    public login = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<IUserGetDto | null> = await this.service.loginUser(req.body)
        res.status(200).send(response)
    }

    public getUsers = async (req: Request, res: Response): Promise<void> => {
        const response: IResponse<User[] | null> = await this.service.getUsers()
        res.status(200).send(response)
    }

    private getUserById = async (req: Request, res: Response): Promise<void> => {
        const response = await this.service.getUserById(req.params.id)
        res.send(response)
    }

    public checkToken = async (expressReq: Request, res: Response): Promise<void> => {   
        const req = expressReq as IRequestWithTokenData
        const response: IResponse<IUserGetDto | undefined> = {
            status: EStatuses.NOT_OK,
            result: req.dataFromToken as IUserGetDto,
            message: 'Token is ok'
        }
        res.status(200).send(response)
    }
}

export const userController = new UserController()