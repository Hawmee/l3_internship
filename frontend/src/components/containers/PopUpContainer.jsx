import { X } from "lucide-react";
import React from "react";

function PopUpContainer({popup ,closePopUp , children}) {
    return (
        <>
            <div
                className="parent w-[100vw] h-[100vh] absolute left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-[12] overflow-auto backdrop-blur py-12 "
            >
                <div className="parent relative flex flex-col justify-center items-center rounded-[15px]  bg-white  ">
                    <div className=" absolute top-0 right-0 main bg-red-500 text-white rounded-[12px] text-[2px] mr-[5px] mt-[5px] cursor-pointer hover:bg-red-600">
                        <button
                            onClick={()=>{closePopUp(!popup)}}
                            className="p-[2px] flex justify-center items-center"
                        >
                            <X size={14} />
                        </button>
                    </div>
                    <div className="min-w-[32vh] min-h-[42vh] flex flex-col py-4 px-10">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpContainer;
