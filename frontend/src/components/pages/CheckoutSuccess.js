import React from 'react'
import {Link} from 'react-router-dom';
import successImg from '../../assets/images/success.gif';

export default function CheckoutSuccess() {
  return (
    <div className='bg-gray-100 h-screen'>
        <div className=' bg-white p-6 md:m-auto'>
            {/* image */}
            <figure>
                <img src={successImg} alt='' className='mx-auto'></img>
            </figure>
            <div className=' text-center'>
                <h3 className=' md:text-2xl text-base text-gray-900 font-semibold text-center'>
                    Payment Done
                </h3>
                <p className=' text-gray-600 my-2'>
                    Thank you for completing your secure online Payment.
                </p>
                <p>Have a great day!</p>

                <div className=' py-10 text-center'>
                    <Link to="/"
                    className=' px-12 bg-green-800 text-white font-semibold py-3'>
                        Go back to Home
                    </Link>
                </div>
            </div>
        </div>
    </div>
  )
}
