import '../ListItem.css'
import {doc, deleteDoc} from "firebase/firestore"
import {db} from '../firebase'

export function ListItem({name, id, location}) {

    const deleteEvent = async (e) => {
        e.preventDefault()
        try {
            await deleteDoc(doc(db, "events", id))
        }
        catch (e) {
            console.error("Something went wrong when deleting the document")
        }
    }

    return(
        <div className="list-item">
            <div className="sub-item">
                <li>Name: {name}</li>
                <li>ID: {id}</li>
                <li>Location: {location}</li>
            </div>
            <div className="sub-item">
                <button
                type="submit"
                onClick={deleteEvent}
                >
                    Delete
                </button>
            </div>
        </div>
        )
}