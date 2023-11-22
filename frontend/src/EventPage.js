import React, { useEffect, useState } from 'react';
import { Button, Card, CardContent } from '@mui/material';
import { collection, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from './firebase';
import { Navigate, redirect, useParams } from 'react-router-dom';
import "./styles/EventPage.css"
import Navbar from './components/NavBar';

function EditEventDetails({ setIsEditMode, editedEvent, setEditedEvent, handleUpdate }) {

    const handleInputChange = (field, value) => {
        // Update the editedEvent state with the new value
        setEditedEvent((prev) => ({ ...prev, [field]: value }));
      }

    return (
        <div className="event-details">
            <div className="edit-details-element">
                <p>Name</p>
                <input type="text" className="event-row-input" value={editedEvent.name} onChange={(e) => handleInputChange('name', e.target.value)} />
            </div>
            <div className="edit-details-element">
                <p>Date</p>
                <input type="date" className="event-row-input" value={editedEvent.date} onChange={(e) => handleInputChange('date', e.target.value)} />
            </div>
            <div className="edit-details-element">
                <p>Location</p>
                <input type="text" className="event-row-input" value={editedEvent.location} onChange={(e) => handleInputChange('location', e.target.value)} />
            </div>
            <div className="edit-details-button-list">
                <button className="edit-details-button" onClick={() => setIsEditMode(false)}>Cancel</button>
                <button className="edit-details-button" onClick={handleUpdate}>Save</button>
            </div>
        </div>
    )
}




export function EventPage() {
    const { id } = useParams()
    const [isEditMode, setIsEditMode] = useState(false)
    const [event, setEvent] = useState(null)
    const [venues, setVenues] = useState([])
    const [isDeleted, setIsDeleted] = useState(false)

    const [editedEvent, setEditedEvent] = useState({
        name: '',
        date: '',
        location: '',
    })

    const handleEdit = () => {
        setIsEditMode(true)
        setEditedEvent({
            name: event.name,
            date: event.date,
            location: event.location
        })
    }

    const updateEventDetails = async () => {
        try {
            // Perform the update in Firestore
            await updateDoc(doc(db, 'events', id), {
                name: editedEvent.name,
                date: editedEvent.date,
                location: editedEvent.location,
            });

            // Update the local state with the edited values
            setEvent(editedEvent);

            // Exit edit mode
            setIsEditMode(false);
        } catch (error) {
            console.error('Error updating event:', error);
        }
    }

    const handleDelete = async () => {
        try {
            await deleteDoc(doc(db, 'events', id))
            setIsDeleted(true)
        } catch (error) {
            console.error('Error deleting event:', error)
        }
    }


    useEffect(() => {
        const fetchEvent = async () => {
            const eventDoc = await getDoc(doc(db, 'events', id))
            setEvent({ id: eventDoc.id, ...eventDoc.data() })

            // Fetch venues from booked_venues field
            const venuesData = await Promise.all(
                eventDoc.data().booked_venues.map(async (venueRef) => {
                    const venueDoc = await getDoc(venueRef)
                    return venueDoc.exists() ? { id: venueDoc.id, ...venueDoc.data() } : null
                })
            )


            setVenues(venuesData.filter((venue) => venue !== null))
        };

        fetchEvent()
    }, [])


    if (!event) {
        return <div className="loading">Loading...</div>
    }

    if (isDeleted) {
        return <Navigate to="/" />
    }


    return (
        <>
            <Navbar />
            <div className="event-page">
                {isEditMode ? (
                    <EditEventDetails
                        setIsEditMode={setIsEditMode}
                        editedEvent={editedEvent}
                        setEditedEvent={setEditedEvent}
                        handleUpdate={updateEventDetails} />
                ) : (
                    <>
                        <div className="event-details">
                            <div className="event-row-element">
                                <h3>Event Name:</h3>
                                <p>{event.name}</p>
                            </div>
                            <div className="event-row-element">
                                <h3>Event Date:</h3>
                                <p>{event.date}</p>
                            </div>
                            <div className="event-row-element">
                                <h3>Event Location:</h3>
                                <p>{event.location}</p>
                            </div>
                        </div>
                        <button className="edit-details-button" onClick={handleEdit}>Edit Event Details</button>
                    </>
                )}
                <h2>Booked Venues</h2>
                <div className="event-venue-list">
                    <div className="event-card-list">
                        {venues.map((venue, index) => (
                            <div className="event-card-box" key={index}>
                                <p className="event-venue-type">{venue.type}</p>
                                <Card className="event-venue-card" key={`card-${index}`}>
                                    <CardContent className="event-venue-card-content">{venue.name}</CardContent>
                                </Card>
                                <div className="event-venue-card-location" key={`${venue.location}-${index}`}>
                                    {venue.location}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="submit-form">
                    <button className="delete-event-button" onClick={handleDelete}>
                        Delete Event
                    </button>
                </div>
            </div>
        </>
    )
}
