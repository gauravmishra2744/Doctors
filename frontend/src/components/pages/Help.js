import React from 'react'
import { Link } from 'react-router-dom'
import FaqList from '../Faqs/FaqList'
import faqImg from '../../assets/images/faq-img.png';
import HelpImage from '../../assets/images/help-image.png'

export default function Help() {
    return (
        <div>
            <section className="py-16">
                <div className='container'>
                    <div className='mb-12'>
                        <h2 className='heading text-center'>Our Medical Services</h2>
                        <p className='text_para text-center'>
                            World Class care for everyone. Our health system offers unmatched, expert health care.
                        </p>
                    </div>
                    <div className='flex items-center justify-between flex-col lg:flex-row container'>
                        {/* feature content */}
                        <div className='xl:w-[670px]'>
                            <ul className='pl-4'>
                                <li className='text_para'>
                                    <strong>1. Schedule directly with a known physician:</strong>
                                    <p className="mt-2">
                                        If you already know the physician you'd like to see, you can often schedule an appointment directly through their online profile. Simply search for them using our physician directory and click on the "Book Now" button next to their name.
                                    </p>
                                </li>
                                <li className='text_para'>
                                    <strong>2. Search for a physician:</strong>
                                    <p className="mt-2">
                                        Not sure who to see? Our physician directory allows you to search by specialty, location, insurance, and availability. Once you've found a physician you're interested in, you can view their profile, read patient reviews, and schedule an appointment online.
                                    </p>
                                </li>
                                <li className='text_para'>
                                    <strong>3. Use the online scheduling tool:</strong>
                                    <p className="mt-2">
                                        Our online scheduling tool makes it easy to find available appointment times that fit your schedule. You can view open slots for multiple physicians at once, making it easy to compare options and find the best fit for you.
                                    </p>
                                </li>
                                <li className="text_para">
                                    <strong>4. Book your appointment and pay:</strong>
                                    <p className="mt-2">
                                        Once you've found an appointment time that works for you, simply click the "Book Appointment" button. You'll be prompted to create an account or log in if you already have one. Then, you'll be able to securely pay any associated fees and confirm your appointment.
                                    </p>
                                </li>
                                <li className="text_para">
                                    <strong>5. Receive confirmation and reminders:</strong>
                                    <p className="mt-2">
                                        You'll receive a confirmation email with all the details of your appointment, including date, time, location, and any instructions for joining the virtual session. We'll also send you helpful reminders before your appointment to ensure you don't miss it.
                                    </p>
                                </li>
                            </ul>
                            <div className="flex items-center justify-between">
                                <Link to="/doctors" className="btn btn-primary text-white">Search for Physicians</Link>
                            </div>
                        </div>
                        {/* features images */}
                        <div className='relative z-10 max-w-[600px] flex justify-end mt-[50px] lg:mt-0'>
                            <img src={HelpImage} alt=''></img>
                        </div>
                    </div>
                </div>
            </section>

            {/* faqs section */}
            <section>
                <div className='container'>
                    <div className='flex justify-between gap-[50px] lg:gap-0 container'>
                        <div className='w-1/2 hidden md:block'>
                            <img src={faqImg} alt=''></img>
                        </div>

                        <div className='w-full md:w-1/2'>
                            <h2 className='heading'>Most Asked Questions</h2>
                            <FaqList />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}
