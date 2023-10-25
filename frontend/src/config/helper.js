import { auth } from "../firebase"


export const getCurrentUserID = () => {
    return auth.currentUser.uid
}