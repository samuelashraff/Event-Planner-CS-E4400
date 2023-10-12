import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { addDoc, collection, getDocs } from 'firebase/firestore'
import { db, auth } from './firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react';
import { ListItem } from './components/ListItem';
import Navbar from './components/NavBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import './styles/App.css'


function App() {

  const [events, setEvents] = useState([])
  const [eventName, setEventName] = useState([])
  const [eventLocation, setEventLocation] = useState([])
  const [user, loading, error] = useAuthState(auth)


  const fetchEvents = async () => {
    await getDocs(collection(db, "events"))
      .then((querySnapshot) => {
        const newData = querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }));
        setEvents(newData);
      })
  }

  const addEvent = async (e) => {
    e.preventDefault()
    try {
      const docRef = await addDoc(collection(db, "events"), {
        name: eventName,
        location: eventLocation
      })
      console.log("Document written with ID: ", docRef.id)
    }
    catch (e) {
      console.error("Error adding document: ", e)
    }
  }

  useEffect(() => {
    fetchEvents()
  }, [events])

  // if (!user) {
  //   return (
  //     <div>
  //       You are not currently logged in!
  //     </div>
  //   )
  // }


  return (
    <div className="app">
      <Header/>
      <Navbar/>
      <div className="main-page">
        <h1>Hello world</h1>
        <div className="add-event-form">
          <form>
            <input
              type="text"
              placeholder="Event name"
              onChange={(e) => setEventName(e.target.value)} />
            <input
              type="text"
              placeholder="Event location"
              onChange={(e) => setEventLocation(e.target.value)}
            />
            <button
              type="submit"
              classname="add-event-button"
              onClick={addEvent}>
              Submit
            </button>
          </form>
        </div>
        <h2>Events:</h2>
        <ul>
          {events.map((event) => {
            return <ListItem name={event.name} id={event.id} location={event.location} />
          })}
        </ul>
      </div>
      <Footer />
    </div>
  )
}

export default App;
