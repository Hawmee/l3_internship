import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { setAccounts } from "../features/accounts"

export const uri = useSelector(state=>state.backendUrl.value)
const dispatch = useDispatch()


const getAccounts = async () =>{
    try {
        const accounts_data = await axios.get(`${uri}//users`)
        const accounts = accounts_data.data
        if(Array.isArray(accounts)){
            dispatch(setAccounts(accounts))
        }
    } catch (error) {
        
    }
}