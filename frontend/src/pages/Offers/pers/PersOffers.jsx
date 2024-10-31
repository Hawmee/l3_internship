import React, {useState} from 'react';
import MainContainer from "../../../components/containers/MainContainer.jsx";
import SearchContainer from "../../../components/containers/SearchContainer.jsx";
import Card from "./Card.jsx";
import {useSelector} from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer.jsx";
import AddInterview from "./AddInterview.jsx";
import {useForm} from "react-hook-form";
import Table from './table.jsx';

function PersOffers() {

    const methods = useForm()
    const {watch:watchIntev , setValue:setValInterv , reset:resetInterv}=methods

    const offres = useSelector(state=>state.offre.value)
    const [selectedOffre , setSelectedOffre] = useState(null)
    const [createInterviews , setCreateInterviews] = useState(false)

    const handleCreateInterview = (offre) =>{
        setCreateInterviews((!createInterviews))
        setSelectedOffre(offre)
        resetInterv({
            offre_id: offre.id
        })
    }



    return (
        <>
            <MainContainer>
                <SearchContainer>Seach goes there</SearchContainer>
                <div>
                    <Card data={offres} handleCreateInterview={handleCreateInterview}  />
                    {/* <Table /> */}
                </div>
            </MainContainer>
            {createInterviews &&
                <PopUpContainer popup={createInterviews} closePopUp={setCreateInterviews} >
                    <AddInterview method={methods} offre={offres} handleCreateInterview={handleCreateInterview} />
                </PopUpContainer>
            }
        </>
    );
}

export default PersOffers;