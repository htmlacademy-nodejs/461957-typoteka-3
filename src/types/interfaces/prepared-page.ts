import {FunctionComponent, PropsWithChildren} from "react";

interface IPreparedPage<T> {
  page: FunctionComponent<T>;
  props?: PropsWithChildren<T>;
}

export {
  IPreparedPage,
};
