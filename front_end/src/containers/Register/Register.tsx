import React, { useContext, useEffect, useState } from 'react'
import styles from './Register.module.css'
import {useNavigate} from 'react-router-dom'
import { userApi } from '../../api/userApi'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import { AuthContext } from '../../utils/AuthRoute'
import { Link } from 'react-router-dom'
import IUserCreateDto from '../../interfaces/IUserCreateDto'


const Register: React.FunctionComponent = (): React.ReactElement => {
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState<string>('')
    const [values, setValues] = useState<IUserCreateDto>({
        email: '',
        password: '',
        phone: '',
        username: ''
    })
    const inputHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValues(prevState => {
            return {...prevState, [e.target.name]: e.target.value}
        })
    }
    const registerHandler = async (e: React.FormEvent) => {
        e.preventDefault()
        try {
            const response = await userApi.register(values)
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
                <form onSubmit={registerHandler} className={styles.Register}>
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
                        value={values.username} 
                        placeholder='Username' 
                        type="text" 
                        name={'username'} 
                        required={true}
                    />
                    <Input 
                        onChange={inputHandler} 
                        value={values.phone} 
                        placeholder='Phone' 
                        type="text" 
                        name={'phone'} 
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
                    <Button>Sign up</Button>
                </form>
                <Link to={'/login'}>Sign in</Link>
            </div>
        </>
        
    )
}

export default Register