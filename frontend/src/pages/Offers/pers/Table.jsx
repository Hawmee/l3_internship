import { differenceInMonths, format } from "date-fns";
import {
    CalendarPlus,
    CopyPlus,
    SquarePen,
    SquareX,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef } from "react";

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
                                    <th> Theme </th>
                                    <th>Unité d'acceuil</th>
                                    <th> Durée </th>
                                    <th>Disponibilité</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const isDispo = item.isDispo
                                        return(
                                        <tr key={item.id} className="h-1">
                                            <td>{item.nom}</td>
                                            <td>{item.theme}</td>
                                            <td>{item.unite.nom}</td>
                                            <td>
                                                {item.duree}{" "}
                                                Mois
                                            </td>
                                            <td>
                                                <div className="flex flex-row">
                                                    <p
                                                        className={`
                                                        px-2 text-white rounded-[20px]
                                                        ${isDispo && "bg-blue-500" }
                                                        ${!isDispo && "bg-red-500" }
                                                    `}
                                                    >
                                                    {isDispo? "Disponible" : "Indisponible"}
                                                    </p>
                                                </div>
                                            </td>
                                            <td>
                                                <div className="flex flex-row items-center justify-start text-white ">
                                                    <div
                                                        className={
                                                            isDispo
                                                                ? "flex px-2 py-1 rounded-[12px] flex-row bg-blue-500 cursor-pointer hover:bg-blue-600"
                                                                : "flex px-2 py-1 rounded-[12px] flex-row bg-blue-500 opacity-30 cursor-default "
                                                        }

                                                        onClick={()=>{
                                                            onInterview(item)
                                                        }}
                                                        disabled={!isDispo}
                                                    >
                                                        <CalendarPlus
                                                            size={22}
                                                        />
                                                        <p className="ml-1">
                                                            Nouvel entretien
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )})}
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
