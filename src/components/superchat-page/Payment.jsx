import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import axios from "axios";

// import ApiService from "../../stripeApi";
import baseApi from "../../BaseApi";

import { UserAuth } from "../../context/AuthContext";

// Make background non-scrollable
const Payment = ({ showPaymentModal, shoutoutAmount, shoutoutMessage }) => {
  const [error, setError] = useState(null);
  const [creatingPayment, setCreatingPayment] = useState(false)
  const stripe = useStripe();
  const elements = useElements();

  useEffect(()=>{
    console.log("Error changing")
    return setCreatingPayment(false)
  },[error])

  const navigate = useNavigate();
  const { user, authToken } = UserAuth();

  console.log("TYPE OF AMM", typeof shoutoutAmount);

  const stripeApi = axios.create({
    baseURL: baseApi,
    headers: {
      "Content-type": "application/json",
      Authorization: `token ${authToken}`,
    },
  });

  class ApiService {
    static saveStripeInfo(data = {}) {
      return stripeApi.post(`${baseApi}/payments/save-stripe-info/`, data);
    }
  }
  // Handle real-time validation errors from the CardElement.
  const handleChange = (event) => {
    if (event.error) {
      setError(event.error.message);
    } else {
      setError(null);
    }
  };

  // Handle form submission.
  // if(error){
  //   setCreatingPayment(false)
  // }
  const handleSubmit = async (event) => {
    event.preventDefault();
    setCreatingPayment(true)
    const card = elements.getElement(CardElement);
    const { paymentMethod, error } = await stripe.createPaymentMethod({
      type: "card",
      card: card,
    });
    ApiService.saveStripeInfo({
      email: user.email,
      name: user.displayName,
      payment_method_id: paymentMethod.id,
      amount: shoutoutAmount,
      message: shoutoutMessage,
    })
      .then((response) => {
        // console.log("Client Secret", response.data.data.client_secret)
        console.log("PAYMENT INTENT RESPONSE", response);
        // console.log("PAYMENT ACTION REQUIRES RESPONSE ", response)
        // response.data.data.client_secret
        if (response.status == 200) {
          const resData = response.data;
          confirmPayment(
            resData.data.client_secret,
            resData.data.order_id,
            resData.data.shoutout_id
          );
        }
        // const {paymentIntent} = confirmPayment;
        // console.log("PAYMENT Intent", paymentIntent)
        // if(paymentIntent.status === 200) alert('Payment successful!');
        // else alert("Payment failed")
      })
      .catch((error) => {
        console.log("PAYMENT ERROR", error);
      });


    const confirmPayment = async (clientSecret, order_id, shoutout_id) => {
      const { paymentIntent, error } = await stripe.confirmCardPayment(
        clientSecret
      );
      if (error) {
        // Handle error here,  //handle cancle payment
        return alert("Error while proccessing the payment");
      } else if (paymentIntent && paymentIntent.status === "succeeded") {
        navigate(`/confirmation/${order_id}/${shoutout_id}`);
      }
    };
  };
  return (
    <div>
      <div
        id="popup-modal"
        tabindex="-1"
        className="fixed  top-0 bg-black bg-opacity-80 h-screen md:mt-0 left-0 right-0 z-50  p-4 overflow-y-hidden overflow-x-hidden md:inset-0  "
      >
        <div className="relative w-full h-screen max-w-md md:h-auto md:mx-[23rem] my-[10rem]  ">
          <div className="relative  bg-white rounded-lg shadow  pb-5">
            <button
              onClick={() => showPaymentModal(false)}
              type="button"
              className="absolute top-3 right-2.5  duration-150 bg-transparent  rounded-full text-sm p-1.5 ml-auto inline-flex items-center hover:bg-gray-800 hover:text-white"
              data-modal-hide="popup-modal"
            >
              <svg
                aria-hidden="true"
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                ></path>
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
            <div className="p-6 text-center">
              {/* Checkout Form */}
              <section>
                <form onSubmit={handleSubmit} className="stripe-form">
                  <div className="items-center relative  w-20 -mt-16  mx-[34%] md:mx-[38%] justify-around  ">
                    <img
                      src="/carry-with-mic.jpeg"
                      className=" rounded-full  border-4 border-gray-50 "
                    />
                  </div>
                  <div className="mb-5">
                    <h1 className="text-xl font-medium">
                      Superchat <span className="font-bold">Carry</span>
                    </h1>
                    <p className="text-xs tracking-tight pt-1">
                      You’ll be charged{" "}
                      <span className="font-bold text-gray-500">
                        ₹{shoutoutAmount}{" "}
                      </span>
                    </p>
                  </div>
                  <input
                    className="w-full py-2 bg-gray-200 text-sm text-gray-600 px-2  rounded transition duration-500 ease-in-out transform border border-transparent  focus:outline-none focus:border-transparent focus:ring-1 focus:ring-gray-200 focus:ring-offset-2 focus:ring-offset-gray-200"
                    value={user.email}
                    placeholder="email"
                    readOnly
                  />

                  <h1 className="text-[10px] text-gray-500 mt-5 mb-3">
                    - PAY WITH CARD -
                  </h1>
                  <div className="form-row">
                    <label for="card-element" className="text-xs "></label>
                    <CardElement
                      id="card-element"
                      className="border border-gray-200  py-3 px-2 rounded"
                      onChange={handleChange}
                    />
                    <div
                      className="card-errors text-red-500 text-xs"
                      role="alert"
                    >
                      {error}

                    </div>
                  </div>
                  <button
                    type="submit"
                    className="text-white mt-12 bg-blue-700 hover:bg-blue-800   font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2  inline-flex items-center"
                  >
                    {creatingPayment&& error===null &&(
                      <svg
                      aria-hidden="true"
                      role="status"
                      class="inline w-4 h-4 mr-3 text-white animate-spin"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="#E5E7EB"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentColor"
                      />
                    </svg>
                    )}
                    Superchat
                  </button>
                  <div>
                    <p className="text-[12px] mt-5 text-gray-600">
                    Payment secured by  <span className="font-bold">stripe</span> . You’ll be taken to a confirmation you page after the payment. <a className="underline">Terms</a> and <a className="underline">Privacy</a>.

                    </p>
                  </div>
                </form>
              </section>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
