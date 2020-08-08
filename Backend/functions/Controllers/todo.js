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



exports.getAllTodo = functions.https.onCall(async (data)=>{
    if(data.uid){
        var todoList = [];
        return admin.firestore().collection('Users').doc(data.uid).collection('TodoList').get()
        .then((snapshot)=>{
            snapshot.forEach((doc)=>{
                let todo ={
                    id: doc.id,
                    details: doc.data().details
                }
                todoList.push(todo)
            })
            return todoList;
        })
        .catch((error) =>{
            return{
                success: false,
                msg: 'There is some error fetching the list',
                error: error.message
            }
        })
    }
    else{
        return{
            success: false,
            msg: 'No such user exists'
        }
    }
})


exports.editTodo = functions.https.onCall(async (data)=>{
    if(data.docid && data.uid){
        let updateddata = {details: data.details}
        return admin.firestore().collection('Users').doc(data.uid).collection('TodoList').doc(data.docid).update(updateddata)
        .then(()=>{
            return{
                success: true,
                msg: 'Todo updated successfully!'
            }
        })
        .catch((error)=>{
            return{
                success: false,
                msg: 'Error updating Todo',
                error: error.message
            }
        })
    }
    else{
        return{
            success: false,
            msg: 'Error updating the todo'
        }
    }
})