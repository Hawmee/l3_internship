import { X } from "lucide-react";
import React from "react";

function PopUpContainer({ popup, closePopUp, children }) {
    return (
        <>
            <div className="parent w-[100vw] h-[100vh] absolute left-0 top-0 flex flex-col justify-center items-center bg-black bg-opacity-50 z-[12] overflow-auto backdrop-blur py-12 ">
                <div className="parent relative flex flex-col justify-center items-center rounded-[15px]  bg-white  ">
                    { popup &&
                        <div className=" absolute top-0 right-0 mai text-gray-700 rounded-[12px] text-[2px] mr-[5px] mt-[5px] cursor-pointer hover:text-gray-800">
                            <button
                                onClick={() => {
                                    closePopUp(!popup);
                                }}
                                className="p-[2px] flex justify-center items-center"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    }
                    <div className="min-w-[12vh] min-h-[12vh] flex flex-col py-4 px-8">
                        {children}
                    </div>
                </div>
            </div>
        </>
    );
}

export default PopUpContainer;
