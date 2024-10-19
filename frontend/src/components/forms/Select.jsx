import React from 'react'
import { useFormContext } from 'react-hook-form'

function Select({name , label , options , validation , ...props}) {

    const {register , formState:{errors}} = useFormContext()

  return (
    <>
        <div  className='flex flex-col'>
            <label >{label}</label>
            <select {...register(name,validation)} {...props}>
                {options&& options.map((option)=>(
                    <option key={option.value} value={option.value} className='bg-white'>
                        {option.label}
                    </option>
                ))}
            </select>
            {errors[name] && <p>{errors[name]?.message}</p>}
        </div>
    </>
  )
}

export default Select