import './LoginForm.css'
import { Link } from 'react-router-dom'

function LoginForm() {
    const handleSubmit = async (e) => {
        e.preventDefault()

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