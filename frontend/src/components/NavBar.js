import { NavLink, Link } from 'react-router-dom'
import { logOut, auth } from '../firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import '../styles/NavBar.css'

function Navbar () {
  const [user, loading, error] = useAuthState(auth)



  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements">
          <ul>
            {user !== null ?
            <li>User: {user.email}</li> : 
            <li>No user signed in</li>}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/signIn">Sign In</Link>
            </li>
            <li>
              <Link onClick={logOut}>Sign Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar