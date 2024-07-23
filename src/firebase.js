import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
    apiKey: "AIzaSyB3c36y4VseMnzw4S79zKQmqeILQN43UNA",
    authDomain: "netflix-clone-42b97.firebaseapp.com",
    projectId: "netflix-clone-42b97",
    storageBucket: "netflix-clone-42b97.appspot.com",
    messagingSenderId: "255921726643",
    appId: "1:255921726643:web:b054e371bba43273be7cc6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app)

const signup = async (name, email, password) => {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const user = response.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.slice("5").split("-").join(" "));
    }
}

const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.slice("5").split("-").join(" "));
    }
}

const logout = async () => {
    signOut(auth);
}

export { auth, db, login, signup, logout };