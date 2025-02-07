export interface ErrorResponseParam {
  success: boolean;
  errorCode: number;
  errorClass: string;
  errorTriggers: any[] | null;
  inService: string | null;
  inFunction: string | null;
  inOperation: string | null;
}
