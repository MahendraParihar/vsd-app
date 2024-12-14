import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    console.log(exception);
    const context = host.switchToHttp();
    const response = context.getResponse();
    const res = {
      code: 400,
      message: 'ValidationFilter',
      data: exception.validationErrors,
    };
    return response.status(400).json(res);
  }
}
