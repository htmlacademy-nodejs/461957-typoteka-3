import {customAlphabet} from "nanoid";

export function getNumericalId(): number {
  const alphabet = `0123456789`;
  const nanoid = customAlphabet(alphabet, 24);
  return parseInt(nanoid(), 10);
}
