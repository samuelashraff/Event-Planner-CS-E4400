import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from './components/NavBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './styles/App.css'
import Button from '@mui/material/Button'
import { EventList } from './components/EventList';


function App() {

  const [user] = useAuthState(auth)


  if (!user) {
    return (
      <>
        <div className="load-page">
          <h1>You are not currently logged in.</h1>
          <Button href="/signIn" variant="contained">Login</Button>
        </div>
      </>
    )
  }


  return (
    <div className="app">
      <Header />
      <Navbar />
      <EventList/> 
      <Footer />
    </div>
  )
}

export default App;
