import React, { useEffect, useState } from "react"
import { useAuthState } from "react-firebase-hooks/auth"
import { Link, Navigate } from "react-router-dom"
import {
  auth,
  registerWithEmailAndPassword,
} from "./firebase"
import "./styles/Register.css"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material"
import Button from "@mui/material/Button"
import { TitleComponent } from "./components/TitleComponent"


export function Register() {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [name, setName] = useState("")
  const [accountType, setAccountType] = useState("")
  const [companyName, setCompanyName] = useState("")
  const [user, loading] = useAuthState(auth)

  const register = () => {
    if (!name) alert("Please enter name")
    if (!email) alert("Please enter email")
    if (!password) alert("Please enter password")
    if (!accountType) alert("Please choose an account type")

    registerWithEmailAndPassword(name, email, password, accountType, companyName)
  }

  const handleAccountType = (event) => {
    setAccountType(event.target.value)
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

  const customButtonStyles = {
    root: {
      color: 'white',      // Set text color to white
      backgroundColor: '#1976d2', // Set background color to white
      '&:hover': {
        backgroundColor: 'white', // Set background color on hover to white
      },
    },
    label: {
      color: 'black',      // Set text color to black
    },
  }

  const customStyles = {
    formControl: {
      color: 'white', // Set text color to white
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'white !important', // Set border color to white
      },
    },
    inputLabel: {
      color: 'white', // Set label color to white
    },
    select: {
      '&:before': {
        borderColor: 'white', // Set border color before selecting
      },
      '&:after': {
        borderColor: 'white', // Set border color after selecting
      },
      color: 'white', // Set selected option color to white
    },
    icon: {
      fill: 'white', // Set icon color to white
    },
  }

  if (user) {
    return (
      <div className="register">
        <TitleComponent />
        <h2 style={{color: "white"}}>You are now logged in, go to dashboard</h2>
        <Button variant="contained" href="/">Go To Dashboard</Button>
      </div>
    )
  }


  return (
    <div className="register">
      <TitleComponent />
      {/* <p style={{ color: "white", alignSelf: "center", marginRight: "22%" }}>HR's best friend</p> */}
      <div className="register-page">
        <h1 style={{ marginBottom: "10%" }}>Create account</h1>
        <Stack spacing={2}>
          <TextField
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Full Name"
            sx={customInputStyles.root}
          />
          <TextField
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="E-mail Address"
            sx={customInputStyles.root}
          />
          <TextField
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            sx={customInputStyles.root}
          />
          <FormControl sx={customStyles.formControl}>
            <InputLabel sx={customStyles.inputLabel}>
              Account Type
            </InputLabel>
            <Select
              value={accountType}
              onChange={handleAccountType}
              label="Account Type"
              sx={customStyles.select}
            >
              <MenuItem value={"Company"}>Company</MenuItem>
              <MenuItem value={"Non-profit organization"}>Non-profit organization</MenuItem>
              <MenuItem value={"Friend group"}>Friend group</MenuItem>
            </Select>
          </FormControl>
          <TextField
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Company Name"
            sx={customInputStyles.root}
          />
          <Button onClick={register} sx={customButtonStyles.root}>
            Register
          </Button>
          <h4 style={{ alignSelf: "center" }}>Already have an account?</h4>
          <Button href="/" sx={customButtonStyles.root}>Login</Button>
        </Stack>
      </div>
    </div>
  )
}