import { CustomErrorArgs } from "./CustomErrorArgs";
import { CustomErrorJSON } from "./CustomErrorJSON";

export { CustomErrorArgs, CustomErrorJSON };

export abstract class CustomError extends Error {
  abstract errorCode: number;

  constructor() {
    super();
    Object.setPrototypeOf(this, CustomError.prototype);
  }

  // Method to transform the response into JSON format
  abstract toJSON(): CustomErrorJSON;
}
