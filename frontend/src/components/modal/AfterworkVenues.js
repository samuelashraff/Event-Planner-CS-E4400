import "../../styles/VenueList.css"
import { Card, CardContent } from "@mui/material";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";

export function AfterworkVenues({ labels, eventDate }) {
    const [venues, setVenues] = useState({})

    // Helper functions

    // Fetches the venues filtering by the labels given by the sub tag.
    const fetchVenuesAndFilterByLabel = async (labels) => {
        const venuesRef = collection(db, "venues")
        const venuesQuery = query(venuesRef, where("labels", "array-contains-any", labels))
        const venuesSnapShot = await getDocs(venuesQuery)
        const venuesData = venuesSnapShot.docs.map((doc) => doc.data())
        console.log(venuesData)

        filterVenuesByDate(venuesData)
    }

    // Filter fetched and already filtered venues further by date
    const filterVenuesByDate = async (venueArray) => {
        const filteredVenues = venueArray.filter(async (venue) => {
            for (const eventRef of venue.booked_events) {
                const eventDoc = await getDoc(eventRef)

                // Get date field from eventDoc and set its format to 'YYYY-MM-DD'
                const dateOfEvent = eventDoc.data().date.toDate().toISOString().split('T')[0]

                // Compare date field to event date set by user. If same, then this particular venue is booked for that day.
                if (dateOfEvent === new Date(eventDate).toISOString().split('T')[0]) {
                    return false    // Venue booked for selected day
                }
            }
            return true // Venue is available for the selected day
        })

        groupVenuesByLabel(filteredVenues)
    }

    const groupVenuesByLabel = (venues) => {
        const groupedVenues = {}
        venues.forEach((venue) => {
            venue.labels.forEach((label) => {
                if (!groupedVenues[label]) {
                    groupedVenues[label] = []
                }
                groupedVenues[label].push(venue)
            })
        })
        setVenues(groupedVenues)
    }

    useEffect(() => {
        fetchVenuesAndFilterByLabel(labels)
    }, [])

    // TODO for next time:
    // 1. Add filtering by date as well
    // 2. Add the images for each venue, figure out how they should be retrieved. Should be in /assets.
    // 3. Ask about the text above the venue lists.

    return (
        <>
            <div className="venues">
                <h3>Venues</h3>
                {labels.map((label) => (
                    <div className="card-list" key={label}>
                        <p>{label}</p>
                        {venues[label]?.map((venue) => (
                            <div className="card-box">
                                <Card className="card" key={venue.id}>
                                    <CardContent>
                                        {venue.name}
                                    </CardContent>
                                </Card>
                                <div className="card-location">
                                    {venue.location}
                                </div>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </>
    )
}