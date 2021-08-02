import firebase from "firebase/app"
import "firebase/functions"

const firebaseConfig = {
  apiKey: "AIzaSyCe0JXZhgIv90g_btjThMxZtIkRvnVaKtY",
  authDomain: "bfgm-e-v.firebaseapp.com",
  databaseURL: "https://bfgm-e-v.firebaseio.com",
  projectId: "bfgm-e-v",
  storageBucket: "bfgm-e-v.appspot.com",
  messagingSenderId: "998839213804",
  appId: "1:998839213804:web:9034149231f59e4d32cfc9"
}

firebase.initializeApp(firebaseConfig)

if (process.env.NODE_ENV !== "production") {
  firebase
    .app()
    .functions("europe-west3")
    .useFunctionsEmulator("http://localhost:5001")
}

export const CloudFunctions = name =>
  firebase
    .app()
    .functions("europe-west3")
    .httpsCallable(name)
