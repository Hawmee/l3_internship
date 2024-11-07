import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { format } from "date-fns";
import { formatDate } from "../../../../functions/Functions";
import { da, fr } from "date-fns/locale";
import axios from "axios";
import { toast } from "react-toastify";

function Mail({ handleMail, method, data }) {
    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector(state=>state.toastConfig.value)
    const current_user = useSelector((state) => state.currentUser.value);
    const { reset } = method;
    const offre_id = data.offre_id;
    const interview_id = data.id;

    const [footer] = useState(
        `\n---- \nCellule d'appui et Coordination \nService Régional du Budget Vakinankaratra`
    );

    const content = (text) => {
        return `${text} \n${footer}`;
    };

    const submit = async(data) => {
        const body = {
            ...data,
            content: content(data.content),
            offre_id:offre_id,
            interview_id:interview_id,
        };
        
        try {
            console.log(body)
            const sent = await axios.post(`${url}/informStagiaire` , body)
            if(sent){
                const message = "Mail envoyé avec success !"
                console.log(sent)
                handleMail()
                toast.success(message , toastconfig)
            }
        } catch (error) {   
            console.log(error);
            
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };
    useEffect(() => {
        console.log(data)
        if (data) {
            const NomStagiaire = `${data.stagiaire.nom} ${data.stagiaire.prenom}`;
            const receiver = data.stagiaire.email
            const date = format(
                formatDate(data.date_interview),
                "dd/MM/yyyy à HH:mm"
            );

            const Message = `Bonjour ${NomStagiaire} ,\nD'apres votre demande de stage au sein du SRB Vakinankaratra ,\nNous avons le plaisir de vous informer que vous êtes convoqué à un entretien pour le stage le ${date}.
            \nMerci de confirmer votre présence.`;

            reset({
                content: Message,
                receiver_mail : receiver,
            });
        }
    }, [data]);

    return (
        <>
            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(onSubmit)}
                    className="min-w-[25vw] py-2"
                >
                    <div className="mb-3">
                        <Input
                            label="Destinataire"
                            name={"receiver_mail"}
                            type="email"
                        />
                    </div>{" "}
                    <div className="mb-3">
                        <TextArea
                            label="Contenu"
                            name={"content"}
                            validation={{ required: "Valeure requise" }}
                        />
                    </div>
                    <div className="text-white mt-5 flex flex-row justify-end">
                        <button
                            className="px-4 py-1 bg-gray-600 rounded-[8px] hover:bg-gray-700 mr-2"
                            onClick={() => {
                                handleMail();
                            }}
                            type="button"
                        >
                            Annuler
                        </button>
                        <button
                            className="px-4 py-1 bg-blue-500 rounded-[8px] hover:bg-blue-600"
                            type="submit"
                        >
                            Envoyer
                        </button>
                    </div>
                </form>
            </FormProvider>
        </>
    );
}

export default Mail;
