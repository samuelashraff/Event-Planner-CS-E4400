import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"
import { TasksList } from "./components/TasksList";


export function DashBoard() {

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-scheduler">

            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section community-section">
                    <p>Community Section</p>
                </div>
                <div className="dashboard-section task-overview">
                    {/* <TasksList /> */}
                </div>
            </div>
        </div>
    )
}