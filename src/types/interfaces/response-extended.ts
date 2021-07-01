import type {Response} from "express";

import {IUserPreview} from "./user-preview";

interface IResponseExtended extends Response {
  locals: {
    currentUser: IUserPreview;
  };
}

export {
  IResponseExtended,
};
