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

function PersIntern({ interns }) {
    const [new_intern, setNew_intern] = useState(false);
    const [edit_intern, setEdit_intern] = useState(false);
    const [delete_intern, setDelete_intern] = useState(false);
    const [docs , setDocs] = useState(false)
    const [selected_intern, setSelected_intern] = useState(null);
    const methodEdit = useForm();
    const methodDocs = useForm()
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
                email: item.email ,
                phone: item.phone,
                niveau:item.niveau,
                filiere:item.filiere,
                etablissement:item.etablissement,
                cv_link:null ,
                lm_link:null
            })
        }
    };

    const handle_delete = (item)=>{
        setDelete_intern(!delete_intern)
        if(item){
            setSelected_intern(item)
        }
    }


    const handle_docs = (item)=>{
        setDocs(!docs)
        if(item){
            setSelected_intern(item)
        }
    }

    return (
        <>
            <MainContainer>
                <SearchContainer>Nav and Search</SearchContainer>
                <div>
                    <Table
                        data={interns}
                        onAdd={handle_new}
                        onEdit={handle_edit}
                        onDelete = {handle_delete}
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
                    <Edit handle_edit={handle_edit} method={methodEdit} data={selected_intern} />
                </PopUpContainer>
            )}
            {delete_intern && (
                <PopUpContainer popup={delete_intern} closePopUp={setDelete_intern}>
                    <Delete handle_delete={handle_delete} data={selected_intern}  />
                </PopUpContainer>
            )}
            {docs && (
                <PopUpContainer popup={docs} closePopUp={setDocs}>
                    <Docs handle_docs={handle_docs} data={selected_intern} method={methodDocs}/>
                </PopUpContainer>
            )}
            
        </>
    );
}

export default PersIntern;
