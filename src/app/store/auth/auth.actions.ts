import { createAction, props } from "@ngrx/store";
import { Users } from "src/app/core/models/Users";

export const SetUserAuthenticated = createAction(
    '[auth] Establecer usuario',
    props<{ payload: Users & { token: string } }>(),
);

export const RemoveUserAuthenticated = createAction('[auth] Quitar usuario')