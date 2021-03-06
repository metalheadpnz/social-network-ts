import {setFetching} from "./users-reducer";
import {authAPI} from "../api/api";
import {Dispatch} from "redux";

export type setUserDataType = ReturnType<typeof setUserData>

export type userProfileDataType = {
    userId: null | number
    email: null | string
    login: null | string
}

export type profileFromServerType = {
    data: userProfileDataType
    messages: string[] | null
    fieldsErrors: any[] | null
    resultCode: number | null
}

type actionsTypes = setUserDataType

const initialState: profileFromServerType = {
    data: {email: null, login: null, userId: null},
    fieldsErrors: null,
    messages: null,
    resultCode: 0
}

export const authReducer = (state = initialState, action: actionsTypes) => {
    switch (action.type) {

        case "SET_USER_DATA":
            return {
                ...state, ...action.data
            }

        default:
            return state
    }
}


export const setUserData = (profileUserData: profileFromServerType) => {
    return {type: 'SET_USER_DATA', data: profileUserData} as const
}


export const getAuthUserData = () => {

    return (dispatch: Dispatch) => {
        dispatch(setFetching(true))
        authAPI.me()
            .then(data => {

                if (data.resultCode == 0) {
                    dispatch(setUserData(data))
                }
                dispatch(setFetching(false))
            })
    }
}