import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/database";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, push } from "firebase/database";
import { getFirestore } from "firebase/firestore";

import App from "./App.js";

firebase.initializeApp({
  apiKey: "AIzaSyBkp07jjC31VfVhYcVGor2a39372zQYSvU",
  authDomain: "wad200-mali-8a181.firebaseapp.com",
  projectId: "wad200-mali-8a181",
  storageBucket: "wad200-mali-8a181.appspot.com",
  messagingSenderId: "542539664308",
  appId: "1:542539664308:web:e1fb3593dba0442913c0e1",
  measurementId: "G-K8BW62K0Y1",
});

const firebaseConfig = {
  apiKey: "AIzaSyBkp07jjC31VfVhYcVGor2a39372zQYSvU",
  authDomain: "wad200-mali-8a181.firebaseapp.com",
  projectId: "wad200-mali-8a181",
  storageBucket: "wad200-mali-8a181.appspot.com",
  messagingSenderId: "542539664308",
  appId: "1:542539664308:web:e1fb3593dba0442913c0e1",
  measurementId: "G-K8BW62K0Y1",
};

// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const database = getDatabase(app);

export { db };

//  root.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// );

const root = createRoot(document.getElementById("root"));

root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
