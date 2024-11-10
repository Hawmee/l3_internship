import React, { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { Search } from "lucide-react";
import { isArrayNotNull } from "../../../functions/Functions";
import InterViews from "../InterViews";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Validate from "./forms/Validate";
import Decline from "./forms/Decline";

function CU_interviews({ interviews }) {

    const [validate,setValidate]= useState(false)
    const [decline,setDecline]= useState(false)
    const [selected, setSelected] = useState(null)

    const hanldeValidate = (item)=>{
        if(item){
            setSelected(item)
        }
        setValidate(!validate)
    }

    const handleDecline = (item)=>{
        if(item){
            setSelected(item)
        }
        setDecline(!decline)
    }


    const interv_CU = isArrayNotNull(interviews)
        ? interviews.filter(
              (interv) =>
                  (interv.status && interv.date_interview) ||
                  (!interv.status && !interv.date_interview)
          )
        : [];

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between ">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-1 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                value={navigation}
                                onChange={(e) => setNavigation(e.target.value)}
                            >
                                <option value="Demande">
                                    Demande d'entretient
                                </option>
                                <option value="Entretient">Entretient</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-1 rounded-[12px] bg-gray-200 px-2">
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
                <div className="">
                    <Table data={interv_CU} onValidate={hanldeValidate} onDecline={handleDecline} />
                </div>
            </MainContainer>

            {validate && (
                <PopUpContainer>
                    <Validate data={selected} onValidate={hanldeValidate} />
                </PopUpContainer>
            )}

            {decline && (
                <PopUpContainer>
                    <Decline data={selected} onDecline={handleDecline} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CU_interviews;
