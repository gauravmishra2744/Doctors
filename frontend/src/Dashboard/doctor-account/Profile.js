import React, { useEffect, useState } from 'react'
import { AiOutlineDelete } from 'react-icons/ai';
import uploadImgToCloudinary from '../../utils/Cloudinary_Upload';
import { URL } from '../../utils/config';
import toast from 'react-hot-toast';

export default function Profile({doctorData}) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        bio: '',
        password: '',
        gender: '',
        specialization: '',
        ticketPrice: '',
        qualifications: [{ startingDate: "", endingDate: "", degree: "", university: "" }],//index 0
        experiences: [{ startingDate: "", endingDate: "", position: "", hospital: "" }],
        timeSlots: [{ day: '', startingTime: '', endingTime: "" }],
        about: "",
        photo: null
    });

    useEffect(()=>{
        setFormData({
            name: doctorData?.name,
            email: doctorData?.email,
            phone: doctorData?.phone,
            bio: doctorData?.bio,
            gender: doctorData?.gender,
            specialization: doctorData?.specialization,
            ticketPrice: doctorData?.ticketPrice,
            qualifications: doctorData?.qualifications,
            experiences: doctorData?.experiences,
            timeSlots: doctorData?.timeSlots,
            about: doctorData?.about,
            photo: doctorData?.photo
        })
    }, [doctorData])

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    }

    const handleFileInputChange = async (e) => {
        const file=e.target.files[0];
        const data= await uploadImgToCloudinary(file);

        setFormData({...formData, photo: data?.url});
    }

    const updateProfileHandler = async (e) => {
        e.preventDefault();

        try{
            const res=await fetch(`${URL}/doctor/${doctorData._id}`, {
                method: "PUT",
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("docToken")}`
                },
                body: JSON.stringify(formData)
            });

            const result= await res.json();

            if(!res.ok){
                throw Error(result.message);
            }
            
            toast.success(result.message);
            setTimeout(() => {
                 window.location.reload();
            }, 700);
           
        }

        catch(err){
            toast.error(err.message);
        }
    }

    //reusabe function for adding item
    const addItem = (key, item) => {
        setFormData(prevFormData => ({ ...prevFormData, [key]: [...prevFormData[key], item] }))
    }

    //reusable function for deleting item
    const deleteItem = (key, index) => {
        setFormData(prevFormData => ({
            ...prevFormData,
            [key]: prevFormData[key].filter((_, i) => i !== index),
        }))
    }

    //reusabe input change handler function
    const handleReusableInputChangeFunc = (key, index, event) => {
        const { name, value } = event.target;

        setFormData(prevFormData => {
            const updateItems = [...prevFormData[key]]

            updateItems[index][name] = value;

            return {
                ...prevFormData,
                [key]: updateItems,
            }
        })
    }

    const addQualification = e => {
        e.preventDefault();

        addItem("qualifications", {
            startingDate: "",
            endingDate: "",
            degree: "",
            university: ""
        })
    }

    const deleteQualification = (e, index) => {
        e.preventDefault();
        deleteItem('qualifications', index);
    }

    const handleQualificationChange = (event, index) => {
        handleReusableInputChangeFunc('qualifications', index, event)
    }

    const addExperience = e => {
        e.preventDefault();

        addItem("experiences", {
            startingDate: "",
            endingDate: "",
            position: "",
            hospital: ""
        })
    }

    const deleteExperience = (e, index) => {
        e.preventDefault();
        deleteItem('experiences', index);
    }

    const handleExperienceChange = (event, index) => {
        handleReusableInputChangeFunc('experiences', index, event)
    }

    const addTimeSlot = e => {
        e.preventDefault();

        addItem("timeSlots", {
            day: "",
            startingTime: "",
            endingTime: "",
        })
    }

    const deleteTimeslot = (e, index) => {
        e.preventDefault();
        deleteItem('timeSlots', index);
    }

    const handleTimeslotChange = (event, index) => {
        handleReusableInputChangeFunc('timeSlots', index, event)
    }

    return (
        <div>
            <h2 className=' text-headingColor font-bold text-[24px] leading-9 mb-10'>
                Profile Information
            </h2>

            <form>
                <div className=' mb-5'>
                    <p className='form-label'>Name*</p>
                    <input
                        type='text'
                        name='name'
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder='Full Name'
                        className='form-input'></input>
                </div>
                <div className=' mb-5'>
                    <p className='form-label'>Email*</p>
                    <input
                        type='email'
                        name='email'
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder='Enter your email'
                        className='form-input'>
                    </input>
                </div>
                <div className=' mb-5'>
                    <p className='form-label'>Phone*</p>
                    <input
                        type='number'
                        name='phone'
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder='Enter your Phone Number'
                        className='form-input'>
                    </input>
                </div>
                <div className=' mb-5'>
                    <p className='form-label'>Bio*</p>
                    <input
                        type='text'
                        name='bio'
                        value={formData.bio}
                        onChange={handleInputChange}
                        placeholder='Bio'
                        className='form-input'>
                    </input>
                </div>
                <div className='mb-5'>
                    <div className=' grid grid-cols-3 gap-5 mb-[30px]'>
                        <div>
                            <p className='form-label'>Specialization*</p>
                            <select name='specialization' value={formData.specialization} onChange={handleInputChange}
                                className='form-input py-3.5'>
                                <option value=''>Select</option>
                                <option value='surgeon'>Surgeon</option>
                                <option value='neurologist'>Neurologist</option>
                                <option value='dermatologist'>Dermatologist</option>
                                <option value='Gynecology'>Gynecology</option>
                                <option value='Orthopedics'>Orthopedics</option>
                                <option value='Psychiatry'>Psychiatry</option>
                            </select>
                        </div>
                        <div>
                            <p className='form-label'>Gender*</p>
                            <select name='gender' value={formData.gender} onChange={handleInputChange}
                                className='form-input py-3.5'>
                                <option value=''>Select</option>
                                <option value='male'>Male</option>
                                <option value='female'>Female</option>
                                <option value='other'>Others</option>
                            </select>
                        </div>
                        <div>
                            <p className='form-label'>Ticket Price*</p>
                            <input
                                type='number'
                                name='ticketPrice'
                                value={formData.ticketPrice}
                                onChange={handleInputChange}
                                placeholder='Ticket Price'
                                className='form-input'>
                            </input>
                        </div>
                    </div>
                    <div className='mb-5'>
                        <p className='form-label'>Qualifications</p>
                        {formData.qualifications?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <div>
                                            <p className='form-label'>Starting Date*</p>
                                            <input
                                                type='date'
                                                name='startingDate'
                                                value={item.startingDate}
                                                className='form-input'
                                                onChange={e => handleQualificationChange(e, index)}>

                                            </input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Ending Date*</p>
                                            <input
                                                type='date'
                                                name='endingDate'
                                                value={item.endingDate}
                                                className='form-input'
                                                onChange={e => handleQualificationChange(e, index)}>

                                            </input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Degree*</p>
                                            <input
                                                type='text'
                                                name='degree'
                                                value={item.degree}
                                                className='form-input'
                                                onChange={e => handleQualificationChange(e, index)}>
                                            </input>
                                        </div>
                                        <div>
                                            <p className='form-label'>University*</p>
                                            <input
                                                type='text'
                                                name='university'
                                                value={item.university}
                                                className='form-input'
                                                onChange={e => handleQualificationChange(e, index)}>
                                            </input>
                                        </div>
                                    </div>
                                    <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer' onClick={e => deleteQualification(e, index)}>
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addQualification}>
                            Add Qualification
                        </button>
                    </div>
                    <div className='mb-5'>
                        <p className='form-label'>Experiences</p>
                        {formData.experiences?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className='grid grid-cols-2 gap-5'>
                                        <div>
                                            <p className='form-label'>Starting Date*</p>
                                            <input
                                                type='date'
                                                name='startingDate'
                                                value={item.startingDate}
                                                className='form-input'
                                                onChange={e => handleExperienceChange(e, index)}></input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Ending Date*</p>
                                            <input
                                                type='date'
                                                name='endingDate'
                                                value={item.endingDate}
                                                className='form-input'
                                                onChange={e => handleExperienceChange(e, index)}></input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Position*</p>
                                            <input
                                                type='text'
                                                name='position'
                                                value={item.position}
                                                className='form-input'
                                                onChange={e => handleExperienceChange(e, index)}></input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Hospital*</p>
                                            <input
                                                type='text'
                                                name='hospital'
                                                value={item.hospital}
                                                className='form-input'
                                                onChange={e => handleExperienceChange(e, index)}></input>
                                        </div>
                                    </div>

                                    <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-2 mb-[30px] cursor-pointer'
                                        onClick={e => deleteExperience(e, index)}>
                                        <AiOutlineDelete />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addExperience}>
                            Add Experience
                        </button>
                    </div>
                    <div className='mb-5'>
                        <p className='form-label'>Time Slots*</p>
                        {formData.timeSlots?.map((item, index) => (
                            <div key={index}>
                                <div>
                                    <div className='grid grid-cols-2  md:grid-cols-4 mb-[30px] gap-5'>
                                        <div>
                                            <p className='form-label'>Day*</p>
                                            <select name='day' value={item.day} className='form-input py-3.5'
                                                onChange={e => handleTimeslotChange(e, index)}>
                                                <option value="">Select</option>
                                                <option value="monday">Monday</option>
                                                <option value="tuesday">Tuesday</option>
                                                <option value="wednesday">Wednesday</option>
                                                <option value="thursday">Thursday</option>
                                                <option value="friday">Friday</option>
                                                <option value="saturday">Saturday</option>
                                                <option value="sunday">Sunday</option>
                                            </select>
                                        </div>
                                        <div>
                                            <p className='form-label'>Starting Time*</p>
                                            <input
                                                type='time'
                                                name='startingTime'
                                                value={item.startingTime}
                                                className='form-input'
                                                onChange={e => handleTimeslotChange(e, index)}></input>
                                        </div>
                                        <div>
                                            <p className='form-label'>Ending Time*</p>
                                            <input
                                                type='time'
                                                name='endingTime'
                                                value={item.endingTime}
                                                className='form-input'
                                                onChange={e => handleTimeslotChange(e, index)}></input>
                                        </div>
                                        <div className='flex items-center'>
                                            <button className='bg-red-600 p-2 rounded-full text-white text-[18px] mt-6 cursor-pointer' onClick={e => deleteTimeslot(e, index)}>
                                                <AiOutlineDelete />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button className='bg-[#000] py-2 px-5 rounded text-white h-fit cursor-pointer' onClick={addTimeSlot}>
                            Add Time Slot
                        </button>

                    </div>
                    <div className='mb-5'>
                        <p className='form-label'>About*</p>
                        <textarea
                            type='text'
                            name='about'
                            value={formData.about}
                            rows={5}
                            onChange={handleInputChange}
                            placeholder='Tell something about yourself.....'
                            className='form-input'>
                        </textarea>
                    </div>

                    <div className=' mb-5 flex items-center gap-3'>
                        {formData.photo && <figure className='w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center'>
                            <img src={formData.photo} alt='' className='w-full rounded-full' />
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
                </div>

                <div className=' mt-7'>
                    <button type='submit' onClick={updateProfileHandler} className=' bg-primaryColor text-white text-[18px] leading-[30px] w-full py-3 px-4 rounded-lg'>
                        Update Profle
                    </button>
                </div>
            </form>
        </div>
    )
}
