import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Interns from "./cards/Interns";
import Performance from "./cards/Performance";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Validate from "./forms/Validate";
import { Search } from "lucide-react";
import Cancel from "./forms/Cancel";
import { useForm } from "react-hook-form";
import InternShips from "./cards/InternShips";

function CSInternShips({ data }) {
    const [selected, setSelected] = useState(null);
    const [stagiaire, setStagiaire] = useState(null);
    const [perf, setPerf] = useState(null);
    const [validate, setValidate] = useState(false);
    const [deny, setDeny] = useState(false);
    const [selectedStage, setSelectedStage] = useState(false);
    const methodDeny = useForm();

    const handleSelect = (item) => {
        if (item) {
            setSelected(item);
        }
    };

    const handleValidate = (item) => {
        setValidate(!validate);
        if (item) {
            setSelectedStage(item);
        }
    };

    const handleDeny = (item) => {
        setDeny(!deny);
        if (item) {
            setSelectedStage(item);
        }
    };

    useEffect(() => {
        if (selected) {
            setStagiaire(selected.stagiaire);
            setPerf(selected.performance);

            console.log(selected)
        }
    }, [selected]);

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
                <div className="flex flex-row">
                    <div className="w-[55vw] mr-2">
                        <Table
                            data={data}
                            onSelect={handleSelect}
                            selected={selected}
                            onValidate={handleValidate}
                            onDeny={handleDeny}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className=" card h-full overflow-auto px-2">
                        <div className="mb-6">
                                <InternShips data={selected} />
                            </div>
                            <div className="mb-6">
                                <Interns data={stagiaire} />
                            </div>
                            <div className="">
                                <Performance data={perf} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
            {validate && (
                <PopUpContainer>
                    <Validate
                        data={selectedStage}
                        handleValidate={handleValidate}
                    />
                </PopUpContainer>
            )}

            {deny && (
                <PopUpContainer>
                    <Cancel
                        method={methodDeny}
                        data={selectedStage}
                        handleCancel={handleDeny}
                    />
                </PopUpContainer>
            )}
        </>
    );
}

export default CSInternShips;