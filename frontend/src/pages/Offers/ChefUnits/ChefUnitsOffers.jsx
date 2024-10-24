import React from 'react'
import MainContainer from '../../../components/containers/MainContainer'
import TitleContainer from '../../../components/containers/TitleContainer'
import SearchContainer from '../../../components/containers/SearchContainer'
import Card from './card/Card'

function ChefUnitsOffers() {
  return (
    <>
      <MainContainer>
        <TitleContainer>Offres de stages</TitleContainer>
        <div className='border-b-[2px] border-gray-200 mx-3'><SearchContainer>Search goes there</SearchContainer></div>
        <div className=' card mr-2 flex flex-col px-12 mt-2 h-[75vh] overflow-auto '>
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <Card />
           <div className=' p-4'>
             {""}
           </div>
        </div>
      </MainContainer>
    </>
  )
}

export default ChefUnitsOffers