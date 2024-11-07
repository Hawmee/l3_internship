import React, { useEffect } from 'react'
import { FormProvider } from 'react-hook-form'
import Input from '../../../../components/forms/Input'
import DatePicker from '../../../../components/forms/DatePicker'
import { addDays, format, startOfToday } from 'date-fns'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { formatDate } from '../../../../functions/Functions'

function Edit({method , interview , handleEdit}) {

  const url = useSelector(state=>state.backendUrl.value)
  const id = interview.id
  const toastconfig = useSelector(state=>state.toastConfig.value)
  const {reset} = method
  const today_date = startOfToday()
  const today = format(today_date, "yyyy-MM-dd'T'HH:mm");
  const afterOneDay = format(addDays(today , 1) , "yyyy-MM-dd'T'HH:mm")

  const submit = async(data)=>{
    try {
      const submited = await axios.patch(`${url}/entretient/${interview.id}` , data)
      if(submited){
          const message = "Action reussite !"
          toast.success(message , toastconfig)
          handleEdit()            
      }
    } catch (error) {
      console.log(error);
      
    }
  }

  const onSubmit = (data)=>{
    const body = {
      date_interview:format(data.date_interview , "yyyy-MM-dd'T'HH:mm:ss.000'Z")
    }
    
    submit(body)
    // console.log(body);
    
  }

  useEffect(()=>{
    if(interview){
      reset({
        date_interview:format(formatDate(interview.date_interview) , "yyyy-MM-dd'T'HH:mm")
      })
    }
  } , [interview])


  return (
    <>
    <div className='flex flex-col min-w-[25vw]'>
        <div className='mb-4 text-[18px]'>
            Modification date d'entretient
        </div>
        <div>
            <FormProvider {...method} >
                <form onSubmit={method.handleSubmit(onSubmit)}>

                    <div className='mb-3'>
                        <DatePicker 
                            label={"Date d'entretient"}
                            name={"date_interview"}
                            validation={{
                                required: "Valeur requise",
                            }}
                            type="datetime-local"
                            min={afterOneDay}
                        />
                    </div>

                    <div className="flex flex-row justify-end mt-6">
                        <button className='bg-blue-500 text-white px-4 py-1 rounded-[8px] hover:bg-blue-600'>
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    </div>
</>
  )
}

export default Edit