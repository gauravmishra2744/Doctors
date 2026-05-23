import React from 'react'
import { formatDate } from '../../../utils/formatDate'

export default function AboutDoctor({ doctor }) {
    return (
        <div>
            <div>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold flex items-center gap-2'>
                    About
                    <span className=' text-irisBlueColor font-bold text-[24px] leading-9'>
                        {doctor.name}
                    </span>
                </h3>
                <p className='text_para'>
                    {doctor.about ? doctor.about : `${doctor.name} is a skilled ${doctor.specialization?.toLowerCase()} with
                    a passion for providing exceptional healthcare. With an impressive total
                    rating of ${doctor.totalRating} and an average rating of ${doctor.avgRating}, ${doctor.name} has
                    successfully treated ${doctor.totalPatients} patients. ${doctor.name} is affiliated with ${doctor.hospital}
                    and is dedicated to delivering the highest standard of care to the community.`}
                </p>
            </div>
            <div className=' mt-10'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Education
                </h3>

                <ul className='pt-4 md:p-5'>
                    {doctor.qualifications?.map((item, index) => (
                        <li className='flex flex-col sm:flex-row sm:justify-between sm:items-end md:gap-5 mb-[30px]' key={index}>
                            <div>
                                <span className=' text-irisBlueColor text-[15px] leading-6 font-semibold'>
                                    {formatDate(item.startingDate)} -   {formatDate(item.endingDate)}
                                </span>
                                <p className='text-[16px] leading-6 font-medium text-textColor'>{item.degree}</p>
                            </div>
                            <p className='text-[14px] leading-5 font-medium text-textColor'>
                                {item.university}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>

            <div className='mt-0'>
                <h3 className='text-[20px] leading-[30px] text-headingColor font-semibold'>
                    Experience
                </h3>
                <ul className='grid sm:grid-cols-2 gap-[30px] pt-4 md:p-5'>
                    {doctor.experiences?.map((item, index) => (
                        <li className='p-4 rounded bg-[#fff9ea]' key={index}>
                            <span className=' text-yellowColor text-[15px] leading-6 font-semibold'>
                                {formatDate(item.startingDate)} -   {formatDate(item.endingDate)}
                            </span>
                            <p className='text-[16px] leading-5 font-medium text-textColor mt-3'>
                                {item.position}
                            </p>
                            <p className='text-[15px] leading-5 font-medium text-textColor mt-3'>
                                {item.hospital}
                            </p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}
