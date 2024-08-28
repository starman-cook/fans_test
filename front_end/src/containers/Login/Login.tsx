import React, { useContext, useEffect, useState } from 'react'
import styles from './Login.module.css'
import {useNavigate} from 'react-router-dom'
import { userApi } from '../../api/userApi'
import IUserLoginDto from '../../interfaces/IUserLoginDto'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { AuthContext } from '../../utils/AuthRoute'
import { Link } from 'react-router-dom'


const Login: React.FunctionComponent = (): React.ReactElement => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [values, setValues] = useState<IUserLoginDto>({
        email: '',
        password: ''
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const loginHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await userApi.login(values)
            if (response?.result) {
                localStorage.setItem('token', response.result.token)
                setUser(response?.result)
            } else {
                setErrorMessage(response.message)
            }
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {
        setErrorMessage('')
        if (user?.id) {
            navigate('/')
        }
    }, [user])


    return (
        <>
            <div>
                <h3>{errorMessage}</h3>
                <form onSubmit={loginHandler} className={styles.Login}>
                    <Input 
                        onChange={inputHandler} 
                        value={values.email} 
                        placeholder='Email' 
                        type="email" 
                        name={'email'} 
                        required={true}
                    />
                    <Input 
                        onChange={inputHandler} 
                        value={values.password} 
                        placeholder='Password' 
                        type="password" 
                        name={'password'} 
                        required
                    />
                    <Button>Sign In</Button>
                </form>
                <Link to={'/register'}>Sign up</Link>
            </div>
        </>
        
    )
}

export default Login