import React from 'react'
import { useSelector } from 'react-redux'
import CSInterviews from './cs/CSInterviews'
import PersInterviews from './pers/PersInterviews'
import CU_interviews from './cu/CU_interviews'
import { isArrayNotNull } from '../../functions/Functions'

function InterViews() {


  const current_user = useSelector(state=>state.currentUser.value)
  const interv = useSelector(state=>state.entretient.value)
  const interviews = isArrayNotNull(interv) ? interv.filter(item=> (item.stagiaire && item.offre)) : []

  return (
    <>
      {(current_user && current_user.isChefService)&&<CSInterviews interviews={interviews}/>}
      {(current_user && current_user.isChefUnit)&&<CU_interviews interviews={interviews}/>}
      {(current_user && (current_user.isPersCellule||current_user.isPersSecretariat))&&<PersInterviews interviews={interviews} />}
    </>
  )
}

export default InterViews