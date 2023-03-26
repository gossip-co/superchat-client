import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { UserAuth } from '../context/AuthContext';

const AdminLogin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const {adminAuthToken, adminLogin} = UserAuth()
    const navigate = useNavigate()

    useEffect(()=>{
        if(adminAuthToken) return navigate("/dashboard")
    }, [])


    const handleLogin = (e) => {
        e.preventDefault()
        const isLogin = adminLogin(username, password)
    }

  return (
    <section className="bg-gray-900 h-screen">
    <div className="flex  overflow-hidden justify-center ">
        <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="w-full max-w-xl mx-auto lg:w-96">
                <div>
                    <p className="text-yellow-700 text-medium">LiveWithCarry</p>
                    <h2 className="mt-6 text-3xl font-extrabold text-yellow-300">Admin Sign in.</h2>
                </div>

                <div className="mt-8">
                    <div className="mt-6">
                        <form 
                        onSubmit={handleLogin}
                         className="space-y-6">
                            <div>
                                <label for="username" className="block text-sm font-medium text-yellow-50"> Username </label>
                                <div className="mt-1">
                                    <input 
                                    onChange={(e)=>setUsername(e.target.value)}
                                    id="username" name="username" type="text" required placeholder="Your Username" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-700"/>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label for="password" className="block text-sm font-medium text-yellow-50"> Password </label>
                                <div className="mt-1">
                                    <input
                                    onChange={(e)=>setPassword(e.target.value)}
                                     id="password" name="password" type="password"  placeholder="Your Password" className="block w-full px-5 py-3 text-base placeholder-gray-300 transition duration-500 ease-in-out transform border border-transparent rounded-lg text-gray-300 bg-gray-800 focus:outline-none focus:border-transparent focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-700"/>
                                </div>
                            </div>


                            <div>
                                <button type="submit" className="flex items-center justify-center w-full px-10 py-4 text-base font-medium text-center text-yellow-900 transition duration-500 ease-in-out transform bg-gradient-to-r from-yellow-200 to-yellow-300 rounded-xl  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500">Sign in</button>
                            </div>
                        </form>
                       
                        
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</section>
  )
}

export default AdminLogin