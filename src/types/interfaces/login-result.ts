import {LoginStatus} from "../../constants";
import {ValueOf} from "../value-of";

import {IUserPreview} from "./user-preview";

export interface ILoginResult {
  state: ValueOf<typeof LoginStatus>;
  user?: IUserPreview;
}
