import { createStore, applyMiddleware, combineReducers } from "redux"
import promiseMiddleware from 'redux-promise-middleware'
import loginReducer from './components/loginModule/reducer'
import teacherReducer from './components/teacherModule/reducer'
import { persistStore, persistReducer } from 'redux-persist'
// import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import storageSession from 'redux-persist/lib/storage/session'
// import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

const persistConfig = {
  key: 'root',
  storage: storageSession,
  stateReconciler: hardSet,
}

const reducer = combineReducers({
  loginReducer,
  teacherReducer,
})

const myPersistReducer = persistReducer(persistConfig, reducer)

export const store = createStore(myPersistReducer, applyMiddleware(promiseMiddleware))

export const persistor = persistStore(store)
