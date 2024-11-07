import React from 'react'
import { useSelector } from 'react-redux'
import PersInternShip from './pc/PersInternShip'
import CUInternShips from './cu/CUInternShips'
import CSInternShips from './cs/CSInternShips'

function InternShips() {

  const current_user=useSelector(state=>state.currentUser.value)
  const internships = useSelector(state=>state.stage.value)

  console.log(internships)

  return (
    <>
      {(current_user&&(current_user.isChefService))&& <CSInternShips data={internships} /> }
      {(current_user&&(current_user.isChefUnit))&& <CUInternShips data={internships} /> }
      {(current_user&&(current_user.isPersCellule))&& <PersInternShip data={internships}  /> }
    </>
  )
}

export default InternShips