import { useContext, createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithRedirect,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import axios from "axios";

import { auth } from "../Firebase";

import baseApi from "../BaseApi";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(()=>!user&&null); //if the  user get logOut then authToken should be null
  const [userHaveToSignUpToGetToken, setUserHaveToSignUpToGetToken] = useState(false)
  const [isPaymentProcessing, setIsPaymentProcessing] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // console.log("User", currentUser);  
      setIsLoading(false)    
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const fetchAuthTokenByCreatingUserAccount = (email, uid, displayName) => {
    console.log(email, uid, displayName)
    axios
      .post(`${baseApi}/account/create/`, {
        email: email,
        username: email,
        password: uid,
        full_name: displayName,
      })
      .then(function (response) {
        console.log("SIGNUP RESPONSE", response)
        if(response.status===200){
          return setAuthToken(response.data.token)
        }
      })
      .catch(function (error) {
        alert("Server error while signup");
        return logOut()
      });
  };

  const fetchAuthTokenByLoginTheUser = (email, uid ) => {
    axios
      .post(`${baseApi}/auth/token/`, {
        username: email,
        password: uid
      })
      .then(function (response) {
        console.log("LOGIN RESPONSE", response)
        if(response.status===200){
            return setAuthToken(response.data.token)
        }
        return setUserHaveToSignUpToGetToken(true)
      })
      .catch(function (error) {
        return setUserHaveToSignUpToGetToken(true)
      });
  };

  if(user && !userHaveToSignUpToGetToken){
    fetchAuthTokenByLoginTheUser(user.email, user.uid)
  }

  if(userHaveToSignUpToGetToken && user){
    fetchAuthTokenByCreatingUserAccount(user.email, user.uid, user.displayName)
  }

  const changePaymentProcessingStatus = () => {
    if(isPaymentProcessing) return setIsPaymentProcessing(false);
    return setIsPaymentProcessing(true)
  }

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    setAuthToken(null)
    signOut(auth)
  };

  console.log("PAYMENT PROCCESSING ", isPaymentProcessing)

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, authToken, isPaymentProcessing, changePaymentProcessingStatus }}>
      {!isLoading&&children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
