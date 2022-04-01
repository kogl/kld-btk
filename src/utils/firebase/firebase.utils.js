import { initializeApp } from 'firebase/app'
import {
	getAuth,
	signInWithPopup,
	signInWithRedirect,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
	ActionCodeOperation
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs} from 'firebase/firestore'



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
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)


export const db = getFirestore();

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
	const collectionRef = collection(db, collectionKey)

	const batch = writeBatch(db)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object)
	})

	await batch.commit(); 
	console.log('done');
}


export const getCategoriesandDocuments = async () =>{
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapShot = await getDocs(q)
	// querySnapShot.docs
	const categoryMap = querySnapShot.docs.reduce((acc, docSnapshot) => {
		const {title, items} = docSnapshot.data()
		acc[title.toLowerCase()] = items
		return acc
	},{})

	return categoryMap
}

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;
	const userDocRef = doc(db, 'users', userAuth.uid);

	const userSnapShot = await getDoc(userDocRef);


	// if user data dosent exist
	if (!userSnapShot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation
			});
		} catch (error) {
			console.log('something went wrong horrible wrong', error.messsage);
		}

	}
	return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password) => {

	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password)
};


export const signInAuthUserWithEmailAndPassword = async (email, password) => {

	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = async (callback) =>
	onAuthStateChanged(auth, callback);
