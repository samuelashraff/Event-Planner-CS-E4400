import logo from './logo.svg';
import './App.css';

import { collection, getDocs } from 'firebase/firestore';
import {db} from './firebase'

import { useEffect, useState } from 'react';

function App() {

  const [events, setEvents] = useState([])

  const fetchEvents = async () => {
       
    await getDocs(collection(db, "events"))
        .then((querySnapshot)=>{               
            const newData = querySnapshot.docs
                .map((doc) => ({...doc.data(), id:doc.id }));
            setEvents(newData);                
            console.log(events, newData);
        })
   
}

  useEffect(() => {
    fetchEvents()
  }, [])


  return (
    <div className="App">
      <h1>Hello world</h1>
      <h2>Events:</h2>
      <ul>
        {events.map((event) => {
          return <li>Name: {event.name}, ID: {event.id}, location: {event.location}</li>
        })}
      </ul>
    </div>
  );
}

export default App;
