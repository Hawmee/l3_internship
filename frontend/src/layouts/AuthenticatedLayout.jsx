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
      console.log(user);
      
      navigate('/login')
    }else{
      navigate('/register')
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
