import React from 'react'

function Details({attestation , fournir}) {
  return (
    <>
        <div>
          {attestation.stage.stagiaire.nom}
        </div>

        <div className='h-full w-full flex flex-col justify-center items-center'>
        </div>
    </>
  )
}

export default Details