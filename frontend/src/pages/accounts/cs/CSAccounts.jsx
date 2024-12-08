import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import MainContainer from '../../../components/containers/MainContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import PopUpContainer from '../../../components/containers/PopUpContainer'
import axios from 'axios'
import { toast } from 'react-toastify'
import { filterObjdiff, isArrayNotNull } from '../../../functions/Functions'
import Validate from './forms/Validate'
import { useDisclosure } from '@nextui-org/react'

function CSAccounts() {

    const accounts = useSelector((state)=>state.account.value)
    const toastConfig = useSelector((state)=>state.toastConfig.value)
    const users = (isArrayNotNull(accounts)? filterObjdiff(accounts , 'isChefService' , true ):[])
    const url = useSelector((state)=> state.backendUrl.value)


    const [selected_user , setSelected_user] = useState(null)  

    const validate= useDisclosure()


    const handleValidate = (account)=>{
      if(account){
        setSelected_user(account)
        validate.onOpen()
      }else{
        validate.onClose()
      }
    }

    const onValidate = async()=>{
      try {
        const validated = await axios.patch(`${url}/user/${selected_user.id}` , selected_user)
        if(validated){
          toast.success(`Utilisateur ${selected_user.matricule} validé !` , toastConfig )
          validate.onClose()
        }
      } catch (error) {
          toast.error("Erreur au niveau du serveur" , toastConfig)
          console.log(error); 
      }
    }
    
  
  return (
    <>
        <MainContainer>
            <SearchContainer>Search goes here</SearchContainer>
            <div>
              <Table data={users} onValidate={handleValidate} />
            </div>
        </MainContainer>


        <PopUpContainer isOpen={validate.isOpen} onOpenChange={validate.onOpenChange} >
            <Validate onValidate={handleValidate} submit={onValidate}/>
        </PopUpContainer>
    </>
  )
}

export default CSAccounts