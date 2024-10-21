import { AlignJustify } from "lucide-react";
import React, { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function Authenticated() {
  const navigate = useNavigate();
  const token = useSelector((state)=>state.token.value)
  const user = useSelector((state)=>state.currentUser.value)

  useEffect(() => {
    if(!user){    
      navigate('/guest/login')
    }else{
      if(user.isChefService){
        navigate('/chefService/')
      }else if(user.isChefUnit){
        navigate('/chefUnits/')
      }else if(user.isPersCellule){
        navigate('/persCellule')
      }else if(user.isPersSecretariat){
        navigate('/persSecretariat')
      }
    }
  }, [user]);


  return (
    <>
      <div className="font-[Figtree] antialised ">
        <Outlet />
      </div>
    </>
  );
}

export default Authenticated;
