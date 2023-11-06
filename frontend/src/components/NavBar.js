import { logOut, auth, db } from '../firebase'
import '../styles/NavBar.css'
import { collection, doc, where, query } from 'firebase/firestore'
import { useCollectionData } from 'react-firebase-hooks/firestore'
import { Button } from '@mui/material'
import { useState } from 'react'
import { CreateEventModal } from './CreateEventModal'

function Navbar() {
  // const [user, loading, error] = useAuthState(auth)
  const [isModalOpen, setIsModalOpen] = useState(false)
  // const [data, setData] = useState([])

  const currentUserRef = doc(db, "users", auth.currentUser.uid)
  console.log(currentUserRef.id)
  const eventsQuery = query(collection(db, "events"), where("userRef", "==", currentUserRef))
  const [events] = useCollectionData(eventsQuery)
  console.log(events)

  // async function fetchEvents() {
  //   await getDocs(collection(db, "events"))
  //     .then((querySnapshot) => {
  //       const newData = querySnapshot.docs
  //         .map((doc) => ({ ...doc.data(), id: doc.id }));
  //       setData(newData);
  //     })
  // }

  // useEffect(() => {
  //   fetchEvents()
  //   // console.log(data)
  // }, [data])

  return (
    <nav className="navbar">
      <div className="container">
        <div className="nav-elements-left">
          <div className="overview-box" href="/">
            <h2 style={{ color: "black" }}>Overview page</h2>
          </div>
          {events && events.length > 0 && (
            <div>
              {events.map((event) => {
                return <div className="create-event-box" key={event.id}>
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
            <CreateEventModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
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