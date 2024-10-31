import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Select from "../../../components/forms/Select";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { isArrayNotNull } from "../../../functions/Functions";

function CSUnits() {
    const methodAdd = useForm();
    const methodEdit = useForm();
    const { watch: watchAdd, setValue:setValueAdd } = methodAdd;
    const { watch: watchEdit, setValue:setValueEdit , reset:resetEdit } = methodEdit;
    const units = useSelector((state) => state.unit.value);
    const url = useSelector((state) => state.backendUrl.value);


    const [add, setAdd] = useState(false);
    const [edit, setEdit] = useState(false);
    const [del, setDel] = useState(false);
    const [selected_unit, setSelected_unit] = useState(null);
    const unit_type_value = watchAdd("unit_type");
    const unit_type_value_edit = watchEdit("unit_type")
    const units_options =
        isArrayNotNull(units)
            ? [
                  { value: "", label: "Sur-Unité" },
                  ...units.map((unit) => ({
                      value: unit.id,
                      label: unit.nom,
                  })),
              ]
            : [{ value: "", label: "Sur-Unité" }];

    const unit_type = [
        { value: "", label: "Type d'unité" },
        { value: "isDivision", label: "Division" },
        { value: "isBureau", label: "Bureau" },
    ];





    const onSubmitAdd = async (data) => {
        const unit_data = {
            ...data,
            division_id:
                data.division_id == "" ? null : Number(data.division_id),
            isDivision: data.unit_type == "isDivision",
            isBureau: data.unit_type == "isBureau",
            isDependant: data.division_id ? true : false,
        };

        delete unit_data.unit_type;

        try {
            const response = await axios.post(`${url}/unit`, unit_data);
            if (response) {
                console.log("ito:", response.data);
                setAdd(!add);
            }
        } catch (error) {
            console.log(error);
        }
    };

    
    const onSubmitEdit = async (data) => {
        const edit_data = {
            ...data,
            isDivision: data.unit_type == "isDivision" ,
            isBureau : data.unit_type == "isBureau",
            isDependant: data.division_id ? true : false ,
        }

        delete edit_data.unit_type

        console.log({id: selected_unit.id , ...edit_data})
        setEdit(!edit)
    };

    
    
    const onSubmitDelete = async (data) => {
        console.log(data);
    };

    
    const handleEdit = (unit)=>{
        setEdit(!edit)
        setSelected_unit(unit)
        resetEdit({
            nom:unit.nom ,
            unit_type: unit.isDivision ? "isDivision" : "isBureau",
            division_id: unit.sur_division ? unit.sur_division.id : null
        })
    }
    

    useEffect(() => {
        if (unit_type_value == "isDivision") {
            setValueAdd("division_id", null);
        }

        if (unit_type_value_edit == "isDivision") {
            setValueEdit("division_id", null);
        }
    }, [unit_type_value , unit_type_value_edit]);


    return (
        <>
            <MainContainer>
               <SearchContainer>Search goes here</SearchContainer>
                <div>
                    <Table
                        popup={add}
                        addPopUp={setAdd}
                        data={units}
                        edit={edit}
                        setEdit={setEdit}
                        del={del}
                        setDel={setDel}
                        onEdit = {handleEdit}
                    />
                </div>
            </MainContainer>
            {add && (
                <PopUpContainer popup={add} closePopUp={setAdd} >
                    <FormProvider {...methodAdd}>
                        <form onSubmit={methodAdd.handleSubmit(onSubmitAdd)} className="min-w-[20vw]">
                            <div className="text-center text-lg">
                                Nouvelle unité
                            </div>
                            <div className="mt-6">
                                <Input
                                    label={"Nom :"}
                                    name={"nom"}
                                    validation={{
                                        required: "valeure requise",
                                    }}
                                />
                            </div>

                            <div className="mt-3">
                                <Select
                                    label={"Type d'unité :"}
                                    name={"unit_type"}
                                    options={unit_type}
                                    className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                            {unit_type_value == "isBureau" && (
                                <div className="mt-3">
                                    <Select
                                        label={"Sur-Unité :"}
                                        name={"division_id"}
                                        options={units_options}
                                        className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                                    />
                                </div>
                            )}

                            <div className="mt-6 flex flex-row justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 py-1 px-3 text-white rounded-[8px]"
                                >
                                    valider
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </PopUpContainer>
            )}

            {edit && (
                <PopUpContainer popup={edit} closePopUp={setEdit}>
                    <FormProvider {...methodEdit}>
                        <form onSubmit={methodEdit.handleSubmit(onSubmitEdit)} className="min-w-[20vw]">
                            <div className="text-center text-lg">
                                Modification Unité :
                            </div>
                            <div className="mt-6">
                                <Input
                                    label={"Nom :"}
                                    name={"nom"}
                                    validation={{
                                        required: "valeure requise",
                                    }}
                                />
                            </div>

                            <div className="mt-3">
                                <Select
                                    label={"Type d'unité :"}
                                    name={"unit_type"}
                                    options={unit_type}
                                    className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                                    validation={{
                                        required: "Valeur requise",
                                    }}
                                />
                            </div>
                            {unit_type_value_edit == "isBureau" && (
                                <div className="mt-3">
                                    <Select
                                        label={"Sur-Unité :"}
                                        name={"division_id"}
                                        options={units_options}
                                        className="border-[2px] border-gray-300 px-3 py-2 rounded-[8px] cursor-pointer"
                                    />
                                </div>
                            )}

                            <div className="mt-6 flex flex-row justify-end">
                                <button
                                    type="submit"
                                    className="bg-blue-500 py-1 px-3 rounded-[8px] text-white"
                                >
                                    valider
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </PopUpContainer>
            )}
        </>
    );
}

export default CSUnits;
