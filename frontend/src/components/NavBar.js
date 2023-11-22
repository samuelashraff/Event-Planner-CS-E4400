import { logOut, auth, db } from '../firebase'
import '../styles/NavBar.css'
import { collection, query, getDocs, where, doc, limit } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { CreateEventModal } from './CreateEventModal'
import { Link } from 'react-router-dom'

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [events, setEvents] = useState([])

  useEffect(() => {

    const fetchEvents = async () => {
      const currentUserRef = doc(db, "users", auth.currentUser.uid)
      const eventsQuery = query(collection(db, "events"), where("userRef", "==", currentUserRef), limit(8))
      const eventsSnapShot = await getDocs(eventsQuery)
      const eventsData = eventsSnapShot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
      setEvents(eventsData)
    }
    fetchEvents()
  }, [])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements-left">
          <div className="overview-box">
            <h2 style={{ color: "black" }}><Link to="/">Dashboard</Link></h2>
          </div>
          {events && events.length > 0 && (
            <div className="event-tabs">
              {events.map((event, index) => {
                return (
                  <div className="create-event-box" key={index}>
                    <h2>
                      <Link to={`/events/${event.id}`}>
                        {event.name}
                      </Link>
                    </h2>
                  </div>
                )
              })}
            </div>
          )}
          <div className="create-event-box">
            <div style={{ marginRight: "10px" }} onClick={() => setIsModalOpen(true)}>
              <h2>Add event</h2>
            </div>
            <div>
              <svg style={{ fontSize: "24px" }} xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 20 20">
                <line x1="12" y1="5" x2="12" y2="19" stroke="black" strokeWidth="2" strokeLinecap="round" />
                <line x1="5" y1="12" x2="19" y2="12" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </div>
            <CreateEventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEvents={setEvents} />
          </div>
        </div>
        <div className="nav-elements-right">
          <button
            className="logout-button"
            onClick={logOut}>
            Sign Out
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar