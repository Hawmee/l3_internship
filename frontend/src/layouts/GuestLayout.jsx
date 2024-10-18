import { Outdent } from "lucide-react";
import React from "react";
import { Outlet } from "react-router-dom";

function Guest() {
  return (
    <>
      <div className="h-screen">
        <Outlet />
      </div>
    </>
  );
}

export default Guest;
