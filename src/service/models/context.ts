import {nanoid} from "nanoid";
import {IUserPreview} from "../../types/interfaces/user-preview";

export class Context {
  public readonly id: string;
  public user: IUserPreview;

  constructor() {
    this.id = nanoid();
  }
}
