import {nanoid} from "nanoid";

import {IUserPreview} from "../../types/interfaces/user-preview";

class Context {
  public readonly id: string;
  public user: IUserPreview;

  constructor() {
    this.id = nanoid();
  }
}

export {
  Context,
};
