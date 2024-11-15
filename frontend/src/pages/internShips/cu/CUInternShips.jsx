import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import { useSelector } from "react-redux";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import { useForm } from "react-hook-form";
import Abandon from "./forms/Abandon";
import Finish from "./forms/FInish";
import Redocs from "./forms/Redocs";
import Details from "./cards/Details";
import Interns from "./cards/Interns";
import Tasks from "./cards/Tasks";
import { Search } from "lucide-react";
import { filterObjSame } from "../../../functions/Functions";

// Stage status mapping
export const stage_status = [
    { nom: "Tous", value: "all" },
    { nom: "En cours", value: "En Cours" },
    { nom: "En cours de Validation", value: "En Validation" },
    { nom: "En cours de Revalidation", value: "Revalidation" },
    { nom: "Achevé", value: "Achevé" },
    { nom: "Annulé", value: "Annulé" },
];

function CUInternShips({ data }) {
    // States
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("all");
    const [filteredData, setFilteredData] = useState([]);
    const [fin, setFin] = useState(false);
    const [abandon, setAbandon] = useState(false);
    const [edit, setEdit] = useState(false);
    const [selected, setSelected] = useState(null);
    const [row, setRow] = useState(null);
    const [stagiaire, setStagiaire] = useState(null);
    const [stage, setStage] = useState(null);
    const current_user = useSelector(state=>state.currentUser.value)

    // Forms
    const methodFinish = useForm();
    const methodEdit = useForm();

    // Handlers
    const handleFin = (item) => {
        setFin(!fin);
        if (item) setSelected(item);
    };

    const handleEdit = (item) => {
        setEdit(!edit);
        if (item) setSelected(item);
    };

    const handleAbandon = (item) => {
        setAbandon(!abandon);
        if (item) setSelected(item);
    };

    const handleRow = (item) => {
        if (item) {
            setRow(item);
            setStage(item);
            setStagiaire(item.stagiaire);
        }
    };

    // Filter data based on status and search term
    useEffect(() => {
        if (!data) {
            setFilteredData([]);
            return;
        }

        const filteredInternShip = filterObjSame(
            data,
            "unite_id",
            current_user.unite_id
        );

        const filtered = filteredInternShip.filter((item) => {
            // Status filter
            const statusMatch =
                selectedStatus == "all" || item.observation == selectedStatus;

            // Search filter
            if (!searchTerm) return statusMatch;

            const searchLower = searchTerm.toLowerCase();
            const nameMatch =
                item.stagiaire?.nom?.toLowerCase().includes(searchLower) ||
                item.stagiaire?.prenom?.toLowerCase().includes(searchLower);
            const themeMatch = item.theme?.toLowerCase().includes(searchLower);

            return statusMatch && (nameMatch || themeMatch);
        });

        setFilteredData(filtered);
    }, [data, selectedStatus, searchTerm]);

    return (
        <>
            <MainContainer>
                <SearchContainer>
                    <div className="flex flex-row w-full h-full items-center justify-between pb-2 mt-6 border-b-[2px] mb-4">
                        <div className="min-w-56 flex flex-row justify-center items-end h-full">
                            <select
                                value={selectedStatus}
                                onChange={(e) =>
                                    setSelectedStatus(e.target.value)
                                }
                                className="px-2 py-2 border-[2px] border-gray-400 rounded-[12px] cursor-pointer outline-none"
                            >
                                {stage_status.map((option) => (
                                    <option value={option.value} key={option.index}>
                                        {option.nom}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex flex-row flex-1 h-full justify-end items-end">
                            <div className="flex flex-row text-gray-600 py-2 rounded-[12px] bg-gray-200 px-2">
                                <input
                                    type="text"
                                    placeholder="Rechercher (stagiaire, theme)"
                                    className="w-64 bg-transparent outline-none placeholder:text-gray-500 px-1"
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                />
                                <div className="mr-1 px-1 flex flex-row items-center">
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
                            onFinish={handleFin}
                            onAbanon={handleAbandon}
                            onEdit={handleEdit}
                            onRow={handleRow}
                        />
                    </div>

                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px]">
                        <div className="card h-full overflow-auto px-2">
                            <div className="mb-3">
                                <Tasks data={stage} />
                            </div>
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
