import { CheckSquare, PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { date_d_m_y } from "../../../../functions/Functions";

function Tasks({ data }) {
    return (
        <>
            {data && (
                <div className="w-full min-h-[2vh] flex flex-col bg-gray-100 text-gray-700 p-3 rounded-[12px]">
                    <div className="mb-4 text-center px-12">
                        <p className="border-b-2 border-gray-300 py-2">
                            {data.nom}
                        </p>
                    </div>
                    <div className="mb-2">Decription : {data.description}</div>
                    <div className="mb-2">
                        Date Limite : {date_d_m_y(data.date_fin)}
                    </div>
                    <div className="flex flex-row mb-4">
                        <p>Etat :</p>
                        <p>{data.observation}</p>
                    </div>
                    <div className="flex flex-row justify-end px-6">
                        <button className="text-red-500 mr-3">
                            <Trash2 size={20}/>
                        </button>
                        <button className="mr-3 text-gray-700 hover:text-gray-600">
                            <PenSquare size={20} />
                        </button>

                        <button className="text-blue-500 hover:text-blue-600">
                            <CheckSquare size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Tasks;
