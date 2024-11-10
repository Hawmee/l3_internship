import {addHours, format ,isBefore, parseISO, startOfMinute } from "date-fns";
import {
    CalendarCheck,
    CalendarCog,
    CalendarX,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { date_time, isArrayNotNull } from "../../../functions/Functions";

function TableEntretient({ data, onConfirm, onEdit , onCancel }) {
    const tableContainerRef = useRef(null);

    const formated_date= (date)=>{
        const datestring=parseISO(date)
        const timezone=-3
        const localDate = addHours(datestring,timezone)
        return localDate
    }

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
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {isArrayNotNull(data) &&
                                    data.map((item) =>{ 
                                        const date_interv = item.date_interview
                                        return(
                                        <tr key={item.id} className="h-1">
                                            <td
                                                className={
                                                    item.isNew&& !item.date_interview
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
                                                {date_interv ? (
                                                    date_time(date_interv)
                                                ) : (
                                                    <p>(Choisir une date)</p>
                                                )}
                                            </td>                                            <td>
                                                {item.isInforme ? (
                                                    <p className="text-blue-500 cursor-default">Stagiaire informé </p>
                                                ) : (
                                                    <p className=" text-red-400 cursor-default ">Stagaire non informé</p>
                                                )}
                                            </td>
                                            <td>
                                                <div className="flex flex-row items-center justify-center text-white">
                                                    <button
                                                        className="text-gray-700 mr-2 px-3 py-1 hover:text-gray-500"
                                                        onClick={() => {
                                                            onEdit(item);
                                                        }}
                                                    >
                                                        <CalendarCog size={25} />
                                                    </button>
                                                    <button
                                                        className={!((isBefore( startOfMinute(new Date()) , formated_date(item.date_interview)))&& !item.isInforme)?"text-red-500 mr-2 px-3 py-1 hover:text-red-400":"text-red-500 mr-2 px-3 py-1 opacity-30"}
                                                        onClick={() => {
                                                            onCancel(item);
                                                        }}
                                                        disabled={((isBefore( startOfMinute(new Date()) , formated_date(item.date_interview)))&& !item.isInforme)}
                                                    >
                                                        <CalendarX size={25} />
                                                    </button>
                                                    <button 
                                                        className={!((isBefore( startOfMinute(new Date()) , formated_date(item.date_interview))) && !item.isInforme)?"text-blue-500 mr-2 px-3 py-1 hover:text-blue-700" :"text-blue-500 opacity-40 mr-2 px-3 py-1 "}
                                                        onClick={()=>{
                                                            onConfirm(item)
                                                        }}
                                                        disabled={((isBefore( startOfMinute(new Date()) , formated_date(item.date_interview)))&& !item.isInforme)}
                                                    >
                                                        <CalendarCheck
                                                            size={25}
                                                        />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
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

export default TableEntretient;
