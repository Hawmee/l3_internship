import { differenceInMonths, format } from "date-fns";
import { CopyPlus, FileQuestion, PenSquare, Trash2 } from "lucide-react";
import React, { useEffect, useRef } from "react";
import {
    date_d_m_y,
    isArray,
    isArrayNotNull,
} from "../../../functions/Functions";

function Table({ data, onAdd, onEdit, onDelete }) {
    const tableContainerRef = useRef(null);

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    const getDomain = (url) => {
        try {
            return new URL(url).hostname;
        } catch (error) {
            url;
        }
    };

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
                                        Numero
                                    </th>
                                    <th> CV du postulant </th>
                                    <th> LM du postulant </th>
                                    <th> Date de Depot </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => {
                                        const cv = getDomain(item.cv_lien);
                                        const lm = getDomain(item.lm_lien);
                                        return (
                                            <tr key={item.id} className="h-1">
                                                <td>{item.numero}</td>
                                                <td>
                                                    <a
                                                        href={item.cv_lien}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline underline-offset-2"
                                                    >
                                                        {cv}/CV
                                                    </a>
                                                </td>
                                                <td>
                                                    <a
                                                        href={item.lm_lien}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-blue-500 underline underline-offset-2"
                                                    >
                                                        {lm}/LM
                                                    </a>
                                                </td>
                                                <td>
                                                    {date_d_m_y(
                                                        item.date_arrive
                                                    )}
                                                </td>
                                                <td>
                                                    <div className="flex flex-row items-center justify-start text-white">
                                                        <button
                                                            className="text-red-500 mr-2 px-3 py-1 hover:text-red-400"
                                                            onClick={() => {
                                                                onDelete(item);
                                                            }}
                                                        >
                                                            <Trash2 size={22} />
                                                        </button>
                                                        <button
                                                            className="text-blue-500 mr-2 px-3 py-1 hover:text-blue-600"
                                                            onClick={() => {
                                                                onEdit(item);
                                                            }}
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
                                    Les données d'offres apparaîtront ici une
                                    fois disponible
                                </p>
                            </div>
                        )}
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