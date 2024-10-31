import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import Input from "../../../../components/forms/Input";
import FileInput from "../../../../components/forms/FileInput";
import { useSelector } from "react-redux";
import axios from "axios";

function New({handle_new}) {
    const method = useForm()
    const url = useSelector(state=>state.backendUrl.value)

    const Submit = async(data)=>{
      const formData = new FormData()
      formData.append('nom' , data.nom)
      formData.append('prenom' , data.prenom)
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
            headers:{
                "Content-Type" : "multipart/form-data"
            }
          }
        )
        console.log(submited)
        handle_new()
      } catch (error) {
        console.log(error);
      } 
    }

    const onSubmit = (data)=>{
      Submit(data)
      
    }
    return (
        <>
            <div className="flex flex-col min-w-[25vw]">
                <div className={"mb-4 text-[18px]"}>Nouveau Stagiaire</div>
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
                    <div className="mb-3">
                        <FileInput
                            label={"CV Numerique"}
                            name="cv_link"
                            validation={{
                                required: "Valeur reuise",
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                        />
                    </div>
                    <div className="mb-3">
                        <FileInput
                            label={"LM Numerique"}
                            name="lm_link"
                            validation={{
                                required: "Valeur reuise",
                            }}
                            className="p-2 border-[2px] border-gray-300 rounded-[8px]"
                        />
                    </div>

                    <div className="mt-9 flex flex-row justify-end ">
                          <button className="bg-gray-500 text-white py-2 px-6 rounded-[8px] mr-4" type="button" onClick={()=>{handle_new()}}>Annuler</button>
                          <button className="bg-blue-500 text-white py-2 px-6 rounded-[8px]">Valider</button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default New;
