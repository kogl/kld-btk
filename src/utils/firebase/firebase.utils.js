import { initializeApp } from 'firebase/app'
import { getAuth, signInWithPopup, signInWithRedirect, GoogleAuthProvider, } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, } from 'firebase/firestore'


const firebaseConfig = {
	apiKey: "AIzaSyDSQHo31GJ_JUZ9hL4xkSZMR5lEZnrEGdI",
	authDomain: "kld-butik-db.firebaseapp.com",
	projectId: "kld-butik-db",
	storageBucket: "kld-butik-db.appspot.com",
	messagingSenderId: "860722424423",
	appId: "1:860722424423:web:11567fb1aed9da460842c2"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
	promt: 'select_account'
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, 'users', userAuth.uid);
	console.log(userDocRef);
	const userSnapShot = await getDoc(userDocRef);
	console.log(userSnapShot)
	console.log(userSnapShot.exists())

	// if user data dosent exist
	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt
			});
		} catch (error) {
			console.log('something went wrong horrible wrong', error.messsage);
		}

	}
	return userDocRef;
};
