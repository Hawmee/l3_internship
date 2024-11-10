import axios from "axios";
import { addMonths, format } from "date-fns";
import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import DatePicker from "../../../../components/forms/DatePicker";
import Input from "../../../../components/forms/Input";
import { formatDate } from "../../../../functions/Functions";
import { observation_stage } from "../../../../utils/Observations";
import { pdf } from "@react-pdf/renderer";
import AttestationPDF from "../../../../components/Files/AttesationPDF";

function Confirm({ method, data, handleConfirm }) {
    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector((state) => state.toastConfig.value);
    // const offre_data = useSelector(state=>state.offre.value)
    const interv = data;
    const { reset } = method;
    const offres = data.offre;
    const unite = data.offre.unite;
    const stagiaire = data.stagiaire;
    const [nom, setNom] = useState(null);
    const [division, setDivision] = useState(null);
    const [max, setMax] = useState(6);
    const date_interview = format(
        formatDate(data.date_interview),
        "yyyy-MM-dd'T'HH:mm"
    );


    console.log(offres)

    const generate = async (data)=>{
        const encadreur = unite.users.find(user=>user.status)
        const reposne = {
            encadreur:{
                nom: encadreur.nom+" "+encadreur.prenom,
                fonction: 'Chef de division',
                serv: unite.nom,
            },
            offre:{
                mention: offres.mention_requise ,
                option : offres.option_requise ,
                nombre : Number(offres.nombre_stagiaire)+ Number(offres.entretiens.length)+Number(offres.stages.length) ,
                periode: offres.duree,
            }
        }

        const pdfBlob = await pdf(<AttestationPDF isReponse={true} reponse={reposne} />).toBlob()
        const url_pdf = URL.createObjectURL(pdfBlob)
        
        const printWindow = window.open(url_pdf)
        if(printWindow){
            printWindow.onload = ()=>{
                printWindow.onafterprint = () => printWindow.close();
            }            
        }
        
    }


    const submit = async (data) => {
        const body = {
            theme: data.theme,
            offre_id: Number(offres.id),
            interview_id: interv.id,
            unite_id: unite.id,
            stagiaire_id: stagiaire.id,
            observation: observation_stage.en_cours,
            date_debut: format(data.date_debut, "yyyy-MM-dd'T'HH:mm:ss.000'Z"),
            date_fin: format(
                addMonths(data.date_debut, Number(data.duree)),
                "yyyy-MM-dd'T'HH:mm:ss.000'Z"
            ),
        };

        try {
            const created = await axios.post(`${url}/newStage`, body);
            if (created) {
                const message = "Stage créé avec succes !";
                toast(message, toastconfig);
                handleConfirm();
                generate(data)
            }
        } catch (error) {
            console.log(error);
        }

    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        if (data) {
            setDivision(unite.nom);
            setNom(`${stagiaire.nom} ${stagiaire.prenom}`);
            setMax(offres.duree);
            reset({
                duree: offres.duree,
            });
        }
    }, [data]);

    return (
        <>
            <div>
                <div className="mb-6 text-[18px] text-center border-b-[2px] pb-2 border-gray-300">
                    Creation de stage
                </div>
                <FormProvider {...method}>
                    <form
                        onSubmit={method.handleSubmit(onSubmit)}
                        className="min-w-[25vw]"
                    >
                        <div className="py-2 ">Stagiaire : {nom}</div>
                        <div className="py-2 mb-2">
                            Division d'acceuil : {division}
                        </div>

                        <div className=" mb-4 border-b-[2px] pb-4 border-gray-300">
                            Offre : {offres.nom}
                        </div>

                        {/* <div className="mb-3">
                            <Select
                              label={"Offre"}
                              name={"offre_id"}
                              options={offre_options}
                              validation={{ required:"Valeur requise" }}
                            />
                        </div> */}

                        <div className="mb-3">
                            <Input
                                label={"Theme de Stage"}
                                name={"theme"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                            />
                        </div>

                        <div className="mb-3">
                            <DatePicker
                                label={"Date debut"}
                                name={"date_debut"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="datetime-local"
                                min={date_interview}
                                defaultValue={date_interview}
                            />
                        </div>

                        <div className="mb-3">
                            <Input
                                label={"Durée du Stage (mois)"}
                                name={"duree"}
                                validation={{
                                    required: "Valeur requise",
                                }}
                                type="number"
                                min={1}
                                max={max}
                            />
                        </div>

                        <div className="flex flex-row justify-end text-blue-500">
                            <p className="underline underline-offset-4 cursor-pointer" onClick={()=>{generate()}}>Voire l'apercu de la fiche-reponse</p>
                        </div>

                        <div className="tex-white flex flex-row justify-end mt-6 text-white">
                            <button
                                type="button"
                                className=" bg-gray-600 hover:bg-gray-700 rounded-[8px] py-1 px-4 "
                                onClick={() => {
                                    handleConfirm;
                                }}
                            >
                                Valider
                            </button>
                            <button className=" bg-blue-500 hover:bg-blue-500 rounded-[8px] py-1 px-4 ">
                                Valider
                            </button>
                        </div>
                    </form>
                </FormProvider>
            </div>
        </>
    );
}

export default Confirm;
