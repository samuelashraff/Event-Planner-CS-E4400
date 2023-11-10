import "../../styles/VenueList.css"
import { collection, getDoc, getDocs, limit, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../../firebase";
import { VenueCards } from "./VenueCards";

export function AfterworkVenues({ labels, eventDate }) {
    const [venues, setVenues] = useState({})

    // Helper functions

    // Fetches the venues filtering by the labels given by the sub tag.
    const fetchVenuesAndFilterByLabel = async () => {
        const venuesRef = collection(db, "venues")
        const venuesQuery = query(venuesRef, where("labels", "array-contains-any", labels), limit(8))
        const venuesSnapShot = await getDocs(venuesQuery)
        const venuesData = venuesSnapShot.docs.map((doc) => doc.data())

        filterVenuesByDate(venuesData)
    }

    // Filter fetched and already filtered venues further by date
    const filterVenuesByDate = async (venueArray) => {
        const filteredVenues = venueArray.filter(async (venue) => {
            for (const eventRef of venue.booked_events) {
                const eventDoc = await getDoc(eventRef)

                // Get date field from eventDoc and set its format to 'YYYY-MM-DD'
                const dateOfEvent = new Date(eventDoc.data().date.toDate().toISOString().split('T')[0])
                // Get date user inputed in the start of the form and set its format to 'YYYY-MM-DD'
                const dateUserInputed = new Date(new Date(eventDate).toISOString().split('T')[0])

                // Compare date field to event date set by user. If same, then this particular venue is booked for that day
                // and we don't wish to show that venue here
                if (dateOfEvent === dateUserInputed) {
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
        fetchVenuesAndFilterByLabel()
    }, [venues])

    // TODO for next time:
    // 1. Add filtering by date as well
    // 2. Add the images for each venue, figure out how they should be retrieved. Should be in /assets.
    // 3. Ask about the text above the venue lists.

    return (
        <>
            <div className="venues">
                <h3>Venues</h3>
                <VenueCards labels={labels} venues={venues} />
            </div>
        </>
    )
}