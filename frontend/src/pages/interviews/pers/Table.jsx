import { addHours, format, isBefore, parseISO, startOfMinute } from "date-fns";
import { Mail, MailCheck } from "lucide-react";
import React, { useEffect, useRef, onInform } from "react";

function Table({ data, onMail, onInform }) {
    const tableContainerRef = useRef(null);

    const formated_date = (date) => {
        const datestring = parseISO(date);
        const timezone = -3;
        const localDate = addHours(datestring, timezone);
        return localDate;
    };

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
                                    <th>Date d'entretient</th>
                                    <th>Etat</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {/* {" "} */}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
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
                                                    format(formated_date(item.date_interview) , "dd/MM/yyyy , HH:mm")
                                                ) : (
                                                    <p>(Choisir une date)</p>
                                                )}
                                            </td>                                            <td>
                                                {item.isInforme ? (
                                                    <p className="text-blue-500">Stagiaire informé </p>
                                                ) : (
                                                    <p className="text-red-500">Stagaire non informé</p>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex flex-row items-center justify-center text-white">
                                                    <button
                                                        className="text-blue-600 mr-2 px-3 py-1 hover:text-blue-700"
                                                        onClick={() => {
                                                            onMail(item);
                                                        }}
                                                    >
                                                        <Mail size={25} />
                                                    </button>
                                                    <button
                                                        className={!item.isInforme ?"text-blue-600 mr-2 px-3 py-1 hover:text-blue-700" :"text-blue-600 opacity-30 mr-2 px-3 py-1" }
                                                        onClick={() => {
                                                            onInform(item);
                                                        }}
                                                        disabled={item.isInforme}
                                                    >
                                                        <MailCheck size={25} />
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
                        {/* <div className="w-full h-[50vh] flex flex-row justify-center items-center text-[20px]">
                            [Pas d'elements]
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
