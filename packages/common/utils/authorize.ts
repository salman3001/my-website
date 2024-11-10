import { ForbiddenException } from "../server/exceptions/forbidden-exception.js";

/**
 *
 * @param cb Pass a callback that can return true or false, this function will call the callback and if it resolved to true then true is returned otherwide Forbiddenexcetion is thrown.
 * @param message Pass custom message if needed, Default is "Unauthorized"
 * @returns returns true if callback resolved to true else throws exception
 */
export const authorize = async (
  cb: () => Promise<Boolean> | Boolean,
  message?: string,
) => {
  const results = await cb();
  if (results) {
    return results;
  } else {
    throw new ForbiddenException(message || "UnAuthorized");
  }
};
