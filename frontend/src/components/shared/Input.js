export default function textInput({placeholder, type, value, setValue }) {
  return (
    <div className='mb-5'>
      <input
        type={type}
        placeholder={placeholder}
        name={type}
        value={value}
        className='w-full px-2 py-3 border-b-[1.6px] border-solid border-[#7d808561] focus:outline-none focus:border-b-primaryColor text-[16px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer'
        required
        onChange={(e) => {
          setValue(e.target.value);
        }}
      />
    </div>
  )
}
