import { validationResult, ValidationError } from "express-validator";

export interface ErrorTrigger {
  msg: string | undefined;
}

export interface CustomErrorJSON {
  success: boolean;
  errorCode: number;
  errorClass: string;
  errorTriggers: ErrorTrigger[] | ValidationError;
  inService: string;
  // inFunction: string | null;
  // inOperation: string | null;
}
