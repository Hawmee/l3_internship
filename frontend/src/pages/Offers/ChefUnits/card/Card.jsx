import { Pen, PenLine, PenSquare, Trash, Trash2 } from "lucide-react";
import React from "react";

function Card({}) {
    return (
        <>
            <div className="bg-gray-100 flex flex-row h-[22vh] rounded-[12px] px-6 py-3 mb-3 text-[17px]">
                <div className="flex flex-col flex-1">
                    <div className="mb-4">Nom: Gestion de Logement</div>
                    <div>Theme: App de gestion de logement</div>
                </div>

                <div className="flex flex-col flex-1">
                    <div className="mb-4">duree: 3mois</div>
                    <div>Division: D P E</div>
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
                                <PenSquare size={20} strokeWidth={2.2} />
                            </button>
                            <span className="absolute left-1/2 transform -translate-x-1/2 -translate-y-10 opacity-0 group-hover:opacity-100 bg-gray-700 text-white text-xs rounded-md px-2 py-1 transition-opacity duration-300">
                                Modifier
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Card;
