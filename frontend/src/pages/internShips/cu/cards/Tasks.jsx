import React from "react";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";

function Tasks({ data }) {

    const stage = data
    const taches = data ? data.taches : null

    console.log(taches)
    return (
        <>
            <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px]  p-4 text-gray-700">
                <div className="text-lg px-4 text-center ">
                    <div className="border-b-[2px] border-gray-300 pb-2">
                        Taches
                    </div>
                </div>
                {isArrayNotNull(stage) && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-4 text-gray-500">
                                <p className="inline">-Taches en cours:</p>
                                <p className="inline ml-2"> 4</p>
                            </div>
                            <div className="mb-4 text-blue-500">
                                <p className="inline">-Taches achevées:</p>
                                <p className="inline ml-2"> 5</p>
                            </div>
                            <div className="mb-4 text-red-500">
                                <p className="inline">-Taches inachevées:</p>
                                <p className="inline ml-2">{" "} 2</p>
                            </div>
                        </div>
                    </>
                )}
                { (data && !isArrayNotNull(stage)) && (
                    <>
                        <div className="flex flex-row justify-center pt-3">
                            (Pas de taches attribuée)
                        </div>
                    </>
                )}
            </div>
        </>
    );
}

export default Tasks;
