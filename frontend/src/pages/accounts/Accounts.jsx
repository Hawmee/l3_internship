import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setAccounts } from "../../features/accounts";
import CSAccounts from "./chefService/CSAccounts";

function Accounts() {
    const url = useSelector((state) => state.backendUrl.value);
    const current_user = useSelector((state)=>state.currentUser.value)
    const dispatch = useDispatch();


    const getAccounts = async () => {
      try {
          const accounts_data = await axios.get(`${url}/users`);
          const accounts = accounts_data.data
          dispatch(setAccounts(accounts))
      } catch (error) {
          console.log(error);
      }
    };

    useEffect(() => {
      getAccounts()
    }, [dispatch , url]);

    return (
      <>
        {current_user&&(current_user.isChefService && <CSAccounts />)}
      </>
    )
}

export default Accounts;
