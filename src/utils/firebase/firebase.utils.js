import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,

} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD-qyLkQuH4h9QaG2trxdOeawQHBSHdlNI",
  authDomain: "projectcrown2.firebaseapp.com",
  projectId: "projectcrown2",
  storageBucket: "projectcrown2.appspot.com",
  messagingSenderId: "89477634722",
  appId: "1:89477634722:web:9ea17554efc168299c95fb"
};

const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: 'select_account',
});

//INITIATE FIREBASE AUTHERIZATION
export const auth = getAuth();
console.log("AUTH: ", auth);

export const signInWithGooglePopup = () =>
  signInWithPopup(auth, googleProvider);

export const signInWithGoogleRedirect = () =>
  signInWithRedirect(auth, googleProvider);

//INITIATE DATABASE
export const db = getFirestore();
console.log("DB: ", db);

//ADDING shop-data.js TO FIRESTORE DB
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const batch = writeBatch(db);
  const collectionRef = collection(db, collectionKey);
  
  objectsToAdd.forEach((object) => {
     const docRef = doc(collectionRef, object.title.toLowerCase());
     batch.set(docRef, object);
  });

  await batch.commit();
  console.log('done');
};

//GET A COLLECTION FROM DATABASE
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "collections"); /////////////////////////
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  //console.log(querySnapshot);
  const queryDoc = querySnapshot.doc
  const categoryMap = queryDoc.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});

  return categoryMap;
}


//CREATE USER DOCUMENT IN DATABASE
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);
