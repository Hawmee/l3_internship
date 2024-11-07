import { differenceInMonths, format } from "date-fns";
import {
    BadgeAlert,
    CalendarPlus,
    CopyPlus,
    PenSquare,
    SquarePen,
    SquareX,
    Trash,
    Trash2,
    UserCheck,
    UserPen,
    UserX,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { isArray, isArrayNotNull } from "../../../functions/Functions";

function Table({ data, onAdd, onEdit, onDelete }) {
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
                                    <th> Durée </th>
                                    <th>Disponibilité</th>
                                    <th>Observation</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const isDispo = item.isDispo;
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td>{item.nom}</td>
                                                <td>{item.theme}</td>
                                                <td>{item.duree} Mois</td>

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
                                                    {item.entretiens?.some(
                                                        (entretien) =>
                                                            !entretien.status
                                                    ) ? (
                                                        <p className="text-blue-400 cursor-pointer">
                                                            (
                                                            {
                                                                item.entretiens.filter(
                                                                    (
                                                                        entretien
                                                                    ) =>
                                                                        !entretien.statu
                                                                ).length
                                                            }
                                                            ) entretien
                                                        </p>
                                                    ) : item.entretiens
                                                          .length <= 0 &&
                                                      item.stage?.some(
                                                          (stage) =>
                                                              !stage.status
                                                      ) ? (
                                                        <p className="text-blue-400 cursor-pointer">
                                                            (1) stage en cours
                                                        </p>
                                                    ) : (
                                                        <p className="text-gray-700">
                                                            - - -
                                                        </p>
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-start text-white">
                                                        <button
                                                            className={
                                                                item.entretiens?.some(
                                                                    (
                                                                        entretien
                                                                    ) =>
                                                                        !entretien.status
                                                                ) ||
                                                                (item.entretiens
                                                                    .length <=
                                                                    0 &&
                                                                    !item.isDispo)
                                                                    ? "text-red-200 mr-2 px-3 py-1 "
                                                                    : "text-red-500 mr-2 px-3 py-1 hover:text-red-400"
                                                            }
                                                            onClick={() => {
                                                                onDelete(item);
                                                            }}
                                                            disabled={
                                                                item.entretiens?.some(
                                                                    (
                                                                        entretien
                                                                    ) =>
                                                                        !entretien.status
                                                                ) ||
                                                                (item.entretiens
                                                                    .length <=
                                                                    0 &&
                                                                    !item.isDispo)
                                                            }
                                                        >
                                                            <Trash2 size={22} />
                                                        </button>
                                                        <button
                                                            className="text-blue-500 mr-2 px-3 py-1 hover:text-blue-600"
                                                            onClick={() => {
                                                                onEdit(item);
                                                            }}
                                                            // disabled={
                                                            //     item.entretiens
                                                            //         .length <= 0 &&
                                                            //     !item.isDispo
                                                            // }
                                                        >
                                                            <PenSquare
                                                                size={22}
                                                            />
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
                    </div>
                </div>
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-2 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        onClick={() => {
                            onAdd();
                        }}
                    >
                        <CopyPlus size={17} />
                        <p className="ml-1">Nouvel offre</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Table;
