import React, { useState } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js/pure";
import Payment from "./Payment";
import { UserAuth } from "../../context/AuthContext";

const stripePromise = loadStripe(
  "pk_test_51LsgyVSGPG8dWfbkHFOtX3h43aIdkkKvPTfTjQfBmAuHkc4qsplWuAxQwyLAtc94foO5DZm2tNJxmWwdGrcibzxH00Dh86YsRL"
);
const PaySection = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [shoutoutAmount, setShoutoutAmount] = useState("");
  const [shoutoutMessage, setShoutoutMessage] = useState("");
  const {user, changePaymentProcessingStatus} = UserAuth()

  const handleSubmit = (e) => {
    e.preventDefault();
    changePaymentProcessingStatus()
    return showPaymentModal
      ? setShowPaymentModal(false)
      : setShowPaymentModal(true);
  };

  return (
    <section>
      {showPaymentModal && (
        <Elements stripe={stripePromise}>
          <Payment
            shoutoutAmount={parseInt(shoutoutAmount)}
            shoutoutMessage={shoutoutMessage}
            showPaymentModal={setShowPaymentModal}
          />
        </Elements>
      )}
      <div className="flex  flex-col justify-center  rounded-2xl bg-gradient-to-b from-gray-700 to-gray-800 sm:px-6 ">
        <div className="sm:mx-auto sm:w-full sm:max-w-md spacing-x-2">
          <h2 className="mt-6 text-2xl font-light text-yellow-50 text-center ">
            Hey, <spam className="font-extrabold text-yellow-300">{user?user.displayName: "Aditya Pushkar"}</spam>
            <br/>Superchat Carry
          </h2>
        </div>

        <div className="mt-5 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="px-4 py-2 sm:px-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                {/* <label for="email" className="block text-sm font-medium text-gray-700"> Email address </label> */}
                <div className="mt-1">
                  <input
                    onChange={(e) => setShoutoutAmount(e.target.value)}
                    value={shoutoutAmount}
                    placeholder="Superchat amount ₹"
                    name="superchat_amount"
                    type="number"
                    min={1}
                    required={true}
                    className="block w-full  px-5 py-3 text-base  text-gray-100 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-600"
                  />
                </div>
              </div>

              <div>
                {/* <label for="password" className="block text-sm font-medium text-gray-700"> Password </label> */}
                <div
                  onChange={(e) => setShoutoutMessage(e.target.value)}
                  value={shoutoutMessage}
                  className="mt-1"
                >
                  <textarea
                    name="superchat_message"
                    placeholder="Say something...."
                    rows={4}
                    type="text"
                    required=""
                    className="block w-full px-5 py-3 text-base text-gray-100 placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg bg-gray-700 focus:outline-none focus:border-transparent focus:ring-1 focus:ring-gray-600 focus:ring-offset-2 focus:ring-offset-gray-600"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex items-center mb-3  text-yellow-900 justify-center w-full px-10 py-4 text-base font-medium text-center  transition  transform bg-gradient-to-r from-yellow-300 to-yellow-400 rounded-xl active:translate-y-3 ease-in-out duration-700 "
                >
                  Superchat
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaySection;
