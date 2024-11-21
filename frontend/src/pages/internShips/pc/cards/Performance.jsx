import React from "react";

function Performance({ data }) {
    const performance = data;
    return (
        <>
            <div className="flex flex-col bg-gray-100 w-full rounded-xl min-h-[12vh] text-gray-600 py-3 px-6 drop-shadow-lg border-gray-300">
                <div className="text-center text-lg px-12 mb-4">
                    <div className="border-b-2 border-gray-300 pb-2">
                        Performances du Stagiaire:
                    </div>
                </div>
                <div className="flex flex-row mb-3">
                    <p className="mr-2 text-base whitespace-normal ">
                        Comportements Professionel :
                    </p>
                    <div>{performance.pertinance_pro} /20</div>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Pertinence Technique :</p>
                    <p> {performance.pertinance_tech} /20</p>
                </div>
                <div className="mb-3 flex flex-row">
                    <p className="mr-2">Pertinence Pedagogique :</p>
                    <p>{performance.pertinance_pedago} /20</p>
                </div>
            </div>
        </>
    );
}

export default Performance;
