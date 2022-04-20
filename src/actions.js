import {firebaseApp} from './firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import { async } from '@firebase/util'
import { collection } from 'firebase/compat/firestore'




const db = firebase.firestore(firebaseApp)

export const getCollection = async(collection) => {
  
    const result = {statusResponse : false, data : null, error : null}
    try {
       const data = await db.collection(collection).get()
       console.log(data)
    } catch (error) {
        result.error = error
    }
        return result
}