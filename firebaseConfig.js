// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
    authDomain: "dailymessages-f305a.firebaseapp.com",
    projectId: "dailymessages-f305a",
    storageBucket: "dailymessages-f305a.firebasestorage.app",
    messagingSenderId: "439632992552",
    appId: "1:439632992552:web:8f229d8693b9e8cef8181d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const db = firebase.firestore();