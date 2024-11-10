import React, { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer.jsx";
import SearchContainer from "../../../components/containers/SearchContainer.jsx";
import Card from "./Card.jsx";
import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer.jsx";
import AddInterview from "./AddInterview.jsx";
import { useForm } from "react-hook-form";
import Table from "./table.jsx";
import { filterObjSame, isArrayNotNull } from "../../../functions/Functions.js";
import { Search } from "lucide-react";

function PersOffers({ offers }) {
    const methods = useForm();
    const {
        watch: watchIntev,
        setValue: setValInterv,
        reset: resetInterv,
    } = methods;

    const offer_available = filterObjSame(offers, "nombre_stagiaire" , 0);
    const [selectedOffre, setSelectedOffre] = useState(null);
    const [createInterviews, setCreateInterviews] = useState(false);

    const handleCreateInterview = (offre) => {
        setCreateInterviews(!createInterviews);
        if(offre){
            setSelectedOffre(offre);
            resetInterv({
                offre_id: offre.id,
            });
        }
    };

    // const offres = isArrayNotNull(offer_available)
    // ? offer_available.filter(
    //       (item) =>
    //         item.
    //   )
    // : null;

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-2 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                // value={navigation}
                                // onChange={(e) => setNavigation(e.target.value)}
                            >
                                <option value="Demande">
                                    Demande d'entretient
                                </option>
                                <option value="Entretient">Entretient</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(offre , stagiaire , date)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    // onChange={(e) => {
                                    //     setSearchTerm(e.target.value);
                                    // }}
                                />
                                <div className="mr-1  px-1 flex flex-row items-center cursor-pointer">
                                    <Search size={18} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SearchContainer>
                <div>
                    {/* <Card data={offer_available} handleCreateInterview={handleCreateInterview}  /> */}
                    <Table data={offer_available} onInterview={handleCreateInterview} />
                </div>
            </MainContainer>
            {createInterviews && (
                <PopUpContainer
                    popup={createInterviews}
                    closePopUp={setCreateInterviews}
                >
                    <AddInterview
                        method={methods}
                        offre={offer_available}
                        handleCreateInterview={handleCreateInterview}
                    />
                </PopUpContainer>
            )}
        </>
    );
}

export default PersOffers;
