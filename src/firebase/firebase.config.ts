// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // New import
import { getToken, onMessage } from "firebase/messaging";
import { getMessaging } from "firebase/messaging/sw";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};
// const firebaseConfig = {
// apiKey: "AIzaSyBGjfWT3nM_QApv3xPf8ml8u7hHVXngUhY",
// authDomain: "expense-tracker-timothy.firebaseapp.com",
// projectId: "expense-tracker-timothy",
// storageBucket: "expense-tracker-timothy.appspot.com",
// messagingSenderId: "351602347572",
// appId: "1:351602347572:web:6a4dea95cd5481af2ec461",
// measurementId: "G-51WJREBDMH",
// };

export const fetchToken = (setTokenFound: (arg: boolean) => void) => {
  return getToken(messaging, {
    vapidKey:
      "BLNHea8HAv-YWyG1j4exAX-BnUSLaSAvweUzaWOdmvBvRMUIrxBtZzTO6eXFje6AX6xywkwbeDq161_a4AhvA_s",
  })
    .then((currentToken) => {
      if (currentToken) {
        console.log("current token for client: ", currentToken);
        setTokenFound(true);
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          "No registration token available. Request permission to generate one."
        );
        setTokenFound(false);
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      console.log("An error occurred while retrieving token. ", err);
      // catch error while creating client token
    });
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
// Initialize Firebase

export const firebaseApp = initializeApp(firebaseConfig);
export const messaging = getMessaging(firebaseApp);
export const db = getFirestore(firebaseApp);
export const auth = getAuth(firebaseApp);

export const analytics = getAnalytics(firebaseApp);
