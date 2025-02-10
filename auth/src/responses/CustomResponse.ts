import { CustomResponseArgs } from "./CustomResponseArgs";
import { CustomResponseJSON } from "./CustomResponseJSON";

export { CustomResponseArgs, CustomResponseJSON };

export abstract class CustomResponse {
  abstract statusCode: number;

  constructor() {}

  // Method to transform the response into JSON format
  abstract toJSON(): CustomResponseJSON;

  // Abstract method to be implemented by extending classes to send the response
  abstract sendResponse(): void; // Removed (req: Request, res: Response)
}
