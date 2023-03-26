import React, { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroller";

import baseApi from "../../BaseApi";
import { UserAuth } from "../../context/AuthContext";

const SupporterCard = ({ name, PhotoURL, superchatAmount, message }) => {
  return (
    <div className="container flex flex-col bg-yellow-50  w-full px-3 max-w-lg mx-auto  divide-y rounded-lg divide-gray-100  mb-5">
      <div className="flex justify-between py-2 px-3">
        <div className="flex space-x-4 items-center tracking-tighter ">
          <div className="grow">
            <img
              src={PhotoURL? PhotoURL : "https://source.unsplash.com/100x100/?portrait"}
              alt="User Image"
              className="object-cover w-10  rounded-full"
            />
          </div>
          <div className="grow">
            <h4 className="font-bold text-yellow-900">{name}</h4>
          </div>
          <div className="bg-yellow-300 px-1.5 py-0.5 rounded-full items-end">
            <h1 className="text-[0.58rem] text-yellow-700">₹ {superchatAmount}</h1>
          </div>
        </div>
      </div>
      <div className="px-2 pb-3 pt-1 space-y-2 text-sm text-gray-700 tracking-tighter">
        <p>
          {message}
        </p>
      </div>
    </div>
  );
};
const RecentSupporters = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [haveNextPage, setHaveNextPage] = useState(true);
  const [superChats, setSuperChats] = useState([]);

  const { authToken } = UserAuth();

  const fetchSuperchat = () => {
    axios
      .get(`${baseApi}/shoutout/all/?page=${currentPage}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `token ${authToken}`,
        },
      })
      .then(function (response) {
        // console.log("response Rrrr", response)
        const data = response.data;
        // console.log("data", data.results)
        setSuperChats(superChats=>[...superChats, ...data.results]);
        const haveNext = data.next;
        if (haveNext) {
          setCurrentPage(currentPage + 1);
        }
        if (!haveNext) setHaveNextPage(false);
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      });
  };

  console.log("SUPER CHATS", superChats);

  return (
    <div className="mx-5 ">
      <p className="text-center text-yellow-300 text-3xl font-extrabold  mt-14 mb-7">
        SUPPORTERS
      </p>
      <div className=" scroll-smooth" >
        <InfiniteScroll
          pageStart={0}
          loadMore={fetchSuperchat}
          hasMore={haveNextPage}
          loader={
            <div className="text-white font-2xl text-center font-bold" key={0}>
              Loading ...
            </div>
          }
        >
          {/* {Object.keys(superChats).map((keys)=>(<p>Superchat</p>))} */}
          { superChats.length!== 0&&superChats?.map((superchat, index)=>(
          <SupporterCard key={index} name={superchat?.user.first_name} PhotoURL={superchat?.user_pfp_url} superchatAmount={superchat?.amount} message={superchat?.message} />
          ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default RecentSupporters;
