import { Link } from 'react-router-dom'
import './RegisterForm.css'
import ApiService from '../api/apiService'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

function RegisterForm() {

    const navigate = useNavigate()

    const[errorMsg, setErrorMsg] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()
        setErrorMsg('')
        
        const formData = new FormData(e.target)
        const userData = {
            name: formData.get('name'),
            email: formData.get('email'),
            password: formData.get('password')
        }
        try {
            await ApiService.register(userData)
            navigate('/login')

        } catch (error) {
            console.error('Registration error:', error)
            setErrorMsg('Registration failed. Please try again.')
        }
    }

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <div className="form-header">
                    <h2>Create an Account</h2>
                    <p>Please fill in your details.</p>
                </div>

                <div className="input-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" id="name" name="name" placeholder="John Doe" required />
                </div>

                <div className="input-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="name@example.com" required />
                </div>

                <div className="input-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password" placeholder="••••••••" required />
                </div>

                <button type="submit" className="submit-button">Sign Up</button>

                <p className="login-prompt">
                    Already have an account? <Link to="/login">Log in</Link>
                </p>
            </form>
        </div>
    )
}

export default RegisterForm