import { createSlice } from "@reduxjs/toolkit";

const perfSlice = createSlice({
    name: "perf",
    initialState: { value: [] },

    reducers: {
        setPerf: (state, action) => {
            state.value = action.payload;
        },

        newPerf: (state, action) => {
            state.value.push(action.payload);
        },

        editPerf: (state, action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.value.findIndex((data) => data.id == id);

            if (index == -1) {
                state.value[index] = { ...state.value[index], ...updatedData };
            }
        },

        deletePerf: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter((data) => data.id !== id);
        },
    },
});

export const { setPerf, newPerf, editPerf, deletePerf } = perfSlice.actions;

export default perfSlice.reducer;
