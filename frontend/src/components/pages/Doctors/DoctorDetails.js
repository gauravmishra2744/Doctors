import React, { useState} from 'react';
import { useParams } from 'react-router-dom';
import starIcon from '../../../assets/images/Star.png';
import AboutDoctor from './AboutDoctor';
import Feedback from './Feedback';
import SidePanel from './SidePanel';
import userFetchData from '../../../hooks/userFetchData'
import Loader from '../../Loader/Loading'
import Error from '../../Error/Error'

export default function DoctorDetails() {
  const [tab, setTab] = useState("about");
  const id = useParams().id;
  // console.log(id);
  const { data: doctor, loading, error } = userFetchData("/doctor/" + id);
  return <section>
    <div className='max-w-[1170px] px-5 mx-auto'>
      {loading && <Loader />}
      {error && <Error />}

      {!loading && !error && <div className='grid md:grid-cols-3 gap-[50px]'>
        <div className='md:col-span-2'>
          <div className='grid sm:grid-cols-3'>
            <div className='mb-4 flex justify-center'>
              <img src={doctor?.photo} alt='' className='max-w-[200px] max-h-[230px]' />
            </div>

            <div className='flex col-span-2'>
              <div>
                <div className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold max-w-[150px]'>
                  {doctor.specialization}
                </div>

                <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>
                  {doctor.name}
                </h3>
                <div className='flex items-center gap-[6px] mt-2'>
                  <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                    <img src={starIcon} alt=''></img>
                    {doctor.averageRating}
                  </span>
                  <span className=' text-textColor text-][14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                    ({doctor.totalRating})
                  </span>
                </div>

                <p className='text-para font-semibold mt-4'>Contact No. <span className=' text-green-600 font-bold'>{doctor?.phone}</span></p>
                <p className='mt-4 font-[14px] leading-6'>
                  {doctor?.bio}
                </p>
              </div>
            </div>
          </div>

          <div className='mt-[50px] border-b border-solid border-[#0066ff34]'>
            <button onClick={() => setTab('about')}
              className={`${tab === 'about' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
            >About</button>
            <button onClick={() => setTab('feedback')}
              className={`${tab === 'feedback' && 'border-b border-solid border-primaryColor'} py-2 px-5 mr-5 text-[16px] leading-7 text-headingColor font-semibold`}
            >Feedback</button>
          </div>
          <div className='mt-[50px]'>
            {tab === 'about' && <AboutDoctor doctor={doctor} />}
            {tab === 'feedback' && <Feedback reviews={doctor.reviews} totalRating={doctor.totalRating} />}
          </div>
        </div>

        <div>
          <SidePanel doctorId={doctor._id} ticketPrice={doctor.ticketPrice} timeSlots={doctor.timeSlots} />
        </div>
      </div>}
    </div>
  </section>
}
