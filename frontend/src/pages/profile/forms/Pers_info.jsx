import React from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import Input from '../../../components/forms/Input'

function Pers_info() {

  const method = useForm()

  return (
    <div>
      <FormProvider {...method}>
        <form action="" className='w-full pr-8'>

          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'nom'} 
              label={"Nom"}  
            />
          </div>
          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'prenom'} 
              label={"Prenoms"}  
            />
          </div>
          <div className='mb-3 w-[20vw]'>
            <Input 
              name={'mail'} 
              label={"Email"}  
            />
          </div>

          <div className='mt-6'> 
              <div className='flex flex-row justify-end'>Modifier</div>
          </div>
        </form>
      </FormProvider>
    </div>
  )
}

export default Pers_info