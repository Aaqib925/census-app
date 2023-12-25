import React, { useCallback, useState } from "react"
import { mydatabase } from "../../database";

import useAuthStore from "../../store/Auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate();

    const setUserData = useAuthStore(store => store.setUserData);
    const setIsLoggedIn = useAuthStore(store => store.setIsLoggedIn);

    const handleLogin = useCallback(async () => {
        try {
            const isUserExists = await mydatabase.user.findOne({
                selector: {
                    email
                }
            }).exec().then((data: any) => data !== null);

            if (isUserExists) {
                setUserData({ email })
                setIsLoggedIn(true);
            } else {
                setError('User does not exist.')
            }
            setEmail('')
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }, [email, setIsLoggedIn, setUserData]);

    const handleLoginKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleLogin();
        }
    }, [handleLogin])

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            <h1 className="text-white text-4xl">Login</h1>

            <div>
                <div className="flex gap-4 mb-2">
                    <input
                        className="rounded-xl py-2 w-[85%] 2xl:w-[90%] px-4 bg-blue-navy border-none placeholder:text-gray-400 text-white focus:outline-none focus:ring-0 placeholder:text-sm"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => handleLoginKeyDown(e)}
                    />
                    <button
                        disabled={!email}
                        onClick={handleLogin}
                        className="text-white font-semibold p-3 rounded-xl cursor-pointer bg-purple-primary text-xs lg:text-base disabled:bg-blue-sky disabled:cursor-not-allowed"
                    >
                        Login
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic">{error} Kindly register!</p>}
            </div>

            <h4 className="text-white">Don&apos;t have an account? <span onClick={() => navigate('/register')} className="text-purple-primary cursor-pointer underline">Register now!</span></h4>

        </div>
    )
}

export default React.memo(Login);