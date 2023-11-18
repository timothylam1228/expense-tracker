// create a auth file with firebase auth (signInWithGoogle)
// 1. create a new file in src/auth.ts
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth"
import { firebaseApp } from "./firebase.config"
// 2. create a new instance of GoogleAuthProvider
const provider = new GoogleAuthProvider()
// 3. create a new function called signInWithGoogle
const signInWithGoogle = () => signInWithPopup(getAuth(firebaseApp), provider)

const signOut = () => getAuth(firebaseApp).signOut()
// 4. export the function

export { signInWithGoogle, signOut }
