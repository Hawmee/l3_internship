import React from 'react'
import { useSelector } from 'react-redux'
import PersIntern from './Personals/PersIntern'

function Interns() {

  const current_user= useSelector(state=>state.currentUser.value)

  return (
    <>
      {(current_user&&(current_user.isPersCellule||current_user.isPersSecretariat))&& <PersIntern /> }
    </>
  )
}

export default Interns