import React from 'react'
import { FormProvider } from 'react-hook-form'
import Input from '../../../../components/forms/Input'
import DatePicker from '../../../../components/forms/DatePicker'
import { addDays, format, startOfToday } from 'date-fns'
import axios from 'axios'
import { useSelector } from 'react-redux'
import { notifyError, notifySuccess } from '../../../../layouts/MereLayout'

function Affirm({method , interview , onAffirm}) {

    const url = useSelector(state=>state.backendUrl.value)
    const today_date = startOfToday()
    const today = format(today_date, "yyyy-MM-dd'T'HH:mm");
    const afterOneDay = format(addDays(today , 1) , "yyyy-MM-dd'T'HH:mm")
    const {reset} = method

    const Submit = async(data)=>{
        try {
            const submited = await axios.patch(`${url}/entretient/affirm/${interview.id}` , data)
            if(submited){
                console.log("Entretient En attente"); 
                notifySuccess() 
                onAffirm()
                reset()      
            }
        } catch (error) {
            console.log(error);
            notifyError()
        }
    }


    const onSubmit = (data)=>{
        const body = {
            date_interview: format(data.date_interview , "yyyy-MM-dd'T'HH:mm:ss.000'Z")
        }
        // console.log("data:",data,"  ","interview:",interview);
        
        Submit(body)
    }

  return (
    <>
        <div className='flex flex-col min-w-[25vw]'>
            <div className='mb-4 text-[18px]'>
                Ajout date d'entretient
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
                                defaultValue={afterOneDay}
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

export default Affirm