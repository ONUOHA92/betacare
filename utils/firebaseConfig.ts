// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import {
  getMessaging,
  getToken,
  onMessage,
  deleteToken,
} from 'firebase/messaging'

console.log(typeof Window)
const firebaseConfig = {
  apiKey: 'AIzaSyCa8sirZ5UDjxyaVOnfM18SSsMUU6R_ISo',
  authDomain: 'betacare-349418.firebaseapp.com',
  projectId: 'betacare-349418',
  storageBucket: 'betacare-349418.appspot.com',
  messagingSenderId: '24632715332',
  appId: '1:24632715332:web:02497a715135327a25b411',
  measurementId: 'G-MSWS48ZEG6',
}

// Initialize Firebase

let messaging
if (typeof window !== 'undefined' && !getApps().length) {
  const app = initializeApp(firebaseConfig)
  const analytics = getAnalytics(app)
  messaging = getMessaging()
}

console.log(typeof Window)
export const getUserToken = (setTokenFound) => {
  return getToken(messaging, {
    vapidKey:
      'BLBmJdbHS11MOvp8UjeznaX6hO17-C7IvGSo8xZa5aWBO3zHY43riN_nzpAdDQy52LyqlsakIzm_ZeAqG-_RWWE',
  })
    .then((currentToken) => {
      if (currentToken) {
        // console.log('current token for client: ', currentToken)
        setTokenFound(true)
        sessionStorage.setItem('fcmToken', currentToken)
        // Track the token -> client mapping, by sending to backend server
        // show on the UI that permission is secured
      } else {
        console.log(
          'No registration token available. Request permission to generate one.'
        )
        setTokenFound(false)
        // shows on the UI that permission is required
      }
    })
    .catch((err) => {
      // console.log('An error occurred while retrieving token. ', err)
      // catch error while creating client token
    })
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload)
    })
  })

export async function deleteUserToken(setTokenFound) {
  try {
    const token = await deleteToken(messaging)
    if (!token) {
      setTokenFound(true)
    }
    setTokenFound(false)
    console.log(token)
    return token
  } catch (err) {
    console.log('An error occurred while retrieving token. ', err)
    return undefined
  }
}
