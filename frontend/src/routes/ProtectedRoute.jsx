import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ element, requiredUserType }) {


  const current_user = useSelector((state)=>state.currentUser.value)
  const navigate = useNavigate()
  const usertype = "chefService";
  const [status , setStatus] = useState(true)


  useEffect(() => {
    if (usertype !== requiredUserType) {
      navigate('/')
    }

    if (current_user && !current_user.status) {
        navigate('/waiting')
    }


  }, [status , usertype]);

  return element

}

export default ProtectedRoute;
