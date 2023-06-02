import { createReducer, on } from "@ngrx/store";
import { Users } from "src/app/core/models/Users";
import { SetUserAuthenticated, RemoveUserAuthenticated } from "./auth.actions";

export const authFeatureKey = 'auth';

export interface AuthState {
    authUser: Users | null;
    token: string | null;
}

const initialState: AuthState = {
    authUser: null,
    token: localStorage.getItem('token') || null,
}

export const authReducer = createReducer(
    initialState,

    on(SetUserAuthenticated, (currentState, { payload }) => {
        return {
            authUser: payload,
            token: payload.token,
        }
    }),


    on(RemoveUserAuthenticated, (currentState) => {
        return {
            authUser: null,
            token: null
        }
    })
)