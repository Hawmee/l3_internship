import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import FileInput from "../../../../components/forms/FileInput";
import { differenceInMonths, format } from "date-fns";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import { Stage } from "../../../../services/stage";
import { today_string } from "../../../../functions/Functions";
import AttestationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import n2words from "n2words";


function Book({ data, onBook }) {
    const method = useForm();
    const stagiaire = data.stagiaire;
    const stage = data;
    const date = format(new Date(), "dddd-MM");
    const numero = `${date}${stagiaire.id}`;

    const generate = async () => {
        const duree =
            Number(differenceInMonths(stage.date_fin, stage.date_debut)) == 0
                ? 1
                : differenceInMonths(stage.date_fin, stage.date_debut);
        const attestation = {
            numero: numero,
            stagiaire: `${stagiaire.nom.toUpperCase()} ${stagiaire.prenom}`,
            lettre_duree: n2words(duree , {lang: 'fr'}),
            duree: duree,
        };
        const today = today_string();
        const pdfBlob = await pdf(
            <AttestationPDF isAttestation={true} attestation={attestation} />
        ).toBlob();
        const url_pdf = URL.createObjectURL(pdfBlob);

        const printWindow = window.open(url_pdf);
        if (printWindow) {
            printWindow.onload = () => {
                printWindow.onafterprint = () => printWindow.close();
            };
        }
    };

    const submit = async (data) => {
        const { book } = data;
        const formData = new FormData();
        if (data.book && data.book[0]) {
            formData.append("book", data.book[0]);
        }
        formData.append("numero", numero);

        for (let [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }

        try {
            const booked = await Stage.booking(Number(stage.id), formData);
            if (booked) {
                notifySuccess();
                onBook();
                generate()
            }
        } catch (error) {
            console.log(error);
            notifyError();
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    return (
        <>
            <FormProvider {...method}>
                <form
                    className="w-[20vw]"
                    onSubmit={method.handleSubmit(onSubmit)}
                >
                    <div className=" mb-4 text-center text-lg px-12 ">
                        <div className="pb-2 border-b-2 border-gray-300">
                            Finalisation du Stage:
                        </div>
                    </div>
                    <div className="mb-3">
                        <FileInput
                            label={"Rapport de stage Final"}
                            name={"book"}
                            validation={{
                                required:
                                    "Fichier requise pour la finalisation du stage",
                            }}
                            className="border-[2px] border-gray-300 p-2 rounded-[8px]"
                        />
                    </div>
                    <div className="flex flex-row justify-end text-white mt-4">
                        <button
                            type="button"
                            className=" bg-gray-500 hover:bg-gray-600 px-4 py-1 rounded-lg mr-2"
                            onClick={() => {
                                onBook();
                            }}
                        >
                            Annuler
                        </button>
                        <button
                            type="submit"
                            className=" bg-blue-500 hover:bg-blue-600 px-4 py-1 rounded-lg"
                        >
                            Valider
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Book;
