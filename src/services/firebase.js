import { initializeApp } from "firebase/app";

import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";

const firebaseConfig = {
  apiKey: "AIzaSyCe0JXZhgIv90g_btjThMxZtIkRvnVaKtY",
  authDomain: "bfgm-e-v.firebaseapp.com",
  databaseURL: "https://bfgm-e-v.firebaseio.com",
  projectId: "bfgm-e-v",
  storageBucket: "bfgm-e-v.appspot.com",
  messagingSenderId: "998839213804",
  appId: "1:998839213804:web:9034149231f59e4d32cfc9",
};

const firebaseApp = initializeApp(firebaseConfig);

const Functions = getFunctions(firebaseApp, "europe-west3");

if (process.env.NODE_ENV !== "production") {
  connectFunctionsEmulator(Functions, "localhost", 5001);
}

export const CloudFunctions = (name) => httpsCallable(Functions, name);
