import { FormProvider } from "react-hook-form";
import Input from "../../../components/forms/Input.jsx";
import Select from "../../../components/forms/Select.jsx";
import { useState } from "react";
import SelectSearch from "../../../components/forms/SelectSearch.jsx";
import FileInput from "../../../components/forms/FileInput.jsx";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    filterObjdiff,
    filterObjSame,
    isArrayNotNull,
} from "../../../functions/Functions.js";

// eslint-disable-next-line react/prop-types
function AddInterview({ method, offre, handleCreateInterview }) {
    const url = useSelector((state) => state.backendUrl.value);
    const stagiaires = useSelector((state) => state.stagiaire.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);

    const [newIntern, setNewIntern] = useState(false);
    const available_stagiaires = filterObjdiff(stagiaires, "entretiens");
    const offre_options = isArrayNotNull(offre)
        ? [
              { value: "", label: "Offres de stage" },
              ...offre.map((offre) => ({
                  // eslint-disable-next-line react/prop-types
                  value: offre.id,
                  // eslint-disable-next-line react/prop-types
                  label: offre.nom,
              })),
          ]
        : [{ value: "", label: "Offres de stage" }];

    const stagiaire_option = isArrayNotNull(available_stagiaires)
        ? [
              ...available_stagiaires.map((stagiaire) => ({
                  value: stagiaire.id,
                  label: `${stagiaire.nom} ${stagiaire.prenom}`,
              })),
          ]
        : [];

    const [loading, setLoading] = useState(false);

    const handleNewIntern = () => {
        setNewIntern(!newIntern);
    };

    const submitWithIntern = async (data) => {
        const formData = new FormData();
        formData.append("nom", data.nom);
        formData.append("prenom", data.prenom);
        formData.append("email", data.email);
        formData.append("phone", data.phone);
        formData.append("niveau", data.niveau);
        formData.append("filiere", data.filiere);
        formData.append("etablissement", data.etablissement);
        formData.append("offre_id", Number(data.offre_id));

        if (data.cv_link && data.cv_link.length > 0) {
            formData.append("cv_link", data.cv_link[0]);
        }
        if (data.lm_link && data.lm_link.length > 0) {
            formData.append("lm_link", data.lm_link[0]);
        }

        try {
            const response = await axios.post(
                `${url}/entretientStagiaire`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            // console.log(response);
            handleCreateInterview();
        } catch (e) {
            const erreur = e.response.data.message;
            toast.error(erreur, toastConfig);
        } finally {
            setLoading(false);
            handleCreateInterview()
        }
    };

    const Submit = async (data) => {
        const body = {
            offre_id: Number(data.offre_id),
            stagiaire_id: Number(data.stagiaire_id),
        };
        try {
            const submited = await axios.post(`${url}/entretient`, body);
            if (submited) {
                console.log("submitted");
                handleCreateInterview()
            }
        } catch (error) {
            console.log(error);
        } finally{
            setLoading(false);
        }
    };

    const onSubmit = (data) => {
        if (newIntern) {
            setLoading(true);
            submitWithIntern(data);
        } else {
            setLoading(true);
            Submit(data);
        }
    };

    return (
        <>
            <div className={"  flex flex-col min-w-[25vw]"}>
                <div className={"mb-4 text-[18px]"}>Nouvel Entretient :</div>
                <div>
                    <FormProvider {...method}>
                        {/* eslint-disable-next-line react/prop-types */}
                        <form onSubmit={method.handleSubmit(onSubmit)}>
                            <div className={"mb-3"}>
                                <Select
                                    label="Offre"
                                    name={"offre_id"}
                                    options={offre_options}
                                    className={
                                        "border-[2px] border-gray-400 rounded-[8px] p-2"
                                    }
                                />
                            </div>

                            {!newIntern ? (
                                <div className={"flex flex-row items-end"}>
                                    <div className={"flex-1 mr-4 "}>
                                        <SelectSearch
                                            label="Stagiaire"
                                            name="stagiaire_id"
                                            option={stagiaire_option}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            className={
                                                "bg-blue-500 p-2 text-white rounded-[8px] hover:bg-blue-600"
                                            }
                                            type={"button"}
                                            onClick={handleNewIntern}
                                        >
                                            Nouveau Stagiaire
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <button
                                            className={
                                                "bg-blue-500 p-2 text-white rounded-[8px] hover:bg-blue-600"
                                            }
                                            type={"button"}
                                            onClick={handleNewIntern}
                                        >
                                            Choisir un stagiaire
                                        </button>
                                    </div>
                                    <div className={"flex flex-col "}>
                                        <div
                                            className={
                                                "flex flex-row items-center justify-between mb-3 mt-3"
                                            }
                                        >
                                            <div className={"mr-6"}>
                                                <Input
                                                    label={"Nom"}
                                                    name={"nom"}
                                                />
                                            </div>
                                            <div className={""}>
                                                <Input
                                                    label={"Prenoms"}
                                                    name={"prenom"}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                "flex flex-row items-center justify-between mb-3"
                                            }
                                        >
                                            <div className={""}>
                                                <Input
                                                    label={"Email"}
                                                    name={"email"}
                                                />
                                            </div>

                                            <div className={""}>
                                                <Input
                                                    label={"Phone"}
                                                    name={"phone"}
                                                />
                                            </div>
                                        </div>

                                        <div
                                            className={
                                                "flex flex-row items-center justify-between mb-3"
                                            }
                                        >
                                            <div className={""}>
                                                <Input
                                                    label={"Niveau"}
                                                    name={"niveau"}
                                                />
                                            </div>
                                            <div className={""}>
                                                <Input
                                                    label={"Filiere"}
                                                    name={"filiere"}
                                                />
                                            </div>
                                        </div>

                                        <div className={"mb-2"}>
                                            <Input
                                                label={"Etabliessement"}
                                                name={"etablissement"}
                                            />
                                        </div>

                                        <div
                                            className={
                                                "flex flex-row items-center justify-between"
                                            }
                                        >
                                            <div className={"mb-2"}>
                                                <FileInput
                                                    type={"file"}
                                                    label={"CV numerique"}
                                                    name={"cv_link"}
                                                    className={
                                                        " border-[2px] p-2 rounded-[8px] border-gray-300 w-48"
                                                    }
                                                />
                                            </div>

                                            <div className={"mb-2"}>
                                                <FileInput
                                                    type={"file"}
                                                    label={"LM numerique"}
                                                    name={"lm_link"}
                                                    className={
                                                        " border-[2px] p-2 rounded-[8px] border-gray-300 w-48"
                                                    }
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className={"flex flex-row justify-end mt-6"}>
                                <button
                                    className={
                                        "bg-blue-500 text-white px-4 py-1 rounded-[8px] hover:bg-blue-600"
                                    }
                                >
                                    Valider
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>

            {loading && (
                <div className="absolute top-0 left-0 w-full h-full rounded-[15px] flex justify-center items-center  bg-gray-500 opacity-40  ">
                    <div className="text-white text-[22px]">Loading ...</div>
                </div>
            )}
        </>
    );
}

export default AddInterview;
