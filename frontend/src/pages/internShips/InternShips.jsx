import React from 'react'
import { useSelector } from 'react-redux'
import PersInternShip from './pc/PersInternShip'
import CUInternShips from './cu/CUInternShips'

function InternShips() {

  const current_user=useSelector(state=>state.currentUser.value)

  return (
    <>
      {(current_user&&(current_user.isChefService))&& <CUInternShips /> }
      {(current_user&&(current_user.isChefUnit))&& <CUInternShips /> }
      {(current_user&&(current_user.isPersCellule))&& <PersInternShip /> }
    </>
  )
}

export default InternShips