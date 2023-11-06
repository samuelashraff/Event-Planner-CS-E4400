import { AfterworkVenues } from "./modalComponents/AfterworkVenues";
import { TeamDayVenues } from "./modalComponents/TeamDayVenues"
import { KnowledgeSharingVenues } from "./modalComponents/KnowledgeSharingVenues"
import { CulturalSharingVenues } from "./modalComponents/CulturalSharingVenues"
import { GalaVenues } from "./modalComponents/GalaVenues"
import { EducationVenues } from "./modalComponents/EducationVenues"


// Parent component to the different forms that depend on the main tag.
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