import { createSlice } from "@reduxjs/toolkit";


const socketUrlSlice = createSlice({
    name:"socketUrl",
    initialState: {value: ""} ,
    reducers:{
        setSocketUrl: (state,action)=>{
            state.value = action.payload
        }
    }
})


export const {setSocketUrl} = socketUrlSlice.actions
export default socketUrlSlice.reducer
