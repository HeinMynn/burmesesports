import firebase from "firebase";

export const login = async ({email, password}) =>{
    const response = await firebase.auth().signInWithEmailAndPassword(email, password)
    
    return response.user;
}