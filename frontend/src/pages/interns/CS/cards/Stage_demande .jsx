import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";

function Stage_demande ({data}) {
    const stagiaire = data;
    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full rounded-xl min-h-[12vh] text-gray-600 py-3 px-6 drop-shadow-lg border-gray-300">
                <div className="text-center text-lg px-12 mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Demande
                    </div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base ">Debut de Stage demandé :</p>
                    <p>{stagiaire.debut_demande? date_d_m_y(stagiaire.debut_demande) : "- - -"}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Durée de Stage demandée :</p>
                    <p>{stagiaire.duree} Mois</p>
                </div>
            </div>
        </>
    );
}

export default Stage_demande 