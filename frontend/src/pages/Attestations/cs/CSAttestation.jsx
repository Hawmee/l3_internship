import React, { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { Search } from "lucide-react";
import Print from "./forms/Print";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Validate from "./forms/Validate";

function CSAttestation({ data }) {
    const [print, setPrint] = useState(false);
    const [selected, setSelected] = useState(null);
    const [view, setView] = useState(false);
    const [validate, setValidate] = useState(false);

    const hanldePrint = (item) => {
        setPrint(!print);
        if (item) {
            setSelected(item);
        }
    };

    const handleView = (item) => {
        setView(!view);
        if (item) {
            setSelected(item);
        }
    };

    const handleValidate = (item) => {
        setValidate(!validate);
        if (item) {
            setSelected(item);
        }
    };

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
                    <Table
                        data={data}
                        onPrint={hanldePrint}
                        // onView={handleView}
                        onValidate={handleValidate}
                    />
                </div>
            </MainContainer>
            {print && (
                <PopUpContainer>
                    <Print onPrint={hanldePrint} data={selected} />
                </PopUpContainer>
            )}

            {validate && (
              <PopUpContainer>
                  <Validate data={selected} onValidate={handleValidate}/>
              </PopUpContainer>
            )}
        </>
    );
}

export default CSAttestation;