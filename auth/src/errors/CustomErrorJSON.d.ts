export interface ErrorTrigger {
  msg: string;
  [key: string]: any;
}

export interface CustomErrorJSON {
  success: boolean;
  errorCode: number;
  errorClass: string;
  errorTriggers: ErrorTrigger[];
  inService: string | null;
  inFunction: string | null;
  inOperation: string | null;
}
