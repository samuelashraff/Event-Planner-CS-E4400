import { EventList } from "./components/EventList";
import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"


export function DashBoard() {



    return (
        <div className="dashboard">
            <Navbar />
            <EventList />
        </div>
    )
}