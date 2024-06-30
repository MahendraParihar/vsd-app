import { HttpException } from '@nestjs/common';
import { IError } from '@vsd-common/lib';

export const getHttpException = (error: unknown) => {
  const errObj = error as IError;
  if (errObj && errObj.message && errObj.status) {
    return new HttpException(errObj.message, errObj.status);
  }
  return new Error(errObj.message);
};
