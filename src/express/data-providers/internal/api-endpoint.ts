import {ENV} from "../../../shared/env/env";
import {APIRoute} from "../../../shared/constants/routes/api-route";

function apiEndpoint(): string {
  return ENV.API_HOST + `:` + ENV.PORT + APIRoute.API;
}

export {apiEndpoint};
