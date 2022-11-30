import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  callGetLeadsAPI,
  callDeleteLeadAPI,
  callPostLeadAPI,
  callPutLeadAPI,
  callSearchLeadAPI,
  callToggleLeadSelectionAPI
} from './leadsAPI'

const initialState = {
  currentLead: null, leadsList: []
}

export const selectLeadAsync = createAsyncThunk('leads/selectLead', async (lead) => {
  return await callToggleLeadSelectionAPI(lead)
})

export const searchLeadAsync = createAsyncThunk('leads/searchLead', async (searchValue,
  { dispatch }
) => {
  return await callSearchLeadAPI(searchValue)

})

export const putLeadAsync = createAsyncThunk('leads/putLead', async (amount,
  { dispatch }
) => {
  const response = await callPutLeadAPI(amount)
  const newLead = await response.json()

  // The value we return becomes the `fulfilled` action payload
  dispatch(updateLead(newLead))
})

export const postLeadAsync = createAsyncThunk('leads/postLead', async (lead,
  { dispatch }
) => {

  const response = await callPostLeadAPI(lead)
  const data = await response.json()
  dispatch(addLead(data))
  // return response
})

export const getLeadsAsync = createAsyncThunk('leads/fetchLeads', async () => {
  return await callGetLeadsAPI()
})

export const deleteLeadAsync = createAsyncThunk('leads/deleteLead', async (id,
  { dispatch }
) => {
  await callDeleteLeadAPI(id)
  dispatch(deleteLead(id))
})

export const leadsSlice = createSlice({
  name: 'leads', initialState, reducers: {
    addLead: (state, action) => {

      state.leadsList.push(action.payload)
    }, deleteLead: (state, action) => {
      const id = action.payload

      state.leadsList = state.leadsList.filter((lead) => lead.id !== id)
    }, updateLead: (state, action) => {
      const updatedLead = action.payload
      state.leadsList = state.leadsList.map((lead) => {
        if (lead.id === updatedLead.id) return updatedLead
        return lead
      })
    }, setCurrentLead: (state, action) => {
      state.currentLead = action.payload
    }, resetCurrentLead: (state) => {
      state.currentLead = null
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(getLeadsAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getLeadsAsync.fulfilled, (state, action) => {
        console.log("action", action)
        state.status = 'idle'
        state.leadsList = action.payload
      })
      .addCase(searchLeadAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(searchLeadAsync.fulfilled, (state, action) => {
        console.log("action", action.payload)
        state.status = 'idle'
        state.leadsList = action.payload
      })
      .addCase(selectLeadAsync.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(selectLeadAsync.fulfilled, (state, action) => {
        const updatedLead = action.payload
        console.log('state ', state)
        const oldLeadIndex = state.leadsList.findIndex(lead => lead.id === updatedLead.id)
        state.leadsList[oldLeadIndex] = updatedLead;
      })

  }
})

export const {
  addLead, deleteLead, setCurrentLead, resetCurrentLead, updateLead
} = leadsSlice.actions

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const leadsListSelector = (state) => state.leads.leadsList
export const currentLeadSelector = (state) => state.leads.currentLead

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.
/*export const incrementIfOdd = (amount) => (dispatch, getState) => {
  const currentValue = selectCount(getState());
  if (currentValue % 2 === 1) {
    dispatch(incrementByAmount(amount));
  }
};*/

export default leadsSlice.reducer
