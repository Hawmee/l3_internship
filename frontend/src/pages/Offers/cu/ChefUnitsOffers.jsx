import React, { useEffect, useState } from 'react'
import MainContainer from '../../../components/containers/MainContainer'
import TitleContainer from '../../../components/containers/TitleContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import Card from './card/Card'
import PopUpContainer from '../../../components/containers/PopUpContainer'
import { useSelector } from 'react-redux'
import Form from '../../../components/forms/Form'
import AddOffre from './AddOffre'
import { filterObjSame, isArray } from '../../../functions/Functions'
import { useForm } from 'react-hook-form'

function ChefUnitsOffers({offers}) {

  const [add, setAdd] = useState(false)
  const current_user = useSelector((state)=>state.currentUser.value)
  const unite_id = current_user.unite.id
  const method = useForm()

  
  const handleAdd =()=>{
    setAdd(!add)
  }
  
  const offre_units = isArray(offers)?(filterObjSame(offers , 'unite_id' , current_user.unite_id )):[]



  return (
    <>
      <MainContainer>
        <div className='border-b-[2px] border-gray-200 mx-3'><SearchContainer>Search goes there</SearchContainer></div>
        <div>
          <Card handleAdd={handleAdd} data={offre_units} />
        </div>
      </MainContainer>

      {add && 
        <PopUpContainer popup={add} closePopUp={setAdd} >
          <AddOffre unite_id={unite_id} handleAdd={handleAdd} method={method} />
        </PopUpContainer>
      }
    </>
  )
}

export default ChefUnitsOffers