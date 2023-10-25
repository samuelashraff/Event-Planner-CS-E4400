import '../styles/ListItem.css'
import { doc, deleteDoc } from "firebase/firestore"
import { db } from '../firebase'
import { Button, Card } from '@mui/material'

export function ListItem({ event }) {


    return (
        <Card sx={{ minWidth: 300, marginBottom: "10%", display: "flex", alignItems: "flex-start", flexDirection: "row", justifyContent: "baseline" }}>
            <div className="list-item">
                <li>Name: {event.name}</li>
                <li>Location: {event.location}</li>
            </div>
        </Card>
    )
}