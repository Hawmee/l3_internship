import {
    CalendarPlus,
    CalendarPlus2,
    CopyPlus,
    FileQuestion,
    SquarePen,
    SquareX,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { isArrayNotNull } from "../../../functions/Functions";
import { observation_stagiaire } from "../../../utils/Observations";

function Table({ data, onInterview }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px]  ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Nom & Prenom
                                    </th>
                                    <td className=" w-32 "> 

                                    </td>
                                    <th className=""> Observation </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const isEntretenir = (item.observation == observation_stagiaire.postulant) 
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td>
                                                    {item.nom} {item.prenom}
                                                </td>
                                                <td></td>
                                                <td>
                                                    <div className="flex flex-row justify-start">
                                                        <p className={`px-4 text-white rounded-xl
                                                                ${(item.observation == observation_stagiaire.a_entretenir || item.observation == observation_stagiaire.ancien) && "bg-gray-500"}
                                                                ${(item.observation == observation_stagiaire.postulant || item.observation == observation_stagiaire.en_stage) && "bg-blue-500"}
                                                                ${(item.observation == observation_stagiaire.refuse || item.observation == observation_stagiaire.arret) && "bg-red-500"}
                                                            `}>
                                                            {item.observation}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td>
                                                    <div className="flex flex-row  justify-center text-white">
                                                        <button
                                                            className={
                                                                "flex flex-row bg-blue-500 px-4 py-1 rounded-xl hover:bg-blue-600 disabled:bg-blue-300 "
                                                            }
                                                            onClick={() => {onInterview(item)}}
                                                            disabled={!isEntretenir}
                                                        >
                                                            <CalendarPlus2
                                                                size={22}
                                                            />
                                                            <p className="ml-2">
                                                                Entretenir
                                                            </p>
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
                                    Les données de stagiaires apparaîtront ici
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