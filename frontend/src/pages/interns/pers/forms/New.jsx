import React, { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Input from "../../../../components/forms/Input";
import FileInput from "../../../../components/forms/FileInput";
import axios from "axios";

function New({ handle_new }) {
    const method = useForm();
    const url = useSelector(state => state.backendUrl.value);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);

    const Submit = async(data) => {
      setIsSubmitting(true);
      const formData = new FormData();
      formData.append('nom', (data.nom).toUpperCase());
      formData.append('prenom', data.prenom);
      formData.append("email", data.email);
      formData.append("phone", data.phone);
      formData.append("niveau", data.niveau);
      formData.append("filiere", data.filiere);
      formData.append("etablissement", data.etablissement);

      if (data.cv_link && data.cv_link.length > 0) {
          formData.append("cv_link", data.cv_link[0]);
      }
      if (data.lm_link && data.lm_link.length > 0) {
          formData.append("lm_link", data.lm_link[0]);
      }

      try {
        const submited = await axios.post(
          `${url}/stagiaire`,
          formData,
          {
            headers: {
                "Content-Type": "multipart/form-data"
            },
            onUploadProgress: (progressEvent) => {
                const percentCompleted = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                );
                setUploadProgress(percentCompleted);
            }
          }
        );
        
        toast.success("Stagiaire ajouté avec succès!");
        handle_new();
      } catch (error) {
        console.error(error);
        toast.error("Erreur lors de l'ajout du stagiaire. Veuillez réessayer.");
      } finally {
        setIsSubmitting(false);
        setUploadProgress(0);
      }
    }

    const onSubmit = (data) => {
      Submit(data);
    }

    return (
        <div className={`relative ${isSubmitting ? 'opacity-70' : ''}`}>
            {isSubmitting && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-50 z-10">
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
            
            <div className="flex flex-col min-w-[25vw]">
                <div className="mb-4 text-[18px]">Nouveau Stagiaire</div>
            </div>
            
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="flex flex-row mb-3 justify-between mt-3">
                        <div className="">
                            <Input
                                label="Nom"
                                name="nom"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Prenom"
                                name="prenom"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mb-3 justify-between">
                        <div className="">
                            <Input
                                label="Email"
                                name="email"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Phone"
                                name="phone"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="flex flex-row mb-3 justify-between">
                        <div className="">
                            <Input
                                label="Niveau"
                                name="niveau"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                        <div className="">
                            <Input
                                label="Filiere"
                                name="filiere"
                                validation={{
                                    required: "Valeur requise"
                                }}
                                disabled={isSubmitting}
                            />
                        </div>
                    </div>

                    <div className="mb-3">
                        <Input
                            label="Etablissement"
                            name="etablissement"
                            validation={{
                                required: "Valeur requise"
                            }}
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-3">
                        <FileInput
                            label="CV Numerique"
                            name="cv_link"
                            validation={{
                                required: "Valeur requise"
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mb-3">
                        <FileInput
                            label="LM Numerique"
                            name="lm_link"
                            validation={{
                                required: "Valeur requise"
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                            disabled={isSubmitting}
                        />
                    </div>

                    <div className="mt-9 flex flex-row justify-end">
                        <button 
                            className="bg-gray-500 text-white py-2 px-6 rounded-lg mr-4 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed" 
                            type="button" 
                            onClick={handle_new}
                            disabled={isSubmitting}
                        >
                            Annuler
                        </button>
                        <button 
                            className="bg-blue-500 text-white py-2 px-6 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                            type="submit"
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
    );
}

export default New;