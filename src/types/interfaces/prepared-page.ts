import {FunctionComponent, PropsWithChildren} from "react";

export interface IPreparedPage<T> {
  page: FunctionComponent<T>;
  props?: PropsWithChildren<T>;
}
