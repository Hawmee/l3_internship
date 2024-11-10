import React, { useState } from "react";
import axios from "axios";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Loader2 } from "lucide-react";
import FileInput from "../../../components/forms/FileInput.jsx";
import Input from "../../../components/forms/Input.jsx";
import Select from "../../../components/forms/Select.jsx";
import SelectSearch from "../../../components/forms/SelectSearch.jsx";
import {
    filterObjSame,
    isArrayNotNull
} from "../../../functions/Functions.js";
import { observation_stagiaire } from "../../../utils/Observations.js";

function AddInterview({ method, offre, handleCreateInterview }) {
    const url = useSelector((state) => state.backendUrl.value);
    const stagiaires = useSelector((state) => state.stagiaire.value);
    const toastConfig = useSelector((state) => state.toastConfig.value);

    const [newIntern, setNewIntern] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const available_stagiaires = stagiaires.filter(stagiaire =>
        ((stagiaire.observation == observation_stagiaire.postulant || stagiaire.observation == observation_stagiaire.ancien) && (stagiaire.cv_link||stagiaire.lm_link))
    );
    const possible_stagaires = filterObjSame(available_stagiaires, "cv_link");

    const offre_options = isArrayNotNull(offre)
        ? [
              { value: "", label: "Offres de stage" },
              ...offre.map((offre) => ({
                  value: offre.id,
                  label: offre.nom,
              })),
          ]
        : [{ value: "", label: "Offres de stage" }];

    const stagiaire_option = isArrayNotNull(possible_stagaires)
        ? [
              ...available_stagiaires.map((stagiaire) => ({
                  value: stagiaire.id,
                  label: `${stagiaire.nom} ${stagiaire.prenom}`,
              })),
          ]
        : [];

    const handleNewIntern = () => {
        setNewIntern(!newIntern);
    };

    const submitWithIntern = async (data) => {
        const formData = new FormData();
        formData.append("nom", (data.nom || "").toUpperCase());
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
            await axios.post(
                `${url}/entretientStagiaire`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    onUploadProgress: (progressEvent) => {
                        const percentCompleted = Math.round(
                            (progressEvent.loaded * 100) / progressEvent.total
                        );
                        setUploadProgress(percentCompleted);
                    }
                }
            );
            
            toast.success("Entretien créé avec succès!", toastConfig);
            handleCreateInterview();
        } catch (e) {
            const erreur = e.response?.data?.message || "Une erreur est survenue";
            toast.error(erreur, toastConfig);
        } finally {
            setIsSubmitting(false);
            setUploadProgress(0);
        }
    };

    const Submit = async (data) => {
        const body = {
            offre_id: Number(data.offre_id),
            stagiaire_id: Number(data.stagiaire_id),
        };
        try {
            await axios.post(`${url}/entretient`, body);
            toast.success("Entretien créé avec succès!", toastConfig);
            handleCreateInterview();
        } catch (error) {
            toast.error("Erreur lors de la création de l'entretien", toastConfig);
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const onSubmit = (data) => {
        setIsSubmitting(true);
        if (newIntern) {
            submitWithIntern(data);
        } else {
            Submit(data);
        }
    };

    return (
        <div className="relative">
            <div className="flex flex-col min-w-[25vw]">
                <div className="mb-4 text-[18px]">Nouvel Entretien :</div>
                <div className={`relative ${isSubmitting ? 'opacity-70' : ''}`}>
                    {isSubmitting && (
                        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 z-10 rounded-lg">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-500 mb-2" />
                            {uploadProgress > 0 && (
                                <div className="w-64">
                                    <div className="text-sm text-center mb-1">
                                        Téléchargement: {uploadProgress}%
                                    </div>
                                    <div className="h-2 bg-gray-200 rounded-full">
                                        <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                            style={{ width: `${uploadProgress}%` }}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    <FormProvider {...method}>
                        <form onSubmit={method.handleSubmit(onSubmit)}>
                            <div className="mb-3">
                                <Select
                                    label="Offre"
                                    name="offre_id"
                                    options={offre_options}
                                    className="border-2 border-gray-400 rounded-lg p-2"
                                    validation={{ required: "Valeur requise" }}
                                    disabled={isSubmitting}
                                />
                            </div>

                            {!newIntern ? (
                                <div className="flex flex-row items-end">
                                    <div className="flex-1 mr-4">
                                        <SelectSearch
                                            label="Stagiaire"
                                            name="stagiaire_id"
                                            option={stagiaire_option}
                                            disabled={isSubmitting}
                                        />
                                    </div>

                                    <div>
                                        <button
                                            className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            type="button"
                                            onClick={handleNewIntern}
                                            disabled={isSubmitting}
                                        >
                                            Nouveau Stagiaire
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div>
                                        <button
                                            className="bg-blue-500 p-2 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
                                            type="button"
                                            onClick={handleNewIntern}
                                            disabled={isSubmitting}
                                        >
                                            Choisir un stagiaire
                                        </button>
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="flex flex-row items-center justify-between mb-3 mt-3">
                                            <div className="mr-6">
                                                <Input
                                                    label="Nom"
                                                    name="nom"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Prenoms"
                                                    name="prenom"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center justify-between mb-3">
                                            <div>
                                                <Input
                                                    label="Email"
                                                    name="email"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Phone"
                                                    name="phone"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="flex flex-row items-center justify-between mb-3">
                                            <div>
                                                <Input
                                                    label="Niveau"
                                                    name="niveau"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                            <div>
                                                <Input
                                                    label="Filiere"
                                                    name="filiere"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-2">
                                            <Input
                                                label="Etablissement"
                                                name="etablissement"
                                                disabled={isSubmitting}
                                                validation={{ required: "Valeur requise" }}
                                            />
                                        </div>

                                        <div className="flex flex-row items-center justify-between">
                                            <div className="mb-2">
                                                <FileInput
                                                    type="file"
                                                    label="CV numerique"
                                                    name="cv_link"
                                                    className="border-2 p-2 rounded-lg border-gray-300 w-48"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>

                                            <div className="mb-2">
                                                <FileInput
                                                    type="file"
                                                    label="LM numerique"
                                                    name="lm_link"
                                                    className="border-2 p-2 rounded-lg border-gray-300 w-48"
                                                    disabled={isSubmitting}
                                                    validation={{ required: "Valeur requise" }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}

                            <div className="flex flex-row justify-end mt-6">
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <Loader2 className="h-4 w-4 animate-spin" />
                                            <span>Traitement...</span>
                                        </>
                                    ) : (
                                        <span>Valider</span>
                                    )}
                                </button>
                            </div>
                        </form>
                    </FormProvider>
                </div>
            </div>
        </div>
    );
}

export default AddInterview;