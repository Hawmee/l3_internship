import React from 'react'
import { useSelector } from 'react-redux'
import PersIntern from './pers/PersIntern'

function Interns() {

  const current_user= useSelector(state=>state.currentUser.value)
  const interns = useSelector(state=>state.stagiaire.value)

  return (
    <>
      {(current_user&&(current_user.isPersCellule||current_user.isPersSecretariat))&& <PersIntern interns={interns} /> }
    </>
  )
}

export default Interns