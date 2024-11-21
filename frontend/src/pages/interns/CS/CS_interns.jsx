import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { useForm } from "react-hook-form";
import { Search } from "lucide-react";
import { observation_stagiaire } from "../../../utils/Observations";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Interview from "./forms/Interview";
function CS_interns({ interns }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [interview, setInterview] = useState(false);
    const [selected , setSelected] = useState(null)
    

    const handleInterview = (item)=>{
        setInterview(!interview)
        if(item){
            setSelected(item)
        }
    }

    useEffect(() => {
        if (!interns) {
            setFilteredData([]);
            return;
        }

        const filtered = interns.filter((item) => {
            const statusMatch =
                selectedStatus == "all" ||
                (selectedStatus == "Postulant"
                    ? item.observation == observation_stagiaire.postulant
                    : selectedStatus == "En cours de stage"
                    ? item.observation == observation_stagiaire.en_stage
                    : selectedStatus == "A entretenir"
                    ? item.observation == observation_stagiaire.a_entretenir
                    : item.observation == observation_stagiaire.ancien);

            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const nameMatch =
                item.nom?.toLowerCase().includes(searchLower) ||
                item.prenom?.toLowerCase().includes(searchLower);
            const niveau = item.niveau?.toLowerCase().includes(searchLower);
            const allNameMatch = (item.nom + " " + item.prenom)
                .toLowerCase()
                .includes(searchLower);
            const filiere = item.filiere?.toLowerCase().includes(searchLower);

            return (
                statusMatch && (nameMatch || allNameMatch || filiere || niveau)
            );
        });

        console.log(interns);
        console.log(observation_stagiaire);

        setFilteredData(filtered);
    }, [interns, selectedStatus, searchTerm]);

    useEffect(() => {
        if (interns) {
            const postulant = interns.some(
                (item) => item.observation == observation_stagiaire.postulant
            );
            if (postulant) {
                setSelectedStatus("Postulant");
            } else {
                setSelectedStatus("all");
            }
        }
    }, [interns]);'z'

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className=" flex flex-row justify-center items-end h-full">
                            <select
                                name=""
                                id=""
                                className="px-2 py-2 border-[2px] border-gray-400  rounded-[12px] cursor-pointer outline-none"
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                            >
                                <option value="all">Tous</option>
                                <option value="Postulant">Postulant</option>
                                <option value="A entretenir">
                                    A entretenir
                                </option>
                                <option value="En cours de stage">
                                    En cours de stage
                                </option>
                                <option value="Anciens">Anciens</option>
                            </select>
                        </div>

                        <div className=" flex flex-row flex-1 h-full justify-end items-end ">
                            <div className="flex flex-row  text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher(stagiaire , ,...)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    onChange={(e) => {
                                        setSearchTerm(e.target.value);
                                    }}
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
                            data={filteredData}
                            onInterview={handleInterview}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className="text-center py-6 px-12">
                            <div className="border-b-2 border-gray-300 text-lg pb-2">Details</div>
                        </div>
                        <div className=" card h-full overflow-auto px-2"></div>
                    </div>
                </div>
            </MainContainer>
            { interview && (
                <PopUpContainer>
                    <Interview data={selected} onInterview={handleInterview} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CS_interns;
