import React from "react";

function TitleContainer({ children }) {
    return (
        <>
            <div className=" text-lg text-gray-700 text-center font-extrabold py-1 cursor-pointer">
                {children}
            </div>
        </>
    );
}

export default TitleContainer;
