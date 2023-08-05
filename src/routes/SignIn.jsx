import { useState } from "react";
import { LuMailCheck } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { signInUser } from "../utils";

export const SignIn = () => {
    const dispatch = useDispatch()

    const { authStatus } = useSelector((state) => state.auth);
    const [email, setEmail] = useState('')
    const [requestSent, setRequestSent] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    const handleSignIn = async () => {
        if(email === ''){
            alert('Please enter your email');
            return;
        } else if (!email.includes('@')) {
            alert('Please enter a valid email');
            return;
        } else if (!email.includes('.com')) {
            alert('Please enter a valid email');
            return;
        }

        try {
            setLoading(true);
            let data = await signInUser(email);
            setLoading(false);
            setRequestSent(true);
        } catch (error) {
            console.log('Something went wrong');
            alert('Something went wrong');
        }
    }

    const keyPressDown = (e) => {
        if (e.key === 'Enter') {
            handleSignIn()
        }
    }

    return (
        <div className='flex flex-col gap-5 justify-center items-center w-full'>
            <div className="w-11/12 max-w-[450px] md:w-[450px] h-[500px] mt-32 rounded-2xl p-6 flex flex-col justify-center items-center">
                <div className="bg-blue-400 w-4/5 max-w-[350px] md:w-[350px] h-[100px] border-r-[50px] border-fuchsia-400" />
                <div className="bg-green-400 w-4/5 max-w-[350px] md:w-[350px] h-[100px] border-r-[50px] border-fuchsia-400" />
                <div className="bg-blue-400 w-4/5 max-w-[350px] md:w-[350px] h-[100px] border-r-[50px] border-fuchsia-400" />
                <div className="absolute top-0 left-0 w-full h-full backdrop-blur-[80px] bg-[#141414] bg-opacity-70" />
            </div>

            <div className="absolute top-0 left-0 w-full h-full flex justify-center items-center">
                <div className="px-4 py-8 bg-[#212121] border-[1px] border-[#272727] w-11/12 max-w-[400px] md:w-[400px] h-fit  backdrop-blur-md rounded-xl">
                    {
                        requestSent === false &&
                        <div className="flex flex-col justify-between h-[150px]">
                            <span>
                                <p className="text-slate-100 opacity-80">Email address</p>
                                <input
                                    value={email}
                                    onKeyDown={keyPressDown}
                                    onChange={handleEmailChange}
                                    className="bg-[#171717] w-full p-2 rounded-md mt-4 text-slate-100 outline-none focus:ring"
                                />
                            </span>
                            <button onClick={() => handleSignIn()} className="w-full  bg-blue-800 hover:bg-blue-900 rounded-md py-2 text-slate-200 transition-all ">
                                {
                                    loading === true ?
                                    "Sending..."
                                    :
                                    "Send Login Link"
                                }
                            </button>
                        </div>
                    }


                    {
                        requestSent === true &&
                        <div className="h-[150px] flex flex-col gap-4 justify-center items-center">
                            <LuMailCheck className="text-blue-600 text-6xl opacity-90"/>
                            <p className="text-center text-slate-100 opacity-80">Login link sent <br/> Please check your inbox</p>
                        </div>
                    }
                </div>

            </div>
        </div>
    )
}