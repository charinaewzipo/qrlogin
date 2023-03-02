import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import createWebStorage from 'redux-persist/lib/storage/createWebStorage'

// Reducers
import userReducer from './user'
import supervisorReducer from './supervisor'
// TODO: Put any reducer here

const createNoopStorage = () => ({
    getItem(_key: string) {
        return Promise.resolve(null);
    },
    setItem(_key: string, value: any) {
        return Promise.resolve(value);
    },
    removeItem(_key: string) {
        return Promise.resolve();
    },
});

const storage = typeof window !== 'undefined' ? createWebStorage('local') : createNoopStorage()

const rootPersistConfig = {
    key: 'root',
    storage,
    keyPrefix: 'redux-',
    whitelist: [],
};

const userPersistConfig = {
    key: 'user',
    storage,
    keyPrefix: 'redux-'
};

const supervisorPersistConfig = {
    key: 'supervisor',
    storage,
    keyPrefix: 'redux-'
};

const rootReducer = combineReducers({
    // e.g. token: tokenReducer
    user: persistReducer(userPersistConfig, userReducer),
    supervisor: persistReducer(supervisorPersistConfig, supervisorReducer),
})

export { rootPersistConfig, rootReducer }