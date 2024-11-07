import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import FileInput from "../../../../components/forms/FileInput";
import Input from "../../../../components/forms/Input";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import { differenceInMonths } from "date-fns";

function Finish({ data, method, onFinish }) {
    const url = useSelector((state) => state.backendUrl.value);
    const toastconf = useSelector((state) => state.toastConfig.value);

    const id = data.id;
    const stage = data;
    const stagiaire = stage.stagiaire
    const  unite = stage.unite
    const encadreur = unite.users.find(user=>user.status)

    const {watch ,reset}=method
    const comp_pro = watch('comportement_pro')
    const pert_tech = watch('pertinence_tech')
    const pert_pedago = watch('pertinance_pedago')
    const [obs,setObs]=useState('Bien')

    const people = {
        stagiaire:{
            nom:stagiaire.nom+' '+stagiaire.prenom,
            origine:stagiaire.etablissement,
            niveau: stagiaire.niveau,
            periode: differenceInMonths(stage.date_fin , stage.date_debut)
        },
        encadreur:{
            nom: encadreur.nom+" "+encadreur.prenom,
            fonction: "Chef de division",
            serv: unite.nom
        }
    
    }

    const generate = async ()=>{

        const formValue = method.getValues()

        const evaluation = {
            pro: formValue.comportement_pro,
            tech: formValue.pertinence_tech,
            pedago: formValue.pertinance_pedago,
            total:
                Number(formValue.comportement_pro) +
                Number(formValue.pertinence_tech) +
                Number(formValue.pertinance_pedago),
            observ: obs.toUpperCase(),
            actor: people,
        }

        const pdfBlob = await pdf(<AttestationPDF isEvaluation={true} evaluation={evaluation} />).toBlob()
        const url_pdf = URL.createObjectURL(pdfBlob)
        
        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                printWindow.onafterprint = () => printWindow.close();
            }            
        }
        
    }


    const submit = async (data) => {
        if (!stage.performance) {
            const { book, ...performance } = data;
            const formData = new FormData();
            if (data.book && data.book[0]) {
                formData.append("book", data.book[0]);
            }
            formData.append("stage", JSON.stringify(stage));
            formData.append("performance", JSON.stringify(performance));
            try {
                const finished = await axios.patch(
                    `${url}/stage/finish/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (finished) {
                    const message = "Action reussite !!";
                    toast.success(message, toastconf);
                    onFinish();
                }
            } catch (error) {
                console.log(error);
            }
        } else {
            const { book, ...performance } = data;
            const formData = new FormData();
            if (data.book && data.book[0]) {
                formData.append("book", data.book[0]);
            }
            formData.append("stage", JSON.stringify(stage));
            formData.append("performance", JSON.stringify(performance));

            try {
                const finished = await axios.patch(
                    `${url}/stage/revalid/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type": "multipart/form-data",
                        },
                    }
                );
                if (finished) {
                    const message = "Action reussite !!";
                    toast.success(message, toastconf);
                    onFinish();
                }
            } catch (error) {
                console.log(error);
            }
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };


    useEffect(()=>{
        const total = Number(comp_pro)+Number(pert_tech)+Number(pert_pedago)
        if(total <20 ){
            setObs('Mauvais')
        }else if(total<30){
            setObs('Assez-Bien')
        }else if(total<40){
            setObs('Bien')
        }else if(total<50){
            setObs('Tres-Bien')
        }else{
            setObs('Excellent')
        }


        reset({
            observation:obs,
        })
    } , [comp_pro,pert_tech,pert_pedago])

    return (
        <>
            <div className="min-w-[25vw] text-lg text-center mb-4">
                Validation du Stage
            </div>
            <FormProvider {...method}>
                <form onSubmit={method.handleSubmit(onSubmit)}>
                    <div className="pb-3 border-b-[2px] border-gray-300">
                        <FileInput
                            label={"Rapport de stage"}
                            name={"book"}
                            validation={{
                                required:
                                    "Fichier requise pour validation de stage",
                            }}
                            className="border-[2px] border-gray-300 p-2 rounded-[8px]"
                        />
                    </div>

                        <div>
                            <div className="text-center text-lg mt-2 mb-4">
                                Performance du stage(/20)
                            </div>
                            <div className="mb-3">
                                <Input 
                                    label={"Comportement professionel"}
                                    name={"comportement_pro"}
                                    validation={{ 
                                        required:"Valeur requise"
                                     }}
                                    type="number"
                                    min={0}
                                    max={20}
                                    defaultValue={10}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                    label={"Pertinance technique"}
                                    name={"pertinence_tech"}
                                    validation={{ 
                                        required:"Valeur requise"
                                     }}
                                    type="number"
                                    min={0}
                                    max={20}
                                    defaultValue={10}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                    label={"Pertinence pedagogique"}
                                    name={"pertinance_pedago"}
                                    validation={{ 
                                        required:"Valeur requise"
                                     }}
                                    type="number"
                                    min={0}
                                    max={20}
                                    defaultValue={10}
                                />
                            </div>
                            <div className="mb-3">
                                <Input 
                                        label={"Observation"}
                                        name={"observation"}
                                        validation={{ 
                                            required:"Valeur requise"
                                        }}
                                        type="text"
                                        readOnly
                                    />
                            </div>

                            <div className="mt-3 flex felx-row justify-end">
                                    <p className="text-blue-500 underline underline-offset-4 cursor-pointer "
                                        onClick={()=>{
                                            generate()
                                        }}
                                    >Voir apercu</p>   
                            </div>
                        </div>

                    <div className="mt-6 flex flex-row justify-end text-white">
                        <button
                            className="bg-gray-600 px-4 py-1 rounded-[8px] hover:bg-gray-500 mr-2"
                            onClick={() => {
                                onFinish();
                            }}
                            type="button"
                        >
                            Annuler
                        </button>
                        <button className="bg-blue-500 px-4 py-1 rounded-[8px] hover:bg-blue-600 ">
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Finish;
