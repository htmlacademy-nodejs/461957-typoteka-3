import {nanoid} from "nanoid";

export class RequestContext {
  public readonly id: string;

  constructor() {
    this.id = nanoid();
  }
}
