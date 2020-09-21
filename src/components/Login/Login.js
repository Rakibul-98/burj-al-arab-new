import React, { useContext } from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';
import {UserContext} from '../../App'
import { useHistory, useLocation } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }

   const handleGoogleSignIn = () =>{
    var provider = new firebase.auth.GoogleAuthProvider();
    
    firebase.auth().signInWithPopup(provider)
    .then(function(result) {
        const {displayName, email} = result.user;
        const signedInUser = {displayName, email};
        setLoggedInUser(signedInUser);
        history.replace(from);
    })
      
    .catch(function(error) {
        var errorMessage = error.message;
        console.log(errorMessage);
    });
   }

    return (
        <div className="button-container">
            <br/>
            <button className="btn btn-primary" onClick={handleGoogleSignIn}>Google sign in</button>
        </div>
    );
};

export default Login;