import React from "react";
import { getDomain } from "../../../../functions/Functions";

function Interns({ data }) {
    return (
        <>
            <div className="flex flex-col min-h-28 bg-gray-100 rounded-[12px] p-4 text-gray-700  shadow-shadow-md ">
                <div className="text-center text-lg border-b-[2px] border-gray-300 pb-2">
                    Stagiaire :
                </div>
                {data && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-3">
                                -Nom & Prenoms: {data.nom + " " + data.prenom}
                            </div>
                            <div className="mb-3">Email: {data.email}</div>
                            <div className="mb-3">Phone: {data.phone}</div>
                            <div className="mb-3">Filiere: {data.filiere.toUpperCase()}</div>
                            <div className="mb-4">
                                Etablissement: {data.etablissement.toUpperCase()}
                            </div>
                            <div className="mb-3 flex flex-row">
                                <p className="mr-2 whitespace-nowrap">
                                    CV numerique :
                                </p>
                                <a
                                    href={data.cv_lien}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline underline-offset-2"
                                >
                                    {getDomain(data.cv_lien)}/CV_
                                    {data.id}
                                </a>
                            </div>
                            <div className="mb-3 flex flex-row">
                                <p className="mr-2 whitespace-nowrap">
                                    LM numerique :
                                </p>
                                <a
                                    href={data.lm_lien}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline underline-offset-2"
                                >
                                    {getDomain(data.lm_lien)}/LM_
                                    {data.id}
                                </a>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Interns;
