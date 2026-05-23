import React from 'react'
import toast from 'react-hot-toast';

export default function Contact() {
  return (
    <section>
      <div className="px-4 mx-auto max-w-screen-md">
        <h2 className="heading text-center">Contact Us</h2>
        <p className="mb-8 lg:mb-16 font-light text-center text_para">
          Got an issue? Want to send feedback about a beta feature? Let
          us know.
        </p>
        <form action="#" className="space-y-8">
          <div>
            <label htmlFor="email" className="form-label">
              Your Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="example@gmail.com"
              className="form-input mt-1 rounded-md"
            />
          </div>
          <div>
            <label htmlFor="subject" className="form-label">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Let us know, how we can help you?"
              className="form-input mt-1 rounded-md"
            />
          </div>

          <div className='sm:col-span-2'>
            <label htmlFor='message' className='form-label'>
              Your message
            </label>
            <textarea
              rows='6'
              type='text'
              placeholder='Leave a comment....'
              className='form-input mt-1 rounded-md'
            />
          </div>
          <button type='submit' className='btn rounded sm:w-fit' onClick={() => {
            toast.success("Email sent successfully!")
            window.location.reload();
          }}>Submit</button>
        </form>
      </div> I
    </section>
  )
}
