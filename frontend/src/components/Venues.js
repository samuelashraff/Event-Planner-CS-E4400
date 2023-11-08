import { AfterworkVenues } from "./modal/AfterworkVenues";
import { TeamDayVenues } from "./modal/TeamDayVenues"
import { KnowledgeSharingVenues } from "./modal/KnowledgeSharingVenues"
import { CulturalSharingVenues } from "./modal/CulturalSharingVenues"
import { GalaVenues } from "./modal/GalaVenues"
import { EducationVenues } from "./modal/EducationVenues"


// Parent component to the different forms that depend on the main tag.
// Fetching will be done in each component separately, but this should be refactored
// to avoid code repetition

export function Venues({ labels, eventDate, mainTagName }) {

    if (mainTagName === "Afterwork") {
        return (
            <AfterworkVenues labels={labels} eventDate={eventDate} />
        )
    }

    if (mainTagName === "Team day") {
        return (
            <TeamDayVenues />
        )
    }

    if (mainTagName === "Knowledge sharing") {
        return (
            <KnowledgeSharingVenues />
        )
    }

    if (mainTagName === "Education") {
        return (
            <EducationVenues />
        )
    }

    if (mainTagName === "Cultural sharing") {
        return (
            <CulturalSharingVenues />
        )
    }

    if (mainTagName === "Gala") {
        return (
            <GalaVenues />
        )
    }
}