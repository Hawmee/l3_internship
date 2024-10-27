import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ChefServiceOffers from './chefService/ChefServiceOffers'
import ChefUnitsOffers from './ChefUnits/ChefUnitsOffers'
import axios from 'axios'
import { setOffre } from '../../features/offres'
import PersOffers from "./Personals/PersOffers.jsx";

function Offers() {

    const current_user = useSelector((state)=>state.currentUser.value)
    const url = useSelector((state)=>state.backendUrl.value)
    const dispatch = useDispatch()

    const getAllOffre = async ()=>{
      try {
        const offres_data =  await axios.get(`${url}/offre`)
        const offres = offres_data.data
        if(offres){
          dispatch(setOffre(offres))
        }
      } catch (error) {
        console.log(error)
      }

    }


    useEffect(()=>{
      getAllOffre()
    } , [])

  return (
    <>
        {(current_user&&current_user.isChefService) && <ChefServiceOffers />}
        {(current_user&&current_user.isChefUnit) && <ChefUnitsOffers />}
        {(current_user&&(current_user.isPersCellule || current_user.isPersSecretariat)) && <PersOffers />}
    </>
  )
}

export default Offers