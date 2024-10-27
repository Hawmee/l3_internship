import React, {useState} from 'react';
import MainContainer from "../../../components/containers/MainContainer.jsx";
import TitleContainer from "../../../components/containers/TitleContainer.jsx";
import SearchContainer from "../../../components/containers/SearchContainer.jsx";
import Card from "./Card.jsx";
import {useSelector} from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer.jsx";
import AddInterview from "./AddInterview.jsx";
import {useForm} from "react-hook-form";

function PersOffers() {

    const methods = useForm()

    const offres = useSelector(state=>state.offre.value)
    const [createInterviews , setCreateInterviews] = useState(false)

    const handleCreateInterview = () =>{
        setCreateInterviews((!createInterviews))
    }

    return (
        <>
            <MainContainer>
                <TitleContainer>Offres de stages :</TitleContainer>
                <div className={"border-b-[2px] border-gray-200 mx-3"}><SearchContainer>Seach goes there</SearchContainer></div>
                <div>
                    <Card data={offres} handleCreateInterview={handleCreateInterview} />
                </div>
            </MainContainer>
            {createInterviews &&
                <PopUpContainer popup={createInterviews} closePopUp={setCreateInterviews} >
                    <AddInterview method={methods} />
                </PopUpContainer>
            }
        </>
    );
}

export default PersOffers;