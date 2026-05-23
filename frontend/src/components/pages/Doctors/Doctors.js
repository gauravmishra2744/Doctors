import React from 'react';
import DoctorCard from '../../shared/DoctorCard';
import userFetchData from '../../../hooks/userFetchData'
import Loader from '../../Loader/Loading'
import Error from '../../Error/Error'

export default function Doctors() {
  const { data: doctors, loading, error } = userFetchData("/doctor/");
  return (
    <>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px] container'>
        {doctors.map(doctor => (
          <DoctorCard doctor={doctor} key={doctor._id} />
        ))}
      </div>
      }
    </>
  );
}
