import { createSelector } from "reselect"

import 	{RootState} from '../store'


import { UserState } from "./user.reducer"

export const SelectUSerReducer = (state: RootState): UserState => state.user

export const selectCurrentUser = createSelector(SelectUSerReducer, (user) => user.currentUser)

