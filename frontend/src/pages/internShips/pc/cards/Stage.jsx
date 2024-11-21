import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";
import { observation_stage } from "../../../../utils/Observations";
import { Pen, PenLine } from "lucide-react";

function Stage({ stage, onDefTheme }) {
    const isDefinitif = stage.theme_definitif ? true : false;
    const isEnded = stage
        ? stage.status || stage.observation == observation_stage.acheve
        : true;

    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full rounded-xl min-h-[12vh] text-gray-600 py-3 px-6 drop-shadow-lg border-gray-300">
                <div className="text-center text-lg px-12 mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">Stage</div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base ">Division d'acceuil :</p>
                    <div>
                        {stage.unite ? (
                            stage.unite.nom
                        ) : (
                            <p className="ml-2 text-red-400">
                                A assigner dans une division
                            </p>
                        )}
                    </div>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Theme Provisoir :</p>
                    <p>{stage.theme_provisoir}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Theme Definitif :</p>
                    <p>
                        {stage.theme_definitif
                            ? stage.theme_definitif
                            : " - - - "}
                    </p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Observation :</p>
                    <p
                        className={`px-4 text-white rounded-2xl 
                            ${
                                (stage.observation ==
                                    observation_stage.non_affirme ||
                                    (stage.observation ==
                                        observation_stage.en_validation) |
                                        (stage.observation ==
                                            observation_stage.a_venir)) &&
                                "bg-gray-500"
                            }
                            ${
                                (stage.observation ==
                                    observation_stage.en_cours ||
                                    stage.observation ==
                                        observation_stage.acheve) &&
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
                        {!stage.unite ? "A assigner" : stage.observation}
                    </p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Date Debut :</p>
                    <p>{date_d_m_y(stage.date_debut)}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Date Fin :</p>
                    <p>{date_d_m_y(stage.date_fin)}</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2 whitespace-nowrap">Rapport de stage :</p>
                    {stage.book_link ? (
                        <div className="flex flex-row items-center">
                            <div className="mr-2">
                                <a
                                    href={""}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-500 underline underline-offset-2"
                                >
                                    {123}/RapportDeStage_
                                    {stage.id}
                                </a>
                            </div>
                            {!stage.status && (
                                <div className="text-blue-400 ml-2 pl-2 border-l-2 border-gray-400">
                                    <PenLine size={18} />
                                </div>
                            )}
                        </div>
                    ):(
                        <p>- - -</p>
                    )}
                </div>

                <div className="flex felx-row justify-end">
                    <button
                        className={`bg-blue-500 text-white rounded-xl px-4 py-1 hover:bg-blue-600 disabled:bg-blue-300 `}
                        onClick={() => {
                            onDefTheme();
                        }}
                        disabled={isDefinitif || isEnded}
                    >
                        Modifier le theme
                    </button>
                </div>
            </div>
        </>
    );
}

export default Stage;
