import { Check, MessageSquareWarning, X } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
    date_d_m_y,
    date_time,
    formatDate,
    isArrayNotNull,
} from "../../../functions/Functions";

function Table({ data, onValidate , onDecline }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    console.log(data);
    

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px] bg-gray-50 ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Offre
                                    </th>
                                    <th>Mention</th>
                                    <th> Stagiaire </th>
                                    <th>Dossiers du stagiaire</th>
                                    <th>Date d'entretien</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]"></th>
                                </tr>
                            </thead>

                            {isArrayNotNull(data) && (
                                <tbody>
                                    {data.map((item) => {
                                        const interv_date = item.date_interview;
                                        const isNew =
                                            (item.isNew && !item.status || item.isNew && interv_date)
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td
                                                    className={
                                                        isNew
                                                            ? "border-l-[5px] border-blue-400"
                                                            : ""
                                                    }
                                                >
                                                    {item.offre.nom}
                                                </td>
                                                <td>{item.offre.mention_requise}</td>
                                                <td>
                                                    {item.stagiaire.nom}{" "}
                                                    {item.stagiaire.prenom}
                                                </td>
                                                <td>
                                                    <div className="flex flex-row">
                                                        <a
                                                            href={
                                                                item.stagiaire
                                                                    .cv_link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-2 flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            CV (lien)
                                                        </a>
                                                        <a
                                                            href={
                                                                item.stagiaire
                                                                    .lm_link
                                                            }
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className=" flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            LM (lien)
                                                        </a>
                                                    </div>
                                                </td>
                                                <td>
                                                    {interv_date &&
                                                        date_time(interv_date)}
                                                    {!interv_date && "- - - "}
                                                </td>
                                                <td>
                                                    {!interv_date && (
                                                        <div>
                                                            <button className="mr-6 text-red-500"
                                                                onClick={()=>{
                                                                    onDecline(item)
                                                                }}
                                                            >
                                                                <X />
                                                            </button>
                                                            <button className="text-blue-600"
                                                                onClick={()=>{
                                                                    onValidate(item)
                                                                }}
                                                            >
                                                                <Check />
                                                            </button>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    <tr>
                                        <td></td>
                                    </tr>
                                </tbody>
                            )}
                        </table>
                        {!isArrayNotNull(data) && (
                            <div className="w-full text-gray-700 text-lg flex flex-col items-center justify-center mt-4">
                                (Aucun element à afficher)
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;