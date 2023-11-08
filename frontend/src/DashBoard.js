import { EventList } from "./components/EventList";
import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"
import TasksList from "./components/TasksList";
import test from "./components/test";


export function DashBoard() {

    return (
        <div className="dashboard">
            <Navbar />
            <h1>Hello World! This is Team SAS!!!</h1>
            <TasksList />
            <test />
        </div>
    )
}