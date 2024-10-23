import { createSlice } from "@reduxjs/toolkit";

const tacheSlice = createSlice({
    name: "tache",
    initialState: { value: [] },

    reducers: {
        setTache: (state, action) => {
            state.value = action.payload;
        },

        newTache: (state, action) => {
            state.value.push(action.payload);
        },

        editTache: (state, action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.value.findIndex((data) => data.id == id);

            if (index == -1) {
                state.value[index] = { ...state.value[index], ...updatedData };
            }
        },

        deleteTache: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setTache, newTache, editTache, deleteTache } =
    tacheSlice.actions;

export default tacheSlice.reducer;
