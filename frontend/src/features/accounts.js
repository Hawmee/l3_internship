import { createSlice } from "@reduxjs/toolkit";


const accountSlice = createSlice({
    name: "accounts",
    initialState: {value: []},

    reducers:{
        setAccounts: (state , action) =>{
                if(state.value.length > 0){
                    state.value.push(payload.action)
                }else{
                    state.value = action.payload
                }
        } ,

        newAccount : (state , action) =>{
            state.value.push(action.payload)
        } ,

        editAccount : (state , action) => {
            const {id, ...updatedData} = action.payload;
            const index = state.value.findIndex(account=>account.id == id);
            if(index !== -1){
                state.value[index] = {...state.value[index] , ...updatedData}
            }
        },

        deleteAccount: (state , action)=>{
            const id= action.payload;
            state.value = state.value.filter(account => account.id !== id)
        }
    }
})


export const {setAccounts , newAccount , editAccount , deleteAccount} = accountSlice.actions;

export default accountSlice.reducer ;