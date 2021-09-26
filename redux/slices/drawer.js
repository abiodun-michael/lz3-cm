import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  addMember:false,
  updateMember:{id:null, open:false},
  addCell:false,
  updateCell:{id:null,open:false},
  addFdtsReport:false
}

export const drawerSlice = createSlice({
  name: 'drawer',
  initialState,
  reducers: {
    addMember: (state,action) => {
      state.addMember = action.payload
    },
    addCell: (state,action) => {
      state.addCell = action.payload
    },
    addFdtsReport: (state,action) => {
      state.addFdtsReport = action.payload
    },
    updateMember: (state, action) => {
      state.updateMember =action.payload
    },
    updateCell: (state, action) => {
      state.updateCell =action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { addMember, updateMember, addCell, updateCell,addFdtsReport } = drawerSlice.actions

export default drawerSlice.reducer