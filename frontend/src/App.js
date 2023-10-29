import { auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import Navbar from './components/NavBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './styles/App.css'
import { EventList } from './components/EventList';
import { Login } from './Login';
import { DashBoard } from './DashBoard';


function App() {

  const [user] = useAuthState(auth)

  return (
    <div className="app">
      <Header />
      {user ?
        <DashBoard /> :
        <Login />
      }
      <Footer />
    </div>
  )
}

export default App;
