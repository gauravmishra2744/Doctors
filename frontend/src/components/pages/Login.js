import React, { useState, useContext } from 'react';
import Input from '../shared/Input';
import { useNavigate, Link } from 'react-router-dom';
import { makeUnauthPostReq } from '../../utils/serverHelper';
import toast from 'react-hot-toast';
import { AuthContext } from '../context/AuthContext';
import HashLoader from 'react-spinners/HashLoader';

export default function Login() {
    let navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { dispatch } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = { email, password };
        setLoading(true);
        try {
            const response = await makeUnauthPostReq('/auth/login', data);

            if (response && !response.err) {
                const token = response.token;
                localStorage.setItem("docToken", token);
                localStorage.setItem("userId", response.data._id);
                dispatch({
                    type: "LOGIN_SUCCESS",
                    payload: {
                        user: response.data
                    }
                });

                toast.success("Logged in Successfully!");
                navigate("/");
            } else {
                toast.error("Invalid Credentials!");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error(`An error occurred while logging in: ${error.message || "Unknown error"}`);
        } 
        finally {
            setLoading(false);
        }        
    };


    return (
        <section className='px-5 lg:px-0'>
            <div className=' w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 p-5'>
                <h3 className=' text-headingColor text-[22px] leading-9 font-bold lg:mb-10 mb-5'>
                    Hello! <span className=' text-primaryColor'>Welcome</span> Back 🎉
                </h3>

                <form className='py-4 md:py-0' onSubmit={handleSubmit}>
                    <Input type='email' placeholder='Enter your email' value={email} setValue={setEmail} />
                    <Input type='password' placeholder='Enter your password' value={password} setValue={setPassword} />
                    <div className='mt-7'>
                        <button type='submit'
                            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                            {loading ? <HashLoader size={25} color="white"/> : 'Login'}
                            </button>
                    </div>
                    <p className='mt-5 text-textColor text-center'>
                        Don't have an accoount? <Link to='/register' className='text-primaryColor font-medium ml-1'>Sign Up</Link>
                    </p>
                </form>
            </div>
        </section>
    )
}


