import React from 'react'
import { useSelector } from 'react-redux'
import CSAttestation from './cs/CSAttestation'
import PersAttestations from './pers/PersAttestations'

function Attestation() {

    const current_user = useSelector(state=>state.currentUser.value)

  return (
    <>
        {(current_user && current_user.isChefService)&&<CSAttestation />}
        {(current_user && current_user.isPersCellule)&&<PersAttestations />}
    </>
  )
}

export default Attestation