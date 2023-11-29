import { Box, Typography, IconButton, Card, CardContent } from '@mui/material'
import { getDocs, collection, addDoc, doc, updateDoc, arrayUnion, where, query } from 'firebase/firestore'
import AddIcon from '@mui/icons-material/Add'
import "../styles/CommunitySection.css"
import { useEffect, useState } from 'react'
import { auth, db } from '../firebase'

export function CommunitySection() {
    const [newGroupName, setNewGroupName] = useState('')
    const [groups, setGroups] = useState([])
    const [groupUpdated, setGroupUpdated] = useState(false);

    const createGroup = async () => {
        if (newGroupName) {
            const currentUserUid = auth.currentUser.uid

            try {
                // Fetch the user document to get the name of the current user.
                // For some reason, it is not in the auth.currentUser object.
                const userQuery = query(collection(db, 'users'), where('uid', '==', currentUserUid));
                const userSnapshot = await getDocs(userQuery)

                if (!userSnapshot.empty) {
                    // User document found
                    const userData = userSnapshot.docs[0].data()
                    const currentUserName = userData.name

                    // Create the group
                    const groupRef = await addDoc(collection(db, 'groups'), {
                        name: newGroupName,
                        userUids: [currentUserUid],
                    })

                    const newGroup = { id: groupRef.id, name: newGroupName, userNames: [currentUserName] };
                    setGroups((prevGroups) => [...prevGroups, newGroup])
                    setNewGroupName('')
                } else {
                    console.error('User document not found for current user')
                }
            } catch (error) {
                console.error('Error creating group:', error)
            }
        }
    }


    const addUserToGroup = async (groupId) => {
        const currentUserUid = auth.currentUser.uid
        await updateDoc(doc(db, "groups", groupId), {
            userUids: arrayUnion(currentUserUid)
        })
        setGroupUpdated(!groupUpdated)
    }

    // Fetch the users for a given group
    const fetchUserNames = async (userUids) => {
        try {
            const userNames = await Promise.all(
                userUids.map(async (userUid, index) => {
                    try {
                        const userQuery = query(collection(db, "users"), where("uid", "==", userUid))
                        const userSnapshot = await getDocs(userQuery)

                        if (userSnapshot.size > 0) {
                            const userDoc = userSnapshot.docs[0];
                            return userDoc.data().name;
                        } else {
                            console.warn(`No user document found for userUid at index ${index}`)
                            return 'Unknown User'
                        }
                    } catch (error) {
                        console.error(`Error fetching user document for userUid at index ${index}:`, error);
                        return 'Unknown User'
                    }
                })
            )
            return userNames;
        } catch (error) {
            console.error('Error fetching user names:', error);
            return userUids.map(() => 'Unknown user')
        }
    }

    useEffect(() => {
        const fetchGroups = async () => {
            try {
                const groupsSnapshot = await getDocs(collection(db, 'groups'))
                const groupsData = groupsSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))

                // Ensure that each group has a valid userUids array
                const sanitizedGroupsData = await Promise.all(groupsData.map(async (group) => {
                    const userNames = await fetchUserNames(group.userUids)
                    return { ...group, userNames }
                }))

                setGroups(sanitizedGroupsData)
            } catch (error) {
                console.error('Error fetching groups:', error)
            }
        }
        fetchGroups()
    }, [groupUpdated])

    return (
        <div>
            <div className="top-elements">
                <Typography variant="h5" color="#3198B9">
                    Community
                </Typography>

                <div className="add-group">
                    <input className="add-group-input"
                        type="text"
                        placeholder="Add new group"
                        value={newGroupName}
                        onChange={(e) => setNewGroupName(e.target.value)}
                    />
                    <button className="add-group-button" onClick={createGroup}>
                        <AddIcon sx={{ color: "white" }} />
                    </button>
                </div>
            </div>

            <Box mt={2} display="flex" flexWrap="wrap">
                {groups.map((group) => (
                    <Card key={group.id} variant="outlined" sx={{ backgroundColor: '#124857', width: 150, m: 1 }}>
                        <CardContent>
                            <Typography variant="h6" color="#3198B9" gutterBottom>
                                {group.name}
                            </Typography>

                            <div className="group-card-users">
                                {group.userNames.map((userName, index) => (
                                    <p key={index}>{userName}</p>
                                ))}
                            </div>
                            <div className="add-user-button">
                                <IconButton onClick={() => addUserToGroup(group.id)}>
                                    <AddIcon sx={{ color: "white" }} fontSize="large" />
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </Box>
        </div>
    )
}

