import {IUserPreview} from "./user-preview";
import {ValueOf} from "../value-of";
import {LoginStatus} from "../../constants-es6";

export interface ILoginResult {
  status: ValueOf<typeof LoginStatus>;
  payload?: IUserPreview;
}
