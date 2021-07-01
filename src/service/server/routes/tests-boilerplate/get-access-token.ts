import {Application} from "express";

import {createUser} from "./create-user";
import {signIn} from "./sign-in";

async function getAccessToken(app: Application): Promise<string> {
  const credentials = await createUser(app);
  const {accessToken} = await signIn(app, credentials);
  return accessToken;
}

export {
  getAccessToken,
};
