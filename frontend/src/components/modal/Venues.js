import { CulturalSharingVenues } from "./CulturalSharingVenues"
import "../../styles/VenueList.css"
import { Card, CardContent } from "@mui/material";

export function Venues({ mainTag, onVenueSelect, selectedVenues, onFetchVenues, venues }) {
    const mainTagName = mainTag.name


    // This will be the only special case and should thus be handled seperately.
    // Not yet implemented.
    if (mainTagName === "Cultural sharing") {
        return (
            <CulturalSharingVenues />
        )
    }
    else {
        onFetchVenues(mainTag.name)
        return (
            <>
                <div className="card-list">
                    {venues.map((venue, index) => (
                        <>
                            <div
                                className="card-box"
                                key={index}
                                onClick={() => onVenueSelect(venue)}
                            >
                                <p className="venue-type">{venue.type}</p>
                                <Card
                                    className={`card ${selectedVenues.some(v => v.name === venue.name) ? 'chosen' : ''}`}
                                    key={`card-${index}`}>
                                    <CardContent
                                        className="card-content">
                                        {venue.name}
                                    </CardContent>
                                </Card>
                                <div className="card-location" key={`${venue.location}-${index}`}>
                                    {venue.location}
                                </div>
                            </div>
                        </>
                    ))}
                </div>
            </>
        )
    }
}