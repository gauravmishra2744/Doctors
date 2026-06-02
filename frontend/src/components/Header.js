import React, { useRef, useContext } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import { BsMoonFill, BsSunFill } from 'react-icons/bs'
import logo from '../assets/images/logo.png'
import { AuthContext } from './context/AuthContext'
import { useDarkMode } from './context/DarkModeContext'

export default function Header() {
  const { user } = useContext(AuthContext)
  const { darkMode, toggleDarkMode } = useDarkMode()
  const token = localStorage.getItem('docToken')
  const menuRef = useRef(null)

  const navLinks = [
    { path: '/', display: 'Home' },
    { path: '/doctors', display: 'Find a Doctor' },
    { path: '/services', display: 'Services' },
    { path: '/about', display: 'About' },
    { path: '/contact', display: 'Contact' },
    { path: '/help', display: 'Help' },
  ]

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu')

  return (
    <header className={`sticky_header flex items-center transition-all duration-300 ${darkMode ? 'bg-gray-900 shadow-lg shadow-gray-800' : 'bg-white shadow-md'}`}>
      <div className='container'>
        <div className='flex items-center justify-between'>

          {/* Logo */}
          <Link to='/'>
            <img src={logo} alt='Medicare' className={`h-10 ${darkMode ? 'brightness-200' : ''}`} />
          </Link>

          {/* Nav Links */}
          <div className='navigation' ref={menuRef} onClick={toggleMenu}>
            <ul className={`menu flex items-center gap-[2.7rem] ${darkMode ? 'bg-gray-900' : 'bg-white'}`}>
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink
                    to={link.path}
                    className={({ isActive }) =>
                      isActive
                        ? 'text-primaryColor text-[16px] leading-7 font-[600] border-b-2 border-primaryColor pb-1'
                        : `text-[16px] leading-7 font-[500] hover:text-primaryColor transition-colors duration-200 ${darkMode ? 'text-gray-200' : 'text-textColor'}`
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Right Side */}
          <div className='flex items-center gap-4'>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className={`w-[42px] h-[42px] rounded-full flex items-center justify-center transition-all duration-300 cursor-pointer border-2 ${
                darkMode
                  ? 'bg-gray-700 border-gray-500 text-yellow-400 hover:bg-gray-600'
                  : 'bg-blue-50 border-blue-200 text-gray-700 hover:bg-blue-100'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {darkMode ? <BsSunFill size={18} /> : <BsMoonFill size={16} />}
            </button>

            {/* Profile / Login */}
            {token && user ? (
              <Link to={user.role === 'doctor' ? '/doctors/profile/me' : '/users/profile/me'}>
                <div className='flex items-center gap-2 cursor-pointer'>
                  <figure className={`w-[40px] h-[40px] rounded-full border-2 ${darkMode ? 'border-blue-400' : 'border-primaryColor'} overflow-hidden`}>
                    <img
                      src={user.photo || 'https://via.placeholder.com/40'}
                      className='w-full h-full object-cover'
                      alt={user.name}
                    />
                  </figure>
                </div>
              </Link>
            ) : (
              <Link to='/login'>
                <button className='bg-primaryColor hover:bg-blue-700 transition-colors duration-200 py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px] shadow-md hover:shadow-lg'>
                  Login
                </button>
              </Link>
            )}

            {/* Mobile Menu Toggle */}
            <span className={`md:hidden cursor-pointer ${darkMode ? 'text-white' : 'text-gray-800'}`} onClick={toggleMenu}>
              <BiMenu className='w-7 h-7' />
            </span>
          </div>
        </div>
      </div>
    </header>
  )
}
