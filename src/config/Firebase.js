import {initializeApp, getApps, getApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'
import { getStorage } from 'firebase/storage'

import AsyncStorage from "@react-native-async-storage/async-storage"
import {getReactNativePersistence, initializeAuth} from 'firebase/auth/react-native'

const firebaseConfig = {
    apiKey: "AIzaSyDlN2wm1Ez4T39KEKpshdc506OR0xTZ2hY",
    authDomain: "bagsakan-6fbcc.firebaseapp.com",
    projectId: "bagsakan-6fbcc",
    storageBucket: "bagsakan-6fbcc.appspot.com",
    messagingSenderId: "220672666600",
    appId: "1:220672666600:web:fb09fe03279115e648d25d",
    measurementId: "G-SMTLGBQEBT"
};

let fireApp

if (getApps().length === 0) {
    fireApp = initializeApp(firebaseConfig)
} else {
    fireApp = getApp()
}

initializeAuth(fireApp, {
    persistence: getReactNativePersistence(AsyncStorage)
})

const fireDb = getFirestore(fireApp)
const fireAuth = getAuth(fireApp)
const fireStorage = getStorage(fireApp)

export {fireApp, fireDb, fireAuth, fireStorage}