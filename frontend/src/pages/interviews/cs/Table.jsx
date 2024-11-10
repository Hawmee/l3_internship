import {
    MessageSquareWarning,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onAffirm, onDeny }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

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
                                    <th> Unité d'acceuil </th>
                                    <th> Stagiaire </th>
                                    <th>Dossiers du stagiaire</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]" >Date d'entretient</th>
                                </tr>
                            </thead>

                            <tbody>
                                {isArrayNotNull(data) &&
                                    data.map((item) => (
                                        <tr key={item.id} className="h-1">
                                            <td
                                                className={
                                                    item.isNew
                                                        ? "border-l-[5px] border-blue-400"
                                                        : ""
                                                }
                                            >
                                                {item.offre.nom}
                                            </td>
                                            <td>{item.offre.unite.nom}</td>
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
                                                {item.date_interview ? (
                                                    item.date_interview
                                                ) : (
                                                    <button className=" text-blue-500 underline underline-offset-2" onClick={()=>{
                                                        onAffirm(item)
                                                    }}>Choisir une date</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        {!isArrayNotNull(data) && (
                            <div className="w-full text-gray-700 text-lg flex flex-col items-center justify-center">
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
