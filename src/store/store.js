import { compose, createStore, applyMiddleware } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'

import { rootReducer } from './root.reducer'



const persistConfig = {
	key: 'root',
	storage,
	blacklist: ['user']
}

const persistedReducer = persistReducer(persistConfig, rootReducer)


const middleWares = [process.env.NODE_ENV === 'production' && logger].filter(Boolean)



const compoedEnhancers = compose(applyMiddleware(...middleWares))

export const store = createStore(persistedReducer, undefined, compoedEnhancers)

export const persistor = persistStore(store) 