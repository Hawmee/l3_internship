import { CheckCheck, FileQuestion, StopCircle, XCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import {
    observation_stage,
    task_observations,
} from "../../../utils/Observations";
import { isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onFinish, onAbanon, onRow }) {
    const tableContainerRef = useRef(null);
    const [selectedR, setSelectedR] = useState(null);
    const stage =
        Array.isArray(data) && data.length > 0
            ? data.filter((item) => item.stagiaire)
            : null;

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <div className="px-3 mt-4 pb-2 relative text-[16px]">
            <div className="p-2 rounded-[12px] border shadow-md">
                <div
                    ref={tableContainerRef}
                    className="table_main h-[78vh] overflow-auto"
                >
                    <table className="table table-fixed text-left w-full p-[1rem] border-collapse">
                        <thead className="rounded-[20px]">
                            <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                <th className="rounded-tl-[12px] rounded-bl-[12px] p-4">
                                    Stagiaire
                                </th>
                                <th className="p-4">Theme</th>
                                <th className="p-4">Status</th>
                                <th className="rounded-tr-[12px] rounded-br-[12px] p-4 ">
                                    {" "}
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="h-2">

                            </tr>
                            { isArrayNotNull(stage) && stage.map((item) => {
                                const some_tasks_en_cours = isArrayNotNull(
                                    item.taches
                                )
                                    ? item.taches.some(
                                          (task) =>
                                              task.observation ===
                                              task_observations.en_cours
                                      )
                                    : true;
                                const isEnded = (item.observation == observation_stage.acheve)
                                const isdisabled =
                                    item.status ||
                                    some_tasks_en_cours || isEnded;
                                const isdisabledAbandon =
                                    item.book_link || item.status || isEnded;
                                const isNew = (item.isNew && item.observation !== observation_stage.acheve && !item.status );
                                const theme = item.theme_definitif
                                    ? item.theme_definitif
                                    : item.theme_provisoir;
                                return (
                                    <tr
                                        key={item.id}
                                        className={`cursor-pointer hover:bg-gray-100 ${
                                            selectedR &&
                                            selectedR.id === item.id
                                                ? "border-r-[4px] border-blue-400 bg-gray-200"
                                                : ""
                                        }
                                            ${
                                                isNew &&
                                                "border-l-2 border-blue-400"
                                            }
                                            `}
                                        onClick={() => {
                                            onRow(item);
                                            setSelectedR(item);
                                        }}
                                    >
                                        <td className="rounded-l-[12px] p-4">
                                            {item.stagiaire.nom}{" "}
                                            {item.stagiaire.prenom}
                                        </td>
                                        <td className="p-4 text-blue-400">{theme}</td>
                                        <td className="p-4">
                                            <div className="flex flex-row justify-start">
                                                <p
                                                    className={`px-3 py-1 rounded-full text-sm ${
                                                        item.observation ===
                                                            observation_stage.abandon ||
                                                        item.observation ===
                                                            observation_stage.re_valide
                                                            ? "bg-red-400 text-white"
                                                            : item.observation ===
                                                              observation_stage.acheve
                                                            ? "bg-blue-500 text-white"
                                                            : "bg-gray-600 text-white"
                                                    }`}
                                                >
                                                    {item.observation}
                                                </p>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center justify-center space-x-2">
                                                <button
                                                    onClick={() =>
                                                        onFinish(item)
                                                    }
                                                    disabled={isdisabled}
                                                    className="p-2 rounded-lg hover:bg-gray-200 text-blue-500 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <CheckCheck size={20} />
                                                </button>
                                                <button
                                                    onClick={() =>
                                                        onAbanon(item)
                                                    }
                                                    disabled={isdisabledAbandon}
                                                    className="p-2 rounded-lg text-red-500 hover:bg-gray-200 disabled:bg-gray-100 disabled:text-gray-400 disabled:cursor-not-allowed transition-colors"
                                                >
                                                    <XCircle size={20} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
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
                                Les données de stagiaires apparaîtront ici une fois
                                disponible
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Table;
