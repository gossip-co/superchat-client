import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import baseApi from "../BaseApi";
import { UserAuth } from "../context/AuthContext";

const Loader = () => {
  return (
    <div className="mt-[60%] md:mt-[20%]">
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 rounded-full animate-bounce bg-yellow-300"></div>
        <div className="w-4 h-4 rounded-full animate-bounce bg-yellow-300"></div>
        <div className="w-4 h-4 rounded-full animate-bounce bg-yellow-300"></div>
      </div>
    </div>
  );
};

const ConfirmationDiv = () => {
  return (
    <div className="text-center py-[60%] md:py-[20%] space-x-2 md:mx-0 ">
      <p className="md:text-5xl text-3xl font-bold tracking-tighter text-yellow-300">Congratulations </p>
      <p className="text-yellow-700 pt-2 text-xs md:text-base">
      Order confirmed and posted<br/>redirecting...
      </p>
    </div>
  )
}


const ConfirmationPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const {authToken} = UserAuth()

  useEffect(()=>{
    updateOrderAndShoutout()
  },[])

  const navigate = useNavigate()
  const {orderId, shoutoutId} = useParams()
  console.log("ORDER Id", orderId)
  console.log("SHOUTOUT ID", shoutoutId)

  if(!orderId || !shoutoutId){
    alert("Unauthorized page!")
    navigate("/")
  }

  const updateOrderAndShoutout = () => { 
    axios
      .post(`${baseApi}/payments/update-shoutout-order/${orderId}/${shoutoutId}/`, {},{
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `token ${authToken}`
      }})
      .then(function (response) {
        console.log("UPDATE ORDER RESPONSE~", response);
        if(response.status===200){
          console.log("RUNNING CONFIRMATION FUNC")
          setIsLoading(false)
          console.log("Waiting for redirecting...")
          setTimeout(() => {  navigate("/superchat") }, 2000);
        }
      })
      .catch(function (error) {
        console.log(error)
        if(error.status===404){
          alert("Server Error")
        }
        else{
          alert("Payment is reducted but shoutout is not posted, please contact the support")
        }
        return navigate("/superchat")
      });
  };

  return (
    <div className="bg-gray-900 h-screen">
      {isLoading&&(
        <div class="bg-gray-900 px-4 py-3 text-red-500 ">
        <p class="text-center text-xs md:text-sm font-medium">
          Confirming the payment... please don't close or reload the window.
        </p>
      </div>
      )}
      {isLoading && <Loader />}
      {!isLoading&& <ConfirmationDiv/>}

    </div>
  );
};

export default ConfirmationPage;
