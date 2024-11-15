import React from "react";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";

function Tasks({ data }) {

    const stage = data
    const taches = stage ? data.taches : []
    const tasks = taches


    const unfinished =
    isArrayNotNull(tasks) &&
    tasks.filter((task) => task.observation == task_observations.inacheve);
const unfinished_number = isArrayNotNull(unfinished)
    ? unfinished.length
    : 0;

const en_cours =
    isArrayNotNull(tasks) &&
    tasks.filter((task) => task.observation == task_observations.en_cours);
const en_cours_number = isArrayNotNull(en_cours) ? en_cours.length : 0;

const _finished =
    isArrayNotNull(tasks) &&
    tasks.filter((task) =>( task.observation == task_observations.acheve || task.observation == task_observations.retard));
const finished_number = isArrayNotNull(_finished) ? _finished.length : 0;

    console.log(taches)
    return (
        <>
            <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px]  p-4 text-gray-700">
                <div className="text-lg px-4 text-center ">
                    <div className="border-b-[2px] border-gray-300 pb-2">
                        Taches
                    </div>
                </div>
                {isArrayNotNull(taches) && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                            <div className="mb-4 text-gray-500">
                                <p className="inline">-Taches en cours:</p>
                                <p className="inline ml-2"> {en_cours_number}</p>
                            </div>
                            <div className="mb-4 text-blue-500">
                                <p className="inline">-Taches achevées:</p>
                                <p className="inline ml-2"> {finished_number}</p>
                            </div>
                            <div className="mb-4 text-red-500">
                                <p className="inline">-Taches inachevées:</p>
                                <p className="inline ml-2">{unfinished_number}</p>
                            </div>
                        </div>
                    </>
                )}
                { (data && !isArrayNotNull(taches)) && (
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
