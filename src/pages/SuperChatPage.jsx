import React from "react";
import Headers from "../components/superchat-page/Headers";
import LiveAndPaySection from "../components/superchat-page/LiveAndPaySection";
import RecentSupporters from "../components/superchat-page/RecentSupporters";

import { UserAuth } from "../context/AuthContext";
const SuperChatPage = () => {
  const { isPaymentProcessing } = UserAuth();

  return (
    <div className={`bg-gray-900  overflow-x-hidden`}>
     <div>
      <p className="text-center bg-gray-50 py-0.5">
      <span className="font-semibold px-2">Test Card </span> <br/>
       <span className="text-yellow-700">4242424242424242, 12/26, 123,  11004</span>
      </p>
     </div>
      <Headers />
      <LiveAndPaySection />
      <RecentSupporters />

      <footer className="border-t text-center border-gray-800 py-5 ">
        <span className="text-xs tracking-wide text-gray-400 ">
          Copyright © Carry Minati <span></span> | All right reserved
        </span>
      </footer>
    </div>
  );
};

export default SuperChatPage;
