import {
    CopyPlus,
    FileCheck,
    FileCheck2,
    Mail,
    SquarePen,
    SquareX,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { date_d_m_y, include } from "../../../functions/Functions";

function Table({ data, popup, addPopUp, del, setDel, onEdit }) {
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
            <div className="px-3 mt-4 pb-2 relative text-[16px] bg-gray-50 F">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Theme </th>
                                    <th>Division d'acceuil</th>
                                    <th> Date debut </th>
                                    <th> Date fin </th>
                                    <th>Status</th>
                                    <th> Rapport (lien) </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]"></th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => (
                                        <tr key={item.id} className="h-1">
                                            <td>
                                                {item.stagiaire.nom}{" "}
                                                {item.stagiaire.prenom}{" "}
                                            </td>
                                            <td>{item.offre.theme}</td>
                                            <td>{item.unite.nom}</td>
                                            <td>
                                                {date_d_m_y(item.date_debut)}
                                            </td>
                                            <td>{date_d_m_y(item.date_fin)}</td>
                                            <td>
                                                {!item.status &&
                                                    include(
                                                        item.observation,
                                                        "cours"
                                                    ) && (
                                                        <p className="text-gray-460">
                                                            En cours
                                                        </p>
                                                    )}

                                                {item.status &&
                                                    include(
                                                        item.observation,
                                                        "acheve"
                                                    ) && (
                                                        <p className="text-blue-500">
                                                            Achevé
                                                        </p>
                                                    )}
                                                {include(
                                                    item.observation,
                                                    "bandon"
                                                ) && (
                                                    <p className="text-red-400">
                                                        Abandonné
                                                    </p>
                                                )}
                                            </td>
                                            <td>
                                                {item.book_link && (
                                                    <a
                                                        href={item.book_link}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="mr-2 flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                    >Rapport de stage (lien)</a>
                                                )}
                                                {
                                                    !item.book_link &&
                                                    <div > (- - -)</div>
                                                }
                                            </td>
                                            <td>
                                                <div className="flex flex-row items-center justify-center text-white">
                                                    <button className={ !(include(item.observation , "bandon") || include(item.observation , "cien")) ? "text-gray-500 mr-2 px-3 py-1 hover:text-gray-700" :"text-gray-500 mr-2 px-3 py-1 opacity-40 "}
                                                        disabled={include(item.observation , "bandon") || include(item.observation , "cien") }
                                                    >
                                                        <Mail size={22} />
                                                    </button>
                                                    <button
                                                        className={(item.book_link && !item.attestation) ? "text-blue-500 mr-2 px-3 py-1 hover:text-blue-700" : "text-blue-500 opacity-40 mr-2 px-3 py-1"}
                                                        onClick={() => {
                                                            onEdit(item);
                                                        }}

                                                        disabled={(!(item.book_link && !item.attestation) || include(item.observation , "bandon"))}
                                                    >
                                                        <FileCheck2 size={22} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
