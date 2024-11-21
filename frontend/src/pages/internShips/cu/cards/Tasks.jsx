import React from "react";
import { date_d_m_y, isArrayNotNull } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";
import { ClipboardX } from "lucide-react";

function Tasks({ data }) {
    const stage = data;
    const taches = stage ? data.taches : [];
    const tasks = taches;


    const total = isArrayNotNull(taches) ? taches.length : 0

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
        tasks.filter(
            (task) =>
                task.observation == task_observations.acheve 
        );
    const finished_number = isArrayNotNull(_finished) ? _finished.length : 0;


    const retard = isArrayNotNull(tasks) ? tasks.filter(item=>item.observation == task_observations.retard)?.length : 0

    console.log(taches);
    return (
        <>
            <div className="flex flex-col min-h-[12vh] bg-gray-100 rounded-[12px] py-3 px-6 text-gray-700 drop-shadow-lg border-gray-300">
                <div className="text-lg text-center px-12">
                    <div className="border-b-[2px] border-gray-300 pb-2">
                        Taches
                    </div>
                </div>
                {isArrayNotNull(taches) && (
                    <>
                        <div className="flex flex-col text-base mt-6  pb-2 ">
                        <div className="mb-4 text-gray-700">
                                <p className="inline">Total :</p>
                                <p className="inline ml-2">
                                    {total}
                                </p>
                            </div>
                            <div className="mb-4 text-gray-500">
                                <p className="inline">Taches en cours:</p>
                                <p className="inline ml-2">
                                    {" "}
                                    {en_cours_number}
                                </p>
                            </div>
                            <div className="mb-4 text-blue-500">
                                <p className="inline">Taches achevées:</p>
                                <p className="inline ml-2">
                                    {" "}
                                    {finished_number}
                                </p>
                            </div>
                            <div className="mb-4 text-red-500">
                                <p className="inline">Taches achevées avec retard:</p>
                                <p className="inline ml-2">
                                    {" "}
                                    {retard}
                                </p>
                            </div>
                            <div className="mb-4 text-red-500">
                                <p className="inline">Taches inachevées:</p>
                                <p className="inline ml-2">
                                    {unfinished_number}
                                </p>
                            </div>
                        </div>
                    </>
                )}
                {data && !isArrayNotNull(taches) && (
                    <div className="flex flex-col items-center justify-center py-8">
                        <div className="bg-gray-50 rounded-full p-2 mb-2 shadow-md text-gray-400">
                            <ClipboardX />
                        </div>
                        <p className="text-gray-500 text-base">
                            Aucune tâche attribuée pour le moment
                        </p>
                    </div>
                )}
            </div>
        </>
    );
}

export default Tasks;
