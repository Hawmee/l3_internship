import React, { useEffect, useState } from "react";
import { FormProvider } from "react-hook-form";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { format } from "date-fns";
import { formatDate } from "../../../../functions/Functions";
import axios from "axios";
import { toast } from "react-toastify";

function Mail({ handleMail, method, data }) {
    const url = useSelector((state) => state.backendUrl.value);
    const toastconfig = useSelector(state => state.toastConfig.value);
    const { reset } = method;
    const offre_id = data.offre_id;
    const interview_id = data.id;
    const [isLoading, setIsLoading] = useState(false);

    const [footer] = useState(
        `\n---- \nCellule d'appui et Coordination \nService Régional du Budget Vakinankaratra`
    );

    const content = (text) => {
        return `${text} \n${footer}`;
    };

    const submit = async(data) => {
        setIsLoading(true);
        const body = {
            ...data,
            content: content(data.content),
            offre_id: offre_id,
            interview_id: interview_id,
        };
        
        try {
            const sent = await axios.post(`${url}/informStagiaire`, body);
            if(sent){
                const message = "Mail envoyé avec success !";
                handleMail();
                toast.success(message, toastconfig);
            }
        } catch (error) {   
            toast.error("Erreur lors de l'envoi du mail", toastconfig);
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    const onSubmit = (data) => {
        submit(data);
    };

    useEffect(() => {
        if (data) {
            const NomStagiaire = `${data.stagiaire.nom} ${data.stagiaire.prenom}`;
            const receiver = data.stagiaire.email;
            const date = format(
                formatDate(data.date_interview),
                "dd/MM/yyyy à HH:mm"
            );

            const Message = `Bonjour ${NomStagiaire} ,\nD'apres votre demande de stage au sein du SRB Vakinankaratra ,\nNous avons le plaisir de vous informer que vous êtes convoqué à un entretien pour le stage le ${date}.
            \nMerci de confirmer votre présence.`;

            reset({
                content: Message,
                receiver_mail: receiver,
            });
        }
    }, [data]);

    return (
        <div className={`relative ${isLoading ? 'opacity-70' : ''}`}>
            {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-10">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                </div>
            )}
            <FormProvider {...method}>
                <form
                    onSubmit={method.handleSubmit(onSubmit)}
                    className="min-w-[25vw] py-2"
                >
                    <div className="mb-3">
                        <Input
                            label="Destinataire"
                            name="receiver_mail"
                            type="email"
                            disabled={isLoading}
                        />
                    </div>
                    <div className="mb-3">
                        <TextArea
                            label="Contenu"
                            name="content"
                            validation={{ required: "Valeure requise" }}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="text-white mt-5 flex flex-row justify-end">
                        <button
                            className="px-4 py-1 bg-gray-600 rounded-lg hover:bg-gray-700 mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleMail}
                            type="button"
                            disabled={isLoading}
                        >
                            Annuler
                        </button>
                        <button
                            className="px-4 py-1 bg-blue-500 rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="h-4 w-4 animate-spin" />
                                    <span>Envoi en cours...</span>
                                </>
                            ) : (
                                <span>Envoyer</span>
                            )}
                        </button>
                    </div>
                </form>
            </FormProvider>
        </div>
    );
}

export default Mail;