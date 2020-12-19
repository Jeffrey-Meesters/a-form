import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

import store from "@/store";

const firebaseConfig = {
  apiKey: "AIzaSyCYYimRWpHDdEwni_p6RCbO51QvQnVkTpw",
  authDomain: "communication-questionaire.firebaseapp.com",
  databaseURL: "https://communication-questionaire.firebaseio.com",
  projectId: "communication-questionaire",
  storageBucket: "communication-questionaire.appspot.com",
  messagingSenderId: "390006855673",
  appId: "1:390006855673:web:40b98bd638c1a679740f28"
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

async function registerAnonymousUser(data) {
  db.collection("users")
    .doc(data.user.uid)
    .set({
      uid: data.user.uid
    });
}

export async function getUser() {
  const currentUser = firebase.auth().currentUser;
  const userRef = db.collection("users").doc(currentUser.uid);
  const doc = await userRef.get();
  if (!doc.exists) {
    alert("user not found");
  } else {
    return doc.data();
  }
}

export async function updateUser(data) {
  const currentUser = firebase.auth().currentUser;
  const userRef = db.collection("users").doc(currentUser.uid);
  const currentTimeStamp = Date.now();
  data.timeStamp = currentTimeStamp;

  await userRef.set(
    {
      [`formData-${currentTimeStamp}`]: data
    },
    { merge: true }
  );

  const doc = await userRef.get();
  if (!doc.exists) {
    alert("user not found");
  } else {
    return doc.data();
  }
}

export async function initAuth() {
  auth.onAuthStateChanged(function(user) {
    store.commit("SET_USER", user);
  });
}

export async function signInAnonymously() {
  const resp = await auth.signInAnonymously();
  if (resp?.additionalUserInfo?.isNewUser) {
    registerAnonymousUser(resp);
    return resp.user;
  } else {
    return getUser();
  }
}

export async function signIn({ email, password }) {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .catch(error => {
      console.log(error);
    });
}

export async function getdata() {
  db.collection("users")
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    });
}
