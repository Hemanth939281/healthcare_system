import { createSlice } from "@reduxjs/toolkit";

const viewSlice = createSlice({
    name: "view",
    initialState: "grid",
    reducers: {
        toggleView: (state: any) => ( state==="grid" ? "list" : "grid") 
    }
});

export const { toggleView } = viewSlice.actions;
export default viewSlice.reducer;