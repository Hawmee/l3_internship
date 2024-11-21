import {
    BetweenHorizonalStart,
    BookCheck,
    BookCopy,
    BookOpenCheck,
    BookPlus,
    CheckCheck,
    CheckSquare,
    FileCheck2,
    FileQuestion,
    Mail,
    Printer,
    XSquare,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
    date_d_m_y,
    include,
    isArrayNotNull,
} from "../../../functions/Functions";
import { differenceInMonths } from "date-fns";
import { observation_stage } from "../../../utils/Observations";

function Table({ data, row, onRow, onEdit, onAffirm }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px] bg-gray-50 F">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] bg-gray-50 overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Durée </th>
                                    <th>Status</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]"></th>
                                </tr>
                            </thead>

                            <tbody className="mt-4">
                                <tr className="h-2"></tr>
                                {data &&
                                    data.map((item) => {
                                        const duree_stage = differenceInMonths(
                                            item.date_fin,
                                            item.date_debut
                                        );
                                        const isRow = row
                                            ? row.id == item.id
                                            : false;
                                        const isEnded =
                                            item.observation ==
                                            observation_stage.acheve;
                                        const isAbandon =
                                            item.observation ==
                                            observation_stage.abandon;
                                        const isBooked = item.book_link;
                                        return (
                                            <tr
                                                key={item.id}
                                                className={`h-1 cursor-pointer ${
                                                    isRow && "bg-gray-200"
                                                } `}
                                                onClick={() => {
                                                    onRow(item);
                                                }}
                                            >
                                                <td className="rounded-l-xl ">
                                                    {item.stagiaire.nom}{" "}
                                                    {item.stagiaire.prenom}{" "}
                                                </td>
                                                <td>
                                                    {Number(duree_stage) == 0
                                                        ? 1
                                                        : duree_stage}{" "}
                                                    Mois
                                                </td>
                                                <td>
                                                    <div className="flex flex-row justify-start">
                                                        <p
                                                            className={`
                                                            text-white px-4 rounded-xl
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.non_affirme ||
                                                                    item.observation ==
                                                                        observation_stage.en_validation ||
                                                                    item.observation ==
                                                                        observation_stage.cloture ||
                                                                    item.observation ==
                                                                        observation_stage.a_venir) &&
                                                                "bg-gray-500"
                                                            }
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.en_cours ||
                                                                    item.observation ==
                                                                        observation_stage.acheve) &&
                                                                "bg-blue-500"
                                                            }
                                                            ${
                                                                (item.observation ==
                                                                    observation_stage.re_valide ||
                                                                    item.observation ==
                                                                        observation_stage.abandon) &&
                                                                "bg-red-500"
                                                            }
                                                        `}
                                                        >
                                                            {item.observation ==
                                                            observation_stage.non_affirme
                                                                ? "A affirmer"
                                                                : item.observation}
                                                        </p>
                                                    </div>
                                                </td>
                                                <td
                                                    className={`rounded-r-lg ${
                                                        isRow &&
                                                        "border-r-4 border-blue-400"
                                                    }`}
                                                >
                                                    {item.observation ==
                                                    observation_stage.non_affirme ? (
                                                        <div className="text-white">
                                                            <button
                                                                className="bg-blue-500 text-white px-4 py-1 rounded-lg shadow-md hover:bg-blue-600 transition-all duration-300 ease-in-out transform hover:-translate-y-0.5 flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
                                                                onClick={() => {
                                                                    onAffirm(
                                                                        item
                                                                    );
                                                                }}
                                                            >
                                                                <CheckCheck className="w-5 h-5" />
                                                                <span className="font-medium ml-2">
                                                                    Affirmer
                                                                </span>
                                                            </button>
                                                        </div>
                                                    ) : (
                                                        <div className="flex flex-row items-center justify-center text-white">
                                                            <button
                                                                className={`
                                                                        mr-2 px-3 py-1 border-r-2 border-gray-400 text-gray-500 hover:text-gray-700 disabled:text-gray-300
                                                                `}
                                                                disabled={
                                                                    !isEnded ||
                                                                    isAbandon
                                                                }
                                                            >
                                                                <Mail
                                                                    size={22}
                                                                />
                                                            </button>
                                                            <button
                                                                className={`
                                                                        text-gray-500 mr-2 px-2 py-1 hover:text-gray-700 disabled:text-gray-300
                                                                 `}
                                                                onClick={() => {
                                                                    onEdit(
                                                                        item
                                                                    );
                                                                }}
                                                                disabled={
                                                                    !isEnded ||
                                                                    isBooked ||
                                                                    isAbandon
                                                                }
                                                            >
                                                                <Printer
                                                                    size={22}
                                                                />
                                                            </button>
                                                            <button
                                                                className={`
                                                                    text-blue-500 px-2 py-1 hover:text-blue-600 disabled:text-blue-300
                                                                `}
                                                                onClick={() => {
                                                                    onEdit(
                                                                        item
                                                                    );
                                                                }}
                                                                disabled={
                                                                    !isEnded ||
                                                                    isAbandon ||
                                                                    isBooked
                                                                }
                                                            >
                                                                { !isBooked ? (
                                                                    <BookOpenCheck
                                                                        size={
                                                                            22
                                                                        }
                                                                    />
                                                                ) : (
                                                                    <CheckCheck
                                                                        size={
                                                                            22
                                                                        }
                                                                    />
                                                                )}
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
                                    Les données de stages apparaîtront ici une
                                    fois disponible
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
