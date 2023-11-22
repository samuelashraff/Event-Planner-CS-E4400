import { EventList } from "./components/EventList";
import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"
import TasksList from "./components/TasksList";


export function DashBoard() {

    const eventId = 2;
    return (
        <div className="dashboard">
            <Navbar />
            <h1>Hello World</h1>
            {/* <TasksList  eventId={eventId}/> */}
        </div>
    )
}