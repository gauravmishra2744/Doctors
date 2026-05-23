import React, { useState } from 'react'
import Loader from '../../components/Loader/Loading';
import Error from '../../components/Error/Error'
import userGetProfile from '../../hooks/userFetchData';
import Tabs from './Tabs';
import starIcon from '../../assets/images/Star.png'
import AboutDoctor from '../../components/pages/Doctors/AboutDoctor';
import Profile from './Profile';
import Appointments from './Appointments';

export default function Dashboard() {
  const { data, loading, error } = userGetProfile("/doctor/profile/me")

  const [tab, setTab] = useState('overview');

  return (
    <section>
      <div className='max-w-[1170px] px-5 mx-auto'>
        {loading && !error && <Loader />}
        {error && !loading && <Error />}
        {
          !loading && !error && (
            <div className='grid lg:grid-cols-3 gap-[30px] lg:gap-[50px]'>
              <Tabs tab={tab} setTab={setTab} />
              <div className='lg:col-span-2'>
                {data.isApproved === 'pending' && (
                  <div className='flex p-4 mb-4 text-yellow-800 bg-yellow-50 rounded-lg'>
                    <svg
                      aria-hidden='true'
                      className='flex-shrink-0 w-5 h-5'
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor">
                      <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 15V17H13V15H11ZM11 7V13H13V7H11Z"></path>
                    </svg>

                    <span className='sr-only'>Info</span>
                    <div className='ml-3 text-sm font-medium'>
                      To get approval, please complete your profile. We will review manully and approve within 3 days.
                    </div>
                  </div>
                )}

                <div className='mt-8'>
                  {tab === 'overview' && (
                    <div>
                      <div className=' grid sm:grid-cols-3 mb-10'>
                        <div className='flex justify-center mb-4'>
                          <figure className='max-w-[200px] max-h-[200px]'>
                            <img src={data?.photo} alt='' className='w-full'></img>
                          </figure>
                        </div>

                        <div className=' col-span-2'>
                          <div>
                            <div className='bg-[#CCF0F3] text-irisBlueColor py-1 px-4 lg:py-2 lg:px-6 rounded text-[12px] leading-4 lg:text-[16px] lg:leading-6 font-semibold max-w-[150px]'>
                              {data.specialization}
                            </div>

                            <h3 className='text-[22px] leading-9 font-bold text-headingColor mt-3'>
                              {data.name}
                            </h3>
                            <div className='flex items-center gap-[6px] mt-2'>
                              <span className='flex items-center gap-[6px] text-headingColor text-[14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                <img src={starIcon} alt=''></img>
                                {data.averageRating}
                              </span>
                              <span className=' text-textColor text-][14px] leading-5 lg:text-[16px] lg:leading-6 font-semibold'>
                                ({data.totalRating})
                              </span>
                            </div>

                            <p className='text-para font-semibold mt-4'>Contact No. <span className=' text-green-600 font-bold'>{data?.phone}</span></p>
                            <p className='mt-4 font-[14px] leading-6'>
                              {data?.bio}
                            </p>
                          </div>
                        </div>
                      </div>
                      <AboutDoctor doctor={data} />
                    </div>
                  )}

                  {tab === 'appointments' && <div><Appointments appointments={data.appointments} /></div>}
                  {tab === 'profile' && <div><Profile doctorData={data} /></div>}
                </div>
              </div>
            </div>
          )
        }
      </div>
    </section>
  )
}
