import axios from 'axios'
import React from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'

function Delete({offre , handleDelete}) {

    const url = useSelector(state=>state.backendUrl.value)
    const id = offre.id
    const toastconfig = useSelector(state=>state.toastConfig.value)

    const submit = async()=>{
        try {
            const submited = await axios.delete(`${url}/offre/${id}`)
            if(submited){
                const message ="Action reussite !"
                handleDelete()
                toast.success(message , toastconfig)
            }
        } catch (error) {
            console.log(error);
            
        }
    }
  return (
    <>
        <div className='text-[18px] mb-6'>Suppression d'offre</div>
        <div className='flex flex-col'>
            <div className='text-[18px] mb-3'>Voulez vous supprimer cet element ?</div>
            <div className='flex flex-row justify-end items-center text-white'>
                <button className='bg-gray-600 px-4 py-1 hover:bg-gray-700 mr-2 rounded-[8px]' onClick={()=>{handleDelete()}} >Annuler</button>
                <button className='bg-red-500 px-4 py-1 rounded-[8px] hover:bg-red-600' onClick={()=>{submit()}}>Supprimer</button>
            </div>
        </div>
    </>
  )
}

export default Delete