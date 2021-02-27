import {customAlphabet, nanoid} from "nanoid";

export function getNumericalId(): number {
  const alphabet = `0123456789`;
  const idGenerator = customAlphabet(alphabet, 24);
  return parseInt(idGenerator(), 10);
}

export function getId(): string {
  return nanoid(16);
}
