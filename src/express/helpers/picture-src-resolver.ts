import {APIRoute} from "../../shared/constants/routes/api-route";
import {ENV} from "../../shared/env/env";

function getPictureSrc(pictureName: string): string {
  return `${ENV.API_HOST}:${ENV.PORT}${APIRoute.STATIC}/${pictureName}`;
}

export {getPictureSrc};
