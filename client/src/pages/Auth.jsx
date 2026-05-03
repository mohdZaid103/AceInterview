import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { BsRobot } from "react-icons/bs";
import { IoSparkles } from "react-icons/io5";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../utils/firebase';
import axios from 'axios';
import { serverUrl } from '../App';
import { useDispatch } from 'react-redux';
import { setUserData } from '../redux/userSlice';

function Auth({isModel = false}) {

    const dispatch= useDispatch()
    const handelGoogleAuth = async ()=>{
        try {
            const response = await signInWithPopup(auth,provider)
            let User = response.user
            let name = User.displayName
            let email = User.email
            if (!User || !User.email) {
              throw new Error("Google auth failed");
            }
            const result = await axios.post(serverUrl+"/api/auth/google", {name, email},{withCredentials:true})
            dispatch(setUserData(result))
            

        } catch (error) {
            dispatch(setUserData(null))
            console.log(error);
            
        }
    }
  return (
    <div className={`
    w-full
    ${isModel? 'py-4':"min-screen bg-[#f3f3f3] flex items-center justify-center px-6 py-20"}
    `} >
        <motion.div
        initial={{opacity:0 , y:-40}}
        animate={{opacity:1, y:0}}
        transition={{duration:1.05}}
        className={`w-full
        ${isModel?"max-w-md p-8 rounded-3xl":"max-w-lg p-12 rounded-[32px] "} bg-white shadow-2xl border border-gray-200
        `}>
            <div className='flex items-center justify-center gap-3 mb-6'>
                <div className='bg-black text-white p-2 rounded-lg'>
                    <BsRobot size={18}/>
                </div>
                <h2 className='font-semibold text-lg'>AceInterview.AI</h2>
            </div>

            <h1 className='text-2xl md:text-3xl font-semibold text-center leading-snug mb-4'>
                Continue with{" "}
                <span className='bg-green-200 text-green-600 px-3 py-1 rounded-full inline-flex items-center gap-2'>
                    <IoSparkles size={16}/>
                    Ai smart Interview
                </span>
            </h1>

            <p className='text-gray-500 text-center text-sm md:text-base leading-relaxed mb-8'>
                Sign in to start Ai-Powered mock Interviews, track your progress, and unlock detailed performance insights.
            </p>
            <motion.button 
            onClick={handelGoogleAuth}
            whileHover={{opacity:0.9 , scale:1.03}}
            whileTap={{opacity:1, scale:0.98}}
            className='w-full text-white flex items-center justify-center gap-3 py-3 bg-black rounded-full shadow-md'>
                <FcGoogle size={20}/>
                Continue with Google
            </motion.button>
        </motion.div>
    </div>
  )
}

export default Auth