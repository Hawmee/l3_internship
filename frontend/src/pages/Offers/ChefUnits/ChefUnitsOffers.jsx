import React, { useEffect, useState } from 'react'
import MainContainer from '../../../components/containers/MainContainer'
import TitleContainer from '../../../components/containers/TitleContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import Card from './card/Card'
import PopUpContainer from '../../../components/containers/PopUpContainer'
import { useSelector } from 'react-redux'
import Form from '../../../components/forms/Form'
import AddOffre from './AddOffre'

function ChefUnitsOffers() {

  const [add, setAdd] = useState(false)
  const current_user = useSelector((state)=>state.currentUser.value)
  const offres = useSelector(state=>state.offre.value)

  const unite_id = current_user.unite.id

  const handleAdd =()=>{
    setAdd(!add)
  }



  return (
    <>
      <MainContainer>
        <TitleContainer>Offres de stages</TitleContainer>
        <div className='border-b-[2px] border-gray-200 mx-3'><SearchContainer>Search goes there</SearchContainer></div>
        <div>
          <Card handleAdd={handleAdd} data={offres} />
        </div>
      </MainContainer>

      {add && 
        <PopUpContainer popup={add} closePopUp={setAdd} >
          <AddOffre unite_id={unite_id} handleAdd={handleAdd} />
        </PopUpContainer>
      }
    </>
  )
}

export default ChefUnitsOffers