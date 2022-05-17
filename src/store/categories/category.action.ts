import { CATEGORIES_ACTION_TYPES, Category } from './category.types'
import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils'
// import { getCategoriesandDocuments } from "../../utils/firebase/firebase.utils";

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>


export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

export type FetchCategoriesFaild = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// export type CategoryAction =
// 	| FetchCategoriesStart
// 	| FetchCategoriesSuccess
// 	| FetchCategoriesFaild;




// export const setCategories = (categoriesArray) =>
// 	createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

export const fetchCategoriesStart = withMatcher((): FetchCategoriesStart =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START))

export const fetchCategoriesSuccess = withMatcher((categoriesArray: Category[]): FetchCategoriesSuccess =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS,
		categoriesArray))

export const fetchCategoriesFailed = withMatcher((error: Error): FetchCategoriesFaild =>
	createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED,
		error))
