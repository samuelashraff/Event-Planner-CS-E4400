import { useState } from "react";
import "../../styles/VenueList.css"
import { Card, CardContent } from "@mui/material";

// Component in charge of rendering the venues. Called by most of the different venue form components.

export function VenueCards({ labels, venues }) {

    const [selectedVenues, setSelectedVenues] = useState([])

    // Handler function for when a venue is clicked
    // If venue is not in selectedVenues, put it in. Otherwise, remove it.
    function onVenueClicked(venue) {
        if (venue in selectedVenues) {
            setSelectedVenues([...selectedVenues, venue])
        }
        else {
            setSelectedVenues(selectedVenues.filter(v => v !== venue))
        }

    }

    return (
        <>
            {labels.map((label) => (
                <>
                    <p className="venue-label">{label}</p>
                    <div className="card-list" key={label}>
                        {venues[label]?.map((venue) => (
                            <div
                                className="card-box"

                                key={venue.id}
                            >
                                <Card
                                    className="card">
                                    <CardContent
                                        className={`card-content ${selectedVenues.find((elem) => elem === venue) !== undefined ? 'chosen' : ''}`}
                                        onClick={() => onVenueClicked(venue)}>
                                        {venue.name}
                                    </CardContent>
                                </Card>
                                <div className="card-location">
                                    {venue.location}
                                </div>
                            </div>
                        ))}
                        {/* Populate with empty cards if length of venue row is less than 8 */}
                        {Array.from({ length: 8 - (venues[label]?.length || 0) }).map((_, index) => (
                            <div className="card-box empty-card" key={index}>
                                <Card className="card">
                                    <CardContent className="card-content">
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    </div>
                </>
            ))}
        </>
    )
}