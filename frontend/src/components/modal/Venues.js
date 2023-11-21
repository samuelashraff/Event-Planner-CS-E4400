import { CulturalSharingVenues } from "./CulturalSharingVenues"
import "../../styles/VenueList.css"
import { Card, CardContent } from "@mui/material";

export function Venues({ mainTag, onVenueSelect, selectedVenues, onFetchVenues, venues }) {


    // This will be the only special case and should thus be handled seperately.
    // Not yet implemented.
    if (mainTag === "Cultural sharing") {
        return (
            <CulturalSharingVenues />
        )
    }
    else {
        onFetchVenues(mainTag)
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
}