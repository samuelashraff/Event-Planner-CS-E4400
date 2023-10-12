import { auth, logInWithEmailAndPassword, logOut } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from './NavBar'
import '../styles/Login.css'
import { signInWithEmailAndPassword } from 'firebase/auth'

export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)

    return (
        <div>
            <Navbar />
            <div className="login-page">
                <h1>Login Page</h1>
                <div className="login-element">
                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="login-element">
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button onClick={() => logInWithEmailAndPassword(email, password)}>Sign in</button>
                <div>
                    Don't have an account yet? <Link to="/register">Register</Link>
                </div>
            </div>
        </div>
    )
}