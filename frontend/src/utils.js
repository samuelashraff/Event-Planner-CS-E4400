import { isSameDay } from "date-fns"
import { getDoc } from "firebase/firestore"


// Helper functions for filtering the data for each Venue Component in <Venues />

export function groupVenuesByLabel(venues) {
    const groupedVenues = {}
    venues.forEach((venue) => {
        venue.labels.forEach((label) => {
            if (!groupedVenues[label]) {
                groupedVenues[label] = []
            }
            groupedVenues[label].push(venue)
        })
    })
    return groupedVenues
}

export async function filterVenuesByDateAndGroupByLabel(eventDate, venueArray) {
    const filteredVenues = venueArray.filter(async (venue) => {
        for (const eventRef of venue.booked_events) {
            const eventDoc = await getDoc(eventRef)

            // Get date field from eventDoc and set its format to 'YYYY-MM-DD'
            const dateOfEvent = new Date(eventDoc.data().date.toDate().toISOString().split('T')[0])
            // Get date user inputed in the start of the form and set its format to 'YYYY-MM-DD'
            const dateUserInputed = new Date(new Date(eventDate).toISOString().split('T')[0])

            // Compare date field to event date set by user. If same, then this particular venue is booked for that day
            // and we don't wish to show that venue here
            if (isSameDay(dateOfEvent, dateUserInputed)) {
                return false    // Venue booked for selected day
            }
        }
        return true // Venue is available for the selected day
    })
    return filteredVenues
}

