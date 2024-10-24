import {
    BadgeAlert,
    BadgeCheck,
    CopyPlus,
    UserCheck,
    UserPen,
    UserX,
    UserX2,
} from "lucide-react";
import React from "react";

function Table({ data  , onValidate}) {
    return (
        <>
            <div className="px-2 pb-2 relative">
                <div className=" rounded-[12px] border shadow-md">
                    <div className="table_main h-[75vh]   overflow-auto">
                        <table className="table  text-left  w-full p-[1rem] border-collapse border-separate border-spacing-y-1">
                            <thead className="rounded-[20px]">
                                <tr className="sticky text-gray-700 bg-gray-100 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Matricule
                                    </th>
                                    <th> Nom & Prenom </th>
                                    <th> Type </th>
                                    <th> Unité de travail </th>
                                    <th> Validité du compte </th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px]">
                                        {" "}
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {data &&
                                    data.map((item) => (
                                        <tr key={item.id} >
                                            <td className={item.isNew?"border-l-[5px] border-blue-400":""}>{item.matricule}</td>
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
                                                {item.status ? (
                                                    <div className="text-blue-500 flex flex-row items-center">
                                                        <BadgeCheck />{" "}
                                                        <p className="ml-2">
                                                            validé
                                                        </p>
                                                    </div>
                                                ) : (
                                                    <div className="text-red-400 flex flex-row items-center">
                                                        <BadgeAlert />
                                                        <p className="ml-2">
                                                            non validé
                                                        </p>
                                                    </div>
                                                )}
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
                                                        <button className=" text-green-500" onClick={()=>{onValidate(item)}}>
                                                            <UserCheck />
                                                        </button>
                                                    )}
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                <tr><td></td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="btn_place absolute bottom-0 right-0 pb-2 pr-[8px]">
                    <button
                        className="btn_style flex flex-row items-center justify-center bg-blue-500 px-4 py-1 w-full rounded-tl-[7px] rounded-br-[7px] text-gray-100 hover:bg-blue-600 "
                        onClick={() => {
                            addPopUp(!popup);
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
