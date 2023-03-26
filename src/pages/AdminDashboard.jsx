import React, { useEffect, useState } from "react";
import axios from "axios";

import { UserAuth } from "../context/AuthContext";
import baseApi from "../BaseApi";

const synth = window.speechSynthesis;
const voices = synth.getVoices();

const textToSpeech = (
  text,
  username,
  superchatAmount,
  currentRate,
  currentPitch
) => {
  const speakText = new SpeechSynthesisUtterance(
    `${username} has donated ${superchatAmount} rupees, ${text}`
  );
  console.log("Started Speaking");

  // Speak end
  speakText.onend = (e) => {
    console.log("completed");
  };

  // Speak error
  speakText.onerror = (e) => {
    console.error("Something went wrong", e.error);
  };

  const selectedVoice = voices[21]; //hi-IN
  speakText.voice = selectedVoice;
  speakText.rate = currentRate;
  speakText.pitch = currentPitch;
  synth.speak(speakText);
};

const PitchSlider = ({ currentValue, setCurrentValue }) => {
  return (
    <div className="items-center text-yellow-700 space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
      <span className="block tracking-tighter text-2xl font-extrabold grow">
        Pitch
      </span>
      <div className="space-x-1">
        <button
          type="button"
          onClick={() => setCurrentValue(currentValue - 0.1)}
          disabled={currentValue <= 0.2 ? true : false}
          className="bg-yellow-50 inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full shadow    active:bg-opacity-90 "
        >
          <i className="ri-subtract-fill"></i>
        </button>
        <button
          type="button"
          onClick={() => setCurrentValue(currentValue + 0.1)}
          disabled={currentValue >= 2 ? true : false}
          className=" bg-yellow-50 inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full shadow"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>
    </div>
  );
};

const RateSlider = ({ currentValue, setCurrentValue }) => {
  return (
    <div className="items-center text-yellow-700 space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
      <span className="block tracking-tighter text-2xl font-extrabold grow">
        Range
      </span>
      <div className="space-x-1">
        <button
          type="button"
          onClick={() => setCurrentValue(currentValue - 0.1)}
          disabled={currentValue <= 0.2 ? true : false}
          className="bg-yellow-50 inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full shadow    active:bg-opacity-90 "
        >
          <i className="ri-subtract-fill"></i>
        </button>
        <button
          type="button"
          onClick={() => setCurrentValue(currentValue + 0.1)}
          disabled={currentValue >= 2 ? true : false}
          className=" bg-yellow-50 inline-flex items-center justify-center w-8 h-8 py-0 border rounded-full shadow"
        >
          <i className="ri-add-line"></i>
        </button>
      </div>
    </div>
  );
};

const DisplayMessage = ({ message, username, amount }) => {
  return (
    <div className=" w-full md:w-96">
      <textarea
        row={5}
        value={`${username} has donated ${amount} rupees, ${message}`}
        contentEditable={false}
        className=" bg-yellow-50 text-yellow-900 w-full h-28 rounded-lg tracking-tighter text-center py-4 px-3"
      ></textarea>
    </div>
  );
};

const AdminDashboard = () => {
  const [unreadSuperchat, setUnreadSuperchat] = useState([]);
  const [totalSuperchat, setTotalSuperchat] = useState(unreadSuperchat.length);
  const [currentMessage, setCurrentMessage] = useState("");
  const [currenSuperchatAmount, setCurrentSuperchatAmount] = useState(0);
  const [userWhoDenated, setUserWhoDonated] = useState("");
  const [currentRate, setCurrentRate] = useState(1);
  const [currentPitch, setCurrentPitch] = useState(1);

  const { adminAuthToken, adminLogOut } = UserAuth();

  useEffect(() => {
    const tenSec = 1000 * 5 * 1;

    const interval = setInterval(() => {
      console.log("Speeking......");
      fetchUnreadSuperchat();
    }, tenSec);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (totalSuperchat > 0) {
      readUnreadSuperchat();
    }
  }, [totalSuperchat, unreadSuperchat]);

  const readUnreadSuperchat = () => {
    unreadSuperchat.map((superchat, index) => {
      console.log("Running spech map>>");
      textToSpeech(
        superchat?.message,
        superchat?.user.first_name,
        superchat?.amount,
        currentRate,
        currentPitch
      );
      updateSuperchatStatusToRead(superchat.id);
      setCurrentMessage(superchat?.message);
      setCurrentSuperchatAmount(superchat?.amount);
      setUserWhoDonated(superchat?.user.first_name);
    });
    setUnreadSuperchat([]);
    setTotalSuperchat(0);
  };

  const fetchUnreadSuperchat = () => {
    axios
      .get(`${baseApi}/shoutout/unread/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${adminAuthToken}`,
        },
      })
      .then(function (response) {
        // console.log("response Rrrr", response)
        const data = response.data;
        // console.log("SUPERCHAT DATA", data.length)
        setUnreadSuperchat(data);
        setTotalSuperchat(data.length);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  const updateSuperchatStatusToRead = (superchatId) => {
    axios
      .post(
        `${baseApi}/shoutout/update/`,
        { shoutout_id: superchatId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `token ${adminAuthToken}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.status);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  console.log("unread superchat", unreadSuperchat);
  console.log("unread superchat length", totalSuperchat);
  if (!adminAuthToken)
    return (
      <div className="text-center my-[20rem] font-extrabold text-yellow-50">
        Loading
      </div>
    );

  return (
    <>
      <div className="flex items-end justify-end bg-gray-900 px-5 pt-5">
        <button
        onClick={adminLogOut}
          type="button"
          title="Log Out"
          className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
        >
          <span className="block text-yellow-900 font-semibold text-sm">
            Logout
          </span>
        </button>
      </div>

      <div className="  bg-gray-900 h-screen w-screen pt-[5rem]">
      <div className="flex items-center justify-center">
        <div>
          <DisplayMessage message={currentMessage} username={userWhoDenated} amount={currenSuperchatAmount}/>

          <div className="my-16">
            <h1 className="text-right items-center font- px-5 my-3 text-sm text-yellow-700 rounded-full bg-gray-800 w-fit">
              {currentRate.toFixed(1)}
            </h1>
            <RateSlider
              currentValue={currentRate}
              setCurrentValue={setCurrentRate}
            />
          </div>

          <div className="my-16">
            <h1 className="text-right items-center font- px-5 my-3 text-sm text-yellow-700 rounded-full bg-gray-800 w-fit">
              {currentPitch.toFixed(1)}
            </h1>
            <PitchSlider
              currentValue={currentPitch}
              setCurrentValue={setCurrentPitch}
            />
          </div>

          {/* <button
          onClick={()=>textToSpeech("completed", currentRate.toFixed(1), currentPitch.toFixed(1))}
           className="text-center text-yellow-700 bg-yellow-50 px-1.5 py-2 rounded-full text-xs">
            <p>Speak</p>
          </button> */}
        </div>
      </div>
    </div>
    </>
  );
};

export default AdminDashboard;
