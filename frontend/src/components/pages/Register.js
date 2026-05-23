import React, { useState } from 'react';
import Input from '../shared/Input';
import { Link, useNavigate } from 'react-router-dom';
import signupImg from '../../assets/images/signup.gif';
// import avatar from '../../assets/images/doctor-img01.png';
import { makeUnauthPostReq } from '../../utils/serverHelper';
import uploadImgToCloudinary from '../../utils/Cloudinary_Upload';
import HashLoader from 'react-spinners/HashLoader'
import toast from 'react-hot-toast';


export default function Register() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("patient");
    const [gender, setGender] = useState("");
    const [loading, setLoading] = useState(false);
    
    const handleFileInputChange = async (e) => {
        const file = e.target.files[0];
        const data = await uploadImgToCloudinary(file);
        // console.log(data);
        setPreviewURL(data.url);
        setSelectedFile(data.url);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log(selectedFile);
        const data = { email, name, password, role, gender, photo: selectedFile };

        try {
            const response = await makeUnauthPostReq('/auth/register', data);

            if (response && !response.err) {
                // Registration successful
                toast.success("Congratulations! You are successfully registered.");
                setLoading(false);
                navigate("/login");
            } else {
                // Handle specific error conditions
                if (response.err === "User already exists") {
                    // Handle user already exists error
                    toast.error("User with this email already exists. Please use a different email.");
                } else {
                    // Handle other errors
                    toast.error("Registration failed. Please try again later.");
                }
            }
        } catch (error) {
            // Handle unexpected errors
            console.error("Error:", error);
            alert(`An unexpected error occurred: ${error.message || "Unknown error"}`);
        }
    };



    return (
        <section className='px-5 xl:px-0'>
            <div className='max-w-[1170px] mx-auto'>
                <div className='grid grid-cols-1 lg:grid-cols-2'>
                    {/* login image */}
                    <div className='hidden lg:block bg-primaryColor rounded-l-lg'>
                        <figure>
                            <img src={signupImg} alt='' className='w-full rounded-l-lg'></img>
                        </figure>
                    </div>

                    {/* signup form */}
                    <div className='rounded-l-lg lg:pl-16 py-10'>
                        <h3 className=' text-headingColor text-[22px] leading-9 font-bold mb-10'>Create an <span className=' text-primaryColor'>account</span>
                        </h3>
                        <form onSubmit={handleSubmit}>
                            <div className='mb-5'>
                                <Input type='text'
                                    placeholder='Full Name'
                                    name='name'
                                    value={name}
                                    setValue={setName}
                                    required
                                ></Input>
                                <Input type='email'
                                    placeholder='Enter your email'
                                    name='email'
                                    value={email}
                                    setValue={setEmail}
                                    required
                                ></Input>
                                <Input type='password'
                                    placeholder='Enter your password'
                                    name='password'
                                    value={password}
                                    setValue={setPassword}
                                    required
                                ></Input>
                            </div>
                            <div className='mb-5 flex items-center justify-between'>
                                <label className=' text-headingColor font-bold text-[16px] leading-7'>
                                    Are you a:
                                    <select name='role' value={role} className=' text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none' onChange={(e) => {
                                        setRole(e.target.value);
                                    }}>
                                        <option value='patient'>Patient</option>
                                        <option value='doctor'>Doctor</option>
                                    </select>
                                </label>

                                <label className=' text-headingColor font-bold text-[16px] leading-7'>
                                    Gender:
                                    <select name='gender' value={gender} className=' text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none' onChange={(e) => {
                                        setGender(e.target.value);
                                    }}>
                                        <option value=''>Select</option>
                                        <option value='male'>Male</option>
                                        <option value='female'>Female</option>
                                        <option value='other'>Other</option>
                                    </select>
                                </label>
                            </div>

                            <div className='mb-5 flex text-center gap-3'>
                                {selectedFile && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                                    <img src={previewURL} alt='' className='w-full rounded-full' />
                                </figure>}

                                <div className='relative w-[130px] h-[50px]'>
                                    <input
                                        type='file'
                                        name='photo'
                                        id='customFile'
                                        onChange={handleFileInputChange}
                                        accept=' .jpg, .png'
                                        className='absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer'
                                    />
                                    <label
                                        htmlFor='customFile'
                                        className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] tex-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
                                    >Upload Photo</label>
                                </div>
                            </div>
                            <div className='mt-7'>
                                <button disabled={loading && true} type='submit'
                                    className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
                                    {loading ? <HashLoader size={35} color='white' /> : 'Sign Up'}
                                </button>
                            </div>
                            <p className='mt-5 text-textColor text-center'>
                                Already have an accoount? <Link to='/login' className='text-primaryColor font-medium ml-1'>Login</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}


