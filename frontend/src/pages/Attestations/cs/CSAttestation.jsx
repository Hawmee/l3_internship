import React from 'react'
import MainContainer from '../../../components/containers/MainContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import Table from './Table'

function CSAttestation() {
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

export default CSAttestation