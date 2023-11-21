import { Box, Modal, Stack } from "@mui/material";
import React from 'react'
import "../styles/CreateEventModal.css"
import { addDoc, arrayUnion, collection, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { modalStyle } from "../styles/styles";
import { useState } from "react";
import { Venues } from "./modal/Venues";
import { useAuthState } from "react-firebase-hooks/auth";

export function CreateEventModal({ isModalOpen, setIsModalOpen, setEvents }) {
    const [user] = useAuthState(auth)

    // Hardcoding these tags here instead of the database in order to reduce the number of requests made
    // in order to not exceed firestore's daily quota :)
    const mainTagsList = ["Afterwork", "Team day", "Education", "Knowledge sharing"]

    // Hooks
    const [eventDate, setEventDate] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventName, setEventName] = useState("")
    const [selectedMainTag, setSelectedMainTag] = useState(null)
    const [selectedVenues, setSelectedVenues] = useState([])
    const [venues, setVenues] = useState([])

    // Helper functions
    const handleVenueSelection = (venue) => {
        if (!selectedVenues.some(v => v.name === venue.name)) {
            setSelectedVenues([...selectedVenues, venue]);
        } else {
            setSelectedVenues(selectedVenues.filter(v => v.name !== venue.name));
        }
    }

    // Fetches the venues filtering by the labels given by the sub tag.
    const fetchVenuesAndFilterByLabel = async (tagName) => {
        const venuesRef = collection(db, "venues")
        const venuesQuery = query(venuesRef, where("filter_label", "==", tagName))
        const venuesSnapShot = await getDocs(venuesQuery)
        const venuesData = venuesSnapShot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data()
        }))

        setVenues(venuesData)
    }

    // Add event and close modal
    const onEventSubmit = async (e) => {
        e.preventDefault()
        try {
            const userRef = doc(db, 'users', user.uid)
            const docRef = await addDoc(collection(db, "events"), {
                name: eventName,
                date: eventDate,
                location: eventLocation,
                booked_venues: selectedVenues,
                userRef: userRef
            })
            console.log("Event doc written with ID: " + docRef.id)

            // Get the reference of the newly created event
            const eventRef = doc(db, 'events', docRef.id)

            // Update each selected venue to include the new event in its booked_events array
            // NOTE! We might not have time to implement this fully so might delete later
            await Promise.all(selectedVenues.map(async (venue) => {
                await updateDoc(doc(db, 'venues', venue.id), {
                    booked_events: arrayUnion(eventRef)
                })
            }))

            // Update the events in the NavBar immediately
            setEvents((prevEvents) => [
                ...prevEvents,
                {
                  id: docRef.id,
                  name: eventName,
                  date: eventDate,
                  location: eventLocation,
                  booked_venues: selectedVenues,
                  userRef: userRef,
                },
              ])


            setEventDate("")
            setEventLocation("")
            setEventName("")
            setSelectedMainTag("")
            setSelectedVenues([])
            setVenues([])
            setIsModalOpen(false)
        } catch (e) {
            console.error("Error adding event to db: " + e)
        }
    }



    return (
        <Modal
            open={isModalOpen}
            sx={modalStyle}
        >
            <Box p={4} className="modal-content">
                <Box>
                    <Stack style={{ flexDirection: "row" }}>
                        <div className="first-row-element">
                            <h3>Choose time</h3>
                            <input
                                type="date"
                                variant="outlined"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="first-row-input" />
                        </div>
                        <div className="first-row-element">
                            <h3>Location</h3>
                            <input
                                type="text"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                className="first-row-input" />
                        </div>
                        <div className="first-row-element">
                            <h3>Name of event</h3>
                            <input
                                type="text"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                                className="first-row-input" />
                        </div>
                    </Stack>
                </Box>
                {eventDate && eventLocation && eventName && (
                    <Box className="tag-box">
                        <h3>Theme of the event</h3>
                        <div className="tag-list">
                            {mainTagsList.map((tag, index) => {
                                return (
                                    <button
                                        className={`tag-element ${selectedMainTag === tag ? 'selected' : ''}`}
                                        key={index}
                                        onClick={() => {
                                            setSelectedMainTag(tag);
                                        }}
                                    >
                                        {tag}
                                    </button>
                                )
                            })}
                        </div>
                    </Box>
                )}
                {eventDate && eventLocation && eventName && selectedMainTag && (
                    <Box className="venue-list">
                        <Venues
                            mainTag={selectedMainTag}
                            onVenueSelect={handleVenueSelection}
                            selectedVenues={selectedVenues}
                            onFetchVenues={fetchVenuesAndFilterByLabel}
                            venues={venues}
                        />
                    </Box>
                )}
                {selectedVenues.length >= 1 ? (
                    <div className="submit-form">
                        <p>TODO: Add event to group dropdown</p>
                        <button className="close-modal-button" onClick={onEventSubmit}>Book Event</button>
                        <p style={{ marginLeft: "2%" }}>Or try again later</p>
                        <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>Close window</button>
                    </div>
                ) : (
                    <div className="submit-form">
                        <p>Select 1 or more venues before continuing</p>
                        <button className="close-modal-button" onClick={() => setIsModalOpen(false)}>Close</button>
                    </div>
                )}
            </Box>
        </Modal>
    )
}
