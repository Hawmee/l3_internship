import axios from "axios";
import { addMonths, format, startOfToday } from "date-fns";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import DatePicker from "../../../../components/forms/DatePicker";
import Input from "../../../../components/forms/Input";
import { toast } from "react-toastify";

function Edit({offre , hanldeEdit , method}) {

    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector(state=>state.toastConfig.value)
    const id = Number(offre.id)
    const {watch , setValue , reset}=method

    const submit = async (data)=>{
        try {
            const submited = await axios.patch(`${url}/offre/${id}` , data)
            if(submited){
                const message = "Action reussit !!!"
                hanldeEdit()
                toast.success(message , toastconfig )
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const onSubmit = (data)=>{
        const offer_data = {
            ...data ,
            nombre_stagiaire: Number(data.nombre_stagiaire),
            duree : Number(data.duree)
        }

        submit(offer_data)
    }

    useEffect(()=>{
        if(offre){
            reset({
                nom:offre.nom,
                mention_requise:offre.mention_requise,
                option_requise:offre.option_requise,
                nombre_stagiaire: offre.nombre_stagiaire,
                duree:offre.duree,
            })
        }
    } , [offre])


    return (
        <>
            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(onSubmit)}
                    className="min-w-[25vw]"
                >
                    <div className=" flex flex-col">
                        <div className="text-[19px] text-center">
                            Modification Offre
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
                                label={"Mention requise"}
                                name={"mention_requise"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mt-2">
                            <Input
                                label={"Option requise"}
                                name={"option_requise"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>
                        <div className="mt-2">
                            <Input
                                label={"Nobre de Stagiaire Requise"}
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
                                label={"Durée du stage (mois)"}
                                name={"duree"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="number"
                                min={1}
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

export default Edit;
