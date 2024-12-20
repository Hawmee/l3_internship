import React, { useEffect, useRef, useState } from "react";
import {
    formatDate,
    include,
    isArray,
    isArrayNotNull,
} from "../../../functions/Functions";
import { Mail } from "lucide-react";
import { addDays, differenceInDays, isWithinInterval, parseISO, startOfDay } from "date-fns";

function Table({ data, onSelect, selected }) {
    const tableContainerRef = useRef(null);
    const [selectedRow, setSelectedRow] = useState(null);

    const hasNearDeadlines = (tasks) => 
        tasks?.some((task) => {
          const today = startOfDay(new Date());
          const deadlineDate = parseISO(task.date_fin);
          const interval = { start: today, end: addDays(today, 3) };
          const isNotFinished = !task.status;
      
          return isWithinInterval(deadlineDate, interval) && isNotFinished;
        }) ?? false;

    const countNearDeadlines = (tasks) => {
        if (isArrayNotNull(tasks)) {
            const today = startOfDay(new Date());
            return tasks.filter((task) => {
                const deadlineDate = startOfDay(formatDate(task.deadline));
                const daysUntilDeadline = differenceInDays(deadlineDate, today);
                return daysUntilDeadline >= 0 && daysUntilDeadline <= 3;
            }).length;
        }
        return null;
    };

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    useEffect(() => {
        if (selected) {
            setSelectedRow(selected.id);
        }
    }, [selected]);

    return (
        <>
            <div className="px-2 mt-4 pb-2 relative text-[16px] bg-gray-50 ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Theme </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        Taches
                                    </th>
                                    {/* <th> Dossiers </th> */}
                                    {/* <th className="rounded-tr-[12px] rounded-br-[12px]">
                                    </th> */}
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const taches = item.taches;
                                        const stagiaire = item.stagiaire;
                                        const unite = item.unite;
                                        const offre = item.offre;
                                        const nearDeadline =
                                            hasNearDeadlines(taches);
                                        
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`cursor:pointer h-1 rounded-[12px] hover:bg-gray-100 pt-2 cursor-pointer ${
                                                    selectedRow == item.id &&
                                                    "border-r-[4px] border-blue-400 bg-gray-100"
                                                } 
                                                    ${nearDeadline && 'border-l-[4px] border-blue-400'}
                                                `}
                                                onClick={() => {
                                                    onSelect(item);
                                                }}
                                            >
                                                <td className="rounded-l-[12px]">
                                                    {stagiaire.nom}{" "}
                                                    {stagiaire.prenom}
                                                </td>
                                                <td>{item.theme}</td>
                                                <td className="rounded-r-[12px]">
                                                    ({taches.length}) taches
                                                </td>
                                                {/* <td className="rounded-r-[12px]">
                                                    <div className="flex flex-row items-center justify-center text-white">
                                                        <button
                                                            className={`
                                                               ${ (nearDeadline && !taches.status)? "text-red-500 mr-2 px-3 py-1 hover:text-red-700" :"text-red-500 mr-2 px-3 py-1 opacity-40"}`}
                                                            onClick={() => {
                                                                onEdit(item);
                                                            }}
                                                            disabled={
                                                                !nearDeadline
                                                            }
                                                        >
                                                            <Mail size={22} />
                                                        </button>
                                                    </div>
                                                </td> */}
                                                {/* <td>
                                                <div className="flex flex-row items-center justify-center text-white">
                                                    <button
                                                        className="text-blue-500 mr-2 px-3 py-1 hover:text-blue-700"
                                                        onClick={() => {
                                                            onEdit(item);
                                                        }}
                                                    >
                                                        <SquarePen size={22} />
                                                    </button>
                                                    <button className="text-gray-500 mr-2 px-3 py-1 hover:text-gray-700">
                                                        <Trash2 size={22} />
                                                    </button>
                                                </div>
                                            </td> */}
                                            </tr>
                                        );
                                    })}
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
