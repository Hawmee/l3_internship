import { AlignJustify } from "lucide-react";
import React, { Children } from "react";
import Sidebar from "../components/Sidebar";

function MereLayout({ children }) {
  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex flex-row justify-between py-4 border-b-[2px] shadow-sm">
          <div className="logo px-4 flex flex-row items-center">
            <div>
              <button className="p-1.5 flex flex-col items-center justify-center rounded-lg bg-gray-50 hover:bg-gray-100 text-gray-600">
                <AlignJustify size={20} />
              </button>
            </div>
            <div className="font-extrabold text-lg text-blue-400 hover:text-blue-300 transition-colors duration-200 ease-in-out cursor-pointer ml-2">
              SRB Intern Management
            </div>
          </div>
          <div className="dark/light px-10 flex flex-row items-center justify-between">
            <div className="mr-5">EN/FR</div>
            <div>DARK/LIGHT</div>
          </div>
        </div>
        <div className=" h-full flex flex-row ">
          <Sidebar>{children[0]}</Sidebar>
          <div className="main bg-white w-full h-full">{children[1]}</div>
        </div>
      </div>
    </>
  );
}

export default MereLayout;
