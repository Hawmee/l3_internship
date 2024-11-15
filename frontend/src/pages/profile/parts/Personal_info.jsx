import React from 'react'
import Pers_info from '../forms/Pers_info'

function Personal_info() {
  return (
    <>
        <div className='flex flex-col items-start px-4 py-4 w-full border-2 border-gray-300  rounded-lg '> 
                <div className='underline underline-offset-4'>
                    INFORMATIONS PERSONNELLES:
                </div>
                <div className="mt-3 w-full">
                    <Pers_info />
            </div>
        </div>
    </>
  )
}

export default Personal_info