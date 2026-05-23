import React, { useEffect, useState } from 'react';
import Input from '../../components/shared/Input';
import { useNavigate } from 'react-router-dom';
import uploadImgToCloudinary from '../../utils/Cloudinary_Upload';
import HashLoader from 'react-spinners/HashLoader'
import toast from 'react-hot-toast';
import { URL } from '../../utils/config';

export default function Profile({ user }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [bloodType, setBloodType] = useState("");
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const token = localStorage.getItem("docToken");

  const handleFileInputChange = async (e) => {
    const file = e.target.files[0];
    const data = await uploadImgToCloudinary(file);
    setPhoto(data.url);
  }

  useEffect(()=>{
    setEmail(user.email);
    setName(user.name);
    setGender(user.gender);
    setBloodType(user.bloodType);
    setPhoto(user.photo);
  },[user])

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const data = { email, name, gender, photo, bloodType };
//  console.log(data);
    try {
      const response = await fetch(URL + "/user/" + user._id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });
     
      // console.log(response);
      if (response && !response.err) {
        // Registration successful
        toast.success("Updated Successfully!");
        setLoading(false);
        navigate("/users/profile/me");
        window.location.reload();
      }
    } catch (error) {
      // Handle unexpected errors
      console.error("Error:", error);
      toast.error(`An unexpected error occurred: ${error.message || "Unknown error"}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className='mb-5 mt-10'>
          <Input type='text'
            placeholder="Enter your Full name"
            name='name'
            value={name}
            setValue={setName}
            required
          ></Input>
          <Input type='email'
            placeholder="Enter your new email"
            name='email'
            value={email}
            setValue={setEmail}
            required
          ></Input>
          <Input type='text'
            placeholder='Enter your Blood Type'
            name='bloodType'
            value={bloodType}
            setValue={setBloodType}
            required
          ></Input>
        </div>
        <div className='mb-5 flex items-center justify-between'>


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
          {photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
            <img src={photo} alt='' className='w-full rounded-full' />
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
              className='absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer'
            >Upload Photo</label>
          </div>
        </div>
        <div className='mt-7'>
          <button disabled={loading && true} type='submit'
            className='w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3'>
            {loading ? <HashLoader size={35} color='white' /> : 'Update'}
          </button>
        </div>
      </form>
    </div>
  )
}
