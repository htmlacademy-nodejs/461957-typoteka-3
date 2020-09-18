import {nanoid} from "nanoid";

export class Context {
  public readonly id: string;

  constructor() {
    this.id = nanoid();
  }
}
