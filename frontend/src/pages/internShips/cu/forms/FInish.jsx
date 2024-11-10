import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../../components/forms/FileInput";
import Input from "../../../../components/forms/Input";
import { toast } from "react-toastify";
import { differenceInMonths } from "date-fns";
import { pdf } from "@react-pdf/renderer";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { useSelector } from "react-redux";
import axios from "axios";

const Finish = ({ data, onFinish }) => {
    const url = useSelector(state=>state.backendUrl.value)
    const methods = useForm({
        mode: "onChange", // This enables real-time validation
        defaultValues: {
            pertinance_pro: "10",
            pertinance_tech: "10",
            pertinance_pedago: "10",
            observation: "Bien"
        }
    });

    const { watch, reset, formState: { isSubmitting, errors } } = methods;

    const comp_pro = watch('pertinance_pro');
    const pert_tech = watch('pertinance_tech');
    const pert_pedago = watch('pertinance_pedago');
    const [obs, setObs] = useState('Bien');

    const stage = data;
    const stagiaire = stage.stagiaire;
    const unite = stage.unite;
    const encadreur = unite.users.find(user => user.status);

    const generate = async () => {
        const formValue = methods.getValues();
        
        const people = {
            stagiaire: {
                nom: `${stagiaire.nom} ${stagiaire.prenom}`,
                origine: stagiaire.etablissement,
                niveau: stagiaire.niveau,
                periode: differenceInMonths(stage.date_fin, stage.date_debut)
            },
            encadreur: {
                nom: `${encadreur.nom} ${encadreur.prenom}`,
                fonction: "Chef de division",
                serv: unite.nom
            }
        };

        const evaluation = {
            pro: formValue.pertinance_pro,
            tech: formValue.pertinance_tech,
            pedago: formValue.pertinance_pedago,
            total: Number(formValue.pertinance_pro) +
                  Number(formValue.pertinance_tech) +
                  Number(formValue.pertinance_pedago),
            observ: formValue.observation.toUpperCase(),
            actor: people,
        };

        try {
            const pdfBlob = await pdf(<AttestationPDF isEvaluation={true} evaluation={evaluation} />).toBlob();
            const url_pdf = URL.createObjectURL(pdfBlob);
            
            const printWindow = window.open(url_pdf);
            if (printWindow) {
                printWindow.onload = () => {
                    printWindow.onafterprint = () => printWindow.close();
                };
            }
        } catch (error) {
            toast.error("Error generating PDF");
        }
    };

    const onSubmit = async (formData) => {
        try {
            const { book, ...performance } = formData;
            const formDataToSend = new FormData();
            
            if (book?.[0]) {
                formDataToSend.append("book", book[0]);
            }
            
            formDataToSend.append("stage", JSON.stringify(stage));
            formDataToSend.append("performance", JSON.stringify(performance));

            // Uncomment and modify the axios calls as needed
            const endpoint = !stage.performance 
                ? `${url}/stage/finish/${data.id}`
                : `${url}/stage/revalid/${data.id}`;
            
            const validate = await axios.patch(endpoint, formDataToSend, {
                headers: { "Content-Type": "multipart/form-data" }
            });

            if(validate){
                toast.success("Action réussie !");
                onFinish();
                generate()
            }
        } catch (error) {
            toast.error("Une erreur s'est produite");
            console.error(error);
        }
    };

    useEffect(() => {
        const total = Number(comp_pro) + Number(pert_tech) + Number(pert_pedago);
        let newObs = 'Mauvais';
        
        if (total >= 50) newObs = 'Excellent';
        else if (total >= 40) newObs = 'Tres-Bien';
        else if (total >= 30) newObs = 'Bien';
        else if (total >= 20) newObs = 'Assez-Bien';

        setObs(newObs);
        reset({ ...methods.getValues(), observation: newObs });
    }, [comp_pro, pert_tech, pert_pedago]);

    return (
        <div className="w-full max-w-2xl mx-auto p-4">
            <h2 className="text-lg font-semibold text-center mb-6">
                Validation du Stage
            </h2>
            
            <FormProvider {...methods}>
                <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="pb-4 border-b border-gray-200">
                        <FileInput
                            label="Rapport de stage"
                            name="book"
                            validation={{
                                required: 'Le rapport de stage est requis'
                            }}
                            className="border-2 border-gray-300 p-2 rounded-lg w-full"
                        />
                    </div>

                    <div className="space-y-4">
                        <h3 className="text-lg font-medium text-center">
                            Performance du stage (/20)
                        </h3>
                        
                        {[
                            { name: 'pertinance_pro', label: 'Comportement professionnel' },
                            { name: 'pertinance_tech', label: 'Pertinence technique' },
                            { name: 'pertinance_pedago', label: 'Pertinence pédagogique' }
                        ].map((field) => (
                            <Input
                                key={field.name}
                                label={field.label}
                                name={field.name}
                                type="number"
                                validation={{
                                    required: 'Ce champ est requis',
                                    min: { value: 0, message: 'Minimum 0' },
                                    max: { value: 20, message: 'Maximum 20' }
                                }}
                                min={0}
                                max={20}
                                className="w-full"
                            />
                        ))}

                        <Input
                            label="Observation"
                            name="observation"
                            type="text"
                            readOnly
                            className="w-full"
                        />

                        <div className="text-right">
                            <button
                                type="button"
                                onClick={generate}
                                className="text-blue-500 underline hover:text-blue-600"
                            >
                                Voir aperçu
                            </button>
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={onFinish}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-500 transition-colors"
                            disabled={isSubmitting}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                        >
                            {isSubmitting ? 'En cours...' : 'Valider'}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
};

export default Finish;