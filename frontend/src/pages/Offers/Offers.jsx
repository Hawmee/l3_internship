import React from 'react'
import { useSelector } from 'react-redux'
import ChefServiceOffers from './chefService/ChefServiceOffers'
import ChefUnitsOffers from './ChefUnits/ChefUnitsOffers'

function Offers() {

    const current_user = useSelector((state)=>state.currentUser.value)

  return (
    <>
        {(current_user&&current_user.isChefService) && <ChefServiceOffers />}
        {(current_user&&current_user.isChefUnit) && <ChefUnitsOffers />}
    </>
  )
}

export default Offers