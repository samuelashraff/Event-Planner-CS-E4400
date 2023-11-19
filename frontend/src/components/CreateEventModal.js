import { Box, Button, Modal, Stack } from "@mui/material";
import "../styles/CreateEventModal.css"
import { addDoc, collection, doc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { modalStyle } from "../styles/styles";
import { useEffect, useState } from "react";
import { Venues } from "./modal/Venues";
import { useAuthState } from "react-firebase-hooks/auth";

export function CreateEventModal({ isModalOpen, setIsModalOpen }) {
    const [user] = useAuthState(auth)

    // Hooks
    const [eventDate, setEventDate] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [eventName, setEventName] = useState("")
    const [mainTags, setMainTags] = useState([])
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
        const venuesData = venuesSnapShot.docs.map((doc) => doc.data())

        setVenues(venuesData)
    }

    // useEffect(() => {
    //     console.log("Selected venues ID:", selectedVenues)
    // }, [selectedVenues])

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
            setEventDate("")
            setEventLocation("")
            setEventName("")
            setSelectedMainTag("")
            setMainTags(null)
            setSelectedVenues([])
            setVenues([])
            setIsModalOpen(false)
        } catch (e) {
            console.error("Error adding event to db")
        }
    }


    useEffect(() => {
        const fetchMainTags = async () => {
            const mainTagsQuery = query(collection(db, "main_tags"))
            const mainTagsSnapShot = await getDocs(mainTagsQuery)
            const mainTagsData = mainTagsSnapShot.docs.map((doc) => doc.data())
            setMainTags(mainTagsData)
        }
        fetchMainTags()
    }, [])



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
                            {mainTags.map((tag) => {
                                return (
                                    <button
                                        className={`tag-element ${selectedMainTag === tag ? 'selected' : ''}`}
                                        key={tag.id}
                                        onClick={() => {
                                            setSelectedMainTag(tag);
                                        }}
                                    >
                                        {tag.name}
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
                        <p style={{marginLeft: "2%"}}>Or try again later</p>
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
