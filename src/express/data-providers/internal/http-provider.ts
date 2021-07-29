import axios, {AxiosStatic} from "axios";

function httpProvider(): AxiosStatic {
  return axios;
}

export {httpProvider};
