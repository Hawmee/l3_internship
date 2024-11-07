import React, { useState } from "react";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import Table from "./Table";
import New from "./forms/New";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Edit from "./forms/Edit";
import { useForm } from "react-hook-form";
import Delete from "./forms/Delete";
import Docs from "./forms/Docs";
import { Search } from "lucide-react";

function PersIntern({ interns }) {
    const [new_intern, setNew_intern] = useState(false);
    const [edit_intern, setEdit_intern] = useState(false);
    const [delete_intern, setDelete_intern] = useState(false);
    const [docs, setDocs] = useState(false);
    const [selected_intern, setSelected_intern] = useState(null);
    const methodEdit = useForm();
    const methodDocs = useForm();
    const { reset } = methodEdit;

    const handle_new = () => {
        setNew_intern(!new_intern);
    };

    const handle_edit = (item) => {
        setEdit_intern(!edit_intern);
        if (item) {
            setSelected_intern(item);
            reset({
                nom: item.nom,
                prenom: item.prenom,
                email: item.email,
                phone: item.phone,
                niveau: item.niveau,
                filiere: item.filiere,
                etablissement: item.etablissement,
                cv_link: null,
                lm_link: null,
            });
        }
    };

    const handle_delete = (item) => {
        setDelete_intern(!delete_intern);
        if (item) {
            setSelected_intern(item);
        }
    };

    const handle_docs = (item) => {
        setDocs(!docs);
        if (item) {
            setSelected_intern(item);
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
                        data={interns}
                        onAdd={handle_new}
                        onEdit={handle_edit}
                        onDelete={handle_delete}
                        onDocs={handle_docs}
                    />
                </div>
            </MainContainer>
            {new_intern && (
                <PopUpContainer popup={new_intern} closePopUp={setNew_intern}>
                    <New handle_new={handle_new} />
                </PopUpContainer>
            )}
            {edit_intern && (
                <PopUpContainer popup={edit_intern} closePopUp={setEdit_intern}>
                    <Edit
                        handle_edit={handle_edit}
                        method={methodEdit}
                        data={selected_intern}
                    />
                </PopUpContainer>
            )}
            {delete_intern && (
                <PopUpContainer
                    popup={delete_intern}
                    closePopUp={setDelete_intern}
                >
                    <Delete
                        handle_delete={handle_delete}
                        data={selected_intern}
                    />
                </PopUpContainer>
            )}
            {docs && (
                <PopUpContainer popup={docs} closePopUp={setDocs}>
                    <Docs
                        handle_docs={handle_docs}
                        data={selected_intern}
                        method={methodDocs}
                    />
                </PopUpContainer>
            )}
        </>
    );
}

export default PersIntern;
