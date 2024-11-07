import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Cancel({ interview , handleCancel }) {

  const url = useSelector(state=>state.backendUrl.value)
  const toastconfig = useSelector(state=>state.toastConfig.value)
  const id = interview.id

  const submit = async()=>{
    try {
      const deleted = await axios.delete(`${url}//enretient/cancel/${id}`)
      if(deleted){
        const message = "Action reussite !"
        handleCancel()
        toast.success(message , toastconfig )
      }
    } catch (error) {
      console.log(error)
    }
  }

  const onSubmit = ()=>{
    submit()
  }

  return (
    <>
      <div className='mb-4 text-[20px]'>Annulation d'un entretient:</div>
      <div className='text-[18px]'>
        Voulez vous vraiment annuler cet entretient ?
      </div>
      <div className='mt-4 flex flex-row justify-end items-center text-white'>
          <button className='mr-2 px-4 py-1 bg-gray-600 rounded-[8px] hover:bg-gray-700' onClick={()=>{handleCancel()}}>Annuler</button>
          <button className='px-4 py-1 bg-red-500 rounded-[8px] hover:bg-red-600' onClick={()=>{onSubmit()}}>Valider</button>
      </div>
    </>
  )
}

export default Cancel