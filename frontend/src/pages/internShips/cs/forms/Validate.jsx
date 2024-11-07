import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

function Validate({ data, handleValidate }) {
    const stage_id = data.id;
    const url = useSelector((state) => state.backendUrl.value);
    const conf = useSelector((state) => state.toastConfig.value);

    const onSubmit = async () => {
        try {
            const validated = await axios.patch(
                `${url}/stage/valid/${stage_id}`
            );
            if (validated) {
                const message = "Action reussite !";
                handleValidate();
                toast.success(message, conf);
            }
        } catch (error) {
            console.log(error);
            const message = "Erreur lors de l'operation";
            toast.error(message, conf);
        }
    };

    return (
        <>
            <div className="min-w-[20vw]">
                <div className="text-center text-lg"> Stage validé : </div>
                <div className="mt-3 text-lg">
                    Voulez-vous vraiment poursuivre cette action ?
                </div>
                <div className="flex flex-row justify-end text-white mt-6">
                    <button
                        className="bg-gray-500 hover:bg-gray-400 rounded-[8px] px-4 py-1 mr-3"
                        onClick={() => {
                            handleValidate();
                        }}
                    >
                        Annuler
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 rounded-[8px] px-4 py-1"
                        onClick={() => {
                            onSubmit();
                        }}
                    >
                        Valider
                    </button>
                </div>
            </div>
        </>
    );
}

export default Validate;
