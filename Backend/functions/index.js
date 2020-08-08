const admin = require('firebase-admin');





admin.initializeApp(firebaseConfig);


module.exports ={
    ...require('./Controllers/todo')
 }