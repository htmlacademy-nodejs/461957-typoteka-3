import {Application} from "express";
import {agent as request} from "supertest";

import {getNumericalId} from "../../../../shared/get-id";
import {ILogin} from "../../../../types/interfaces/login";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";

async function createUser(app: Application): Promise<ILogin> {
  const email = `zaberkirder${getNumericalId()}@usgs.gov`;
  const signInCredentials: ILogin = {
    email,
    password: `hzgdghdglhdgklgz`,
  };
  const newUser: IUserCreatingDoublePasswords = {
    ...signInCredentials,
    passwordRepeated: signInCredentials.password,
    firstName: `Lowe`,
    lastName: `Tennant`,
    avatar: ``,
    roleId: 2,
  };

  await request(app).post(`/api/users`).send(newUser);
  return signInCredentials;
}

export {
  createUser,
};
