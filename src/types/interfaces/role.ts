import {RoleId} from "../role-id";
import {ROLE_ID} from "../../constants-es6";

export interface IRole {
  id: RoleId;
  title: keyof typeof ROLE_ID;
}
