import React from "react";
import { isArray, isArrayNotNull } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";

function Taches({ data }) {
    const stage = data;
    const taches = stage ? stage.taches : null;

    const total = isArrayNotNull(taches) ? taches.length : 0

    const en_cours = isArrayNotNull(taches)
        ? taches.filter(
              (item) => item.observation == task_observations.en_cours
          )?.length
        : null;
    const acheve = isArrayNotNull(taches)
        ? taches.filter((item) => item.observation == task_observations.acheve)
              ?.length
        : null;
    const retard = isArrayNotNull(taches)
        ? taches.filter((item) => item.observation == task_observations.retard)
              ?.length
        : null;
    const inacheve = isArrayNotNull(taches)
        ? taches.filter(
              (item) => item.observation == task_observations.inacheve
          )?.length
        : null;
    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full rounded-xl min-h-[12vh] text-gray-600 py-3 px-6 drop-shadow-lg border-gray-300">
                <div className="text-center text-lg px-12 mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Taches
                    </div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base ">Total :</p>
                    <div>{total}</div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base ">Taches En Cours :</p>
                    <div>{en_cours}</div>
                </div>
                <div className="mb-3 flex flex-row text-blue-500">
                    <p className="mr-2">Taches Achevées :</p>
                    <p>{acheve}</p>
                </div>
                <div className="mb-3 flex flex-row text-red-500">
                    <p className="mr-2">Taches Achevées avec retard :</p>
                    <p>{retard}</p>
                </div>
                <div className="mb-3 flex flex-row text-red-500">
                    <p className="mr-2">Taches Inachevées :</p>
                    <p>{inacheve}</p>
                </div>
            </div>
        </>
    );
}

export default Taches;
