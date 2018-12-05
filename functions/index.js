const functions = require('firebase-functions');
const firebase = require('firebase')
const firebaseConfig = {
    apiKey: 'AIzaSyDo35t4nxfNmuUnqy65o3NFuUmlM9WMd6w',
    authDomain: 'dokun-bana-ad966.firebaseapp.com',
    databaseURL: 'https://dokun-bana-ad966.firebaseio.com',
    storageBucket: 'dokun-bana-ad966.appspot.com',
projectId:  "dokun-bana-ad966",
  };
  
  firebase.initializeApp(firebaseConfig);
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.addOnlineUser = functions.https.onRequest((req, res) => {
    console.info('addOnlineUser called')
    const onlineUserRef = firebase.database().ref('OnlineUser/Number');

    return onlineUserRef.transaction(function(Number) {
      console.info('Number from transaction :: ',Number)
      
      try {
            
        Number++   
    } catch(e) {
        //
    }
     return Number;
    })
    .then(() => res.status(200).send())
      .catch(e => res.status(404).send(e))

 })



 exports.subOnlineUser = functions.https.onRequest((req, res) => {
    console.info('addOnlineUser called')
    const onlineUserRef = firebase.database().ref('OnlineUser/Number');

    return onlineUserRef.transaction(function(Number) {
      console.info('Number from transaction :: ',Number)
      
      try {
            
        Number--   
    } catch(e) {
        //
    }
     return Number;
    })
    .then(() => res.status(200).send())
      .catch(e => res.status(404).send(e))

 })

 exports.AppVerifierFunction = functions.https.onRequest((req, res) => {
    console.info('addOnlineUser called')
    const onlineUserRef = firebase.database().ref('users/' + userId);

    onlineUserRef.child('recaptchaToken');
    onlineUserRef.on('value', snap => {
          const recaptchaTokenSnap = snap.val()
            return recaptchaTokenSnap
        });

        const applicationVerifier= firebase.auth.RecaptchaVerifier('homepage',recaptchaTokenSnap)
        onlineUserRef.update({
            appVerifier: applicationVerifier 
        })
 })