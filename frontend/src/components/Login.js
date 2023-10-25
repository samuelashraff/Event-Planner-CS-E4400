import { auth, logInWithEmailAndPassword, logOut } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import Navbar from './NavBar'
import '../styles/Login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Stack, Alert } from '@mui/material'



export function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [user, loading, error] = useAuthState(auth)

    const loginUser = (email, password) => {
        logInWithEmailAndPassword(email, password)
        setEmail("")
        setPassword("")
    }

    return (
        <div>
            <Navbar />
            <div className="login-page">
                <h1>Login Page</h1>
                <Stack spacing={2}>
                    <div className="login-element">
                        <TextField
                            type="text"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="login-element">
                        <TextField
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="contained"
                        onClick={() => loginUser(email, password)}>
                        Sign in
                    </Button>
                    <Button
                        variant="contained"
                        href="/"
                        style={{marginTop: "40%"}}>
                        Register
                    </Button>
                </Stack>
            </div>
        </div>
    )
}