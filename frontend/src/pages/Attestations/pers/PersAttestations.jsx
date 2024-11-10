import React, { useEffect, useState } from "react";
import Table from "./Table";
import SearchContainer from "../../../components/containers/SearchContainer";
import MainContainer from "../../../components/containers/MainContainer";
import { Search } from "lucide-react";
import { filterObjSame } from "../../../functions/Functions";
import InternShip from "./cards/InternShip";
import Interns from "./cards/Interns";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Generate from "./forms/Generate";
import Inform from "./forms/Inform";
import Collected from "./forms/Collected";

function PersAttestations({data}) {

    const filterStage = filterObjSame(data ,'status')
    const validatedStage = filterObjSame(filterStage ,'book_link')
    const [row , setRow] = useState(null)
    const [stagiaire , setStagiaire] = useState(null)
    const [selected , setSelected] = useState(null)
    const [attestation , setAttestation] = useState(false)
    const [inform , setInform] = useState(false)
    const [collected, setCollected]= useState(false)


    const handleAttestation = (item)=>{
      setAttestation(!attestation)
      if(item){
        setSelected(item)
      }
    }

    const handleInform = (item)=>{
      setInform(!inform)
      if(item){
        setSelected(item)
      }
    }

    const handleCollected=(item)=>{
      setCollected(!collected)
      if(item){
        setSelected(item)
      }
    }

    const handleRow = (item)=>{
      if(item){
        setRow(item)
      }
    }
    
    useEffect(()=>{
      if(row){
        setStagiaire(row.stagiaire)
      }
    } , [row])

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
                          data={validatedStage}
                          onRow = {handleRow}
                          onAttestation={handleAttestation}
                          onInform={handleInform}
                          onCollected={handleCollected}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className=" card h-full overflow-auto px-2">
                          <div className="mb-3">
                            <InternShip data={row} />
                          </div>
                          <div className="mb-3">
                            <Interns data={stagiaire} />
                          </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
            {
              attestation && (
                <PopUpContainer>
                  <Generate data={selected} handleAttestation={handleAttestation} />
                </PopUpContainer>
              )
            }
            {
              inform && (
                <PopUpContainer>
                  <Inform onInform={handleInform} data={selected}/>
                </PopUpContainer>
              )
            }
            {
              collected && (
                <PopUpContainer>
                  <Collected data={selected} onCollected={handleCollected} />
                </PopUpContainer>
              )
            }
        </>
    );
}

export default PersAttestations;
