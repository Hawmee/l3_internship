import React from 'react'
import Table from './Table'
import SearchContainer from '../../../components/containers/SearchContainer'
import MainContainer from '../../../components/containers/MainContainer'

function PersAttestations() {
  return (
    <>
    <MainContainer>
        <SearchContainer>Search goes there</SearchContainer>
        <div>
            <Table />
        </div>
    </MainContainer>
</>
  )
}

export default PersAttestations