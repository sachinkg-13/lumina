// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import {
// 	persistStore,
// 	persistReducer,
// 	FLUSH,
// 	REHYDRATE,
// 	PAUSE,
// 	PERSIST,
// 	PURGE,
// 	REGISTER,
// } from "redux-persist";
// import storage from "redux-persist/lib/storage";
// import authReducer from "./authSlice";

// const persistConfig = {
// 	key: "root",
// 	storage,
// };

// const rootReducer = combineReducers({
// 	auth: authReducer,
// 	// Add other reducers here if necessary
// });

// const persistedReducer = persistReducer(persistConfig, rootReducer);

// const store = configureStore({
// 	reducer: persistedReducer,
// 	middleware: (getDefaultMiddleware) =>
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
// 			},
// 		}),
// });

// const persistor = persistStore(store);

// export { store, persistor };

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";

const store = configureStore({
	reducer: {
		auth: authSlice,
		//TODO: add more slices here for posts
	},
});

export default store;
