const admin = require('firebase-admin');

const firebaseConfig = {
    apiKey: "AIzaSyBJo5ajKF6mQUBHubURHoY5CFbbo9-ilUs",
    authDomain: "todo-list-b01b3.firebaseapp.com",
    databaseURL: "https://todo-list-b01b3.firebaseio.com",
    projectId: "todo-list-b01b3",
    storageBucket: "todo-list-b01b3.appspot.com",
    messagingSenderId: "541425706472",
    appId: "1:541425706472:web:c14a0339719a322a63305d"
  };

admin.initializeApp(firebaseConfig);


module.exports ={
    ...require('./Controllers/todo')
 }