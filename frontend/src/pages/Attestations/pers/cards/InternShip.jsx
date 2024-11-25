import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";
import { observation_stage } from "../../../../utils/Observations";
import { DatabaseIcon } from "lucide-react";

function InternShip({ data }) {

    const stage = data

    return (
        <>
            <>
                <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px]  p-4 text-gray-700">
                    <div className="text-lg px-4 text-center ">
                        <div className="border-b-[2px] border-gray-300 pb-2">
                            Stage
                        </div>
                    </div>
                    {data && (
                        <>
                            <div className="flex flex-col text-base mt-6  pb-2 ">
                                <div className="mb-4">
                                    <p className="inline">-Theme:</p>
                                    <p className="inline ml-2 text-blue-400">
                                        {data.theme_definitif
                                            ? data.theme_definitif
                                            : data.theme_provisoir}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="inline">-Unité d'acceuil:</p>
                                    <p className="inline ml-2">
                                        {data.unite.nom}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="inline">-Date debut:</p>
                                    <p className="inline ml-2">
                                        {date_d_m_y(data.date_debut)}
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <p className="inline">-Date fin:</p>
                                    <p className="inline ml-2">
                                        {date_d_m_y(data.date_fin)}
                                    </p>
                                </div>
                                <div className="mb-3 flex flex-row">
                                    <p className="mr-2">Observation :</p>
                                    <p
                                        className={`px-4 text-white rounded-2xl 
                                                ${
                                                    (stage.observation ==
                                                        observation_stage.non_affirme ||
                                                        stage.observation ==
                                                            observation_stage.en_validation ||
                                                        stage.observation ==
                                                            observation_stage.a_venir ||
                                                        stage.observation ==
                                                            observation_stage.cloturation) &&
                                                    "bg-gray-500"
                                                }
                                                ${
                                                    (stage.observation ==
                                                        observation_stage.en_cours ||
                                                        stage.observation ==
                                                            observation_stage.acheve ||
                                                        stage.observation ==
                                                            observation_stage.cloture) &&
                                                    "bg-blue-500"
                                                }
                                                ${
                                                    (stage.observation ==
                                                        observation_stage.re_valide ||
                                                        stage.observation ==
                                                            observation_stage.abandon) &&
                                                    "bg-red-500"
                                                }
                                            `}
                                    >
                                        {!stage.unite
                                            ? "A assigner"
                                            : stage.observation}
                                    </p>
                                </div>
                                <div className="mb-3 flex flex-row">
                                    <p className="mr-2 whitespace-nowrap">
                                        Rapport de stage :
                                    </p>
                                    {data.book_link ? (
                                        <div className="flex flex-row items-center">
                                            <div className="mr-2">
                                                <a
                                                    href={data.book_link}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-blue-500 underline underline-offset-2"
                                                >
                                                    {getDomain(data.book_link)}
                                                    /RPS_
                                                    {data.id}
                                                </a>
                                            </div>
                                        </div>
                                    ) : (
                                        <p>- - -</p>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </>
        </>
    );
}

export default InternShip;
