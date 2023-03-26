import React from 'react'
import { Link } from 'react-router-dom'

import { UserAuth } from '../../context/AuthContext'

const Headers = () => {
    const {user} = UserAuth()
  return (
    <div>
        <header aria-label="Site Header" className="bg-gray-900">
  <div
    className="mx-auto md:space-x-[50rem] border-b border-gray-800 flex h-16 max-w-screen-xl items-center gap-8 px-4 sm:px-6 lg:px-8"
  >
    <Link className="block text-teal-600 grow" to={"/"}>
      <span className="sr-only">Home</span>
      <img
          alt="Carry's logo"
          src="/carry-with-mic.jpeg"
          className="h-11 rounded-full "
        />

    </Link>

    <div className="flex flex-1 items-center justify-end md:justify-between">
      

      <div className="flex items-center gap-4">
        <div className="sm:flex sm:gap-4">
          <span


          >
            <img
          alt="User Profile"
          src={user? user.photoURL: "https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"}
          className="h-10 w-10 rounded-full object-cover"
        />
          </span>

          
        </div>
      </div>
    </div>
  </div>
</header>

    </div>
  )
}

export default Headers