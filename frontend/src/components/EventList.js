import { Stack } from '@mui/material'
import { Link } from 'react-router-dom'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { ListItem } from './ListItem'
import { auth, db } from '../firebase'
import { addDoc, collection, doc, where, query } from 'firebase/firestore'
import { useCollectionData, useCollection } from 'react-firebase-hooks/firestore'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'






export function EventList() {

    const [eventName, setEventName] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [user] = useAuthState(auth)

    const currentUserRef = doc(db, 'users', auth.currentUser.uid)
    const eventsQuery = query(collection(db, 'events'), where("userRef", "==", currentUserRef))
    const [events] = useCollectionData(eventsQuery)
    


    const addEvent = async (e) => {
        e.preventDefault()
        try {
            const userRef = doc(db, 'users', user.uid)
            const docRef = await addDoc(collection(db, "events"), {
                name: eventName,
                location: eventLocation,
                userRef: userRef
            })
            console.log("Document written with ID: ", docRef.id)
            setEventName("")
            setEventLocation("")
        }
        catch (e) {
            console.error("Error adding document: ", e)
        }
    }

    const ListOfEvents = () => {
        return (
            <ul>
                {events && events.map((event) => {
                    return <ListItem event={event} />
                })}
            </ul>
        )
    }


    return (
        <div className="main-page">
            <h1>Hello world</h1>
            <div className="add-event-form">
                <Stack direction="row" spacing={2}>
                    <TextField
                        type="text"
                        placeholder="Event name"
                        onChange={(e) => setEventName(e.target.value)} />
                    <TextField
                        type="text"
                        placeholder="Event location"
                        onChange={(e) => setEventLocation(e.target.value)}
                    />
                    <Button
                        type="submit"
                        classname="add-event-button"
                        variant="contained"
                        onClick={addEvent}>
                        Submit
                    </Button>
                </Stack>
            </div>
            <h2>Events:</h2>
            <ListOfEvents />
        </div>
    )
}