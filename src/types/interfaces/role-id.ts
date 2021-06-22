import {ValueOf} from "../value-of";
import {RoleId} from "../../shared/constants/role-id";

export interface IRoleId {
  roleId: ValueOf<typeof RoleId>;
}
