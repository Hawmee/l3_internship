import { LogOut, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({children}) {
  const user = {
    name: "user",
    matricule: "1234567890",
  };
  return (
    <>
      <aside className="h-full">
        <nav className="h-full flex flex-col bg-white border-r-[2px] shadow-sm">
          <div className="flex-1 px-3 mt-5">{children}</div>

          <div className="UserProfile border-t border-gray-300 flex p-3">
            <div className="bg-gray-600 rounded-[18px] px-1.5 pt-1">
              <User color="white" size={25} />
            </div>
            <div className="flex items-center justify-between w-52 ml-3">
              <div className="leading-4 cursor-pointer">
                <div>
                  <h4 className="font-semibold text-gray-500 hover:text-gray-600">
                    {user.name} {user.last_name}
                  </h4>
                  <span className="text-gray-500 text-[15px] ">
                    ID: {user.matricule}
                  </span>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-500">
                <button>
                  <LogOut size={28} />
                </button>
              </button>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}

export function SideBarLinks({ icon, text, href, alert, notifs }) {
  const routeHref = href ? href : '/';

  return (
    <li>
      <NavLink 
        className={({isActive})=>`
                relative flex items-center py-2 px-3 my-1 font-medium rounded-md cursor-pointer transition-colors
                ${
                  isActive
                    ? "bg-gray-100 text-blue-400"
                    : "hover:bg-gray-200 text-gray-700 "
                }
            `}
        to={href}
        end
      >
        {icon}
        <span className=" ml-3">{text}</span>
        {alert && (
          <div className="absolute right-2 px-2 rounded-[10px] bg-blue-400 text-[12px] text-gray-50">
            <p>{notifs}</p>
          </div>
        )}
      </NavLink>
    </li>
  );
}
