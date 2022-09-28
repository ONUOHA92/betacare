// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js')
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js'
)

const firebaseConfig = {
  apiKey: 'AIzaSyCa8sirZ5UDjxyaVOnfM18SSsMUU6R_ISo',
  authDomain: 'betacare-349418.firebaseapp.com',
  projectId: 'betacare-349418',
  storageBucket: 'betacare-349418.appspot.com',
  messagingSenderId: '24632715332',
  appId: '1:24632715332:web:02497a715135327a25b411',
  measurementId: 'G-MSWS48ZEG6',
}

firebase.initializeApp(firebaseConfig)

// Retrieve firebase messaging
const messaging = firebase.messaging()

messaging.onBackgroundMessage(function (payload) {
  // console.log('Received background message ', payload)

  const notificationTitle = payload.notification.title
  const notificationOptions = {
    body: payload.notification.body,
  }

  self.registration.showNotification(notificationTitle, notificationOptions)
})
