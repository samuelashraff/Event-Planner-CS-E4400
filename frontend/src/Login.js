import { auth, logInWithEmailAndPassword, logOut, signInWithGoogle } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useState } from 'react'
import './styles/Login.css'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Stack } from '@mui/material'
import GoogleIcon from "./assets/Google Icon.png"
import { TitleComponent } from './components/TitleComponent'


export function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [user, loading, error] = useAuthState(auth)

  const loginUser = (email, password) => {
    logInWithEmailAndPassword(email, password)
    setEmail("")
    setPassword("")
  }

  const customInputStyles = {
    root: {
      '& .MuiInputBase-root': {
        color: 'white', // Change the text color to white
      },
      '& .MuiInputLabel-root': {
        color: 'white', // Change the label color to white
      },
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color to white
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color on hover to white
      },
      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white', // Change the outline color when focused to white
      },
    },
  }

  return (
    <div className="login">
      
      <TitleComponent />
      <div className="login-page">
        <h1 style={{marginBottom: "10%" }}>Login</h1>
        <img src={GoogleIcon} onClick={signInWithGoogle} className="google-image" />

        <div className="login-options">
          <hr className="login-separator" />
          <span className="or-text">OR</span>
          <hr className="login-separator" />
        </div>

        <Stack spacing={2}>
          <TextField
            type="text"
            placeholder="Email"
            value={email}
            sx={customInputStyles.root}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            type="password"
            placeholder="Password"
            value={password}
            sx={customInputStyles.root}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={() => loginUser(email, password)}>
            Sign in
          </Button>
          <h2 style={{ alignSelf: "center" }}>New here?</h2>
          <Button
            variant="contained"
            href="/register"
            style={{ marginTop: "10%", marginBottom: "10%" }}>
            Sign up
          </Button>
        </Stack>
      </div>
    </div>
  )
}