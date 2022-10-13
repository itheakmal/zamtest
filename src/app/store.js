import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { typesApi } from '../services/typesApi'

export const store = configureStore({
  reducer: {
    [typesApi.reducerPath]: typesApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(typesApi.middleware),
})
// setupListeners(store.dispatch)