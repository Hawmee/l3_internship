import React, { useEffect, useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import { filterObjSame, isArrayNotNull } from "../../../functions/Functions";
import { useSelector } from "react-redux";
import Add from "./forms/Add";
import { Search } from "lucide-react";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Tasks from "./cards/Tasks";
import { task_observations } from "../../../utils/Observations";

function CUTask({ data }) {
    const current_user = useSelector((state) => state.currentUser.value);
    const filtered_interns = isArrayNotNull(data)
        ? filterObjSame(data, "unite_id", current_user.unite_id)
        : [];

    const [selected, setSelected] = useState(null);
    const [tasks, setTasks] = useState(null);
    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [finished, setFinised] = useState(false);

    const handleAdd = () => {
        setAdd(!add);
    };

    const handleSelect = (item) => {
        if (item) {
            setSelected(item);
        }
    };

    const unfinished =
        isArrayNotNull(tasks) &&
        tasks.filter((task) => task.observation == task_observations.inacheve);
    const unfinished_number = isArrayNotNull(finished) ? unfinished.length : 0;

    const en_cours =
        isArrayNotNull(tasks) &&
        tasks.filter((task) => task.observation == task_observations.en_cours);
    const en_cours_number = isArrayNotNull(en_cours) ? en_cours.length : 0;

    const _finished =
    isArrayNotNull(tasks) &&
    tasks.filter((task) => task.observation == task_observations.acheve);
const finished_number = isArrayNotNull(_finished) ? en_cours.length : 0;

    useEffect(() => {
        if (selected) {
            setTasks(selected.taches);
            const selected_id = selected.id;
            if (isArrayNotNull(data)) {
                const matching = data.find(
                    (stage) => Number(stage.id) == Number(selected_id)
                );
                setSelected(matching);
            }
        }
    }, [selected, data]);

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
                            data={filtered_interns}
                            onSelect={handleSelect}
                            selected={selected}
                        />
                    </div>
                    <div className="relative flex-1 flex flex-col h-[80vh] mt-4 mr-2 rounded-[12px] border-[2px] shadow-md ">
                        <div className="text-center px-6 py-4  text-lg text-gray-800">
                            <div className="border-b-[2px] pb-2">Taches :</div>
                        </div>
                        {isArrayNotNull(tasks) && (
                            <div className="px-6 mb-3">
                                <div className="flex flex-row pb-2 justify-between border-b-2  ">
                                    <div className="text-red-400">
                                        Inachevé:({unfinished_number})
                                    </div>
                                    <div className="text-gray-400">
                                        En cours:({en_cours_number})
                                    </div>
                                    <div className="text-blue-400">
                                        Achevéé:({finished_number})
                                    </div>
                                </div>
                            </div>
                        )}
                        <div className=" card h-full overflow-auto px-2 py-1">
                            {!selected ? (
                                <div className="h-full w-full flex flex-col justify-center items-center text-lg text-gray-600">
                                    ( Veuillez Choisir un Stagiaire)
                                </div>
                            ) : selected && !isArrayNotNull(tasks) ? (
                                <div className="h-full w-full flex flex-col justify-center items-center text-lg text-gray-600">
                                    (Aucune tache Disponible)
                                </div>
                            ) : (
                                ""
                            )}
                            {tasks &&
                                tasks.map((task) => (
                                    <div className="mb-3" key={task.id}>
                                        <Tasks data={task} />
                                    </div>
                                ))}
                        </div>
                        {selected && (
                            <div className="absolute bottom-0 right-0">
                                <button
                                    className="bg-blue-500 text-white px-6 py-1 rounded-br-[12px] rounded-tl-[8px] hover:bg-blue-600"
                                    onClick={() => {
                                        handleAdd();
                                    }}
                                >
                                    Creer
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </MainContainer>
            {add && (
                <PopUpContainer>
                    <Add onAddTasks={handleAdd} data={selected} />
                </PopUpContainer>
            )}
        </>
    );
}

export default CUTask;
