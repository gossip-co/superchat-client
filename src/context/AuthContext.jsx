import { useContext, createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
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
  const [adminAuthToken, setAdminAuthToken] = useState(null)
  const [userHaveToSignUpToGetToken, setUserHaveToSignUpToGetToken] = useState(false)
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

  useEffect(()=>{
    fetchAdminAuthTokenFromLS()
  },[])

  const navigate = useNavigate()

  const fetchAuthTokenByCreatingUserAccount = (email, uid, displayName) => {
    console.log("Create user In backend", email, uid, displayName)
    console.log("BASE URL", baseApi)
    axios
      .post(`${baseApi}/account/create/`, {
        email: email,
        username: email,
        password: uid,
        full_name: displayName,
      })
      .then(function (response) {
        if(response.status===200){
          return setAuthToken(response.data.token)
        }
      })
      .catch(function (error) {
        // alert("Server error while signup");
        console.log("LOGIN ERROR", error)
        return logOut()
      });
  };

  const fetchAuthTokenByLoginTheUser = (email, uid ) => {
    console.log("Runing backend login")
    axios
      .post(`${baseApi}/auth/token/`, {
        username: email,
        password: uid
      })
      .then(function (response) {
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

  const fetchAdminAuthTokenFromLS = () => {
    const adminAuthTokenFromLS = window.localStorage.getItem("adminAuthToken")
    if(adminAuthTokenFromLS){
      setAdminAuthToken(adminAuthTokenFromLS)
    }
  }

  const adminLogin = (username, password ) => {
    axios
      .post(`${baseApi}/auth/token/`, {
        username: username,
        password: password
      })
      .then(function (response) {
        if(response.status===200){
            const data = response.data
            const adminAuthToken_ = data.token
            window.localStorage.setItem("adminAuthToken", adminAuthToken_)
            setAdminAuthToken(adminAuthToken_)
            return navigate('/dashboard')
        }
        
      })
      .catch(function (error) {
        return "LOGIN_ERROR"
      });
  };

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
    // signInWithRedirect(auth, provider)
  };

  const logOut = () => {
    setAuthToken(null)
    signOut(auth)
  };

  const adminLogOut = () => {
    window.localStorage.removeItem("adminAuthToken")
    setAdminAuthToken(null)
  }

  // console.log("USER", user)

  return (
    <AuthContext.Provider value={{ googleSignIn, logOut, user, authToken, adminAuthToken, adminLogin, adminLogOut}}>
      {!isLoading&&children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
