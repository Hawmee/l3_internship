import axios from "axios";
import { addMonths, format, startOfToday } from "date-fns";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import DatePicker from "../../../../components/forms/DatePicker";
import Input from "../../../../components/forms/Input";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";

function AddOffre({ unite_id, handleAdd , method}) {
    const url = useSelector((state) => state.backendUrl.value);

    const add = async (data) => {
        try {
            const added_offre = await axios.post(`${url}/offre`, data);
            if (added_offre) {
                const message = "Action reussite !"
                handleAdd();
                notifySuccess(message)
            }
        } catch (error) {
            const message = "Erreur lors de l'operation"
            notifyError(message)
            console.log(error);
        }
    };

    const onSubmit = (data) => {
        const offre_data = {
            ...data,
            nombre_stagiaire: Number(data.nombre_stagiaire),
            duree : Number(data.duree),
            unite_id: Number(unite_id),
        };

        add(offre_data);
    };

    return (
        <>
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)} className="min-w-[25vw]">
                    <div className=" flex flex-col">
                        <div className="text-[19px] text-center">
                            Nouvelle Offre
                        </div>
                        <div className="mt-4">
                            <Input
                                label={"Offre"}
                                name={"nom"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Mention d'etude requise"}
                                name={"mention_requise"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Option de la Mention requise"}
                                name={"option_requise"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Nombre de Stagiaires requise"}
                                name={"nombre_stagiaire"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type='number'
                                min={1}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Durée du stage (mois) :"}
                                name={"duree"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="number"
                                min={1}
                                defaultValue ={1}
                            />
                        </div>

                        <div className="flex flex-row justify-end">
                            <button
                                className="mt-6 text-white bg-blue-500 px-3 py-1 rounded-[8px]"
                                type="submit"
                            >
                                Valider
                            </button>
                        </div>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default AddOffre;
