import React from 'react'
import {Routes, Route} from 'react-router-dom';
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Services from '../pages/Services';
import Login from '../pages/Login';
import Register from '../pages/Register';
import FindDoctor from '../pages/Doctors/findDoctor';
import DoctorDetails from '../pages/Doctors/DoctorDetails';
import About from '../pages/About';
import MyAccount from '../../Dashboard/user-account/MyAccount';
import Dashboard from '../../Dashboard/doctor-account/Dashboard';
import ProtectedRoutes from './ProtectedRoutes';
import Help from '../pages/Help';
import CheckoutSuccess from '../pages/CheckoutSuccess';

export default function routers() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/services' element={<Services />} />
      <Route path='/doctors' element={<FindDoctor/>} />
      <Route path='/doctors/:id' element={<DoctorDetails />} />
      <Route path='/users/profile/me' element={<ProtectedRoutes allowedRoles={['patient']}><MyAccount/></ProtectedRoutes>} />
      <Route path='/doctors/profile/me' element={<ProtectedRoutes allowedRoles={['doctor']}><Dashboard/></ProtectedRoutes>} />
      <Route path='/about' element={<About />} />
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/help' element={<Help />} />
      <Route path='/checkout-success' element={<CheckoutSuccess />} />
      <Route path='*' element={<Home />} />
    </Routes>
  );
}
