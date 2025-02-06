import { ValidationError } from "express-validator";

export interface RequestValidationErrorParams {
  inService: string;
  inFunction: string;
  fieldErrors: ValidationError[];
  result: string;
}
