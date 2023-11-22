import "../../styles/VenueList.css"
import { Card, CardContent } from "@mui/material";
import { useEffect } from "react";

export function Venues({ mainTag, onVenueSelect, selectedVenues, onFetchVenues, venues }) {

    useEffect(() => {
        onFetchVenues(mainTag)
    }, [mainTag])

    return (
        <>
            <div className="card-list">
                {venues.map((venue, index) => (
                    <div
                        className="card-box"
                        key={index}
                        onClick={() => onVenueSelect(venue)}
                    >
                        <p className="venue-type" key={`type ${index}`}>{venue.type}</p>
                        <Card
                            className={`card ${selectedVenues.some(v => v.name === venue.name) ? 'chosen' : ''}`}
                            key={`card-${index}`}>
                            <CardContent
                                className="card-content" key={`card-content ${index}`}>
                                {venue.name}
                            </CardContent>
                        </Card>
                        <div className="card-location" key={`${venue.location}-${index}`}>
                            {venue.location}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}