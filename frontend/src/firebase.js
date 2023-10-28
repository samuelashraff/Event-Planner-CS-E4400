import { initializeApp } from 'firebase/app'
import 'firebase/firestore'
import { 
	getFirestore,
	query,
	getDocs,
	collection,
	where,
	addDoc, } from 'firebase/firestore'
import {
	getAuth,
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	sendPasswordResetEmail,
	signOut,
	GoogleAuthProvider,
	signInWithPopup
	} from "firebase/auth"


const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGE_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
	measurementId: process.env.REACT_APP_MEASUREMENT_ID
}



const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const db = getFirestore(app)

const googleProvider = new GoogleAuthProvider()

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider)
    const user = res.user
    const q = query(collection(db, "users"), where("uid", "==", user.uid))
    const docs = await getDocs(q)
    if (docs.docs.length === 0) {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        name: user.displayName,
        authProvider: "google",
        email: user.email,
      })
    }
  } catch (err) {
    console.error(err)
    alert(err.message)
  }
}


const logInWithEmailAndPassword = async (email, password) => {
	try {
		await signInWithEmailAndPassword(auth, email, password)
		alert("You are logged in.")
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const registerWithEmailAndPassword = async (name, email, password, accountType, companyName) => {
	try {
		const res = await createUserWithEmailAndPassword(auth, email, password)
		const user = res.user
		await addDoc(collection(db, "users"), {
			uid: user.uid,
			name,
			authProvider: "local",
			email,
			accountType,
			companyName
		})
		alert("You have successfully signed in!")
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const sendPasswordReset = async (email) => {
	try {
		await sendPasswordResetEmail(auth, email)
		alert("Password reset link sent!")
	} catch (err) {
		console.error(err)
		alert(err.message)
	}
}
const logOut = () => {
	signOut(auth)
}
export {
	auth,
	db,
	logInWithEmailAndPassword,
	registerWithEmailAndPassword,
	sendPasswordReset,
	logOut,
	signInWithGoogle
}