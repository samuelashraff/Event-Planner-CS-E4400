import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"
import { TaskOverview } from "./components/TaskOverview";


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
                    <TaskOverview />
                </div>
            </div>
        </div>
    )
}