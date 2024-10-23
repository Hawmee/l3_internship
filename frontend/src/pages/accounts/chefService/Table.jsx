import { CopyPlus, UserCheck, UserPen, UserX, UserX2 } from "lucide-react";
import React from "react";

function Table({ data }) {
    return (
        <>
            <div className="px-2 pb-2 relative">
                <div className="table_main h-[75vh] border rounded-[12px] shadow-sm overflow-auto ">
                    <table className="table table-fixed bg-gray-50 text-left  w-full h-full p-[1rem] border-collapse">
                        <thead>
                            <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                <th>Matricule</th>
                                <th> Nom & Prenom </th>
                                <th> Type </th>
                                <th> Unité de travail </th>
                                <th> Validité du compte </th>
                                <th> </th>
                            </tr>
                        </thead>

                        <tbody>
                            {data &&
                                data.map((item) => (
                                    <tr key={item.id} className="">
                                        <td>
                                            {item.matricule}
                                        </td>
                                        <td>
                                            {item.nom} {item.prenom}
                                        </td>
                                        <td>
                                            {item.isChefUnit
                                                ? "Chef"
                                                : item.isPersCellule ||
                                                  item.isPersSecretariat
                                                ? "Personnel"
                                                : ""}
                                        </td>
                                        <td>
                                            {item.unite
                                                ? item.unite.nom
                                                : "-  -  -"}
                                        </td>
                                        <td>
                                            {item.status
                                                ? <p className="text-green-500">validé</p>
                                                : <p className="text-red-400">non validé</p>}
                                        </td>
                                        <td>
                                            <div className="flex flex-row items-center justify-start text-white">
                                                <button className="text-blue-500 mr-2 px-3 py-1">
                                                    <UserPen />
                                                </button>
                                                <button className="text-gray-500 mr-2 px-3 py-1">
                                                    <UserX />
                                                </button>
                                                {!item.status && (
                                                    <button className=" text-green-500">
                                                        <UserCheck />
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            <tr></tr>
                        </tbody>
                    </table>
                </div>
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-1 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        // onClick={setAdd}
                    >
                        <CopyPlus size={17} />
                        <p className="ml-1">Add</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Table;
