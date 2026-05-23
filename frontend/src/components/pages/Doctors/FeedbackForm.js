import React, { useState } from 'react';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { makeAuthPostReq } from '../../../utils/serverHelper';
import HashLoader from 'react-spinners/HashLoader';

export default function FeedbackForm() {
    const [reviewText, setReviewText] = useState("");
    const [rating, setRating] = useState(null);
    const [hover, setHover] = useState(null);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (!rating || !reviewText) {
                setLoading(false);
                return toast.error("Rating and Review fields are required");
            }

            const res = await makeAuthPostReq(`/doctor/${id}/review/`, { rating, reviewText });
            console.log(res);
            if (!res.ok) {
                throw new Error(res.message);
            }

            setLoading(false);
            toast.success(res.message);
        } catch (err) {
            setLoading(false);
            console.log(err);
            toast.error(err.message);
        }
    };

    return (
        <form action=''>
            <div>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    How would you rate the overall experience?*
                </h3>
                <div>
                    {[...Array(5)].map((_, index) => {
                        const btnIndex = index + 1;
                        return (
                            <button
                                key={index}
                                type='button'
                                className={`${
                                    btnIndex <= (hover || rating) ? "text-yellowColor" : "text-gray-400"
                                } bg-transparent border-none outline-none text-[22px] cursor-pointer`}
                                onClick={() => setRating(btnIndex)}
                                onMouseEnter={() => setHover(btnIndex)}
                                onMouseLeave={() => setHover(rating)}
                                onDoubleClick={() => {
                                    setHover(null);
                                    setRating(null);
                                }}
                            >
                                <span>
                                    <AiFillStar />
                                </span>
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className='mt-[30px]'>
                <h3 className='text-headingColor text-[16px] leading-6 font-semibold mb-4 mt-0'>
                    Share your feedback or suggestions*
                </h3>

                <textarea
                    className='border border-solid border-[#0066ff34] focus:outline outline-primaryColor w-full px-4 py-3 rounded-md'
                    rows='5'
                    placeholder='Write your message'
                    onChange={(e) => setReviewText(e.target.value)}
                ></textarea>
            </div>
            <button type='submit' className='btn' onClick={handleSubmit}>
                {loading ? <HashLoader size={25} color='#fff' /> : 'Submit Feedback'}
            </button>
        </form>
    );
}
