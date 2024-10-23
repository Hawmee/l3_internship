import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import Table from './Table'
import MainContainer from '../../../components/containers/MainContainer'
import TitleContainer from '../../../components/containers/TitleContainer'
import SearchContainer from '../../../components/containers/SearchContainer'

function CSAccounts() {

    const accounts = useSelector((state)=>state.account.value)
    const users = (Array.isArray(accounts) && accounts.length > 0)?accounts.filter(account=> !account.isChefService):[]


    useEffect(()=>{
      console.log("acc:",accounts);
      
    } , [accounts])

  

  return (
    <>
        <MainContainer>
            <TitleContainer>Comptes des utilisateurs</TitleContainer>
            <SearchContainer>Search goes here</SearchContainer>
            <div>
              <Table data={users} />
            </div>
        </MainContainer>

        {/* <div className='bg-blue-400 w-[100vw] absolute right-0 top-0'>
          huhu
        </div> */}
    </>
  )
}

export default CSAccounts