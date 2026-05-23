import React from 'react';
import aboutImg from '../../assets/images/about.png';
import aboutCardImg from '../../assets/images/about-card.png';

const About = () => {
  return (
    <section className="py-16 container">
      <div className="container mx-auto">
        {/* First section */}
        <div className="mb-12">
          <h2 className="text-4xl font-bold text-center mb-6">Welcome to Our Hospital</h2>
          <p className="text-lg text-center">Welcome to Our Hospital, where we prioritize your health and well-being above all else. We're committed to providing exceptional medical care and ensuring a positive experience for all our patients.</p>
        </div>

        {/* Second section */}
        <section className='flex flex-col lg:flex-row gap-10 lg:gap-24 items-center'>
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
              <p className='text_para'>Our state-of-the-art facilities, combined with our compassionate approach to patient care, have earned us recognition as one of the leading healthcare institutions in the nation. We're honored to serve our community and remain committed to excellence in everything we do.</p>
            </div>
          </div>
        </section>

        {/* Third section */}
        <div className="my-12">
          <h2 className="text-4xl font-bold mb-6">Client Testimonials</h2>
          <div className="p-6">
            <div className="mb-4">
              <p className="text_para">"I've been a patient at Our Hospital for several years now, and I can't recommend it enough. The staff is friendly, the facilities are top-notch, and I always feel well taken care of."</p>
              <p className="text-gray-500 mt-2">- John Doe, Patient</p>
            </div>
            <div>
              <p className="text_para">"My experience at Our Hospital exceeded my expectations. The doctors are highly skilled and attentive, and the administrative staff made the appointment process seamless."</p>
              <p className="text-gray-500 mt-2">- Jane Smith, Patient</p>
            </div>
          </div>
        </div>

        {/* Fourth section */}
        <div>
          <h2 className="text-4xl font-bold mb-6">Our Commitment to Excellence</h2>
          <p className="text_para">At Our Hospital, we understand the importance of providing convenient access to quality healthcare services. That's why we offer flexible appointment scheduling options to accommodate your busy lifestyle. Whether you prefer to book online, over the phone, or in person, we make it easy to schedule your appointments at a time that works for you.</p>
        </div>
      </div>
    </section>
  );
};

export default About;
