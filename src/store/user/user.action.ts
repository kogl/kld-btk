import { USER_ACTION_TYPES } from "./user.types";
import { createAction, withMatcher, Action, ActionWithPayload } from '../../utils/reducer/reducer.utils'
import { UserData, AdditionalInformation } from "../../utils/firebase/firebase.utils";



export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, UserData>

export type GoogleSignIn = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>

export type EmailSign = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email: string, password: string }>

export type SignUpStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_START, { email: string, password: string, displayName: string }>

export type SignUpSuccess = Action<USER_ACTION_TYPES.SIGN_UP_SUCCESS>

export type SignUpFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_FAILURE, Error>

export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, UserData>

export type SignInFailed = Action<USER_ACTION_TYPES.SIGN_OUT_FAILURE>

export type SignOutStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>;

export type SignOutFailed = ActionWithPayload<
	USER_ACTION_TYPES.SIGN_OUT_FAILURE,
	Error
>;


export const checkUserSession = withMatcher((): CheckUserSession =>
	createAction(USER_ACTION_TYPES.CHECK_USER_SESSION))

export const setCurrentUser = withMatcher((user: UserData): SetCurrentUser =>
	createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user))


export const googleSignInStart = withMatcher((): GoogleSignIn =>
	createAction(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START))

export const emailSignInStart = withMatcher((email: string, password: string): EmailSign =>
	createAction(USER_ACTION_TYPES.EMAIL_SIGN_IN_START, { email, password }))

export const signInSuccess = withMatcher((user: UserData): SignInSuccess =>
	createAction(USER_ACTION_TYPES.SIGN_IN_SUCCESS, user))


export const signInFailed = withMatcher((error: Error) =>
	createAction(USER_ACTION_TYPES.SIGN_IN_FAILURE, error))

export const signUpStart = withMatcher((email: string, password: string, displayName: string): SignUpStart =>
	createAction(USER_ACTION_TYPES.SIGN_UP_START,
		{
			email,
			password,
			displayName
		}))


export const signUpSuccess = (user: UserData, additionalDetails: AdditionalInformation) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_SUCCESS, { user, additionalDetails })


export const signUpFailed = withMatcher((error: Error) =>
	createAction(USER_ACTION_TYPES.SIGN_UP_FAILURE, error))

export const signOutStart = () =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_START)

export const signOutSuccess = withMatcher(() =>
	createAction(USER_ACTION_TYPES.SIGN_OUT_SUCCESS))

	export const signOutFailed = withMatcher(
		(error: Error): SignOutFailed =>
		  createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)
	  );

// export const signOutFailed = (error:Error) =>
// 	createAction(USER_ACTION_TYPES.SIGN_OUT_FAILURE, error)


