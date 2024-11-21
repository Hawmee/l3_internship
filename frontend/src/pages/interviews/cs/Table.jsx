import { FileQuestion, MessageSquareWarning } from "lucide-react";
import React, { useEffect, useRef } from "react";
import { isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onDeny }) {
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
                                    <th> Stagiaire </th>
                                    <th>Dossiers du stagiaire</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        Date d'entretient
                                    </th>
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
                                                {item.stagiaire.nom}{" "}
                                                {item.stagiaire.prenom}{" "}
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
                                        </tr>
                                    ))}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                        {!isArrayNotNull(data) && (
                            <div className="flex flex-col items-center justify-center w-full h-[50vh] text-gray-500">
                                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                                    <FileQuestion
                                        className="text-gray-400"
                                        size={32}
                                    />
                                </div>
                                <div className="text-lg font-medium">
                                    Aucune donnée disponible
                                </div>
                                <p className="text-sm text-gray-400">
                                    Les données d'entretiens apparaîtront ici
                                    une fois disponible
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
