import {ROLE_ID} from "../constants-es6";
import {ValueOf} from "./value-of";

export type Role = ValueOf<typeof ROLE_ID>;
