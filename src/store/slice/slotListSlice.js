import { createSlice } from "@reduxjs/toolkit";
let rows = [];
for (let i = 10; i < 32; i++) {
    rows.push(i + 1);
}
export const slotListSlice = createSlice({
    name: "slot",
    initialState: {
        value : rows,
    },
    reducers: {
        addSlot: (state, action) => {
            state.value.push(action.payload);
            console.log("payload",action.payload);
        },
    },
});
export const { addSlot} = slotListSlice.actions;
export default slotListSlice.reducer;