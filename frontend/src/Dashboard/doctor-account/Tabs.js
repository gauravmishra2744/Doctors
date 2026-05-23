import React, { useContext, useRef } from 'react'
import { BiMenu } from 'react-icons/bi';
import { AuthContext } from '../../components/context/AuthContext';


export default function Tabs({ tab, setTab }) {
  const { dispatch } = useContext(AuthContext);

  const handleLogout = () => {
    localStorage.removeItem("docToken");
    dispatch({ type: "LOGOUT" });
  }

  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle('show_tab');

  return (
    <div>
      <span className='lg:hidden' onClick={toggleMenu}>
        <BiMenu className='w-6 h-6 cursor-pointer' />
      </span>
      <div className='hidden lg:flex flex-col p-[30px] bg-white shadow-panelShadow items-center h-max rounded-md' ref={menuRef} onClick={toggleMenu}>
        <button
          className={`${tab === 'overview' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
          onClick={() => setTab('overview')}>
          Overview
        </button>
        <button
          className={`${tab === 'appointments' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
          onClick={() => setTab('appointments')}>
          Appointments
        </button>
        <button
          className={`${tab === 'profile' ? 'bg-indigo-100 text-primaryColor' : 'bg-transparent text-headingColor'} w-full btn mt-0 rounded-md`}
          onClick={() => setTab('profile')}>
          Profile
        </button>
        <div className='mt-[50px] md:mt-[100px] w-full'>
          <button className='w-full bg-[#181A1E] p-3 text-[16px] leading-7 rounded-md text-white mb-2' onClick={handleLogout}>
            Logout
          </button>
          <button className='w-full bg-red-600 p-3 text-[16px] leading-7 rounded-md text-white mt-3'>
            Delete Account
          </button>
        </div>
      </div>

    </div>
  )
}
