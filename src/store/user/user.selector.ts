import { createSelector } from "reselect"

import { UserState } from "./user.reducer"

export const SelectUSerReducer = (state): UserState => state.user

export const selectCurrentUser = createSelector(SelectUSerReducer, (user) => user.currentUser)

