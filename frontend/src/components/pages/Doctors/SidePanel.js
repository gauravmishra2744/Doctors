import React from 'react';
import convertTime from '../../../utils/convertTime';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export default function SidePanel({ doctorId, ticketPrice, timeSlots }) {
  const navigate = useNavigate();
  const bookingHandler = async () => {
    const token = localStorage.getItem('docToken');
    if (!token) {
      toast.error('Please login to book an appointment');
      return navigate('/login');
    }
    try {
      const response = await makeAuthPostReq(`/booking/checkout-session/${doctorId}`);

      if (!response.success) {
        throw new Error(response.message + '. Please try again');
      }

      if (response.session && response.session.url) {
        window.location.href= response.session.url
      }
    } catch (error) {
      toast.error(error.message);
      console.error(error);
    }
  };

  return (
    <div className='shadow-panelShadow p-3 lg:p-5 rounded-md'>
      <div className='flex items-center justify-between'>
        <p className='text_para mt-0 font-semibold'>Total Price</p>
        <span className='text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold'>
          Rs. {ticketPrice}/-
        </span>
      </div>

      <div className='mt-[30px]'>
        <p className='text_para mt-0 font-semibold text-headingColor'>Available Time Slots: </p>
      </div>
      <ul className='mt-3'>
        {timeSlots?.map((item, index) => (
          <li className='flex items-center justify-between mb-2' key={index}>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              {item.day.charAt(0).toUpperCase() + item.day.slice(1)}
            </p>
            <p className='text-[15px] leading-6 text-textColor font-semibold'>
              {convertTime(item.startingTime)} - {convertTime(item.endingTime)}
            </p>
          </li>
        ))}
      </ul>

      <button className='btn rounded-md w-full px-2 text-center' onClick={bookingHandler}>
        Book Appointment
      </button>
    </div>
  );
}
