import React from "react";

function Performance({ data }) {
    return (
        <>
            <div className="flex flex-col p-4 bg-gray-100 text-gray-700 rounded-[12px] min-w-28 shadow-shadow-md pb-12 ">
                <div className="text-center text-lg border-b-[2px] border-gray-300 pb-2 ">
                    Performance
                </div>
                {data && (
                    <>
                        <div className="flex flex-col mt-6">
                            <div className="mb-3">-Communication: {data.communication}</div>
                            <div className="mb-3">
                                -Proposition de solution: {data.proposition_solution}
                            </div>
                            <div className="mb-3">-Integrité: {data.integrite}</div>
                            <div className="mb-3">-Ponctuqlité: {data.ponctualite}</div>
                            <div className="mb-3">-Respect: {data.respect}</div>
                            <div className="mb-3">-Autonomie: {data.autonomie}</div>
                            <div className="mb-3">-Assiduité: {data.assiduite}</div>
                            <div></div>
                        </div>
                    </>
                )}
                
            </div>
        </>
    );
}

export default Performance;
