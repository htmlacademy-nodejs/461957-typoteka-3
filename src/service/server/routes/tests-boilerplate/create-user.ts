import {ILogin} from "../../../../types/interfaces/login";
import {agent as request} from "supertest";
import {IUserCreatingDoublePasswords} from "../../../../types/interfaces/user-creating";
import {getNumericalId} from "../../../../shared/get-id";
import {Application} from "express";

export async function createUser(app: Application): Promise<ILogin> {
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
