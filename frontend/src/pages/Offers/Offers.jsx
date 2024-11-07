import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChefUnitsOffers from './cu/ChefUnitsOffers.jsx'
import PersOffers from "./pers/PersOffers.jsx";

function Offers() {

    const current_user = useSelector((state)=>state.currentUser.value)
    const offers = useSelector((state)=>state.offre.value)

  return (
    <>
        {(current_user&&current_user.isChefUnit) && <ChefUnitsOffers offers={offers} />}
        {(current_user&&(current_user.isPersCellule || current_user.isPersSecretariat)) && <PersOffers offers={offers} />}
    </>
  )
}

export default Offers