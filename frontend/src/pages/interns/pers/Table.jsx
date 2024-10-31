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

function Table({ data, onAdd, onEdit, onDelete , onDocs }) {
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
                                        Nom & Prenom
                                    </th>
                                    <th> niveau </th>
                                    <th> Filiere </th>
                                    <th> Observation </th>
                                    <th> Dossiers </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => (
                                        <tr key={item.id} className="h-1">
                                            <td>
                                                {item.nom} {item.prenom}
                                            </td>
                                            <td>{item.niveau}</td>
                                            <td>{item.filiere}</td>
                                            <td>{item.observation}</td>
                                            <td>
                                                {item.cv_link && item.lm_link ?
                                                    <div className="flex flex-row">
                                                        <a
                                                            href={item.cv_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="mr-2 flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            CV (lien)
                                                        </a>
                                                        <a
                                                            href={item.lm_link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className=" flex justify-center bg-gray-600 py-1 px-2 rounded-[15px] text-white text-xs"
                                                        >
                                                            LM (lien)
                                                        </a>
                                                    </div>
                                                :
                                                    <div className="underkine underline-offset-2 text-blue-500 cursor-pointer hover:text-blue-600" 
                                                        onClick={()=>{
                                                            onDocs(item)
                                                        }}
                                                    >
                                                        (Ajouter les documents)
                                                    </div>
                                                }
                                            </td>
                                            <td>
                                                <div className="flex flex-row  justify-start text-white">
                                                    <button
                                                        className={
                                                            item.observation !==
                                                            ("En Cours de Stage" &&
                                                                "A entretenir")
                                                                ? "text-red-500 mr-2 px-3 py-1 hover:text-red-400"
                                                                : "text-red-200 mr-2 px-3 py-1"
                                                        }
                                                        onClick={() => {
                                                            if (
                                                                item.observation !==
                                                                ("En Cours de Stage" &&
                                                                    "A entretenir")
                                                            ) {
                                                                onDelete(item);
                                                            }
                                                        }}
                                                    >
                                                        <Trash2 size={22} />
                                                    </button>
                                                    <button
                                                        className="text-blue-500 mr-2 px-3 py-1 hover:text-blue-700"
                                                        onClick={() => {
                                                            onEdit(item);
                                                        }}
                                                    >
                                                        <SquarePen size={22} />
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
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-1 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        onClick={() => {
                            onAdd();
                        }}
                    >
                        <CopyPlus size={17} />
                        <p className="ml-1">Ajouter</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Table;
