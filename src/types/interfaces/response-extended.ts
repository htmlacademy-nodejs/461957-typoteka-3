import type {Response} from "express";
import {IUserPreview} from "./user-preview";

export interface IResponseExtended extends Response {
  locals: {
    currentUser: IUserPreview;
  };
}
