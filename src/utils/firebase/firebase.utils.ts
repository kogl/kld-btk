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
	NextOrObserver,
	User
	// ActionCodeOperation
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc, collection, writeBatch, query, getDocs, QueryDocumentSnapshot } from 'firebase/firestore'

import { Category } from '../../store/categories/category.types';

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

export type ObjectToAdd = {
	title: string
}

export const addCollectionAndDocuments = async <T extends ObjectToAdd>(
	collectionKey: string,
	objectsToAdd: T[],
): Promise<void> => {
	const collectionRef = collection(db, collectionKey)

	const batch = writeBatch(db)

	objectsToAdd.forEach((object) => {
		const docRef = doc(collectionRef, object.title.toLowerCase());
		batch.set(docRef, object)
	})

	await batch.commit();
	console.log('done');
}


export const getCategoriesandDocuments = async (): Promise<Category[]> => {
	const collectionRef = collection(db, 'categories')
	const q = query(collectionRef)

	const querySnapShot = await getDocs(q)
	// querySnapShot.docs
	return querySnapShot.docs.map(docSnapshot => docSnapshot.data() as Category
	)
}

export type AdditionalInformation = {
	displayName?: string
}

export type UserData = {
	createedAt: Date;
	displayName: string;
	email: string
}

export const createUserDocumentFromAuth = async (userAuth: User, additionalInformation = {} as AdditionalInformation
): Promise<void | QueryDocumentSnapshot<UserData>> => {
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
			console.log('something went wrong horrible wrong', error);
		}

	}
	return userSnapShot as QueryDocumentSnapshot<UserData>;
};


export const createAuthUserWithEmailAndPassword = async (email: string, password: string) => {

	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password)
};


export const signInAuthUserWithEmailAndPassword = async (email: string, password: string) => {

	if (!email || !password) return;
	return await signInWithEmailAndPassword(auth, email, password)
};

export const signOutUser = async () => await signOut(auth)

export const onAuthStateChangedListner = async (callback: NextOrObserver<User>) =>
	onAuthStateChanged(auth, callback);



export const getCurrentUser = (): Promise <User | null> => {
	return new Promise((resolve, reject) => {
		const unsubscribe = onAuthStateChanged(
			auth,
			(userAuth) => {
				unsubscribe()
				resolve(userAuth)
			},
			reject
		);
	});
};