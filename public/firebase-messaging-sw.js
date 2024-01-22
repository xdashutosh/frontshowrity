importScripts("https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js");
importScripts(
  "https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js"
);
const firebaseConfig = {
  apiKey: "AIzaSyAAh7H4GiI-i96WVVZ3yWZpHxVkE2NWSt8",
  authDomain: "hustleforwork-310c3.firebaseapp.com",
  projectId: "hustleforwork-310c3",
  storageBucket: "hustleforwork-310c3.appspot.com",
  messagingSenderId: "88023070242",
  appId: "1:88023070242:web:9425b0837c30c73a2efc7b",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    "[firebase-messaging-sw.js] Received background message ",
    payload
  );
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.image,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
