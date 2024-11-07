import React from "react";
import { date_d_m_y, today_string } from "../../../../functions/Functions";
import AttesationPDF from "../../../../components/Files/AttesationPDF";
import { pdf } from "@react-pdf/renderer";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import axios from "axios";
import { useSelector } from "react-redux";

function Generate({ data, handleAttestation }) {
    const url = useSelector(state=>state.backendUrl.value)

    const stage = data
    const stagiaire = data.stagiaire;
    const attestation = data.attestation
    const offre = data.offre
    const unite = data.unite;
    const today = today_string();
    const id = data.id

    const generate = async ()=>{
        const info = {
            nom:`${stagiaire.nom} ${stagiaire.prenom}`,
            theme: offre.theme ,
            division:unite.nom,
            debut:date_d_m_y(data.date_debut),
            fin:date_d_m_y(data.date_fin),
            date:today ,
        }

        const pdfBlob = await pdf(<AttesationPDF data={info} />).toBlob()
        const url_pdf = URL.createObjectURL(pdfBlob)
        
        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                // printWindow.print()
                printWindow.onafterprint = () => printWindow.close();
            }            
        }
        
    }

    const onSubmit = async()=>{
        try {
            if(!attestation){
                const body ={
                    stage_id:Number(id)
                }
                const new_Attestation = await axios.post(`${url}/attestation` , body)
                if(new_Attestation){
                    const message = "Action reussite !"
                    notifySuccess(message)
                    generate()
                    handleAttestation()
                }
            }else{
                const update_Attesation = await axios.patch(`${url}/attestation/${attestation.id}`)
                if(update_Attesation){
                    const message = "Action reussite !"
                    notifySuccess(message)
                    generate()
                    handleAttestation()
                }
            }
        } catch (error) {
            console.log(error)
            const message = "Erreur lors de l'operation !"
            notifyError(message)
        }
    }

    return (
        <>
            <div className="flex flex-col min-w-[15vw]">
                <div className="text-center text-lg  mb-3">
                    <div className="border-b-[2px] border-gray-300 pb-2 ">
                        Generer une Attestation
                    </div>
                </div>
                <div className="text-lg">Voulez vous poursuivre cette action ?</div>
                <div className="flex flex-row justify-end text-white mt-4">
                    <button
                        className="bg-gray-600 hover:bg-gray-700 rounded-[8px] px-4 py-1 mr-3"
                        onClick={() => {
                            handleAttestation()
                        }}
                    >
                        Annuler
                    </button>
                    <button className="bg-blue-600 hover:bg-blue-700 rounded-[8px] px-4 py-1 "
                        onClick={()=>{
                            onSubmit()
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Generate;
