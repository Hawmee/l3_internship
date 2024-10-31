import React from 'react'
import { useSelector } from 'react-redux'
import CSInterviews from './cs/CSInterviews'
import PersInterviews from './pers/PersInterviews'

function InterViews() {


  const current_user = useSelector(state=>state.currentUser.value)
  const interviews = useSelector(state=>state.entretient.value)

  return (
    <>
      {(current_user && current_user.isChefService)&&<CSInterviews interviews={interviews}/>}
      {(current_user && (current_user.isPersCellule||current_user.isPersSecretariat))&&<PersInterviews interviews={interviews} />}
    </>
  )
}

export default InterViews