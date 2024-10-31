import React, { useEffect, useState } from "react";
import Form from "../../../components/forms/Form";
import { addMonths, format, startOfToday } from "date-fns";
import Input from "../../../components/forms/Input";
import DatePicker from "../../../components/forms/DatePicker";
import axios from "axios";
import { useSelector } from "react-redux";
import { FormProvider} from "react-hook-form";

function AddOffre({ unite_id, handleAdd , method}) {
    const url = useSelector((state) => state.backendUrl.value);
    const {watch , setValue}=method
    const today_date = startOfToday();
    const today = format(today_date, "yyyy-MM-dd'T'HH:mm");
    const afterMonth = format(addMonths(today_date, 1), "yyyy-MM-dd'T'HH:mm");
    const [date_fin , setDate_fin]=useState(afterMonth)

    const date_debut = watch("date_debut")

    const add = async (data) => {
        try {
            const added_offre = await axios.post(`${url}/offre`, data);
            if (added_offre) {
                console.log(added_offre);
                handleAdd();
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (data) => {
        const offre_data = {
            ...data,
            date_debut: format(data.date_debut, "yyyy-MM-dd'T'HH:mm:ss.000'Z"),
            date_fin: format(data.date_fin, "yyyy-MM-dd'T'HH:mm:ss.000'Z"),
            unite_id: Number(unite_id),
        };

        add(offre_data);
    };


    useEffect(()=>{
        if(date_debut){
            const after_month = format(addMonths(date_debut, 1), "yyyy-MM-dd'T'HH:mm");
            setDate_fin(after_month)
        }
    } , [date_debut])

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
                                label={"Theme"}
                                name={"theme"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Competence requise"}
                                name={"competence_requis"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <DatePicker
                                label={"Date debut :"}
                                name={"date_debut"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="datetime-local"
                                min={today}
                            />
                        </div>

                        <div className="mt-2">
                            <DatePicker
                                label={"Date fin :"}
                                name={"date_fin"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="datetime-local"
                                min={date_fin}
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
