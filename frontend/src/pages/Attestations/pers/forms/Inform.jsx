import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import Input from "../../../../components/forms/Input";
import TextArea from "../../../../components/forms/TextArea";
import { today_string } from "../../../../functions/Functions";
import { notifyError, notifySuccess } from "../../../../layouts/MereLayout";
import axios from "axios";

function Inform({onInform , data}) {

    const url = useSelector((state) => state.backendUrl.value);
    const attestation = data.attestation
    const method = useForm()
    const { reset } = method;
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
        };
        

        console.log(body);
        

        try {
            console.log(body)
            const sent = await axios.patch(`${url}/attetation/inform/${attestation.id}` , body)
            if(sent){
                const message = "Mail envoyé avec success !"
                onInform()
                notifySuccess(message)
            }
        } catch (error) {   
            console.log(error);
            notifyError()
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
            const today=today_string()

            const Message = `Bonjour ${NomStagiaire} ,\nSuite à l'aboutissement de votre stage au sein du SRB Vakinankaratra ,\nNous avons le plaisir de vous informer que votre attestation de stage est désormais disponible depuis le ${today}.
            \nVous pouvez venir la récupérer à votre convenance. N'hésitez pas à nous contacter pour toute question ou précision.`;

            reset({
                content: Message,
                receiver_mail : receiver,
            });
        }
    }, [data]);

  return (
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
                    onInform();
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
  )
}

export default Inform