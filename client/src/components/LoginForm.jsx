import React from 'react'

const LoginForm = ({type,labelName,name,placeholder,value,handleChange}) => {
  return (
    <div>
      <div className='flex items-center gap-2 mb-2'>
        <label 
        htmlFor={name}
        className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
      </div>
      <input
      name={name}
      type={type}
      id={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      required
      className='bg-gray-50 border border-gray-300 
      text-gray-900 text-sm rounded-lg 
      focus:ring-[#4649ff] focus:border-[#4649ff]
      outline-none block w-50% p-3'/>
    </div>
  )
}

export default LoginForm