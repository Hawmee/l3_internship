import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import MainContainer from '../../../components/containers/MainContainer'
import TitleContainer from '../../../components/containers/TitleContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import PopUpContainer from '../../../components/containers/PopUpContainer'
import axios from 'axios'
import { toast } from 'react-toastify'

function CSAccounts() {

    const accounts = useSelector((state)=>state.account.value)
    const toastConfig = useSelector((state)=>state.toastConfig.value)
    const users = (Array.isArray(accounts) && accounts.length > 0)?accounts.filter(account=> !account.isChefService):[] 
    const url = useSelector((state)=> state.backendUrl.value)


    const [validate , setValidate] = useState(false)
    const [selected_user , setSelected_user] = useState(null)  


    const handleValidate = (account)=>{
      setValidate(!validate)
      setSelected_user(account)
    }

    const onValidate = async()=>{
      try {
        const validated = await axios.patch(`${url}/user/${selected_user.id}` , selected_user)
        if(validated){
          toast.success(`Utilisateur ${selected_user.matricule} validé !` , toastConfig )
          setValidate(!validate)
        }
      } catch (error) {
          toast.error("Erreur au niveau du serveur" , toastConfig)
          console.log(error); 
      }
    }
    
  
  return (
    <>
        <MainContainer>
            <TitleContainer>Comptes des utilisateurs</TitleContainer>
            <SearchContainer>Search goes here</SearchContainer>
            <div>
              <Table data={users} onValidate={handleValidate} />
            </div>
        </MainContainer>


        {validate && <PopUpContainer popup={validate} closePopUp={setValidate} >
          <div>
            validate
          </div>
          <div>
            <button className='text-white bg-blue-500' onClick={()=>{onValidate()}}>Validatessssss</button>
          </div>
        </PopUpContainer>}

        {/* <div className='bg-blue-400 w-[100vw] absolute right-0 top-0'>
          huhu
        </div> */}
    </>
  )
}

export default CSAccounts