import React, { useState } from "react";
import { FormProvider } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import FileInput from "../../../../components/forms/FileInput";
import {
    ChevronDown,
    ChevronUp,
    ChevronUpCircle,
    CircleHelp,
    Pen,
    X,
} from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Edit({ method, handle_edit, data }) {
    const [docs, setDocs] = useState(false);

    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector(state=>state.toastConfig.value)
    const id = data.id;

    const handle_docs = () => {
        setDocs(!docs);
    };

    const submit = async (datas) => {
        const formData = new FormData();
        Object.entries(datas).forEach(([key, value]) => {
            formData.append(key, value);
        });

        if (datas.cv_link && datas.cv_link[0]) {
            formData.append("cv_link", datas.cv_link[0]);
        }
        if (datas.lm_link && datas.lm_link[0]) {
            formData.append("lm_link", datas.lm_link[0]);
        }

        try {
            const submited = await axios.patch(
                `${url}/stagiaire/${id}`,
                formData,
                {
                    headers: { "Content-Type": "multipart/form-data" },
                }
            );
            if (submited){
                const message = submited.data.message
                const type = submited.data.type
                if(type=="warning"){
                    toast.warning(message , toastconfig)
                }else{
                    toast.success(message , toastconfig)
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const onSubmit = (data) => {
        console.log(data);
        submit(data)
    };

    return (
        <>
            <div className="flex flex-col min-w-[25vw]">
                <div className={"mb-4 text-[18px] text-center"}>
                    Modification Stagiaire
                </div>
            </div>
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="flex flex-row mb-3 justify-between mt-3">
                        <div className="">
                            <Input
                                label={"Nom"}
                                name={"nom"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                        <div className="">
                            <Input
                                label={"Prenom"}
                                name={"prenom"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mb-3 justify-between">
                        <div className="">
                            <Input
                                label={"Email"}
                                name={"email"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                        <div className="">
                            <Input
                                label={"Phone "}
                                name={"phone"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                    </div>
                    <div className="flex flex-row mb-3 justify-between">
                        <div className="">
                            <Input
                                label={"Niveau"}
                                name={"niveau"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                        <div className="">
                            <Input
                                label={"Filiere "}
                                name={"filiere"}
                                validation={{
                                    required: "Valeur reuise",
                                }}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <Input
                            label={"Etablissement"}
                            name="etablissement"
                            validation={{
                                required: "Valeur reuise",
                            }}
                        />
                    </div>

                    {(data.cv_link || data.lm_link) && (
                        <div
                            className=" mt-2 flex flex-row justify-end items-center text-blue-400 hover:text-blue-500 text-[18px]x"
                            onClick={() => {
                                handle_docs();
                            }}
                        >
                            {!docs ? (
                                <ChevronDown size={19} />
                            ) : (
                                <ChevronUp size={19} />
                            )}

                            <p type="button" className=" ml-1 cursor-pointer">
                                Modifier les Documents
                            </p>
                        </div>
                    )}

                    {(!data.cv_link || !data.lm_link || docs) && (
                        <>
                            <div className="mb-3">
                                <FileInput
                                    label={"CV Numerique"}
                                    name="cv_link"
                                    validation={
                                        !data.cv_link && {
                                            required: "Valeur reuise",
                                        }
                                    }
                                    className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                                />
                            </div>
                            <div className="mb-3">
                                <FileInput
                                    label={"LM Numerique"}
                                    name="lm_link"
                                    validation={
                                        !data.lm_link && {
                                            required: "Valeur reuise",
                                        }
                                    }
                                    className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                                />
                            </div>
                        </>
                    )}

                    <div className="mt-9 flex flex-row justify-end ">
                        <button
                            className="bg-gray-500 text-white py-2 px-6 rounded-[8px] mr-4"
                            type="button"
                            onClick={() => {
                                handle_edit();
                            }}
                        >
                            Annuler
                        </button>
                        <button className="bg-blue-500 text-white py-2 px-6 rounded-[8px]">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Edit;