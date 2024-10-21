import { LogOut, User } from "lucide-react";
import React from "react";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { Slide, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentUser } from "../features/currentUser";
import Cookies from "js-cookie";

export default function Sidebar({children}) {
  const user = useSelector((state)=>state.currentUser.value)
  const toastConfig = useSelector((state)=>state.toastConfig.value)
  const url = useSelector((state)=>state.backendUrl.value)

  const dispatch = useDispatch()

  const logout =async() => {
    
    // axios.post(`${url}/logout` , "logged_out" ,{ withCredentials: true })
    // .then((res)=>{
    //   console.log(res);
    //   dispatch(setCurrentUser(null))
    //   Cookies.remove("user_cookie")
    // }).catch(error=>{
    //   console.log(error);
      
    // })

    try {
      const logged_out = await axios.post(`${url}/logout` , "logged_out" , {withCredentials :true})
      const message = logged_out.data.message
      dispatch(setCurrentUser(null))
      toast.success(message,toastConfig)
    } catch (error) {
      const message = error.response.data.message
      toast.error(message , toastConfig)
    }
  };
  return (
    <>
      <aside className="h-full">
        <nav className="h-full flex flex-col bg-white border-r-[2px] shadow-sm">
          <div className="flex-1 px-3 mt-5">{children}</div>

          <div className="UserProfile border-t border-gray-300 flex p-3 flex-row items-center ">
            <div className="bg-gray-600 rounded-[18px] px-1.5 pt-1 h-[5vh]">
              <User color="white" size={25} />
            </div>
            <div className="flex items-center justify-between w-52 ml-3">
              <div className="leading-4 cursor-pointer">
                <div>
                  <h4 className="font-semibold text-gray-500 hover:text-gray-600">
                    {user&&user.nom} {user&&user.prenom}
                  </h4>
                  <span className="text-gray-500 text-[15px] ">
                    ID: {user&&user.matricule}
                  </span>
                </div>
              </div>
              <button className="text-red-400 hover:text-red-500" onClick={logout}>
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
