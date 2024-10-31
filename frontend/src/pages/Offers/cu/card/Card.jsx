import { differenceInDays, differenceInMonths } from "date-fns";
import { Pen, PenLine, PenSquare, Trash, Trash2, CopyPlus } from "lucide-react";
import React from "react";
import { isArray } from "../../../../functions/Functions";

function Card({ data, handleAdd }) {
    return (
        <>
            <div className=" card mr-2 flex flex-col px-12 mt-2 h-[75vh] overflow-auto ">
                {isArray(data) ? data.map(offre =>(
                    <div className="relative bg-gray-100 flex flex-row min-h-[15vh] rounded-[12px] px-6 py-3 mb-3 text-[17px]" key={offre.id}>
                        <div className="flex flex-col flex-1">
                            <div className="mb-4">Nom: {offre.nom}</div>
                            <div>Theme: {offre.theme}</div>
                        </div>

                        <div className="flex flex-col flex-1">
                            <div className="mb-4">duree: {differenceInMonths(offre.date_fin , offre.date_debut)} mois</div>
                            { offre.unite && <div>Division: {offre.unite.nom}</div>}
                        </div>

                        <div className="flex flex-col justify-end mt-12 mr-2">
                            <div className="flex flex-row items-center justify-center">
                                <div className="relative group">
                                    <button className="mr-4 text-gray-500">
                                        <Trash2 size={20} strokeWidth={2.2} />
                                    </button>
                                    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300">
                                        Supprimmer
                                    </span>
                                </div>

                                <div className="relative group">
                                    <button className="text-blue-500">
                                        <PenSquare
                                            size={20}
                                            strokeWidth={2.2}
                                        />
                                    </button>
                                    <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300">
                                        Modifier
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div></div>
                )}

                <div className=" p-8">{""}</div>

                <div className="absolute right-8 bottom-5">
                    <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-[8px] flex flex-row justify-center items-center hover:bg-blue-600"
                        onClick={() => {
                            handleAdd();
                        }}
                    >
                        <CopyPlus size={18} />
                        <p className="ml-1">Ajouter</p>
                    </button>
                </div>
            </div>
        </>
    );
}

export default Card;
