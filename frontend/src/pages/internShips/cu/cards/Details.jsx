import React from "react";
import { date_d_m_y, getDomain } from "../../../../functions/Functions";

function Details({ data }) {
    return (
        <>
            <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px]  py-3 px-6 text-gray-700 drop-shadow-lg border-gray-300">
                <div className="text-lg text-center px-12">
                    <div className="border-b-[2px] border-gray-300 pb-2 ">
                        Details
                    </div>
                </div>
                {data && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-4">
                                <p className="inline">Theme:</p>
                                <p className="inline ml-2 text-blue-400">
                                    {data.theme_definitif
                                        ? data.theme_definitif
                                        : data.theme_provisoir}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="inline">Date debut:</p>
                                <p className="inline ml-2">
                                    {date_d_m_y(data.date_debut)}
                                </p>
                            </div>
                            <div className="mb-4">
                                <p className="inline">Date fin:</p>
                                <p className="inline ml-2">
                                    {date_d_m_y(data.date_fin)}
                                </p>
                            </div>
                            <div className="mb-3">
                                <p className="inline">Status:</p>
                                <p
                                    className={`inline ml-4 
                                    ${
                                        data.observation ==
                                            ("Annulé" || "Revalidation") &&
                                        "bg-red-400 text-white"
                                    }
                                    ${
                                        data.observation == "Achevé" &&
                                        "bg-blue-500 text-white"
                                    }
                                    ${
                                        data.observation ==
                                            ("En cours" || "Validation") &&
                                        "bg-gray-600 text-white"
                                    }
                                    px-2 rounded-[12px]`}
                                >
                                    {data.observation}
                                </p>
                            </div>
                            {data.observation == "Revalidation" && (
                                <div className="mb-4">
                                    <p className="inline">
                                        Motif de revalidation:
                                    </p>
                                    <p className="inline ml-2">
                                        {data.motif_revalidation}
                                    </p>
                                </div>
                            )}
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
    );
}

export default Details;
