import { ChatLog } from '@/lib/types'
import { createSlice } from '@reduxjs/toolkit'

export const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    messages: [] as ChatLog[]
  },
  reducers: {
    setMessages: (state, action) => {
      const updatedMessages = [action.payload , ...state.messages]
      console.log(updatedMessages)
      state.messages = updatedMessages
    }
  }
})

export const { setMessages } = chatSlice.actions

export default chatSlice.reducer