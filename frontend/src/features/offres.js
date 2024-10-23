import { createSlice } from "@reduxjs/toolkit";

const offreSlice = createSlice({
    name: "offre",
    initialState: { value: [] },

    reducers: {
        setOffre: (state, action) => {
            state.value = action.payload;
        },

        newOffre: (state, action) => {
            state.value.push(action.payload);
        },

        editOffre: (state, action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.value.findIndex((data) => data.id == id);

            if (index == -1) {
                state.value[index] = { ...state.value[index], ...updatedData };
            }
        },

        deleteOffre: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setOffre, newOffre, editOffre, deleteOffre } =
    offreSlice.actions;

export default offreSlice.reducer;
