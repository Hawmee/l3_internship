import React from "react";

function TitleContainer({ children }) {
    return (
        <>
            <div className=" text-lg text-gray-700  flex flex-row justify-center font-extrabold py-1 ">
                <div className="cursor-pointer mt-2 underline decoration-2 underline-offset-4">
                    {children}
                </div>
            </div>
        </>
    );
}

export default TitleContainer;
