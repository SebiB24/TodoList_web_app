import './LoginForm.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import ApiService from '../api/ApiService'
import { User } from '../models/User'

function LoginForm({ onloginSuccess }) {

    const navigate = useNavigate()

    const[errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()
        setErrorMsg('')

        const formData = new FormData(event.target)

        const loginData = {
            email: formData.get('email'),
            password: formData.get('password')
        }

        try{
            const response = await ApiService.login(loginData)
            const responseUserData = response.user
            const userData = new User(
                responseUserData.name, 
                responseUserData.email, 
                responseUserData.userType, 
                responseUserData.score
            )
            localStorage.setItem('userData', JSON.stringify(userData))
            onloginSuccess(userData)
            navigate('/home')

        }catch(error){
            console.error('Login error:', error)
            setErrorMsg('Invalid email or password.')
        }

    }

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>Login</h2>
                    <p>Please enter your details to sign in.</p>
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="name@example.com" required></input>
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required></input>
                </div>

                <button type="submit" className="login-button">Sign In</button>

                <p className="signup-prompt">
                    Don't have an account? <Link to='/register'>Sign up</Link>
                </p>
            </form>
        </div>
    )
}

export default LoginForm