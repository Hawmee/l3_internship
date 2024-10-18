import React, { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function ProtectedRoute({ element, requiredUserType }) {



    const navigate = useNavigate()
  const usertype = "chefService";
  const [status , setStatus] = useState(true)


  useEffect(() => {
    if (usertype !== requiredUserType) {
      navigate('/')
    }

    if (!status) {
        navigate('/waiting')
    }


  }, [status , usertype]);

  return element

}

export default ProtectedRoute;
