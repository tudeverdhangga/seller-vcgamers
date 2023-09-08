importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.3.1/firebase-messaging-compat.js"
);

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
  apiKey: "AIzaSyC_5C4O8Y8mce2YI7RjDVUcsWKi3zm8JRQ",
  authDomain: "vc-gamers.firebaseapp.com",
  projectId: "vc-gamers",
  storageBucket: "vc-gamers.appspot.com",
  messagingSenderId: "327843531831",
  appId: "1:327843531831:web:ecbabf499b1934de8c43b2",
  measurementId: "G-XBZLDKLH97",
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );

  if (!payload || !payload.data || !payload.data.type) {
    return;
  } else {
    const notificationTitle = payload.data.title;
    const notificationOptions = { body: payload.data.body };

    self.registration.showNotification(notificationTitle, notificationOptions);
  }
});
