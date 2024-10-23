import { createSlice } from "@reduxjs/toolkit";

const attestationSlice = createSlice({
    name: "attestation",
    initialState: { value: [] },

    reducers: {
        setAttestation: (state, action) => {
            state.value = action.payload;
        },

        newAttestation: (state, action) => {
            state.value.push(action.payload);
        },

        editAttestation: (state, action) => {
            const { id, ...updatedData } = action.payload;
            const index = state.value.findIndex(
                (attestation) => attestation.id == id
            );

            if (index == -1) {
                state.value[index] = { ...state.value[index], ...updatedData };
            }
        },

        deleteAttestation: (state, action) => {
            const id = action.payload;
            state.value = state.value.filter(
                (attestation) => attestation.id !== id
            );
        },
    },
});


export const {setAttestation , newAttestation , editAttestation , deleteAttestation} = attestationSlice.actions
export default attestationSlice.reducer;
