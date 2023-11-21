import { logOut, auth, db } from '../firebase'
import '../styles/NavBar.css'
import { collection, query, getDocs, where, doc, limit } from 'firebase/firestore'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { CreateEventModal } from './CreateEventModal'

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
            <h2 style={{ color: "black" }}><a href="/">Overview page</a></h2>
          </div>
          {events && events.length > 0 && (
            <div className="event-tabs">
              {events.map((event, index) => {
                return <div className="create-event-box" key={index}>
                  <h2>{event.name}</h2>
                </div>
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
            <CreateEventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} setEvents={setEvents}/>
          </div>
        </div>
        <div className="nav-elements-right">
          <Button
            variant="contained"
            onClick={logOut}>
            Sign Out
          </Button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar