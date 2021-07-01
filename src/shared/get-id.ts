import {customAlphabet, nanoid} from "nanoid";

function getNumericalId(): number {
  const alphabet = `0123456789`;
  const idGenerator = customAlphabet(alphabet, 24);
  return parseInt(idGenerator(), 10);
}

function getId(): string {
  return nanoid(16);
}

export {
  getId,
  getNumericalId,
};
