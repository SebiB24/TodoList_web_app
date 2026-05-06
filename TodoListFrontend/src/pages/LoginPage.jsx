import LoginForm from '../components/LoginForm'

function LoginPage({ onloginSuccess }) {
    return (
        <div className="LoginPage">
            <LoginForm onloginSuccess={onloginSuccess} />
        </div>
    )
}

export default LoginPage

