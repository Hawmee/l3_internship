import { CheckCheck, CircleCheckBig, OctagonX, StopCircle } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { date_d_m_y, isArrayNotNull } from "../../../functions/Functions";
import { observation_stage } from "../../../utils/Observations";

function Table({ data, onFinish, onAbanon, onRow  }) {
    const tableContainerRef = useRef(null);
    const [selectedR , setSelectedR] = useState(null)
    const stage = isArrayNotNull(data) ? data.filter(item=> item.stagiaire) : null
    
    console.log(data)

    useEffect(() => {
        if (tableContainerRef.current) {
            tableContainerRef.current.scrollTop =
                tableContainerRef.current.scrollHeight;
        }
    }, [data]);

    return (
        <>
            <div className="px-3 mt-4 pb-2 relative text-[16px]  ">
                <div className="p-2 rounded-[12px] border shadow-md ">
                    <div
                        ref={tableContainerRef}
                        className="table_main h-[78vh] overflow-auto"
                    >
                        <table className="table table-fixed text-left  w-full  p-[1rem] border-collapse">
                            <thead className="rounded-[20px] s">
                                <tr className="sticky text-gray-700 bg-gray-200 z-12 top-0 left-0">
                                    <th className="rounded-tl-[12px] rounded-bl-[12px]">
                                        Stagiaire
                                    </th>
                                    <th> Theme </th>
                                    <th>Status</th>
                                    <th className="rounded-tr-[12px] rounded-br-[12px] opacity-100"> </th>
                                </tr>
                            </thead>

                            <tbody>
                                {isArrayNotNull(stage) &&
                                    stage.map((item) => {
                                        const isdisabled =
                                            item.book_link || item.status;
                                        const observation = item.observation
                                        const stagiaire = item.stagiaire
                                        return (
                                            <tr 
                                                key={item.id} 
                                                className={`cursor:pointer h-1 rounded-[12px] hover:bg-gray-100 pt-2 ${
                                                    (selectedR && selectedR.id == item.id) &&
                                                    "border-r-[4px] border-blue-400 bg-gray-100"
                                                } `}
                                                onClick={()=>{
                                                    onRow(item)
                                                    setSelectedR(item)
                                                }}
                                            >
                                                <td className="rounded-l-[12px]">
                                                    {item.stagiaire.nom}{" "}
                                                    {item.stagiaire.prenom}{" "}
                                                </td>
                                                <td>{item.theme}</td>
                                                <td>
                                                <div className="flex  flex-row justify-start">
                                                    <p
                                                        className={`px-2 rounded-[20px] ${
                                                            (observation == observation_stage.abandon || observation == observation_stage.re_valide) &&
                                                            "bg-red-400 text-white"
                                                        }
                                                        ${
                                                            (observation == observation_stage.acheve )&&
                                                            "bg-blue-500 text-white"
                                                        }
                                                        ${
                                                            (observation == observation_stage.en_validation || observation == observation_stage.en_cours) &&
                                                            "bg-gray-600 text-white"
                                                        }
                                                        `}
                                                    >
                                                        {item.observation}
                                                    </p>
                                                </div>
                                                </td>
                                                <td className="rounded-r-[12px]">
                                                    <div className="text-sta text-white">
                                                        <button
                                                            className={
                                                                !isdisabled
                                                                    ? "text-red-500 mr-2 px-3 py-1 hover:text-red-400"
                                                                    : "text-red-300  mr-2 px-3 py-1"
                                                            }
                                                            onClick={() => {
                                                                onAbanon(item);
                                                            }}
                                                            disabled={
                                                                isdisabled
                                                            }
                                                        >
                                                            <OctagonX
                                                                size={22}
                                                            />
                                                        </button>
                                                        <button
                                                            className={
                                                                !isdisabled
                                                                    ? "text-blue-500 mr-2 px-3 py-1 hover:text-blue-700"
                                                                    : "text-blue-300  mr-2 px-3 py-1"
                                                            }
                                                            onClick={() => {
                                                                onFinish(item);
                                                            }}
                                                            disabled={
                                                                isdisabled
                                                            }
                                                        >
                                                            <CircleCheckBig
                                                                size={22}
                                                            />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                <tr>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Table;
