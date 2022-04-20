import firebase from "firebase/compat/app";
import "firebase/compat/database";
import 'firebase/compat/firestore'
import { constant } from 'lodash'


const firebaseConfig = {
    apiKey: "AIzaSyAcqC8eGb6LlN0VslkkANKzcdmuns7wyaA",
    authDomain: "hwcrud.firebaseapp.com",
    projectId: "hwcrud",
    storageBucket: "hwcrud.appspot.com",
    messagingSenderId: "1018883862511",
    appId: "1:1018883862511:web:04932059b72a18bebc901a"
  }


  export const firebaseApp = firebase.initializeApp(firebaseConfig)