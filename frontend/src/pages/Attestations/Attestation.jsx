import React from 'react'
import { useSelector } from 'react-redux'
import CSAttestation from './cs/CSAttestation'
import PersAttestations from './pers/PersAttestations'

function Attestation() {

    const current_user = useSelector(state=>state.currentUser.value)
    const attestation = useSelector(state=>state.attestation.value)
    const internships = useSelector(state=>state.stage.value)

  return (
    <>
        {(current_user && current_user.isChefService)&&<CSAttestation data={attestation} />}
        {(current_user && current_user.isPersCellule)&&<PersAttestations data={internships}/>}
    </>
  )
}

export default Attestation