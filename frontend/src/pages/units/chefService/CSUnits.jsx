import React, { useEffect, useState } from "react";
import Table from "./Table";
import MainContainer from "../../../components/containers/MainContainer";
import TitleContainer from "../../../components/containers/TitleContainer";
import SearchContainer from "../../../components/containers/SearchContainer";
import PopUpContainer from "../../../components/containers/PopUpContainer";
import Form from "../../../components/forms/Form";
import Input from "../../../components/forms/Input";
import Select from "../../../components/forms/Select";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";

function CSUnits() {
    const methods = useForm();
    const { watch, setValue } = methods;
    const units = useSelector((state) => state.unit.value);
    const url = useSelector((state)=>state.backendUrl.value)
    const [add, setAdd] = useState(false);
    const unit_type_value = watch("unit_type");
    const units_options =
        Array.isArray(units) && units.length > 0
            ? [
                  { value: "", label: "Sur-Unité" },
                  ...units.map((unit) => ({
                      value: unit.id,
                      label: unit.nom,
                      name,
                  })),
              ]
            : [{ value: "", label: "Sur-Unité" }];

    // console.log(units_options);
    

    const unit_type = [
        { value: "", label: "Type d'unité" },
        { value: "isDivision", label: "Division" },
        { value: "isBureau", label: "Bureau" },
    ];


    const onSubmitAdd = async (data) => {
        const unit_data = {
            ...data,
            division_id: data.division_id ==''? null : Number(data.division_id),
            isDivision: data.unit_type == "isDivision",
            isBureau: data.unit_type =="isBureau",
            isDependant: data.division_id? true : false
        }

        delete unit_data.unit_type
        

        try {
            const response = await axios.post(`${url}/unit` , unit_data)
            if(response){
                console.log("ito:",response.data);
                // setAdd(!add);
            }
        } catch (error) {
            console.log(error)
        }

    };


    useEffect(() => {
        if (unit_type_value == "isDivision") {
            setValue("division_id", null);
        }
    }, [unit_type_value]);

    useEffect(()=>{
        console.log(units_options);
        console.log(units);
        
    } ,[ units])

    return (
        <>
            <MainContainer>
                <TitleContainer>Unités de travail :</TitleContainer>
                <SearchContainer>Search goes here</SearchContainer>
                <div>
                    <Table popup={add} addPopUp={setAdd}  data={units}/>
                </div>
            </MainContainer>
            {add && (
                <PopUpContainer popup={add} closePopUp={setAdd}>
                    <FormProvider {...methods}>
                        <form onSubmit={methods.handleSubmit(onSubmitAdd)}>
                            <div className="text-center text-lg">
                                Nouvelle unité
                            </div>
                            <div>
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

                            <div>
                                <button
                                    type="submit"
                                    className="bg-blue-500 py-1 px-2"
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
