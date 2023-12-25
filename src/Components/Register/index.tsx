import React, { useCallback, useState } from "react"
import { mydatabase } from "../../database";

import { v4 as uuidv4 } from 'uuid';
import useAuthStore from "../../store/Auth";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [email, setEmail] = useState<string>("");
    const [error, setError] = useState<string>("");

    const navigate = useNavigate()

    const setUserData = useAuthStore(store => store.setUserData);
    const setIsLoggedIn = useAuthStore(store => store.setIsLoggedIn);

    const handleRegister = useCallback(async () => {
        try {
            const isUserExists = await mydatabase.user.findOne({
                selector: {
                    email
                }
            }).exec().then((data: any) => data !== null);

            if (!isUserExists) {
                await mydatabase.user.insert({
                    id: uuidv4(),
                    email
                });
                setIsLoggedIn(true);
                setUserData({ email })
            } else {
                setError('User already exists.')
            }
            setEmail('');
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }, [email, setIsLoggedIn, setUserData])

    const handleRegisterKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleRegister();
        }
    }, [handleRegister])

    return (
        <div className="flex flex-col justify-center items-center h-screen gap-10">
            <h1 className="text-white text-4xl">Register</h1>

            <div>
                <div className="flex gap-4 mb-2">
                    <input
                        className="rounded-xl py-2 w-[85%] 2xl:w-[90%] px-4 bg-blue-navy border-none placeholder:text-gray-400 text-white focus:outline-none focus:ring-0 placeholder:text-sm"
                        type="text"
                        placeholder="Enter Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={(e) => handleRegisterKeyDown(e)}
                    />
                    <button
                        disabled={!email}
                        onClick={handleRegister}
                        className="text-white font-semibold p-3 rounded-xl cursor-pointer bg-purple-primary text-xs lg:text-base disabled:bg-blue-sky disabled:cursor-not-allowed"
                    >
                        Register
                    </button>
                </div>
                {error && <p className="text-red-500 text-xs italic">{error} Kindly login!</p>}
            </div>

            <h4 className="text-white">Already have an account? <span onClick={() => navigate('/')} className="text-purple-primary cursor-pointer underline">Login now!</span></h4>

        </div>
    )
}

export default React.memo(Register);