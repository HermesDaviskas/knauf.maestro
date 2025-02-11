export type Status = [statusCode: number, statusDesc: string];

export type Message = { msg: string; data: any };

export interface CustomResponseJSON {
  success: boolean;
  status: Status;
  messages: Message[];
}

export abstract class CustomResponse {
  abstract status: Status;

  constructor(public message: string) {}

  // Method to transform the response into JSON format
  abstract toJSON(): CustomResponseJSON;

  // Abstract method to be implemented by extending classes to send the response
  abstract sendResponse(): void;
}
