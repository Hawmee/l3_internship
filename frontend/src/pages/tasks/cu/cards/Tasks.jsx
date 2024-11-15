import { CheckSquare, PenSquare, Trash2 } from "lucide-react";
import React from "react";
import { date_d_m_y } from "../../../../functions/Functions";
import { task_observations } from "../../../../utils/Observations";
import { addDays, isWithinInterval, parseISO, startOfDay } from "date-fns";

function Tasks({ data, onDelete, onEdit, onFinish }) {
    const isDisabledEdit = data.status;

    const isNearDeadline = (task) => {
        const today = startOfDay(new Date());
        const deadlineDate = parseISO(task.date_fin);
        const interval = { start: today, end: addDays(today, 3) };
        const isNotFinished = !task.status;
      
        return isWithinInterval(deadlineDate, interval) && isNotFinished;
      };

    const nearDeadline = isNearDeadline(data)
    const finished = (data.observation == task_observations.acheve || data.observation == task_observations.retard)
    const none_edit = data.status
    console.log(data)

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
                    <div className="mb-2 flex flex-row">
                        <p>Date Limite :</p>
                        <p
                            className={`
                            ml-3 
                            ${
                                data.observation ==
                                    task_observations.inacheve ||
                                data.observation == task_observations.retard ||
                                nearDeadline
                                    ? "text-red-500"
                                    : ""
                            }
                        `}
                        >
                            {date_d_m_y(data.date_fin)}
                        </p>
                    </div>
                    <div className="flex flex-row mb-4">
                        <p>Etat :</p>
                        <p
                            className={` 
                            ml-2 text-white px-2 rounded-xl
                            ${
                                (data.observation ==
                                    task_observations.inacheve ||
                                    data.observation ==
                                        task_observations.retard) &&
                                "bg-red-500"
                            }
                            ${
                                data.observation == task_observations.acheve &&
                                "bg-blue-600"
                            }
                            ${
                                data.observation ==
                                    task_observations.en_cours && "bg-gray-600"
                            }
                        `}
                        >
                            {data.observation}
                        </p>
                    </div>
                    <div className="flex flex-row justify-end px-6">
                        <button
                            className="text-red-500 mr-3"
                            // disabled={isDisabledEdit}
                            onClick={() => {
                                onDelete();
                            }}
                        >
                            <Trash2 size={20} />
                        </button>
                        <button
                            className="mr-3 text-gray-700 hover:text-gray-600 disabled:text-gray-300"
                            // disabled={isDisabledEdit}
                            onClick={() => {
                                onEdit(data);
                            }}

                            disabled={none_edit}
                        >
                            <PenSquare size={20} />
                        </button>

                        <button
                            className="text-blue-500 hover:text-blue-600 disabled:text-blue-300"
                            onClick={() => {
                                onFinish(data);
                            }}
                            disabled={finished}
                        >
                            <CheckSquare size={20} />
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Tasks;
