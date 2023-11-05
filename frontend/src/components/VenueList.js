import { Card } from "@mui/material";
import { collection, getDoc, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import "../styles/VenueList.css"

export function VenueList({labels, eventDate }) {

    // Hooks
    const [venues, setVenues] = useState([])


    // Helper functions

    // Fetches the venues filtering by the labels given by the sub tag.
    const fetchVenuesAndFilterByLabel = async (labels) => {
        const venuesRef = collection(db, "venues")

        const venuesQuery = query(venuesRef, where("labels", "array-contains-any", labels))
        const query2 = query(venuesRef)

        const venuesSnapShot = await getDocs(venuesQuery)
        const venuesData = venuesSnapShot.docs.map((doc) => doc.data())
        console.log(venuesData)

        setVenues(venuesData)
        // filterVenuesByDate(venuesData)
    }

    useEffect(() => {
        fetchVenuesAndFilterByLabel(labels)
    }, [])

    const isSameDay = (date1, date2) => {
        return (
            date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate()
        )
    }

    // Filter fetched and already filtered venues further by date
    const filterVenuesByDate = async (venueArray) => {
        const filteredVenues = venueArray.filter( async (venue) => {
            for (const eventRef of venue.booked_events) {
                // Assuming eventRef has a 'date' field of type 'timestamp'
                const eventDoc = await getDoc(eventRef)
                const dateOfEvent = eventDoc.data().date.toDate()

                const bool = isSameDay(dateOfEvent, eventDate)
                console.log(bool)
                if (isSameDay(dateOfEvent, eventDate)) {
                    return false; // Venue is booked for the selected day
                }
            }
            return true; // Venue is available for the selected day
        });

        // Finally set the filtered venues.
        setVenues(filteredVenues);
    }

    // TODO for next time:
    // 1. Add filtering by date as well
    // 2. Add the images for each venue, figure out how they should be retrieved. Should be in /assets.
    // 3. Ask about the text above the venue lists.
    // 4. Separate the venues into two lists if 2 labels present.
    //      - Figure out if venues list has more than one type of label with e.g. 'find'.
    //      - If it has, then probably best implementation is to have a boolean useState that
    //        would allow for conditional rendering, so either one map of the 'venues' array,
    //        or two mappings of the filtered versions of the 'venues' array

    return (
        <div className="card-list">
            {venues.map((venue) => {
                return (
                    <Card className="card">
                        {venue.name}
                    </Card>
                )
            })}
        </div>
    )
}