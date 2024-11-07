import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { filterObjSame } from "../../../functions/Functions";
import { useSelector } from "react-redux";
import Abandon from "./forms/Abandon";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Finish from "./forms/FInish";
import { useForm } from "react-hook-form";
import Redocs from "./forms/Redocs";
import Details from "./cards/Details";
import Interns from "./cards/Interns";
import { Search } from "lucide-react";

function CUInternShips({ data }) {
    const current_user = useSelector((state) => state.currentUser.value);
    const filteredInternShip = filterObjSame(
        data,
        "unite_id",
        current_user.unite_id
    );
    const [fin, setFin] = useState(false);
    const [abandon, setAdandon] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(null);
    const [row, setRow] = useState(null);
    const methodFinish = useForm();
    const methodEdit = useForm();
    const [stagiaire, setStagiaire] = useState(null);
    const [stage, setStage] = useState(null);

    const handleFin = (item) => {
        setFin(!fin);
        if (item) {
            setSelected(item);
        }
    };

    const handleEdit = (item) => {
        setEdit(!edit);
        if (item) {
            setSelected(item);
        }
    };

    const handleAbandon = (item) => {
        setAdandon(!abandon);
        if (item) {
            setSelected(item);
        }
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
        }
    };

    useEffect(() => {
        if (row) {
            setStage(row);
            setStagiaire(row.stagiaire);
        }
    }, [row]);

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
                            data={filteredInternShip}
                            onFinish={handleFin}
                            onAbanon={handleAbandon}
                            onEdit={handleEdit}
                            onRow={handleRow}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className=" card h-full overflow-auto px-2">
                            <div className="mb-3">
                                <Details data={stage} />
                            </div>
                            <div className="mb-3">
                                <Interns data={stagiaire} />
                            </div>
                        </div>
                    </div>
                </div>
            </MainContainer>
            {abandon && (
                <PopUpContainer>
                    <Abandon onAbandon={handleAbandon} data={selected} />
                </PopUpContainer>
            )}

            {fin && (
                <PopUpContainer>
                    <Finish
                        method={methodFinish}
                        data={selected}
                        onFinish={handleFin}
                    />
                </PopUpContainer>
            )}
            {edit && (
                <PopUpContainer>
                    <Redocs
                        method={methodEdit}
                        data={selected}
                        onFinish={handleEdit}
                    />
                </PopUpContainer>
            )}
        </>
    );
}

export default CUInternShips;
