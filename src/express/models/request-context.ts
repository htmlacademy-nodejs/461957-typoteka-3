import {nanoid} from "nanoid";

class RequestContext {
  public readonly id: string;

  constructor() {
    this.id = nanoid();
  }
}

export {
  RequestContext,
};
