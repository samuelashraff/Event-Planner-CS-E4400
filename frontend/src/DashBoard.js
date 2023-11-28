import Navbar from "./components/NavBar";
import "./styles/Dashboard.css"
import TasksList from "./components/TasksList";
import { CommunitySection } from "./components/CommunitySection";
import { useEffect, useState } from "react";
import { Button, Dialog, DialogContent, DialogTitle } from "@mui/material";


export function DashBoard() {
    const [selectedDay, setSelectedDay] = useState(null)
    const [open, setOpen] = useState(false)
    const [calendarContent, setCalendarContent] = useState(null)

    // Hardcoded data for the calendar view, no time to implement this dynamically.
    const calendarData = {
        7: {
            title: "Achievements in industry",
            date: "7.12.2023",
            description: "Industry expert explains new technological achievements" +
                "in an event organized at Otaniemi."
        },
        10: {
            title: "Keynote speaker X suggestion",
            date: "10.12.2023",
            description: "How well do your company employees know each others " +
                "divergent backgrounds? Tailored three hour fun workshop to get " +
                "to know more about different cultures"
        },
        17: {
            title: "Little Christmas party",
            date: "17.12.2023",
            description: "Many are having a party on this day." +
                "Like minded people are on the move this day. Maybe pre games at the " +
                "office and heading out to town?"
        }
    }


    const handleButtonClick = (day) => {
        setSelectedDay(day)
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        if (!selectedDay) {
            return
        }
        setCalendarContent(calendarData[selectedDay])
    }, [selectedDay])

    return (
        <div className="dashboard">
            <Navbar />
            <div className="dashboard-scheduler">
                <button className="scheduler-event-button button-one" onClick={() => handleButtonClick(7)}>7th</button>
                <button className="scheduler-event-button button-two" onClick={() => handleButtonClick(10)}>10th</button>
                <button className="scheduler-event-button button-three" onClick={() => handleButtonClick(17)}>17th</button>
                {calendarContent && (
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        PaperProps={{
                            style: {
                                backgroundColor: "#124857",
                                color: "white",
                            }
                        }}>
                        <DialogTitle>{calendarContent.date}</DialogTitle>
                        <DialogContent>
                            <h3>{calendarContent.title}</h3>
                            <p>{calendarContent.description}</p>
                            <Button onClick={handleClose} variant="contained">Close</Button>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="dashboard-sections">
                <div className="dashboard-section community-section">
                    <CommunitySection />
                </div>
                <div className="dashboard-section task-overview">
                    <TasksList />
                </div>
            </div>
        </div>
    )
}