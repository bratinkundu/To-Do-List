const express = require('express');
const cors = require('cors');
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const app = express();

app.use(cors ({ origin: true }));

exports.createAuthUser = functions.https.onCall(async (data)=> {
    const userEmail = data.email
    const name = data.name
    const password = data.password
    const phno = data.phoneno

    return admin.auth().createUser({
        email: userEmail,
        password: password
    })
    .then((userdata) => {
        return admin.firestore().collection("Users").doc(userdata.uid).set({
            id: userdata.uid,
            name: name,
            email: userEmail,
            contactno: phno
        })
        .then(()=>{
            return{
                success: true,
                msg: 'New user created succesfully!' 
            }
        })
        .catch(error =>{
            return {
                success : false,
                msg: 'Adding user failed. Please try again',
                error: error
            }
        })
    })
    .catch(error => {
        return{
            success: false,
            msg: 'Error in authenticating user',
            error: error.message
        }
    })
});



exports.addTodo = functions.https.onCall(async (data)=>{
    const uid = data.uid
    
    return admin.auth().getUser(uid)
        .then(async function(userdata) {
            console.log(userdata)
            if(userdata){
               return admin.firestore().collection("Users").doc(uid).collection('TodoList').add({
                    details : data.tododetails
                })
            }
            else{
                return{
                    success: false,
                    msg: 'No such user exists'
                }
            }
        })
        .then(()=>{
            return{
                success: true,
                msg: 'Successfully added the todo!',
            }
        })
        .catch(error =>{
            return {
                success: false,
                msg: 'Error adding the todo. Please try again!',
                error: error.message
            }
        })
});