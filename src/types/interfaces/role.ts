import {RoleId} from "../../shared/constants/role-id";
import {ValueOf} from "../value-of";

export interface IRole {
  title: keyof typeof RoleId;
  id: ValueOf<typeof RoleId>;
}
