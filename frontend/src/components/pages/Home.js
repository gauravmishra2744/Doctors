import React from 'react';
import { Link } from 'react-router-dom';
import heroImg01 from '../../assets/images/hero-img01.png';
import heroImg02 from '../../assets/images/hero-img02.png';
import heroImg03 from '../../assets/images/hero-img03.png';
import icon01 from '../../assets/images/icon01.png';
import icon02 from '../../assets/images/icon02.png';
import icon03 from '../../assets/images/icon03.png';
import featureImg from '../../assets/images/feature-img.png'
import videoIcon from '../../assets/images/video-icon.png'
import avatarIcon from '../../assets/images/avatar-icon.png'
import { BsArrowRight } from 'react-icons/bs';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';
import ServiceList from '../ServiceList';
import Doctors from './Doctors/Doctors';
import faqImg from '../../assets/images/faq-img.png';
import FaqList from '../Faqs/FaqList';
import Reviews from '../Reviews';

export default function Home() {
  return <>
    <section className='hero_section pt-[60px] 2xl:h-[800px]'>
      <div className='container'>
        <div className='flex flex-col lg:flex-row gap-[90px] items-center justify-between container'>
          {/* introduction section */}
          <div>
            <div className='lg:w-[570px]'>
              <h1 className='text-[36px] leading-[46px] text-headingColor font-[800] md:text-[60px] md:leading-[60px]'>We help patients live a healthy, longer life.
              </h1>
              <p className='text_para'>
                Welcome to our state-of-the-art Doctor Appointment System, where your health is our top priority. Our user-friendly platform is designed to seamlessly connect patients with their preferred healthcare providers, offering a convenient and efficient way to schedule appointments. Experience the ease of exploring doctor availability, receiving timely reminders, and providing valuable feedback after each visit. Join us in revolutionizing the way you manage your health, where comprehensive care meets modern convenience. Your well-being, our commitment.
              </p>

              <Link to="/doctors"><button className='btn'>Request an Appointment</button></Link>
            </div>

            <div className='mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]'>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:taxt-[44px] lg:leading-[54px] font-[700] text-headingColor'>30+</h2>
                <span className='w-[100px] h-2 bg-yellowColor rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Years of Experience</p>
              </div>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:taxt-[44px] lg:leading-[54px] font-[700] text-headingColor'>15+</h2>
                <span className='w-[100px] h-2 bg-purpleColor rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Clinic Locations</p>
              </div>
              <div>
                <h2 className='text-[36px] leading-[56px] lg:taxt-[44px] lg:leading-[54px] font-[700] text-headingColor'>100%</h2>
                <span className='w-[100px] h-2 bg-irisBlueColor rounded-full block mt-[-14px]'></span>
                <p className='text_para'>Patient Satisfaction</p>
              </div>
            </div>

          </div>

          {/* doctor images section */}
          <div className='flex gap-[30px] justify-end'>
            <div>
              <img className='w-full' src={heroImg01} alt='' />
            </div>
            <div className='mt-[30px]'>
              <img className='w-full mb-[30px]' src={heroImg02} alt='' />
              <img className='w-full' src={heroImg03} alt='' />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* page end */}
    <section>
      <div className='container'>
        <div className='lg:w[470px] mx-auto'>
          <h2 className='heading text-center'>
            Providing the best medical services
          </h2>
          <p className='text_para text-center'>
            World-class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]'>
        <div className='py-[30px] px-5'>
          <div className='flex items-center justify-center'>
            <img src={icon01} alt=''></img>
          </div>
          <div className='mt-[30px]'>
            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
              Find a doctor
            </h2>
            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
              From the Lab to the Clinic.
            </p>
            <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'><BsArrowRight className='group-hover:text-white w-6 h-5' /></Link>
          </div>
        </div>
        <div className='py-[30px] px-5'>
          <div className='flex items-center justify-center'>
            <img src={icon02} alt=''></img>
          </div>
          <div className='mt-[30px]'>
            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
              Find a Location
            </h2>
            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
              From the Lab to the Clinic.
            </p>
            <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'><BsArrowRight className='group-hover:text-white w-6 h-5' /></Link>
          </div>
        </div>
        <div className='py-[30px] px-5'>
          <div className='flex items-center justify-center'>
            <img src={icon03} alt=''></img>
          </div>
          <div className='mt-[30px]'>
            <h2 className='text-[26px] leading-9 text-headingColor font-[700] text-center'>
              Book Appointment
            </h2>
            <p className='text-[16px] leading-7 text-textColor font-[400] mt-4 text-center'>
              From the Lab to the Clinic.
            </p>
            <Link to='/doctors' className='w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none'><BsArrowRight className='group-hover:text-white w-6 h-5' /></Link>
          </div>
        </div>
      </div>
    </section>

    {/* about section */}
    <section>
      <div className="container">
        <div className='flex justify-between gap-[50px] lg:gap-[130px] xl:gap-0 flex-col lg:flex-row container'>
          {/* about images */}
          <div className='relative w-3/4 lg:w-1/2 xl:w-[770px] z-10 order-2 lg:order-1'>
            <img src={aboutImg} alt=''></img>
            <div className='absolute z-20 bottom-4 w-[200px] md:w-[300px] right-[-30%] md:right-[-7%] lg:right-[22%]'>
              <img src={aboutCardImg} alt=''></img>
            </div>
          </div>

          {/* about content */}
          <div className='w-full lg:w-1/2 xl:w-[670px] order-1 lg:order-2'>
            <h2 className='heading'>Proud to be one of the nations best</h2>
            <p className='text_para'>For 30 years consecutively, U.S. News and World Report has honored us as one of the leading public healthcare institutions. Our dedication to patient care and medical excellence drives us to deliver personalized and comprehensive services. From routine check-ups to complex treatments, our team of skilled physicians and support staff is committed to providing you with the best possible care.</p>
            <Link to='/about'><button className='btn'>Learn More</button></Link>
          </div>
        </div>
      </div>
    </section>
    {/* Services section */}
    <section>
      <div className='container'>
        <div className='xl:w-[470x] mx-auto'>
          <h2 className='heading text-center'>Our Medical Services</h2>
          <p className='text_para text-center'>
            World Class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
        <ServiceList />
      </div>
    </section>

    {/* feature section */}
    <section>
      <div className='container'>
        <div className='flex items-center justify-between flex-col lg:flex-row container'>
          {/* feature content */}
          <div className='xl:w-[670px]'>
            <h2 className='heading'>
              Get virtual treatment <br /> anytime.
            </h2>
            <ul className='pl-4'>
              <li className='text_para'>
                1. Schedule the appointment directly.
              </li>
              <li className='text_para'>
                2. Search for your physician here, and contact their office.
              </li>
              <li className='text_para'>
                3. View our physicians who are accepting new patients, use the online scheduling tool to select an appointment time.
              </li>
            </ul>
            <Link to='/help'><button className='btn'>Learn More</button></Link>
          </div>
          {/* features images */}
          <div className='relative z-10 xl:w-[770px] flex justify-end mt-[50px] lg:mt-0'>
            <img src={featureImg} className='w-3/4' alt=''></img>

            <div className='w-[150px] lg:w-[248px] bg-[#fefafa] absolute bottom-[50px] left-0 md:bottom-[100px] md:left-5 z-20 p-2 pb-3 lg:pt-4 lg:px-4 lg:pb-[26px] rounded-[10px]'>
              <div className='flex items-center justify-between'>
                <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-headingColor font-[600]'>
                  Tue, 24
                </p>
                <p className='text-[10px] leading-[10px] lg:text-[14px] lg:leading-5 text-textColor font-[400]'>
                  10:00AM
                </p>
                <span className='w-5 h-5 lg:w-[34px] flex items-center justify-center bg-yellowColor rounded py-1 px-[6px] lg:py-3 lg:px-[9px]'>
                  <img src={videoIcon} alt='' />
                </span>
              </div>

              <div className='w-[65px] lg:w-[96px] bg-[#CCF0F3] py-1 px-2 lg:py-[6px] lg:px-[10px] text-[8px] leading-[8px] lg:text-[12px] lg:leading-4 text-irisBlueColor font-[500] mt-2 lg:mt-4 rounded-full'>
                Consultation
              </div>
              <div className='flex items-center gap-[6px] lg:gap-[10px] mt-2 lg:mt-[18px]'>
                <img src={avatarIcon} alt=''></img>
                <h4 className='text-[10px] leading-3 lg:text-[16px] lg:leading-[22px] font-[700] text-headingColor'>Aditya Gangwar</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* doctors section */}
    <section>
      <div className='container'>
        <div className='xl:w-[470x] mx-auto'>
          <h2 className='heading text-center'>Our great Doctors</h2>
          <p className='text_para text-center'>
            World Class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
        <Doctors />
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

    {/* Reviews section */}
    <section>
      <div className='container'>
        <div className='xl:w-[470x] mx-auto'>
          <h2 className='heading text-center'>What our Patients say</h2>
          <p className='text_para text-center'>
            World Class care for everyone. Our health system offers unmatched, expert health care.
          </p>
        </div>
        <Reviews />
      </div>
    </section>
  </>
}
