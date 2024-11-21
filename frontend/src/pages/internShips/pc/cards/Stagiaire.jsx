import React from "react";
import { getDomain } from "../../../../functions/Functions";

function Stagiaire({ data }) {
    const stagiaire = data.stagiaire;
    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full rounded-xl min-h-[12vh] text-gray-600 py-3 px-6 drop-shadow-lg border-gray-300">
                <div className="text-center text-lg px-12 mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Stagiaire
                    </div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base ">Nom :</p>
                    <p>{stagiaire.nom}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Prenoms :</p>
                    <p>{stagiaire.prenom}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Email :</p>
                    <p>{stagiaire.email}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Telephone :</p>
                    <p>{stagiaire.phone}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Filiere :</p>
                    <p>{stagiaire.filiere}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2 whitespace-nowrap">
                        Etablissement d'origine :
                    </p>
                    <p className=" whitespace-normal break-words ">
                        {stagiaire.etablissement}
                    </p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2 whitespace-nowrap">CV numerique :</p>
                    <a
                        href={stagiaire.cv_lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline underline-offset-2"
                    >
                        {getDomain(stagiaire.cv_lien)}/CV_{stagiaire.id}
                    </a>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2 whitespace-nowrap">LM numerique :</p>
                    <a
                        href={stagiaire.lm_lien}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-500 underline underline-offset-2"
                    >
                        {getDomain(stagiaire.lm_lien)}/LM_{stagiaire.id}
                    </a>
                </div>
            </div>
        </>
    );
}

export default Stagiaire;
