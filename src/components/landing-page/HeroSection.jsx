import React from "react";
import GoogleButton from 'react-google-button'

import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const HeroSection = () => {
  const {user, googleSignIn, logOut, authToken } = UserAuth()
  console.log(user)

  const navigate = useNavigate()
  return (
    <div className="bg-white dark:bg-darker">
      <nav className=" z-10 w-full bg-white dark:bg-transparent md:absolute md:bg-transparent">
        <div className="container m-auto px-2 md:px-12 lg:px-7">
          <div className="flex flex-wrap items-center justify-between py-3 gap-6 md:py-4 md:gap-0">
            <input
              type="checkbox"
              name="toggle_nav"
              id="toggle_nav"
              className="peer hidden"
            />
            <div className="w-full px-6 flex justify-between lg:w-max md:px-0 z-30">
              <a
                href="#"
                aria-label="logo"
                className="flex space-x-5 items-center"
              >
                <img
                  src="/carry-with-mic.jpeg"
                  className="w-12 rounded-full "
                  alt="tailus logo"
                  width="144"
                  height="133"
                />
                <span className="text-2xl font tracking-tighter text-yellow-900 ">
                  Carry{" "}
                  <span className="text-yellow-700 ">
                    Minati
                  </span>
                </span>
              </a>

              <div className="flex items-center lg:hidden max-h-10 ">
                <label
                  role="button"
                  for="toggle_nav"
                  ariaLabel="humburger"
                  id="hamburger"
                  className="relative w-10 h-auto p-2"
                >
                  <div
                    id="line"
                    className="m-auto h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                  ></div>
                  <div
                    id="line2"
                    className="m-auto mt-2 h-0.5 w-6 rounded bg-yellow-900  transition duration-300"
                  ></div>
                  
                </label>
              </div>
            </div>

            <label
              role="button"
              for="toggle_nav"
              className="hidden peer-checked:block fixed w-full h-full left-0 top-0 z-10 bg-yellow-200   bg-opacity-30 backdrop-blur backdrop-filter"
            ></label>
            <div className="hidden peer-checked:flex  w-full flex-col lg:flex lg:flex-row justify-end z-30 items-center gap-y-6 p-6 rounded-xl bg-gray-900 lg:gap-y-0 lg:p-0 md:flex-nowrap lg:bg-transparent lg:w-7/12">
              <div
                className="w-full min-w-max space-y-2 
                    border-yellow-200 lg:space-y-0 sm:w-max lg:border-l dark:lg:border-gray-700 "
              >
                {user ? (
                  <button
                  onClick={logOut}
                  type="button"
                  title="Log Out"
                  className="w-full py-3 px-6 text-center rounded-full transition bg-yellow-300 hover:bg-yellow-100 active:bg-yellow-400 focus:bg-yellow-300 sm:w-max"
                >
                  <span className="block text-yellow-900 font-semibold text-sm">
                    Logout
                  </span>
                </button> 
                ) : (
                  <div className="mx-12 w-full ">
                <GoogleButton onClick={googleSignIn}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
      <div className="relative bg-gray-900">
        <div className="container m-auto px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
              <h1 className="font-bold text-4xl  text-yellow-50 md:text-5xl lg:w-10/12">
                Your favorite dishes, right at your door
              </h1>
              <a
                className="mt-12 group relative inline-block focus:outline-none focus:ring"
                href="#"
              >
                <span class="absolute inset-0 translate-x-1.5 translate-y-1.5 bg-yellow-300 transition-transform group-hover:translate-y-0 group-hover:translate-x-0"></span>

                <span
                onClick={()=>user?navigate('superchat'): alert("Please Signin first!")}
                 class="relative inline-block border-2 border-current border-yellow-50 px-8 py-3 text-sm font-bold uppercase tracking-widest text-black group-active:text-opacity-75">
                  Superchat &#x2192;
                </span>
              </a>
              <p className="mt-8 text-gray-200 lg:w-10/12 mb-12 md:mb-0">
                Sit amet consectetur adipisicing elit.{" "}
                <a href="#" className="text-yellow-700">
                  connection
                </a>{" "}
                tenetur nihil quaerat suscipit, sunt dignissimos.
              </p>
            </div>
            <div className="ml-auto -mb-24 lg:-mb-56 lg:w-6/12">
              <img
                src="./public/carry-big-clip-art.jpeg"
                className="relative w-full h-auto"
                alt="food illustration"
                loading="lazy"
                width="100"
                height="450"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
