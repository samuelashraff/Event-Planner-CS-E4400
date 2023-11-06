import { Box, Button, Modal, Stack, TextField } from "@mui/material";
import "../styles/CreateEventModal.css"
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { modalStyle } from "../styles/styles";
import { useState } from "react";
import { Venues } from "./Venues";

export function CreateEventModal({ isModalOpen, setIsModalOpen }) {

    // Hooks
    const [eventDate, setEventDate] = useState("")
    const [eventLocation, setEventLocation] = useState("")
    const [mainTag, setMainTag] = useState(null)
    const [subTags, setSubTags] = useState([])
    const [selectedSubTag, setSelectedSubTag] = useState(null)
    const [selectedTag, setSelectedTag] = useState(null)
    

    // Main tags
    const mainTagsQuery = query(collection(db, "main_tags"))
    const [tags] = useCollectionData(mainTagsQuery)


    // Helper functions

    // Get the list of sub tags from a given main tag
    const getSubTags = async (mainTag) => {
        const subTagRefs = mainTag.sub_tags
        const subTagDocs = await Promise.all(subTagRefs.map(ref => getDoc(ref)))
        const subTagsData = subTagDocs.map(doc => doc.data())
        setSubTags(subTagsData)
    }

    return (
        <Modal
            open={isModalOpen}
            sx={modalStyle}
        >
            <Box p={4}>
                <Box>
                    <Stack style={{ flexDirection: "row" }}>
                        <div className="first-row-element">
                            <h3>Choose time</h3>
                            <TextField
                                type="date"
                                variant="outlined"
                                value={eventDate}
                                onChange={(e) => setEventDate(e.target.value)}
                                className="first-row-input" />
                        </div>
                        <div className="first-row-element">
                            <h3>Location</h3>
                            <TextField
                                type="text"
                                variant="outlined"
                                value={eventLocation}
                                onChange={(e) => setEventLocation(e.target.value)}
                                className="first-row-input" />
                        </div>
                    </Stack>
                </Box>
                {eventDate && eventLocation && (
                    <Box className="tag-box">
                        <h3>Theme of the event</h3>
                        <div className="tag-list">
                            {tags.map((tag) => {
                                return (
                                    <div
                                        className={`tag-element ${selectedTag === tag ? 'selected' : ''}`}
                                        key={tag.id}
                                        onClick={() => {
                                            setMainTag(tag);
                                            setSelectedTag(tag);
                                            getSubTags(tag);
                                        }}
                                    >
                                        {tag.name}
                                    </div>
                                )
                            })}
                        </div>
                    </Box>
                )}
                {mainTag && (
                    <Box className="subTag-box">
                        <div className="tag-list">
                            {subTags.map((subTag) => {
                                return (
                                    <div
                                        className={`subTag-element ${selectedSubTag === subTag ? 'selected' : ''}`}
                                        key={subTag.id}
                                        onClick={() => {
                                            setSelectedSubTag(subTag);
                                        }}>
                                        {subTag.name}
                                    </div>
                                )
                            })}
                        </div>
                    </Box>
                )}
                {selectedSubTag && (
                    <Box className="venue-list">
                        <Venues labels={selectedSubTag.filter_labels} eventDate={eventDate} mainTagName={mainTag.name}/>
                    </Box>
                )}
                <Button variant="contained" onClick={() => setIsModalOpen(false)}>Close</Button>
            </Box>
        </Modal>
    )
}



